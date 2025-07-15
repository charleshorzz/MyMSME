import { useTranslation } from 'react-i18next';
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
  Receipt
} from "lucide-react";

export function SmallEnterpriseDashboard() {
  const { t } = useTranslation();

  const recentInvoices = [
    { id: "INV-001", client: "ABC Corp", amount: 2500.00, status: "paid", date: "2024-01-15" },
    { id: "INV-002", client: "XYZ Ltd", amount: 1800.00, status: "pending", date: "2024-01-14" },
    { id: "INV-003", client: "DEF Inc", amount: 3200.00, status: "overdue", date: "2024-01-10" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t('welcome')} to {t('small')}</h1>
        <p className="text-muted-foreground">Advanced tools for growing businesses</p>
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
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
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
                <p className="text-sm text-muted-foreground">Invoices Sent</p>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">This month</p>
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
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-success">+3 new clients</p>
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
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-2xl font-bold">18.5%</p>
                <p className="text-sm text-success">Year over year</p>
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
              <FileText className="h-5 w-5" />
              {t('eInvoicing')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">RM {invoice.amount.toFixed(2)}</p>
                  <Badge variant={
                    invoice.status === 'paid' ? 'default' : 
                    invoice.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full">Create New Invoice</Button>
          </CardContent>
        </Card>

        {/* Website Builder */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('websiteBuilder')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Build Your Website</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a professional website for your business
              </p>
              <Button>Get Started</Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Website visits this month:</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Page views:</span>
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
            Business Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Analytics charts will be displayed here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">{t('accountingServices')}</h3>
            <p className="text-sm text-muted-foreground">Full accounting suite</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Receipt className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <h3 className="font-semibold mb-2">{t('invoiceManagement')}</h3>
            <p className="text-sm text-muted-foreground">Automated invoicing</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-3 text-accent" />
            <h3 className="font-semibold mb-2">{t('websiteHosting')}</h3>
            <p className="text-sm text-muted-foreground">Professional hosting</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-success" />
            <h3 className="font-semibold mb-2">{t('creditAnalysis')}</h3>
            <p className="text-sm text-muted-foreground">AI-powered insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}