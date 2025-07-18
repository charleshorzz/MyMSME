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
  ShoppingCart, 
  AlertTriangle,
  Star,
  Clock,
  BarChart3,
  Brain,
  Calendar,
  Activity,
  PieChart
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
  Legend
} from 'recharts';

interface HourlyData {
  hour: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  unitsSold: number;
  revenue: number;
  trend: "up" | "down" | "stable";
  rating: number;
  preparationTime: number; // in minutes
  profitMargin: number; // percentage
}

interface SalesData {
  period: string;
  totalRevenue: number;
  totalUnits: number;
  items: FoodItem[];
  hourlyData?: HourlyData[];
}

// Mock data for food stall analytics
const mockSalesData: Record<string, SalesData> = {
  "today": {
    period: "Today",
    totalRevenue: 1250.50,
    totalUnits: 87,
    hourlyData: [
      { hour: "08:00", revenue: 45.50, orders: 3, avgOrderValue: 15.17 },
      { hour: "09:00", revenue: 72.00, orders: 5, avgOrderValue: 14.40 },
      { hour: "10:00", revenue: 28.50, orders: 2, avgOrderValue: 14.25 },
      { hour: "11:00", revenue: 91.50, orders: 6, avgOrderValue: 15.25 },
      { hour: "12:00", revenue: 185.50, orders: 12, avgOrderValue: 15.46 },
      { hour: "13:00", revenue: 203.00, orders: 14, avgOrderValue: 14.50 },
      { hour: "14:00", revenue: 112.50, orders: 7, avgOrderValue: 16.07 },
      { hour: "15:00", revenue: 67.50, orders: 4, avgOrderValue: 16.88 },
      { hour: "16:00", revenue: 55.00, orders: 3, avgOrderValue: 18.33 },
      { hour: "17:00", revenue: 98.50, orders: 6, avgOrderValue: 16.42 },
      { hour: "18:00", revenue: 145.50, orders: 9, avgOrderValue: 16.17 },
      { hour: "19:00", revenue: 189.50, orders: 11, avgOrderValue: 17.23 },
      { hour: "20:00", revenue: 155.50, orders: 9, avgOrderValue: 17.28 },
    ],
    items: [
      {
        id: "f1",
        name: "Nasi Lemak",
        category: "Main Dish",
        price: 8.50,
        unitsSold: 25,
        revenue: 212.50,
        trend: "up",
        rating: 4.8,
        preparationTime: 8,
        profitMargin: 65
      },
      {
        id: "f2",
        name: "Mee Goreng",
        category: "Main Dish", 
        price: 7.00,
        unitsSold: 18,
        revenue: 126.00,
        trend: "stable",
        rating: 4.5,
        preparationTime: 12,
        profitMargin: 60
      },
      {
        id: "f3",
        name: "Roti Canai",
        category: "Snack",
        price: 2.50,
        unitsSold: 32,
        revenue: 80.00,
        trend: "up",
        rating: 4.7,
        preparationTime: 5,
        profitMargin: 70
      },
      {
        id: "f4",
        name: "Teh Tarik",
        category: "Beverage",
        price: 3.50,
        unitsSold: 12,
        revenue: 42.00,
        trend: "down",
        rating: 4.3,
        preparationTime: 3,
        profitMargin: 80
      }
    ]
  },
  "week": {
    period: "This Week",
    totalRevenue: 8750.25,
    totalUnits: 609,
    hourlyData: [
      { hour: "Mon", revenue: 1250.50, orders: 87, avgOrderValue: 14.37 },
      { hour: "Tue", revenue: 1320.75, orders: 92, avgOrderValue: 14.35 },
      { hour: "Wed", revenue: 1180.00, orders: 82, avgOrderValue: 14.39 },
      { hour: "Thu", revenue: 1410.50, orders: 98, avgOrderValue: 14.39 },
      { hour: "Fri", revenue: 1590.25, orders: 111, avgOrderValue: 14.33 },
      { hour: "Sat", revenue: 1820.75, orders: 127, avgOrderValue: 14.34 },
      { hour: "Sun", revenue: 177.50, orders: 12, avgOrderValue: 14.79 },
    ],
    items: [
      {
        id: "f1",
        name: "Nasi Lemak",
        category: "Main Dish",
        price: 8.50,
        unitsSold: 175,
        revenue: 1487.50,
        trend: "up",
        rating: 4.8,
        preparationTime: 8,
        profitMargin: 65
      },
      {
        id: "f2", 
        name: "Mee Goreng",
        category: "Main Dish",
        price: 7.00,
        unitsSold: 126,
        revenue: 882.00,
        trend: "stable",
        rating: 4.5,
        preparationTime: 12,
        profitMargin: 60
      },
      {
        id: "f3",
        name: "Roti Canai",
        category: "Snack",
        price: 2.50,
        unitsSold: 224,
        revenue: 560.00,
        trend: "up",
        rating: 4.7,
        preparationTime: 5,
        profitMargin: 70
      },
      {
        id: "f4",
        name: "Teh Tarik",
        category: "Beverage",
        price: 3.50,
        unitsSold: 84,
        revenue: 294.00,
        trend: "down",
        rating: 4.3,
        preparationTime: 3,
        profitMargin: 80
      }
    ]
  },
  "month": {
    period: "This Month",
    totalRevenue: 35200.75,
    totalUnits: 2450,
    hourlyData: [
      { hour: "Week 1", revenue: 8750.25, orders: 609, avgOrderValue: 14.37 },
      { hour: "Week 2", revenue: 9125.50, orders: 632, avgOrderValue: 14.44 },
      { hour: "Week 3", revenue: 8890.00, orders: 618, avgOrderValue: 14.39 },
      { hour: "Week 4", revenue: 8435.00, orders: 591, avgOrderValue: 14.27 },
    ],
    items: [
      {
        id: "f1",
        name: "Nasi Lemak",
        category: "Main Dish",
        price: 8.50,
        unitsSold: 700,
        revenue: 5950.00,
        trend: "up",
        rating: 4.8,
        preparationTime: 8,
        profitMargin: 65
      },
      {
        id: "f2",
        name: "Mee Goreng", 
        category: "Main Dish",
        price: 7.00,
        unitsSold: 504,
        revenue: 3528.00,
        trend: "stable",
        rating: 4.5,
        preparationTime: 12,
        profitMargin: 60
      },
      {
        id: "f3",
        name: "Roti Canai",
        category: "Snack",
        price: 2.50,
        unitsSold: 896,
        revenue: 2240.00,
        trend: "up",
        rating: 4.7,
        preparationTime: 5,
        profitMargin: 70
      },
      {
        id: "f4",
        name: "Teh Tarik",
        category: "Beverage",
        price: 3.50,
        unitsSold: 350,
        revenue: 1225.00,
        trend: "down",
        rating: 4.3,
        preparationTime: 3,
        profitMargin: 80
      }
    ]
  }
};

// AI suggestions based on performance
const generateAISuggestions = (items: FoodItem[], period: string) => {
  const suggestions = [];
  
  // Find low-performing items
  const lowPerformers = items.filter(item => item.trend === "down" || item.unitsSold < 20);
  const highPerformers = items.filter(item => item.trend === "up" && item.unitsSold > 50);
  
  if (lowPerformers.length > 0) {
    lowPerformers.forEach(item => {
      if (item.rating < 4.0) {
        suggestions.push({
          type: "warning",
          title: `Improve ${item.name} Quality`,
          message: `${item.name} has low sales and rating (${item.rating}⭐). Consider reviewing recipe or ingredients.`,
          icon: AlertTriangle
        });
      } else if (item.preparationTime > 10) {
        suggestions.push({
          type: "info", 
          title: `Optimize ${item.name} Preparation`,
          message: `${item.name} takes ${item.preparationTime} minutes to prepare. Consider streamlining the process to increase efficiency.`,
          icon: Clock
        });
      } else {
        suggestions.push({
          type: "info",
          title: `Promote ${item.name}`,
          message: `${item.name} has good rating but low sales. Consider special promotions or bundling with popular items.`,
          icon: TrendingUp
        });
      }
    });
  }
  
  if (highPerformers.length > 0) {
    const topPerformer = highPerformers.sort((a, b) => b.revenue - a.revenue)[0];
    suggestions.push({
      type: "success",
      title: `Maximize ${topPerformer.name} Success`,
      message: `${topPerformer.name} is your top performer! Consider creating variations or increasing batch size during peak hours.`,
      icon: Star
    });
  }
  
  // Profit margin suggestions
  const lowMarginItems = items.filter(item => item.profitMargin < 50);
  if (lowMarginItems.length > 0) {
    suggestions.push({
      type: "warning", 
      title: "Review Cost Structure",
      message: `Some items have low profit margins. Consider optimizing ingredient costs or adjusting prices.`,
      icon: DollarSign
    });
  }
  
  return suggestions;
};

export function FoodStallAnalytics() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  
  const currentData = mockSalesData[selectedPeriod];
  const aiSuggestions = generateAISuggestions(currentData.items, selectedPeriod);
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };
  
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

  // Chart color scheme
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Prepare data for pie chart
  const pieChartData = currentData.items.map((item, index) => ({
    name: item.name,
    value: item.revenue,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <ShoppingCart className="h-8 w-8 text-primary" />
          {t("Food Stall Analytics") || "Food Stall Analytics"}
        </h1>
        <p className="text-muted-foreground">
          {t("Track your food sales performance and get AI-powered insights") || "Track your food sales performance and get AI-powered insights"}
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center mb-6">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("Today") || "Today"}
              </div>
            </SelectItem>
            <SelectItem value="week">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("This Week") || "This Week"}
              </div>
            </SelectItem>
            <SelectItem value="month">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("This Month") || "This Month"}
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM {currentData.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.totalUnits}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              RM {(currentData.totalRevenue / currentData.totalUnits).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.items.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            {t("AI Insights & Suggestions") || "AI Insights & Suggestions"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {aiSuggestions.map((suggestion, index) => (
              <Alert key={index} variant={getAlertVariant(suggestion.type)}>
                <suggestion.icon className="h-4 w-4" />
                <AlertTitle>{suggestion.title}</AlertTitle>
                <AlertDescription>{suggestion.message}</AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Charts Section */}
      {currentData.hourlyData && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            {t("Performance Charts") || "Performance Charts"} - {currentData.period}
          </h2>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Over Time Chart */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {selectedPeriod === "today" ? "Hourly Revenue" : selectedPeriod === "week" ? "Daily Average Revenue" : "Weekly Revenue"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="hour" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value: number) => [`RM ${value.toFixed(2)}`, 'Revenue']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Orders Over Time Chart */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {selectedPeriod === "today" ? "Hourly Orders" : selectedPeriod === "week" ? "Daily Average Orders" : "Weekly Orders"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentData.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="hour" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value: number) => [value, 'Orders']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Bar dataKey="orders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Average Order Value Chart */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Average Order Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentData.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="hour" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      formatter={(value: number) => [`RM ${value.toFixed(2)}`, 'Avg Order Value']}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgOrderValue" 
                      stroke="#ff7300" 
                      strokeWidth={3}
                      dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Distribution Pie Chart */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Revenue by Item
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`RM ${value.toFixed(2)}`, 'Revenue']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Food Items Performance */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          {t("Food Items Performance") || "Food Items Performance"} - {currentData.period}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {currentData.items.map((item) => (
            <Card key={item.id} className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(item.trend)}
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <div className="font-semibold">RM {item.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Units Sold:</span>
                    <div className="font-semibold">{item.unitsSold}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue:</span>
                    <div className="font-semibold">RM {item.revenue.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="font-semibold flex items-center gap-1">
                      {item.rating} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prep Time:</span>
                    <div className="font-semibold">{item.preparationTime} min</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <div className="font-semibold">{item.profitMargin}%</div>
                  </div>
                </div>
                
                {/* Performance indicator */}
                <div className="pt-2 border-t">
                  {item.trend === "up" && (
                    <div className="text-green-600 text-sm flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {t("Trending up") || "Trending up"}
                    </div>
                  )}
                  {item.trend === "down" && (
                    <div className="text-red-600 text-sm flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {t("Needs attention") || "Needs attention"}
                    </div>
                  )}
                  {item.trend === "stable" && (
                    <div className="text-gray-600 text-sm flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      {t("Stable performance") || "Stable performance"}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
