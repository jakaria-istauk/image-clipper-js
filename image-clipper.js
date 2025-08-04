/**
 * ImageClipper - Dynamic Image Clipping Library
 * A lightweight library for applying dynamic clip-path effects to images
 * 
 * @version 1.0.0
 * @author ImageClipper Library
 */

class ImageClipper {
    constructor(selector, options = {}) {
        this.element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        
        if (!this.element) {
            throw new Error('ImageClipper: Element not found');
        }

        // Default options
        this.options = {
            shape: 'circle',
            size: 50,
            x: 50,
            y: 50,
            rotation: 0,
            transition: '0.3s ease',
            ...options
        };

        this.init();
    }

    init() {
        this.element.style.transition = `all ${this.options.transition}`;
        this.updateClip();
    }

    /**
     * Update the clip-path based on current options
     */
    updateClip() {
        const clipPath = this.generateClipPath();
        this.element.style.clipPath = clipPath;
        this.element.style.transform = `rotate(${this.options.rotation}deg)`;
        return clipPath;
    }

    /**
     * Generate clip-path CSS value based on shape and parameters
     */
    generateClipPath() {
        const { shape, size, x, y } = this.options;

        switch (shape) {
            case 'circle':
                return `circle(${size}% at ${x}% ${y}%)`;
            
            case 'ellipse':
                return `ellipse(${size}% ${size * 0.7}% at ${x}% ${y}%)`;
            
            case 'rectangle':
            case 'inset':
                const inset = (100 - size) / 2;
                return `inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
            
            case 'triangle':
                return `polygon(${x}% ${Math.max(0, y - size)}%, ${Math.max(0, x - size)}% ${Math.min(100, y + size)}%, ${Math.min(100, x + size)}% ${Math.min(100, y + size)}%)`;
            
            case 'diamond':
                // Create a diamond with proper scaling and positioning
                const diamondSize = size / 100;
                const diamondX = x / 100;
                const diamondY = y / 100;

                // Diamond coordinates (normalized to 0-1)
                const diamondPoints = [
                    [0.5, 0.0],   // Top
                    [1.0, 0.5],   // Right
                    [0.5, 1.0],   // Bottom
                    [0.0, 0.5]    // Left
                ];

                // Scale and position the diamond
                const scaledDiamondPoints = diamondPoints.map(([px, py]) => {
                    const scaledX = diamondX + (px - 0.5) * diamondSize;
                    const scaledY = diamondY + (py - 0.5) * diamondSize;
                    return `${Math.max(0, Math.min(100, scaledX * 100))}% ${Math.max(0, Math.min(100, scaledY * 100))}%`;
                });

                return `polygon(${scaledDiamondPoints.join(', ')})`;
            
            case 'hexagon':
                // Create a hexagon with proper scaling and positioning
                const hexSize = size / 100;
                const hexX = x / 100;
                const hexY = y / 100;

                // Hexagon coordinates (normalized to 0-1)
                const hexPoints = [
                    [0.25, 0.0],  // Top left
                    [0.75, 0.0],  // Top right
                    [1.0, 0.5],   // Right
                    [0.75, 1.0],  // Bottom right
                    [0.25, 1.0],  // Bottom left
                    [0.0, 0.5]    // Left
                ];

                // Scale and position the hexagon
                const scaledHexPoints = hexPoints.map(([px, py]) => {
                    const scaledX = hexX + (px - 0.5) * hexSize;
                    const scaledY = hexY + (py - 0.5) * hexSize;
                    return `${Math.max(0, Math.min(100, scaledX * 100))}% ${Math.max(0, Math.min(100, scaledY * 100))}%`;
                });

                return `polygon(${scaledHexPoints.join(', ')})`;
            
            case 'star':
                // Create a 5-pointed star with proper scaling and positioning
                const starSize = size / 100;
                const starX = x / 100;
                const starY = y / 100;

                // 5-pointed star coordinates (normalized to 0-1)
                const starPoints = [
                    [0.5, 0.0],   // Top point
                    [0.61, 0.35], // Top right inner
                    [0.98, 0.35], // Right point
                    [0.68, 0.57], // Bottom right inner
                    [0.79, 0.91], // Bottom right point
                    [0.5, 0.70],  // Bottom inner
                    [0.21, 0.91], // Bottom left point
                    [0.32, 0.57], // Bottom left inner
                    [0.02, 0.35], // Left point
                    [0.39, 0.35]  // Top left inner
                ];

                // Scale and position the star
                const scaledStarPoints = starPoints.map(([px, py]) => {
                    const scaledX = starX + (px - 0.5) * starSize;
                    const scaledY = starY + (py - 0.5) * starSize;
                    return `${Math.max(0, Math.min(100, scaledX * 100))}% ${Math.max(0, Math.min(100, scaledY * 100))}%`;
                });

                return `polygon(${scaledStarPoints.join(', ')})`;
            
            case 'heart':
                // Create a more accurate heart shape with proper curves
                const heartSize = size / 100;
                const heartX = x / 100;
                const heartY = y / 100;

                // Heart shape coordinates (normalized to 0-1, then scaled and positioned)
                const heartPoints = [
                    [0.5, 0.2],   // Top center
                    [0.7, 0.05],  // Right top curve start
                    [0.9, 0.05],  // Right top curve peak
                    [0.95, 0.15], // Right top curve end
                    [0.9, 0.3],   // Right side
                    [0.5, 0.7],   // Bottom point approach
                    [0.5, 0.95],  // Bottom point
                    [0.5, 0.7],   // Bottom point approach (return)
                    [0.1, 0.3],   // Left side
                    [0.05, 0.15], // Left top curve end
                    [0.1, 0.05],  // Left top curve peak
                    [0.3, 0.05],  // Left top curve start
                ];

                // Scale and position the heart
                const scaledHeartPoints = heartPoints.map(([px, py]) => {
                    const scaledX = heartX + (px - 0.5) * heartSize;
                    const scaledY = heartY + (py - 0.5) * heartSize;
                    return `${Math.max(0, Math.min(100, scaledX * 100))}% ${Math.max(0, Math.min(100, scaledY * 100))}%`;
                });

                return `polygon(${scaledHeartPoints.join(', ')})`;
            
            case 'custom':
                return this.options.customPath || 'none';
            
            default:
                return 'none';
        }
    }

    /**
     * Set clipping shape
     */
    setShape(shape) {
        this.options.shape = shape;
        return this.updateClip();
    }

    /**
     * Set size (0-100)
     */
    setSize(size) {
        this.options.size = Math.max(0, Math.min(100, size));
        return this.updateClip();
    }

    /**
     * Set position
     */
    setPosition(x, y) {
        this.options.x = Math.max(0, Math.min(100, x));
        this.options.y = Math.max(0, Math.min(100, y));
        return this.updateClip();
    }

    /**
     * Set X position
     */
    setX(x) {
        this.options.x = Math.max(0, Math.min(100, x));
        return this.updateClip();
    }

    /**
     * Set Y position
     */
    setY(y) {
        this.options.y = Math.max(0, Math.min(100, y));
        return this.updateClip();
    }

    /**
     * Set rotation (0-360 degrees)
     */
    setRotation(rotation) {
        this.options.rotation = rotation % 360;
        return this.updateClip();
    }

    /**
     * Set custom clip path
     */
    setCustomPath(path) {
        this.options.customPath = path;
        this.options.shape = 'custom';
        return this.updateClip();
    }

    /**
     * Apply multiple options at once
     */
    set(options) {
        Object.assign(this.options, options);
        return this.updateClip();
    }

    /**
     * Get current options
     */
    get() {
        return { ...this.options };
    }

    /**
     * Get current clip path
     */
    getClipPath() {
        return this.generateClipPath();
    }

    /**
     * Reset to default values
     */
    reset() {
        this.options = {
            shape: 'circle',
            size: 50,
            x: 50,
            y: 50,
            rotation: 0,
            transition: '0.3s ease'
        };
        return this.updateClip();
    }

    /**
     * Remove clipping
     */
    clear() {
        this.element.style.clipPath = 'none';
        this.element.style.transform = 'none';
    }

    /**
     * Animate to new values
     */
    animate(targetOptions, duration = 1000) {
        const startOptions = { ...this.options };
        const startTime = performance.now();

        const animateStep = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            // Interpolate values
            Object.keys(targetOptions).forEach(key => {
                if (typeof targetOptions[key] === 'number') {
                    const start = startOptions[key] || 0;
                    const end = targetOptions[key];
                    this.options[key] = start + (end - start) * easeOut;
                } else {
                    this.options[key] = targetOptions[key];
                }
            });

            this.updateClip();

            if (progress < 1) {
                requestAnimationFrame(animateStep);
            }
        };

        requestAnimationFrame(animateStep);
    }

    /**
     * Apply preset configurations
     */
    preset(presetName) {
        const presets = {
            circle: { shape: 'circle', size: 45, x: 50, y: 50, rotation: 0 },
            ellipse: { shape: 'ellipse', size: 60, x: 50, y: 50, rotation: 0 },
            square: { shape: 'rectangle', size: 70, x: 50, y: 50, rotation: 0 },
            diamond: { shape: 'diamond', size: 60, x: 50, y: 50, rotation: 0 },
            triangle: { shape: 'triangle', size: 50, x: 50, y: 50, rotation: 0 },
            hexagon: { shape: 'hexagon', size: 60, x: 50, y: 50, rotation: 0 },
            star: { shape: 'star', size: 70, x: 50, y: 50, rotation: 0 },
            heart: { shape: 'heart', size: 60, x: 50, y: 50, rotation: 0 }
        };

        if (presets[presetName]) {
            return this.set(presets[presetName]);
        } else {
            console.warn(`ImageClipper: Preset "${presetName}" not found`);
            return this.getClipPath();
        }
    }

    /**
     * Create interactive controls
     */
    createControls(container) {
        const controlsHTML = `
            <div class="image-clipper-controls" style="
                display: grid;
                gap: 15px;
                padding: 20px;
                background: #f5f5f5;
                border-radius: 10px;
                font-family: Arial, sans-serif;
            ">
                <div>
                    <label>Shape:</label>
                    <select class="ic-shape" style="width: 100%; padding: 8px; margin-top: 5px;">
                        <option value="circle">Circle</option>
                        <option value="ellipse">Ellipse</option>
                        <option value="rectangle">Rectangle</option>
                        <option value="triangle">Triangle</option>
                        <option value="diamond">Diamond</option>
                        <option value="hexagon">Hexagon</option>
                        <option value="star">Star</option>
                        <option value="heart">Heart</option>
                    </select>
                </div>
                <div>
                    <label>Size: <span class="ic-size-val">50%</span></label>
                    <input type="range" class="ic-size" min="10" max="100" value="50" style="width: 100%;">
                </div>
                <div>
                    <label>X Position: <span class="ic-x-val">50%</span></label>
                    <input type="range" class="ic-x" min="0" max="100" value="50" style="width: 100%;">
                </div>
                <div>
                    <label>Y Position: <span class="ic-y-val">50%</span></label>
                    <input type="range" class="ic-y" min="0" max="100" value="50" style="width: 100%;">
                </div>
                <div>
                    <label>Rotation: <span class="ic-rotation-val">0°</span></label>
                    <input type="range" class="ic-rotation" min="0" max="360" value="0" style="width: 100%;">
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="ic-preset" data-preset="circle">Circle</button>
                    <button class="ic-preset" data-preset="heart">Heart</button>
                    <button class="ic-preset" data-preset="star">Star</button>
                    <button class="ic-preset" data-preset="diamond">Diamond</button>
                </div>
            </div>
        `;

        const controlContainer = typeof container === 'string' ? 
            document.querySelector(container) : container;
        
        controlContainer.innerHTML = controlsHTML;

        // Bind events
        const controls = controlContainer.querySelector('.image-clipper-controls');
        
        controls.querySelector('.ic-shape').addEventListener('change', (e) => {
            this.setShape(e.target.value);
        });

        controls.querySelector('.ic-size').addEventListener('input', (e) => {
            this.setSize(e.target.value);
            controls.querySelector('.ic-size-val').textContent = e.target.value + '%';
        });

        controls.querySelector('.ic-x').addEventListener('input', (e) => {
            this.setX(e.target.value);
            controls.querySelector('.ic-x-val').textContent = e.target.value + '%';
        });

        controls.querySelector('.ic-y').addEventListener('input', (e) => {
            this.setY(e.target.value);
            controls.querySelector('.ic-y-val').textContent = e.target.value + '%';
        });

        controls.querySelector('.ic-rotation').addEventListener('input', (e) => {
            this.setRotation(e.target.value);
            controls.querySelector('.ic-rotation-val').textContent = e.target.value + '°';
        });

        controls.querySelectorAll('.ic-preset').forEach(btn => {
            btn.addEventListener('click', () => {
                this.preset(btn.dataset.preset);
                this.syncControls(controls);
            });
            btn.style.cssText = 'padding: 8px 16px; border: none; background: #007bff; color: white; border-radius: 5px; cursor: pointer;';
        });

        return this;
    }

    /**
     * Sync control values with current options
     */
    syncControls(controls) {
        controls.querySelector('.ic-shape').value = this.options.shape;
        controls.querySelector('.ic-size').value = this.options.size;
        controls.querySelector('.ic-x').value = this.options.x;
        controls.querySelector('.ic-y').value = this.options.y;
        controls.querySelector('.ic-rotation').value = this.options.rotation;
        
        controls.querySelector('.ic-size-val').textContent = this.options.size + '%';
        controls.querySelector('.ic-x-val').textContent = this.options.x + '%';
        controls.querySelector('.ic-y-val').textContent = this.options.y + '%';
        controls.querySelector('.ic-rotation-val').textContent = this.options.rotation + '°';
    }
}

// Static method to clip multiple images
ImageClipper.clipAll = function(selector, options) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(el => new ImageClipper(el, options));
};

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageClipper;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return ImageClipper; });
} else {
    window.ImageClipper = ImageClipper;
}