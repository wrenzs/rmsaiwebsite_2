// basic interactions: theme toggle, mobile nav, form stub, year
(function(){
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const themeToggle = document.getElementById('theme-toggle');
  const yearEls = [document.getElementById('year'), document.getElementById('year2'), document.getElementById('year3')];

  // set year
  const y = new Date().getFullYear();
  yearEls.forEach(el=>{ if(el) el.textContent = y });

  // mobile nav
  if(navToggle){
    navToggle.addEventListener('click', ()=> {
      nav.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
  }

  // theme (persist to localStorage)
  const applyTheme = (dark)=>{
    if(dark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    if(themeToggle) themeToggle.textContent = dark ? '☀️' : '🌙';
    try{ localStorage.setItem('site-theme', dark ? 'dark' : 'light'); }catch(e){}
  };

  const stored = (function(){ try{ return localStorage.getItem('site-theme') }catch(e){ return null } })();
  if(stored) applyTheme(stored === 'dark');
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme(true);

  if(themeToggle){
    themeToggle.addEventListener('click', ()=> {
      const isDark = document.body.classList.toggle('dark');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      try{ localStorage.setItem('site-theme', isDark ? 'dark' : 'light'); }catch(e){}
    });
  }

  // simple contact form handler (stub) - replace with API endpoint
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const msgEl = document.getElementById('formMsg');
      msgEl.textContent = 'Sending...';

      const data = {
        name: contactForm.name?.value || '',
        email: contactForm.email?.value || '',
        message: contactForm.message?.value || '',
        company: contactForm.company?.value || ''
      };

      // Replace with your backend endpoint URL
      const endpoint = '/api/send'; // change to real endpoint

      try{
        // Example POST - comment out if you don't have endpoint
        // const res = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
        // const txt = await res.text();
        // msgEl.textContent = txt || 'Message sent!';
        msgEl.textContent = 'This demo page doesn’t send email yet. Hook up a backend at /api/send.';
        contactForm.reset();
      }catch(err){
        console.error(err);
        msgEl.textContent = 'Failed to send. Please try again later.';
      }
    });
  }

  // simple add/remove sticky header shadow
  window.addEventListener('scroll', ()=>{
    const header = document.querySelector('.site-header');
    if(!header) return;
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
})();
