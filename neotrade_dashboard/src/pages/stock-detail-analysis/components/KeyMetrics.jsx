import React from 'react';
import Icon from '../../../components/AppIcon';

const KeyMetrics = ({ stock }) => {
  const metrics = [
    {
      label: 'Current Price',
      value: `$${stock.price.toFixed(2)}`,
      change: stock.change,
      changePercent: stock.changePercent,
      icon: 'DollarSign'
    },
    {
      label: 'Day Range',
      value: `$${stock.dayRange.low} - $${stock.dayRange.high}`,
      subValue: `Spread: $${(stock.dayRange.high - stock.dayRange.low).toFixed(2)}`,
      icon: 'TrendingUp'
    },
    {
      label: '52W Range',
      value: `$${stock.fiftyTwoWeekRange.low} - $${stock.fiftyTwoWeekRange.high}`,
      subValue: `Current vs 52W High: ${(((stock.price - stock.fiftyTwoWeekRange.high) / stock.fiftyTwoWeekRange.high) * 100).toFixed(1)}%`,
      icon: 'Calendar'
    },
    {
      label: 'Volume',
      value: (stock.volume / 1000000).toFixed(1) + 'M',
      subValue: 'Avg: 45.2M',
      icon: 'BarChart3'
    },
    {
      label: 'Market Cap',
      value: formatLargeNumber(stock.marketCap),
      subValue: 'Large Cap',
      icon: 'Building2'
    },
    {
      label: 'P/E Ratio',
      value: stock.peRatio.toFixed(2),
      subValue: 'Industry Avg: 24.5',
      icon: 'Calculator'
    }
  ];

  function formatLargeNumber(value) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  }

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Key Metrics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-surface/50 rounded-lg p-4 hover:bg-surface/70 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={metric.icon} size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{metric.label}</span>
              </div>
              {metric.change !== undefined && (
                <div className={`flex items-center space-x-1 ${
                  metric.change >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={metric.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span className="text-xs font-medium">
                    {metric.changePercent >= 0 ? '+' : ''}{metric.changePercent.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="text-lg font-semibold text-text-primary mb-1">
              {metric.value}
            </div>
            
            {metric.subValue && (
              <div className="text-xs text-text-secondary">
                {metric.subValue}
              </div>
            )}
            
            {metric.change !== undefined && (
              <div className={`text-xs font-medium mt-1 ${
                metric.change >= 0 ? 'text-success' : 'text-error'
              }`}>
                {metric.change >= 0 ? '+' : ''}${metric.change.toFixed(2)} today
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="mt-6 pt-4 border-t border-glass-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-text-secondary">Beta</div>
            <div className="text-sm font-medium text-text-primary">1.24</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">EPS</div>
            <div className="text-sm font-medium text-text-primary">$6.64</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">Dividend</div>
            <div className="text-sm font-medium text-text-primary">$0.96</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">Yield</div>
            <div className="text-sm font-medium text-text-primary">0.51%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;