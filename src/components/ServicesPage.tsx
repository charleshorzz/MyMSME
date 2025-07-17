import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Globe,
  Calculator,
  Receipt,
  Brain,
  Building,
  CreditCard,
  Smartphone,
  Cloud,
  Zap,
  Shield,
  Users,
  BarChart3,
  Briefcase,
} from "lucide-react";

interface ServicesPageProps {
  userLevel: "micro" | "small" | "medium";
}

export function ServicesPage({ userLevel }: ServicesPageProps) {
  const { t } = useTranslation();

  const allServices = [
    // Basic Services (All levels)
    {
      id: "qr-payments",
      title: t("qrPaymentGateway"),
      description: t("acceptPaymentsViaQr"),
      icon: Smartphone,
      levels: ["micro", "small", "medium"],
      price: "RM 15/month",
      category: t("paymentCategory"),
    },
    {
      id: "basic-records",
      title: t("recordKeeping"),
      description: t("basicBusinessRecord"),
      icon: FileText,
      levels: ["micro", "small", "medium"],
      price: "RM 25/month",
      category: t("accountingCategory"),
    },
    {
      id: "ssm-documents",
      title: t("ssmCertificate"),
      description: t("digitalSsmCertificate"),
      icon: Shield,
      levels: ["micro", "small", "medium"],
      price: "Free",
      category: t("documentsCategory"),
    },

    // Small & Medium Services
    {
      id: "e-invoicing",
      title: t("eInvoicing"),
      description: "Automated e-invoicing system",
      icon: Receipt,
      levels: ["small", "medium"],
      price: "RM 50/month",
      category: t("accountingCategory"),
    },
    {
      id: "website-builder",
      title: t("websiteBuilder"),
      description: "Professional website templates",
      icon: Globe,
      levels: ["small", "medium"],
      price: "RM 80/month",
      category: t("marketingCategory"),
    },
    {
      id: "accounting-suite",
      title: t("accountingServices"),
      description: "Full accounting and bookkeeping",
      icon: Calculator,
      levels: ["small", "medium"],
      price: "RM 120/month",
      category: t("accountingCategory"),
    },
    {
      id: "credit-analysis",
      title: t("creditAnalysis"),
      description: "AI-powered credit score analysis",
      icon: Brain,
      levels: ["small", "medium"],
      price: "RM 40/month",
      category: t("financeCategory"),
    },

    // Medium Only Services
    {
      id: "enterprise-crm",
      title: "Enterprise CRM",
      description: "Advanced customer relationship management",
      icon: Users,
      levels: ["medium"],
      price: "RM 200/month",
      category: t("managementCategory"),
    },
    {
      id: "business-intelligence",
      title: "Business Intelligence",
      description: "Advanced analytics and reporting",
      icon: BarChart3,
      levels: ["medium"],
      price: "RM 150/month",
      category: t("analyticsCategory"),
    },
    {
      id: "project-management",
      title: "Project Management Suite",
      description: "Comprehensive project management tools",
      icon: Briefcase,
      levels: ["medium"],
      price: "RM 180/month",
      category: t("managementCategory"),
    },
    {
      id: "multi-location",
      title: "Multi-Location Management",
      description: "Manage multiple business locations",
      icon: Building,
      levels: ["medium"],
      price: "RM 250/month",
      category: t("operationsCategory"),
    },
    {
      id: "automation-suite",
      title: "Business Automation",
      description: "Workflow automation and integration",
      icon: Zap,
      levels: ["medium"],
      price: "RM 300/month",
      category: t("automationCategory"),
    },
    {
      id: "cloud-backup",
      title: "Enterprise Cloud Backup",
      description: "Secure cloud storage and backup",
      icon: Cloud,
      levels: ["medium"],
      price: "RM 100/month",
      category: t("infrastructureCategory"),
    },
  ];

  const availableServices = allServices.filter((service) =>
    service.levels.includes(userLevel)
  );

  const servicesByCategory = availableServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof availableServices>);

  const getLevelBadgeColor = (levels: string[]) => {
    if (levels.includes("medium")) return "default";
    if (levels.includes("small")) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t("services")}</h1>
        <p className="text-muted-foreground">
          {t("servicesAvailableFor")} {t(userLevel)} businesses
        </p>
        <Badge variant={getLevelBadgeColor([userLevel])} className="mt-2">
          {t(userLevel)} {t("package")}
        </Badge>
      </div>

      {/* Service Categories */}
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
                          <Badge
                            variant={getLevelBadgeColor(service.levels)}
                            className="mt-1"
                          >
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

                    <div className="space-y-3">
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        {t("getStarted")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Upgrade Notice for Lower Tiers */}
      {userLevel !== "medium" && (
        <Card className="shadow-soft bg-white border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">
              {t("unlockMoreServices")}
            </h3>
            <p className="text-muted-foreground mb-4">{t("upgradeYourPlan")}</p>
            <div className="flex justify-center gap-3">
              {userLevel === "micro" && (
                <Button variant="outline">
                  {t("upgradeToSmallEnterprise")}
                </Button>
              )}
              <Button>{t("upgradeToMediumEnterprise")}</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
