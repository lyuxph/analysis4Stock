import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

const PremiumStrategyHub = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [followedStrategies, setFollowedStrategies] = useState([1, 3, 5]);
  const [sortBy, setSortBy] = useState('performance');
  const [viewMode, setViewMode] = useState('grid');
  const [showCopyTrading, setShowCopyTrading] = useState(false);
  const [copyTradingSettings, setCopyTradingSettings] = useState({
    positionSize: 10,
    riskLevel: 'medium',
    autoFollow: false
  });

  const strategies = [
    {
      id: 1,
      name: "Tech Growth Momentum",
      creator: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        verified: true,
        followers: 2847,
        winRate: 73.2
      },
      performance: {
        daily: 2.4,
        monthly: 12.8,
        inception: 156.7,
        winRate: 73.2,
        maxDrawdown: -8.4,
        sharpeRatio: 1.84
      },
      positions: [
        { symbol: "NVDA", entry: 485.20, current: 512.30, size: 15, pnl: 5.6 },
        { symbol: "MSFT", entry: 378.90, current: 385.40, size: 20, pnl: 1.7 },
        { symbol: "GOOGL", entry: 142.80, current: 148.20, size: 12, pnl: 3.8 }
      ],
      description: `Advanced momentum strategy focusing on high-growth technology stocks with strong earnings acceleration and institutional buying. Uses proprietary screening algorithms to identify breakout patterns before major moves.

Risk Management: Maximum 3% position size per stock, 15% sector concentration limit, dynamic stop-losses based on volatility.`,
      tags: ["Growth", "Technology", "Momentum"],
      riskLevel: "Medium-High",
      minInvestment: 10000,
      followers: 2847,
      sparklineData: [100, 102, 98, 105, 108, 112, 115, 118, 122, 125, 128, 132],
      recentUpdates: [
        { date: "2024-01-15", action: "Added NVDA position", details: "Entry at $485.20, 15% allocation" },
        { date: "2024-01-12", action: "Reduced AAPL", details: "Trimmed position by 50% at $195.80" }
      ]
    },
    {
      id: 2,
      name: "Dividend Aristocrats Plus",
      creator: {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        verified: true,
        followers: 1923,
        winRate: 68.9
      },
      performance: {
        daily: 0.8,
        monthly: 4.2,
        inception: 89.3,
        winRate: 68.9,
        maxDrawdown: -5.2,
        sharpeRatio: 1.92
      },
      positions: [
        { symbol: "JNJ", entry: 158.40, current: 162.10, size: 18, pnl: 2.3 },
        { symbol: "PG", entry: 145.20, current: 148.90, size: 16, pnl: 2.5 },
        { symbol: "KO", entry: 58.70, current: 59.80, size: 14, pnl: 1.9 }
      ],
      description: `Conservative dividend growth strategy targeting companies with 25+ years of consecutive dividend increases. Enhanced with covered call writing for additional income generation.

Focus on quality companies with sustainable competitive advantages and strong cash flow generation.`,
      tags: ["Dividend", "Conservative", "Income"],
      riskLevel: "Low",
      minInvestment: 5000,
      followers: 1923,
      sparklineData: [100, 101, 103, 102, 104, 106, 105, 107, 109, 108, 110, 112],
      recentUpdates: [
        { date: "2024-01-14", action: "Dividend received", details: "JNJ quarterly dividend $1.19 per share" },
        { date: "2024-01-10", action: "Covered call", details: "Sold PG Feb $150 calls for $2.40" }
      ]
    },
    {
      id: 3,
      name: "Crypto-Correlated Equities",
      creator: {
        name: "Alex Thompson",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        verified: true,
        followers: 3421,
        winRate: 71.5
      },
      performance: {
        daily: 3.2,
        monthly: 18.7,
        inception: 234.8,
        winRate: 71.5,
        maxDrawdown: -12.8,
        sharpeRatio: 1.67
      },
      positions: [
        { symbol: "MSTR", entry: 342.10, current: 378.50, size: 12, pnl: 10.6 },
        { symbol: "COIN", entry: 156.80, current: 168.20, size: 10, pnl: 7.3 },
        { symbol: "RIOT", entry: 12.40, current: 13.90, size: 8, pnl: 12.1 }
      ],
      description: `High-growth strategy targeting publicly traded companies with significant Bitcoin exposure and blockchain technology focus. Combines fundamental analysis with crypto market sentiment indicators.

Leverages correlation patterns between Bitcoin price movements and equity valuations in the crypto ecosystem.`,
      tags: ["Crypto", "High-Growth", "Volatile"],
      riskLevel: "High",
      minInvestment: 15000,
      followers: 3421,
      sparklineData: [100, 95, 108, 112, 98, 125, 118, 135, 142, 138, 155, 162],
      recentUpdates: [
        { date: "2024-01-16", action: "Bitcoin correlation alert", details: "BTC breakout above $45K - monitoring positions" },
        { date: "2024-01-13", action: "Added MSTR", details: "Increased allocation on institutional buying" }
      ]
    },
    {
      id: 4,
      name: "ESG Leaders Portfolio",
      creator: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        verified: true,
        followers: 1567,
        winRate: 69.4
      },
      performance: {
        daily: 1.1,
        monthly: 6.8,
        inception: 94.2,
        winRate: 69.4,
        maxDrawdown: -6.8,
        sharpeRatio: 1.73
      },
      positions: [
        { symbol: "TSLA", entry: 248.50, current: 267.80, size: 14, pnl: 7.8 },
        { symbol: "NEE", entry: 68.90, current: 71.20, size: 16, pnl: 3.3 },
        { symbol: "ENPH", entry: 142.30, current: 156.70, size: 12, pnl: 10.1 }
      ],
      description: `Sustainable investing strategy focusing on companies with strong Environmental, Social, and Governance practices. Targets leaders in clean energy, sustainable technology, and responsible business practices.

Combines ESG scoring with traditional financial metrics to identify long-term value creation opportunities.`,
      tags: ["ESG", "Sustainable", "Long-term"],
      riskLevel: "Medium",
      minInvestment: 7500,
      followers: 1567,
      sparklineData: [100, 103, 101, 106, 109, 107, 112, 115, 113, 118, 121, 124],
      recentUpdates: [
        { date: "2024-01-15", action: "ESG rating upgrade", details: "TSLA improved governance score to A+" },
        { date: "2024-01-11", action: "Clean energy focus", details: "Added ENPH on solar growth outlook" }
      ]
    },
    {
      id: 5,
      name: "AI Revolution Play",
      creator: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        verified: true,
        followers: 4156,
        winRate: 75.8
      },
      performance: {
        daily: 2.9,
        monthly: 15.4,
        inception: 198.6,
        winRate: 75.8,
        maxDrawdown: -9.2,
        sharpeRatio: 1.91
      },
      positions: [
        { symbol: "NVDA", entry: 478.20, current: 512.30, size: 20, pnl: 7.1 },
        { symbol: "AMD", entry: 142.80, current: 156.40, size: 15, pnl: 9.5 },
        { symbol: "PLTR", entry: 16.90, current: 18.70, size: 10, pnl: 10.7 }
      ],
      description: `Concentrated AI and machine learning investment strategy targeting companies at the forefront of artificial intelligence revolution. Focus on semiconductor leaders, AI software platforms, and data infrastructure providers.

Utilizes proprietary AI sentiment analysis and patent tracking to identify emerging opportunities before mainstream adoption.`,
      tags: ["AI", "Technology", "Innovation"],
      riskLevel: "High",
      minInvestment: 20000,
      followers: 4156,
      sparklineData: [100, 108, 115, 112, 125, 132, 128, 145, 152, 148, 165, 172],
      recentUpdates: [
        { date: "2024-01-16", action: "AI earnings season", details: "Positioning for NVDA earnings on Jan 24" },
        { date: "2024-01-14", action: "Patent analysis", details: "AMD filed 12 new AI-related patents" }
      ]
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Strategies', count: strategies.length },
    { value: 'growth', label: 'Growth', count: 2 },
    { value: 'dividend', label: 'Dividend', count: 1 },
    { value: 'tech', label: 'Technology', count: 3 },
    { value: 'esg', label: 'ESG', count: 1 }
  ];

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const filteredStrategies = strategies.filter(strategy => {
    if (selectedFilter === 'all') return true;
    return strategy.tags.some(tag => tag.toLowerCase().includes(selectedFilter));
  });

  const sortedStrategies = [...filteredStrategies].sort((a, b) => {
    switch (sortBy) {
      case 'performance':
        return b.performance.inception - a.performance.inception;
      case 'winRate':
        return b.performance.winRate - a.performance.winRate;
      case 'followers':
        return b.followers - a.followers;
      case 'risk':
        const riskOrder = { 'Low': 1, 'Medium': 2, 'Medium-High': 3, 'High': 4 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      default:
        return 0;
    }
  });

  const handleFollowStrategy = (strategyId) => {
    setFollowedStrategies(prev => 
      prev.includes(strategyId) 
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const handleCopyTrading = (strategy) => {
    setSelectedStrategy(strategy);
    setShowCopyTrading(true);
  };

  const getPerformanceColor = (value) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-text-secondary';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Medium-High': return 'text-warning';
      case 'High': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-20 pb-20 lg:pb-8">
        <div className="px-4 lg:px-8 py-6">
          {/* Premium Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-warning to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Crown" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">Premium Strategy Hub</h1>
                <p className="text-text-secondary">Exclusive investment strategies from verified professionals</p>
              </div>
            </div>
            
            <div className="glass-card p-4 rounded-lg border border-warning/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Icon name="Shield" size={20} className="text-warning" />
                  <span className="text-text-primary font-medium">Premium Access Active</span>
                  <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">PRO</span>
                </div>
                <div className="text-sm text-text-secondary">
                  Next billing: Feb 15, 2024
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedFilter === option.value
                        ? 'bg-primary text-white' :'glass-card text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface border border-glass-border rounded-lg px-3 py-2 text-text-primary text-sm"
                  >
                    <option value="performance">Performance</option>
                    <option value="winRate">Win Rate</option>
                    <option value="followers">Followers</option>
                    <option value="risk">Risk Level</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-1 glass-card rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary'}`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary'}`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Timeframe:</span>
              <div className="flex space-x-1">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedTimeframe === timeframe
                        ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Strategy Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' ?'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
          }`}>
            <AnimatePresence>
              {sortedStrategies.map((strategy) => (
                <motion.div
                  key={strategy.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card rounded-lg p-6 hover:bg-surface/50 transition-all duration-300 group"
                >
                  {/* Strategy Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={strategy.creator.avatar}
                        alt={strategy.creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
                          {strategy.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-text-secondary">{strategy.creator.name}</span>
                          {strategy.creator.verified && (
                            <Icon name="BadgeCheck" size={14} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(strategy.riskLevel)} bg-current/10`}>
                        {strategy.riskLevel}
                      </span>
                      <button
                        onClick={() => handleFollowStrategy(strategy.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          followedStrategies.includes(strategy.id)
                            ? 'bg-primary text-white' :'glass-card text-text-secondary hover:text-primary'
                        }`}
                      >
                        <Icon name={followedStrategies.includes(strategy.id) ? "Heart" : "HeartOff"} size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getPerformanceColor(strategy.performance.daily)}`}>
                        {strategy.performance.daily > 0 ? '+' : ''}{strategy.performance.daily}%
                      </div>
                      <div className="text-xs text-text-secondary">Daily</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getPerformanceColor(strategy.performance.monthly)}`}>
                        {strategy.performance.monthly > 0 ? '+' : ''}{strategy.performance.monthly}%
                      </div>
                      <div className="text-xs text-text-secondary">Monthly</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getPerformanceColor(strategy.performance.inception)}`}>
                        {strategy.performance.inception > 0 ? '+' : ''}{strategy.performance.inception}%
                      </div>
                      <div className="text-xs text-text-secondary">Total</div>
                    </div>
                  </div>

                  {/* Sparkline Chart */}
                  <div className="mb-4">
                    <div className="h-16 flex items-end space-x-1">
                      {strategy.sparklineData.map((value, index) => {
                        const height = ((value - Math.min(...strategy.sparklineData)) / 
                          (Math.max(...strategy.sparklineData) - Math.min(...strategy.sparklineData))) * 100;
                        return (
                          <div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t"
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Win Rate and Followers */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={14} className="text-success" />
                        <span className="text-sm text-text-secondary">
                          {strategy.performance.winRate}% Win Rate
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} className="text-text-secondary" />
                        <span className="text-sm text-text-secondary">
                          {strategy.followers.toLocaleString()} followers
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {strategy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedStrategy(strategy)}
                      className="flex-1 glass-card text-text-primary py-2 px-4 rounded-lg font-medium hover:bg-surface/50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleCopyTrading(strategy)}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Copy Trade
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Strategy Detail Modal */}
          <AnimatePresence>
            {selectedStrategy && !showCopyTrading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedStrategy(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    {/* Modal Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={selectedStrategy.creator.avatar}
                          alt={selectedStrategy.creator.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-2xl font-heading font-bold text-text-primary">
                            {selectedStrategy.name}
                          </h2>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-text-secondary">{selectedStrategy.creator.name}</span>
                            {selectedStrategy.creator.verified && (
                              <Icon name="BadgeCheck" size={16} className="text-primary" />
                            )}
                            <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                              VERIFIED
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStrategy(null)}
                        className="p-2 rounded-lg glass-card hover:bg-surface/50 transition-colors"
                      >
                        <Icon name="X" size={20} className="text-text-secondary" />
                      </button>
                    </div>

                    {/* Performance Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className={`text-2xl font-bold ${getPerformanceColor(selectedStrategy.performance.inception)}`}>
                          {selectedStrategy.performance.inception > 0 ? '+' : ''}{selectedStrategy.performance.inception}%
                        </div>
                        <div className="text-sm text-text-secondary">Total Return</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-success">
                          {selectedStrategy.performance.winRate}%
                        </div>
                        <div className="text-sm text-text-secondary">Win Rate</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-text-primary">
                          {selectedStrategy.performance.sharpeRatio}
                        </div>
                        <div className="text-sm text-text-secondary">Sharpe Ratio</div>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-error">
                          {selectedStrategy.performance.maxDrawdown}%
                        </div>
                        <div className="text-sm text-text-secondary">Max Drawdown</div>
                      </div>
                    </div>

                    {/* Strategy Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                        Strategy Overview
                      </h3>
                      <div className="glass-card p-4 rounded-lg">
                        <p className="text-text-secondary leading-relaxed">
                          {selectedStrategy.description}
                        </p>
                      </div>
                    </div>

                    {/* Current Positions */}
                    <div className="mb-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                        Current Positions
                      </h3>
                      <div className="glass-card rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-surface/50">
                              <tr>
                                <th className="text-left p-4 text-text-secondary font-medium">Symbol</th>
                                <th className="text-left p-4 text-text-secondary font-medium">Entry Price</th>
                                <th className="text-left p-4 text-text-secondary font-medium">Current Price</th>
                                <th className="text-left p-4 text-text-secondary font-medium">Size (%)</th>
                                <th className="text-left p-4 text-text-secondary font-medium">P&L (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedStrategy.positions.map((position, index) => (
                                <tr key={index} className="border-t border-glass-border">
                                  <td className="p-4">
                                    <span className="font-medium text-text-primary">{position.symbol}</span>
                                  </td>
                                  <td className="p-4 text-text-secondary data-font">
                                    ${position.entry.toFixed(2)}
                                  </td>
                                  <td className="p-4 text-text-secondary data-font">
                                    ${position.current.toFixed(2)}
                                  </td>
                                  <td className="p-4 text-text-secondary">
                                    {position.size}%
                                  </td>
                                  <td className="p-4">
                                    <span className={`font-medium ${getPerformanceColor(position.pnl)}`}>
                                      {position.pnl > 0 ? '+' : ''}{position.pnl}%
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Recent Updates */}
                    <div className="mb-6">
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                        Recent Updates
                      </h3>
                      <div className="space-y-3">
                        {selectedStrategy.recentUpdates.map((update, index) => (
                          <div key={index} className="glass-card p-4 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-text-primary">{update.action}</span>
                                  <span className="text-xs text-text-secondary">{update.date}</span>
                                </div>
                                <p className="text-sm text-text-secondary">{update.details}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleFollowStrategy(selectedStrategy.id)}
                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                          followedStrategies.includes(selectedStrategy.id)
                            ? 'bg-success text-white' :'glass-card text-text-primary hover:bg-surface/50'
                        }`}
                      >
                        <Icon 
                          name={followedStrategies.includes(selectedStrategy.id) ? "Heart" : "HeartOff"} 
                          size={16} 
                          className="inline mr-2" 
                        />
                        {followedStrategies.includes(selectedStrategy.id) ? 'Following' : 'Follow Strategy'}
                      </button>
                      <button
                        onClick={() => handleCopyTrading(selectedStrategy)}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        <Icon name="Copy" size={16} className="inline mr-2" />
                        Enable Copy Trading
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Copy Trading Modal */}
          <AnimatePresence>
            {showCopyTrading && selectedStrategy && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setShowCopyTrading(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-2xl glass-card rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-heading font-bold text-text-primary">
                        Copy Trading Setup
                      </h2>
                      <button
                        onClick={() => setShowCopyTrading(false)}
                        className="p-2 rounded-lg glass-card hover:bg-surface/50 transition-colors"
                      >
                        <Icon name="X" size={20} className="text-text-secondary" />
                      </button>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={selectedStrategy.creator.avatar}
                          alt={selectedStrategy.creator.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-text-primary">{selectedStrategy.name}</h3>
                          <p className="text-sm text-text-secondary">by {selectedStrategy.creator.name}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Position Size */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Position Size (% of Portfolio)
                        </label>
                        <div className="glass-card p-4 rounded-lg">
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={copyTradingSettings.positionSize}
                            onChange={(e) => setCopyTradingSettings(prev => ({
                              ...prev,
                              positionSize: parseInt(e.target.value)
                            }))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-text-secondary mt-2">
                            <span>1%</span>
                            <span className="font-medium text-primary">
                              {copyTradingSettings.positionSize}%
                            </span>
                            <span>50%</span>
                          </div>
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Risk Management
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['conservative', 'medium', 'aggressive'].map((risk) => (
                            <button
                              key={risk}
                              onClick={() => setCopyTradingSettings(prev => ({
                                ...prev,
                                riskLevel: risk
                              }))}
                              className={`p-3 rounded-lg font-medium transition-colors capitalize ${
                                copyTradingSettings.riskLevel === risk
                                  ? 'bg-primary text-white' :'glass-card text-text-secondary hover:text-text-primary'
                              }`}
                            >
                              {risk}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Auto Follow */}
                      <div className="glass-card p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-text-primary">Auto-Follow New Positions</h4>
                            <p className="text-sm text-text-secondary">
                              Automatically copy new positions as they're added
                            </p>
                          </div>
                          <button
                            onClick={() => setCopyTradingSettings(prev => ({
                              ...prev,
                              autoFollow: !prev.autoFollow
                            }))}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              copyTradingSettings.autoFollow ? 'bg-primary' : 'bg-surface'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              copyTradingSettings.autoFollow ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="glass-card p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-medium text-text-primary mb-2">Copy Trading Summary</h4>
                        <div className="space-y-1 text-sm text-text-secondary">
                          <div>Position Size: {copyTradingSettings.positionSize}% of portfolio</div>
                          <div>Risk Level: {copyTradingSettings.riskLevel}</div>
                          <div>Auto-Follow: {copyTradingSettings.autoFollow ? 'Enabled' : 'Disabled'}</div>
                          <div>Minimum Investment: ${selectedStrategy.minInvestment.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={() => setShowCopyTrading(false)}
                        className="flex-1 glass-card text-text-primary py-3 px-6 rounded-lg font-medium hover:bg-surface/50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setShowCopyTrading(false);
                          setSelectedStrategy(null);
                          // Handle copy trading activation
                        }}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Start Copy Trading
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PremiumStrategyHub;