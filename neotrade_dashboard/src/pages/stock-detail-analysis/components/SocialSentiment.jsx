import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SocialSentiment = ({ symbol }) => {
  const [sentimentData, setSentimentData] = useState(null);
  const [timeframe, setTimeframe] = useState('24h');

  // Mock sentiment data
  const mockSentimentData = {
    'AAPL': {
      overall: 'bullish',
      score: 78,
      change: 5,
      mentions: 2847,
      breakdown: {
        bullish: 65,
        neutral: 23,
        bearish: 12
      },
      trending: [
        { keyword: 'iPhone 15', mentions: 892, sentiment: 'positive' },
        { keyword: 'Vision Pro', mentions: 654, sentiment: 'positive' },
        { keyword: 'AI features', mentions: 432, sentiment: 'positive' },
        { keyword: 'EU regulation', mentions: 298, sentiment: 'negative' }
      ],
      sources: {
        reddit: 45,
        twitter: 35,
        forums: 20
      }
    },
    'TSLA': {
      overall: 'bullish',
      score: 72,
      change: -3,
      mentions: 3421,
      breakdown: {
        bullish: 58,
        neutral: 28,
        bearish: 14
      },
      trending: [
        { keyword: 'Cybertruck', mentions: 1205, sentiment: 'positive' },
        { keyword: 'FSD Beta', mentions: 876, sentiment: 'mixed' },
        { keyword: 'Gigafactory', mentions: 543, sentiment: 'positive' }
      ],
      sources: {
        reddit: 40,
        twitter: 45,
        forums: 15
      }
    },
    'GOOGL': {
      overall: 'neutral',
      score: 62,
      change: 2,
      mentions: 1654,
      breakdown: {
        bullish: 48,
        neutral: 35,
        bearish: 17
      },
      trending: [
        { keyword: 'Bard AI', mentions: 567, sentiment: 'positive' },
        { keyword: 'Cloud growth', mentions: 432, sentiment: 'positive' },
        { keyword: 'Antitrust', mentions: 298, sentiment: 'negative' }
      ],
      sources: {
        reddit: 35,
        twitter: 40,
        forums: 25
      }
    }
  };

  useEffect(() => {
    setSentimentData(mockSentimentData[symbol] || null);
  }, [symbol]);

  if (!sentimentData) {
    return (
      <div className="glass-card rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Social Sentiment
        </h3>
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={32} className="text-text-secondary mx-auto mb-2" />
          <p className="text-text-secondary">No sentiment data available</p>
        </div>
      </div>
    );
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'bullish': return 'text-success';
      case 'bearish': return 'text-error';
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'mixed': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getSentimentBg = (sentiment) => {
    switch (sentiment) {
      case 'bullish': return 'bg-success';
      case 'bearish': return 'bg-error';
      case 'positive': return 'bg-success';
      case 'negative': return 'bg-error';
      case 'mixed': return 'bg-warning';
      default: return 'bg-text-secondary';
    }
  };

  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Social Sentiment
        </h3>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-surface border border-glass-border rounded px-2 py-1 text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="1h">1H</option>
          <option value="24h">24H</option>
          <option value="7d">7D</option>
        </select>
      </div>

      {/* Overall Sentiment */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-text-secondary">Overall Sentiment</div>
            <div className={`text-xl font-bold capitalize ${getSentimentColor(sentimentData.overall)}`}>
              {sentimentData.overall}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text-primary">
              {sentimentData.score}
            </div>
            <div className={`text-sm flex items-center ${
              sentimentData.change >= 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={sentimentData.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
                className="mr-1" 
              />
              {sentimentData.change >= 0 ? '+' : ''}{sentimentData.change}
            </div>
          </div>
        </div>
        
        {/* Sentiment Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Bullish</span>
            <span>Neutral</span>
            <span>Bearish</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 flex overflow-hidden">
            <div 
              className="bg-success h-full" 
              style={{ width: `${sentimentData.breakdown.bullish}%` }}
            ></div>
            <div 
              className="bg-text-secondary h-full" 
              style={{ width: `${sentimentData.breakdown.neutral}%` }}
            ></div>
            <div 
              className="bg-error h-full" 
              style={{ width: `${sentimentData.breakdown.bearish}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-success">{sentimentData.breakdown.bullish}%</span>
            <span className="text-text-secondary">{sentimentData.breakdown.neutral}%</span>
            <span className="text-error">{sentimentData.breakdown.bearish}%</span>
          </div>
        </div>
      </div>

      {/* Mentions Count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">Total Mentions</span>
        </div>
        <span className="text-lg font-semibold text-text-primary">
          {sentimentData.mentions.toLocaleString()}
        </span>
      </div>

      {/* Trending Keywords */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Trending Topics</h4>
        <div className="space-y-2">
          {sentimentData.trending.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getSentimentBg(item.sentiment)}`}></div>
                <span className="text-sm text-text-primary">{item.keyword}</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-secondary">
                  {item.mentions} mentions
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="border-t border-glass-border pt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Sources</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Icon name="MessageSquare" size={16} className="text-text-secondary mx-auto mb-1" />
            <div className="text-xs text-text-secondary">Reddit</div>
            <div className="text-sm font-medium text-text-primary">{sentimentData.sources.reddit}%</div>
          </div>
          <div>
            <Icon name="Hash" size={16} className="text-text-secondary mx-auto mb-1" />
            <div className="text-xs text-text-secondary">Twitter</div>
            <div className="text-sm font-medium text-text-primary">{sentimentData.sources.twitter}%</div>
          </div>
          <div>
            <Icon name="Users" size={16} className="text-text-secondary mx-auto mb-1" />
            <div className="text-xs text-text-secondary">Forums</div>
            <div className="text-sm font-medium text-text-primary">{sentimentData.sources.forums}%</div>
          </div>
        </div>
      </div>

      {/* Community Link */}
      <div className="mt-4 pt-4 border-t border-glass-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors">
          Join Discussion in Community Forum
        </button>
      </div>
    </div>
  );
};

export default SocialSentiment;