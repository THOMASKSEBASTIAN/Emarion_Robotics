/**
 * Emarion Technical & Occupational Skills Training LLC
 * Light Theme Interactive Scripts & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initUniversalModal();
  initFloatingWhatsApp();
  initGlobalScrollEffects();
});

/* ==========================================================================
   1. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    
    const openIcon = menuBtn.querySelector('.menu-open-icon');
    const closeIcon = menuBtn.querySelector('.menu-close-icon');
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      const openIcon = menuBtn.querySelector('.menu-open-icon');
      const closeIcon = menuBtn.querySelector('.menu-close-icon');
      if (openIcon && closeIcon) {
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });
}

/* ==========================================================================
   2. Universal Enrollment & Free Trial Modal
   ========================================================================== */
function initUniversalModal() {
  const modal = document.getElementById('enrollment-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const form = document.getElementById('modal-enrollment-form');

  if (!modal) return;

  window.openEnrollModal = function(trackName = '') {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (trackName) {
      const trackSelect = document.getElementById('modal-track-select');
      if (trackSelect) {
        let found = false;
        for (let i = 0; i < trackSelect.options.length; i++) {
          if (trackSelect.options[i].text.toLowerCase().includes(trackName.toLowerCase())) {
            trackSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found && trackSelect.options.length > 1) {
          trackSelect.value = trackName;
        }
      }
    }
  };

  window.closeEnrollModal = function() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeEnrollModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', window.closeEnrollModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      window.closeEnrollModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const studentName = document.getElementById('modal-student-name')?.value || 'Student';
      const guardianName = document.getElementById('modal-guardian-name')?.value || '';
      const phone = document.getElementById('modal-phone')?.value || '';
      const track = document.getElementById('modal-track-select')?.value || 'General STEM';
      const mode = document.getElementById('modal-mode-select')?.value || 'Weekend In-Center';

      const textMessage = `*New Enrollment Inquiry - Emarion Skills Dubai*%0A` +
        `👤 *Student Name:* ${encodeURIComponent(studentName)}%0A` +
        `👨‍👩‍👦 *Parent/Guardian:* ${encodeURIComponent(guardianName)}%0A` +
        `📞 *Contact Phone:* ${encodeURIComponent(phone)}%0A` +
        `🎯 *Selected Program:* ${encodeURIComponent(track)}%0A` +
        `📍 *Learning Mode:* ${encodeURIComponent(mode)}%0A` +
        `🏢 *Center:* BurJuman Exit 3, Dubai`;

      window.closeEnrollModal();
      form.reset();

      showToast(
        'Application Submitted!',
        `Thank you ${studentName}! Our Dubai academic counselor will contact you shortly on WhatsApp.`,
        'success'
      );

      setTimeout(() => {
        const confirmWhatsapp = confirm("Would you like to open WhatsApp directly now to connect with our Dubai counselor (+971 56 523 4578)?");
        if (confirmWhatsapp) {
          window.open(`https://wa.me/971565234578?text=${textMessage}`, '_blank');
        }
      }, 600);
    });
  }
}

/* ==========================================================================
   3. Toast Notification System (Light Theme)
   ========================================================================== */
function showToast(title, message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 p-4 rounded-2xl shadow-xl border bg-white ' +
    (type === 'success' ? 'border-sky-300 text-slate-900 shadow-sky-500/15' : 
     type === 'warning' ? 'border-amber-300 text-slate-900 shadow-amber-500/15' : 
     'border-orange-300 text-slate-900 shadow-orange-500/15');

  const iconSvg = type === 'success' ? 
    `<div class="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>` :
    type === 'warning' ?
    `<div class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div>` :
    `<div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;

  toast.innerHTML = `
    <div class="flex items-start gap-3">
      ${iconSvg}
      <div class="flex-1">
        <h4 class="text-sm font-bold text-[#00205B]">${title}</h4>
        <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${message}</p>
      </div>
      <button class="text-slate-400 hover:text-slate-700 transition-colors p-1" onclick="this.closest('div.pointer-events-auto').remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* ==========================================================================
   4. Floating WhatsApp Quick Action
   ========================================================================== */
function initFloatingWhatsApp() {
  if (document.getElementById('floating-whatsapp-btn')) return;

  const btn = document.createElement('a');
  btn.id = 'floating-whatsapp-btn';
  btn.href = 'https://wa.me/971565234578?text=Hello%20Emarion%20Dubai%20Team!%20I%20would%20like%20to%20inquire%20about%20your%20STEM%20and%20Robotics%20programs.';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = 'fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-full shadow-lg shadow-emerald-900/25 hover:scale-105 transition-all duration-300 group border border-emerald-400/40';
  btn.innerHTML = `
    <span class="relative flex h-3 w-3">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
    </span>
    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
    <span class="text-xs font-bold tracking-wide hidden sm:inline-block">WhatsApp Hub</span>
  `;

  document.body.appendChild(btn);
}

/* ==========================================================================
   5. Scroll Animation Observer
   ========================================================================== */
function initGlobalScrollEffects() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
    observer.observe(el);
  });
}
