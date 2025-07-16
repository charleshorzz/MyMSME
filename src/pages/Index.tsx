import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { VerificationForm } from "@/components/VerificationForm";
import { FaceVerificationForm } from "@/components/FaceVerificationForm";
import { CameraTest } from "@/components/CameraTest";
import { Layout } from "@/components/Layout";
import { MicroEnterpriseDashboard } from "@/components/dashboard/MicroEnterpriseDashboard";
import { SmallEnterpriseDashboard } from "@/components/dashboard/SmallEnterpriseDashboard";
import { MediumEnterpriseDashboard } from "@/components/dashboard/MediumEnterpriseDashboard";
import { ServicesPage } from "@/components/ServicesPage";
import EInvoicePage from "@/components/E-Invoice";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, FileText, User, LogOut, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MarketplacePage } from "@/components/Marketplace";

type PageType = "dashboard" | "services" | "documents" | "marketplace" | "e-invoices" | "profile";

// Key for storing current page in localStorage
const PAGE_STORAGE_KEY = "mymsme-current-page";

const Index = () => {
  // Use the auth context
  const { user, login, logout, isAuthenticated } = useAuth();

  // Initialize page state from localStorage if available
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const savedPage = localStorage.getItem(PAGE_STORAGE_KEY);
    return (savedPage as PageType) || "dashboard";
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showFaceVerification, setShowFaceVerification] = useState(false);
  const [showCameraTest, setShowCameraTest] = useState(false);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PAGE_STORAGE_KEY, currentPage);
  }, [currentPage]);

  const handleLogin = (
    icNumber: string,
    enterpriseLevel: "micro" | "small" | "medium"
  ) => {
    login(icNumber, enterpriseLevel);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("dashboard");
    localStorage.setItem(PAGE_STORAGE_KEY, "dashboard");
  };

  if (!isAuthenticated) {
    if (showCameraTest) {
      return (
        <div className="min-h-screen bg-white">
          <div className="container mx-auto p-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCameraTest(false);
                setShowFaceVerification(false);
              }}
              className="mb-4"
            >
              Back to Login
            </Button>
            <CameraTest />
          </div>
        </div>
      );
    }

    if (showFaceVerification) {
      return (
        <div className="bg-white min-h-screen">
          <FaceVerificationForm
            onBack={() => {
              setShowFaceVerification(false);
              setShowVerification(true);
            }}
            onComplete={() => {
              // Handle completion - for now, go back to login
              setShowFaceVerification(false);
              setShowVerification(false);
              setShowRegister(false);
            }}
          />
          <div className="fixed bottom-4 right-4">
            <Button variant="outline" onClick={() => setShowCameraTest(true)}>
              Try Camera Test
            </Button>
          </div>
        </div>
      );
    }
    if (showVerification) {
      return (
        <VerificationForm
          onBack={() => {
            setShowVerification(false);
            setShowRegister(true);
          }}
          onContinue={() => {
            setShowVerification(false);
            setShowFaceVerification(true);
          }}
        />
      );
    }
    if (showRegister) {
      return (
        <RegisterForm
          onRegistered={() => {
            setShowVerification(true);
            setShowRegister(false);
          }}
          onBack={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginForm
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  // Ensure user is defined before accessing its properties
  if (!user) {
    return null; // This shouldn't happen due to isAuthenticated check, but TypeScript needs it
  }

  const renderDashboard = () => {
    switch (user.enterpriseLevel) {
      case "small":
        return <SmallEnterpriseDashboard />;
      case "medium":
        return <MediumEnterpriseDashboard />;
      default:
        return <MicroEnterpriseDashboard />;
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "services":
        return <ServicesPage userLevel={user.enterpriseLevel} />;
      case "marketplace":
        return <MarketplacePage userLevel={user.enterpriseLevel} />;
      case "documents":
        return (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Documents</h2>
            <p className="text-muted-foreground">
              Your business documents and certificates
            </p>
          </div>
        );
      case "profile":
        return (
          <div className="text-center py-20">
            <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <p className="text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        );
      case "e-invoices":
        return (
          <div>
            <div>E-Invoice Page Test</div>
            <EInvoicePage userLevel={user.enterpriseLevel} />
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <Layout userLevel={user.enterpriseLevel}>
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg">
        <Button
          variant={currentPage === "dashboard" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("dashboard")}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant={currentPage === "services" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("services")}
          className="flex items-center gap-2"
        >
          <Briefcase className="h-4 w-4" />
          Services
        </Button>
        <Button
          variant={currentPage === "marketplace" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("marketplace")}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          Marketplace
        </Button>
        <Button
          variant={currentPage === "documents" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("documents")}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Documents
        </Button>
        <Button
          variant={currentPage === "profile" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("profile")}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Profile
        </Button>
        <Button
          variant={currentPage === "e-invoices" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("e-invoices")}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          E-Invoices
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 ml-auto text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Content */}
      {renderContent()}
    </Layout>
  );
};

export default Index;
