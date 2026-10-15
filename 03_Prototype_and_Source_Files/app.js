// ==========================================================================
// Lapaas AI Product Engineering — Application Logic (v2)
// Enhanced for Accuracy, Professionalism, Clarity, and Speed
// Rules Enforced:
// - Never invent course features, guarantees, outcomes or numbers
// - Strictly verified facts from https://cohort.lapaas.com/ (15 Oct 2026)
// - Uses ₹ symbol, never "Rs"
// - Unverified queries return clear "Not verified" state pointing to WhatsApp
// - "Your fit report" with 3-tier verdict, starting path (Discover, Build, Connect, Ship),
//   hesitation addressed first, and dual CTAs (Official page + WhatsApp)
// - English + Hinglish keyword matching in the Ask tab
// ==========================================================================

(function () {
  "use strict";

  // The 6 Discovery Questions (Core flow preserved, text polished to verified facts & ₹2,999)
  var QUESTIONS = [
    {
      id: "role",
      shortLabel: "Role",
      title: "1. Who are you?",
      subtitle: "Select your current stage to help tailor your recommended learning path.",
      options: [
        { label: "Student or Fresher", value: "student", desc: "In college or recent graduate seeking demonstrable proof-of-work." },
        { label: "Working Professional", value: "professional", desc: "Employed and looking to upskill in AI software & product engineering." },
        { label: "Freelancer or Marketer", value: "freelancer", desc: "Offering client services or marketing wanting to package AI workflows." },
        { label: "Business Owner", value: "business", desc: "Running a business and wanting to automate internal bottlenecks." }
      ]
    },
    {
      id: "goal",
      shortLabel: "Primary goal",
      title: "2. What is your primary goal?",
      subtitle: "What is the main outcome you want to achieve?",
      options: [
        { label: "Job or internship proof-of-work", value: "portfolio", desc: "Build working deployed projects recruiters can inspect." },
        { label: "Offer AI services to clients", value: "freelance_services", desc: "Package AI workflows, audit systems, and MVP services." },
        { label: "Build my own software product", value: "own_product", desc: "Ship my own AI SaaS, tool, or product MVP." },
        { label: "Automate internal business bottlenecks", value: "automation", desc: "Save manual hours and streamline operational workflows." }
      ]
    },
    {
      id: "coding",
      shortLabel: "Coding",
      title: "3. What is your coding background?",
      subtitle: "You can start without coding; the curriculum begins with AI and product foundations.",
      options: [
        { label: "Absolute beginner (never written code)", value: "none", desc: "No programming experience at all; ready to practise and build." },
        { label: "Basic knowledge (some HTML/Python/scripts)", value: "basic", desc: "Understand basic syntax or light scripting." },
        { label: "Comfortable programmer", value: "experienced", desc: "Familiar with web development or backend concepts." }
      ]
    },
    {
      id: "ai_exp",
      shortLabel: "AI background",
      title: "4. How have you used AI so far?",
      subtitle: "Helps gauge where you enter the curriculum.",
      options: [
        { label: "Only prompt ChatGPT / Claude", value: "chat_user", desc: "Used chat prompts for text, summaries, or ideation." },
        { label: "Tried AI tools or automation (n8n/Cursor)", value: "tools_user", desc: "Tested AI code editors or workflow tools." },
        { label: "Completely new to AI", value: "beginner_ai", desc: "Just getting started with generative AI concepts." }
      ]
    },
    {
      id: "time",
      shortLabel: "Weekly time",
      title: "5. How many hours per week can you commit?",
      subtitle: "Access is for 3 months (self-paced); steady weekly hours help build momentum.",
      options: [
        { label: "2 to 4 focused hours / week", value: "light", desc: "A few hours on weekends or evenings." },
        { label: "5 to 8 focused hours / week", value: "recommended", desc: "Several focused hours each week for steady progress." },
        { label: "10+ focused hours / week", value: "intensive", desc: "Fast-track building and deep hands-on practice." }
      ]
    },
    {
      id: "worry",
      shortLabel: "Hesitation",
      title: "6. What is your biggest hesitation?",
      subtitle: "We address this directly with verified course facts.",
      options: [
        { label: "I have no coding background—will I get stuck?", value: "worry_coding", desc: "Concern about technical friction." },
        { label: "Access is 3 months—will I run out of time?", value: "worry_time", desc: "Concern about finishing before expiration." },
        { label: "There are no live classes—will I have support?", value: "worry_support", desc: "Concern about asking questions without live batches." },
        { label: "Is it worth ₹2,999 vs free YouTube videos?", value: "worry_value", desc: "Concern about paying when free tutorials exist." }
      ]
    }
  ];

  // State
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

  var chatForm = document.getElementById("chatForm");
  var chatInput = document.getElementById("chatInput");
  var chatThread = document.getElementById("chatThread");
  var quickQuestionsGrid = document.getElementById("quickQuestionsGrid");
  var toggleQuickQuestionsBtn = document.getElementById("toggleQuickQuestionsBtn");

  // Result Elements
  var resultVerdictTitle = document.getElementById("resultVerdictTitle");
  var resultVerdictSubtitle = document.getElementById("resultVerdictSubtitle");
  var fitVerdictCard = document.getElementById("fitVerdictCard");
  var verdictPill = document.getElementById("verdictPill");
  var verdictHeading = document.getElementById("verdictHeading");
  var verdictReasonsList = document.getElementById("verdictReasonsList");
  var startingPathSub = document.getElementById("startingPathSub");
  var startingPathGrid = document.getElementById("startingPathGrid");
  var resultHesitationLabel = document.getElementById("resultHesitationLabel");
  var resultHesitationContent = document.getElementById("resultHesitationContent");

  function init() {
    setupEventListeners();
    updateLedger();
    showQuestion(0);
    setTimeout(updateTabIndicator, 80);
    window.addEventListener("resize", updateTabIndicator);
  }

  function setupEventListeners() {
    // Tabs switching
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
          setTimeout(function () {
            var firstOption = currentQuestionContainer.querySelector(".option-card");
            if (firstOption) firstOption.focus();
          }, 350);
        }
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

    // Quick question chips
    if (quickQuestionsGrid) {
      quickQuestionsGrid.addEventListener("click", function (e) {
        var card = e.target.closest(".quick-question-card");
        if (card) {
          var query = card.getAttribute("data-query");
          if (query) {
            handleAskMessage(query);
          }
        }
      });
    }

    // Mobile quick questions drawer toggle
    if (toggleQuickQuestionsBtn) {
      toggleQuickQuestionsBtn.addEventListener("click", function () {
        if (quickQuestionsGrid) {
          var isHidden = (quickQuestionsGrid.style.display === "none");
          quickQuestionsGrid.style.display = isHidden ? "grid" : "none";
          toggleQuickQuestionsBtn.textContent = isHidden ? "Hide questions" : "Common questions";
        }
      });
    }
  }

  function switchTab(mode) {
    if (mode === "fit") {
      if (tabFitCheck) {
        tabFitCheck.classList.add("active");
        tabFitCheck.setAttribute("aria-selected", "true");
        tabFitCheck.tabIndex = 0;
      }
      if (tabAsk) {
        tabAsk.classList.remove("active");
        tabAsk.setAttribute("aria-selected", "false");
        tabAsk.tabIndex = -1;
      }
      if (panelFitCheck) {
        panelFitCheck.classList.add("active");
        panelFitCheck.hidden = false;
      }
      if (panelAsk) {
        panelAsk.classList.remove("active");
        panelAsk.hidden = true;
      }
    } else {
      if (tabAsk) {
        tabAsk.classList.add("active");
        tabAsk.setAttribute("aria-selected", "true");
        tabAsk.tabIndex = 0;
      }
      if (tabFitCheck) {
        tabFitCheck.classList.remove("active");
        tabFitCheck.setAttribute("aria-selected", "false");
        tabFitCheck.tabIndex = -1;
      }
      if (panelAsk) {
        panelAsk.classList.add("active");
        panelAsk.hidden = false;
      }
      if (panelFitCheck) {
        panelFitCheck.classList.remove("active");
        panelFitCheck.hidden = true;
      }

      // First time opening Ask tab, show quick intro
      if (askMessageCount === 0 && chatThread && chatThread.children.length === 0) {
        renderWelcomeMessage();
      }
    }
    updateTabIndicator();
  }

  function updateTabIndicator() {
    var activeTab = panelFitCheck && panelFitCheck.classList.contains("active") ? tabFitCheck : tabAsk;
    if (activeTab && tabIndicator) {
      tabIndicator.style.left = activeTab.offsetLeft + "px";
      tabIndicator.style.width = activeTab.offsetWidth + "px";
    }
  }

  function renderWelcomeMessage() {
    var msgEl = document.createElement("div");
    msgEl.className = "assistant-msg";
    msgEl.innerHTML = '<p>Hi! I answer questions strictly based on the official Lapaas AI Product Engineering course details (cohort.lapaas.com, checked 15 Oct 2026).</p>' +
      '<p>Ask in simple English or Hinglish about price, hours, prerequisites, format, community, or policies. Anything not verified on the official page is marked as Not Verified and points to WhatsApp.</p>' +
      '<div class="source-line"><span class="source-chip">Source: Official Cohort Page (Verified Facts)</span></div>';
    chatThread.appendChild(msgEl);
  }

  function showQuestion(index) {
    currentStep = index;
    updateControls();
    updateProgressBar(index + 1);

    if (resultView) resultView.style.display = "none";
    if (questionView) questionView.style.display = "flex";

    var q = QUESTIONS[index];
    if (!q || !currentQuestionContainer) return;

    if (questionProgressLabel) {
      questionProgressLabel.innerHTML = 'Question <span class="tabular">' + (index + 1) + '</span> of <span class="tabular">' + QUESTIONS.length + '</span>';
    }

    var currentAnswerVal = userAnswers[q.id];

    var html = '<h3 class="question-title">' + escapeHtml(q.title) + '</h3>' +
      '<p class="question-helper">' + escapeHtml(q.subtitle) + '</p>' +
      '<div class="options-stack" role="radiogroup" aria-label="' + escapeHtml(q.title) + '">';

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

    // Smooth transition
    if (currentQuestionContainer) {
      currentQuestionContainer.classList.add("question-slide-out");
    }

    setTimeout(function () {
      if (next < QUESTIONS.length) {
        showQuestion(next);
        if (window.innerWidth <= 768 && questionView) {
          var rect = questionView.getBoundingClientRect();
          if (rect.top < 10) {
            questionView.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        if (currentQuestionContainer) {
          currentQuestionContainer.classList.remove("question-slide-out");
          currentQuestionContainer.classList.add("question-slide-in");
          setTimeout(function () {
            currentQuestionContainer.classList.remove("question-slide-in");
          }, 200);
        }
      } else {
        showResult();
        if (window.innerWidth <= 768 && resultView) {
          resultView.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (currentQuestionContainer) {
          currentQuestionContainer.classList.remove("question-slide-out");
        }
      }
    }, 150);
  }

  function goBack() {
    if (currentStep >= QUESTIONS.length) {
      // From Result view, go back to Question 6
      showQuestion(QUESTIONS.length - 1);
    } else if (currentStep > 0) {
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
      if (currentStep === 0) {
        backBtn.style.visibility = "hidden";
        backBtn.disabled = true;
      } else {
        backBtn.style.visibility = "visible";
        backBtn.disabled = false;
      }
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

    if (desktopLedgerTable) desktopLedgerTable.innerHTML = rowsHtml;
    if (mobileLedgerContent) mobileLedgerContent.innerHTML = rowsHtml;
    if (mobileAnswerCount) mobileAnswerCount.textContent = String(answeredCount);

    // Bind row clicks on answered steps
    var answeredRows = document.querySelectorAll(".ledger-row.answered");
    answeredRows.forEach(function (row) {
      row.addEventListener("click", function (e) {
        var targetStep = parseInt(this.getAttribute("data-step"), 10);
        switchTab("fit");
        showQuestion(targetStep);
        var mobileLedger = document.getElementById("mobileLedger");
        if (mobileLedger && mobileLedger.open) {
          mobileLedger.open = false;
        }
        if (window.innerWidth <= 768 && questionView) {
          questionView.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
        var mobileLedger = document.getElementById("mobileLedger");
        if (mobileLedger && mobileLedger.open) {
          mobileLedger.open = false;
        }
        if (window.innerWidth <= 768 && questionView) {
          questionView.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ==========================================================================
  // Task 3: "Your fit report" with 3-tier verdict, starting path & details
  // ==========================================================================
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

    // --- 1. Evaluate 3-Tier Fit Verdict ---
    var verdictTier = "good";
    var verdictTitle = "Good fit now";
    var reasons = [];

    // Decision Logic
    if (worry === "worry_support" || (time === "light" && worry === "worry_time") || (coding === "none" && worry === "worry_coding" && time === "light")) {
      verdictTier = "check";
      verdictTitle = "Check these points first";

      if (worry === "worry_support") {
        reasons.push("The course is 100% self-paced online with no scheduled live classes (past cohort reviews reflect an earlier completed live cohort).");
      }
      if (time === "light") {
        reasons.push("At 2 to 4 focused hours/week, you will have 24–48 hours total over 3 months; building working MVPs requires consistent weekly practice.");
      } else {
        reasons.push("Access is strictly for 3 months from activation inside the Edrilla app; ensure your calendar allows focused building time before enrolling.");
      }
      reasons.push("No job guarantee is stated anywhere on the page; tangible outcomes depend entirely on your demonstrable proof-of-work.");

    } else if (time === "light") {
      verdictTier = "plan";
      verdictTitle = "Good fit if you plan weekly time";

      reasons.push("Your chosen 2–4 hours/week provides 24–48 total hours over your 3 months of access inside the Edrilla app.");
      reasons.push("To ship working products within the 3-month window, we recommend planning 1–2 dedicated building blocks each week rather than sporadic sessions.");
      reasons.push("Focus on completing 1 core MVP (e.g. an AI web tool or automation) rather than attempting multiple complex projects.");

    } else {
      verdictTier = "good";
      verdictTitle = "Good fit now";

      if (role === "student") {
        reasons.push("As a Student/Fresher, the curriculum's focus on deployed MVPs on Vercel directly produces a verifiable proof-of-work portfolio for hiring conversations.");
      } else if (role === "business") {
        reasons.push("As a Business Owner, learning n8n automations, Supabase data layers, and AI bots enables streamlining internal operational bottlenecks.");
      } else if (role === "freelancer") {
        reasons.push("As a Freelancer/Marketer, the 4-phase framework equips you to package AI workflows and commercial client services (audit, pilot, system).");
      } else {
        reasons.push("As a Working Professional, learning full-stack AI product engineering bridges the gap between chat prompting and shipping real software.");
      }

      if (coding === "none") {
        reasons.push("You can start without coding experience; foundations are taught upfront before moving to AI developer tools.");
      } else {
        reasons.push("Your coding background allows you to accelerate through foundations and dive deeply into RAG, APIs, and full-stack MVPs.");
      }

      reasons.push("Your weekly commitment of " + (time === "intensive" ? "10+ focused hours" : "5–8 focused hours") + " provides ample runway to build and ship within your 3 months of access.");
    }

    // Apply Verdict to DOM
    if (resultVerdictTitle) resultVerdictTitle.textContent = verdictTitle;
    if (fitVerdictCard) {
      fitVerdictCard.className = "fit-verdict-card tier-" + verdictTier;
    }
    if (verdictPill) {
      verdictPill.className = "verdict-pill tier-" + verdictTier;
      verdictPill.textContent = verdictTitle;
    }
    if (verdictHeading) verdictHeading.textContent = verdictTitle;

    if (verdictReasonsList) {
      var reasonsHtml = '';
      for (var r = 0; r < reasons.length; r++) {
        reasonsHtml += '<li>' + escapeHtml(reasons[r]) + '</li>';
      }
      verdictReasonsList.innerHTML = reasonsHtml;
    }

    // --- 2. Recommended Starting Path (Discover, Build, Connect, Ship) ---
    var phases = [
      {
        phase: "Phase 1: Discover",
        title: "AI Foundations & PRDs",
        desc: "Master product thinking, user specifications, and structured PRDs before touching code."
      },
      {
        phase: "Phase 2: Build",
        title: "AI-Assisted Full-Stack MVPs",
        desc: "Use Cursor and modern developer tools to build working web interfaces and Supabase data layers."
      },
      {
        phase: "Phase 3: Connect",
        title: "RAG & Automation Agents",
        desc: "Integrate LLM APIs, knowledge retrieval (RAG), and automated workflow pipelines using n8n."
      },
      {
        phase: "Phase 4: Ship",
        title: "Deploy & Proof-of-Work",
        desc: "Deploy your working software to Vercel with GitHub repositories to showcase your capability."
      }
    ];

    // Tailor specific phase descriptions by role / goal
    if (goal === "portfolio" || role === "student") {
      phases[3].desc = "Deploy a public web MVP on Vercel with clean GitHub documentation to use as tangible proof-of-work for recruiters.";
    } else if (goal === "automation" || role === "business") {
      phases[2].desc = "Connect n8n workflows and Supabase databases to automate repetitive manual operations and internal bottlenecks.";
      phases[3].desc = "Deploy custom internal operational tools with live database sync and automated error logging.";
    } else if (goal === "freelance_services" || role === "freelancer") {
      phases[1].desc = "Build client landing engines and lead-capture systems using AI-assisted full-stack development.";
      phases[3].desc = "Package your solution using the commercial framework (Audit &rarr; Pilot &rarr; System) for client engagements.";
    }

    if (startingPathGrid) {
      var gridHtml = '';
      for (var p = 0; p < phases.length; p++) {
        gridHtml += '<div class="path-phase-card">' +
          '<span class="path-phase-tag">' + escapeHtml(phases[p].phase) + '</span>' +
          '<h5 class="path-phase-name">' + escapeHtml(phases[p].title) + '</h5>' +
          '<p class="path-phase-desc">' + phases[p].desc + '</p>' +
        '</div>';
      }
      startingPathGrid.innerHTML = gridHtml;
    }

    // --- 3. Hesitation Addressed First ---
    var hesitationTitle = "Your Hesitation";
    var hesitationText = "";

    if (worry === "worry_coding") {
      hesitationTitle = "No coding background";
      hesitationText = "<p><strong>Verified fact:</strong> You can start without coding experience. The curriculum begins with AI, product, and development foundations before introducing developer tools. However, you should still expect to actively practise and build alongside the lessons using AI developer tools.</p>";
    } else if (worry === "worry_time") {
      hesitationTitle = "3 months of access duration";
      hesitationText = "<p><strong>Verified fact:</strong> Access is valid for 3 months from activation inside the Edrilla app. Because the course is 100% self-paced with no scheduled live classes, you choose when to watch and build. Learners dedicating a few to several focused hours each week have sufficient time to complete assignments and deploy working products.</p>";
    } else if (worry === "worry_support") {
      hesitationTitle = "Support without live classes";
      hesitationText = "<p><strong>Verified fact:</strong> While there are no scheduled live classes (the framework was tested in a completed live cohort), your enrolment includes access to the Lapaas learner community. In the community, you can directly contact mentor Sahil Khanna and ask questions as you build.</p>";
    } else {
      hesitationTitle = "Course value at ₹2,999 vs free tutorials";
      hesitationText = "<p><strong>Verified fact:</strong> At ₹2,999 one-time (GST included), the course provides an end-to-end practical framework across 4 phases (Discover, Build, Connect, Ship) with slide decks, lab files, assignments, and mentor access in the Lapaas learner community, offering a structured alternative to fragmented online videos.</p>";
    }

    if (resultHesitationLabel) resultHesitationLabel.textContent = hesitationTitle;
    if (resultHesitationContent) resultHesitationContent.innerHTML = hesitationText;
  }

  // ==========================================================================
  // Task 4 & 6: Ask Tab with Source Chips, "Not verified" state & Hinglish
  // ==========================================================================
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

    // Source chip & Verification status
    var metaLine = document.createElement("div");
    metaLine.className = "source-line";

    if (answerObj.status === "NOT_VERIFIED") {
      var unverifiedBadge = document.createElement("span");
      unverifiedBadge.className = "badge-unverified";
      unverifiedBadge.textContent = "Not verified on official page";
      metaLine.appendChild(unverifiedBadge);
    }

    if (answerObj.source_section) {
      var sourceChip = document.createElement("span");
      sourceChip.className = "source-chip";
      sourceChip.textContent = "Source: " + answerObj.source_section;
      metaLine.appendChild(sourceChip);
    }

    assistantMsgEl.appendChild(metaLine);

    // Dual action links
    var linksRow = document.createElement("div");
    linksRow.className = "source-links";
    linksRow.innerHTML = '<a href="https://cohort.lapaas.com/" target="_blank" rel="noopener noreferrer" class="source-link">Official course page</a>' +
      '<a href="https://wa.me/919540065704" target="_blank" rel="noopener noreferrer" class="source-link whatsapp-link">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" style="margin-right: 4px;"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>' +
        'Ask on WhatsApp' +
      '</a>';
    assistantMsgEl.appendChild(linksRow);

    chatThread.appendChild(assistantMsgEl);

    askMessageCount++;

    // Scroll to message
    assistantMsgEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Client-side Keyword Search supporting English & Hinglish
  function searchKnowledgeBase(query) {
    var kb = window.KNOWLEDGE_BASE || [];
    if (!kb.length) {
      return {
        answer: "The knowledge base is loading. Please refresh or visit https://cohort.lapaas.com/.",
        source_section: "Official Cohort Page",
        status: "VERIFIED"
      };
    }

    var qNorm = query.toLowerCase().replace(/[?,!.]/g, " ").trim();
    var bestMatch = null;
    var maxScore = 0;

    for (var i = 0; i < kb.length; i++) {
      var item = kb[i];
      var score = 0;

      // 1. Keyword & Hinglish phrase matches
      for (var k = 0; k < item.keywords.length; k++) {
        var kw = item.keywords[k].toLowerCase();
        if (qNorm.indexOf(kw) !== -1) {
          // Exact phrase match gets high weight
          score += (kw.indexOf(" ") !== -1 ? 6 : 3);
        }
      }

      // 2. Word matches with question title
      var qWords = item.question.toLowerCase().split(/\s+/);
      for (var w = 0; w < qWords.length; w++) {
        var word = qWords[w].replace(/[?,!.]/g, "");
        if (word.length > 3 && qNorm.indexOf(word) !== -1) {
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
        source_section: bestMatch.source_section,
        status: bestMatch.status
      };
    }

    // Default Fallback: Clear "Not verified" state
    return {
      answer: "Not verified. This detail is not stated on the official cohort page (cohort.lapaas.com). Because we strictly do not guess or invent course policies, please ask founder and mentor Sahil Khanna directly on WhatsApp for verified confirmation.",
      source_section: "Official Cohort Page (checked 15 Oct 2026)",
      status: "NOT_VERIFIED"
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
