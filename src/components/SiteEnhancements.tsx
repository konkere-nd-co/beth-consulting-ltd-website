"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Progressive, accessibility-aware enhancements:
 *  - Restrained scroll-reveal for sections (disabled under prefers-reduced-motion)
 *  - Soft header shadow once the page is scrolled
 * Fail-safe: if JS does not run, no hidden state is applied and all content shows.
 */
export function SiteEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const root = document.documentElement;
    let observer: IntersectionObserver | null = null;

    if (!prefersReduced && 'IntersectionObserver' in window) {
      root.classList.add('reveal-ready');
      var splitSel = 'main > section:not(.hero) h1, main > section:not(.hero) h2, .feature-quote .fq';
      document.querySelectorAll<HTMLElement>(splitSel).forEach(function(el){
        if(el.dataset.split) return;
        el.dataset.split='1';
        el.classList.add('split-text');
        var parts = (el.textContent||'').split(/(\s+)/);
        el.textContent='';
        var idx=0;
        parts.forEach(function(tok){
          if(tok==='') return;
          if(/^\s+$/.test(tok)){ el.appendChild(document.createTextNode(' ')); return; }
          var w=document.createElement('span'); w.className='w';
          var t=document.createElement('i'); t.textContent=tok;
          t.style.transitionDelay=Math.min(idx*0.05,0.6)+'s';
          w.appendChild(t); el.appendChild(w); idx++;
        });
      });

      // count-up stats (numeric .num values animate from 0 on reveal)
      function countUp(el: HTMLElement){
        const m=(el.textContent||'').trim().match(/^(\d[\d,]*)(.*)$/);
        if(!m) return;
        const target=parseInt(m[1].replace(/,/g,''),10); const suffix=m[2];
        if(isNaN(target)) return;
        let start: number | null = null; const dur=1300;
        function step(ts: number){ if(start===null) start=ts; const p=Math.min((ts-start)/dur,1);
          const v=Math.floor((0.5-Math.cos(Math.PI*p)/2)*target);
          el.textContent=v+suffix; if(p<1) requestAnimationFrame(step); else el.textContent=target+suffix; }
        requestAnimationFrame(step);
      }
      const statObs=new IntersectionObserver(function(entries){ entries.forEach(function(en){ if(en.isIntersecting){ en.target.querySelectorAll<HTMLElement>('.num').forEach(countUp); statObs.unobserve(en.target);} }); },{ threshold:0.3 });
      document.querySelectorAll('.statstrip').forEach(function(s){ statObs.observe(s); });

      const sections = Array.from(document.querySelectorAll('main > section'));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      sections.forEach((s) => {
        // Reveal sections already in view immediately (no flash)
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) s.classList.add('in-view');
        else observer!.observe(s);
      });
    }

    // Header scroll shadow
    const header = document.querySelector('.site-header');
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}
