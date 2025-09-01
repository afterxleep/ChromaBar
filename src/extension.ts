import * as vscode from 'vscode';
import { ColorManager } from './colorManager';
import { StatusBarManager } from './statusBarItem';
import { WORKSPACE_COLORS } from './colors';

let colorManager: ColorManager;
let statusBarManager: StatusBarManager;

export function activate(context: vscode.ExtensionContext) {
  console.log('ChromaBar extension is now active!');
  
  // Initialize managers
  colorManager = new ColorManager(context);
  statusBarManager = new StatusBarManager();
  
  // Check if we have a workspace and update status bar with current color if exists
  if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
    const currentColor = colorManager.getCurrentColor();
    if (currentColor) {
      statusBarManager.updateStatusBar(currentColor);
      console.log(`ChromaBar: Restored color ${currentColor} for workspace`);
    }
  }
  
  // Register command to select color
  const selectColorCommand = vscode.commands.registerCommand(
    'chromabar.selectColor',
    async () => {
      const currentColor = colorManager.getCurrentColor();
      
      // Create quick pick items
      const items: vscode.QuickPickItem[] = WORKSPACE_COLORS.map(color => ({
        label: color.label,
        description: color.value,
        picked: currentColor === color.value
      }));
      
      // Add reset option at the end
      items.push({
        label: '$(clear-all) Reset Colors'
      });
      
      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select a workspace color',
        title: 'Workspace Color Picker'
      });
      
      if (selected) {
        if (selected.label.includes('Reset')) {
          await colorManager.resetColors();
          statusBarManager.updateStatusBar();
        } else {
          const selectedColor = WORKSPACE_COLORS.find(
            c => c.label === selected.label
          );
          if (selectedColor) {
            await colorManager.applyColor(selectedColor.value);
            statusBarManager.updateStatusBar(selectedColor.value);
          }
        }
      }
    }
  );
  
  // Register command to reset colors
  const resetColorCommand = vscode.commands.registerCommand(
    'chromabar.resetColor',
    async () => {
      await colorManager.resetColors();
      statusBarManager.updateStatusBar();
    }
  );
  
  // Listen for configuration changes
  const configChangeListener = vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('workbench.colorCustomizations')) {
      const currentColor = colorManager.getCurrentColor();
      statusBarManager.updateStatusBar(currentColor);
    }
  });
  
  // Listen for workspace folder changes
  const workspaceFolderListener = vscode.workspace.onDidChangeWorkspaceFolders(() => {
    // Update status bar when workspace changes
    const currentColor = colorManager.getCurrentColor();
    statusBarManager.updateStatusBar(currentColor);
    if (currentColor) {
      console.log(`ChromaBar: Workspace changed, color is ${currentColor}`);
    }
  });
  
  
  // Register disposables
  context.subscriptions.push(
    selectColorCommand,
    resetColorCommand,
    configChangeListener,
    workspaceFolderListener,
    statusBarManager
  );
}

export function deactivate() {
  console.log('ChromaBar extension deactivated');
}