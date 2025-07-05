import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginRegistration from "pages/login-registration";
import PortfolioDashboard from "pages/portfolio-dashboard";
import StockDetailAnalysis from "pages/stock-detail-analysis";
import CommunityInvestmentForum from "pages/community-investment-forum";
import PremiumStrategyHub from "pages/premium-strategy-hub";
import UserProfileSettings from "pages/user-profile-settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-registration" element={<LoginRegistration />} />
          <Route path="/portfolio-dashboard" element={<PortfolioDashboard />} />
          <Route path="/stock-detail-analysis" element={<StockDetailAnalysis />} />
          <Route path="/community-investment-forum" element={<CommunityInvestmentForum />} />
          <Route path="/premium-strategy-hub" element={<PremiumStrategyHub />} />
          <Route path="/user-profile-settings" element={<UserProfileSettings />} />
          <Route path="/" element={<LoginRegistration />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;