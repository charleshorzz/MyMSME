import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Briefcase,
  Building2,
  BarChart3,
  Brain,
  Calendar,
  Activity,
  PieChart,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  CreditCard,
  FileText,
  Globe
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';

interface ProjectMetrics {
  month: string;
  activeProjects: number;
  completedProjects: number;
  revenue: number;
  teamUtilization: number;
  clientSatisfaction: number;
}

interface DepartmentData {
  department: string;
  budget: number;
  spent: number;
  employees: number;
  projects: number;
  efficiency: number;
}

interface ClientData {
  name: string;
  value: number;
  projects: number;
  satisfaction: number;
}

interface AnalyticsData {
  period: string;
  totalRevenue: number;
  totalProjects: number;
  activeClients: number;
  teamMembers: number;
  projectMetrics?: ProjectMetrics[];
  departmentData?: DepartmentData[];
  clientDistribution?: ClientData[];
  kpiTrends?: any[];
}

// Mock data for enterprise analytics
const mockAnalyticsData: Record<string, AnalyticsData> = {
  "quarter": {
    period: "This Quarter",
    totalRevenue: 2400000,
    totalProjects: 12,
    activeClients: 8,
    teamMembers: 28,
    projectMetrics: [
      { month: "Jan", activeProjects: 8, completedProjects: 3, revenue: 750000, teamUtilization: 85, clientSatisfaction: 94 },
      { month: "Feb", activeProjects: 10, completedProjects: 2, revenue: 820000, teamUtilization: 88, clientSatisfaction: 96 },
      { month: "Mar", activeProjects: 12, completedProjects: 4, revenue: 830000, teamUtilization: 92, clientSatisfaction: 98 },
    ],
    departmentData: [
      { department: "IT Development", budget: 500000, spent: 420000, employees: 12, projects: 5, efficiency: 94 },
      { department: "Consulting", budget: 300000, spent: 280000, employees: 8, projects: 4, efficiency: 88 },
      { department: "Design", budget: 200000, spent: 160000, employees: 5, projects: 3, efficiency: 92 },
      { department: "Management", budget: 150000, spent: 135000, employees: 3, projects: 8, efficiency: 96 },
    ],
    clientDistribution: [
      { name: "Tech Corp", value: 850000, projects: 3, satisfaction: 98 },
      { name: "Retail Ltd", value: 620000, projects: 2, satisfaction: 95 },
      { name: "Finance Co", value: 480000, projects: 2, satisfaction: 94 },
      { name: "Startup Inc", value: 320000, projects: 1, satisfaction: 92 },
      { name: "Others", value: 130000, projects: 4, satisfaction: 93 },
    ],
  },
  "year": {
    period: "This Year",
    totalRevenue: 8900000,
    totalProjects: 45,
    activeClients: 24,
    teamMembers: 28,
    projectMetrics: [
      { month: "Q1", activeProjects: 30, completedProjects: 9, revenue: 2400000, teamUtilization: 88, clientSatisfaction: 96 },
      { month: "Q2", activeProjects: 32, completedProjects: 11, revenue: 2650000, teamUtilization: 91, clientSatisfaction: 94 },
      { month: "Q3", activeProjects: 28, completedProjects: 13, revenue: 2180000, teamUtilization: 86, clientSatisfaction: 97 },
      { month: "Q4", activeProjects: 25, completedProjects: 12, revenue: 1670000, teamUtilization: 89, clientSatisfaction: 95 },
    ],
    departmentData: [
      { department: "IT Development", budget: 2000000, spent: 1680000, employees: 12, projects: 20, efficiency: 94 },
      { department: "Consulting", budget: 1200000, spent: 1120000, employees: 8, projects: 15, efficiency: 88 },
      { department: "Design", budget: 800000, spent: 640000, employees: 5, projects: 10, efficiency: 92 },
      { department: "Management", budget: 600000, spent: 540000, employees: 3, projects: 32, efficiency: 96 },
    ],
    clientDistribution: [
      { name: "Tech Corp", value: 2850000, projects: 12, satisfaction: 98 },
      { name: "Retail Ltd", value: 2120000, projects: 8, satisfaction: 95 },
      { name: "Finance Co", value: 1680000, projects: 7, satisfaction: 94 },
      { name: "Startup Inc", value: 1320000, projects: 5, satisfaction: 92 },
      { name: "Others", value: 930000, projects: 13, satisfaction: 93 },
    ],
  },
  "month": {
    period: "This Month",
    totalRevenue: 830000,
    totalProjects: 12,
    activeClients: 8,
    teamMembers: 28,
    projectMetrics: [
      { month: "Week 1", activeProjects: 10, completedProjects: 1, revenue: 185000, teamUtilization: 89, clientSatisfaction: 96 },
      { month: "Week 2", activeProjects: 11, completedProjects: 0, revenue: 220000, teamUtilization: 92, clientSatisfaction: 97 },
      { month: "Week 3", activeProjects: 12, completedProjects: 2, revenue: 245000, teamUtilization: 94, clientSatisfaction: 98 },
      { month: "Week 4", activeProjects: 12, completedProjects: 1, revenue: 180000, teamUtilization: 91, clientSatisfaction: 97 },
    ],
    departmentData: [
      { department: "IT Development", budget: 166667, spent: 140000, employees: 12, projects: 5, efficiency: 94 },
      { department: "Consulting", budget: 100000, spent: 93333, employees: 8, projects: 4, efficiency: 88 },
      { department: "Design", budget: 66667, spent: 53333, employees: 5, projects: 3, efficiency: 92 },
      { department: "Management", budget: 50000, spent: 45000, employees: 3, projects: 8, efficiency: 96 },
    ],
    clientDistribution: [
      { name: "Tech Corp", value: 285000, projects: 3, satisfaction: 98 },
      { name: "Retail Ltd", value: 212000, projects: 2, satisfaction: 95 },
      { name: "Finance Co", value: 168000, projects: 2, satisfaction: 94 },
      { name: "Startup Inc", value: 132000, projects: 1, satisfaction: 92 },
      { name: "Others", value: 33000, projects: 4, satisfaction: 93 },
    ],
  },
};

// AI insights generator for enterprise analytics
const generateEnterpriseInsights = (data: AnalyticsData) => {
  const insights = [];
  const { projectMetrics, departmentData, clientDistribution } = data;

  // Project performance insights
  if (projectMetrics && projectMetrics.length > 0) {
    const latestMetrics = projectMetrics[projectMetrics.length - 1];
    const previousMetrics = projectMetrics[projectMetrics.length - 2];
    
    if (previousMetrics) {
      const revenueGrowth = ((latestMetrics.revenue - previousMetrics.revenue) / previousMetrics.revenue) * 100;
      
      if (revenueGrowth > 10) {
        insights.push({
          type: "success",
          title: "Strong Revenue Growth",
          message: `Revenue increased by ${revenueGrowth.toFixed(1)}% compared to previous period. Consider scaling successful project types.`,
          icon: TrendingUp
        });
      } else if (revenueGrowth < -5) {
        insights.push({
          type: "warning",
          title: "Revenue Decline Alert",
          message: `Revenue decreased by ${Math.abs(revenueGrowth).toFixed(1)}%. Review project pipeline and client retention strategies.`,
          icon: TrendingDown
        });
      }
    }

    if (latestMetrics.teamUtilization > 95) {
      insights.push({
        type: "warning",
        title: "Team Overutilization",
        message: `Team utilization at ${latestMetrics.teamUtilization}%. Consider hiring additional staff or optimizing workload distribution.`,
        icon: Users
      });
    } else if (latestMetrics.teamUtilization < 70) {
      insights.push({
        type: "info",
        title: "Team Capacity Available",
        message: `Team utilization at ${latestMetrics.teamUtilization}%. Good opportunity to take on new projects or invest in training.`,
        icon: Target
      });
    }

    if (latestMetrics.clientSatisfaction > 95) {
      insights.push({
        type: "success",
        title: "Excellent Client Satisfaction",
        message: `Client satisfaction at ${latestMetrics.clientSatisfaction}%. Leverage this for case studies and referrals.`,
        icon: Star
      });
    }
  }

  // Department efficiency insights
  if (departmentData && departmentData.length > 0) {
    const lowEfficiencyDepts = departmentData.filter(dept => dept.efficiency < 85);
    const highEfficiencyDepts = departmentData.filter(dept => dept.efficiency > 95);

    if (lowEfficiencyDepts.length > 0) {
      insights.push({
        type: "warning",
        title: "Department Efficiency Alert",
        message: `${lowEfficiencyDepts.map(d => d.department).join(", ")} showing efficiency below 85%. Review processes and resource allocation.`,
        icon: AlertTriangle
      });
    }

    if (highEfficiencyDepts.length > 0) {
      insights.push({
        type: "success",
        title: "High Performing Departments",
        message: `${highEfficiencyDepts.map(d => d.department).join(", ")} achieving 95%+ efficiency. Share best practices across teams.`,
        icon: CheckCircle
      });
    }

    const overBudgetDepts = departmentData.filter(dept => dept.spent > dept.budget * 0.9);
    if (overBudgetDepts.length > 0) {
      insights.push({
        type: "warning",
        title: "Budget Monitoring Required",
        message: `${overBudgetDepts.map(d => d.department).join(", ")} nearing budget limits. Review spending and forecast needs.`,
        icon: CreditCard
      });
    }
  }

  // Client concentration insights
  if (clientDistribution && clientDistribution.length > 0) {
    const topClient = clientDistribution[0];
    const totalRevenue = clientDistribution.reduce((sum, client) => sum + client.value, 0);
    const topClientPercentage = (topClient.value / totalRevenue) * 100;

    if (topClientPercentage > 40) {
      insights.push({
        type: "warning",
        title: "Client Concentration Risk",
        message: `${topClient.name} represents ${topClientPercentage.toFixed(1)}% of revenue. Consider diversifying client portfolio.`,
        icon: Building2
      });
    }

    const lowSatisfactionClients = clientDistribution.filter(client => client.satisfaction < 90);
    if (lowSatisfactionClients.length > 0) {
      insights.push({
        type: "info",
        title: "Client Relationship Focus Needed",
        message: `${lowSatisfactionClients.map(c => c.name).join(", ")} showing satisfaction below 90%. Schedule relationship reviews.`,
        icon: Users
      });
    }
  }

  return insights;
};

export function EnterpriseAnalytics() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("quarter");
  
  const currentData = mockAnalyticsData[selectedPeriod];
  const aiInsights = generateEnterpriseInsights(currentData);
  
  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "destructive";
      case "success":
        return "default";
      default:
        return "default";
    }
  };

  // Chart color schemes
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  // Prepare data for charts
  const clientPieData = currentData.clientDistribution?.map((client, index) => ({
    name: client.name,
    value: client.value,
    fill: COLORS[index % COLORS.length]
  })) || [];

  const departmentBarData = currentData.departmentData?.map(dept => ({
    department: dept.department.replace(' ', '\n'),
    budget: dept.budget,
    spent: dept.spent,
    efficiency: dept.efficiency,
    employees: dept.employees
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          {t("Enterprise Business Intelligence") || "Enterprise Business Intelligence"}
        </h1>
        <p className="text-muted-foreground">
          {t("Comprehensive analytics for strategic decision making") || "Comprehensive analytics for strategic decision making"}
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center mb-6">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("This Month") || "This Month"}
              </div>
            </SelectItem>
            <SelectItem value="quarter">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("This Quarter") || "This Quarter"}
              </div>
            </SelectItem>
            <SelectItem value="year">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("This Year") || "This Year"}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM {(currentData.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              {currentData.period}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Projects in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              Enterprise clients
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              Full-time employees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Business Insights */}
      {aiInsights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            {t("Strategic Business Insights") || "Strategic Business Insights"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.map((insight, index) => (
              <Alert key={index} variant={getAlertVariant(insight.type)}>
                <insight.icon className="h-4 w-4" />
                <AlertTitle>{insight.title}</AlertTitle>
                <AlertDescription>{insight.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Business Performance Charts */}
      {currentData.projectMetrics && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            {t("Business Performance Analytics") || "Business Performance Analytics"} - {currentData.period}
          </h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue & Project Trends */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue & Project Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={currentData.projectMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis yAxisId="left" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" fontSize={12} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === 'revenue') return [`RM ${(value / 1000).toFixed(0)}K`, 'Revenue'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                      stroke="#8884d8"
                      name="Revenue"
                    />
                    <Bar yAxisId="right" dataKey="activeProjects" fill="#82ca9d" name="Active Projects" />
                    <Line yAxisId="right" type="monotone" dataKey="completedProjects" stroke="#ff7300" strokeWidth={3} name="Completed Projects" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Team Performance Metrics */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData.projectMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} domain={[70, 100]} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="teamUtilization" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      name="Team Utilization"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clientSatisfaction" 
                      stroke="#82ca9d" 
                      strokeWidth={3}
                      dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                      name="Client Satisfaction"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Budget Analysis */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Department Budget Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="department" 
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name.includes('budget') || name.includes('spent')) {
                          return [`RM ${(value / 1000).toFixed(0)}K`, name];
                        }
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Client Revenue Distribution */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Client Revenue Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={clientPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {clientPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`RM ${(value / 1000).toFixed(0)}K`, 'Revenue']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Department Performance Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          {t("Department Performance") || "Department Performance"} - {currentData.period}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {currentData.departmentData?.map((dept) => (
            <Card key={dept.department} className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{dept.department}</CardTitle>
                  <Badge variant={dept.efficiency > 90 ? "default" : dept.efficiency > 80 ? "secondary" : "destructive"}>
                    {dept.efficiency}% Efficiency
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <div className="font-semibold">RM {(dept.budget / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Spent:</span>
                    <div className="font-semibold">RM {(dept.spent / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employees:</span>
                    <div className="font-semibold">{dept.employees}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Projects:</span>
                    <div className="font-semibold">{dept.projects}</div>
                  </div>
                </div>
                
                {/* Budget utilization bar */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Budget Utilization</span>
                    <span>{((dept.spent / dept.budget) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        (dept.spent / dept.budget) > 0.9 ? 'bg-red-500 w-full' : 
                        (dept.spent / dept.budget) > 0.75 ? 'bg-yellow-500 w-3/4' : 
                        (dept.spent / dept.budget) > 0.5 ? 'bg-green-500 w-1/2' :
                        'bg-green-500 w-1/4'
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
