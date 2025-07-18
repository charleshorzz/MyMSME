import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import InvoiceDetails from "./InvoiceDetails";
import { CreateInvoice } from "./CreateInvoice";
import { QRInvoices } from "./QRInvoices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ArrowUpRight, 
  ArrowDownLeft,
  Building2,
  Users,
  Landmark,
  FileText,
  Plus,
  QrCode,
  Receipt
} from "lucide-react";
import { t } from "i18next";

// Sample invoice data - manual invoices only (B2B/B2G)
const sampleInvoices = [
  {
    id: "INV-001",
    type: "B2B" as const,
    role: "sender",
    recipient: "Tech Solutions Sdn Bhd",
    amount: 15000.00,
    currency: "MYR",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    status: "paid" as const,
    description: "Software Development Services",
    taxAmount: 900.00,
  },
  {
    id: "INV-002",
    type: "B2B" as const,
    role: "sender" as const,
    recipient: "ABC Manufacturing Sdn Bhd",
    amount: 8500.00,
    currency: "MYR",
    date: "2024-01-20",
    dueDate: "2024-02-20",
    status: "pending" as const,
    description: "Consulting Services",
    taxAmount: 510.00,
  },
  {
    id: "INV-003",
    type: "B2G" as const,
    role: "sender" as const,
    recipient: "Ministry of Digital Economy",
    amount: 50000.00,
    currency: "MYR",
    date: "2024-01-10",
    dueDate: "2024-03-10",
    status: "paid" as const,
    description: "Digital Transformation Project",
    taxAmount: 3000.00,
  },
  {
    id: "INV-004",
    type: "B2B" as const,
    role: "recipient" as const,
    recipient: "Your Company",
    amount: 8000.00,
    currency: "MYR",
    date: "2024-01-25",
    dueDate: "2024-02-25",
    status: "overdue" as const,
    description: "Office Equipment Purchase",
    taxAmount: 480.00,
  },
  {
    id: "INV-005",
    type: "B2G" as const,
    role: "recipient",
    recipient: "Your Company",
    amount: 12000.00,
    currency: "MYR",
    date: "2024-01-30",
    dueDate: "2024-02-28",
    status: "paid" as const,
    description: "Government Contract Services",
    taxAmount: 720.00,
  },
];

type TransactionType = "all" | "B2B" | "B2C" | "B2G";
type RoleType = "all" | "sender" | "recipient";
type StatusType = "all" | "paid" | "pending" | "overdue";

interface EInvoicePageProps {
  userLevel?: "micro" | "small" | "medium";
}

const EInvoicePage = ({ userLevel = "micro" }: EInvoicePageProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactionType, setTransactionType] = useState<TransactionType>("all");
  const [roleType, setRoleType] = useState<RoleType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);

  // Check if create parameter is in URL
  useEffect(() => {
    const createParam = searchParams.get("create");
    if (createParam === "true") {
      setShowCreateInvoice(true);
      // Remove the create parameter from URL after opening
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  // Filter invoices based on selected filters
  const filteredInvoices = useMemo(() => {
    return sampleInvoices.filter((invoice) => {
      const matchesType = transactionType === "all" || invoice.type === transactionType;
      const matchesRole = roleType === "all" || invoice.role === roleType;
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      const matchesSearch = 
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesRole && matchesStatus && matchesSearch;
    });
  }, [transactionType, roleType, statusFilter, searchTerm]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const sent = filteredInvoices.filter(inv => inv.role === "sender");
    const received = filteredInvoices.filter(inv => inv.role === "recipient");
    
    return {
      total: filteredInvoices.length,
      sent: sent.length,
      received: received.length,
      totalAmount: filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0),
      sentAmount: sent.reduce((sum, inv) => sum + inv.amount, 0),
      receivedAmount: received.reduce((sum, inv) => sum + inv.amount, 0),
    };
  }, [filteredInvoices]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "B2B":
        return <Building2 className="h-4 w-4" />;
      case "B2C":
        return <Users className="h-4 w-4" />;
      case "B2G":
        return <Landmark className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getRoleIcon = (role: string) => {
    return role === "sender" ? (
      <ArrowUpRight className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDownLeft className="h-4 w-4 text-green-600" />
    );
  };

  const formatCurrency = (amount: number, currency: string = "MYR") => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {showCreateInvoice ? (
        <CreateInvoice 
          userLevel={userLevel} 
          onClose={() => setShowCreateInvoice(false)} 
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("invoiceManagement")}</h1>
              <p className="text-muted-foreground">
                {t("manageYourElectronicInvoices")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowCreateInvoice(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {t("createManualInvoice")}
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t("exportAll")}
              </Button>
            </div>
          </div>

          {/* Invoice Management Tabs */}
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                {t("manualInvoice")}
              </TabsTrigger>
              <TabsTrigger value="qr" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                {t("qrPaymentInvoice")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="space-y-6">
              {/* Manual Invoices Content */}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("totalInvoices")}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.total}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(summary.totalAmount)} {t("totalValue")}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("sent")}</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.sent}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(summary.sentAmount)} {t("invoiced")}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("Received")}</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.received}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(summary.receivedAmount)} {t("received")}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("transactionType")}</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">B2B</Badge>
                <Badge variant="outline" className="text-xs">B2C</Badge>
                <Badge variant="outline" className="text-xs">B2G</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("Filter")}</CardTitle>
            <CardDescription>
              {t("Filter By")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("search")}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("Search Invoices")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Transaction Type")}</label>
                <Select value={transactionType} onValueChange={(value: TransactionType) => setTransactionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Types")}</SelectItem>
                    <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                    <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                    <SelectItem value="B2G">B2G (Business to Government)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("role")}</label>
                <Select value={roleType} onValueChange={(value: RoleType) => setRoleType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("allRoles")}</SelectItem>
                    <SelectItem value="sender">{t("senderOutgoing")}</SelectItem>
                    <SelectItem value="recipient">{t("receiverIncoming")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Status")}</label>
                <Select value={statusFilter} onValueChange={(value: StatusType) => setStatusFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("All Status")}</SelectItem>
                    <SelectItem value="paid">{t("Paid")}</SelectItem>
                    <SelectItem value="pending">{t("Pending")}</SelectItem>
                    <SelectItem value="overdue">{t("Overdue")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("Invoices")}</CardTitle>
            <CardDescription>
              {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("invoiceId")}</TableHead>
                    <TableHead>{t("type")}</TableHead>
                    <TableHead>{t("role")}</TableHead>
                    <TableHead>{t("recipient")}/{t("sender")}</TableHead>
                    <TableHead>{t("amount")}</TableHead>
                    <TableHead>{t("date")}</TableHead>
                    <TableHead>{t("dueDate")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                        {t("noInvoicesFound")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(invoice.type)}
                            <Badge variant="outline">{invoice.type}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(invoice.role)}
                            <span className="capitalize">{invoice.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {invoice.role === "sender" ? (
                                <>
                                  <span>{t("recipient")}: </span>{invoice.recipient}
                                </>
                              ) : (
                                <>
                                  <span>{t("sender")}: </span>{invoice.recipient}
                                </>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {invoice.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                            <div className="text-sm text-muted-foreground">
                              Tax: {formatCurrency(invoice.taxAmount)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(invoice.status)}
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Invoice Details Modal */}
        {selectedInvoice && (
          <InvoiceDetails invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
        )}
            </TabsContent>
            
            <TabsContent value="qr" className="space-y-6">
              {/* QR Payment Invoices Content */}
              <QRInvoices userLevel={userLevel} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default EInvoicePage;
