(() => {
  const ids = ['portada', 'carta', 'video', 'final'];
  const slides = ids.map(id => document.getElementById(id));
  const dots = [...document.querySelectorAll('.dot')];
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const video = document.getElementById('birthday-video');
  let current = 0;

  function show(index) {
    const target = Math.max(0, Math.min(ids.length - 1, index));
    if (current === 2 && target !== 2 && video && !video.paused) video.pause();
    current = target;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.hidden = !active;
      slide.classList.toggle('active', active);
    });
    dots.forEach((dot, i) => dot.classList.toggle('selected', i === current));
    prev.disabled = current === 0;
    next.disabled = current === ids.length - 1;
    if (current === 2 && video) video.load();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  document.querySelectorAll('[data-go]').forEach(button => {
    button.addEventListener('click', () => show(ids.indexOf(button.dataset.go)));
  });
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'ArrowLeft') show(current - 1);
  });
})();
