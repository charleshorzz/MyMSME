import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, FileText, User, LayoutGrid } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface TabBarProps {
  activeTab?: string;
  userLevel?: string;
}

export function TabBar({
  activeTab = "services",
  userLevel = "micro",
}: TabBarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleTabChange = (value: string) => {
    switch (value) {
      case "services":
        navigate(`/${userLevel}-enterprise`);
        break;
      case "profile":
        navigate(`/${userLevel}-enterprise/profile`);
        break;
      case "documents":
        navigate(`/${userLevel}-enterprise/documents`);
        break;
      default:
        navigate(`/${userLevel}-enterprise`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-auto"
      >
        <TabsList>
          <TabsTrigger value="services" className="flex items-center gap-1">
            <LayoutGrid className="h-4 w-4" />
            <span>{t("services")}</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{t("profile")}</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{t("documents")}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title={t("notifications")}>
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title={t("logout")}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
