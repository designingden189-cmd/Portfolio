const controls = document.querySelector('.gallery-tools');
const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project')];
const count = document.querySelector('.result-count');
const viewer = document.querySelector('.viewer');

controls.hidden = false;
for (const filter of filters) {
  filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    for (const option of filters) option.setAttribute('aria-pressed', String(option === filter));
    for (const project of projects) {
      project.hidden = category !== 'All' && project.dataset.category !== category;
    }
    const visibleCount = projects.filter(project => !project.hidden).length;
    count.textContent = visibleCount + (visibleCount === 1 ? ' project' : ' projects');
  });
}

if (typeof viewer.showModal === 'function') {
  const image = viewer.querySelector('.viewer-image');
  const title = viewer.querySelector('#viewer-title');
  const category = viewer.querySelector('#viewer-category');
  const description = viewer.querySelector('.viewer-description');
  let opener;

  for (const project of projects) {
    const link = project.querySelector('.project-link');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      title.textContent = project.querySelector('h3').textContent;
      category.textContent = project.dataset.category;
      description.textContent = project.querySelector('.project-description').textContent;
      image.alt = project.querySelector('img').alt;
      image.src = link.href;
      viewer.showModal();
    });
  }

  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => {
    image.removeAttribute('src');
    opener?.focus();
  });
}
