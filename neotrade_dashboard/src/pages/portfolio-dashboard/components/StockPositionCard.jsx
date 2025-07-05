import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StockPositionCard = ({ stock, onClick, isRefreshing }) => {
  const [imageError, setImageError] = useState(false);

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

  const getBgGradient = (value) => {
    if (value > 0) return 'from-success/5 to-success/10';
    if (value < 0) return 'from-error/5 to-error/10';
    return 'from-surface/5 to-surface/10';
  };

  return (
    <div
      onClick={() => onClick(stock)}
      className="glass-card rounded-xl p-6 cursor-pointer hover:scale-105 hover:bg-surface/30 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Background gradient based on performance */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBgGradient(stock.totalPL)} opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      {/* Pulse animation for real-time updates */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface/50 flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={stock.logo}
                  alt={stock.companyName}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Icon name="Building2" size={24} className="text-text-secondary" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary text-lg">
                {stock.symbol}
              </h3>
              <p className="text-sm text-text-secondary truncate max-w-32">
                {stock.companyName}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-text-secondary">Shares</div>
            <div className="font-semibold text-text-primary">{stock.shares}</div>
          </div>
        </div>

        {/* Price Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Current Price</span>
            <div className="text-right">
              <div className="font-semibold text-text-primary">
                {formatCurrency(stock.currentPrice)}
              </div>
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor(stock.dailyChange)}`}>
                <Icon name={getChangeIcon(stock.dailyChange)} size={12} />
                <span>{formatCurrency(Math.abs(stock.dailyChange))}</span>
                <span>({formatPercentage(stock.dailyChangePercent)})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Buy Price</span>
            <span className="font-medium text-text-primary">
              {formatCurrency(stock.buyPrice)}
            </span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="border-t border-glass-border pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-text-secondary mb-1">Total P&L</div>
              <div className={`font-bold ${getChangeColor(stock.totalPL)}`}>
                {stock.totalPL >= 0 ? '+' : ''}{formatCurrency(stock.totalPL)}
              </div>
              <div className={`text-xs ${getChangeColor(stock.totalReturn)}`}>
                {formatPercentage(stock.totalReturn)}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-text-secondary mb-1">Market Value</div>
              <div className="font-bold text-text-primary">
                {formatCurrency(stock.currentPrice * stock.shares)}
              </div>
              <div className="text-xs text-text-secondary">
                {stock.shares} shares
              </div>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="ExternalLink" size={16} className="text-text-secondary" />
        </div>
      </div>
    </div>
  );
};

export default StockPositionCard;