import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = ({ data, selectedPeriod, isRefreshing }) => {
  const [animatedValues, setAnimatedValues] = useState({
    totalValue: 0,
    dailyPL: 0,
    totalPL: 0
  });

  useEffect(() => {
    // Animate numbers on mount and data changes
    const animateValue = (start, end, duration, callback) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        callback(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(animatedValues.totalValue, data.totalValue, 1000, (value) => {
      setAnimatedValues(prev => ({ ...prev, totalValue: value }));
    });

    animateValue(animatedValues.dailyPL, data.dailyPL, 1000, (value) => {
      setAnimatedValues(prev => ({ ...prev, dailyPL: value }));
    });

    animateValue(animatedValues.totalPL, data.totalPL, 1000, (value) => {
      setAnimatedValues(prev => ({ ...prev, totalPL: value }));
    });
  }, [data]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getChangeColor = (value) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = (value) => {
    if (value > 0) return 'TrendingUp';
    if (value < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="mb-8">
      <div className="glass-card rounded-xl p-6 mb-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
        
        {/* Loading overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={20} className="text-primary animate-spin" />
              <span className="text-text-primary">Updating...</span>
            </div>
          </div>
        )}

        <div className="relative z-5">
          {/* Total Portfolio Value */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Wallet" size={24} className="text-primary" />
              <h3 className="text-lg font-medium text-text-secondary">Total Portfolio Value</h3>
            </div>
            <div className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-2">
              {formatCurrency(animatedValues.totalValue)}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center space-x-1 ${getChangeColor(data.dailyReturn)}`}>
                <Icon name={getChangeIcon(data.dailyReturn)} size={16} />
                <span className="font-medium">{formatPercentage(data.dailyReturn)}</span>
              </div>
              <div className="text-text-secondary">•</div>
              <div className={`font-medium ${getChangeColor(data.dailyPL)}`}>
                {data.dailyPL >= 0 ? '+' : ''}{formatCurrency(data.dailyPL)}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Performance */}
            <div className="glass-card rounded-lg p-4 hover:bg-surface/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-text-secondary">Daily P&L</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  data.dailyPL >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {selectedPeriod}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className={`text-2xl font-bold ${getChangeColor(data.dailyPL)}`}>
                  {data.dailyPL >= 0 ? '+' : ''}{formatCurrency(animatedValues.dailyPL)}
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor(data.dailyReturn)}`}>
                  <Icon name={getChangeIcon(data.dailyReturn)} size={16} />
                  <span className="font-medium">{formatPercentage(data.dailyReturn)}</span>
                </div>
              </div>
            </div>

            {/* Total Performance */}
            <div className="glass-card rounded-lg p-4 hover:bg-surface/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-text-secondary">Total P&L</span>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  All Time
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className={`text-2xl font-bold ${getChangeColor(data.totalPL)}`}>
                  {data.totalPL >= 0 ? '+' : ''}{formatCurrency(animatedValues.totalPL)}
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor(data.totalReturn)}`}>
                  <Icon name={getChangeIcon(data.totalReturn)} size={16} />
                  <span className="font-medium">{formatPercentage(data.totalReturn)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;