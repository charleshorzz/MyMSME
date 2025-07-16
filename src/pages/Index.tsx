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
import { Button } from "@/components/ui/button";
import { Home, Briefcase, FileText, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type PageType = "dashboard" | "services" | "documents" | "profile";

// Key for storing current page in localStorage
const PAGE_STORAGE_KEY = "mymsme-current-page";

const Index = () => {
  // 使用认证上下文
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  // 从 localStorage 初始化页面状态
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const savedPage = localStorage.getItem(PAGE_STORAGE_KEY);
    return (savedPage as PageType) || "dashboard";
  });

  const [showRegister, setShowRegister] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showFaceVerification, setShowFaceVerification] = useState(false);
  const [showCameraTest, setShowCameraTest] = useState(false);

  // 当页面变化时保存到 localStorage
  useEffect(() => {
    localStorage.setItem(PAGE_STORAGE_KEY, currentPage);
  }, [currentPage]);

  const handleLogout = async () => {
    await logout();
    setCurrentPage("dashboard");
    localStorage.setItem(PAGE_STORAGE_KEY, "dashboard");
  };

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large animate-pulse">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <p className="mt-4 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

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
              返回登录
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
              // 完成后返回登录
              setShowFaceVerification(false);
              setShowVerification(false);
              setShowRegister(false);
            }}
          />
          <div className="fixed bottom-4 right-4">
            <Button variant="outline" onClick={() => setShowCameraTest(true)}>
              测试相机
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
    return <LoginForm onShowRegister={() => setShowRegister(true)} />;
  }

  // 确保用户已定义
  if (!user) {
    return null; // 由于 isAuthenticated 检查，这不应该发生，但 TypeScript 需要它
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
            <h2 className="text-2xl font-bold mb-2">文档</h2>
            <p className="text-muted-foreground">您的业务文档和证书</p>
          </div>
        );
      case "profile":
        return (
          <div className="text-center py-20">
            <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">个人资料</h2>
            <p className="text-muted-foreground">
              {user.fullName}
              <br />
              {user.isKycVerified ? "已通过 KYC 验证" : "未通过 KYC 验证"}
              <br />
              {user.email}
              <br />
              {user.contact}
            </p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <Layout userLevel={user.enterpriseLevel}>
      {/* 导航标签 */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg">
        <Button
          variant={currentPage === "dashboard" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("dashboard")}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          仪表盘
        </Button>
        <Button
          variant={currentPage === "services" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("services")}
          className="flex items-center gap-2"
        >
          <Briefcase className="h-4 w-4" />
          服务
        </Button>
        <Button
          variant={currentPage === "documents" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("documents")}
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          文档
        </Button>
        <Button
          variant={currentPage === "profile" ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage("profile")}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          个人资料
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 ml-auto text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          登出
        </Button>
      </div>

      {/* 内容 */}
      {renderContent()}
    </Layout>
  );
};

export default Index;
