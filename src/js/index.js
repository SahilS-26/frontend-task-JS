import { QUERY_TYPES, QUERY_SUB_OPTIONS, SUB_LABELS } from './dropdownData';
import { initDropdowns, renderOptions } from './dropdown';

function greet() {
  console.log(
    'Hello Good Day Mate!!! \nPage Loaded sucessfully with parcel!!! \nI see it now ^_^'
  );
}
document.addEventListener('DOMContentLoaded', greet);

// 1) Dropdown - Logic
initDropdowns();
// Initial render
renderOptions('queryTypeDropdown', QUERY_TYPES);
const subDropdown = document.getElementById('projectDropdown');
if (subDropdown) {
  const subSelected = subDropdown.querySelector('.dropdown-selected');
  if (subSelected) subSelected.textContent = 'Select Option';
  subDropdown.classList.add('hidden');
  renderOptions('projectDropdown', []);
}

// React to changes in the first dropdown
document
  .getElementById('queryTypeDropdown')
  .addEventListener('dropdown:change', e => {
    const type = e.detail.value;
    const sub = document.getElementById('projectDropdown');
    if (!sub) return;

    const subSelected = sub.querySelector('.dropdown-selected');
    if (subSelected) {
      subSelected.textContent = SUB_LABELS[type] || 'Select Option';
    }

    const items = QUERY_SUB_OPTIONS[type] || [];
    if (items.length) {
      renderOptions('projectDropdown', items);
      const hidden = sub.nextElementSibling;
      if (hidden && hidden.type === 'hidden') hidden.value = '';
      sub.classList.remove('hidden');
    } else {
      renderOptions('projectDropdown', []);
      sub.classList.add('hidden');
    }
  });

// 2) Scroll to Top - Logic
function setupScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

setupScrollToTop();

// 3) Sticky header
function initStickyHeader() {
  const header = document.querySelector('.header-section');

  if (!header) return;

  const tempDivPlaceHolder = document.createElement('div');
  tempDivPlaceHolder.style.height = `${header.offsetHeight}px`;
  tempDivPlaceHolder.style.display = 'none';
  header.parentNode.insertBefore(tempDivPlaceHolder, header);

  function handleScroll() {
    if (window.scrollY >= 300) {
      header.classList.add('sticky');
      tempDivPlaceHolder.style.display = 'block';
    } else {
      header.classList.remove('sticky');
      tempDivPlaceHolder.style.display = 'none';
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);
}
document.addEventListener('DOMContentLoaded', initStickyHeader);
