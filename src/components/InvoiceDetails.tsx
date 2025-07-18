import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share2, 
  Building2, 
  Users, 
  Landmark, 
  FileText,
  Calendar,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

interface Invoice {
  id: string;
  type: string;
  role: string;
  recipient: string;
  amount: number;
  currency: string;
  date: string;
  dueDate: string;
  status: string;
  description: string;
  taxAmount: number;
}

interface InvoiceDetailsProps {
  invoice: Invoice;
  onClose: () => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice, onClose }) => {
  const formatCurrency = (amount: number, currency: string = "MYR") => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "overdue":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "B2B":
        return <Building2 className="h-4 w-4 text-blue-600" />;
      case "B2C":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "B2G":
        return <Landmark className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleIcon = (role: string) => {
    return role === "sender" ? (
      <ArrowUpRight className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDownLeft className="h-4 w-4 text-green-600" />
    );
  };

  const subtotal = invoice.amount - invoice.taxAmount;
  const taxRate = (invoice.taxAmount / subtotal) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-xl">Invoice Details</CardTitle>
                <p className="text-sm text-muted-foreground">Invoice {invoice.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Status and Type Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge 
                variant="outline" 
                className={`${getStatusColor(invoice.status)} px-3 py-1 flex items-center gap-2`}
              >
                {getStatusIcon(invoice.status)}
                <span className="capitalize font-medium">{invoice.status}</span>
              </Badge>
              
              <div className="flex items-center gap-2">
                {getTypeIcon(invoice.type)}
                <Badge variant="secondary" className="font-medium">
                  {invoice.type}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                {getRoleIcon(invoice.role)}
                <span className="text-sm font-medium capitalize text-muted-foreground">
                  {invoice.role === "sender" ? "Outgoing" : "Incoming"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Invoice Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Invoice Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Invoice ID</p>
                      <p className="font-medium">{invoice.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{formatDate(invoice.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {invoice.role === "sender" ? "Billed To" : "Billed From"}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{invoice.recipient}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {invoice.type === "B2B" ? "Business Entity" : 
                     invoice.type === "B2C" ? "Consumer" : "Government Entity"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Service/Product Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{invoice.description}</p>
            </div>
          </div>

          <Separator />

          {/* Amount Breakdown */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Amount Breakdown</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal, invoice.currency)}</span>
              </div>
              
              {/* Tax */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax ({taxRate.toFixed(1)}%)</span>
                <span className="font-medium">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
              </div>
              
              <Separator />
              
              {/* Total */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-lg">Total Amount</span>
                </div>
                <span className="font-bold text-xl text-green-600">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {invoice.status === "pending" && invoice.role === "recipient" && (
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Mark as Paid
              </Button>
            )}
            {invoice.status === "overdue" && (
              <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                Send Reminder
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              View in Browser
            </Button>
            <Button variant="outline" className="flex-1">
              Email Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDetails;
