import React from "react";

interface LayoutProps {
  userLevel?: string;
  children: React.ReactNode;
}

export function Layout({ userLevel, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Optionally, you can add a header or sidebar here */}
      {children}
    </div>
  );
}
