import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// UI & Providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ConfettiProvider } from "@/components/ConfettiProvider";

// Auth
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import { Navbar } from "./components/Navbar";
import { DailyBonus } from "./components/DailyBonus";

// Pages
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import ScannerPage from "./pages/Scanner";
import RewardsPage from "./pages/Rewards";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import AdminPage from "./pages/Admin";
import LeaderboardPage from "./pages/Leaderboard";
import ProfilePage from "./pages/Profile";
import ChallengesPage from "./pages/Challenges";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isBonusModalOpen, claimDailyBonus, closeBonusModal } = useAuth();
  const { i18n } = useTranslation();

  // Dynamically set HTML lang + dir
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir(i18n.language);
  }, [i18n, i18n.language]);

  return (
    <>
      {user && (
        <DailyBonus
          isOpen={isBonusModalOpen}
          onClaim={claimDailyBonus}
          onClose={closeBonusModal}
          bonusAmount={20}
        />
      )}
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin-only route */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Toaster />
          <Sonner position="bottom-center" />
          <BrowserRouter>
            <ConfettiProvider>
              <AuthProvider>
                <AppContent />
              </AuthProvider>
            </ConfettiProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
