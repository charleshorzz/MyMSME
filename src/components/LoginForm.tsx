import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Eye, EyeOff, Shield, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onLogin: (
    icNumber: string,
    enterpriseLevel: "micro" | "small" | "medium"
  ) => void;
  onShowRegister?: () => void;
}

export function LoginForm({ onLogin, onShowRegister }: LoginFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [icNumber, setIcNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!icNumber.trim()) {
      toast({
        title: t("error"),
        description: t("pleaseEnterIC"),
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: t("error"),
        description: t("pleaseEnterPassword"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo logic - determine enterprise level based on IC number
      let level: "micro" | "small" | "medium" = "micro";
      if (icNumber.endsWith("1") || icNumber.endsWith("2")) level = "small";
      if (icNumber.endsWith("3") || icNumber.endsWith("4")) level = "medium";

      // Call the login handler
      onLogin(icNumber, level);

      // Show success toast
      toast({
        title: t("loginSuccess"),
        description: t("welcomeBack"),
      });
    } catch (error) {
      toast({
        title: t("loginFailed"),
        description: t("invalidCredentials"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t("appName")}</h1>
            <p className="text-muted-foreground">{t("appTagline")}</p>
          </div>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-large glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t("login")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ic">{t("icNumber")}</Label>
                <Input
                  id="ic"
                  type="text"
                  placeholder="e.g., 123456-78-9012"
                  value={icNumber}
                  onChange={(e) => setIcNumber(e.target.value)}
                  required
                  className="transition-fast"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 transition-fast"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    {t("rememberMe")}
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  type="button"
                >
                  {t("forgotPassword")}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full transition-fast"
                disabled={isLoading}
              >
                {isLoading ? t("loading") : t("login")}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                {t("dontHaveAccount")}{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  type="button"
                  onClick={onShowRegister}
                >
                  {t("registerHere")}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="shadow-soft glass-effect">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <h3 className="text-sm font-semibold">{t("ekycVerified")}</h3>
              <p className="text-xs text-muted-foreground">
                {t("secureIdentityVerification")}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft glass-effect">
            <CardContent className="p-4 text-center">
              <CreditCard className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <h3 className="text-sm font-semibold">{t("unitedMsmeId")}</h3>
              <p className="text-xs text-muted-foreground">
                {t("oneIdAllServices")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Instructions */}
        <Card className="shadow-soft bg-muted/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-2">
              {t("demoInstructions")}
            </h3>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>• {t("microEnterpriseDemo")}</p>
              <p>• {t("smallEnterpriseDemo")}</p>
              <p>• {t("mediumEnterpriseDemo")}</p>
              <p>• {t("useAnyPassword")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
