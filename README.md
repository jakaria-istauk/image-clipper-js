# 🎨 ImageClipper

A lightweight, framework-agnostic JavaScript library for applying dynamic CSS clip-path effects to images. Create stunning visual effects with circles, hearts, stars, and custom shapes.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Size](https://img.shields.io/badge/Size-~8KB-brightgreen.svg)](https://github.com/your-repo/image-clipper)
[![Browser Support](https://img.shields.io/badge/Browser%20Support-Modern%20Browsers-blue.svg)](#browser-support)

## ✨ Features

- **🚀 Lightweight**: Only ~8KB minified, zero dependencies
- **🔧 Framework Agnostic**: Works with vanilla JS, jQuery, React, Vue, Angular, etc.
- **📱 Responsive**: Fully responsive and mobile-friendly
- **🎭 8 Built-in Shapes**: Circle, ellipse, rectangle, triangle, diamond, hexagon, star, heart
- **🎨 Custom Shapes**: Support for custom clip-path polygons
- **⚡ Smooth Animations**: Built-in animation system with easing
- **🎛️ Interactive Controls**: Auto-generated UI controls
- **🔗 Chainable API**: Fluent interface for method chaining
- **📦 Module Support**: AMD, CommonJS, and global window object

## 🚀 Quick Start

### Installation

```html
<!-- Include via CDN -->
<script src="https://cdn.jsdelivr.net/npm/image-clipper/image-clipper.min.js"></script>

<!-- Or download and include locally -->
<script src="path/to/image-clipper.js"></script>
```

### Basic Usage

```javascript
// Simple initialization
const clipper = new ImageClipper('#myImage');

// With options
const clipper = new ImageClipper('#myImage', {
    shape: 'heart',
    size: 75,
    x: 50,
    y: 50,
    rotation: 0
});
```

## 📖 API Reference

### Constructor

```javascript
new ImageClipper(selector, options)
```

**Parameters:**
- `selector` (string|Element): CSS selector or DOM element
- `options` (object): Configuration options

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shape` | string | `'circle'` | Shape type: 'circle', 'ellipse', 'rectangle', 'triangle', 'diamond', 'hexagon', 'star', 'heart' |
| `size` | number | `50` | Size percentage (0-100) |
| `x` | number | `50` | X position percentage (0-100) |
| `y` | number | `50` | Y position percentage (0-100) |
| `rotation` | number | `0` | Rotation in degrees (0-360) |
| `transition` | string | `'0.3s ease'` | CSS transition for smooth changes |

### Methods

#### Shape Control
```javascript
clipper.setShape(shape)           // Set clipping shape
clipper.setSize(size)             // Set size (0-100)
clipper.setPosition(x, y)         // Set X,Y position
clipper.setX(x)                   // Set X position
clipper.setY(y)                   // Set Y position
clipper.setRotation(degrees)      // Set rotation (0-360)
```

#### Batch Operations
```javascript
clipper.set(options)              // Set multiple options
clipper.preset(presetName)        // Apply preset configuration
clipper.reset()                   // Reset to defaults
clipper.clear()                   // Remove all clipping
```

#### Animation
```javascript
clipper.animate(targetOptions, duration)  // Animate to new values
```

#### Utilities
```javascript
clipper.get()                     // Get current options
clipper.getClipPath()             // Get current CSS clip-path
clipper.createControls(container) // Create interactive UI
```

#### Static Methods
```javascript
ImageClipper.clipAll(selector, options)  // Clip multiple elements
```

## 🎯 Examples

### Basic Shapes

```javascript
// Circle
new ImageClipper('#image1', { shape: 'circle', size: 60 });

// Heart
new ImageClipper('#image2', { shape: 'heart', size: 70 });

// Star with rotation
new ImageClipper('#image3', {
    shape: 'star',
    size: 80,
    rotation: 45
});
```

### Method Chaining

```javascript
new ImageClipper('#hero-image')
    .setShape('diamond')
    .setSize(90)
    .setPosition(60, 40)
    .setRotation(45);
```

### Animations

```javascript
// Smooth shape morphing
clipper.animate({
    shape: 'heart',
    size: 80,
    rotation: 360
}, 2000);

// Sequential animations
clipper.animate({ size: 20 }, 500)
    .then(() => clipper.animate({ size: 80, shape: 'star' }, 1000));
```

### Presets

```javascript
clipper.preset('heart');     // Perfect heart shape
clipper.preset('star');      // 5-pointed star
clipper.preset('hexagon');   // Regular hexagon
clipper.preset('diamond');   // Diamond shape
```

### Interactive Controls

```javascript
// Auto-generate UI controls
const clipper = new ImageClipper('#myImage');
clipper.createControls('#controls-container');
```

### Multiple Images

```javascript
// Clip all gallery images
const clippers = ImageClipper.clipAll('.gallery img', {
    shape: 'hexagon',
    size: 85
});

// Different shapes for each image
const shapes = ['circle', 'heart', 'star', 'diamond'];
document.querySelectorAll('.product-image').forEach((img, index) => {
    new ImageClipper(img).preset(shapes[index % shapes.length]);
});
```

### Custom Clip Paths

```javascript
// Custom polygon
clipper.setCustomPath('polygon(20% 0%, 80% 0%, 100% 60%, 75% 100%, 25% 100%, 0% 60%)');

// Complex custom shape
clipper.set({
    shape: 'custom',
    customPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
});
```

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 55+ |
| Firefox | 54+ |
| Safari | 10.1+ |
| Edge | 79+ |
| iOS Safari | 10.3+ |
| Android Browser | 81+ |

## 📁 File Structure

```
image-clipper/
├── image-clipper.js          # Main library file
├── image-clipper.min.js      # Minified version (production)
├── index.html               # Demo page with examples
└── README.md               # This documentation
```

## 🔧 Development

### Building

```bash
# Minify the library
npm run build

# Run development server
npm run dev

# Run tests
npm test
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern CSS clip-path capabilities
- Built with performance and accessibility in mind
- Designed for real-world production use

## 📞 Support

- 📧 Email: support@imageclipper.dev
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/image-clipper/issues)
- 📖 Documentation: [Full Documentation](https://imageclipper.dev/docs)
- 💬 Community: [Discord Server](https://discord.gg/imageclipper)

---

Made with ❤️ by the ImageClipper team