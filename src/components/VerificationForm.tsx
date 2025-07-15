import React from "react";
import { Button } from "@/components/ui/button";

interface VerificationFormProps {
  onBack?: () => void;
}

export function VerificationForm({ onBack }: VerificationFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Verification</h1>
            <p className="text-muted-foreground">
              This is a dummy verification step. You can edit this component
              later.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={onBack} variant="outline">
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
