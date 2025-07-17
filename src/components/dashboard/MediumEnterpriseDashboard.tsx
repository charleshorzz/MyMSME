import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Calculator,
  Smartphone,
  Brain,
  Cloud,
} from "lucide-react";

export function MediumEnterpriseDashboard() {
  const { t } = useTranslation();

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
      status: "active",
    },
    {
      id: "PRJ-002",
      name: "E-commerce Platform",
      client: "Retail Ltd",
      progress: 60,
      status: "active",
    },
    {
      id: "PRJ-003",
      name: "Mobile App Development",
      client: "Startup Inc",
      progress: 30,
      status: "planning",
    },
    {
      id: "PRJ-004",
      name: "Data Analytics",
      client: "Finance Co",
      progress: 100,
      status: "completed",
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
    // 仅中型企业服务
    {
      id: "enterprise-crm",
      title: t("enterpriseCrm"),
      description: t("advancedCustomerRelationship"),
      icon: Users,
      price: "RM 200/month",
      category: t("managementCategory"),
    },
    {
      id: "business-intelligence",
      title: t("businessIntelligence"),
      description: t("advancedAnalyticsReporting"),
      icon: BarChart3,
      price: "RM 150/month",
      category: t("analyticsCategory"),
    },
    {
      id: "project-management",
      title: t("projectManagementSuite"),
      description: t("comprehensiveProjectManagement"),
      icon: Briefcase,
      price: "RM 180/month",
      category: t("managementCategory"),
    },
    {
      id: "multi-location",
      title: t("multiLocationManagement"),
      description: t("manageMultipleBusinessLocations"),
      icon: Building2,
      price: "RM 250/month",
      category: t("operationsCategory"),
    },
    {
      id: "automation-suite",
      title: t("businessAutomation"),
      description: t("workflowAutomationIntegration"),
      icon: Zap,
      price: "RM 300/month",
      category: t("automationCategory"),
    },
    {
      id: "cloud-backup",
      title: t("enterpriseCloudBackup"),
      description: t("secureCloudStorageBackup"),
      icon: Cloud,
      price: "RM 100/month",
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
          {t("welcome")} to {t("medium")}
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <span className="text-sm">Productivity</span>
                    <span className="font-semibold text-success">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Efficiency</span>
                    <span className="font-semibold text-primary">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Satisfaction</span>
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
              <CardTitle>Active Projects</CardTitle>
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
                            project.status === "completed"
                              ? "default"
                              : project.status === "active"
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
                          <span>Progress</span>
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
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>Total Assets</span>
                    <span className="font-semibold">RM 5.2M</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span>Monthly Expenses</span>
                    <span className="font-semibold">RM 180K</span>
                  </div>
                  <div className="flex justify-between p-3 bg-success/10 rounded-lg">
                    <span>Net Profit</span>
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
                    Excellent Credit Rating
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payment History</span>
                      <span className="text-success">98%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Credit Utilization</span>
                      <span className="text-success">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Business Stability</span>
                      <span className="text-success">Excellent</span>
                    </div>
                  </div>
                  <Button className="w-full">Apply for Business Loan</Button>
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
                  Document Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Centralized document system
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Contracts
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Invoices
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Reports
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Legal
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Multi-Site Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage multiple locations
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Headquarters</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Branch Office 1</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Branch Office 2</span>
                    <Badge variant="outline">Planning</Badge>
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
                  Automation Suite
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Workflow automation
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Invoice Processing</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Inventory Management</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Customer Onboarding</span>
                    <Badge variant="outline">Setup</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Resource Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">ERP integration</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Human Resources</span>
                    <Badge variant="default">Integrated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Supply Chain</span>
                    <Badge variant="default">Integrated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>Financial Management</span>
                    <Badge variant="default">Integrated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Advanced Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time business intelligence and predictive analytics
              </p>
              <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Advanced analytics charts and visualizations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
