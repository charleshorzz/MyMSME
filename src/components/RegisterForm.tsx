import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface RegisterFormProps {
  onRegistered?: () => void;
  onBack?: () => void;
}

export function RegisterForm({ onRegistered, onBack }: RegisterFormProps) {
  const { t } = useTranslation();
  const { register } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    icNo: "",
    fullName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    companyName: "", // 添加公司名称
    businessAddress: "", // 添加公司地址
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("called");

    // 表单验证
    if (
      !form.icNo ||
      !form.fullName ||
      !form.email ||
      !form.contact ||
      !form.password ||
      !form.companyName ||
      !form.businessAddress
    ) {
      toast({
        title: t("error"),
        description: t("pleaseCompleteForm"),
        variant: "destructive",
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast({
        title: t("error"),
        description: t("passwordsDoNotMatch"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 使用 AuthContext 的 register 方法，同时传递公司信息
      const result = await register({
        icNo: form.icNo,
        fullName: form.fullName,
        email: form.email,
        contact: form.contact,
        password: form.password,
        companyName: form.companyName,
        businessAddress: form.businessAddress,
      });

      if (result.success) {
        // Instead of showing success dialog, navigate to eKYC verification
        toast({
          title: t("registerSuccess"),
          description: t("ekycVerificationRequired"),
          duration: 3000,
        });
        if (onRegistered) onRegistered(); // This should navigate to verification page
      } else {
        toast({
          title: t("error"),
          description: result.message || t("registrationFailed"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("registrationFailed"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{t("register")}</h1>
            <p className="text-muted-foreground">{t("createYourAccount")}</p>
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <Card className="shadow-large glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">
              {t("personalAndCompanyInfo")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 个人信息部分 */}
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                {t("personalInfo")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="icNo">{t("icNumber")}</Label>
                <Input
                  id="icNo"
                  name="icNo"
                  value={form.icNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("fullName")}</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">{t("contact")}</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={form.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 公司信息部分 */}
              <h3 className="font-medium text-sm text-muted-foreground mt-6 mb-2">
                {t("companyInfo")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="companyName">{t("companyName")}</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">{t("companyAddress")}</Label>
                <Input
                  id="businessAddress"
                  name="businessAddress"
                  value={form.businessAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 密码部分 */}
              <h3 className="font-medium text-sm text-muted-foreground mt-6 mb-2">
                {t("securityInfo")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pr-10 transition-fast"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex mt-6 justify-between">
                <Button type="button" variant="outline" onClick={onBack}>
                  {t("back") || "返回"}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t("loading") : t("register")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
