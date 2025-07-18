import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import QRCode from "react-qr-code";
import {
  QrCode,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  AlertCircle,
  Settings,
  ArrowUpDown,
  Wallet,
  History,
  Copy,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

export function DigitalPaymentPage() {
  const { t } = useTranslation();
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [isQrActive, setIsQrActive] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState("");

  // Mock data for demonstration
  const businessInfo = {
    businessName: "ABC Trading Sdn Bhd",
    registrationNumber: "202301234567",
    duitnowId: "01123456789",
    merchantId: "M123456789",
    bankAccount: "1234567890",
    bankName: "Maybank Berhad",
    accountHolder: "ABC TRADING SDN BHD",
  };

  const paymentMethods = [
    {
      id: "duitnow-qr",
      name: "DuitNow QR",
      description: "Accept payments via DuitNow QR code",
      icon: QrCode,
      enabled: true,
      fees: "Free for first 1000 transactions",
      dailyLimit: "RM 100,000",
    },
    {
      id: "online-banking",
      name: "Online Banking",
      description: "Accept payments via online banking transfer",
      icon: Building2,
      enabled: true,
      fees: "RM 0.50 per transaction",
      dailyLimit: "RM 500,000",
    },
    {
      id: "e-wallet",
      name: "E-Wallet",
      description: "Accept payments from various e-wallets",
      icon: Smartphone,
      enabled: false,
      fees: "2.5% per transaction",
      dailyLimit: "RM 50,000",
    },
    {
      id: "credit-card",
      name: "Credit/Debit Card",
      description: "Accept card payments",
      icon: CreditCard,
      enabled: false,
      fees: "2.8% per transaction",
      dailyLimit: "RM 200,000",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN001",
      date: "2024-01-20",
      time: "14:30",
      type: "receive",
      amount: 125.50,
      method: "DuitNow QR",
      status: "completed",
      customer: "Customer A",
    },
    {
      id: "TXN002",
      date: "2024-01-20",
      time: "12:15",
      type: "receive",
      amount: 89.00,
      method: "Online Banking",
      status: "completed",
      customer: "Customer B",
    },
    {
      id: "TXN003",
      date: "2024-01-19",
      time: "16:45",
      type: "send",
      amount: 500.00,
      method: "DuitNow Transfer",
      status: "completed",
      customer: "Supplier XYZ",
    },
    {
      id: "TXN004",
      date: "2024-01-19",
      time: "11:20",
      type: "receive",
      amount: 250.75,
      method: "DuitNow QR",
      status: "pending",
      customer: "Customer C",
    },
  ];

  const generateQrData = (amount?: string) => {
    const qrData = {
      merchantId: businessInfo.merchantId,
      merchantName: businessInfo.businessName,
      duitnowId: businessInfo.duitnowId,
      amount: amount || "0.00",
      currency: "MYR",
      timestamp: new Date().toISOString(),
    };
    return JSON.stringify(qrData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const downloadQr = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "duitnow-qr.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2">{t("Digital Payment Integration")}</h1>
        <p className="text-muted-foreground">
          {t("Manage your DuitNow QR and digital payment methods")}
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">{t("Overview")}</TabsTrigger>
          <TabsTrigger value="qr-code">{t("qrCode")}</TabsTrigger>
          <TabsTrigger value="bank-info">{t("Bank Info")}</TabsTrigger>
          <TabsTrigger value="transactions">{t("transactions")}</TabsTrigger>
          <TabsTrigger value="settings">{t("Settings")}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">DuitNow Status</p>
                    <p className="text-xl font-bold">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ArrowUpDown className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Transactions</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-xl font-bold">RM 1,250</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <History className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

            {/* Available Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>{t("Available Payment Methods")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Card key={method.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{method.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant={method.enabled ? "default" : "secondary"}>
                            {method.enabled ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Fees:</span>
                            <span>{method.fees}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Daily Limit:</span>
                            <span>{method.dailyLimit}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* QR Code Tab */}
        <TabsContent value="qr-code" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* QR Code Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  {t("DuitNow QR Code")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Payment Amount (Optional)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty for dynamic amount
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="qr-active"
                    checked={isQrActive}
                    onCheckedChange={setIsQrActive}
                  />
                  <Label htmlFor="qr-active">QR Code Active</Label>
                </div>

                {isQrActive && (
                  <div className="text-center space-y-4">
                    <div className="bg-white p-4 rounded-lg inline-block">
                      <QRCode
                        id="qr-code"
                        value={generateQrData(paymentAmount)}
                        size={200}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={downloadQr}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateQrData(paymentAmount))}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Data
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* QR Usage Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>{t("How to Use DuitNow QR")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">{t("Display QR Code")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("Show the QR code to your customers at checkout")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">{t("Customer Scans")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("Customer scans with any banking app that supports DuitNow QR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">{t("Instant Payment")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("Receive payment instantly in your bank account")}
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    DuitNow QR works with all major Malaysian banks and e-wallets
                    including Maybank, CIMB, Public Bank, Touch 'n Go eWallet,
                    GrabPay, and more.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bank Info Tab */}
        <TabsContent value="bank-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Bank Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Business Name</Label>
                  <div className="p-3 bg-muted rounded-md font-medium">
                    {businessInfo.businessName}
                  </div>
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <div className="p-3 bg-muted rounded-md font-medium">
                    {businessInfo.registrationNumber}
                  </div>
                </div>
                <div>
                  <Label>DuitNow ID</Label>
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-muted rounded-md font-medium flex-1">
                      {businessInfo.duitnowId}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(businessInfo.duitnowId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Merchant ID</Label>
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-muted rounded-md font-medium flex-1">
                      {businessInfo.merchantId}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(businessInfo.merchantId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Bank Account Details</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBankDetails(!showBankDetails)}
                  >
                    {showBankDetails ? (
                      <EyeOff className="h-4 w-4 mr-2" />
                    ) : (
                      <Eye className="h-4 w-4 mr-2" />
                    )}
                    {showBankDetails ? "Hide" : "Show"}
                  </Button>
                </div>

                {showBankDetails && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Bank Name</Label>
                      <div className="p-3 bg-muted rounded-md font-medium">
                        {businessInfo.bankName}
                      </div>
                    </div>
                    <div>
                      <Label>Account Holder</Label>
                      <div className="p-3 bg-muted rounded-md font-medium">
                        {businessInfo.accountHolder}
                      </div>
                    </div>
                    <div>
                      <Label>Account Number</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-3 bg-muted rounded-md font-medium flex-1">
                          •••• •••• {businessInfo.bankAccount.slice(-4)}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(businessInfo.bankAccount)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "receive"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <ArrowUpDown
                          className={`h-4 w-4 ${
                            transaction.type === "receive" ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.customer}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.time}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "receive"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {transaction.type === "receive" ? "+" : "-"}RM{" "}
                        {transaction.amount.toFixed(2)}
                      </p>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch checked={method.enabled} />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Payment Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for successful payments
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Failed Payment Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when payments fail
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Daily Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Daily report of transactions
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
