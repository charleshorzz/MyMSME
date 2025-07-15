import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { VerificationForm } from "@/components/VerificationForm";
import { Layout } from "@/components/Layout";
import { MicroEnterpriseDashboard } from "@/components/dashboard/MicroEnterpriseDashboard";
import { SmallEnterpriseDashboard } from "@/components/dashboard/SmallEnterpriseDashboard";
import { MediumEnterpriseDashboard } from "@/components/dashboard/MediumEnterpriseDashboard";
import { ServicesPage } from "@/components/ServicesPage";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, FileText, User, LogOut } from "lucide-react";

type UserData = {
  icNumber: string;
  enterpriseLevel: "micro" | "small" | "medium";
} | null;

type PageType = "dashboard" | "services" | "documents" | "profile";

const Index = () => {
  const [user, setUser] = useState<UserData>(null);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [showRegister, setShowRegister] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleLogin = (
    icNumber: string,
    enterpriseLevel: "micro" | "small" | "medium"
  ) => {
    setUser({ icNumber, enterpriseLevel });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("dashboard");
  };

  if (!user) {
    if (showVerification) {
      return (
        <VerificationForm
          onBack={() => {
            setShowVerification(false);
            setShowRegister(false);
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
