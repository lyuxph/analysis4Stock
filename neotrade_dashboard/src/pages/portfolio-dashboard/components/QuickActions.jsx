import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();
  const [showAddPosition, setShowAddPosition] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickActionItems = [
    {
      id: 'add-position',
      label: 'Add Position',
      icon: 'Plus',
      color: 'from-primary to-secondary',
      action: () => setShowAddPosition(true)
    },
    {
      id: 'market-analysis',
      label: 'Market Analysis',
      icon: 'BarChart3',
      color: 'from-secondary to-accent',
      action: () => navigate('/stock-detail-analysis')
    },
    {
      id: 'community',
      label: 'Community',
      icon: 'Users',
      color: 'from-accent to-primary',
      action: () => navigate('/community-investment-forum')
    },
    {
      id: 'strategies',
      label: 'Strategies',
      icon: 'Target',
      color: 'from-warning to-error',
      action: () => navigate('/premium-strategy-hub')
    }
  ];

  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 152.75 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.60 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 298.75 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2785.30 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3245.80 }
  ];

  const filteredStocks = popularStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPosition = (stock) => {
    console.log('Adding position for:', stock.symbol);
    setShowAddPosition(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-24 lg:bottom-8 right-4 z-50">
        <button
          onClick={() => setShowAddPosition(true)}
          className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-strong flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
        >
          <Icon name="Plus" size={24} color="white" className="group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="group relative overflow-hidden rounded-lg p-4 glass-card hover:scale-105 transition-all duration-200"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <Icon name={item.icon} size={20} color="white" />
                </div>
                <span className="text-sm font-medium text-text-primary text-center">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Position Modal */}
      {showAddPosition && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-card rounded-xl shadow-strong animate-scale-in">
            <div className="p-6 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-text-primary">
                  Add New Position
                </h3>
                <button
                  onClick={() => setShowAddPosition(false)}
                  className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Search Input */}
              <div className="relative mb-4">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-glass-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>

              {/* Stock List */}
              <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
                {filteredStocks.map((stock) => (
                  <button
                    key={stock.symbol}
                    onClick={() => handleAddPosition(stock)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface/50 transition-colors text-left"
                  >
                    <div>
                      <div className="font-semibold text-text-primary">{stock.symbol}</div>
                      <div className="text-sm text-text-secondary truncate">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-text-primary">
                        ${stock.price.toFixed(2)}
                      </div>
                      <Icon name="Plus" size={16} className="text-primary ml-auto" />
                    </div>
                  </button>
                ))}
              </div>

              {filteredStocks.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-2" />
                  <p className="text-text-secondary">No stocks found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showAddPosition && (
        <div
          className="fixed inset-0 z-999"
          onClick={() => setShowAddPosition(false)}
        />
      )}
    </>
  );
};

export default QuickActions;