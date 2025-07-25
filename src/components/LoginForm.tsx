import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Eye, EyeOff, Shield, CreditCard, User, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginFormProps {
  onShowRegister?: () => void;
}

export function LoginForm({ onShowRegister }: LoginFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginType, setLoginType] = useState<"ic" | "company">("ic"); // 登录类型：IC号码或公司ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      toast({
        title: t("error"),
        description:
          loginType === "ic" ? t("pleaseEnterIC") : t("pleaseEnterCompanyID"),
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
      // 使用 AuthContext 的 login 方法，传递登录类型
      const result = await login(
        identifier,
        password,
        rememberMe,
        loginType === "company"
      );

      if (result.success) {
        toast({
          title: t("loginSuccess"),
          description: t("welcomeBack"),
        });
      } else {
        toast({
          title: t("loginFailed"),
          description: result.message || t("invalidCredentials"),
          variant: "destructive",
        });
      }
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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
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
            <Tabs
              defaultValue="ic"
              className="mb-4"
              onValueChange={(value) => setLoginType(value as "ic" | "company")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ic" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{t("personalLogin")}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="company"
                  className="flex items-center gap-1"
                >
                  <Building className="h-4 w-4" />
                  <span>{t("companyLogin")}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">
                  {loginType === "ic" ? t("icNumber") : t("companyID")}
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder={
                    loginType === "ic"
                      ? t("icNumberPlaceholder", "e.g., 123456-78-9012")
                      : t("companyIDPlaceholder", "e.g., C123456")
                  }
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                    placeholder={t("enterPassword", "Enter your password")}
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
