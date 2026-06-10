// Minimal UI script to support mobile nav and smooth page transitions
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Smooth page transitions: intercept internal link clicks
  document.addEventListener('click', (e)=>{
    const a = e.target.closest && e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    // Only handle same-origin local pages (no hashes or mailto/tel)
    if(href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
    // Let target _blank behave normally
    if(a.target === '_blank') return;

    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(()=>{
      window.location.href = href;
    }, 260);
  });

  // Remove fade-out when page loads so pages fade in
  window.addEventListener('DOMContentLoaded', ()=>{
    requestAnimationFrame(()=>{document.body.classList.remove('fade-out')});

    // IntersectionObserver reveal for elements with .reveal
    const revealEls = document.querySelectorAll('.reveal');
    if(revealEls.length){
      const obs = new IntersectionObserver((entries, o)=>{
        entries.forEach(ent=>{
          if(ent.isIntersecting){
            ent.target.classList.add('in-view');
            o.unobserve(ent.target);
          }
        });
      },{threshold:0.12});
      revealEls.forEach(el=>obs.observe(el));
    }
  });

    // Removed profile-plate image micro-interaction (projects page no longer uses hero image)

    // Card click micro-interaction: brief scale on click
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card=>{
      card.addEventListener('click', ()=>{
        card.animate([{transform:'scale(1)'},{transform:'scale(.98)'},{transform:'scale(1)'}],{duration:220,easing:'ease-out'});
      });
    });

    // Skill badge micro-interaction: gentle pop on hover & tap
    const badges = document.querySelectorAll('.badge');
    badges.forEach(b=>{
      b.addEventListener('click', ()=>{
        b.animate([{transform:'scale(1)'},{transform:'scale(0.96)'},{transform:'scale(1)'}],{duration:180,easing:'ease-out'});
      });
    });

    // GitHub button micro-interactions: subtle press & focus styles
    const ghButtons = document.querySelectorAll('.btn-github');
    ghButtons.forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        btn.animate([{transform:'translateY(0)'},{transform:'translateY(-4px)'},{transform:'translateY(0)'}],{duration:260,easing:'ease-out'});
      });
      btn.addEventListener('keydown', (ev)=>{
        if(ev.key === 'Enter' || ev.key === ' ') btn.click();
      });
    });

    // Achievements page: lightbox modal and stats counters
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightbox-image');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbClose = document.querySelector('.lightbox-close');

    function openLightbox(src, alt, caption){
      if(!lightbox) return;
      lbImage.src = src;
      lbImage.alt = alt || '';
      lbCaption.textContent = caption || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
      lbClose && lbClose.focus();
    }

    function closeLightbox(){
      if(!lightbox) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden','true');
      lbImage.src = '';
      lbCaption.textContent = '';
    }

    document.querySelectorAll('.ach-thumb').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const img = btn.querySelector('img');
        const src = btn.dataset.full || (img && img.src) || '';
        const alt = img && img.alt || '';
        const card = btn.closest('.achievement-card');
        const caption = card && card.querySelector('h3') && card.querySelector('h3').innerText;
        openLightbox(src, alt, caption);
      });
    });

    // Close handlers
    document.addEventListener('click', (e)=>{
      if(e.target && e.target.matches('[data-close]')) closeLightbox();
      if(e.target && e.target.classList && e.target.classList.contains('lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

    // Stats section removed; no counters to run
})();
