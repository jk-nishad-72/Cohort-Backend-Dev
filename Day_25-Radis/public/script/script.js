
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check saved preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '🌙';
  }
});
