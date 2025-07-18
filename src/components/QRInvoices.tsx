import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  QrCode, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle,
  Clock,
  Users,
  Receipt,
  Calendar,
  DollarSign,
  FileText
} from "lucide-react";
import { t } from "i18next";

// Sample QR payment data with auto-generated invoices
const sampleQRPayments = [
  { 
    id: "QR001", 
    customerName: "John Doe", 
    customerPhone: "+60123456789", 
    customerEmail: "john.doe@email.com",
    amount: 150.00,
    paymentTime: "2024-01-18 14:30:00",
    transactionId: "TXN001",
    invoiceId: "INV-QR001",
    invoiceStatus: "auto-generated",
    paymentStatus: "completed",
    items: [
      { description: "Coffee and Pastry", quantity: 2, unitPrice: 45.00, total: 90.00 },
      { description: "Service Charge", quantity: 1, unitPrice: 60.00, total: 60.00 }
    ],
    taxAmount: 9.00,
    subtotal: 141.00
  },
  { 
    id: "QR002", 
    customerName: "Sarah Lee", 
    customerPhone: "+60198765432", 
    customerEmail: "sarah.lee@email.com",
    amount: 89.50,
    paymentTime: "2024-01-18 15:45:00",
    transactionId: "TXN002",
    invoiceId: "INV-QR002",
    invoiceStatus: "auto-generated",
    paymentStatus: "completed",
    items: [
      { description: "Lunch Set", quantity: 1, unitPrice: 84.43, total: 84.43 },
      { description: "Drink", quantity: 1, unitPrice: 5.07, total: 5.07 }
    ],
    taxAmount: 5.37,
    subtotal: 84.13
  },
  { 
    id: "QR003", 
    customerName: "Ahmad Rahman", 
    customerPhone: "+60167891234", 
    customerEmail: "ahmad.rahman@email.com",
    amount: 245.75,
    paymentTime: "2024-01-18 16:20:00",
    transactionId: "TXN003",
    invoiceId: "INV-QR003",
    invoiceStatus: "auto-generated",
    paymentStatus: "completed",
    items: [
      { description: "Consultation Service", quantity: 1, unitPrice: 231.84, total: 231.84 },
      { description: "Document Processing", quantity: 1, unitPrice: 13.91, total: 13.91 }
    ],
    taxAmount: 14.75,
    subtotal: 231.00
  },
  { 
    id: "QR004", 
    customerName: "Lisa Wong", 
    customerPhone: "+60145678901", 
    customerEmail: "lisa.wong@email.com",
    amount: 320.00,
    paymentTime: "2024-01-18 17:10:00",
    transactionId: "TXN004",
    invoiceId: "INV-QR004",
    invoiceStatus: "auto-generated",
    paymentStatus: "completed",
    items: [
      { description: "Product Purchase", quantity: 3, unitPrice: 100.00, total: 300.00 },
      { description: "Shipping", quantity: 1, unitPrice: 20.00, total: 20.00 }
    ],
    taxAmount: 19.20,
    subtotal: 300.80
  }
];

interface QRInvoicesProps {
  userLevel?: "micro" | "small" | "medium";
}

export function QRInvoices({ userLevel = "micro" }: QRInvoicesProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const filteredPayments = sampleQRPayments.filter(payment => 
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = filteredPayments.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewInvoice = (payment: any) => {
    setSelectedInvoice(payment);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            {t("qrPaymentInvoice")}
          </h1>
          <p className="text-muted-foreground">
            {t("auttomaticallyGeneratedInvoice")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("export")}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("totalTransactions")}</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
              <Receipt className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("totalAmount")}</p>
                <p className="text-2xl font-bold">RM {totalAmount.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("autoGenerated")}</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t("searchAndFilter")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">{t("searchBy")}</Label>
              <Input
                id={t("search")}
                placeholder={t("Search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Payment Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("qrPaymentInvoices")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("invoiceId")}</TableHead>
                <TableHead>{t("customer")}</TableHead>
                <TableHead>{t("transactionId")}</TableHead>
                <TableHead>{t("amount")}</TableHead>
                <TableHead>{t("paymentTime")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.invoiceId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{payment.customerName}</p>
                        <p className="text-sm text-muted-foreground">{payment.customerEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>RM {payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(payment.paymentTime)}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {payment.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewInvoice(payment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    {t("invoiceDetails")} - {selectedInvoice.invoiceId}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("auttomaticallyGeneratedInvoice")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedInvoice(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t("customerName")}</Label>
                  <p className="font-medium">{selectedInvoice.customerName}</p>
                </div>
                <div>
                  <Label>{t("phone")}</Label>
                  <p className="font-medium">{selectedInvoice.customerPhone}</p>
                </div>
                <div>
                  <Label>{t("email")}</Label>
                  <p className="font-medium">{selectedInvoice.customerEmail}</p>
                </div>
                <div>
                  <Label>{t("transactionId")}</Label>
                  <p className="font-medium">{selectedInvoice.transactionId}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <Label>{t("items")}</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("description")}</TableHead>
                      <TableHead>{t("quantity")}</TableHead>
                      <TableHead>{t("unitPrice")}</TableHead>
                      <TableHead>{t("totalPrice")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>RM {item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell>RM {item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>{t("subtotal")}:</span>
                  <span>RM {selectedInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("tax")} (6% SST):</span>
                  <span>RM {selectedInvoice.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>{t("total")}:</span>
                  <span>RM {selectedInvoice.amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Information */}
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">{t("paymentCompleted")}</span>
                </div>
                <p className="text-sm text-green-700">
                  {t("paymentReceivedOn")} {formatDate(selectedInvoice.paymentTime)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
