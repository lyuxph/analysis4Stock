// src/pages/portfolio-dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';

import PortfolioSummary from './components/PortfolioSummary';
import StockPositionCard from './components/StockPositionCard';
import QuickActions from './components/QuickActions';
import MarketStatus from './components/MarketStatus';
import PortfolioPieChart from './components/PortfolioPieChart';
import AIPortfolioAnalysis from './components/AIPortfolioAnalysis';

const PortfolioDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'analysis'

  // Mock portfolio data
  const portfolioSummary = {
    totalValue: 125847.32,
    dailyPL: 2847.65,
    dailyReturn: 2.31,
    totalPL: 25847.32,
    totalReturn: 25.84
  };

  const stockPositions = [
    {
      id: 1,
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      logo: 'https://logo.clearbit.com/apple.com',
      shares: 50,
      buyPrice: 145.30,
      currentPrice: 152.75,
      dailyChange: 2.45,
      dailyChangePercent: 1.63,
      totalPL: 372.50,
      totalReturn: 5.13
    },
    {
      id: 2,
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      logo: 'https://logo.clearbit.com/tesla.com',
      shares: 25,
      buyPrice: 220.80,
      currentPrice: 245.60,
      dailyChange: -3.20,
      dailyChangePercent: -1.29,
      totalPL: 620.00,
      totalReturn: 11.23
    },
    {
      id: 3,
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      logo: 'https://logo.clearbit.com/microsoft.com',
      shares: 30,
      buyPrice: 285.40,
      currentPrice: 298.75,
      dailyChange: 4.85,
      dailyChangePercent: 1.65,
      totalPL: 400.50,
      totalReturn: 4.68
    },
    {
      id: 4,
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      logo: 'https://logo.clearbit.com/google.com',
      shares: 15,
      buyPrice: 2650.00,
      currentPrice: 2785.30,
      dailyChange: -12.45,
      dailyChangePercent: -0.44,
      totalPL: 2029.50,
      totalReturn: 5.11
    },
    {
      id: 5,
      symbol: 'AMZN',
      companyName: 'Amazon.com, Inc.',
      logo: 'https://logo.clearbit.com/amazon.com',
      shares: 20,
      buyPrice: 3180.00,
      currentPrice: 3245.80,
      dailyChange: 8.90,
      dailyChangePercent: 0.28,
      totalPL: 1316.00,
      totalReturn: 2.07
    },
    {
      id: 6,
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      logo: 'https://logo.clearbit.com/nvidia.com',
      shares: 35,
      buyPrice: 420.50,
      currentPrice: 485.20,
      dailyChange: 15.75,
      dailyChangePercent: 3.36,
      totalPL: 2264.50,
      totalReturn: 15.38
    }
  ];

  // Mock user profile (this would come from user context/state in real app)
  const userProfile = {
    riskTolerance: 'moderate',
    timeHorizon: 'long-term',
    investmentGoals: ['growth', 'income'],
    tradingStyle: 'buy-hold',
    preferredSectors: ['technology', 'healthcare', 'finance'],
    experienceLevel: 'intermediate'
  };

  const timePeriods = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '1Y', value: '1Y' }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  const handleStockClick = (stock) => {
    navigate('/stock-detail-analysis', { state: { symbol: stock.symbol } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-60 pt-20 pb-20 lg:pb-8">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                Portfolio Dashboard
              </h1>
              <p className="text-text-secondary">
                Track your investments and monitor real-time performance
              </p>
            </div>
            
            {/* View Toggle & Controls */}
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              {/* View Toggle */}
              <div className="flex bg-surface/50 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeView === 'overview' ?'bg-primary text-white shadow-lg' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon name="LayoutDashboard" size={16} className="mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveView('analysis')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeView === 'analysis' ?'bg-primary text-white shadow-lg' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon name="Brain" size={16} className="mr-2" />
                  AI Analysis
                </button>
              </div>

              {/* Time Period Selector - Only for Overview */}
              {activeView === 'overview' && (
                <div className="flex items-center space-x-2">
                  <div className="glass-card rounded-lg p-1">
                    {timePeriods.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => setSelectedPeriod(period.value)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          selectedPeriod === period.value
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 glass-card rounded-lg hover:bg-surface/50 transition-colors disabled:opacity-50"
                  >
                    <Icon 
                      name="RefreshCw" 
                      size={20} 
                      className={`text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} 
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Overview View */}
          {activeView === 'overview' && (
            <>
              {/* Market Status */}
              <MarketStatus lastUpdate={lastUpdate} />

              {/* Portfolio Summary */}
              <PortfolioSummary 
                data={portfolioSummary} 
                selectedPeriod={selectedPeriod}
                isRefreshing={isRefreshing}
              />

              {/* Portfolio Pie Chart */}
              <div className="mb-8">
                <PortfolioPieChart 
                  stockPositions={stockPositions}
                  portfolioSummary={portfolioSummary}
                />
              </div>

              {/* Stock Positions */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-text-primary">
                    Your Positions
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Clock" size={16} />
                    <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {stockPositions.map((stock) => (
                    <StockPositionCard
                      key={stock.id}
                      stock={stock}
                      onClick={() => handleStockClick(stock)}
                      isRefreshing={isRefreshing}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <QuickActions />
            </>
          )}

          {/* AI Analysis View */}
          {activeView === 'analysis' && (
            <AIPortfolioAnalysis
              portfolioData={portfolioSummary}
              stockPositions={stockPositions}
              userProfile={userProfile}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PortfolioDashboard;