import { useEffect } from 'react';
import { THEME_CONFIG } from '../config/app-config';

const ConfigStyles = () => {
  useEffect(() => {
    const root = document.documentElement;
    const { colors, style } = THEME_CONFIG;

    // Set colors
    Object.entries(colors).forEach(([key, value]) => {
      // Convert camelCase to kebab-case (primaryText -> primary-text)
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value as string);
    });

    // Set gradients
    Object.entries(style.gradients).forEach(([key, value]) => {
      // gradients: header, button, icon
      root.style.setProperty(`--gradient-${key}`, value as string);
    });
  }, []);

  return null;
};

export default ConfigStyles;
