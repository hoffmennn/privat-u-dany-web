/* Privát u Dany — mobile nav, lightbox gallery, footer year */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }

  /* ---------- Lightbox ---------- */
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  const box = document.getElementById('lightbox');
  if (!triggers.length || !box) return;

  const img = box.querySelector('.lightbox__img');
  const caption = box.querySelector('.lightbox__caption');
  const counter = box.querySelector('.lightbox__counter');
  const btnClose = box.querySelector('.lightbox__close');
  const btnPrev = box.querySelector('.lightbox__prev');
  const btnNext = box.querySelector('.lightbox__next');

  // Group items by data-lightbox value, so each gallery pages within itself.
  let group = [];
  let index = 0;
  let lastFocus = null;

  const show = (i) => {
    index = (i + group.length) % group.length;
    const el = group[index];
    const thumb = el.querySelector('img');
    img.src = el.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    caption.textContent = el.dataset.caption || (thumb ? thumb.alt : '');
    counter.textContent = `${index + 1} / ${group.length}`;
    const multi = group.length > 1;
    btnPrev.hidden = !multi;
    btnNext.hidden = !multi;
  };

  const open = (el) => {
    group = triggers.filter((t) => t.dataset.lightbox === el.dataset.lightbox);
    lastFocus = document.activeElement;
    show(group.indexOf(el));
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    btnClose.focus();
  };

  const close = () => {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  };

  triggers.forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(el);
    })
  );

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(index - 1));
  btnNext.addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.classList.contains('lightbox__figure')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch devices
  let startX = null;
  box.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();

/* ---------- Footer year ---------- */
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
