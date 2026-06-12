(function() {
  // --- Direction Toggle (RTL / LTR) ---
  console.log('rtl.js: script started');
  const htmlEl = document.documentElement;
  const savedRtl = localStorage.getItem('rtl');
  const isRtl = savedRtl ? savedRtl === 'true' : (htmlEl.getAttribute('dir') === 'rtl');
  htmlEl.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  console.log('rtl.js: initial dir set to', isRtl ? 'rtl' : 'ltr');

  function initRtl() {
    console.log('rtl.js: initRtl called');
    const dirBtns = document.querySelectorAll('button[title^="Switch to RTL"], button[title^="Switch to LTR"]');
    console.log('rtl.js: found', dirBtns.length, 'RTL buttons');
    
    dirBtns.forEach((btn, index) => {
      const currentRtl = htmlEl.getAttribute('dir') === 'rtl';
      const span = btn.querySelector('span');
      if (span) span.textContent = currentRtl ? 'LTR' : 'RTL';
      btn.setAttribute('title', currentRtl ? 'Switch to LTR' : 'Switch to RTL');

      console.log(`rtl.js: button ${index} initialized with title ${btn.getAttribute('title')}`);

      if (currentRtl) {
        btn.classList.add('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
        btn.classList.remove('bg-white/5', 'border-white/10', 'text-white/60');
      } else {
        btn.classList.remove('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
        btn.classList.add('bg-white/5', 'border-white/10', 'text-white/60');
      }

      btn.addEventListener('click', () => {
        console.log('rtl.js: RTL button clicked!');
        const activeRtl = htmlEl.getAttribute('dir') === 'rtl';
        const newRtl = !activeRtl;
        htmlEl.setAttribute('dir', newRtl ? 'rtl' : 'ltr');
        localStorage.setItem('rtl', newRtl ? 'true' : 'false');
        console.log('rtl.js: dir changed to', newRtl ? 'rtl' : 'ltr');
        
        dirBtns.forEach(b => {
          const s = b.querySelector('span');
          if (s) s.textContent = newRtl ? 'LTR' : 'RTL';
          b.setAttribute('title', newRtl ? 'Switch to LTR' : 'Switch to RTL');
          if (newRtl) {
            b.classList.add('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
            b.classList.remove('bg-white/5', 'border-white/10', 'text-white/60');
          } else {
            b.classList.remove('bg-brand-gold/15', 'border-brand-gold/40', 'text-brand-gold');
            b.classList.add('bg-white/5', 'border-white/10', 'text-white/60');
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    console.log('rtl.js: DOM still loading, adding listener');
    document.addEventListener('DOMContentLoaded', initRtl);
  } else {
    console.log('rtl.js: DOM already ready, running init');
    initRtl();
  }
})();
