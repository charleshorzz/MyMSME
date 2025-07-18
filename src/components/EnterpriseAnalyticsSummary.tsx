import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  ArrowRight,
  Building2,
  Target,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export function EnterpriseAnalyticsSummary() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Simplified data for summary view
  const departmentData = [
    { name: "Sales", value: 35, color: "#3B82F6", colorClass: "bg-blue-500" },
    { name: "Marketing", value: 25, color: "#10B981", colorClass: "bg-green-500" },
    { name: "Operations", value: 20, color: "#F59E0B", colorClass: "bg-yellow-500" },
    { name: "Support", value: 20, color: "#EF4444", colorClass: "bg-red-500" },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 450000 },
    { month: "Feb", revenue: 520000 },
    { month: "Mar", revenue: 480000 },
    { month: "Apr", revenue: 590000 },
    { month: "May", revenue: 620000 },
    { month: "Jun", revenue: 680000 },
  ];

  const topInsight = "Marketing ROI increased 23% this quarter. Recommend expanding digital campaigns.";

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">RM 680K</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +9.6% MoM
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">8 critical</p>
              </div>
              <Target className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Efficiency</p>
                <p className="text-2xl font-bold">92%</p>
                <p className="text-sm text-success">+5% vs last month</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Client Retention</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-success">Industry leading</p>
              </div>
              <Building2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mini Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Revenue Trend (6M)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              Department Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-1">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${dept.colorClass}`}></div>
                    <span className="text-muted-foreground">{dept.name}</span>
                    <span className="ml-auto font-medium">{dept.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight & Action */}
      <Card className="shadow-soft border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">Strategic Insight</h4>
              <p className="text-sm text-muted-foreground mb-3">{topInsight}</p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  Strategic Priority
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/analytics/medium-enterprise")}
                  className="ml-auto flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  View Details
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
