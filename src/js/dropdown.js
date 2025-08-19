function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderOptions(dropdownId, items) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;

  const list = dropdown.querySelector('.dropdown-options');
  if (!list) return;

  list.innerHTML = items
    .map(
      it =>
        `<li data-value="${escapeHtml(it.value)}">${escapeHtml(it.label)}</li>`
    )
    .join('');
}

export function initDropdowns() {
  document.addEventListener('click', function (e) {
    const selected = e.target.closest('.custom-dropdown .dropdown-selected');
    if (selected) {
      const dropdown = selected.closest('.custom-dropdown');
      document.querySelectorAll('.custom-dropdown.active').forEach(dd => {
        if (dd !== dropdown) dd.classList.remove('active');
      });
      dropdown.classList.toggle('active');
      return;
    }

    const option = e.target.closest('.custom-dropdown .dropdown-options li');
    if (option) {
      const dropdown = option.closest('.custom-dropdown');
      const selectedEl = dropdown.querySelector('.dropdown-selected');
      const hiddenInput = getHiddenInput(dropdown);

      const value = option.getAttribute('data-value');
      const label = option.textContent;

      selectedEl.textContent = label;
      if (hiddenInput) hiddenInput.value = value;

      const list = option.parentNode;
      list
        .querySelectorAll('li')
        .forEach(li => li.classList.remove('selected'));
      option.classList.add('selected');

      dropdown.classList.remove('active');

      dropdown.dispatchEvent(
        new CustomEvent('dropdown:change', { detail: { value, label } })
      );
      return;
    }

    document
      .querySelectorAll('.custom-dropdown.active')
      .forEach(dd => dd.classList.remove('active'));
  });
}

function getHiddenInput(dropdown) {
  const next = dropdown.nextElementSibling;
  if (
    next &&
    next.tagName === 'INPUT' &&
    (next.type === 'hidden' || next.getAttribute('type') === 'hidden')
  ) {
    return next;
  }
  return null;
}
