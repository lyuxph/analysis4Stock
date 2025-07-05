import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';

const PriceChart = ({ symbol, timeframe, activeIndicators, isLoading }) => {
  const [chartData, setChartData] = useState([]);
  const [showVolume, setShowVolume] = useState(false);
  const [crosshairData, setCrosshairData] = useState(null);

  // Mock chart data generation
  useEffect(() => {
    const generateChartData = () => {
      const dataPoints = timeframe === '1D' ? 24 : timeframe === '5D' ? 120 : 
                         timeframe === '1M' ? 30 : timeframe === '6M' ? 180 : 
                         timeframe === '1Y' ? 365 : 1825;
      
      const basePrice = symbol === 'AAPL' ? 189.25 : symbol === 'TSLA' ? 248.50 : 142.85;
      const data = [];
      
      for (let i = 0; i < dataPoints; i++) {
        const date = new Date();
        if (timeframe === '1D') {
          date.setHours(date.getHours() - (dataPoints - i));
        } else {
          date.setDate(date.getDate() - (dataPoints - i));
        }
        
        const volatility = 0.02;
        const trend = Math.sin(i / 10) * 0.01;
        const randomChange = (Math.random() - 0.5) * volatility;
        const price = basePrice * (1 + trend + randomChange);
        
        data.push({
          date: date.toISOString(),
          time: timeframe === '1D' ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 
                date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: parseFloat(price.toFixed(2)),
          volume: Math.floor(Math.random() * 10000000) + 1000000,
          macd: Math.sin(i / 15) * 2,
          rsi: 30 + Math.sin(i / 8) * 40,
          sma20: price * (1 + Math.sin(i / 20) * 0.005),
          sma50: price * (1 + Math.sin(i / 50) * 0.003)
        });
      }
      
      return data;
    };

    setChartData(generateChartData());
  }, [symbol, timeframe]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 rounded-lg border border-glass-border">
          <p className="text-text-primary font-medium">{label}</p>
          <p className="text-text-primary">
            Price: <span className="font-semibold">${data.price}</span>
          </p>
          <p className="text-text-secondary text-sm">
            Volume: {(data.volume / 1000000).toFixed(1)}M
          </p>
          {activeIndicators.includes('MACD') && (
            <p className="text-secondary text-sm">
              MACD: {data.macd.toFixed(2)}
            </p>
          )}
          {activeIndicators.includes('RSI') && (
            <p className="text-accent text-sm">
              RSI: {data.rsi.toFixed(1)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const priceChange = chartData.length > 1 ? 
    ((currentPrice - chartData[0].price) / chartData[0].price) * 100 : 0;

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-text-secondary">Loading chart data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
              showVolume ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="BarChart3" size={16} />
            <span>Volume</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-text-secondary">Indicators:</span>
            {['MACD', 'RSI', 'SMA'].map((indicator) => (
              <button
                key={indicator}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  activeIndicators.includes(indicator)
                    ? 'bg-secondary text-white' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {indicator}
              </button>
            ))}
          </div>
        </div>

        <div className="text-right">
          <div className={`text-sm font-medium ${priceChange >= 0 ? 'text-success' : 'text-error'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </div>
          <div className="text-xs text-text-secondary">
            {timeframe} change
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              domain={['dataMin - 1', 'dataMax + 1']}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Price Line */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#0066FF"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#0066FF' }}
            />
            
            {/* Moving Averages */}
            {activeIndicators.includes('SMA') && (
              <>
                <Line
                  type="monotone"
                  dataKey="sma20"
                  stroke="#10B981"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="sma50"
                  stroke="#8B5CF6"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </>
            )}
            
            {/* Current Price Reference Line */}
            <ReferenceLine 
              y={currentPrice} 
              stroke="#F59E0B" 
              strokeDasharray="2 2"
              strokeWidth={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Technical Indicators Charts */}
      {activeIndicators.includes('MACD') && (
        <div className="h-24 border-t border-glass-border pt-4">
          <div className="text-xs text-text-secondary mb-2">MACD</div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="macd"
                stroke="#8B5CF6"
                strokeWidth={1}
                dot={false}
              />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeIndicators.includes('RSI') && (
        <div className="h-24 border-t border-glass-border pt-4">
          <div className="text-xs text-text-secondary mb-2">RSI</div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={[0, 100]} />
              <Line
                type="monotone"
                dataKey="rsi"
                stroke="#10B981"
                strokeWidth={1}
                dot={false}
              />
              <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="2 2" />
              <ReferenceLine y={30} stroke="#EF4444" strokeDasharray="2 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-primary"></div>
          <span className="text-text-secondary">Price</span>
        </div>
        {activeIndicators.includes('SMA') && (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-accent" style={{ backgroundImage: 'repeating-linear-gradient(to right, #10B981 0, #10B981 3px, transparent 3px, transparent 6px)' }}></div>
              <span className="text-text-secondary">SMA 20</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-secondary" style={{ backgroundImage: 'repeating-linear-gradient(to right, #8B5CF6 0, #8B5CF6 3px, transparent 3px, transparent 6px)' }}></div>
              <span className="text-text-secondary">SMA 50</span>
            </div>
          </>
        )}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-warning" style={{ backgroundImage: 'repeating-linear-gradient(to right, #F59E0B 0, #F59E0B 2px, transparent 2px, transparent 4px)' }}></div>
          <span className="text-text-secondary">Current</span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;