// ==========================================================================
// Lapaas AI Product Engineering — Application Logic
// Polished interactions: 
// - Radiogroup / radio accessibility semantics & keyboard arrow navigation
// - Sliding brand tab indicator
// - Animated brand progress bar
// - Interactive live-updating sidebar steps with checkmarks
// - 200ms smooth question transitions
// ==========================================================================

(function () {
  "use strict";

  // The 6 Discovery Questions (Core data completely unchanged)
  var QUESTIONS = [
    {
      id: "role",
      shortLabel: "Role",
      title: "1. Who are you?",
      subtitle: "Select your current stage to help tailor the guidance.",
      options: [
        { label: "Student or Fresher", value: "student", desc: "In college or recent graduate looking to enter tech." },
        { label: "Working Professional", value: "professional", desc: "Employed and looking to upskill in AI software." },
        { label: "Freelancer or Marketer", value: "freelancer", desc: "Offering client services or digital marketing." },
        { label: "Business Owner", value: "business", desc: "Running a business and wanting to automate operations." }
      ]
    },
    {
      id: "goal",
      shortLabel: "Primary goal",
      title: "2. What is your primary goal?",
      subtitle: "What is the main outcome you want from this course?",
      options: [
        { label: "Job or internship proof-of-work", value: "portfolio", desc: "Build working deployed projects recruiters can inspect." },
        { label: "Offer AI services to clients", value: "freelance_services", desc: "Sell AI landing systems, MVPs, and automations." },
        { label: "Build my own software product", value: "own_product", desc: "Ship my own AI SaaS, tool, or startup MVP." },
        { label: "Automate internal business bottlenecks", value: "automation", desc: "Save manual hours and streamline daily operations." }
      ]
    },
    {
      id: "coding",
      shortLabel: "Coding",
      title: "3. What is your coding background?",
      subtitle: "The curriculum starts without requiring prior code knowledge.",
      options: [
        { label: "Absolute beginner (never written code)", value: "none", desc: "No programming experience at all." },
        { label: "Basic knowledge (some HTML/Python)", value: "basic", desc: "Understand basic syntax or light scripting." },
        { label: "Comfortable programmer", value: "experienced", desc: "Familiar with web development or backend concepts." }
      ]
    },
    {
      id: "ai_exp",
      shortLabel: "AI background",
      title: "4. How have you used AI so far?",
      subtitle: "Helps gauge where you enter the curriculum.",
      options: [
        { label: "Only prompt ChatGPT / Claude", value: "chat_user", desc: "Used chat prompts for text or summaries." },
        { label: "Tried AI tools or automation (n8n/Cursor)", value: "tools_user", desc: "Tested AI code editors or workflow tools." },
        { label: "Completely new to AI", value: "beginner_ai", desc: "Just getting started with generative AI." }
      ]
    },
    {
      id: "time",
      shortLabel: "Weekly time",
      title: "5. How many hours per week can you give?",
      subtitle: "Access is for 3 months, so steady weekly hours matter.",
      options: [
        { label: "2 to 4 focused hours / week", value: "light", desc: "A few hours on weekends or evenings." },
        { label: "5 to 8 focused hours / week", value: "recommended", desc: "The recommended weekly cadence on the page." },
        { label: "10+ focused hours / week", value: "intensive", desc: "Fast-track building and deep practice." }
      ]
    },
    {
      id: "worry",
      shortLabel: "Hesitation",
      title: "6. What is your biggest hesitation?",
      subtitle: "We address this directly with official course details.",
      options: [
        { label: "I have no coding background—will I get stuck?", value: "worry_coding", desc: "Worry about technical friction." },
        { label: "Access is only 3 months—will I run out of time?", value: "worry_time", desc: "Worry about finishing before expiration." },
        { label: "There are no live classes—will I have support?", value: "worry_support", desc: "Worry about asking questions without live batches." },
        { label: "Is it worth Rs 2,999 vs free YouTube videos?", value: "worry_value", desc: "Worry about paying when free tutorials exist." }
      ]
    }
  ];

  // State management
  var currentStep = 0;
  var userAnswers = {};
  var historyStack = [];
  var askMessageCount = 0;

  // DOM Elements
  var questionView = document.getElementById("questionView");
  var resultView = document.getElementById("resultView");
  var currentQuestionContainer = document.getElementById("currentQuestionContainer");
  var questionProgressLabel = document.getElementById("questionProgressLabel");
  var progressBar = document.getElementById("progressBar");
  var desktopLedgerTable = document.getElementById("desktopLedgerTable");
  var mobileLedgerContent = document.getElementById("mobileLedgerContent");
  var mobileAnswerCount = document.getElementById("mobileAnswerCount");

  var tabFitCheck = document.getElementById("tabFitCheck");
  var tabAsk = document.getElementById("tabAsk");
  var tabIndicator = document.getElementById("tabIndicator");
  var panelFitCheck = document.getElementById("panelFitCheck");
  var panelAsk = document.getElementById("panelAsk");

  var backBtn = document.getElementById("backBtn");
  var restartBtn = document.getElementById("restartBtn");
  var startDiscoveryBtn = document.getElementById("startDiscoveryBtn");
  var resultAskBtn = document.getElementById("resultAskBtn");

  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var chatThread = document.getElementById("chatThread");
  var quickQuestionsGrid = document.getElementById("quickQuestionsGrid");
  var toggleQuickQuestionsBtn = document.getElementById("toggleQuickQuestionsBtn");

  // Result fields
  var resultWhereToStart = document.getElementById("resultWhereToStart");
  var resultWhatYouCanBuild = document.getElementById("resultWhatYouCanBuild");
  var resultWhatToKnow = document.getElementById("resultWhatToKnow");

  function init() {
    setupEventListeners();
    updateLedger();
    showQuestion(0);
    setTimeout(updateTabIndicator, 80);
    window.addEventListener("resize", updateTabIndicator);
  }

  function setupEventListeners() {
    // Tabs switching & ARIA handling
    if (tabFitCheck && tabAsk) {
      tabFitCheck.addEventListener("click", function () {
        switchTab("fit");
      });
      tabAsk.addEventListener("click", function () {
        switchTab("ask");
      });

      // Keyboard arrow-key navigation between tabs
      [tabFitCheck, tabAsk].forEach(function (tab) {
        tab.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            var target = (this === tabFitCheck) ? tabAsk : tabFitCheck;
            target.focus();
            target.click();
          }
        });
      });
    }

    // Controls
    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        restartFlow();
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        goBack();
      });
    }

    if (startDiscoveryBtn) {
      startDiscoveryBtn.addEventListener("click", function () {
        switchTab("fit");
        var toolBand = document.getElementById("toolBand");
        if (toolBand) {
          toolBand.scrollIntoView({ behavior: "smooth" });
        }
        if (currentStep >= QUESTIONS.length) {
          restartFlow();
        } else {
          // Focus first option after smooth scroll
          setTimeout(function () {
            var firstOption = currentQuestionContainer.querySelector(".option-card");
            if (firstOption) firstOption.focus();
          }, 350);
        }
      });
    }

    if (resultAskBtn) {
      resultAskBtn.addEventListener("click", function () {
        switchTab("ask");
        if (chatInput) chatInput.focus();
      });
    }

    // Ask tab chat form
    if (chatForm) {
      chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var text = (chatInput ? chatInput.value : "").trim();
        if (text) {
          handleAskMessage(text);
        }
      });
    }

    // Quick questions clicks
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".quick-question-card");
      if (card && card.dataset.query) {
        switchTab("ask");
        handleAskMessage(card.dataset.query);
      }
    });

    // Toggle common questions in Ask tab
    if (toggleQuickQuestionsBtn && quickQuestionsGrid) {
      toggleQuickQuestionsBtn.addEventListener("click", function () {
        var isHidden = quickQuestionsGrid.style.display === "none";
        quickQuestionsGrid.style.display = isHidden ? "grid" : "none";
        toggleQuickQuestionsBtn.textContent = isHidden ? "Hide questions" : "Common questions";
      });
    }
  }

  // Smooth sliding underline for active tab
  function updateTabIndicator() {
    var activeTab = document.querySelector(".panel-tab.active");
    var indicator = document.getElementById("tabIndicator");
    var tabBar = document.querySelector(".panel-tab-bar");
    if (activeTab && indicator && tabBar) {
      var barRect = tabBar.getBoundingClientRect();
      var tabRect = activeTab.getBoundingClientRect();
      indicator.style.left = (tabRect.left - barRect.left) + "px";
      indicator.style.width = tabRect.width + "px";
    }
  }

  // Switch between "Fit check" and "Ask a question" tabs
  function switchTab(tabName) {
    if (tabName === "fit") {
      tabFitCheck.classList.add("active");
      tabFitCheck.setAttribute("aria-selected", "true");
      tabFitCheck.setAttribute("tabindex", "0");
      tabAsk.classList.remove("active");
      tabAsk.setAttribute("aria-selected", "false");
      tabAsk.setAttribute("tabindex", "-1");

      panelFitCheck.classList.add("active");
      panelFitCheck.removeAttribute("hidden");
      panelAsk.classList.remove("active");
      panelAsk.setAttribute("hidden", "");
    } else {
      tabAsk.classList.add("active");
      tabAsk.setAttribute("aria-selected", "true");
      tabAsk.setAttribute("tabindex", "0");
      tabFitCheck.classList.remove("active");
      tabFitCheck.setAttribute("aria-selected", "false");
      tabFitCheck.setAttribute("tabindex", "-1");

      panelAsk.classList.add("active");
      panelAsk.removeAttribute("hidden");
      panelFitCheck.classList.remove("active");
      panelFitCheck.setAttribute("hidden", "");
    }
    setTimeout(updateTabIndicator, 20);
  }

  // Display only the current question in the Fit Check panel
  function showQuestion(stepIndex) {
    currentStep = stepIndex;
    updateControls();
    updateLedger();

    var q = QUESTIONS[stepIndex];
    if (!q) {
      showResult();
      return;
    }

    // Reset views
    if (questionView) questionView.style.display = "flex";
    if (resultView) resultView.style.display = "none";

    // Update Step label
    if (questionProgressLabel) {
      questionProgressLabel.innerHTML = 'Question <span class="tabular">' + (stepIndex + 1) + '</span> of <span class="tabular">' + QUESTIONS.length + '</span>';
    }

    // Update progress bar cells with animated fills
    updateProgressBar(stepIndex + 1);

    // Build current question content with full accessible radiogroup semantics
    var currentAnswerVal = userAnswers[q.id];
    var html = '<h3 id="questionTitle" class="question-title">' + escapeHtml(q.title) + '</h3>' +
      '<p class="question-helper">' + escapeHtml(q.subtitle) + '</p>' +
      '<div class="options-stack" role="radiogroup" aria-labelledby="questionTitle">';

    for (var j = 0; j < q.options.length; j++) {
      var opt = q.options[j];
      var isSelected = (currentAnswerVal === opt.value);
      var tabIndexVal = isSelected ? "0" : (currentAnswerVal ? "-1" : (j === 0 ? "0" : "-1"));
      html += '<button type="button" class="option-card' + (isSelected ? ' selected' : '') + '" role="radio" aria-checked="' + (isSelected ? 'true' : 'false') + '" tabindex="' + tabIndexVal + '" data-value="' + opt.value + '" data-label="' + escapeHtml(opt.label) + '">' +
        '<div class="option-card-content">' +
          '<span class="option-card-title">' + escapeHtml(opt.label) + '</span>' +
          '<span class="option-card-desc">' + escapeHtml(opt.desc) + '</span>' +
        '</div>' +
        '<span class="option-radio" aria-hidden="true">' +
          '<svg class="radio-check" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#0E0E0E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</span>' +
      '</button>';
    }
    html += '</div>';

    currentQuestionContainer.innerHTML = html;

    // Bind option click & accessible keyboard radiogroup navigation
    var optionCards = currentQuestionContainer.querySelectorAll('.option-card');
    for (var k = 0; k < optionCards.length; k++) {
      optionCards[k].addEventListener('click', function () {
        var val = this.getAttribute('data-value');
        var label = this.getAttribute('data-label');
        selectOption(q.id, val, label);
      });

      optionCards[k].addEventListener('keydown', function (e) {
        var cards = Array.from(currentQuestionContainer.querySelectorAll('.option-card'));
        var currentIndex = cards.indexOf(this);
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          var nextIndex = (currentIndex + 1) % cards.length;
          cards[nextIndex].focus();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          var prevIndex = (currentIndex - 1 + cards.length) % cards.length;
          cards[prevIndex].focus();
        } else if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          this.click();
        }
      });
    }
  }

  function selectOption(questionId, value, label) {
    userAnswers[questionId] = value;
    if (historyStack.indexOf(questionId) === -1) {
      historyStack.push(questionId);
    }

    updateLedger();

    var next = currentStep + 1;

    // 200ms smooth fade/slide transition between questions
    if (currentQuestionContainer) {
      currentQuestionContainer.classList.add("question-slide-out");
    }

    setTimeout(function () {
      if (next < QUESTIONS.length) {
        showQuestion(next);
        if (currentQuestionContainer) {
          currentQuestionContainer.classList.remove("question-slide-out");
          currentQuestionContainer.classList.add("question-slide-in");
          setTimeout(function () {
            currentQuestionContainer.classList.remove("question-slide-in");
          }, 200);
        }
      } else {
        showResult();
        if (currentQuestionContainer) {
          currentQuestionContainer.classList.remove("question-slide-out");
        }
      }
    }, 150);
  }

  function goBack() {
    if (currentStep > 0) {
      if (currentQuestionContainer) {
        currentQuestionContainer.classList.add("question-slide-out");
      }
      setTimeout(function () {
        showQuestion(currentStep - 1);
        if (currentQuestionContainer) {
          currentQuestionContainer.classList.remove("question-slide-out");
          currentQuestionContainer.classList.add("question-slide-in");
          setTimeout(function () {
            currentQuestionContainer.classList.remove("question-slide-in");
          }, 200);
        }
      }, 150);
    }
  }

  function restartFlow() {
    currentStep = 0;
    userAnswers = {};
    historyStack = [];
    updateLedger();
    showQuestion(0);
  }

  function updateControls() {
    if (backBtn) {
      backBtn.style.visibility = (currentStep > 0 && currentStep < QUESTIONS.length) ? "visible" : "hidden";
    }
  }

  function updateProgressBar(stepNumber) {
    if (!progressBar) return;
    progressBar.setAttribute("aria-valuenow", String(stepNumber));
    var cells = progressBar.querySelectorAll(".progress-cell");
    for (var i = 0; i < cells.length; i++) {
      if (i < stepNumber) {
        cells[i].classList.add("filled");
      } else {
        cells[i].classList.remove("filled");
      }
    }
  }

  // Answers Ledger (Left rail on desktop, <details> on mobile)
  function updateLedger() {
    var answeredCount = 0;
    var rowsHtml = '';

    for (var i = 0; i < QUESTIONS.length; i++) {
      var q = QUESTIONS[i];
      var ansVal = userAnswers[q.id];
      var isCurrent = (currentStep === i && currentStep < QUESTIONS.length);
      var isAnswered = Boolean(ansVal);
      var displayVal = "Not answered";

      if (isAnswered) {
        answeredCount++;
        for (var o = 0; o < q.options.length; o++) {
          if (q.options[o].value === ansVal) {
            displayVal = q.options[o].label;
            break;
          }
        }
      }

      var rowClasses = "ledger-row" + (isCurrent ? " current" : "") + (isAnswered ? " answered" : "");
      var clickableAttrs = isAnswered ? ' data-step="' + i + '" tabindex="0" role="button" aria-label="Return to Question ' + (i + 1) + '"' : '';

      rowsHtml += '<div class="' + rowClasses + '"' + clickableAttrs + ' role="row">' +
        '<div class="ledger-item-info">' +
          '<div class="ledger-item-meta">' +
            '<span class="ledger-num tabular">' + (i + 1) + '.</span>' +
            '<span class="ledger-label">' + escapeHtml(q.shortLabel) + '</span>' +
          '</div>' +
          '<div class="ledger-value-row">' +
            (isAnswered ? '<span class="ledger-check" aria-hidden="true"><svg viewBox="0 0 12 12" width="12" height="12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#A3E635" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' : '') +
            '<span class="ledger-value">' + escapeHtml(displayVal) + '</span>' +
          '</div>' +
        '</div>';

      if (isAnswered) {
        rowsHtml += '<button type="button" class="ledger-change-btn" data-step="' + i + '" aria-label="Change answer for ' + escapeHtml(q.shortLabel) + '">Change</button>';
      }

      rowsHtml += '</div>';
    }

    if (desktopLedgerTable) {
      desktopLedgerTable.innerHTML = rowsHtml;
    }
    if (mobileLedgerContent) {
      mobileLedgerContent.innerHTML = rowsHtml;
    }
    if (mobileAnswerCount) {
      mobileAnswerCount.textContent = String(answeredCount);
    }

    // Bind row clicks on answered steps
    var answeredRows = document.querySelectorAll(".ledger-row.answered");
    answeredRows.forEach(function (row) {
      row.addEventListener("click", function (e) {
        var targetStep = parseInt(this.getAttribute("data-step"), 10);
        switchTab("fit");
        showQuestion(targetStep);
      });
      row.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Bind "Change" buttons on ledger rows
    var changeButtons = document.querySelectorAll(".ledger-change-btn");
    changeButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var targetStep = parseInt(this.getAttribute("data-step"), 10);
        switchTab("fit");
        showQuestion(targetStep);
      });
    });
  }

  // Result View (After Q6: exactly 3 rows in order)
  function showResult() {
    currentStep = QUESTIONS.length;
    updateControls();
    updateLedger();

    if (questionView) questionView.style.display = "none";
    if (resultView) resultView.style.display = "flex";

    var role = userAnswers.role || "student";
    var goal = userAnswers.goal || "portfolio";
    var coding = userAnswers.coding || "none";
    var time = userAnswers.time || "recommended";
    var worry = userAnswers.worry || "worry_coding";

    // 1. Where you would start
    var whereToStart = "";
    if (coding === "none") {
      whereToStart = "Begin with <strong>AI &amp; Product Foundations</strong> and <strong>Product Thinking &amp; PRDs</strong>. Master framing product specifications before using AI tools for implementation.";
    } else if (role === "freelancer" || role === "business") {
      whereToStart = "Start with <strong>Full-Stack MVP Engineering</strong> and <strong>Agents &amp; Automation</strong>, then apply the commercial framework (<strong>Audit &rarr; Pilot &rarr; System</strong>) to build workflows.";
    } else {
      whereToStart = "Fast-track foundations and enter directly into <strong>AI-Assisted Development</strong> and <strong>RAG &amp; Knowledge Layers</strong> using Cursor, Supabase, and LangChain.";
    }

    // 2. What you can build
    var whatYouCanBuild = "";
    if (goal === "portfolio") {
      whatYouCanBuild = "Functional, deployed AI web MVPs (landing page generators, CRM trackers, and agentic workflows) hosted on Vercel with GitHub repositories to demonstrate proof of work. <em>(Official note: Course does not provide job placement guarantees; proof of work acts as your demonstrable capability).</em>";
    } else if (goal === "freelance_services") {
      whatYouCanBuild = "Client landing page systems, automated CRM lead capture pipelines using n8n and Supabase, and custom AI retrieval bots to deliver as commercial client services.";
    } else if (goal === "automation") {
      whatYouCanBuild = "Internal business automation systems that eliminate manual data transfer, lead routing, and customer query handling.";
    } else {
      whatYouCanBuild = "A full-stack MVP with user authentication, database tables, and AI generation features deployed to a public web domain.";
    }

    // 3. What to know before you enroll
    var whatToKnow = '<ul>';
    if (coding === "none") {
      whatToKnow += '<li><strong>Coding Background:</strong> No prior coding is required, but you must actively practice using AI developer tools alongside lessons.</li>';
    } else {
      whatToKnow += '<li><strong>Coding Background:</strong> Your background helps you progress faster through full-stack implementation and API connections.</li>';
    }

    whatToKnow += '<li><strong>3-Month Access:</strong> Access to all course materials is valid for 3 months from activation inside the Edrilla app.</li>';
    whatToKnow += '<li><strong>Self-Paced Format:</strong> 100% self-paced video lessons with no scheduled live classes; past reviews reflect previous live cohort frameworks.</li>';

    if (time === "light") {
      whatToKnow += '<li><strong>Pacing Notice:</strong> At 2-4 hours a week, you have approximately 24-48 hours over 3 months. Focus on completing 1 core MVP rather than multiple complex projects.</li>';
    } else {
      whatToKnow += '<li><strong>Recommended Pacing:</strong> 5-8 hours a week provides sufficient time to complete the 9 curriculum areas and ship your projects within 3 months.</li>';
    }

    if (worry === "worry_support") {
      whatToKnow += '<li><strong>Community Support:</strong> You gain access to the private Lapaas learner community and direct Q&amp;A access to mentor Sahil Khanna.</li>';
    } else if (worry === "worry_value") {
      whatToKnow += '<li><strong>Value at Rs 2,999:</strong> Covers full-stack shipping, deployments, and commercial systems at an accessible fee compared to typical bootcamps (Rs 30k+).</li>';
    } else if (worry === "worry_time") {
      whatToKnow += '<li><strong>Time Commitment:</strong> Plan focused building sessions each week to build momentum before the 3-month access expires.</li>';
    } else {
      whatToKnow += '<li><strong>Refund Policy:</strong> Governed by official terms (requires active participation and implementation proof; not an unconditional one-click refund).</li>';
    }
    whatToKnow += '</ul>';

    if (resultWhereToStart) resultWhereToStart.innerHTML = whereToStart;
    if (resultWhatYouCanBuild) resultWhatYouCanBuild.innerHTML = whatYouCanBuild;
    if (resultWhatToKnow) resultWhatToKnow.innerHTML = whatToKnow;
  }

  // Handle conversational free-text question
  function handleAskMessage(userText) {
    if (!chatThread) return;

    // Render User message
    var userMsgEl = document.createElement("div");
    userMsgEl.className = "user-msg";
    userMsgEl.textContent = userText;
    chatThread.appendChild(userMsgEl);

    if (chatInput) chatInput.value = "";

    // Search Knowledge Base
    var answerObj = searchKnowledgeBase(userText);

    // Render Assistant message
    var assistantMsgEl = document.createElement("div");
    assistantMsgEl.className = "assistant-msg";

    var pText = document.createElement("p");
    pText.textContent = answerObj.answer;
    assistantMsgEl.appendChild(pText);

    if (answerObj.source) {
      var pSource = document.createElement("div");
      pSource.className = "source-line";
      pSource.textContent = "Source: " + answerObj.source;
      assistantMsgEl.appendChild(pSource);
    }

    var linksRow = document.createElement("div");
    linksRow.className = "source-links";
    linksRow.innerHTML = '<a href="https://cohort.lapaas.com/" target="_blank" rel="noopener noreferrer" class="source-link">Official course page</a>' +
      '<a href="https://wa.me/919540065704" target="_blank" rel="noopener noreferrer" class="source-link">Ask Sahil on WhatsApp</a>';
    assistantMsgEl.appendChild(linksRow);

    chatThread.appendChild(assistantMsgEl);

    askMessageCount++;

    // Scroll to new message
    assistantMsgEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Client-side Keyword Search against verified facts
  function searchKnowledgeBase(query) {
    var kb = window.KNOWLEDGE_BASE || [];
    if (!kb.length) {
      return {
        answer: "The knowledge base is loading. Please refresh or check https://cohort.lapaas.com/.",
        source: "Official Page"
      };
    }

    var qLower = query.toLowerCase();
    var bestMatch = null;
    var maxScore = 0;

    for (var i = 0; i < kb.length; i++) {
      var item = kb[i];
      var score = 0;

      for (var k = 0; k < item.keywords.length; k++) {
        var kw = item.keywords[k].toLowerCase();
        if (qLower.indexOf(kw) !== -1) {
          score += (kw.length > 5 ? 3 : 2);
        }
      }

      var qWords = item.question.toLowerCase().split(/\s+/);
      for (var w = 0; w < qWords.length; w++) {
        var word = qWords[w];
        if (word.length > 3 && qLower.indexOf(word) !== -1) {
          score += 1;
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && maxScore >= 2) {
      return {
        answer: bestMatch.answer,
        source: bestMatch.source_section + " (" + bestMatch.status + ")"
      };
    }

    return {
      answer: "I cannot confirm that specific question from the official landing page details. To get a direct, verified answer, please message mentor Sahil Khanna on WhatsApp at +91 95400 65704 or visit the official page.",
      source: "Unverified Query Guardrail"
    };
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize on DOM load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
