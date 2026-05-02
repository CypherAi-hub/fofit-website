import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { FeaturesPage } from "../pages/FeaturesPage";
import { PricingPage } from "../pages/PricingPage";
import { InsightsPage } from "../pages/InsightsPage";
import { InsightArticlePage } from "../pages/InsightArticlePage";
import { AboutPage } from "../pages/AboutPage";
import { CommunityPage } from "../pages/CommunityPage";
import { FAQPage } from "../pages/FAQPage";
import { UpdatesPage } from "../pages/UpdatesPage";
import { CoachesPage } from "../pages/CoachesPage";
import { StorePage } from "../pages/StorePage";
import { TeamsPage } from "../pages/TeamsPage";
import { NutritionPage } from "../pages/ComingSoonPage";
import { SubmissionPreviewPage } from "../pages/SubmissionPreviewPage";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import { WelcomePage } from "../pages/WelcomePage";
import { DashboardPage } from "../pages/DashboardPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/insights/:slug" element={<InsightArticlePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/updates" element={<UpdatesPage />} />
      <Route path="/coaches" element={<CoachesPage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/shop" element={<Navigate replace to="/store" />} />
      <Route path="/nutrition" element={<NutritionPage />} />
      <Route path="/submission-preview" element={<SubmissionPreviewPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
