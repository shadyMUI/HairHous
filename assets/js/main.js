/* =============================================================
   HAIR HOUSE — Asti
   Nessuna libreria. Senza JavaScript il sito resta leggibile
   e navigabile: qui c'è solo quello che aggiunge comodità.
   ============================================================= */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     Header: nero appena si esce dall'hero.
     Le pagine interne partono già solide (.header--solid).
     ----------------------------------------------------------- */
  var header = document.querySelector('.header');
  if (header && !header.classList.contains('header--solid')) {
    var stuck = false;
    var onScroll = function () {
      var next = window.scrollY > 40;
      if (next !== stuck) {
        stuck = next;
        header.classList.toggle('is-stuck', stuck);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------------------------
     Menu a tutto schermo
     ----------------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  if (burger && menu) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('data-open', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('is-locked', open);
    };

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });

    window.matchMedia('(min-width: 1000px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* -----------------------------------------------------------
     Comparsa allo scroll
     ----------------------------------------------------------- */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
      // threshold 0: un blocco più alto dello schermo (il listino, la
      // griglia dei lavori) non raggiungerebbe mai una percentuale di sé
      // stesso, e comparirebbe in ritardo o mai.
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* -----------------------------------------------------------
     LAVORI — filtri per servizio.
     Senza JS restano visibili tutti: i filtri sono una comodità,
     non il modo per raggiungere i contenuti.
     ----------------------------------------------------------- */
  var grid = document.querySelector('[data-works]');
  var bar = document.querySelector('[data-filters]');
  var works = grid ? Array.prototype.slice.call(grid.querySelectorAll('.work')) : [];
  var visible = works.slice();

  if (grid && bar) {
    var empty = document.querySelector('[data-works-empty]');
    var chips = Array.prototype.slice.call(bar.querySelectorAll('.filter'));

    chips.forEach(function (chip) {
      var cat = chip.dataset.cat;
      var n = cat === 'all'
        ? works.length
        : works.filter(function (w) { return w.dataset.cat === cat; }).length;
      var slot = chip.querySelector('.filter__n');
      if (slot) slot.textContent = n;
      if (n === 0 && cat !== 'all') chip.hidden = true;
    });

    var applyFilter = function (cat, animate) {
      visible = [];

      works.forEach(function (w) {
        var show = cat === 'all' || w.dataset.cat === cat;
        w.hidden = !show;
        w.classList.remove('is-shown');
        if (show) visible.push(w);
      });

      // Un solo reflow forzato: serve a far ripartire l'animazione di
      // entrata, che altrimenti il browser considera già eseguita.
      if (animate && !reduced) void grid.offsetWidth;

      visible.forEach(function (w, i) {
        w.dataset.index = i;
        if (animate && !reduced) {
          // Lo scaglionamento si ferma alla dodicesima: oltre, l'attesa
          // dell'ultima foto si sentirebbe.
          w.style.setProperty('--i', String(Math.min(i, 11)));
          w.classList.add('is-shown');
        }
      });

      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.cat === cat)); });
      if (empty) empty.hidden = visible.length > 0;

      // Il carosello è definito più sotto: al primo giro non esiste ancora.
      if (typeof refreshCarousels === 'function') refreshCarousels(animate);
    };

    bar.addEventListener('click', function (e) {
      var chip = e.target.closest('.filter');
      if (chip) applyFilter(chip.dataset.cat, true);
    });

    // Al primo caricamento niente animazione: ci pensa già la comparsa
    // allo scroll dell'intera griglia.
    applyFilter('all', false);
  }

  /* -----------------------------------------------------------
     Carosello dei lavori.
     Lo scorrimento lo fa il browser (overflow-x + scroll-snap):
     qui ci sono solo le frecce e l'indicatore di posizione, che su
     telefono è l'unico modo per capire quante foto restano.
     ----------------------------------------------------------- */
  var carousels = [];

  document.querySelectorAll('[data-carousel]').forEach(function (box) {
    var track = box.querySelector('.works');
    if (!track) return;

    var prev = box.querySelector('[data-scroll="-1"]');
    var next = box.querySelector('[data-scroll="1"]');
    var progress = box.querySelector('[data-carousel-progress]');

    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      box.classList.toggle('is-scrollable', max > 4);

      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max - 2;

      if (progress) {
        var ratio = Math.min(track.clientWidth / track.scrollWidth, 1);
        progress.style.width = (ratio * 100) + '%';
        // Lo spostamento è in percentuale della barretta stessa
        var corsa = ratio < 1 ? ((1 - ratio) / ratio) * 100 : 0;
        progress.style.transform =
          'translateX(' + (max > 0 ? (track.scrollLeft / max) * corsa : 0) + '%)';
      }
    };

    var passo = function () {
      var w = track.clientWidth;
      var primo = track.querySelector('.work:not([hidden])');
      // Una schermata piena, arrotondata a un numero intero di foto
      if (!primo) return w;
      var larghezza = primo.getBoundingClientRect().width + 12;
      return Math.max(larghezza, Math.floor(w / larghezza) * larghezza);
    };

    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -passo(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: passo(), behavior: 'smooth' }); });

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    carousels.push({ track: track, update: update });
    update();
  });

  var refreshCarousels = function (rewind) {
    carousels.forEach(function (c) {
      if (rewind) c.track.scrollTo({ left: 0, behavior: 'auto' });
      c.update();
    });
  };

  /* -----------------------------------------------------------
     Lightbox sui lavori.
     <dialog> nativo: Esc, trappola del focus e sfondo li gestisce
     il browser, non serve riscriverli.
     ----------------------------------------------------------- */
  var lb = document.getElementById('lightbox');

  if (lb && works.length && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('[data-lb-img]');
    var lbTec = lb.querySelector('[data-lb-tec]');
    var lbBy = lb.querySelector('[data-lb-by]');
    var lbCount = lb.querySelector('[data-lb-count]');
    var current = 0;

    var show = function (i) {
      if (!visible.length) return;
      current = (i + visible.length) % visible.length;
      var w = visible[current];
      var img = w.querySelector('img');
      lbImg.src = img.getAttribute('src');
      lbImg.alt = img.getAttribute('alt') || '';
      lbTec.textContent = w.dataset.tec || '';
      lbBy.textContent = w.dataset.by || '';
      lbCount.textContent = (current + 1) + ' / ' + visible.length;
    };

    grid.addEventListener('click', function (e) {
      var w = e.target.closest('.work');
      if (!w || w.classList.contains('is-missing')) return;
      show(Number(w.dataset.index) || 0);
      lb.showModal();
    });

    lb.addEventListener('click', function (e) {
      if (e.target.closest('[data-lb-close]')) { lb.close(); return; }
      var nav = e.target.closest('.lb__nav');
      if (nav) { show(current + Number(nav.dataset.dir)); return; }
      if (e.target === lb || e.target.classList.contains('lb__stage')) lb.close();
    });

    lb.addEventListener('keydown', function (e) {
      if (!lb.open) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });

    // Scorrimento col dito: su telefono è il gesto che ci si aspetta,
    // le frecce restano per chi usa mouse o tastiera.
    var startX = 0, startY = 0, tracking = false;

    lb.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { tracking = false; return; }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });

    lb.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      // Solo se il gesto è chiaramente orizzontale: verticale = scorrimento
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  } else if (lb) {
    lb.remove();
    works.forEach(function (w) { w.style.cursor = 'default'; });
  }

  /* -----------------------------------------------------------
     Fisarmoniche
     ----------------------------------------------------------- */
  document.querySelectorAll('[data-acc]').forEach(function (group) {
    var buttons = group.querySelectorAll('.acc__btn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') === 'true';

        if (!open && group.dataset.acc === 'single') {
          buttons.forEach(function (other) {
            if (other === btn) return;
            other.setAttribute('aria-expanded', 'false');
            var op = document.getElementById(other.getAttribute('aria-controls'));
            if (op) op.setAttribute('data-open', 'false');
          });
        }

        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.setAttribute('data-open', String(!open));
      });
    });
  });

  /* -----------------------------------------------------------
     Barra azioni mobile
     ----------------------------------------------------------- */
  var mobar = document.querySelector('.mobar');
  if (mobar) {
    var toggleBar = function () {
      mobar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.55);
    };
    window.addEventListener('scroll', toggleBar, { passive: true });
    toggleBar();
  }

  /* -----------------------------------------------------------
     Foto mancanti: il riquadro dice quale file va messo in
     assets/img/ invece di mostrare un'icona rotta. Sparisce da
     solo quando la foto c'è.
     ----------------------------------------------------------- */
  var flagMissing = function (img) {
    var box = img.closest('.work, .member__shot, .hero__media, .plate__media, .shot');
    if (!box) return;
    box.classList.add('is-missing');
    if (!box.hasAttribute('data-file')) {
      box.setAttribute('data-file', img.getAttribute('src').split('/').pop());
    }
  };

  document.querySelectorAll('img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) flagMissing(img);
    img.addEventListener('error', function () { flagMissing(img); });
  });

  /* -----------------------------------------------------------
     Orari: evidenzia il giorno corrente
     ----------------------------------------------------------- */
  var today = new Date().getDay(); // 0 = domenica
  document.querySelectorAll('.hours__row[data-day]').forEach(function (row) {
    if (Number(row.dataset.day) === today) row.classList.add('is-today');
  });

  /* -----------------------------------------------------------
     Anno nel footer
     ----------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* -----------------------------------------------------------
     PRENOTAZIONE
     Due soli modi: WhatsApp e telefono. Niente moduli, niente
     backend, niente campi da compilare.

     ▸ IL NUMERO SI CAMBIA QUI, UNA VOLTA SOLA.
       Formato: prefisso internazionale senza «+» e senza spazi.
       Esempio: 393331234567

     Finché resta il segnaposto i bottoni continuano a chiamare il
     salone: non si finisce mai su un link rotto.
     ----------------------------------------------------------- */
  var WHATSAPP = '393299622913';   // +39 329 962 2913

  if (/^\d{8,15}$/.test(WHATSAPP)) {
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      var testo = a.dataset.waText || 'Ciao Hair House, vorrei prenotare un appuntamento.';
      a.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(testo);
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }
})();
