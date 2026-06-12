(function() {
  // --- Theme Toggle (Dark / Light) ---
  console.log('theme.js: script started');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme ? savedTheme === 'dark' : htmlEl.classList.contains('dark');
  if (isDark) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }
  console.log('theme.js: initial theme set to', isDark ? 'dark' : 'light');

  function initTheme() {
    console.log('theme.js: initTheme called');
    const themeBtns = document.querySelectorAll('button[title^="Switch to Light"], button[title^="Switch to Dark"]');
    console.log('theme.js: found', themeBtns.length, 'theme buttons');
    
    themeBtns.forEach((btn, index) => {
      const currentDark = htmlEl.classList.contains('dark');
      btn.setAttribute('title', currentDark ? 'Switch to Light mode' : 'Switch to Dark mode');
      if (!currentDark) {
        btn.innerHTML = '<i data-lucide="moon" class="w-3.5 h-3.5"></i>';
        btn.classList.remove('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
        btn.classList.add('bg-white/5', 'border-white/10', 'text-white/60');
      } else {
        btn.innerHTML = '<i data-lucide="sun" class="w-3.5 h-3.5"></i>';
        btn.classList.add('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
        btn.classList.remove('bg-white/5', 'border-white/10', 'text-white/60');
      }
      if (window.lucide) {
        window.lucide.createIcons();
      }

      console.log(`theme.js: button ${index} initialized with title ${btn.getAttribute('title')}`);

      btn.addEventListener('click', () => {
        console.log('theme.js: theme button clicked!');
        const activeDark = htmlEl.classList.contains('dark');
        const newDark = !activeDark;
        if (newDark) {
          htmlEl.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          htmlEl.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }

        themeBtns.forEach(b => {
          b.setAttribute('title', newDark ? 'Switch to Light mode' : 'Switch to Dark mode');
          if (newDark) {
            b.innerHTML = '<i data-lucide="sun" class="w-3.5 h-3.5"></i>';
            b.classList.add('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
            b.classList.remove('bg-white/5', 'border-white/10', 'text-white/60');
          } else {
            b.innerHTML = '<i data-lucide="moon" class="w-3.5 h-3.5"></i>';
            b.classList.remove('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
            b.classList.add('bg-white/5', 'border-white/10', 'text-white/60');
          }
        });
        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    console.log('theme.js: DOM still loading, adding listener');
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    console.log('theme.js: DOM already ready, running init');
    initTheme();
  }
})();
