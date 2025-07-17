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
import { Building, Users, Plus, LogIn } from "lucide-react";

export default function CompanySetupPage() {
  const { t } = useTranslation();
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    businessCode: "",
    level: "micro" as "micro" | "small" | "medium",
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
        businessName: newCompany.businessName, // 使用businessName作为name
        registrationNumber: newCompany.businessType, // 使用businessType作为registrationNumber
        address: newCompany.businessAddress, // 使用businessAddress作为address
        industry: newCompany.nameType, // 使用nameType作为industry
        registrationPeriod: parseInt(newCompany.registrationPeriod) || 1, // 直接使用registrationPeriod
        companyCode: newCompany.businessCode, // 添加companyCode字段
        ownerIC: user.icNumber,
      });

      if (company) {
        // 更新用户的企业级别
        await updateUserProfile({ level: newCompany.level });

        toast({
          title: t("companyCreated"),
          description: t("companyCreatedDescription"),
        });

        // 重定向到相应的企业仪表板
        navigate(`/${newCompany.level}-enterprise`);
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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("companySetup")}</h1>
          <p className="text-muted-foreground">
            {t("companySetupDescription")}
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t("setupYourCompany")}</CardTitle>
            <CardDescription>{t("createOrJoinCompany")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as "create" | "join")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {t("createNewCompany")}
                </TabsTrigger>
                <TabsTrigger value="join" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t("joinExistingCompany")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create">
                <form onSubmit={handleCreateCompany} className="space-y-4">
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
                    <Label htmlFor="businessType">
                      {t("registrationNumber")}
                    </Label>
                    <Input
                      id="businessType"
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
                      <Label htmlFor="nameType">{t("industry")}</Label>
                      <Input
                        id="nameType"
                        name="nameType"
                        value={newCompany.nameType}
                        onChange={handleCreateChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registrationPeriod">
                        {t("employeeCount")}
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

                  <div className="space-y-2">
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
                  </div>

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
