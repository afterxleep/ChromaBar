<img valign="middle" alt="FlowDeck logo" width="120" src="./icon/icon.png" />

# ChromaBar

A Visual Studio Code extension that helps you visually distinguish between multiple VS Code windows by customizing the title bar color on a per-workspace basis. Perfect for developers juggling multiple projects simultaneously.

![VS Code Version](https://img.shields.io/badge/VS%20Code-%3E%3D1.74.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Marketplace](https://img.shields.io/badge/marketplace-ChromaBar-orange)

## 🎯 Why ChromaBar?

When working with multiple VS Code windows, it's easy to lose track of which window contains which project. ChromaBar solves this by letting you assign vibrant, distinctive colors to each workspace's title bar. 

**Key Benefits:**
- **Window Independence**: Each project window has its own color
- **Persistent Memory**: Colors are remembered when you reopen projects
- **Zero Confusion**: Instantly identify your projects at a glance
- **Workspace-Specific**: Colors are stored per project, not globally

## ✨ Features

- **🎨 Vibrant Color Palette**: 7 carefully selected colors from warm to cool tones
- **💾 Persistent Colors**: Automatically remembers colors per workspace
- **🎯 Quick Access**: One-click color selection via status bar icon
- **🔄 Easy Reset**: Remove colors instantly when needed
- **⚡ Zero Performance Impact**: Lightweight and fast

## 🚀 Installation

### From VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P` to open the Quick Open dialog
3. Type `ext install chromabar`

## 📖 Usage

### Quick Start

1. **Click the paint icon** (🎨) in the status bar
2. **Select a color** from the palette
3. **Done!** Your title bar now has a unique color

### Commands

Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type:

- `ChromaBar: Select Color` - Opens the color picker
- `ChromaBar: Reset Color` - Removes all color customizations

## 🎨 Color Palette

ChromaBar features a carefully curated gradient palette:

| Color | Hex | Name |
|-------|-----|------|
| ![](https://img.shields.io/badge/--%23FA9203?style=flat) | `#FA9203` | **Pizazz** |
| ![](https://img.shields.io/badge/--%23E14F08?style=flat) | `#E14F08` | **Trinidad** |
| ![](https://img.shields.io/badge/--%23B31A15?style=flat) | `#B31A15` | **Thunderbird** |
| ![](https://img.shields.io/badge/--%236D0E4E?style=flat) | `#6D0E4E` | **Rose Bud Cherry** |
| ![](https://img.shields.io/badge/--%23462969?style=flat) | `#462969` | **Jacarta** |
| ![](https://img.shields.io/badge/--%234A4F9E?style=flat) | `#4A4F9E` | **Victoria** |
| ![](https://img.shields.io/badge/--%234F7ABB?style=flat) | `#4F7ABB` | **Steel Blue** |

## ⚙️ Configuration

### Enable Custom Title Bar (Required)

ChromaBar requires VS Code's custom title bar to work:

```json
{
  "window.titleBarStyle": "custom"
}
```

ChromaBar will prompt you if this isn't set.

## 🏗️ How It Works

ChromaBar modifies VS Code's `workbench.colorCustomizations` at the workspace level:

1. **Per-Workspace Colors**: Each folder/workspace maintains its own color setting
2. **Persistent Storage**: Colors are saved in `.vscode/settings.json` in your project folder
3. **Automatic Restoration**: When you reopen a project, ChromaBar automatically restores its color
4. **Window Independence**: Each VS Code window can have a different color - perfect for multi-project workflows
5. **Native Integration**: Uses VS Code's built-in theming system for compatibility

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/chromabar.git
cd chromabar

# Install dependencies
npm install

# Compile and watch for changes
npm run watch

# Press F5 in VS Code to test
```

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## 🐛 Known Limitations

- Requires `"window.titleBarStyle": "custom"` for title bar colors
- Some Linux distributions with native title bars may not support customization
- Remote development may require window reload for colors to apply

## 📜 License

MIT © ChromaBar Contributors

## 🙏 Acknowledgments

- Color palette inspired by [dopely.top](https://dopely.top)
- Built with the [VS Code Extension API](https://code.visualstudio.com/api)
- Icons from VS Code's [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/chromabar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/chromabar/discussions)
- **Marketplace**: [Rate & Review](https://marketplace.visualstudio.com/items?itemName=chromabar)

---

<p align="center">Made with ❤️ for developers who love organized workspaces</p>
<p align="center">© 2024 ChromaBar</p>
