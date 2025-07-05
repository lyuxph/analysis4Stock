import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import PriceChart from './components/PriceChart';
import KeyMetrics from './components/KeyMetrics';
import TechnicalIndicators from './components/TechnicalIndicators';
import NewsFeed from './components/NewsFeed';
import PriceAlerts from './components/PriceAlerts';
import SocialSentiment from './components/SocialSentiment';

const StockDetailAnalysis = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('1D');
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  const [activeIndicators, setActiveIndicators] = useState(['MACD', 'RSI']);
  const [isLoading, setIsLoading] = useState(false);

  // Mock stock data
  const stockData = {
    'AAPL': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 189.25,
      change: 2.45,
      changePercent: 1.31,
      dayRange: { low: 186.80, high: 190.15 },
      fiftyTwoWeekRange: { low: 124.17, high: 199.62 },
      volume: 45678900,
      marketCap: 2950000000000,
      peRatio: 28.45,
      logo: 'https://logo.clearbit.com/apple.com',
      sector: 'Technology',
      industry: 'Consumer Electronics'
    },
    'TSLA': {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 248.50,
      change: -5.25,
      changePercent: -2.07,
      dayRange: { low: 245.30, high: 252.80 },
      fiftyTwoWeekRange: { low: 101.81, high: 299.29 },
      volume: 89234567,
      marketCap: 789000000000,
      peRatio: 65.23,
      logo: 'https://logo.clearbit.com/tesla.com',
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers'
    },
    'GOOGL': {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.85,
      change: 1.75,
      changePercent: 1.24,
      dayRange: { low: 141.20, high: 143.90 },
      fiftyTwoWeekRange: { low: 83.34, high: 151.55 },
      volume: 23456789,
      marketCap: 1800000000000,
      peRatio: 25.67,
      logo: 'https://logo.clearbit.com/google.com',
      sector: 'Communication Services',
      industry: 'Internet Content & Information'
    }
  };

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '5D', value: '5D' },
    { label: '1M', value: '1M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: '5Y', value: '5Y' }
  ];

  const availableStocks = Object.keys(stockData);
  const currentStock = stockData[selectedStock];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedStock, timeframe]);

  const handleStockChange = (symbol) => {
    setSelectedStock(symbol);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const toggleIndicator = (indicator) => {
    setActiveIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-20 pb-20 lg:pb-8">
        <div className="px-4 lg:px-8 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <button 
              onClick={() => navigate('/portfolio-dashboard')}
              className="hover:text-text-primary transition-colors"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Stocks</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary font-medium">{selectedStock}</span>
          </nav>

          {/* Stock Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface flex items-center justify-center">
                <Image 
                  src={currentStock.logo} 
                  alt={currentStock.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                    {currentStock.symbol}
                  </h1>
                  <select
                    value={selectedStock}
                    onChange={(e) => handleStockChange(e.target.value)}
                    className="bg-surface border border-glass-border rounded-lg px-3 py-1 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availableStocks.map(symbol => (
                      <option key={symbol} value={symbol}>{symbol}</option>
                    ))}
                  </select>
                </div>
                <p className="text-text-secondary">{currentStock.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-surface px-2 py-1 rounded text-text-secondary">
                    {currentStock.sector}
                  </span>
                  <span className="text-xs bg-surface px-2 py-1 rounded text-text-secondary">
                    {currentStock.industry}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl lg:text-4xl font-bold text-text-primary">
                {formatCurrency(currentStock.price)}
              </div>
              <div className={`flex items-center justify-end space-x-2 ${
                currentStock.change >= 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={currentStock.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                />
                <span className="font-medium">
                  {currentStock.change >= 0 ? '+' : ''}{formatCurrency(currentStock.change)}
                </span>
                <span className="font-medium">
                  ({currentStock.change >= 0 ? '+' : ''}{currentStock.changePercent.toFixed(2)}%)
                </span>
              </div>
              <div className="text-xs text-text-secondary mt-1">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6">
            {/* Main Chart Area */}
            <div className="lg:col-span-8">
              <div className="glass-card rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Price Chart
                  </h2>
                  <div className="flex items-center space-x-2">
                    {timeframes.map((tf) => (
                      <button
                        key={tf.value}
                        onClick={() => handleTimeframeChange(tf.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          timeframe === tf.value
                            ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                        }`}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>
                </div>
                <PriceChart 
                  symbol={selectedStock}
                  timeframe={timeframe}
                  activeIndicators={activeIndicators}
                  isLoading={isLoading}
                />
              </div>

              <KeyMetrics stock={currentStock} />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <TechnicalIndicators 
                activeIndicators={activeIndicators}
                onToggleIndicator={toggleIndicator}
              />
              <SocialSentiment symbol={selectedStock} />
              <NewsFeed symbol={selectedStock} />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Chart */}
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  Price Chart
                </h2>
                <div className="flex items-center space-x-1">
                  {timeframes.slice(0, 4).map((tf) => (
                    <button
                      key={tf.value}
                      onClick={() => handleTimeframeChange(tf.value)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        timeframe === tf.value
                          ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>
              <PriceChart 
                symbol={selectedStock}
                timeframe={timeframe}
                activeIndicators={activeIndicators}
                isLoading={isLoading}
              />
            </div>

            <KeyMetrics stock={currentStock} />
            <TechnicalIndicators 
              activeIndicators={activeIndicators}
              onToggleIndicator={toggleIndicator}
            />
            <SocialSentiment symbol={selectedStock} />
            <NewsFeed symbol={selectedStock} />
          </div>

          {/* Sticky Action Buttons (Mobile) */}
          <div className="fixed bottom-20 left-4 right-4 lg:hidden">
            <div className="flex space-x-3">
              <button className="flex-1 bg-success text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-success/90 transition-colors">
                <Icon name="TrendingUp" size={20} />
                <span>Buy</span>
              </button>
              <button className="flex-1 bg-error text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-error/90 transition-colors">
                <Icon name="TrendingDown" size={20} />
                <span>Sell</span>
              </button>
              <button 
                onClick={() => setShowPriceAlerts(true)}
                className="bg-surface border border-glass-border text-text-primary py-3 px-4 rounded-lg hover:bg-surface/80 transition-colors"
              >
                <Icon name="Bell" size={20} />
              </button>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:block fixed bottom-8 right-8">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setShowPriceAlerts(true)}
                className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
                title="Set Price Alert"
              >
                <Icon name="Bell" size={20} />
              </button>
              <button className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center hover:bg-success/90 transition-colors shadow-lg">
                <Icon name="Plus" size={20} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Price Alerts Modal */}
      {showPriceAlerts && (
        <PriceAlerts 
          stock={currentStock}
          onClose={() => setShowPriceAlerts(false)}
        />
      )}
    </div>
  );
};

export default StockDetailAnalysis;