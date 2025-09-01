import * as vscode from 'vscode';

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  
  constructor() {
    // Create status bar item on the right side
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    
    this.statusBarItem.command = 'chromabar.selectColor';
    this.updateStatusBar();
  }
  
  updateStatusBar(currentColor?: string): void {
    if (currentColor) {
      // Show colored square when color is set
      this.statusBarItem.text = `$(paintcan) Workspace Color`;
      this.statusBarItem.tooltip = `Current color: ${currentColor}\nClick to change workspace color`;
      this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.prominentBackground');
    } else {
      // Show paint icon when no color is set
      this.statusBarItem.text = `$(paintcan)`;
      this.statusBarItem.tooltip = 'Click to set workspace color';
      this.statusBarItem.backgroundColor = undefined;
    }
    
    this.statusBarItem.show();
  }
  
  dispose(): void {
    this.statusBarItem.dispose();
  }
}