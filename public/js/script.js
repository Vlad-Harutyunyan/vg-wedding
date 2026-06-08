/* ===================================================================
   Vlad & Galina — wedding invitation
   Pure vanilla JS, no dependencies. Static deploy.
   =================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ===================== I18N ===================== */
  var I18N = {
    en: {
      'names':'Vlad <span class="amp">&amp;</span> Galina',
      'hero.topdate':'4 July 2026 — Yerevan',
      'letter.eyebrow':'together with their families',
      'letter.names':'Vlad <span>&amp;</span> Galina',
      'letter.invite':'request the pleasure of your company',
      'letter.day':'Saturday', 'letter.place':'Yerevan, Armenia',
      'scrollHint':'scroll to open',
      'intro.accent':'the beginning of forever',
      'intro.lead':"Two souls, one story. We can't wait to celebrate the next chapter surrounded by the people we love most.",
      'px.quote':'Wherever you are, there is my home.',
      'secret.toast':'Nice eye! 👀 You found a hidden scene — try clicking the other venues too.',
      'secret.house':'🥂 The first toast — cheers to you for finding it!',
      'secret.church':'💍 A peek inside the ceremony — you are paying attention!',
      'secret.hall':'🪩 Welcome to the celebration — keep it between us!',
      'cd.eyebrow':'save the date', 'cd.title':'Counting down',
      'cd.days':'Days','cd.hours':'Hours','cd.minutes':'Minutes','cd.seconds':'Seconds',
      'house.time':'11:00 in the morning','house.title':"The Bride's House",'house.sub':'Where the day begins',
      'house.body':'Join us for morning coffee and the first toast at the Jasmin Wedding White House before we head to the ceremony.',
      'meta.when':'When','meta.where':'Where',
      'house.when':'4 July, 11:00 AM','house.where':'Jasmin Wedding White House — Paris Herouni St 40, Yerevan',
      'btn.map':'Open in Maps →',
      'church.time':'2:00 in the afternoon','church.title':'The Ceremony','church.sub':'Where we say "I do"',
      'church.body':'Our crowning will be held at Saint Gregory the Illuminator Cathedral — the largest cathedral in Armenia. Please arrive 20 minutes early.',
      'church.when':'4 July, 2:00 PM','church.where':'St. Gregory the Illuminator Cathedral — Yervand Kochar St 1, Yerevan',
      'hall.time':'5:00 in the evening','hall.title':'The Reception','hall.sub':'Where we celebrate',
      'hall.body':'Dinner, dancing and celebration at Prime Hall — until the stars fade.',
      'hall.when':'4 July, 5:00 PM','hall.where':'Prime Hall — 3 Yeghvardi Highway, Dzor, Yerevan 0054',
      'gallery.eyebrow':'a few of our favourite moments','gallery.title':'Us, lately',
      'rsvp.eyebrow':'kindly reply by 1 June','rsvp.title':'Will you join us?',
      'rsvp.name':'Your name','rsvp.name.ph':'e.g. Vlad Harutyunyan',
      'rsvp.attend':'Will you attend?','rsvp.choose':'Choose…','rsvp.yes':'Joyfully accepts','rsvp.no':'Regretfully declines',
      'rsvp.join':'Where will you join from?','rsvp.join.house':"From the bride's house (full day)",
      'rsvp.join.church':'From the church (ceremony)','rsvp.join.hall':'Reception only',
      'rsvp.count':'How many guests (including you)?',
      'rsvp.notes':'Dietary needs or a note (optional)','rsvp.notes.ph':'Vegetarian, allergies, a song request…',
      'rsvp.send':'Send RSVP',
      'footer.date':'04 . 07 . 2026 — Yerevan, Armenia',
      'footer.cal':'＋ Add to calendar','footer.rem':'Set a reminder',
      'footer.note':"Made with love. We can't wait to see you there.",
      'guest.label':'Guest {n} — full name','guest.ph':'Name of guest {n}',
      'cd.msg':'{d} days until we say "I do".','cd.today':'Today is the day!',
      'status.noname':'Please tell us your name.','status.noattend':'Please let us know if you can attend.',
      'status.yes':"Thank you, {name}! We've saved your reply for {n} guest(s). See you on 4 July.",
      'status.no':"Thank you for letting us know, {name}. You'll be missed."
    },
    ru: {
      'names':'Vlad <span class="amp">&amp;</span> Galina',
      'hero.topdate':'4 июля 2026 — Ереван',
      'letter.eyebrow':'вместе со своими семьями',
      'letter.names':'Vlad <span>&amp;</span> Galina',
      'letter.invite':'приглашают вас разделить радость',
      'letter.day':'Суббота','letter.place':'Ереван, Армения',
      'scrollHint':'прокрутите, чтобы открыть',
      'intro.accent':'начало навсегда',
      'intro.lead':'Две души, одна история. Мы с нетерпением ждём, чтобы открыть новую главу рядом с самыми близкими.',
      'px.quote':'Где ты — там мой дом.',
      'secret.toast':'Глаз-алмаз! 👀 Вы нашли скрытую сцену — попробуйте кликнуть и по другим местам.',
      'secret.house':'🥂 Первый тост — за вашу внимательность!',
      'secret.church':'💍 Загляните внутрь венчания — вы очень внимательны!',
      'secret.hall':'🪩 Добро пожаловать на праздник — только между нами!',
      'cd.eyebrow':'запланируйте день','cd.title':'Обратный отсчёт',
      'cd.days':'Дней','cd.hours':'Часов','cd.minutes':'Минут','cd.seconds':'Секунд',
      'house.time':'11:00 утра','house.title':'Дом невесты','house.sub':'Где начинается день',
      'house.body':'Присоединяйтесь к утреннему кофе и первому тосту в Jasmin Wedding White House перед поездкой в церковь.',
      'meta.when':'Когда','meta.where':'Где',
      'house.when':'4 июля, 11:00','house.where':'Jasmin Wedding White House — ул. Париза Геруни 40, Ереван',
      'btn.map':'Открыть на карте →',
      'church.time':'14:00 дня','church.title':'Венчание','church.sub':'Где мы говорим «да»',
      'church.body':'Венчание пройдёт в кафедральном соборе Святого Григория Просветителя — крупнейшем соборе Армении. Пожалуйста, приходите за 20 минут.',
      'church.when':'4 июля, 14:00','church.where':'Собор Св. Григория Просветителя — ул. Ерванда Кочара 1, Ереван',
      'hall.time':'17:00 вечера','hall.title':'Торжество','hall.sub':'Где мы празднуем',
      'hall.body':'Ужин, танцы и праздник в Prime Hall — пока не погаснут звёзды.',
      'hall.when':'4 июля, 17:00','hall.where':'Prime Hall — Ехвардское шоссе 3, Дзор, Ереван 0054',
      'gallery.eyebrow':'несколько любимых моментов','gallery.title':'Мы, недавно',
      'rsvp.eyebrow':'просим ответить до 1 июня','rsvp.title':'Присоединитесь к нам?',
      'rsvp.name':'Ваше имя','rsvp.name.ph':'напр. Влад Арутюнян',
      'rsvp.attend':'Вы придёте?','rsvp.choose':'Выберите…','rsvp.yes':'С радостью приду','rsvp.no':'К сожалению, не смогу',
      'rsvp.join':'Откуда вы присоединитесь?','rsvp.join.house':'От дома невесты (весь день)',
      'rsvp.join.church':'От церкви (венчание)','rsvp.join.hall':'Только торжество',
      'rsvp.count':'Сколько гостей (включая вас)?',
      'rsvp.notes':'Питание или примечание (по желанию)','rsvp.notes.ph':'Вегетарианец, аллергия, пожелание песни…',
      'rsvp.send':'Отправить ответ',
      'footer.date':'04 . 07 . 2026 — Ереван, Армения',
      'footer.cal':'＋ Добавить в календарь','footer.rem':'Поставить напоминание',
      'footer.note':'Сделано с любовью. Будем рады видеть вас.',
      'guest.label':'Гость {n} — полное имя','guest.ph':'Имя гостя {n}',
      'cd.msg':'{d} дней до нашего «да».','cd.today':'Сегодня тот самый день!',
      'status.noname':'Пожалуйста, укажите ваше имя.','status.noattend':'Пожалуйста, сообщите, сможете ли вы прийти.',
      'status.yes':'Спасибо, {name}! Мы сохранили ваш ответ на {n} гостя(ей). До встречи 4 июля.',
      'status.no':'Спасибо, что сообщили, {name}. Нам будет вас не хватать.'
    },
    hy: {
      'names':'Vlad <span class="amp">&amp;</span> Galina',
      'hero.topdate':'4 հուլիսի 2026 — Երևան',
      'letter.eyebrow':'ընտանիքների հետ միասին',
      'letter.names':'Vlad <span>&amp;</span> Galina',
      'letter.invite':'սիրով հրավիրում են Ձեզ',
      'letter.day':'Շաբաթ','letter.place':'Երևան, Հայաստան',
      'scrollHint':'ոլորեք՝ բացելու համար',
      'intro.accent':'հավերժության սկիզբը',
      'intro.lead':'Երկու հոգի, մեկ պատմություն։ Անհամբեր սպասում ենք այս նոր էջը բացելու մեր սիրելիների հետ։',
      'px.quote':'Որտեղ դու ես, այնտեղ է իմ տունը։',
      'secret.toast':'Աչքդ լույս 👀 Դու գտար թաքնված տեսարան — փորձիր մյուս վայրերն էլ սեղմել։',
      'secret.house':'🥂 Առաջին կենացը — կենա՛ցդ, որ գտար սա։',
      'secret.church':'💍 Հայացք պսակադրության ներսից — ուշադիր ես։',
      'secret.hall':'🪩 Բարի գալուստ տոնակատարություն — թող մնա մեր մեջ։',
      'cd.eyebrow':'նշեք օրը','cd.title':'Հաշվարկ',
      'cd.days':'Օր','cd.hours':'Ժամ','cd.minutes':'Րոպե','cd.seconds':'Վայրկյան',
      'house.time':'Առավոտյան ժ. 11:00','house.title':'Հարսի տուն','house.sub':'Որտեղ սկսվում է օրը',
      'house.body':'Միացե՛ք մեզ առավոտյան սուրճի և առաջին կենացի համար Jasmin Wedding White House-ում՝ նախքան եկեղեցի մեկնելը։',
      'meta.when':'Երբ','meta.where':'Որտեղ',
      'house.when':'4 հուլիսի, 11:00','house.where':'Jasmin Wedding White House — Փարիզ Հերունու 40, Երևան',
      'btn.map':'Բացել քարտեզում →',
      'church.time':'Ցերեկը ժ. 14:00','church.title':'Պսակադրություն','church.sub':'Որտեղ ասում ենք «այո»',
      'church.body':'Պսակադրությունը տեղի կունենա Սուրբ Գրիգոր Լուսավորիչ Մայր եկեղեցում՝ Հայաստանի ամենամեծ եկեղեցում։ Խնդրում ենք ժամանել 20 րոպե շուտ։',
      'church.when':'4 հուլիսի, 14:00','church.where':'Սուրբ Գրիգոր Լուսավորիչ Մայր Եկեղեցի — Երվանդ Քոչարի 1, Երևան',
      'hall.time':'Երեկոյան ժ. 17:00','hall.title':'Հանդիսություն','hall.sub':'Որտեղ տոնում ենք',
      'hall.body':'Ընթրիք, պար և տոնախմբություն Prime Hall-ում՝ մինչև աստղերը մարեն։',
      'hall.when':'4 հուլիսի, 17:00','hall.where':'Prime Hall — Եղվարդի խճուղի 3, Ձոր, Երևան 0054',
      'gallery.eyebrow':'մեր սիրելի պահերից','gallery.title':'Մենք՝ վերջերս',
      'rsvp.eyebrow':'խնդրում ենք պատասխանել մինչև հունիսի 1-ը','rsvp.title':'Կմիանա՞ք մեզ',
      'rsvp.name':'Ձեր անունը','rsvp.name.ph':'օր․՝ Վլադ Հարությունյան',
      'rsvp.attend':'Կներկայանա՞ք','rsvp.choose':'Ընտրեք…','rsvp.yes':'Ուրախությամբ՝ այո','rsvp.no':'Ցավոք՝ ոչ',
      'rsvp.join':'Որտեղի՞ց կմիանաք','rsvp.join.house':'Հարսի տնից (ամբողջ օրը)',
      'rsvp.join.church':'Եկեղեցուց (պսակադրությունից)','rsvp.join.hall':'Միայն հանդիսությունից',
      'rsvp.count':'Քանի՞ հյուր (ներառյալ Ձեզ)',
      'rsvp.notes':'Սննդային նախասիրություն կամ նշում (ըստ ցանկության)','rsvp.notes.ph':'Բուսակեր, ալերգիա, երգի ցանկություն…',
      'rsvp.send':'Ուղարկել պատասխանը',
      'footer.date':'04 . 07 . 2026 — Երևան, Հայաստան',
      'footer.cal':'＋ Ավելացնել օրացույց','footer.rem':'Դնել հիշեցում',
      'footer.note':'Սիրով պատրաստված։ Անհամբեր սպասում ենք Ձեզ։',
      'guest.label':'Հյուր {n} — անուն ազգանուն','guest.ph':'Հյուր {n}-ի անունը',
      'cd.msg':'{d} օր մինչև մեր «այո»-ն։','cd.today':'Այսօր այդ օրն է։',
      'status.noname':'Խնդրում ենք նշել Ձեր անունը։','status.noattend':'Խնդրում ենք նշել՝ կներկայանա՞ք։',
      'status.yes':'Շնորհակալություն, {name}։ Պահպանեցինք Ձեր պատասխանը {n} հյուրի համար։ Կտեսնվենք հուլիսի 4-ին։',
      'status.no':'Շնորհակալություն տեղեկացնելու համար, {name}։ Կկարոտենք Ձեզ։'
    }
  };

  var lang = (function () {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  })() || 'hy';
  if (!I18N[lang]) lang = 'hy';

  function t(key, vars) {
    var s = (I18N[lang] && I18N[lang][key]) || (I18N.en[key] || key);
    if (vars) { for (var k in vars) { s = s.replace(new RegExp('{' + k + '}', 'g'), vars[k]); } }
    return s;
  }

  function applyLang() {
    document.documentElement.setAttribute('lang', lang);
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!I18N[lang][key]) return;
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = I18N[lang][key];
      else el.textContent = I18N[lang][key];
    });
    $$('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (I18N[lang][key]) el.setAttribute('placeholder', I18N[lang][key]);
    });
    $$('#langSwitch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    renderGuestFields();
  }

  $$('#langSwitch button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('lang', lang); } catch (e) {}
      applyLang();
    });
  });

  /* ===================== SCROLL-DRIVEN ENVELOPE ===================== */
  var hero = $('#hero');
  var envelope = $('#envelope');
  var heroTop = $('#heroDateTop');
  var scrollHint = $('#scrollHint');
  var bar = $('#scrollProgress');
  var pxImg = $('#pxImg');

  function onScroll() {
    // hero opening progress (0..1) as it scrolls through its pinned range
    if (hero && envelope) {
      var total = hero.offsetHeight - window.innerHeight;
      var scrolled = clamp(-hero.getBoundingClientRect().top, 0, total);
      var p = total > 0 ? scrolled / total : 0;
      var flap = clamp(p / 0.30, 0, 1);
      var lift = clamp((p - 0.18) / 0.42, 0, 1);
      var seal = 1 - clamp(p / 0.16, 0, 1);
      envelope.style.setProperty('--flap', flap.toFixed(3));
      envelope.style.setProperty('--lift', lift.toFixed(3));
      envelope.style.setProperty('--sealS', seal.toFixed(3));
      if (scrollHint) scrollHint.style.opacity = (1 - clamp(p / 0.15, 0, 1)).toFixed(2);
      if (heroTop) heroTop.style.opacity = (1 - clamp((p - 0.3) / 0.3, 0, 1)).toFixed(2);
    }
    // parallax full-photo: shift bg opposite to scroll
    if (pxImg) {
      var r = pxImg.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var center = r.top + r.height / 2 - window.innerHeight / 2;
        pxImg.style.transform = 'translate3d(0,' + (center * -0.42).toFixed(1) + 'px,0)';
      }
    }
    // page-wide progress bar
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(function () { onScroll(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);

  // tap envelope -> nudge scroll so it opens
  if (envelope) {
    envelope.style.cursor = 'pointer';
    envelope.addEventListener('click', function () {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    });
  }

  /* ===================== REVEAL ON SCROLL ===================== */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('in'); }); }

  /* ===================== PETALS ===================== */
  var petalLayer = $('#petals');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // fewer petals on phones / low-power devices to keep it smooth on older hardware
  var smallScreen = window.innerWidth < 760;
  var lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  var PETALS = (smallScreen || lowCores) ? 8 : 16;
  if (petalLayer && !reduceMotion) {
    var colors = ['#ECD9C6', '#C7A44A', '#B27C5B', '#A89B94'];
    for (var i = 0; i < PETALS; i++) {
      var pt = document.createElement('span');
      pt.className = 'petal';
      var size = 8 + Math.random() * 12;
      pt.style.left = (Math.random() * 100) + 'vw';
      pt.style.width = size + 'px'; pt.style.height = size + 'px';
      pt.style.background = colors[i % colors.length];
      pt.style.opacity = (0.04 + Math.random() * 0.06).toFixed(2);
      pt.animate([
        { transform: 'translateY(-10vh) rotate(0deg)' },
        { transform: 'translateY(110vh) rotate(' + (360 + Math.random() * 360) + 'deg)' }
      ], { duration: (9 + Math.random() * 12) * 1000, delay: -Math.random() * 20000, iterations: Infinity, easing: 'linear' });
      petalLayer.appendChild(pt);
    }
  }

  /* ===================== COUNTDOWN ===================== */
  var cd = $('#countdown-timer');
  var cdMsg = $('#cdMsg');
  if (cd) {
    var target = new Date(cd.getAttribute('data-date')).getTime();
    var U = {
      days: $('[data-unit="days"]', cd), hours: $('[data-unit="hours"]', cd),
      minutes: $('[data-unit="minutes"]', cd), seconds: $('[data-unit="seconds"]', cd)
    };
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        U.days.textContent = U.hours.textContent = U.minutes.textContent = U.seconds.textContent = '00';
        if (cdMsg) cdMsg.textContent = t('cd.today');
        clearInterval(timer); return;
      }
      var d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24,
          m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
      U.days.textContent = pad(d); U.hours.textContent = pad(h);
      U.minutes.textContent = pad(m); U.seconds.textContent = pad(s);
      if (cdMsg) cdMsg.textContent = t('cd.msg', { d: d });
    };
    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ===================== RSVP: dynamic guest names ===================== */
  var countInput = $('#guestCount');
  var guestNames = $('#guestNames');
  var attending  = $('#attending');
  var countField = $('#countField');
  var joinField  = $('#joinField');

  function renderGuestFields() {
    if (!guestNames || !countInput) return;
    var values = $$('.guest-input', guestNames).map(function (i) { return i.value; });
    var n = parseInt(countInput.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 10) { n = 10; countInput.value = 10; }
    var needed = n - 1; // lead person is guest 1
    guestNames.innerHTML = '';
    for (var i = 0; i < needed; i++) {
      var idx = i + 2;
      var wrap = document.createElement('div');
      wrap.className = 'field';
      wrap.innerHTML = '<label>' + t('guest.label', { n: idx }) + '</label>' +
        '<input type="text" class="guest-input" name="guest' + idx + '" placeholder="' + t('guest.ph', { n: idx }) + '">';
      guestNames.appendChild(wrap);
      if (values[i] != null) $('input', wrap).value = values[i];
    }
  }
  if (countInput) countInput.addEventListener('input', renderGuestFields);

  if (attending) {
    attending.addEventListener('change', function () {
      var no = attending.value === 'no';
      [countField, guestNames, joinField].forEach(function (el) { if (el) el.style.display = no ? 'none' : ''; });
    });
  }

  /* ===================== RSVP submit ===================== */
  var form = $('#rsvpForm');
  var statusEl = $('#formStatus');
  function setStatus(msg, kind) { if (statusEl) { statusEl.textContent = msg; statusEl.className = 'form-status ' + (kind || ''); } }
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#leadName').value.trim();
      var going = attending ? attending.value : '';
      if (!name) { setStatus(t('status.noname'), 'err'); return; }
      if (!going) { setStatus(t('status.noattend'), 'err'); return; }
      var data = {
        name: name, attending: going,
        joinFrom: going === 'yes' ? $('#joinFrom').value : null,
        guests: going === 'yes' ? (parseInt(countInput.value, 10) || 1) : 0,
        names: $$('.guest-input', guestNames).map(function (i) { return i.value.trim(); }).filter(Boolean),
        notes: $('#notes').value.trim(), at: new Date().toISOString()
      };
      try {
        var all = JSON.parse(localStorage.getItem('rsvps') || '[]');
        all.push(data); localStorage.setItem('rsvps', JSON.stringify(all));
      } catch (err) {}
      if (going === 'yes') setStatus(t('status.yes', { name: name, n: data.guests }), 'ok');
      else setStatus(t('status.no', { name: name }), 'ok');
      form.reset();
      [countField, guestNames, joinField].forEach(function (el) { if (el) el.style.display = ''; });
      renderGuestFields();
    });
  }

  /* ===================== MOMENTS CAROUSEL (auto + drag) ===================== */
  var car = $('.carousel'), track = car && $('.carousel-track', car);
  if (car && track) {
    var GAP = 20, pos = 0, half = 0, paused = false, drag = false, sx = 0, sp = 0, moved = 0;
    function measure() { half = (track.scrollWidth + GAP) / 2; }
    function render() { track.style.transform = 'translateX(' + (-pos) + 'px)'; }
    function wrap() { if (half > 0) { if (pos >= half) pos -= half; else if (pos < 0) pos += half; } }
    measure();
    window.addEventListener('resize', measure);
    // only animate while the carousel is on screen (saves CPU at the hero)
    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(car);
    }
    if (!reduceMotion) {
      var loop = function () {
        if (visible) {
          if (!paused && !drag) pos += 0.5;   // gentle auto-glide
          wrap(); render();
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
    car.addEventListener('mouseenter', function () { paused = true; });
    car.addEventListener('mouseleave', function () { if (!drag) paused = false; });
    car.addEventListener('pointerdown', function (e) {
      drag = true; paused = true; moved = 0; sx = e.clientX; sp = pos;
      try { car.setPointerCapture(e.pointerId); } catch (_) {}
    });
    car.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      pos = sp - dx; wrap(); render();
    });
    var endDrag = function (e) {
      if (!drag) return; drag = false;
      try { car.releasePointerCapture(e.pointerId); } catch (_) {}
      setTimeout(function () { paused = false; }, 1600);
    };
    car.addEventListener('pointerup', endDrag);
    car.addEventListener('pointercancel', endDrag);
    // a real drag shouldn't trigger the lightbox
    car.addEventListener('click', function (e) {
      if (moved > 6) { e.stopPropagation(); e.preventDefault(); }
    }, true);
  }

  /* ===================== LIGHTBOX ===================== */
  var lb = $('#lightbox'), lbImg = $('#lbImg'), lbClose = $('#lbClose');
  function openLightbox(src, alt) {
    if (!lb) return;
    lbImg.src = src; lbImg.alt = alt || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() { if (lb) { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); } }
  $$('.photo-zoom img').forEach(function (img) {
    img.parentElement.addEventListener('click', function () { openLightbox(img.src, img.alt); });
  });
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  /* ===================== HIDDEN SCENES (click a venue) ===================== */
  var secretFound = false;
  try { secretFound = !!localStorage.getItem('secretFound'); } catch (e) {}
  var toastEl = null, toastTimer = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'secret-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 6000);
  }

  $$('.secret-frame').forEach(function (frame) {
    var img = frame.querySelector('img');
    if (!img) return;
    var main = img.getAttribute('src');
    var secret = frame.getAttribute('data-secret');
    var cap = document.createElement('div');
    cap.className = 'secret-cap';
    frame.appendChild(cap);
    frame.style.cursor = 'pointer';
    frame.addEventListener('click', function () {
      var showing = !frame.classList.contains('on');
      frame.classList.toggle('on', showing);
      img.setAttribute('src', showing ? secret : main);
      if (showing) {
        cap.textContent = t(frame.getAttribute('data-msg'));
        cap.classList.add('show');
        if (!secretFound) {
          secretFound = true;
          try { localStorage.setItem('secretFound', '1'); } catch (e) {}
          showToast(t('secret.toast'));
        }
      } else {
        cap.classList.remove('show');
      }
    });
  });

  /* ===================== CALENDAR / REMINDER (.ics) ===================== */
  var WEDDING = {
    title: "Vlad & Galina's Wedding",
    startUTC: '20260704T100000Z',   // 14:00 Yerevan (UTC+4)
    endUTC:   '20260704T190000Z',
    location: 'Saint Gregory the Illuminator Cathedral, Yervand Kochar St 1, Yerevan, Armenia',
    details:  "Bride's house 11:00 (Jasmin White House). Ceremony 14:00 at St. Gregory Cathedral. Reception 17:00 at Prime Hall."
  };
  function buildICS(withAlarm) {
    var L = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Vlad & Galina//Wedding//EN','CALSCALE:GREGORIAN',
      'BEGIN:VEVENT','UID:vlad-galina-2026-07-04@wedding','DTSTAMP:' + WEDDING.startUTC,
      'DTSTART:' + WEDDING.startUTC,'DTEND:' + WEDDING.endUTC,'SUMMARY:' + WEDDING.title,
      'LOCATION:' + WEDDING.location.replace(/,/g, '\\,'),'DESCRIPTION:' + WEDDING.details.replace(/,/g, '\\,')];
    if (withAlarm) {
      L.push('BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Vlad & Galina wedding is tomorrow','END:VALARM',
             'BEGIN:VALARM','TRIGGER:-PT2H','ACTION:DISPLAY','DESCRIPTION:Time to get ready for the wedding','END:VALARM');
    }
    L.push('END:VEVENT','END:VCALENDAR');
    return L.join('\r\n');
  }
  function downloadICS(withAlarm, filename) {
    var blob = new Blob([buildICS(withAlarm)], { type: 'text/calendar;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  var btnCal = $('#btnCalendar'), btnRem = $('#btnReminder');
  if (btnCal) btnCal.addEventListener('click', function () { downloadICS(false, 'vlad-galina-wedding.ics'); });
  if (btnRem) btnRem.addEventListener('click', function () { downloadICS(true, 'vlad-galina-reminder.ics'); });

  /* ===================== INIT ===================== */
  applyLang();
  onScroll();
})();
