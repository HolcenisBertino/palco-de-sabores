const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
const heroVideo = document.querySelector('.hero-video');
heroVideo.playbackRate = 0.72;
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.menu-tabs button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.menu-tabs button.active').classList.remove('active');
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.dish').forEach(dish => {
    dish.style.display = filter === 'all' || dish.dataset.category === filter ? 'grid' : 'none';
  });
}));

const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  const source = item.dataset.full;
  const isVideo = source.endsWith('.mp4');
  lightboxContent.innerHTML = isVideo ? `<video src="${source}" controls autoplay playsinline></video>` : `<img src="${source}" alt="Imagem ampliada">`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}));
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxContent.innerHTML = '';
}
document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
