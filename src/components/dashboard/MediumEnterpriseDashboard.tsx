import { useTranslation } from 'react-i18next';
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
  Briefcase
} from "lucide-react";

export function MediumEnterpriseDashboard() {
  const { t } = useTranslation();

  const kpis = [
    { label: "Annual Revenue", value: "RM 2.4M", change: "+22%", icon: DollarSign, color: "text-success" },
    { label: "Monthly Growth", value: "15.2%", change: "+3.1%", icon: TrendingUp, color: "text-primary" },
    { label: "Active Projects", value: "12", change: "+4", icon: Briefcase, color: "text-secondary" },
    { label: "Team Members", value: "28", change: "+5", icon: Users, color: "text-accent" },
    { label: "Client Satisfaction", value: "96%", change: "+2%", icon: Target, color: "text-success" },
    { label: "Invoices Processed", value: "156", change: "+12", icon: Receipt, color: "text-primary" }
  ];

  const recentProjects = [
    { id: "PRJ-001", name: "Digital Transformation", client: "Tech Corp", progress: 85, status: "active" },
    { id: "PRJ-002", name: "E-commerce Platform", client: "Retail Ltd", progress: 60, status: "active" },
    { id: "PRJ-003", name: "Mobile App Development", client: "Startup Inc", progress: 30, status: "planning" },
    { id: "PRJ-004", name: "Data Analytics", client: "Finance Co", progress: 100, status: "completed" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t('welcome')} to {t('medium')}</h1>
        <p className="text-muted-foreground">Enterprise-grade tools for established businesses</p>
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
                    <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Revenue Overview */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground">Revenue Chart</p>
                </div>
              </CardContent>
            </Card>

            {/* Active Projects Status */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Project Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active</span>
                  <Badge variant="default">8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Planning</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Completed</span>
                  <Badge variant="outline">15</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Performance
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
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge variant={
                          project.status === 'completed' ? 'default' :
                          project.status === 'active' ? 'secondary' : 'outline'
                        }>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
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
                  {t('creditAnalysis')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-success">A+</div>
                  <p className="text-muted-foreground">Excellent Credit Rating</p>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Document Management</h3>
                <p className="text-sm text-muted-foreground">Centralized document system</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-3 text-secondary" />
                <h3 className="font-semibold mb-2">Multi-Site Management</h3>
                <p className="text-sm text-muted-foreground">Manage multiple locations</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-2">Automation Suite</h3>
                <p className="text-sm text-muted-foreground">Workflow automation</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-success" />
                <h3 className="font-semibold mb-2">Resource Planning</h3>
                <p className="text-sm text-muted-foreground">ERP integration</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Advanced Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold mb-2">Advanced Analytics</p>
                  <p className="text-muted-foreground">Real-time business intelligence and predictive analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}