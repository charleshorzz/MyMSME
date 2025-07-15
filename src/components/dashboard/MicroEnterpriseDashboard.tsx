import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from 'react-qr-code';
import { QrCode, TrendingUp, Clock, DollarSign } from "lucide-react";

export function MicroEnterpriseDashboard() {
  const { t } = useTranslation();

  const qrData = JSON.stringify({
    businessId: "MICRO001",
    name: "Sample Micro Business",
    type: "micro"
  });

  const transactions = [
    { id: 1, description: "Payment received", amount: 50.00, time: "2 hours ago" },
    { id: 2, description: "Service payment", amount: 25.00, time: "5 hours ago" },
    { id: 3, description: "Product sale", amount: 75.00, time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t('welcome')} to {t('micro')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* QR Code Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              {t('qrCode')}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={qrData} size={160} />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Share this QR code for quick payments and business identification
            </p>
            <Button variant="outline" className="w-full">
              Download QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm">Today's Sales</span>
              </div>
              <span className="font-semibold">RM 150.00</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Recent Activity</span>
              </div>
              <span className="font-semibold">3 transactions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>{t('transactions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.time}</p>
                </div>
                <span className="font-semibold text-success">+RM {transaction.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Transactions
          </Button>
        </CardContent>
      </Card>

      {/* Quick Services */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">{t('recordKeeping')}</h3>
            <p className="text-sm text-muted-foreground">Track your business records</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Payment Gateway</h3>
            <p className="text-sm text-muted-foreground">Accept digital payments</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Basic Reports</h3>
            <p className="text-sm text-muted-foreground">View simple business reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}