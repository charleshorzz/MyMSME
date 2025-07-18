import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { companyService } from "@/services/companyService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Building,
  Users,
  Plus,
  LogIn,
  LogOut,
  CreditCard,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import CompanyStatusPage from "./CompanyStatusPage";
import { Separator } from "@/components/ui/separator";
import { Company } from "@/lib/supabase";

export default function CompanySetupPage() {
  const { t } = useTranslation();
  const { user, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [createdCompany, setCreatedCompany] = useState<Company | null>(null);

  // 创建公司的表单状态
  const [newCompany, setNewCompany] = useState({
    nameType: "",
    businessName: "",
    businessStartDate: "",
    incentiveSource: "",
    registrationPeriod: "",
    businessInfo: false,
    businessAddress: "",
    businessContact: "",
    businessEmail: "",
    businessType: "",
    businessCode: "", // 你可以用字符串输入，后端转为list<int>
    ownerIC: user ? [user.icNumber] : [], // 这里是数组
  });

  // 加入公司的表单状态
  const [joinCompany, setJoinCompany] = useState({
    companyCode: "",
    position: "",
  });

  // 表单变更处理
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewCompany((prev) => ({ ...prev, businessInfo: checked }));
  };

  const handleJoinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJoinCompany((prev) => ({ ...prev, [name]: value }));
  };

  // 创建新公司
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      // 创建公司记录
      const company = await companyService.createCompany({
        nameType: newCompany.nameType,
        businessName: newCompany.businessName,
        businessStartDate: newCompany.businessStartDate,
        incentiveSource: newCompany.incentiveSource,
        registrationPeriod: parseInt(newCompany.registrationPeriod) || 1,
        businessInfo: newCompany.businessInfo,
        businessAddress: newCompany.businessAddress,
        businessContact: newCompany.businessContact,
        businessEmail: newCompany.businessEmail,
        businessType: newCompany.businessType,
        businessCode: newCompany.businessCode
          .split(",")
          .map((code) => parseInt(code.trim())), // 假设用逗号分隔
        ownerIC: user.icNumber,
        level: "micro",
        status: "pending", // 设置初始状态为待审核
      });

      if (company) {
        // 更新用户的企业级别
        await updateUserProfile({ level: "micro" });

        // 保存创建的公司信息
        setCreatedCompany(company);

        // 显示支付页面
        setShowPayment(true);
      }
    } catch (error) {
      console.error("创建公司失败:", error);
      toast({
        title: t("error"),
        description: t("createCompanyError"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 加入现有公司
  const handleJoinCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      // 在实际应用中，这里应该验证公司代码并获取公司信息
      // 这里简化为模拟加入公司
      const companyCode = joinCompany.companyCode.trim();

      // 查找公司（实际应用中应该通过API查询）
      const company = await companyService.getCompanyByCode(companyCode);

      if (company) {
        // 确定公司级别（实际应用中应该从公司信息中获取）
        const companyLevel = companyService.getEnterpriseLevel(
          company.registrationPeriod,
          0
        );

        // 更新用户的企业级别
        await updateUserProfile({ level: companyLevel });

        toast({
          title: t("companyJoined"),
          description: t("companyJoinedDescription"),
        });

        // 重定向到相应的企业仪表板
        navigate(`/${companyLevel}-enterprise`);
      } else {
        toast({
          title: t("error"),
          description: t("companyNotFound"),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("加入公司失败:", error);
      toast({
        title: t("error"),
        description: t("joinCompanyError"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理支付
  const handlePayment = () => {
    // 模拟支付过程
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentComplete(true);

      toast({
        title: t("paymentSuccessful"),
        description: t("paymentSuccessfulDescription"),
      });
    }, 2000);
  };

  // 处理支付完成后跳转
  const handleContinueAfterPayment = () => {
    navigate("/company-status");
  };

  // 渲染支付页面
  const renderPaymentPage = () => {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("paymentGateway")}</h1>
            <p className="text-muted-foreground">{t("paymentDescription")}</p>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{t("registrationFee")}</CardTitle>
              <CardDescription>{t("selectPaymentMethod")}</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentComplete ? (
                <div className="flex flex-col items-center py-8 space-y-4">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium">
                    {t("paymentComplete")}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {t("paymentCompleteDescription")}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {t("registrationFeeAmount")}
                      </span>
                      <span className="font-bold">RM 50.00</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="duitnow"
                        name="paymentMethod"
                        className="rounded border-gray-300"
                        defaultChecked
                      />
                      <Label htmlFor="duitnow" className="cursor-pointer">
                        DuitNow
                      </Label>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-center mb-4">
                        <img
                          src="https://images.seeklogo.com/logo-png/37/1/duit-now-logo-png_seeklogo-374361.png"
                          alt="DuitNow"
                          className="h-12"
                        />
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                        {t("duitnowDescription")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {paymentComplete ? (
                <Button className="w-full" onClick={handleContinueAfterPayment}>
                  {t("continueToStatus")}
                </Button>
              ) : (
                <div className="w-full space-y-3">
                  <Button
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        {t("processing")}
                      </span>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        {t("payNow")}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowPayment(false)}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("back")}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };

  // 如果显示支付页面，则渲染支付页面
  if (showPayment) {
    return renderPaymentPage();
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 顶部登出按钮 */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={async () => {
              await logout();
              navigate("/");
            }}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </Button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("companySetup")}</h1>
          <p className="text-muted-foreground">
            {t("companySetupDescription")}
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t("setupYourCompany")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "create" | "join")}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="create">
                  {t("createCompanyTab")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <form onSubmit={handleCreateCompany} className="space-y-4">
                  {/* <div className="space-y-2">
                    <Label htmlFor="level">{t("enterpriseLevel")}</Label>
                    <Select
                      name="level"
                      value={newCompany.level}
                      onValueChange={(value) =>
                        setNewCompany((prev) => ({
                          ...prev,
                          level: value as "micro" | "small" | "medium",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectEnterpriseLevel")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="micro">{t("micro")}</SelectItem>
                        <SelectItem value="small">{t("small")}</SelectItem>
                        <SelectItem value="medium">{t("medium")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="nameType">{t("nameType")}</Label>
                    <Select
                      name="nameType"
                      value={newCompany.nameType}
                      onValueChange={(value) =>
                        setNewCompany((prev) => ({
                          ...prev,
                          nameType: value as "personal" | "trade",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectNameType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">
                          {t("personalName")}
                        </SelectItem>
                        <SelectItem value="trade">{t("tradeName")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessName">{t("companyName")}</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={newCompany.businessName}
                      onChange={handleCreateChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">{t("businessType")}</Label>
                    <Input
                      id="business Type"
                      name="businessType"
                      value={newCompany.businessType}
                      onChange={handleCreateChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">
                      {t("companyAddress")}
                    </Label>
                    <Input
                      id="businessAddress"
                      name="businessAddress"
                      value={newCompany.businessAddress}
                      onChange={handleCreateChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationPeriod">
                        {t("registrationPeriod")}
                      </Label>
                      <Input
                        id="registrationPeriod"
                        name="registrationPeriod"
                        type="number"
                        min="1"
                        value={newCompany.registrationPeriod}
                        onChange={handleCreateChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessContact">
                        {t("contactNumber")}
                      </Label>
                      <Input
                        id="businessContact"
                        name="businessContact"
                        value={newCompany.businessContact}
                        onChange={handleCreateChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessEmail">{t("email")}</Label>
                      <Input
                        id="businessEmail"
                        name="businessEmail"
                        type="email"
                        value={newCompany.businessEmail}
                        onChange={handleCreateChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessCode">{t("businessCode")}</Label>
                    <Input
                      id="businessCode"
                      name="businessCode"
                      value={newCompany.businessCode}
                      onChange={handleCreateChange}
                      required
                      placeholder={t("enterBusinessCode")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessStartDate">
                      {t("businessStartDate")}
                    </Label>
                    <Input
                      id="businessStartDate"
                      name="businessStartDate"
                      type="date"
                      value={newCompany.businessStartDate}
                      onChange={handleCreateChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incentiveSource">
                      {t("incentiveSource")}
                    </Label>
                    <Input
                      id="incentiveSource"
                      name="incentiveSource"
                      value={newCompany.incentiveSource}
                      onChange={handleCreateChange}
                      required
                    />
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="level">{t("enterpriseLevel")}</Label>
                    <Select
                      name="level"
                      value={newCompany.level}
                      onValueChange={(value) =>
                        setNewCompany((prev) => ({
                          ...prev,
                          level: value as "micro" | "small" | "medium",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectEnterpriseLevel")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="micro">{t("micro")}</SelectItem>
                        <SelectItem value="small">{t("small")}</SelectItem>
                        <SelectItem value="medium">{t("medium")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}

                  <div className="flex items-center space-x-2 my-4">
                    <Checkbox
                      id="businessInfo"
                      checked={newCompany.businessInfo}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="businessInfo">{t("businessInfo")}</Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {isSubmitting ? t("creating") : t("createCompany")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="join">
                <form onSubmit={handleJoinCompany} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyCode">{t("companyCode")}</Label>
                    <Input
                      id="companyCode"
                      name="companyCode"
                      value={joinCompany.companyCode}
                      onChange={handleJoinChange}
                      required
                      placeholder={t("enterCompanyCode")}
                    />
                    <p className="text-sm text-muted-foreground">
                      {t("companyCodeDescription")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">{t("position")}</Label>
                    <Input
                      id="position"
                      name="position"
                      value={joinCompany.position}
                      onChange={handleJoinChange}
                      required
                      placeholder={t("yourPositionInCompany")}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {isSubmitting ? t("joining") : t("joinCompany")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
