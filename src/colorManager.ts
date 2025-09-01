import * as vscode from 'vscode';
import { darkenColor } from './colors';

export class ColorManager {
  private readonly CONFIG_KEY = 'workbench';
  private readonly COLOR_CUSTOMIZATIONS_KEY = 'colorCustomizations';
  
  constructor(private context: vscode.ExtensionContext) {}

  async applyColor(color: string): Promise<void> {
    // Check if we have a workspace open
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
      vscode.window.showWarningMessage('Please open a folder or workspace to set colors');
      return;
    }
    
    const config = vscode.workspace.getConfiguration(this.CONFIG_KEY);
    const currentCustomizations = config.get<any>(this.COLOR_CUSTOMIZATIONS_KEY) || {};
    
    // Create darker version for inactive state
    const inactiveColor = darkenColor(color, 20);
    
    const newCustomizations = {
      ...currentCustomizations,
      'titleBar.activeBackground': color,
      'titleBar.inactiveBackground': inactiveColor,
      'titleBar.activeForeground': this.getContrastColor(color),
      'titleBar.inactiveForeground': this.getContrastColor(inactiveColor)
    };
    
    try {
      await config.update(
        this.COLOR_CUSTOMIZATIONS_KEY,
        newCustomizations,
        vscode.ConfigurationTarget.Workspace
      );
      
      // Save the current color to context for status bar display
      await this.context.workspaceState.update('currentColor', color);
    } catch (error) {
      // Silently fail or log to console instead of showing error
      console.error('Failed to update color:', error);
    }
  }
  
  async resetColors(): Promise<void> {
    // Check if we have a workspace open
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
      vscode.window.showWarningMessage('Please open a folder or workspace to reset colors');
      return;
    }
    
    const config = vscode.workspace.getConfiguration(this.CONFIG_KEY);
    const currentCustomizations = config.get<any>(this.COLOR_CUSTOMIZATIONS_KEY) || {};
    
    // Remove only title bar customizations
    const keysToRemove = [
      'titleBar.activeBackground',
      'titleBar.inactiveBackground',
      'titleBar.activeForeground',
      'titleBar.inactiveForeground'
    ];
    
    const newCustomizations = { ...currentCustomizations };
    keysToRemove.forEach(key => delete newCustomizations[key]);
    
    try {
      if (Object.keys(newCustomizations).length === 0) {
        // If no customizations left, remove the entire setting
        await config.update(
          this.COLOR_CUSTOMIZATIONS_KEY,
          undefined,
          vscode.ConfigurationTarget.Workspace
        );
      } else {
        // Otherwise, update with remaining customizations
        await config.update(
          this.COLOR_CUSTOMIZATIONS_KEY,
          newCustomizations,
          vscode.ConfigurationTarget.Workspace
        );
      }
      
      // Clear saved color
      await this.context.workspaceState.update('currentColor', undefined);
    } catch (error) {
      // Silently fail or log to console instead of showing error
      console.error('Failed to reset colors:', error);
    }
  }
  
  getCurrentColor(): string | undefined {
    const config = vscode.workspace.getConfiguration(this.CONFIG_KEY);
    const customizations = config.get<any>(this.COLOR_CUSTOMIZATIONS_KEY);
    return customizations?.['titleBar.activeBackground'];
  }
  
  private getContrastColor(hexColor: string): string {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}