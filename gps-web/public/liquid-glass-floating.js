// Vanilla JS Liquid Glass Effect for Buttons
// Automatically binds the Apple-style refraction and mouse warp effect to all buttons on the page.
(function() {
  'use strict';

  // Math Utilities
  function smoothStep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function length(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  function roundedRectSDF(x, y, w, h, r) {
    const qx = Math.abs(x) - w + r;
    const qy = Math.abs(y) - h + r;
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - r;
  }

  function circleSDF(x, y, r) {
    return length(x, y) - r;
  }

  function texture(x, y) {
    return { type: 't', x, y };
  }

  function generateId() {
    return 'lg-btn-' + Math.random().toString(36).substr(2, 9);
  }

  // Global SVG Defs element to hold all button filters
  let globalDefs = null;
  function getGlobalDefs() {
    if (globalDefs) return globalDefs;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.cssText = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: -999;';
    globalDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(globalDefs);
    document.body.appendChild(svg);
    return globalDefs;
  }

  class ButtonShader {
    constructor(buttonEl) {
      this.button = buttonEl;
      this.width = buttonEl.offsetWidth || 120;
      this.height = buttonEl.offsetHeight || 40;
      this.canvasDPI = window.devicePixelRatio || 1;
      this.id = generateId();
      
      this.mouse = { x: 0.5, y: 0.5 };
      this.mouseOver = false;
      this.mouseUsed = false;
      
      // Determine shape and corner radius based on button CSS
      const style = window.getComputedStyle(buttonEl);
      const borderRadius = style.borderRadius;
      this.isPill = borderRadius.includes('50%') || parseFloat(borderRadius) > this.height / 2;
      this.radius = this.isPill ? 0.5 : (parseFloat(borderRadius) / Math.min(this.width, this.height)) || 0.15;
      
      this.createElement();
      this.setupEventListeners();
      this.updateShader();
    }

    createElement() {
      const defs = getGlobalDefs();
      this.filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      this.filter.setAttribute('id', `${this.id}_filter`);
      this.filter.setAttribute('filterUnits', 'userSpaceOnUse');
      this.filter.setAttribute('color-interpolation-filters', 'sRGB');
      this.filter.setAttribute('x', '0');
      this.filter.setAttribute('y', '0');
      this.filter.setAttribute('width', this.width.toString());
      this.filter.setAttribute('height', this.height.toString());

      this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
      this.feImage.setAttribute('id', `${this.id}_map`);
      this.feImage.setAttribute('width', this.width.toString());
      this.feImage.setAttribute('height', this.height.toString());

      this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
      this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
      this.feDisplacementMap.setAttribute('in2', `${this.id}_map`);
      this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
      this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

      this.filter.appendChild(this.feImage);
      this.filter.appendChild(this.feDisplacementMap);
      defs.appendChild(this.filter);

      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width * this.canvasDPI;
      this.canvas.height = this.height * this.canvasDPI;
      this.context = this.canvas.getContext('2d');

      // Apply the filter to the button itself
      const blurVal = 0.5; // Premium subtle blur for text readability
      const brightnessVal = 1.05;
      const contrastVal = 1.15;
      const saturateVal = 1.1;

      this.button.style.backdropFilter = `url(#${this.id}_filter) blur(${blurVal}px) contrast(${contrastVal}) brightness(${brightnessVal}) saturate(${saturateVal})`;
      this.button.style.webkitBackdropFilter = `url(#${this.id}_filter) blur(${blurVal}px) contrast(${contrastVal}) brightness(${brightnessVal}) saturate(${saturateVal})`;
    }

    setupEventListeners() {
      this.button.addEventListener('mouseenter', () => {
        this.mouseOver = true;
      });

      this.button.addEventListener('mousemove', (e) => {
        const rect = this.button.getBoundingClientRect();
        this.mouse.x = (e.clientX - rect.left) / rect.width;
        this.mouse.y = (e.clientY - rect.top) / rect.height;
        
        if (this.mouseOver && this.mouseUsed) {
          this.updateShader();
        }
      });

      this.button.addEventListener('mouseleave', () => {
        this.mouseOver = false;
        this.mouse.x = 0.5;
        this.mouse.y = 0.5;
        this.updateShader();
      });

      // Handle resize to adjust canvas
      const resizeObserver = new ResizeObserver(() => {
        const newW = this.button.offsetWidth;
        const newH = this.button.offsetHeight;
        if (newW !== this.width || newH !== this.height) {
          this.width = newW;
          this.height = newH;
          this.canvas.width = newW * this.canvasDPI;
          this.canvas.height = newH * this.canvasDPI;
          this.filter.setAttribute('width', newW.toString());
          this.filter.setAttribute('height', newH.toString());
          this.feImage.setAttribute('width', newW.toString());
          this.feImage.setAttribute('height', newH.toString());
          this.updateShader();
        }
      });
      resizeObserver.observe(this.button);
      this.resizeObserver = resizeObserver;
    }

    fragment(uv, mouse) {
      const ix = uv.x - 0.5;
      const iy = uv.y - 0.5;
      
      let distanceToEdge = 0;
      if (this.isPill) {
        // Pill shape / Circle SDF
        distanceToEdge = circleSDF(ix, iy, 0.4);
      } else {
        // Rounded Rect SDF normalized to aspect ratio
        const aspect = this.width / this.height;
        const w = 0.45;
        const h = 0.45 / aspect;
        distanceToEdge = roundedRectSDF(ix, iy, w, h, this.radius * 0.5);
      }

      const displacement = smoothStep(0.80, 0, distanceToEdge - 0.1);
      const scaled = smoothStep(0, 1, displacement);
      
      let offsetX = 0;
      let offsetY = 0;
      if (this.mouseOver && mouse) {
        const dx = mouse.x - uv.x;
        const dy = mouse.y - uv.y;
        const distToMouse = length(dx, dy);
        if (distToMouse < 0.45) {
          // Pull effect towards cursor
          const pull = smoothStep(0.45, 0, distToMouse) * 0.12;
          offsetX = dx * pull;
          offsetY = dy * pull;
        }
      }
      return texture((ix - offsetX) * scaled + 0.5, (iy - offsetY) * scaled + 0.5);
    }

    updateShader() {
      const mouseProxy = new Proxy(this.mouse, {
        get: (target, prop) => {
          this.mouseUsed = true;
          return target[prop];
        }
      });
      this.mouseUsed = false;

      const w = Math.round(this.width * this.canvasDPI);
      const h = Math.round(this.height * this.canvasDPI);
      if (!w || !h || w * h === 0) return;

      const data = new Uint8ClampedArray(w * h * 4);
      let maxScale = 0;
      const rawValues = [];

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % w;
        const y = Math.floor(i / 4 / w);
        const pos = this.fragment({ x: x / w, y: y / h }, mouseProxy);
        const dx = pos.x * w - x;
        const dy = pos.y * h - y;
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }

      maxScale = maxScale || 1;
      maxScale *= 0.5;

      let index = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = rawValues[index++] / maxScale + 0.5;
        const g = rawValues[index++] / maxScale + 0.5;
        data[i] = r * 255;
        data[i + 1] = g * 255;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }
      this.context.putImageData(new ImageData(data, w, h), 0, 0);
      this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL());
      this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString());
    }

    destroy() {
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.filter.remove();
      this.canvas.remove();
    }
  }

  // Scan and apply shader to all buttons on the page
  const boundButtons = new Map();
  
  function applyToButtons() {
    // Select both standard button elements and styled anchor links / elements acting as buttons
    const buttons = document.querySelectorAll('button, .btn, [data-slot="button"], a[role="button"]');
    buttons.forEach(btn => {
      // Skip already bound buttons, hidden buttons, or SVGs
      if (boundButtons.has(btn) || btn.offsetWidth === 0 || btn.offsetHeight === 0) return;
      
      // Instantiate shader for the button
      try {
        const shader = new ButtonShader(btn);
        boundButtons.set(btn, shader);
      } catch (e) {
        console.warn("Failed to apply liquid glass to button:", btn, e);
      }
    });
  }

  // Initial call and set up observer for dynamically created elements
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyToButtons();
      observeDom();
    });
  } else {
    applyToButtons();
    observeDom();
  }

  function observeDom() {
    const observer = new MutationObserver(() => {
      applyToButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Export interface
  window.liquidGlassButtons = {
    apply: applyToButtons,
    destroyAll: () => {
      boundButtons.forEach((shader, btn) => {
        shader.destroy();
      });
      boundButtons.clear();
    }
  };
})();
