import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Globe,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Receipt,
  Calculator,
  Smartphone,
  Shield,
  Brain,
} from "lucide-react";

export function SmallEnterpriseDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const recentInvoices = [
    {
      id: "INV-001",
      client: "ABC Corp",
      amount: 2500.0,
      status: "paid",
      date: "2024-01-15",
    },
    {
      id: "INV-002",
      client: "XYZ Ltd",
      amount: 1800.0,
      status: "pending",
      date: "2024-01-14",
    },
    {
      id: "INV-003",
      client: "DEF Inc",
      amount: 3200.0,
      status: "overdue",
      date: "2024-01-10",
    },
  ];

  // 小型企业可用服务
  const smallServices = [
    // 基础服务（微型企业也可用）
    {
      id: "qr-payments",
      title: t("qrPaymentGateway"),
      description: t("acceptPaymentsViaQr"),
      icon: Smartphone,
      price: "RM 15/month",
      category: t("paymentCategory"),
    },
    {
      id: "basic-records",
      title: t("recordKeeping"),
      description: t("basicBusinessRecord"),
      icon: FileText,
      price: "RM 25/month",
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
      price: "RM 50/month",
      category: t("accountingCategory"),
    },
    {
      id: "website-builder",
      title: t("websiteBuilder"),
      description: t("professionalWebsiteTemplates"),
      icon: Globe,
      price: "RM 80/month",
      category: t("marketingCategory"),
    },
    {
      id: "accounting-suite",
      title: t("accountingServices"),
      description: t("fullAccountingBookkeeping"),
      icon: Calculator,
      price: "RM 120/month",
      category: t("accountingCategory"),
    },
    {
      id: "credit-analysis",
      title: t("creditAnalysis"),
      description: t("aiPoweredCreditScore"),
      icon: Brain,
      price: "RM 40/month",
      category: t("financeCategory"),
    },
  ];

  // 按类别分组服务
  const servicesByCategory = smallServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof smallServices>);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("welcome")} {t("to")} {t("small")}
        </h1>
        <p className="text-muted-foreground">{t("advancedToolsEstablished")}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("monthlyRevenue")}
                </p>
                <p className="text-2xl font-bold">RM 12,450</p>
                <p className="text-sm text-success">+15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Receipt className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("invoicesSent")}
                </p>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">
                  {t("thisMonth")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("activeClients")}
                </p>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-success">+3 {t("newClients")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("growthRate")}
                </p>
                <p className="text-2xl font-bold">18.5%</p>
                <p className="text-sm text-success">{t("yearOverYear")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* E-Invoicing Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              {t("eInvoicing")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.client}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    RM {invoice.amount.toFixed(2)}
                  </p>
                  <Badge
                    variant={
                      invoice.status === "paid"
                        ? "default"
                        : invoice.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => navigate("/small-enterprise/e-invoice?create=true")}>
                {t("createNewInvoice")}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => navigate("/small-enterprise/e-invoice")}>
                {t("viewAllInvoices")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Website Builder */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t("websiteBuilder")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">{t("buildYourWebsite")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("createProfessionalWebsite")}
              </p>
              <Button>{t("getStarted")}</Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("websiteVisits")}:</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("pageViews")}:</span>
                <span className="font-semibold">3,891</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {t("businessAnalytics")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">{t("analyticsCharts")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
                          <Badge variant="secondary" className="mt-1">
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

      {/* Upgrade Notice */}
      <Card className="shadow-soft bg-white border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">
            {t("unlockMoreServices")}
          </h3>
          <p className="text-muted-foreground mb-4">{t("upgradeYourPlan")}</p>
          <Button>{t("upgradeToMediumEnterprise")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
