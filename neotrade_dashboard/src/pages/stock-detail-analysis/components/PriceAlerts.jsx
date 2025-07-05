import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PriceAlerts = ({ stock, onClose }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'above',
      price: 195.00,
      isActive: true,
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      type: 'below',
      price: 180.00,
      isActive: true,
      createdAt: new Date(Date.now() - 172800000)
    }
  ]);
  
  const [newAlert, setNewAlert] = useState({
    type: 'above',
    price: '',
    notification: 'push'
  });

  const handleCreateAlert = () => {
    if (!newAlert.price || isNaN(newAlert.price)) return;
    
    const alert = {
      id: Date.now(),
      type: newAlert.type,
      price: parseFloat(newAlert.price),
      isActive: true,
      createdAt: new Date()
    };
    
    setAlerts(prev => [...prev, alert]);
    setNewAlert({ type: 'above', price: '', notification: 'push' });
  };

  const toggleAlert = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getAlertStatus = (alert) => {
    const currentPrice = stock.price;
    if (alert.type === 'above' && currentPrice >= alert.price) {
      return { status: 'triggered', color: 'text-warning' };
    } else if (alert.type === 'below' && currentPrice <= alert.price) {
      return { status: 'triggered', color: 'text-warning' };
    }
    return { status: 'active', color: 'text-success' };
  };

  return (
    <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-lg shadow-strong animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Price Alerts
            </h2>
            <p className="text-sm text-text-secondary">
              {stock.symbol} • Current: {formatCurrency(stock.price)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface/50 transition-colors"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Create New Alert */}
        <div className="p-6 border-b border-glass-border">
          <h3 className="text-lg font-medium text-text-primary mb-4">Create Alert</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Alert Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setNewAlert(prev => ({ ...prev, type: 'above' }))}
                  className={`p-3 rounded-lg border transition-colors ${
                    newAlert.type === 'above' ?'border-success bg-success/10 text-success' :'border-glass-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="TrendingUp" size={16} className="mx-auto mb-1" />
                  <div className="text-xs">Above</div>
                </button>
                <button
                  onClick={() => setNewAlert(prev => ({ ...prev, type: 'below' }))}
                  className={`p-3 rounded-lg border transition-colors ${
                    newAlert.type === 'below' ?'border-error bg-error/10 text-error' :'border-glass-border text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="TrendingDown" size={16} className="mx-auto mb-1" />
                  <div className="text-xs">Below</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Target Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={newAlert.price}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notification Method
              </label>
              <select
                value={newAlert.notification}
                onChange={(e) => setNewAlert(prev => ({ ...prev, notification: e.target.value }))}
                className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="push">Push Notification</option>
                <option value="email">Email</option>
                <option value="both">Push + Email</option>
              </select>
            </div>

            <button
              onClick={handleCreateAlert}
              disabled={!newAlert.price}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Alert
            </button>
          </div>
        </div>

        {/* Existing Alerts */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">
            Active Alerts ({alerts.filter(a => a.isActive).length})
          </h3>
          
          {alerts.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {alerts.map((alert) => {
                const alertStatus = getAlertStatus(alert);
                return (
                  <div key={alert.id} className="bg-surface/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={alert.type === 'above' ? 'TrendingUp' : 'TrendingDown'} 
                          size={16} 
                          className={alert.type === 'above' ? 'text-success' : 'text-error'} 
                        />
                        <div>
                          <div className="text-sm font-medium text-text-primary">
                            {alert.type === 'above' ? 'Above' : 'Below'} {formatCurrency(alert.price)}
                          </div>
                          <div className="text-xs text-text-secondary">
                            Created {alert.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`text-xs font-medium ${alertStatus.color}`}>
                          {alertStatus.status}
                        </div>
                        <button
                          onClick={() => toggleAlert(alert.id)}
                          className={`w-8 h-4 rounded-full transition-colors ${
                            alert.isActive ? 'bg-success' : 'bg-surface'
                          }`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                            alert.isActive ? 'translate-x-4' : 'translate-x-0.5'
                          }`}></div>
                        </button>
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="p-1 rounded hover:bg-error/20 transition-colors"
                        >
                          <Icon name="Trash2" size={14} className="text-error" />
                        </button>
                      </div>
                    </div>
                    
                    {alertStatus.status === 'triggered' && (
                      <div className="text-xs text-warning bg-warning/10 rounded px-2 py-1">
                        Alert triggered! Current price: {formatCurrency(stock.price)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Bell" size={32} className="text-text-secondary mx-auto mb-2" />
              <p className="text-text-secondary">No alerts set</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceAlerts;