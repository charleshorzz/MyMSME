import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Mail, Shield } from "lucide-react";

interface RegistrationSuccessProps {
  onContinue?: () => void;
  userEmail?: string;
}

export function RegistrationSuccess({ onContinue, userEmail }: RegistrationSuccessProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-large glass-effect">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600">
              {t("registrationSuccess")}
            </h1>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {/* eKYC Verification Complete */}
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {t("ekycVerified")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your identity has been successfully verified
              </p>
            </div>

            {/* Email Verification Instructions */}
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Email Verification Required
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("emailVerificationRequired")}
              </p>
              {userEmail && (
                <p className="text-xs text-muted-foreground">
                  📧 Check your email at <strong>{userEmail}</strong>
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Don't forget to check your spam folder
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Next Steps:</h3>
              <div className="text-left space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">eKYC verification completed ✓</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">Verify your email address</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-muted-foreground">Start using MyMSME platform</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={onContinue}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {t("understood") || "I Understand"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
