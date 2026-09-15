// APK SETUP: replace the empty string with your APK URL or './mambo.v1.0.5.7.apk'.
window.MAMBO_CONFIG = { apkUrl: './mambo.v1.0.5.7.apk' };

(() => {
  let preference = 'auto';
  try { preference = localStorage.getItem('mambo-performance') || 'auto'; } catch {}
  const constrained = () => (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || navigator.connection?.saveData ||
    /(^|-)2g$/.test(navigator.connection?.effectiveType || '');
  window.MamboPerformance = {
    preference,
    get lite() { return this.preference === 'lite' || (this.preference === 'auto' && !!constrained()); },
    set(value) {
      this.preference = ['auto','lite','full'].includes(value) ? value : 'auto';
      try { localStorage.setItem('mambo-performance', this.preference); } catch {}
      document.documentElement.dataset.performance = this.lite ? 'lite' : 'full';
      window.dispatchEvent(new Event('mambo:performance'));
    },
  };
  window.MamboPerformance.set(preference);
})();
