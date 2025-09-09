# 🎨 Google Doodle New Tab - Quick Notes

<div align="center">

![Version](https://img.shields.io/badge/version-1.7.0-blue.svg)
![Chrome Extension](https://img.shields.io/badge/chrome-extension-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Made with Love](https://img.shields.io/badge/made%20with-❤️-red.svg)

**A beautiful Google Doodle-inspired new tab page with quadratic equation animation, enhanced search, and powerful quick notes functionality.**

[🚀 Installation](#-installation) • [✨ Features](#-features) • [🎯 Usage](#-usage) • [🛠️ Development](#️-development) • [📄 License](#-license)

</div>

---

## 📱 Screenshots

<div align="center">

### 🎭 Main Interface

<img width="1912" height="925" alt="Screenshot from 2025-09-09 19-22-40" src="https://github.com/user-attachments/assets/42c5ad6d-9faf-42e6-8878-c937c0e8f8ea" />

</div>

---

## ✨ Features

### 🎨 **Google Doodle Experience**
- **🧮 Interactive Quadratic Equation Animation** - Beautiful mathematical doodle with floating equations
- **🎯 Authentic Google Design** - Pixel-perfect recreation of Google's interface
- **✨ Smooth Animations** - Staggered letter animations and mathematical symbol movements
- **🌟 Click Interactions** - Interactive doodle elements with hover effects

### 🔍 **Enhanced Google Search**
- **🎨 Beautiful Search Bar** - Glassmorphism design with Google-themed styling
- **🔍 Smart Suggestions** - Dynamic search suggestions with smooth animations
- **🎤 Voice Search** - Integrated voice input functionality
- **📸 Image Search** - Quick access to Google Images
- **🍀 I'm Feeling Lucky** - One-click lucky search button

### 🎯 **Custom Shortcuts System**
- **🏢 Real Website Logos** - Actual logos for 25+ popular websites (ChatGPT, Facebook, GitHub, etc.)
- **➕ Easy Addition** - Beautiful modal for adding custom shortcuts
- **✏️ Edit & Delete** - Professional three-dot menu for managing shortcuts
- **💾 Persistent Storage** - All shortcuts saved locally and restored automatically
- **🎨 Smart Logo Detection** - Automatic logo detection by name and URL

### 📝 **Powerful Quick Notes**
- **⚡ Priority System** - High, Medium, Low priority with color coding
- **📂 Categories** - General, Work, Personal, Urgent with professional icons
- **🎤 Voice Input** - Speech-to-text for hands-free note taking
- **🔍 Smart Filtering** - Filter by priority and category
- **📊 Statistics** - Note count and completion tracking
- **💾 Auto-Save** - Automatic saving with visual feedback

### 🎮 **Interactive Panel Toggle**
- **👁️ Hide/Show Notes** - Toggle notes panel with keyboard shortcut (Ctrl/Cmd + N)
- **📐 Dynamic Width** - Seamless full-screen experience when notes are hidden
- **🎨 Smooth Transitions** - Beautiful animations for panel show/hide
- **💾 State Persistence** - Remembers your preferred layout

---

## 🚀 Installation

### 📥 **Method 1: Manual Installation (Recommended)**

1. **Download the Extension**
   ```bash
   # Download the latest release
   wget https://github.com/Dhrubajit-says/chrome-extension/releases/latest/download/google-doodle-newtab-v1.7.0.zip
   
   # Or clone the repository
   git clone https://github.com/Dhrubajit-says/chrome-extension.git
   ```

2. **Install in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the extension folder
   - ✅ **Done!** Open a new tab to see the magic

3. **Set as Default New Tab**
   - The extension automatically overrides your new tab page
   - No additional configuration needed!

### 🌐 **Method 2: Chrome Web Store** *(Coming Soon)*
*This extension will be available on the Chrome Web Store soon for one-click installation.*

---

## 🎯 Usage

### 🎨 **Google Doodle Interaction**
- **Click** on the doodle letters to trigger special animations
- **Hover** over mathematical elements to see floating effects
- **Watch** the quadratic equation solve itself step by step

### 🔍 **Using Google Search**
- **Type** in the search bar for instant suggestions
- **Click** the microphone for voice search
- **Use** "I'm Feeling Lucky" for random discovery
- **Access** Google Images with the camera icon

### 🎯 **Managing Custom Shortcuts**
1. **Add Shortcuts**: Click the ➕ button in the shortcuts area
2. **Choose Popular Sites**: Select from pre-configured options (ChatGPT, Facebook, etc.)
3. **Edit/Delete**: Hover over any custom shortcut and click the ⋮ menu
4. **Automatic Logos**: Real logos appear automatically for supported sites

### 📝 **Quick Notes Workflow**
1. **Set Priority**: Choose High 🔴, Medium 🟡, or Low 🟢
2. **Add Note**: Type or use voice input 🎤
3. **Categorize**: Select from General 📝, Work 💼, Personal 👤, or Urgent 🚨
4. **Filter & Search**: Use priority filters to organize your notes
5. **Toggle Panel**: Press `Ctrl/Cmd + N` to hide/show notes

### ⌨️ **Keyboard Shortcuts**
- `Ctrl/Cmd + N` - Toggle notes panel
- `Escape` - Close open modals/menus
- `Tab` - Navigate through interface elements

---

## 🛠️ Development

### 📋 **Prerequisites**
- Node.js 16+ (for development scripts)
- Chrome/Chromium browser
- Basic knowledge of JavaScript, HTML, CSS

### 🏗️ **Project Structure**
```
google-doodle-newtab/
├── 📄 manifest.json          # Extension configuration
├── 🌐 newtab.html            # Main interface HTML
├── 🎨 styles.css             # All styling and animations
├── ⚡ script.js              # Core functionality
├── 🖼️ icon16.png             # Extension icon (16x16)
├── 🖼️ icon48.png             # Extension icon (48x48)
├── 🖼️ icon128.png            # Extension icon (128x128)
├── 📦 package.json           # Development configuration
└── 📖 README.md             # This file
```

### 🔧 **Development Commands**
```bash
# Validate extension structure
npm run validate

# Create distribution package
npm run package

# Run development checks
npm test
```

### 🎨 **Key Features Implementation**

#### **Google Doodle Animation**
- Mathematical SVG elements with CSS animations
- Staggered letter animations using JavaScript
- Interactive click handlers for enhanced engagement

#### **Custom Shortcuts System**
- SVG logo database with 25+ website logos
- Dynamic DOM manipulation for shortcut rendering
- LocalStorage for persistent data management

#### **Quick Notes Functionality**
- Priority-based note system with color coding
- Category management with professional icons
- Voice recognition using Web Speech API

#### **Panel Toggle System**
- CSS transforms for smooth panel transitions
- LocalStorage state persistence
- Dynamic width calculations for seamless UX

---

## 🎨 Customization

### 🖼️ **Adding New Website Logos**
```javascript
// In script.js, add to the logos object:
'yoursite': `<path d="..." fill="#color"/>`,
```

### 🎨 **Modifying Themes**
```css
/* In styles.css, customize colors: */
:root {
  --primary-color: #4285f4;
  --accent-color: #34a853;
  --background: #000000;
}
```

### 📝 **Adding New Categories**
```html
<!-- In newtab.html, add new category button: -->
<button class="category-btn" data-category="custom">
  <svg><!-- Your icon --></svg>
  Custom
</button>
```

---

## 🌟 Version History

### 🚀 **v1.7.0** - *Latest*
- ✨ Three-dot menu system for shortcuts
- 🎯 Enhanced button visibility
- 🔧 Improved user experience

### 🎨 **v1.6.0**
- 🏢 Real website logos (25+ sites)
- ✏️ Edit/delete functionality for shortcuts
- 🎯 Smart logo detection system

### 📝 **v1.5.0**
- ➕ Custom shortcuts system
- 🎨 Beautiful add shortcut modal
- 💾 LocalStorage persistence

### 🎮 **v1.4.0**
- 👁️ Notes panel toggle functionality
- 📐 Dynamic width adjustments
- 🎨 Interface cleanup

### 🎯 **v1.3.0**
- 📝 Quick notes UI overhaul
- 🎨 Professional category icons
- 🔍 Enhanced search and filter

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🎯 **Open** a Pull Request

### 🎯 **Areas for Contribution**
- 🖼️ Adding more website logos
- 🌍 Internationalization (i18n)
- 🎨 Theme customization options
- 📱 Mobile responsiveness improvements
- 🔧 Performance optimizations

---

## 🐛 Known Issues & Solutions

### ❓ **Common Issues**

**Issue**: Extension doesn't load properly
- **Solution**: Enable Developer mode in Chrome extensions

**Issue**: Custom shortcuts not saving
- **Solution**: Check if LocalStorage is enabled in browser settings

**Issue**: Voice input not working
- **Solution**: Grant microphone permissions to Chrome

### 🔧 **Troubleshooting**
1. Check browser console for errors (`F12`)
2. Verify all files are present in extension directory
3. Reload extension from `chrome://extensions/`
4. Clear browser cache and LocalStorage if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Dhrubajit Paul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

- 🎨 **Google** - For the original doodle inspiration and design language
- 🧮 **Mathematics Community** - For the quadratic equation educational content
- 🌟 **Open Source Community** - For the tools and libraries that made this possible
- ❤️ **Users** - For feedback and feature suggestions

---

## 📞 Support & Contact

### 🌐 **Links**
- 📦 **GitHub Repository**: [chrome-extension](https://github.com/Dhrubajit-says/chrome-extension)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/Dhrubajit-says/chrome-extension/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Dhrubajit-says/chrome-extension/discussions)

### 📧 **Contact**
- **Author**: Dhrubajit Paul
- **GitHub**: [@Dhrubajit-says](https://github.com/Dhrubajit-says)

---

<div align="center">

### 🌟 **If you love this extension, please give it a star!** ⭐

**Made with ❤️ for the Chrome community**

![Made with Love](https://img.shields.io/badge/made%20with-❤️%20and%20☕-red.svg)

</div>
