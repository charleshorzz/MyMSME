import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import DocumentsPage from "./pages/DocumentsPage";
import CompanySetupPage from "./pages/CompanySetupPage";
import { MicroEnterpriseDashboard } from "@/components/dashboard/MicroEnterpriseDashboard";
import { SmallEnterpriseDashboard } from "@/components/dashboard/SmallEnterpriseDashboard";
import { MediumEnterpriseDashboard } from "@/components/dashboard/MediumEnterpriseDashboard";
import EInvoicePage from "@/components/E-Invoice";
import { Layout } from "@/components/Layout";
import CompanyStatusPage from "./pages/CompanyStatusPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* 公司设置页面 */}
            <Route path="/company-setup" element={<CompanySetupPage />} />

            <Route path="/company-status" element={<CompanyStatusPage />} />

            {/* 微型企业路由 */}
            <Route
              path="/micro-enterprise"
              element={
                <Layout userLevel="micro">
                  <MicroEnterpriseDashboard />
                </Layout>
              }
            />
            <Route
              path="/micro-enterprise/profile"
              element={
                <Layout userLevel="micro">
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/micro-enterprise/documents"
              element={
                <Layout userLevel="micro">
                  <DocumentsPage />
                </Layout>
              }
            />
            <Route
              path="/micro-enterprise/e-invoice"
              element={
                <Layout userLevel="micro">
                  <EInvoicePage userLevel="micro" />
                </Layout>
              }
            />

            {/* 小型企业路由 */}
            <Route
              path="/small-enterprise"
              element={
                <Layout userLevel="small">
                  <SmallEnterpriseDashboard />
                </Layout>
              }
            />
            <Route
              path="/small-enterprise/profile"
              element={
                <Layout userLevel="small">
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/small-enterprise/documents"
              element={
                <Layout userLevel="small">
                  <DocumentsPage />
                </Layout>
              }
            />
            <Route
              path="/small-enterprise/e-invoice"
              element={
                <Layout userLevel="small">
                  <EInvoicePage userLevel="small" />
                </Layout>
              }
            />

            {/* 中型企业路由 */}
            <Route
              path="/medium-enterprise"
              element={
                <Layout userLevel="medium">
                  <MediumEnterpriseDashboard />
                </Layout>
              }
            />
            <Route
              path="/medium-enterprise/profile"
              element={
                <Layout userLevel="medium">
                  <ProfilePage />
                </Layout>
              }
            />
            <Route
              path="/medium-enterprise/documents"
              element={
                <Layout userLevel="medium">
                  <DocumentsPage />
                </Layout>
              }
            />
            <Route
              path="/medium-enterprise/e-invoice"
              element={
                <Layout userLevel="medium">
                  <EInvoicePage userLevel="medium" />
                </Layout>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
