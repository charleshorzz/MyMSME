import { useState, useMemo } from "react";
import InvoiceDetails from "./InvoiceDetails";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
  FileText
} from "lucide-react";

// Sample invoice data - in a real app, this would come from an API
const sampleInvoices = [
  {
    id: "INV-001",
    type: "B2B" as const,
    role: "sender" as const,
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
    type: "B2C" as const,
    role: "sender" as const,
    recipient: "John Doe",
    amount: 2500.00,
    currency: "MYR",
    date: "2024-01-20",
    dueDate: "2024-02-20",
    status: "pending" as const,
    description: "Consulting Services",
    taxAmount: 150.00,
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
    type: "B2C" as const,
    role: "recipient" as const,
    recipient: "Your Company",
    amount: 1200.00,
    currency: "MYR",
    date: "2024-01-30",
    dueDate: "2024-02-28",
    status: "paid" as const,
    description: "Marketing Services",
    taxAmount: 72.00,
  },
];

type TransactionType = "all" | "B2B" | "B2C" | "B2G";
type RoleType = "all" | "sender" | "recipient";
type StatusType = "all" | "paid" | "pending" | "overdue";

interface EInvoicePageProps {
  userLevel?: "micro" | "small" | "medium";
}

const EInvoicePage = ({ userLevel = "micro" }: EInvoicePageProps) => {
  const [transactionType, setTransactionType] = useState<TransactionType>("all");
  const [roleType, setRoleType] = useState<RoleType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-Invoice Management</h1>
          <p className="text-muted-foreground">
            View and manage your electronic invoices by transaction type and role
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.total}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(summary.totalAmount)} total value
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.sent}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(summary.sentAmount)} invoiced
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Received</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.received}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(summary.receivedAmount)} received
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Types</CardTitle>
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
            <CardTitle className="text-lg">Filters</CardTitle>
            <CardDescription>
              Filter invoices by transaction type, role, status, or search terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Transaction Type</label>
                <Select value={transactionType} onValueChange={(value: TransactionType) => setTransactionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                    <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                    <SelectItem value="B2G">B2G (Business to Government)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={roleType} onValueChange={(value: RoleType) => setRoleType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="sender">Sender (Outgoing)</SelectItem>
                    <SelectItem value="recipient">Recipient (Incoming)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={(value: StatusType) => setStatusFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoices</CardTitle>
            <CardDescription>
              {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Recipient/Sender</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                        No invoices found matching your filters
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
                                  <span>Recipient: </span>{invoice.recipient}
                                </>
                              ) : (
                                <>
                                  <span>Sender: </span>{invoice.recipient}
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
    </div>
  );
};

export default EInvoicePage;
