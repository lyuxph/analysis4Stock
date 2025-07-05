import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SubscriptionSettings = ({ userData, onDataChange }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Basic portfolio tracking',
        'Public forum access',
        'Limited market data',
        'Basic charts and analytics',
        'Community discussions'
      ],
      limitations: [
        'No premium strategies',
        'Limited historical data',
        'Basic technical indicators only'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 29 : 290,
      originalPrice: billingCycle === 'monthly' ? 29 : 348,
      features: [
        'Advanced portfolio analytics',
        'Premium strategy hub access',
        'Real-time market data',
        'Advanced technical indicators',
        'Priority customer support',
        'Export capabilities',
        'Custom alerts and notifications',
        'Exclusive investment insights'
      ],
      popular: true
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 99 : 990,
      originalPrice: billingCycle === 'monthly' ? 99 : 1188,
      features: [
        'Everything in Premium',
        'API access for data integration',
        'Advanced backtesting tools',
        'Institutional-grade analytics',
        'White-label solutions',
        'Dedicated account manager',
        'Custom reporting tools',
        'Priority feature requests'
      ]
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 29.00,
      plan: 'Premium Monthly',
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 29.00,
      plan: 'Premium Monthly',
      status: 'paid',
      invoice: 'INV-2023-012'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 29.00,
      plan: 'Premium Monthly',
      status: 'paid',
      invoice: 'INV-2023-011'
    }
  ];

  const handlePlanChange = (planId) => {
    onDataChange({ subscription: planId });
  };

  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    onDataChange({ subscription: 'free' });
    setShowCancelModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Status */}
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary">Current Plan</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Crown" size={20} className="text-warning" />
            <span className="text-sm font-medium text-text-primary capitalize">
              {userData.subscription} Plan
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-text-primary capitalize">
                {userData.subscription} Subscription
              </h4>
              <p className="text-text-secondary">
                {userData.subscription === 'premium' ? 'Full access to premium features' : 'Basic features included'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${userData.subscription === 'premium' ? '29' : '0'}
                <span className="text-sm text-text-secondary">/month</span>
              </div>
              <div className="text-sm text-text-secondary">
                Next billing: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            {userData.subscription === 'premium' && (
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors"
              >
                Cancel Subscription
              </button>
            )}
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Billing Cycle</h3>
        
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              billingCycle === 'monthly' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
              billingCycle === 'yearly' ?'bg-primary text-white' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Yearly
            <span className="absolute -top-2 -right-2 bg-success text-white text-xs px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Available Plans */}
      <div className="space-y-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary">Available Plans</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`glass-card p-6 rounded-lg relative ${
                plan.popular ? 'border-2 border-primary' : ''
              } ${userData.subscription === plan.id ? 'bg-primary/5' : ''}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-text-primary mb-2">{plan.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-text-primary">${plan.price}</span>
                  <span className="text-text-secondary">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {plan.originalPrice && plan.originalPrice > plan.price && (
                    <div className="text-sm text-text-secondary line-through">
                      ${plan.originalPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
                {plan.limitations && plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="X" size={16} className="text-error" />
                    <span className="text-sm text-text-secondary">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePlanChange(plan.id)}
                disabled={userData.subscription === plan.id}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  userData.subscription === plan.id
                    ? 'bg-surface text-text-secondary cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90' :'bg-primary text-white hover:bg-primary/80'
                }`}
              >
                {userData.subscription === plan.id ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">Billing History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="text-left py-3 text-sm font-medium text-text-secondary">Date</th>
                <th className="text-left py-3 text-sm font-medium text-text-secondary">Plan</th>
                <th className="text-left py-3 text-sm font-medium text-text-secondary">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-text-secondary">Status</th>
                <th className="text-left py-3 text-sm font-medium text-text-secondary">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill.id} className="border-b border-glass-border/50">
                  <td className="py-4 text-text-primary">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-text-primary">{bill.plan}</td>
                  <td className="py-4 text-text-primary">${bill.amount.toFixed(2)}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === 'paid' ?'bg-success/20 text-success' :'bg-error/20 text-error'
                    }`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-primary hover:text-primary/80 text-sm">
                      {bill.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-1000 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-lg max-w-md w-full"
          >
            <div className="text-center mb-6">
              <Icon name="AlertTriangle" size={48} className="text-warning mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Cancel Subscription</h3>
              <p className="text-text-secondary">
                Are you sure you want to cancel your premium subscription? You'll lose access to premium features at the end of your current billing period.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={confirmCancellation}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-error/80 transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSettings;