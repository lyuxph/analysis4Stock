import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';

const InvestmentPreferences = ({ userData, onDataChange }) => {
  const [preferences, setPreferences] = useState({
    riskTolerance: userData.riskTolerance || 'moderate',
    investmentGoals: ['growth', 'income'],
    timeHorizon: 'long-term',
    preferredSectors: userData.preferredSectors || ['technology', 'healthcare'],
    tradingStyle: userData.tradingStyle || 'swing',
    portfolioSize: 'medium',
    experienceLevel: userData.investmentExperience || 'intermediate',
    autoRebalancing: true,
    dividendReinvestment: true,
    taxOptimization: false,
    esgFocus: false
  });

  const riskToleranceOptions = [
    {
      value: 'conservative',
      label: 'Conservative',
      description: 'Prefer stable, low-risk investments with steady returns',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      value: 'moderate',
      label: 'Moderate',
      description: 'Balance between growth and stability with moderate risk',
      icon: 'TrendingUp',
      color: 'text-primary'
    },
    {
      value: 'aggressive',
      label: 'Aggressive',
      description: 'Seek high growth potential with higher risk tolerance',
      icon: 'Zap',
      color: 'text-warning'
    },
    {
      value: 'speculative',
      label: 'Speculative',
      description: 'Comfortable with high-risk, high-reward investments',
      icon: 'Target',
      color: 'text-error'
    }
  ];

  const investmentGoalOptions = [
    { value: 'growth', label: 'Capital Growth', icon: 'TrendingUp' },
    { value: 'income', label: 'Income Generation', icon: 'DollarSign' },
    { value: 'preservation', label: 'Capital Preservation', icon: 'Shield' },
    { value: 'retirement', label: 'Retirement Planning', icon: 'Clock' },
    { value: 'education', label: 'Education Funding', icon: 'GraduationCap' },
    { value: 'house', label: 'Home Purchase', icon: 'Home' }
  ];

  const timeHorizonOptions = [
    { value: 'short-term', label: 'Short-term (< 2 years)', description: 'Quick returns and liquidity' },
    { value: 'medium-term', label: 'Medium-term (2-10 years)', description: 'Balanced growth approach' },
    { value: 'long-term', label: 'Long-term (10+ years)', description: 'Maximum growth potential' }
  ];

  const sectorOptions = [
    { value: 'technology', label: 'Technology', icon: 'Cpu' },
    { value: 'healthcare', label: 'Healthcare', icon: 'Heart' },
    { value: 'finance', label: 'Financial Services', icon: 'Building' },
    { value: 'energy', label: 'Energy', icon: 'Zap' },
    { value: 'consumer', label: 'Consumer Goods', icon: 'ShoppingCart' },
    { value: 'industrial', label: 'Industrial', icon: 'Factory' },
    { value: 'real-estate', label: 'Real Estate', icon: 'Home' },
    { value: 'utilities', label: 'Utilities', icon: 'Power' },
    { value: 'materials', label: 'Materials', icon: 'Package' },
    { value: 'telecommunications', label: 'Telecommunications', icon: 'Phone' }
  ];

  const tradingStyleOptions = [
    {
      value: 'buy-hold',
      label: 'Buy & Hold',
      description: 'Long-term investment strategy with minimal trading',
      icon: 'Archive'
    },
    {
      value: 'swing',
      label: 'Swing Trading',
      description: 'Medium-term trades lasting days to weeks',
      icon: 'TrendingUp'
    },
    {
      value: 'day-trading',
      label: 'Day Trading',
      description: 'Short-term trades within a single day',
      icon: 'Clock'
    },
    {
      value: 'value',
      label: 'Value Investing',
      description: 'Focus on undervalued stocks with strong fundamentals',
      icon: 'Search'
    }
  ];

  const portfolioSizeOptions = [
    { value: 'small', label: 'Small (< $10K)', description: 'Starting investor portfolio' },
    { value: 'medium', label: 'Medium ($10K - $100K)', description: 'Growing investment portfolio' },
    { value: 'large', label: 'Large ($100K - $1M)', description: 'Substantial investment portfolio' },
    { value: 'institutional', label: 'Institutional (> $1M)', description: 'High net worth portfolio' }
  ];

  const handlePreferenceChange = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    onDataChange({ investmentPreferences: newPreferences });
  };

  const handleMultiSelectChange = (key, value) => {
    const currentValues = preferences[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handlePreferenceChange(key, newValues);
  };

  const handleToggleChange = (key) => {
    handlePreferenceChange(key, !preferences[key]);
  };

  return (
    <div className="space-y-8">
      {/* Investment Profile Summary */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Investment Profile Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Target" size={32} className="text-primary mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary capitalize">{preferences.riskTolerance}</div>
            <div className="text-sm text-text-secondary">Risk Tolerance</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="Clock" size={32} className="text-secondary mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary capitalize">
              {preferences.timeHorizon.replace('-', ' ')}
            </div>
            <div className="text-sm text-text-secondary">Time Horizon</div>
          </div>
          <div className="text-center p-4 bg-surface/50 rounded-lg">
            <Icon name="TrendingUp" size={32} className="text-accent mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary capitalize">
              {preferences.tradingStyle.replace('-', ' ')}
            </div>
            <div className="text-sm text-text-secondary">Trading Style</div>
          </div>
        </div>
      </div>

      {/* Risk Tolerance */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Risk Tolerance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskToleranceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePreferenceChange('riskTolerance', option.value)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                preferences.riskTolerance === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={option.icon} size={20} className={option.color} />
                <span className="font-medium">{option.label}</span>
              </div>
              <p className="text-sm opacity-80">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Investment Goals */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Investment Goals</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {investmentGoalOptions.map((goal) => (
            <button
              key={goal.value}
              onClick={() => handleMultiSelectChange('investmentGoals', goal.value)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                preferences.investmentGoals.includes(goal.value)
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={goal.icon} size={20} />
                <span className="text-sm font-medium text-center">{goal.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Horizon */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Investment Time Horizon</h3>
        
        <div className="space-y-3">
          {timeHorizonOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePreferenceChange('timeHorizon', option.value)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                preferences.timeHorizon === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="font-medium mb-1">{option.label}</div>
              <div className="text-sm opacity-80">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Sectors */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Preferred Sectors</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {sectorOptions.map((sector) => (
            <button
              key={sector.value}
              onClick={() => handleMultiSelectChange('preferredSectors', sector.value)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                preferences.preferredSectors.includes(sector.value)
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={sector.icon} size={18} />
                <span className="text-xs font-medium text-center">{sector.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trading Style */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Trading Style</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tradingStyleOptions.map((style) => (
            <button
              key={style.value}
              onClick={() => handlePreferenceChange('tradingStyle', style.value)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                preferences.tradingStyle === style.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={style.icon} size={20} />
                <span className="font-medium">{style.label}</span>
              </div>
              <p className="text-sm opacity-80">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Size */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Portfolio Size</h3>
        
        <div className="space-y-3">
          {portfolioSizeOptions.map((size) => (
            <button
              key={size.value}
              onClick={() => handlePreferenceChange('portfolioSize', size.value)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                preferences.portfolioSize === size.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="font-medium mb-1">{size.label}</div>
              <div className="text-sm opacity-80">{size.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Advanced Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Auto-Rebalancing</h4>
              <p className="text-sm text-text-secondary">Automatically rebalance portfolio to maintain target allocation</p>
            </div>
            <button
              onClick={() => handleToggleChange('autoRebalancing')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.autoRebalancing ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                preferences.autoRebalancing ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Dividend Reinvestment</h4>
              <p className="text-sm text-text-secondary">Automatically reinvest dividends to compound returns</p>
            </div>
            <button
              onClick={() => handleToggleChange('dividendReinvestment')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.dividendReinvestment ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                preferences.dividendReinvestment ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">Tax Optimization</h4>
              <p className="text-sm text-text-secondary">Optimize trades for tax efficiency and loss harvesting</p>
            </div>
            <button
              onClick={() => handleToggleChange('taxOptimization')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.taxOptimization ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                preferences.taxOptimization ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div>
              <h4 className="font-medium text-text-primary">ESG Focus</h4>
              <p className="text-sm text-text-secondary">Prioritize Environmental, Social, and Governance factors</p>
            </div>
            <button
              onClick={() => handleToggleChange('esgFocus')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.esgFocus ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                preferences.esgFocus ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPreferences;