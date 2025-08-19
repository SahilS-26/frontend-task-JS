import { QUERY_TYPES, QUERY_SUB_OPTIONS, SUB_LABELS } from './dropdownData';
import { initDropdowns, renderOptions } from './dropdown';

function greet() {
  console.log(
    'Hello Good Day Mate!!! \nPage Loaded sucessfully with parcel!!! \nI see it now ^_^'
  );
}
document.addEventListener('DOMContentLoaded', greet);

/*
// 1) Dropdown - Logic
function setupDropdown(dropdownId, hiddenInputId, onSelect = null) {
  const dropdown = document.getElementById(dropdownId);
  const selected = dropdown.querySelector('.dropdown-selected');
  const options = dropdown.querySelectorAll('.dropdown-options li');
  const hiddenInput = document.getElementById(hiddenInputId);

  selected.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.textContent = option.textContent;
      hiddenInput.value = option.dataset.value;

      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');

      dropdown.classList.remove('active');

      if (onSelect) onSelect(option.dataset.value);
    });
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

setupDropdown('queryTypeDropdown', 'queryTypeInput', value => {
  const projectDropdown = document.getElementById('projectDropdown');
  if (value === 'projects') {
    projectDropdown.classList.remove('hidden');
  } else {
    projectDropdown.classList.add('hidden');
  }
});

setupDropdown('projectDropdown', 'projectInput');
*/

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

  function handleScroll() {
    if (window.scrollY >= 300) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll);
}
document.addEventListener('DOMContentLoaded', initStickyHeader);
