import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ThemeCustomization = ({ userData, onDataChange }) => {
  const [themeSettings, setThemeSettings] = useState({
    accentColor: 'blue', // blue, purple, green, orange, red, pink
    animationIntensity: 'medium', // low, medium, high, off
    chartStyle: 'modern', // modern, classic, minimal
    density: 'comfortable', // compact, comfortable, spacious
    fontSize: 'medium', // small, medium, large
    reducedMotion: false,
    highContrast: false,
    darkMode: true // Always true for this app
  });

  const accentColorOptions = [
    { 
      value: 'blue', 
      label: 'Electric Blue', 
      primary: '#0066FF', 
      secondary: '#4285F4',
      description: 'Classic professional blue theme'
    },
    { 
      value: 'purple', 
      label: 'Violet', 
      primary: '#8B5CF6', 
      secondary: '#A855F7',
      description: 'Creative and modern purple theme'
    },
    { 
      value: 'green', 
      label: 'Mint Green', 
      primary: '#10B981', 
      secondary: '#34D399',
      description: 'Fresh and growth-focused green theme'
    },
    { 
      value: 'orange', 
      label: 'Sunset Orange', 
      primary: '#F59E0B', 
      secondary: '#FBBF24',
      description: 'Energetic and warm orange theme'
    },
    { 
      value: 'red', 
      label: 'Ruby Red', 
      primary: '#EF4444', 
      secondary: '#F87171',
      description: 'Bold and attention-grabbing red theme'
    },
    { 
      value: 'pink', 
      label: 'Rose Pink', 
      primary: '#EC4899', 
      secondary: '#F472B6',
      description: 'Elegant and distinctive pink theme'
    }
  ];

  const animationIntensityOptions = [
    {
      value: 'off',
      label: 'No Animations',
      description: 'Disable all animations for better performance',
      icon: 'Square'
    },
    {
      value: 'low',
      label: 'Subtle',
      description: 'Minimal animations for essential feedback only',
      icon: 'Minus'
    },
    {
      value: 'medium',
      label: 'Balanced',
      description: 'Smooth animations that enhance the experience',
      icon: 'Circle'
    },
    {
      value: 'high',
      label: 'Dynamic',
      description: 'Rich animations and micro-interactions',
      icon: 'Zap'
    }
  ];

  const chartStyleOptions = [
    {
      value: 'modern',
      label: 'Modern',
      description: 'Sleek gradients and smooth curves',
      preview: 'Modern chart preview'
    },
    {
      value: 'classic',
      label: 'Classic',
      description: 'Traditional financial chart styling',
      preview: 'Classic chart preview'
    },
    {
      value: 'minimal',
      label: 'Minimal',
      description: 'Clean lines and simplified design',
      preview: 'Minimal chart preview'
    }
  ];

  const densityOptions = [
    {
      value: 'compact',
      label: 'Compact',
      description: 'More information in less space',
      spacing: 'Tight spacing'
    },
    {
      value: 'comfortable',
      label: 'Comfortable',
      description: 'Balanced spacing for easy reading',
      spacing: 'Medium spacing'
    },
    {
      value: 'spacious',
      label: 'Spacious',
      description: 'Extra breathing room between elements',
      spacing: 'Loose spacing'
    }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: '14px', description: 'Compact text for more content' },
    { value: 'medium', label: 'Medium', size: '16px', description: 'Standard readable size' },
    { value: 'large', label: 'Large', size: '18px', description: 'Larger text for better readability' }
  ];

  const handleThemeChange = (key, value) => {
    const newSettings = { ...themeSettings, [key]: value };
    setThemeSettings(newSettings);
    onDataChange({ themeSettings: newSettings });
  };

  const handleToggleChange = (key) => {
    const newSettings = { ...themeSettings, [key]: !themeSettings[key] };
    setThemeSettings(newSettings);
    onDataChange({ themeSettings: newSettings });
  };

  const previewTheme = (colorOption) => {
    // This would apply the theme temporarily for preview
    console.log('Previewing theme:', colorOption.value);
  };

  return (
    <div className="space-y-8">
      {/* Theme Preview */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Theme Preview</h3>
        
        <div className="bg-surface/50 rounded-lg p-6 border border-glass-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColorOptions.find(c => c.value === themeSettings.accentColor)?.primary}, ${accentColorOptions.find(c => c.value === themeSettings.accentColor)?.secondary})`
                }}
              >
                <Icon name="TrendingUp" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-text-primary">NeoTrade Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: accentColorOptions.find(c => c.value === themeSettings.accentColor)?.primary }}
              />
              <span className="text-sm text-text-secondary">Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background/50 p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Portfolio Value</div>
              <div 
                className="text-lg font-semibold"
                style={{ color: accentColorOptions.find(c => c.value === themeSettings.accentColor)?.primary }}
              >
                $127,543.21
              </div>
            </div>
            <div className="bg-background/50 p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Today's P&L</div>
              <div className="text-lg font-semibold text-success">+$2,847.32</div>
            </div>
            <div className="bg-background/50 p-3 rounded-lg">
              <div className="text-sm text-text-secondary mb-1">Total Return</div>
              <div className="text-lg font-semibold text-success">+18.4%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Accent Color */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Accent Color</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accentColorOptions.map((color) => (
            <motion.button
              key={color.value}
              onClick={() => handleThemeChange('accentColor', color.value)}
              onMouseEnter={() => previewTheme(color)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                themeSettings.accentColor === color.value
                  ? 'border-primary bg-primary/10' :'border-glass-border bg-surface/30 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ 
                    background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`
                  }}
                />
                <span className="font-medium text-text-primary">{color.label}</span>
              </div>
              <p className="text-sm text-text-secondary">{color.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Animation Intensity */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Animation Intensity</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animationIntensityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange('animationIntensity', option.value)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                themeSettings.animationIntensity === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={option.icon} size={20} />
                <span className="font-medium">{option.label}</span>
              </div>
              <p className="text-sm opacity-80">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Style */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Chart Style</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chartStyleOptions.map((style) => (
            <button
              key={style.value}
              onClick={() => handleThemeChange('chartStyle', style.value)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                themeSettings.chartStyle === style.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="h-16 bg-background/50 rounded mb-3 flex items-center justify-center">
                <span className="text-xs opacity-60">{style.preview}</span>
              </div>
              <div className="font-medium mb-1">{style.label}</div>
              <p className="text-sm opacity-80">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Density */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Layout Density</h3>
        
        <div className="space-y-3">
          {densityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange('density', option.value)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                themeSettings.density === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className="text-sm opacity-80">{option.description}</div>
                </div>
                <div className="text-xs opacity-60">{option.spacing}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Font Size</h3>
        
        <div className="space-y-3">
          {fontSizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange('fontSize', option.value)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                themeSettings.fontSize === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1" style={{ fontSize: option.size }}>
                    {option.label}
                  </div>
                  <div className="text-sm opacity-80">{option.description}</div>
                </div>
                <div className="text-xs opacity-60">{option.size}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Options */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Accessibility</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Reduce Motion</h4>
              <p className="text-sm text-text-secondary">Minimize animations for motion sensitivity</p>
            </div>
            <button
              onClick={() => handleToggleChange('reducedMotion')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                themeSettings.reducedMotion ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                themeSettings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">High Contrast</h4>
              <p className="text-sm text-text-secondary">Increase contrast for better visibility</p>
            </div>
            <button
              onClick={() => handleToggleChange('highContrast')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                themeSettings.highContrast ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                themeSettings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Reset to Defaults */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Reset Theme</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-text-primary">Reset to Default Theme</h4>
            <p className="text-sm text-text-secondary">Restore all theme settings to their default values</p>
          </div>
          <button
            onClick={() => {
              const defaultSettings = {
                accentColor: 'blue',
                animationIntensity: 'medium',
                chartStyle: 'modern',
                density: 'comfortable',
                fontSize: 'medium',
                reducedMotion: false,
                highContrast: false,
                darkMode: true
              };
              setThemeSettings(defaultSettings);
              onDataChange({ themeSettings: defaultSettings });
            }}
            className="px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors border border-glass-border"
          >
            Reset Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomization;