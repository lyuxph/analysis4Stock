// src/pages/portfolio-dashboard/components/PortfolioPieChart.jsx
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const PortfolioPieChart = ({ stockPositions, portfolioSummary }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [viewMode, setViewMode] = useState('value'); // 'value' or 'allocation'

  // Prepare data for the pie chart
  const prepareChartData = () => {
    if (!stockPositions?.length) return [];

    return stockPositions.map((stock, index) => {
      const totalValue = stock.shares * stock.currentPrice;
      const allocation = portfolioSummary?.totalValue > 0 
        ? (totalValue / portfolioSummary.totalValue) * 100 
        : 0;

      return {
        name: stock.symbol,
        companyName: stock.companyName,
        value: viewMode === 'value' ? totalValue : allocation,
        displayValue: viewMode === 'value' 
          ? `$${totalValue.toLocaleString()}` 
          : `${allocation.toFixed(1)}%`,
        shares: stock.shares,
        currentPrice: stock.currentPrice,
        totalPL: stock.totalPL,
        totalReturn: stock.totalReturn,
        color: CHART_COLORS[index % CHART_COLORS.length],
        allocation: allocation
      };
    }).sort((a, b) => (viewMode === 'value' ? b.value - a.value : b.allocation - a.allocation));
  };

  // Custom colors for the pie chart
  const CHART_COLORS = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280'  // Gray
  ];

  const chartData = prepareChartData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-4 rounded-lg shadow-strong border border-glass-border">
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: data.color }}
            />
            <div>
              <h4 className="font-semibold text-text-primary">{data.name}</h4>
              <p className="text-sm text-text-secondary">{data.companyName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-text-secondary">Shares</p>
              <p className="font-medium text-text-primary">{data.shares}</p>
            </div>
            <div>
              <p className="text-text-secondary">Price</p>
              <p className="font-medium text-text-primary">${data.currentPrice}</p>
            </div>
            <div>
              <p className="text-text-secondary">Value</p>
              <p className="font-medium text-text-primary">
                ${(data.shares * data.currentPrice).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-text-secondary">Allocation</p>
              <p className="font-medium text-text-primary">{data.allocation.toFixed(1)}%</p>
            </div>
            <div className="col-span-2">
              <p className="text-text-secondary">Total P&L</p>
              <p className={`font-medium ${
                data.totalPL >= 0 ? 'text-success' : 'text-error'
              }`}>
                ${data.totalPL > 0 ? '+' : ''}${data.totalPL.toLocaleString()} ({data.totalReturn > 0 ? '+' : ''}{data.totalReturn}%)
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom label for pie slices
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (percent < 0.05) return null; // Don't show labels for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Handle pie slice hover
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  if (!chartData.length) {
    return (
      <div className="glass-card p-6 rounded-lg">
        <div className="text-center py-12">
          <Icon name="PieChart" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Portfolio Data</h3>
          <p className="text-text-secondary">Add some investments to see your portfolio allocation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Portfolio Allocation
          </h3>
          <p className="text-text-secondary text-sm">
            Visual breakdown of your investment holdings
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex bg-surface/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode('value')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
              viewMode === 'value' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Value
          </button>
          <button
            onClick={() => setViewMode('allocation')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
              viewMode === 'allocation' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            %
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={120}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={activeIndex === index ? '#ffffff' : 'none'}
                      strokeWidth={activeIndex === index ? 2 : 0}
                      style={{
                        filter: activeIndex === index ? 'brightness(1.1)' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend/List */}
        <div className="space-y-2">
          <h4 className="font-medium text-text-primary mb-4">Holdings</h4>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {chartData.map((item, index) => (
              <div 
                key={item.name}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  activeIndex === index
                    ? 'border-primary bg-primary/5' :'border-glass-border bg-surface/30 hover:border-primary/50'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <h5 className="font-medium text-text-primary text-sm">{item.name}</h5>
                      <p className="text-xs text-text-secondary">{item.shares} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-text-primary text-sm">
                      {item.displayValue}
                    </p>
                    <p className={`text-xs ${
                      item.totalPL >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {item.totalReturn > 0 ? '+' : ''}{item.totalReturn}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPieChart;