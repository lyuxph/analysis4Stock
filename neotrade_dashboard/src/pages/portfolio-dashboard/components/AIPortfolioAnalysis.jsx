// src/pages/portfolio-dashboard/components/AIPortfolioAnalysis.jsx
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { generatePortfolioAnalysis, getMarketSentimentAnalysis } from '../../../services/portfolioAnalysisService';

const AIPortfolioAnalysis = ({ portfolioData, stockPositions, userProfile }) => {
  const [analysis, setAnalysis] = useState(null);
  const [marketSentiment, setMarketSentiment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('analysis');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock user profile if not provided
  const defaultUserProfile = {
    riskTolerance: 'moderate',
    timeHorizon: 'long-term',
    investmentGoals: ['growth', 'income'],
    tradingStyle: 'buy-hold',
    preferredSectors: ['technology', 'healthcare'],
    experienceLevel: 'intermediate'
  };

  const currentUserProfile = userProfile || defaultUserProfile;

  const generateAnalysis = async () => {
    if (!portfolioData || !stockPositions?.length) {
      setError('Insufficient portfolio data for analysis');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare portfolio data for analysis
      const portfolioForAnalysis = {
        ...portfolioData,
        positions: stockPositions
      };

      // Get portfolio analysis
      const analysisResult = await generatePortfolioAnalysis(
        portfolioForAnalysis, 
        currentUserProfile
      );
      setAnalysis(analysisResult);

      // Get market sentiment for user's preferred sectors
      const sectors = currentUserProfile.preferredSectors || ['technology', 'healthcare'];
      const sentimentResult = await getMarketSentimentAnalysis(sectors);
      setMarketSentiment(sentimentResult);

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Analysis generation error:', err);
      setError(err.message || 'Failed to generate analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-generate analysis when component mounts or data changes
    if (portfolioData && stockPositions?.length > 0) {
      generateAnalysis();
    }
  }, [portfolioData, stockPositions]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-primary';
    if (score >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-surface/30 text-text-secondary border-glass-border';
    }
  };

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'buy': return 'TrendingUp';
      case 'sell': return 'TrendingDown';
      case 'hold': return 'Pause';
      case 'reduce': return 'Minus';
      case 'increase': return 'Plus';
      default: return 'AlertCircle';
    }
  };

  const renderLoadingState = () => (
    <div className="glass-card p-8 rounded-lg text-center">
      <Icon name="Brain" size={48} className="animate-pulse text-primary mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        AI Analyzing Your Portfolio
      </h3>
      <p className="text-text-secondary mb-4">
        Our AI is analyzing market conditions, your risk profile, and portfolio composition...
      </p>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="glass-card p-8 rounded-lg text-center">
      <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Analysis Unavailable
      </h3>
      <p className="text-text-secondary mb-4">{error}</p>
      <button
        onClick={generateAnalysis}
        className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </div>
  );

  if (isLoading) return renderLoadingState();
  if (error && !analysis) return renderErrorState();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Icon name="Brain" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                AI Portfolio Analysis
              </h2>
              <p className="text-text-secondary text-sm">
                Machine learning insights based on your risk profile
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {lastUpdated && (
              <div className="text-xs text-text-secondary">
                Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            <button
              onClick={generateAnalysis}
              disabled={isLoading}
              className="p-2 glass-card rounded-lg hover:bg-surface/50 transition-colors disabled:opacity-50"
            >
              <Icon 
                name="RefreshCw" 
                size={16} 
                className={`text-text-secondary ${isLoading ? 'animate-spin' : ''}`} 
              />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-surface/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'analysis' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Portfolio Analysis
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'market' ?'bg-primary text-white shadow-sm' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Market Sentiment
          </button>
        </div>
      </div>

      {/* Portfolio Analysis Tab */}
      {activeTab === 'analysis' && analysis && (
        <div className="space-y-6">
          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-lg text-center">
              <div className="mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                  {analysis.overall_score}/100
                </div>
                <div className="text-text-secondary text-sm">Overall Score</div>
              </div>
              <div className="w-full bg-surface/50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getScoreBackground(analysis.overall_score)}`}
                  style={{ width: `${analysis.overall_score}%` }}
                />
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg text-center">
              <div className="mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.diversification_score)}`}>
                  {analysis.diversification_score}/100
                </div>
                <div className="text-text-secondary text-sm">Diversification</div>
              </div>
              <div className="w-full bg-surface/50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getScoreBackground(analysis.diversification_score)}`}
                  style={{ width: `${analysis.diversification_score}%` }}
                />
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg text-center">
              <div className="mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.risk_alignment_score)}`}>
                  {analysis.risk_alignment_score}/100
                </div>
                <div className="text-text-secondary text-sm">Risk Alignment</div>
              </div>
              <div className="w-full bg-surface/50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getScoreBackground(analysis.risk_alignment_score)}`}
                  style={{ width: `${analysis.risk_alignment_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Analysis Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Summary */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
                Performance Summary
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {analysis.performance_summary}
              </p>
            </div>

            {/* Risk Analysis */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Shield" size={20} className="mr-2 text-warning" />
                Risk Analysis
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {analysis.risk_analysis}
              </p>
            </div>

            {/* Diversification Analysis */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="PieChart" size={20} className="mr-2 text-accent" />
                Diversification
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {analysis.diversification_analysis}
              </p>
            </div>

            {/* Sector Allocation */}
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Building2" size={20} className="mr-2 text-secondary" />
                Sector Allocation
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {analysis.sector_allocation}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          {analysis.recommendations?.length > 0 && (
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
                <Icon name="Lightbulb" size={20} className="mr-2 text-primary" />
                AI Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="border border-glass-border rounded-lg p-4 bg-surface/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={getActionIcon(rec.action)} size={16} className="text-primary" />
                        <span className="font-medium text-text-primary">
                          {rec.action} {rec.symbol && `- ${rec.symbol}`}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {rec.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Risks */}
          {analysis.key_risks?.length > 0 && (
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="AlertTriangle" size={20} className="mr-2 text-error" />
                Key Risks to Monitor
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.key_risks.map((risk, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-error/5 border border-error/20 rounded-lg">
                    <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {analysis.next_steps?.length > 0 && (
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="CheckSquare" size={20} className="mr-2 text-success" />
                Recommended Next Steps
              </h3>
              <div className="space-y-3">
                {analysis.next_steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Outlook */}
          {analysis.market_outlook && (
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Globe" size={20} className="mr-2 text-accent" />
                Market Outlook
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {analysis.market_outlook}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Market Sentiment Tab */}
      {activeTab === 'market' && marketSentiment && (
        <div className="space-y-6">
          {/* Overall Market Sentiment */}
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
              Overall Market Sentiment
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {marketSentiment.overall_market_sentiment}
            </p>
          </div>

          {/* Sector Analysis */}
          {marketSentiment.sector_analysis?.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {marketSentiment.sector_analysis.map((sector, index) => (
                <div key={index} className="glass-card p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-text-primary capitalize">
                      {sector.sector}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      sector.sentiment.toLowerCase() === 'positive' ? 'bg-success/10 text-success'
                      : sector.sentiment.toLowerCase() === 'negative'? 'bg-error/10 text-error' :'bg-warning/10 text-warning'
                    }`}>
                      {sector.sentiment}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {sector.outlook}
                  </p>

                  {/* Key Drivers */}
                  {sector.key_drivers?.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-text-primary text-sm mb-2 flex items-center">
                        <Icon name="Zap" size={14} className="mr-1 text-primary" />
                        Key Drivers
                      </h5>
                      <ul className="space-y-1">
                        {sector.key_drivers.map((driver, dIndex) => (
                          <li key={dIndex} className="text-text-secondary text-xs flex items-start">
                            <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                            {driver}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Risks & Opportunities */}
                  <div className="grid grid-cols-2 gap-4">
                    {sector.risks?.length > 0 && (
                      <div>
                        <h5 className="font-medium text-error text-sm mb-2 flex items-center">
                          <Icon name="AlertTriangle" size={14} className="mr-1" />
                          Risks
                        </h5>
                        <ul className="space-y-1">
                          {sector.risks.slice(0, 2).map((risk, rIndex) => (
                            <li key={rIndex} className="text-text-secondary text-xs">
                              • {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {sector.opportunities?.length > 0 && (
                      <div>
                        <h5 className="font-medium text-success text-sm mb-2 flex items-center">
                          <Icon name="Target" size={14} className="mr-1" />
                          Opportunities
                        </h5>
                        <ul className="space-y-1">
                          {sector.opportunities.slice(0, 2).map((opp, oIndex) => (
                            <li key={oIndex} className="text-text-secondary text-xs">
                              • {opp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIPortfolioAnalysis;