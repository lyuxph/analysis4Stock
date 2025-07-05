import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TechnicalIndicators = ({ activeIndicators, onToggleIndicator }) => {
  const [expandedSections, setExpandedSections] = useState(['overview']);

  const indicators = {
    overview: {
      title: 'Overview',
      items: [
        { name: 'RSI (14)', value: '58.4', status: 'neutral', description: 'Relative Strength Index' },
        { name: 'MACD', value: '2.45', status: 'bullish', description: 'Moving Average Convergence Divergence' },
        { name: 'Stochastic', value: '72.1', status: 'overbought', description: 'Stochastic Oscillator' },
        { name: 'Williams %R', value: '-28.5', status: 'neutral', description: 'Williams Percent Range' }
      ]
    },
    movingAverages: {
      title: 'Moving Averages',
      items: [
        { name: 'SMA 20', value: '$187.45', status: 'bullish', description: 'Simple Moving Average 20-day' },
        { name: 'SMA 50', value: '$182.30', status: 'bullish', description: 'Simple Moving Average 50-day' },
        { name: 'EMA 12', value: '$188.90', status: 'bullish', description: 'Exponential Moving Average 12-day' },
        { name: 'EMA 26', value: '$185.20', status: 'bullish', description: 'Exponential Moving Average 26-day' }
      ]
    },
    volatility: {
      title: 'Volatility',
      items: [
        { name: 'Bollinger Upper', value: '$195.20', status: 'resistance', description: 'Bollinger Band Upper' },
        { name: 'Bollinger Lower', value: '$183.40', status: 'support', description: 'Bollinger Band Lower' },
        { name: 'ATR (14)', value: '3.45', status: 'normal', description: 'Average True Range' },
        { name: 'Volatility', value: '18.2%', status: 'moderate', description: 'Historical Volatility' }
      ]
    },
    support: {
      title: 'Support & Resistance',
      items: [
        { name: 'Resistance 1', value: '$192.50', status: 'strong', description: 'First resistance level' },
        { name: 'Resistance 2', value: '$196.80', status: 'moderate', description: 'Second resistance level' },
        { name: 'Support 1', value: '$185.20', status: 'strong', description: 'First support level' },
        { name: 'Support 2', value: '$180.90', status: 'moderate', description: 'Second support level' }
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'bullish': return 'text-success';
      case 'bearish': return 'text-error';
      case 'overbought': return 'text-warning';
      case 'oversold': return 'text-accent';
      case 'strong': return 'text-primary';
      case 'resistance': return 'text-error';
      case 'support': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'bullish': return 'TrendingUp';
      case 'bearish': return 'TrendingDown';
      case 'overbought': return 'AlertTriangle';
      case 'oversold': return 'AlertCircle';
      case 'strong': return 'Shield';
      case 'resistance': return 'ArrowUp';
      case 'support': return 'ArrowDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Technical Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      {/* Overall Signal */}
      <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-text-secondary">Overall Signal</div>
            <div className="text-lg font-semibold text-success">BULLISH</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-secondary">Confidence</div>
            <div className="text-lg font-semibold text-text-primary">78%</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-surface rounded-full h-2">
            <div className="bg-gradient-to-r from-success to-primary h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
      </div>

      {/* Indicator Sections */}
      <div className="space-y-4">
        {Object.entries(indicators).map(([key, section]) => (
          <div key={key} className="border border-glass-border rounded-lg">
            <button
              onClick={() => toggleSection(key)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface/30 transition-colors"
            >
              <span className="font-medium text-text-primary">{section.title}</span>
              <Icon 
                name={expandedSections.includes(key) ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>
            
            {expandedSections.includes(key) && (
              <div className="px-4 pb-4 space-y-3">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getStatusIcon(item.status)} 
                        size={14} 
                        className={getStatusColor(item.status)} 
                      />
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {item.name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-text-primary">
                        {item.value}
                      </div>
                      <div className={`text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <div className="text-sm font-medium text-text-primary mb-3">Chart Indicators</div>
        <div className="flex flex-wrap gap-2">
          {['MACD', 'RSI', 'SMA', 'Bollinger', 'Volume'].map((indicator) => (
            <button
              key={indicator}
              onClick={() => onToggleIndicator(indicator)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeIndicators.includes(indicator)
                  ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface/80'
              }`}
            >
              {indicator}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <div className="text-sm font-medium text-text-primary mb-2">Key Insights</div>
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success mt-0.5" />
            <span>Price is above all major moving averages, indicating strong uptrend</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={12} className="text-warning mt-0.5" />
            <span>RSI approaching overbought territory, watch for potential pullback</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={12} className="text-primary mt-0.5" />
            <span>Volume is above average, confirming the current price movement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;