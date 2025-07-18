import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { companyService } from "@/services/companyService";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Company } from "@/lib/supabase";

// 定义公司状态类型
type CompanyStatus = "pending" | "approved" | "rejected" | "review";

export default function CompanyStatusPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompany() {
      if (!user) return;

      try {
        const companyData = await companyService.getCompanyByOwnerIC(
          user.icNumber
        );
        setCompany(companyData);
      } catch (error) {
        console.error("获取公司信息失败:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [user]);

  // 获取状态图标
  const getStatusIcon = (status: CompanyStatus) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "pending":
        return <Clock className="h-6 w-6 text-amber-500" />;
      case "review":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "rejected":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: CompanyStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "review":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // 获取状态描述
  const getStatusDescription = (status: CompanyStatus) => {
    switch (status) {
      case "approved":
        return t("companyStatusApproved");
      case "pending":
        return t("companyStatusPending");
      case "review":
        return t("companyStatusReview");
      case "rejected":
        return t("companyStatusRejected");
      default:
        return t("companyStatusUnknown");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large animate-pulse">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <p className="mt-4 text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Card className="w-[90%] max-w-md">
          <CardHeader>
            <CardTitle>{t("companyNotFound")}</CardTitle>
            <CardDescription>{t("companyNotFoundDescription")}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToHome")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 假设公司状态存储在 company.status 字段中
  // 如果不存在，默认为 "pending"
  const status = (company.status || "pending") as CompanyStatus;

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center justify-center">
      <Card className="w-[90%] max-w-3xl shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {t("companyRegistrationStatus")}
              </CardTitle>
              <CardDescription>
                {t("companyRegistrationStatusDescription")}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(status)}>
              {t(`status${status.charAt(0).toUpperCase() + status.slice(1)}`)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center py-8">
              {getStatusIcon(status)}
              <div className="ml-4 text-lg font-medium">
                {getStatusDescription(status)}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("companyName")}
                </p>
                <p className="font-medium">{company.businessName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("registrationNumber")}
                </p>
                <p className="font-medium">{company.businessType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("companyCode")}
                </p>
                <p className="font-medium">{company.companyCode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("businessStartDate")}
                </p>
                <p className="font-medium">
                  {new Date(company.businessStartDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {status === "rejected" && (
              <div className="bg-red-50 p-4 rounded-md border border-red-100">
                <h4 className="font-medium text-red-800 mb-2">
                  {t("rejectionReason")}
                </h4>
                <p className="text-red-700">
                  {company.rejectionReason || t("noReasonProvided")}
                </p>
              </div>
            )}

            {status === "pending" && (
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-2">
                  {t("estimatedProcessingTime")}
                </h4>
                <p className="text-amber-700">{t("processingTimeMessage")}</p>
              </div>
            )}

            {status === "approved" && (
              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h4 className="font-medium text-green-800 mb-2">
                  {t("approvalMessage")}
                </h4>
                <p className="text-green-700">{t("approvalInstructions")}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToHome")}
          </Button>

          {status === "approved" && (
            <Button
              onClick={() =>
                navigate(`/${company.level || "micro"}-enterprise`)
              }
              className="w-full sm:w-auto"
            >
              {t("goToDashboard")}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
