/**
 * PerformanceManager — FPS monitor + adaptive degradation event bus.
 *
 * Tracks real-time FPS via requestAnimationFrame. When FPS stays below
 * LOW_FPS_THRESHOLD for TRIGGER_DURATION ms, fires 'low' callbacks and
 * adds the `low-perf` class to <html>. Auto-recovers when FPS stays
 * above RECOVERY_FPS_THRESHOLD for the same duration.
 *
 * Usage:
 *   import { performanceManager } from './performanceManager.js';
 *   performanceManager.start();
 *   performanceManager.onLowPerformance(() => { ... });
 *   performanceManager.onRecovered(() => { ... });
 */

import saveIcon from '../assets/icons/save.png';
import performanceIcon from '../assets/icons/performance.png';

class PerformanceManager {
  // ── Thresholds ──
  LOW_FPS_THRESHOLD = 40;
  RECOVERY_FPS_THRESHOLD = 45;
  CRITICAL_FPS_THRESHOLD = 25;
  TRIGGER_DURATION = 3000;       // 3 seconds sustained
  CRITICAL_DURATION = 5000;      // 5 seconds at critical
  SAMPLE_INTERVAL = 500;         // sample every 500ms

  // ── Internal state ──
  #fps = 60;
  #frameCount = 0;
  #lastSampleTime = 0;
  #lowPerfAccum = 0;             // ms accumulated below threshold
  #recoveredAccum = 0;           // ms accumulated above recovery
  #criticalAccum = 0;            // ms accumulated at critical
  #isLowPerf = false;
  #isCritical = false;
  #rafId = null;
  #running = false;
  #lastFrameTime = 0;
  #styleInjected = false;
  #toastTimeout = null;

  // ── Listeners ──
  #listeners = { low: [], recovered: [], critical: [] };

  /** Register a callback for when low performance is detected. */
  onLowPerformance(fn) {
    this.#listeners.low.push(fn);
    return this;
  }

  /** Register a callback for when performance recovers. */
  onRecovered(fn) {
    this.#listeners.recovered.push(fn);
    return this;
  }

  /** Register a callback for critical performance (canvas should hide). */
  onCritical(fn) {
    this.#listeners.critical.push(fn);
    return this;
  }

  /** Current FPS reading. */
  get fps() { return this.#fps; }

  /** Whether we're currently in low-perf mode. */
  isLowPerf() { return this.#isLowPerf; }

  /** Whether we're in critical mode (canvas hidden). */
  isCritical() { return this.#isCritical; }

  /** Start monitoring. Safe to call multiple times. */
  start() {
    if (this.#running) return;
    this.#running = true;
    this.#lastSampleTime = performance.now();
    this.#lastFrameTime = performance.now();
    this.#frameCount = 0;
    this.#injectToastStyles();
    this.#tick();
  }

  /** Stop monitoring and clean up. */
  destroy() {
    this.#running = false;
    if (this.#rafId) {
      cancelAnimationFrame(this.#rafId);
      this.#rafId = null;
    }
    if (this.#toastTimeout) {
      clearTimeout(this.#toastTimeout);
      this.#toastTimeout = null;
    }
  }

  // ── Private ──

  #tick = () => {
    if (!this.#running) return;

    const now = performance.now();
    this.#frameCount++;

    const elapsed = now - this.#lastSampleTime;
    if (elapsed >= this.SAMPLE_INTERVAL) {
      this.#fps = Math.round((this.#frameCount / elapsed) * 1000);
      this.#frameCount = 0;
      this.#lastSampleTime = now;
      this.#evaluate(elapsed);
    }

    this.#rafId = requestAnimationFrame(this.#tick);
  };

  #evaluate(deltaMs) {
    if (this.#isLowPerf) {
      // ── Check for recovery ──
      if (this.#fps >= this.RECOVERY_FPS_THRESHOLD) {
        this.#recoveredAccum += deltaMs;
        this.#criticalAccum = 0;
      } else {
        this.#recoveredAccum = 0;
      }

      // ── Check for critical ──
      if (!this.#isCritical && this.#fps < this.CRITICAL_FPS_THRESHOLD) {
        this.#criticalAccum += deltaMs;
        if (this.#criticalAccum >= this.CRITICAL_DURATION) {
          this.#isCritical = true;
          this.#fire('critical');
          this.#showToast('Minimal mode — your device needs a break', 'critical', saveIcon);
        }
      }

      if (this.#recoveredAccum >= this.TRIGGER_DURATION) {
        this.#isLowPerf = false;
        this.#isCritical = false;
        this.#recoveredAccum = 0;
        this.#criticalAccum = 0;
        document.documentElement.classList.remove('low-perf');
        this.#fire('recovered');
        this.#showToast('Full experience restored', 'recovered', performanceIcon);
      }
    } else {
      // ── Check for low perf onset ──
      if (this.#fps < this.LOW_FPS_THRESHOLD) {
        this.#lowPerfAccum += deltaMs;
      } else {
        this.#lowPerfAccum = 0;
      }

      if (this.#lowPerfAccum >= this.TRIGGER_DURATION) {
        this.#isLowPerf = true;
        this.#lowPerfAccum = 0;
        document.documentElement.classList.add('low-perf');
        this.#fire('low');
        this.#showToast('Lite mode — saving compute for a smoother experience', 'low', saveIcon);
      }
    }
  }

  #fire(event) {
    const fns = this.#listeners[event];
    if (!fns) return;
    for (let i = 0; i < fns.length; i++) {
      try { fns[i](); } catch (e) { console.warn('[PerformanceManager]', e); }
    }
  }

  // ── Toast notification system ──

  #injectToastStyles() {
    if (this.#styleInjected) return;
    this.#styleInjected = true;

    const style = document.createElement('style');
    style.textContent = `
      .perf-toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(80px);
        z-index: 99999;
        padding: 10px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: "Inter", sans-serif;
        font-size: 0.82rem;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: rgba(255, 255, 255, 0.9);
        background: rgba(15, 15, 30, 0.75);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08);
        opacity: 0;
        pointer-events: none;
        white-space: nowrap;
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                    opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .perf-toast.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      .perf-toast-icon {
        width: 16px;
        height: 16px;
        object-fit: contain;
        flex-shrink: 0;
      }
      .perf-toast.perf-toast--low {
        border-color: rgba(255, 180, 50, 0.2);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(255, 180, 50, 0.08),
                    inset 0 1px 0 rgba(255, 200, 100, 0.1);
      }
      .perf-toast.perf-toast--critical {
        border-color: rgba(255, 100, 80, 0.2);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(255, 100, 80, 0.08),
                    inset 0 1px 0 rgba(255, 120, 100, 0.1);
      }
      .perf-toast.perf-toast--recovered {
        border-color: rgba(100, 255, 150, 0.2);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(100, 255, 150, 0.08),
                    inset 0 1px 0 rgba(120, 255, 160, 0.1);
      }
    `;
    document.head.appendChild(style);
  }

  #showToast(message, type = 'low', icon = null) {
    // Remove any existing toast
    const existing = document.querySelector('.perf-toast');
    if (existing) existing.remove();
    if (this.#toastTimeout) clearTimeout(this.#toastTimeout);

    const toast = document.createElement('div');
    toast.className = `perf-toast perf-toast--${type}`;

    if (icon) {
      const img = document.createElement('img');
      img.src = icon;
      img.alt = '';
      img.className = 'perf-toast-icon';
      toast.appendChild(img);
    }

    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(text);
    document.body.appendChild(toast);

    // Trigger entrance animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('visible');
      });
    });

    // Auto-dismiss after 5s
    this.#toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }
}

// Singleton export
export const performanceManager = new PerformanceManager();

