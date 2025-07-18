import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  Users,
  TrendingUp,
  BarChart3,
  FileText,
  Globe,
  CreditCard,
  Shield,
  Zap,
  Target,
  DollarSign,
  Receipt,
  Calendar,
  Briefcase,
  CheckCircle,
  ExternalLink,
  Percent,
  TrendingDown,
  Calculator,
  Cloud,
  Smartphone,
  Brain,
} from "lucide-react";
import { EnterpriseAnalyticsSummary } from "@/components/EnterpriseAnalyticsSummary";

export function MediumEnterpriseDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoanDialogOpen, setIsLoanDialogOpen] = useState(false);

  // Enterprise data for loan eligibility
  const enterpriseData = {
    annualRevenue: 2400000, // RM 2.4M
    monthlyGrowth: 15.2, // 15.2%
    paymentHistory: 98, // 98%
    creditRating: "A+",
    businessStability: "Excellent",
  };

  // Bank requirements and loan products
  const bankLoanProducts = [
    {
      id: 1,
      bankName: "Maybank",
      bankLogo: "🏦",
      loanProduct: "Business Growth Loan",
      interestRate: "4.5% - 6.8%",
      maxAmount: "RM 5M",
      minRevenue: 1000000,
      minGrowth: 10,
      minPaymentHistory: 90,
      processingTime: "7-14 days",
      eligible: true,
      requirements: [
        "Annual revenue > RM 1M",
        "Monthly growth > 10%",
        "Payment history > 90%",
      ],
      benefits: [
        "Flexible repayment",
        "No collateral required",
        "Quick approval",
      ],
    },
    {
      id: 2,
      bankName: "CIMB Bank",
      bankLogo: "🏪",
      loanProduct: "SME Expansion Loan",
      interestRate: "4.8% - 7.2%",
      maxAmount: "RM 3M",
      minRevenue: 800000,
      minGrowth: 8,
      minPaymentHistory: 85,
      processingTime: "5-10 days",
      eligible: true,
      requirements: [
        "Annual revenue > RM 800K",
        "Monthly growth > 8%",
        "Payment history > 85%",
      ],
      benefits: [
        "Competitive rates",
        "Fast processing",
        "Dedicated relationship manager",
      ],
    },
    {
      id: 3,
      bankName: "Public Bank",
      bankLogo: "🏛️",
      loanProduct: "Enterprise Development Loan",
      interestRate: "5.2% - 7.5%",
      maxAmount: "RM 10M",
      minRevenue: 3000000,
      minGrowth: 12,
      minPaymentHistory: 95,
      processingTime: "10-21 days",
      eligible: false,
      requirements: [
        "Annual revenue > RM 3M",
        "Monthly growth > 12%",
        "Payment history > 95%",
      ],
      benefits: ["Large loan amounts", "Long tenure", "Government backing"],
    },
    {
      id: 4,
      bankName: "Hong Leong Bank",
      bankLogo: "🏢",
      loanProduct: "Business Accelerator Loan",
      interestRate: "4.2% - 6.5%",
      maxAmount: "RM 2M",
      minRevenue: 500000,
      minGrowth: 5,
      minPaymentHistory: 80,
      processingTime: "3-7 days",
      eligible: true,
      requirements: [
        "Annual revenue > RM 500K",
        "Monthly growth > 5%",
        "Payment history > 80%",
      ],
      benefits: ["Lowest rates", "Fastest approval", "Digital application"],
    },
    {
      id: 5,
      bankName: "RHB Bank",
      bankLogo: "🏦",
      loanProduct: "SME Progress Loan",
      interestRate: "5.0% - 7.8%",
      maxAmount: "RM 4M",
      minRevenue: 1500000,
      minGrowth: 15,
      minPaymentHistory: 92,
      processingTime: "7-14 days",
      eligible: true,
      requirements: [
        "Annual revenue > RM 1.5M",
        "Monthly growth > 15%",
        "Payment history > 92%",
      ],
      benefits: ["Seasonal repayment", "Grace period", "Business advisory"],
    },
  ];

  // Filter eligible banks based on enterprise data
  const eligibleBanks = bankLoanProducts.filter(
    (bank) =>
      enterpriseData.annualRevenue >= bank.minRevenue &&
      enterpriseData.monthlyGrowth >= bank.minGrowth &&
      enterpriseData.paymentHistory >= bank.minPaymentHistory
  );

  const ineligibleBanks = bankLoanProducts.filter(
    (bank) =>
      enterpriseData.annualRevenue < bank.minRevenue ||
      enterpriseData.monthlyGrowth < bank.minGrowth ||
      enterpriseData.paymentHistory < bank.minPaymentHistory
  );

  const kpis = [
    {
      label: t("annualRevenue"),
      value: "RM 2.4M",
      change: "+22%",
      icon: DollarSign,
      color: "text-success",
    },
    {
      label: t("monthlyGrowth"),
      value: "15.2%",
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: t("activeProjects"),
      value: "12",
      change: "+4",
      icon: Briefcase,
      color: "text-secondary",
    },
    {
      label: t("teamMembers"),
      value: "28",
      change: "+5",
      icon: Users,
      color: "text-accent",
    },
    {
      label: t("clientSatisfaction"),
      value: "96%",
      change: "+2%",
      icon: Target,
      color: "text-success",
    },
    {
      label: t("invoicesProcessed"),
      value: "156",
      change: "+12",
      icon: Receipt,
      color: "text-primary",
    },
  ];

  const recentProjects = [
    {
      id: "PRJ-001",
      name: "Digital Transformation",
      client: "Tech Corp",
      progress: 85,
      status: <span className="text-sm">{t("active")}</span>,
    },
    {
      id: "PRJ-002",
      name: "E-commerce Platform",
      client: "Retail Ltd",
      progress: 60,
      status: <span className="text-sm">{t("active")}</span>,
    },
    {
      id: "PRJ-003",
      name: "Mobile App Development",
      client: "Startup Inc",
      progress: 30,
      status: <span className="text-sm">{t("planning")}</span>,
    },
    {
      id: "PRJ-004",
      name: "Data Analytics",
      client: "Finance Co",
      progress: 100,
      status: <span className="text-sm">{t("completed")}</span>,
    },
  ];

  // 中型企业可用服务
  const mediumServices = [
    // 基础服务（所有级别）
    {
      id: "qr-payments",
      title: t("qrPaymentGateway"),
      description: t("acceptPaymentsViaQr"),
      icon: Smartphone,
      price: <span className="text-sm">RM 15/{t("month")}</span>,
      category: t("paymentCategory"),
    },
    {
      id: "basic-records",
      title: t("recordKeeping"),
      description: t("basicBusinessRecord"),
      icon: FileText,
      price: <span className="text-sm">RM 25/{t("month")}</span>,
      category: t("accountingCategory"),
    },
    {
      id: "ssm-documents",
      title: t("ssmCertificate"),
      description: t("digitalSsmCertificate"),
      icon: Shield,
      price: t("free"),
      category: t("documentsCategory"),
    },
    // 小型和中型企业服务
    {
      id: "e-invoicing",
      title: t("eInvoicing"),
      description: t("automatedEInvoicing"),
      icon: Receipt,
      price: <span className="text-sm">RM 50/{t("month")}</span>,
      category: t("accountingCategory"),
    },
    {
      id: "website-builder",
      title: t("websiteBuilder"),
      description: t("professionalWebsiteTemplates"),
      icon: Globe,
      price: <span className="text-sm">RM 80/{t("month")}</span>,
      category: t("marketingCategory"),
    },
    {
      id: "accounting-suite",
      title: t("accountingServices"),
      description: t("fullAccountingBookkeeping"),
      icon: Calculator,
      price: <span className="text-sm">RM 120/{t("month")}</span>,
      category: t("accountingCategory"),
    },
    {
      id: "credit-analysis",
      title: t("creditAnalysis"),
      description: t("aiPoweredCreditScore"),
      icon: Brain,
      price: <span className="text-sm">RM 40/{t("month")}</span>,
      category: t("financeCategory"),
    },
    // 仅中型企业服务
    {
      id: "enterprise-crm",
      title: t("enterpriseCrm"),
      description: t("advancedCustomerRelationship"),
      icon: Users,
      price: <span className="text-sm">RM 200/{t("month")}</span>,
      category: t("managementCategory"),
    },
    {
      id: "business-intelligence",
      title: t("businessIntelligence"),
      description: t("advancedAnalyticsReporting"),
      icon: BarChart3,
      price: <span className="text-sm">RM 150/{t("month")}</span>,
      category: t("analyticsCategory"),
    },
    {
      id: "project-management",
      title: t("projectManagementSuite"),
      description: t("comprehensiveProjectManagement"),
      icon: Briefcase,
      price: <span className="text-sm">RM 180/{t("month")}</span>,
      category: t("managementCategory"),
    },
    {
      id: "multi-location",
      title: t("multiLocationManagement"),
      description: t("manageMultipleBusinessLocations"),
      icon: Building2,
      price: <span className="text-sm">RM 250/{t("month")}</span>,
      category: t("operationsCategory"),
    },
    {
      id: "automation-suite",
      title: t("businessAutomation"),
      description: t("workflowAutomationIntegration"),
      icon: Zap,
      price: <span className="text-sm">RM 300/{t("month")}</span>,
      category: t("automationCategory"),
    },
    {
      id: "cloud-backup",
      title: t("enterpriseCloudBackup"),
      description: t("secureCloudStorageBackup"),
      icon: Cloud,
      price: <span className="text-sm">RM 100/{t("month")}</span>,
      category: t("infrastructureCategory"),
    },
  ];

  // 按类别分组服务
  const servicesByCategory = mediumServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof mediumServices>);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("welcome")} {t("to")} {t("medium")}
        </h1>
        <p className="text-muted-foreground">{t("enterpriseGradeTools")}</p>
      </div>

      {/* Executive KPIs */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground truncate">
                      {kpi.label}
                    </p>
                    <p className="text-lg font-bold">{kpi.value}</p>
                    <p className="text-xs text-success">{kpi.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="projects">{t("projects")}</TabsTrigger>
          <TabsTrigger value="finance">{t("financeCategory")}</TabsTrigger>
          <TabsTrigger value="operations">{t("operationsTab")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analyticsCategory")}</TabsTrigger>
          <TabsTrigger value="services">{t("services")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Revenue Overview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {t("revenueOverview")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground">{t("revenueChart")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Active Projects Status */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t("projectStatus")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t("active")}</span>
                  <Badge variant="default">8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("planning")}</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("completed")}</span>
                  <Badge variant="outline">15</Badge>
                </div>
              </CardContent>
            </Card>

            {/* E-Invoicing Section */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  {t("eInvoicing")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t("monthlyInvoices")}</span>
                  <span className="font-semibold">124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("totalValue")}</span>
                  <span className="font-semibold">RM 2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t("paidRate")}</span>
                  <span className="font-semibold text-success">98%</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => navigate("/medium-enterprise/e-invoice?create=true")}>
                    {t("createInvoice")}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate("/medium-enterprise/e-invoice")}>
                    {t("viewInvoices")} 
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("teamPerformance")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">{t("productivity")}</span>
                    <span className="font-semibold text-success">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">{t("efficiency")}</span>
                    <span className="font-semibold text-primary">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">{t("satisfaction")}</span>
                    <span className="font-semibold text-secondary">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{t("activeProjects")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge
                          variant={
                            project.status === <span className="text-sm">{t("completed")}</span>

                              ? "default"
                              : project.status === <span className="text-sm">{t("active")}</span>
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.client}
                      </p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("progress")}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t("financialOverview")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>{t("totalAssets")}</span>
                    <span className="font-semibold">RM 5.2M</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>{t("monthlyExpenses")}</span>
                    <span className="font-semibold">RM 180K</span>
                  </div>
                  <div className="flex justify-between p-3 bg-success/10 rounded-lg">
                    <span>{t("netProfit")}</span>
                    <span className="font-semibold text-success">RM 420K</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t("creditAnalysis")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-success">A+</div>
                  <p className="text-muted-foreground">
                    {t("exellentCreditRating")}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("paymentHistory")}</span>
                      <span className="text-success">98%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("creditUtilization")}</span>
                      <span className="text-success">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{t("businessStability")}</span>
                      <span className="text-success">Excellent</span>
                    </div>
                  </div>
                  <Dialog
                    open={isLoanDialogOpen}
                    onOpenChange={setIsLoanDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        {t("applyForBusinessLoan")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {t("businessLoanApplication")}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Enterprise Summary */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Your Enterprise Profile
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-success">
                                  RM{" "}
                                  {(
                                    enterpriseData.annualRevenue / 1000000
                                  ).toFixed(1)}
                                  M
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Annual Revenue
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                  {enterpriseData.monthlyGrowth}%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Monthly Growth
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-success">
                                  {enterpriseData.paymentHistory}%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Payment History
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-success">
                                  {enterpriseData.creditRating}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Credit Rating
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Eligible Banks */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-success" />
                            Eligible Loan Products ({eligibleBanks.length})
                          </h3>
                          <div className="space-y-4">
                            {eligibleBanks.map((bank) => (
                              <Card
                                key={bank.id}
                                className="border-success/20 bg-success/5"
                              >
                                <CardContent className="p-6">
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                      <div className="text-3xl">
                                        {bank.bankLogo}
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-lg">
                                          {bank.bankName}
                                        </h4>
                                        <p className="text-muted-foreground">
                                          {bank.loanProduct}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant="default"
                                      className="bg-success text-success-foreground"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Eligible
                                    </Badge>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="text-center p-3 bg-background rounded-lg">
                                      <div className="text-lg font-semibold text-primary">
                                        {bank.interestRate}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Interest Rate
                                      </div>
                                    </div>
                                    <div className="text-center p-3 bg-background rounded-lg">
                                      <div className="text-lg font-semibold text-success">
                                        {bank.maxAmount}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Max Amount
                                      </div>
                                    </div>
                                    <div className="text-center p-3 bg-background rounded-lg">
                                      <div className="text-lg font-semibold text-secondary">
                                        {bank.processingTime}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Processing Time
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <h5 className="font-medium mb-2">
                                        Requirements Met:
                                      </h5>
                                      <ul className="space-y-1">
                                        {bank.requirements.map((req, idx) => (
                                          <li
                                            key={idx}
                                            className="text-sm flex items-center gap-2"
                                          >
                                            <CheckCircle className="h-3 w-3 text-success" />
                                            {req}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="font-medium mb-2">
                                        Key Benefits:
                                      </h5>
                                      <ul className="space-y-1">
                                        {bank.benefits.map((benefit, idx) => (
                                          <li
                                            key={idx}
                                            className="text-sm flex items-center gap-2"
                                          >
                                            <CheckCircle className="h-3 w-3 text-primary" />
                                            {benefit}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      className="flex-1"
                                      onClick={() =>
                                        window.open(
                                          `https://${bank.bankName
                                            .toLowerCase()
                                            .replace(
                                              " ",
                                              ""
                                            )}.com/business-loans`,
                                          "_blank"
                                        )
                                      }
                                    >
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Apply Now
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        alert(
                                          "More details about " +
                                            bank.loanProduct
                                        )
                                      }
                                    >
                                      Learn More
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Ineligible Banks */}
                        {ineligibleBanks.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <TrendingDown className="h-5 w-5 text-muted-foreground" />
                              Requirements Not Met ({ineligibleBanks.length})
                            </h3>
                            <div className="space-y-4">
                              {ineligibleBanks.map((bank) => (
                                <Card
                                  key={bank.id}
                                  className="border-muted bg-muted/20"
                                >
                                  <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                      <div className="flex items-center gap-3">
                                        <div className="text-3xl opacity-50">
                                          {bank.bankLogo}
                                        </div>
                                        <div>
                                          <h4 className="font-semibold text-lg text-muted-foreground">
                                            {bank.bankName}
                                          </h4>
                                          <p className="text-muted-foreground">
                                            {bank.loanProduct}
                                          </p>
                                        </div>
                                      </div>
                                      <Badge variant="secondary">
                                        Requirements Not Met
                                      </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                      <div className="text-center p-3 bg-background rounded-lg">
                                        <div className="text-lg font-semibold text-muted-foreground">
                                          {bank.interestRate}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          Interest Rate
                                        </div>
                                      </div>
                                      <div className="text-center p-3 bg-background rounded-lg">
                                        <div className="text-lg font-semibold text-muted-foreground">
                                          {bank.maxAmount}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          Max Amount
                                        </div>
                                      </div>
                                      <div className="text-center p-3 bg-background rounded-lg">
                                        <div className="text-lg font-semibold text-muted-foreground">
                                          {bank.processingTime}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          Processing Time
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h5 className="font-medium mb-2 text-muted-foreground">
                                        Missing Requirements:
                                      </h5>
                                      <ul className="space-y-1">
                                        {enterpriseData.annualRevenue <
                                          bank.minRevenue && (
                                          <li className="text-sm flex items-center gap-2">
                                            <TrendingDown className="h-3 w-3 text-destructive" />
                                            Need RM{" "}
                                            {(
                                              bank.minRevenue / 1000000
                                            ).toFixed(1)}
                                            M+ annual revenue (Current: RM{" "}
                                            {(
                                              enterpriseData.annualRevenue /
                                              1000000
                                            ).toFixed(1)}
                                            M)
                                          </li>
                                        )}
                                        {enterpriseData.monthlyGrowth <
                                          bank.minGrowth && (
                                          <li className="text-sm flex items-center gap-2">
                                            <TrendingDown className="h-3 w-3 text-destructive" />
                                            Need {bank.minGrowth}%+ monthly
                                            growth (Current:{" "}
                                            {enterpriseData.monthlyGrowth}%)
                                          </li>
                                        )}
                                        {enterpriseData.paymentHistory <
                                          bank.minPaymentHistory && (
                                          <li className="text-sm flex items-center gap-2">
                                            <TrendingDown className="h-3 w-3 text-destructive" />
                                            Need {bank.minPaymentHistory}%+
                                            payment history (Current:{" "}
                                            {enterpriseData.paymentHistory}%)
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("documentManagement")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t("centralizedDocumentSystem")}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("contracts")}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("invoice")}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("reports")}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("legal")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t("multiSiteManagement")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("manageMultipleLocations")}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("headquarters")}</span>
                    <Badge>{t("active")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("branchOffice")} 1</span>
                    <Badge>{t("active")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("branchOffice")} 2</span>
                    <Badge variant="outline">{t("planning")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  {t("automationSuite")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t("workflowAutomation")}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("invoiceProcessing")}</span>
                    <Badge variant="default">{t("active")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("inventoryManagement")}</span>
                    <Badge variant="default">{t("active")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("customerOnboarding")}</span>
                    <Badge variant="outline">{t("setup")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t("resourcePlanning")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{t("erpIntegration")}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("humanResources")}</span>
                    <Badge variant="default">{t("integrated")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("supplyChain")}</span>
                    <Badge variant="default">{t("integrated")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>{t("financialManagement")}</span>
                    <Badge variant="default">{t("integrated")}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <EnterpriseAnalyticsSummary />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          {/* Available Services By Category */}
          {Object.entries(servicesByCategory).map(([category, services]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {category} {t("services")}
              </h2>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.id}
                      className="shadow-soft hover:shadow-medium transition-all cursor-pointer group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {service.title}
                              </CardTitle>
                              <Badge variant="default" className="mt-1">
                                {service.price}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-4">
                          {service.description}
                        </p>

                        <Button className="w-full group-hover:scale-105 transition-transform">
                          {t("getStarted")}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
