function greet() {
  console.log(
    'Hello Good Day Mate!!! \nPage Loaded sucessfully with parcel!!! \nI see it now ^_^'
  );
}
document.addEventListener('DOMContentLoaded', greet);

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
