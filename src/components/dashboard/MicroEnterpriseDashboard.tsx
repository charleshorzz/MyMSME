import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import {
  QrCode,
  TrendingUp,
  Clock,
  DollarSign,
  FileText,
  Smartphone,
  Shield,
  Receipt,
} from "lucide-react";

export function MicroEnterpriseDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const qrData = JSON.stringify({
    businessId: "MICRO001",
    name: "Sample Micro Business",
    type: "micro",
  });

  const transactions = [
    {
      id: 1,
      description: "Payment received",
      amount: 50.0,
      time: "2 hours ago",
    },
    {
      id: 2,
      description: "Service payment",
      amount: 25.0,
      time: "5 hours ago",
    },
    { id: 3, description: "Product sale", amount: 75.0, time: "1 day ago" },
  ];

  // 微型企业可用服务
  const microServices = [
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
      id: "e-invoicing",
      title: t("eInvoicing"),
      description: t("automatedEInvoicing"),
      icon: Receipt,
      price: "RM 35/month",
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
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("welcome")} {t("to")} {t("micro")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {t("qrCode")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={qrData} size={160} />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {t("shareQrCode")}
            </p>
            <Button variant="outline" className="w-full">
              {t("downloadQrCode")}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t("quickStats")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm">{t("todaysSales")}</span>
              </div>
              <span className="font-semibold">RM 150.00</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{t("recentActivity")}</span>
              </div>
              <span className="font-semibold">3 transactions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>{t("transactions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.time}
                  </p>
                </div>
                <span className="font-semibold text-success">
                  +RM {transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            {t("viewAll")} {t("transactions")}
          </Button>
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
        <CardContent className="space-y-4">
          <div className="text-center py-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <Receipt className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">{t("Manage Invoices")}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("Create And Manage Invoices")}
            </p>
            <div className="flex gap-2 justify-center">
              <Button size="sm" onClick={() => navigate("/micro-enterprise/e-invoice?create=true")}>
                {t("Create Invoice")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/micro-enterprise/e-invoice")}>
                {t("View Invoices")}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t("invoicesSent")}:</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t("totalValue")}:</span>
              <span className="font-semibold">RM 1,250.00</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("services")}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {microServices.map((service) => {
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
                        <Badge variant="outline" className="mt-1">
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

      {/* Upgrade Notice */}
      <Card className="shadow-soft bg-white border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">
            {t("unlockMoreServices")}
          </h3>
          <p className="text-muted-foreground mb-4">{t("upgradeYourPlan")}</p>
          <Button variant="outline">{t("upgradeToSmallEnterprise")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
