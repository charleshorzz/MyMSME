import React from "react";
import { TabBar } from "./TabBar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  userLevel?: string;
  children: React.ReactNode;
}

export function Layout({ userLevel = "micro", children }: LayoutProps) {
  const location = useLocation();

  // 确定当前活动标签
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/profile")) return "profile";
    if (path.includes("/documents")) return "documents";
    if (path.includes("/e-invoice")) return "e-invoice";
    if (path.includes("/marketplace")) return "marketplace";
    if (path.includes("/analytics")) return "analytics";
    return "services";
  };

  // 确定用户级别
  const getUserLevel = () => {
    if (userLevel) return userLevel;

    const path = location.pathname;
    if (path.includes("micro")) return "micro";
    if (path.includes("small")) return "small";
    if (path.includes("medium")) return "medium";
    return "micro";
  };

  // 检查是否在登录页面或注册页面
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-white">
      {!isAuthPage && (
        <TabBar activeTab={getActiveTab()} userLevel={getUserLevel()} />
      )}
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
