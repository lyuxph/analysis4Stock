// src/pages/login-registration/components/RiskProfileSurvey.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RiskProfileSurvey = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const surveyQuestions = [
    {
      id: 'risk_tolerance',
      question: 'How do you feel about investment risk?',
      description: 'This helps us understand your comfort level with potential losses',
      type: 'single',
      options: [
        {
          value: 'low',
          label: 'Low Risk',
          description: 'I prefer stable returns and want to minimize losses',
          icon: 'Shield',
          color: 'text-success'
        },
        {
          value: 'medium',
          label: 'Medium Risk',
          description: 'I can accept some volatility for potentially higher returns',
          icon: 'TrendingUp',
          color: 'text-primary'
        },
        {
          value: 'high',
          label: 'High Risk',
          description: 'I am comfortable with significant volatility for maximum growth potential',
          icon: 'Zap',
          color: 'text-warning'
        }
      ]
    },
    {
      id: 'investment_duration',
      question: 'What is your typical investment time horizon?',
      description: 'This helps us tailor strategies to your investment timeline',
      type: 'single',
      options: [
        {
          value: 'short',
          label: 'Short-term (< 2 years)',
          description: 'Quick returns and high liquidity',
          icon: 'Clock',
          color: 'text-accent'
        },
        {
          value: 'medium',
          label: 'Medium-term (2-10 years)',
          description: 'Balanced growth with moderate flexibility',
          icon: 'Calendar',
          color: 'text-primary'
        },
        {
          value: 'long',
          label: 'Long-term (10+ years)',
          description: 'Maximum growth potential with time to ride out volatility',
          icon: 'Target',
          color: 'text-success'
        }
      ]
    },
    {
      id: 'loss_reaction',
      question: 'If your portfolio lost 20% in a month, what would you do?',
      description: 'This reveals your emotional response to market volatility',
      type: 'single',
      options: [
        {
          value: 'sell_all',
          label: 'Sell everything immediately',
          description: 'Cut losses and move to safer investments',
          icon: 'AlertTriangle',
          color: 'text-error'
        },
        {
          value: 'sell_some',
          label: 'Sell some positions',
          description: 'Reduce exposure but maintain some investments',
          icon: 'Minus',
          color: 'text-warning'
        },
        {
          value: 'hold',
          label: 'Hold and wait',
          description: 'Stay the course and wait for recovery',
          icon: 'Pause',
          color: 'text-primary'
        },
        {
          value: 'buy_more',
          label: 'Buy more at lower prices',
          description: 'See it as an opportunity to buy at discount',
          icon: 'Plus',
          color: 'text-success'
        }
      ]
    },
    {
      id: 'investment_goals',
      question: 'What are your primary investment goals?',
      description: 'Select all that apply to your investment objectives',
      type: 'multiple',
      options: [
        {
          value: 'growth',
          label: 'Capital Growth',
          description: 'Increase portfolio value over time',
          icon: 'TrendingUp'
        },
        {
          value: 'income',
          label: 'Regular Income',
          description: 'Generate steady dividends or interest',
          icon: 'DollarSign'
        },
        {
          value: 'retirement',
          label: 'Retirement Planning',
          description: 'Build wealth for future retirement',
          icon: 'Clock'
        },
        {
          value: 'preservation',
          label: 'Wealth Preservation',
          description: 'Protect existing wealth from inflation',
          icon: 'Shield'
        }
      ]
    },
    {
      id: 'experience_level',
      question: 'What is your investment experience level?',
      description: 'This helps us provide appropriate guidance and recommendations',
      type: 'single',
      options: [
        {
          value: 'beginner',
          label: 'Beginner (0-1 years)',
          description: 'New to investing, learning the basics',
          icon: 'BookOpen',
          color: 'text-accent'
        },
        {
          value: 'intermediate',
          label: 'Intermediate (1-5 years)',
          description: 'Some experience with various investment types',
          icon: 'Users',
          color: 'text-primary'
        },
        {
          value: 'advanced',
          label: 'Advanced (5+ years)',
          description: 'Experienced with complex investment strategies',
          icon: 'Award',
          color: 'text-success'
        },
        {
          value: 'professional',
          label: 'Professional',
          description: 'Work in finance or have extensive experience',
          icon: 'Briefcase',
          color: 'text-warning'
        }
      ]
    }
  ];

  const currentQuestion = surveyQuestions[currentStep];
  const isLastStep = currentStep === surveyQuestions.length - 1;
  const canProceed = answers[currentQuestion?.id] !== undefined;

  const handleAnswerSelect = (questionId, value) => {
    if (currentQuestion.type === 'multiple') {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value];
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const calculateRiskProfile = () => {
    let riskScore = 0;
    let durationScore = 0;

    // Risk tolerance scoring
    switch (answers.risk_tolerance) {
      case 'low': riskScore += 1; break;
      case 'medium': riskScore += 2; break;
      case 'high': riskScore += 3; break;
    }

    // Loss reaction scoring
    switch (answers.loss_reaction) {
      case 'sell_all': riskScore += 1; break;
      case 'sell_some': riskScore += 2; break;
      case 'hold': riskScore += 3; break;
      case 'buy_more': riskScore += 4; break;
    }

    // Duration scoring
    switch (answers.investment_duration) {
      case 'short': durationScore = 1; break;
      case 'medium': durationScore = 2; break;
      case 'long': durationScore = 3; break;
    }

    // Final risk profile calculation
    const avgRiskScore = riskScore / 2;
    let finalRiskProfile;
    
    if (avgRiskScore <= 1.5) {
      finalRiskProfile = 'conservative';
    } else if (avgRiskScore <= 2.5) {
      finalRiskProfile = 'moderate';
    } else {
      finalRiskProfile = 'aggressive';
    }

    let finalDuration;
    if (durationScore === 1) finalDuration = 'short-term';
    else if (durationScore === 2) finalDuration = 'medium-term';
    else finalDuration = 'long-term';

    return {
      riskTolerance: finalRiskProfile,
      timeHorizon: finalDuration,
      investmentGoals: answers.investment_goals || ['growth'],
      experienceLevel: answers.experience_level || 'beginner',
      rawAnswers: answers
    };
  };

  const handleNext = () => {
    if (isLastStep) {
      setIsLoading(true);
      const profile = calculateRiskProfile();
      setTimeout(() => {
        onComplete(profile);
        setIsLoading(false);
      }, 1500);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const progressPercentage = ((currentStep + 1) / surveyQuestions.length) * 100;

  if (isLoading) {
    return (
      <div className="space-y-8 text-center">
        <div className="glass-card p-8 rounded-2xl">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary mb-2">Analyzing Your Profile</h3>
          <p className="text-text-secondary">We're creating your personalized investment profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-text-secondary">
          <span>Question {currentStep + 1} of {surveyQuestions.length}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-surface/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card p-8 rounded-2xl animate-fade-in-up">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {currentQuestion?.question}
          </h2>
          <p className="text-text-secondary">
            {currentQuestion?.description}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {currentQuestion?.options?.map((option) => {
            const isSelected = currentQuestion.type === 'multiple'
              ? (answers[currentQuestion.id] || []).includes(option.value)
              : answers[currentQuestion.id] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                className={`w-full p-4 rounded-lg border text-left transition-all duration-200 hover:scale-[1.02] ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-lg'
                    : 'border-glass-border bg-surface/30 text-text-secondary hover:border-primary/50 hover:bg-surface/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/20' : 'bg-surface/50'}`}>
                    <Icon 
                      name={option.icon} 
                      size={24} 
                      className={option.color || (isSelected ? 'text-primary' : 'text-text-secondary')} 
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{option.label}</h3>
                    <p className="text-sm opacity-75">{option.description}</p>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-6 py-3 glass-card text-text-primary rounded-lg hover:bg-surface/50 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>{currentStep === 0 ? 'Back to Form' : 'Previous'}</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span>{isLastStep ? 'Complete Profile' : 'Next'}</span>
          <Icon name={isLastStep ? 'Check' : 'ArrowRight'} size={20} />
        </button>
      </div>
    </div>
  );
};

export default RiskProfileSurvey;