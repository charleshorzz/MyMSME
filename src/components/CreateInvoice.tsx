import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Minus, 
  X, 
  Calculator, 
  Send, 
  Save,
  Building2,
  Users,
  Landmark
} from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface CreateInvoiceProps {
  userLevel?: "micro" | "small" | "medium";
  onClose?: () => void;
}

// Sample companies for demo (B2B and B2G only)
const sampleCompanies = [
  { id: "1", name: "Tech Solutions Sdn Bhd", type: "B2B", email: "billing@techsolutions.com" },
  { id: "2", name: "ABC Manufacturing", type: "B2B", email: "accounts@abc.com" },
  { id: "3", name: "XYZ Retail Store", type: "B2B", email: "finance@xyz.com" },
  { id: "4", name: "Ministry of Digital Economy", type: "B2G", email: "procurement@mde.gov.my" },
  { id: "5", name: "Department of Treasury", type: "B2G", email: "treasury@gov.my" },
];

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
    invoiceId: "INV-QR001", // Auto-generated invoice ID
    invoiceStatus: "auto-generated",
    items: [
      { description: "Coffee and Pastry", quantity: 2, unitPrice: 45.00, total: 90.00 },
      { description: "Service Charge", quantity: 1, unitPrice: 60.00, total: 60.00 }
    ]
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
    items: [
      { description: "Lunch Set", quantity: 1, unitPrice: 84.43, total: 84.43 },
      { description: "Drink", quantity: 1, unitPrice: 5.07, total: 5.07 }
    ]
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
    items: [
      { description: "Consultation Service", quantity: 1, unitPrice: 231.84, total: 231.84 },
      { description: "Document Processing", quantity: 1, unitPrice: 13.91, total: 13.91 }
    ]
  },
];

export function CreateInvoice({ userLevel = "micro", onClose }: CreateInvoiceProps) {
  const { t } = useTranslation();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [recipient, setRecipient] = useState("");
  const [recipientType, setRecipientType] = useState<"B2B" | "B2C" | "B2G">("B2B");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [selectedQRPayment, setSelectedQRPayment] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [taxRate, setTaxRate] = useState(6); // 6% SST for Malaysia
  const [currentItem, setCurrentItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0
  });

  const addItem = () => {
    if (currentItem.description && currentItem.unitPrice > 0) {
      const newItem: InvoiceItem = {
        id: Date.now().toString(),
        description: currentItem.description,
        quantity: currentItem.quantity,
        unitPrice: currentItem.unitPrice,
        total: currentItem.quantity * currentItem.unitPrice
      };
      setInvoiceItems([...invoiceItems, newItem]);
      setCurrentItem({ description: "", quantity: 1, unitPrice: 0 });
    }
  };

  const removeItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setInvoiceItems(invoiceItems.map(item => 
      item.id === id 
        ? { ...item, quantity, total: quantity * item.unitPrice }
        : item
    ));
  };

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const handleCompanySelect = (companyId: string) => {
    const company = sampleCompanies.find(c => c.id === companyId);
    if (company) {
      setRecipient(company.name);
      setRecipientType(company.type as "B2B" | "B2C" | "B2G");
      setRecipientEmail(company.email);
      setRecipientPhone("");
      setSelectedQRPayment("");
    }
  };

  const handleRecipientTypeChange = (type: "B2B" | "B2C" | "B2G") => {
    setRecipientType(type);
    // Clear recipient data when switching types
    setRecipient("");
    setRecipientEmail("");
    setRecipientPhone("");
  };

  const sendInvoice = async () => {
    // Simulate sending invoice and auto-recording for recipient
    const invoiceData = {
      id: `INV-${Date.now()}`,
      type: recipientType,
      role: "sender",
      recipient,
      recipientEmail,
      recipientPhone: recipientPhone || undefined,
      amount: total,
      currency: "MYR",
      date: invoiceDate,
      dueDate,
      status: "pending",
      description,
      taxAmount,
      items: invoiceItems,
      subtotal,
      isManual: true // Mark as manually created
    };

    // Simulate API call to send invoice
    console.log("Sending manual invoice:", invoiceData);
    
    if (recipientType === "B2C") {
      alert(`Manual B2C invoice created!\nCustomer: ${recipient}\nEmail sent to: ${recipientEmail}`);
    } else {
      // Simulate automatic recording for recipient company (B2B/B2G)
      const recipientRecord = {
        ...invoiceData,
        role: "recipient",
        status: "received"
      };
      
      console.log("Auto-recording for recipient:", recipientRecord);
      alert("Invoice sent successfully! It has been automatically recorded for the recipient.");
    }
    
    if (onClose) onClose();
  };

  const saveAsDraft = () => {
    // Save invoice as draft
    alert("Invoice saved as draft!");
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
        return <Building2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("createNewInvoice")}</h1>
        {onClose && (
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>{t("InvoiceDetails")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Transaction Type Selection */}
            <div className="space-y-2">
              <Label>{t("transactionType")}</Label>
              <div className="flex gap-2">
                <Button
                  variant={recipientType === "B2B" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRecipientTypeChange("B2B")}
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  B2B
                </Button>
                <Button
                  variant={recipientType === "B2C" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRecipientTypeChange("B2C")}
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  B2C
                </Button>
                <Button
                  variant={recipientType === "B2G" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRecipientTypeChange("B2G")}
                  className="flex items-center gap-2"
                >
                  <Landmark className="h-4 w-4" />
                  B2G
                </Button>
              </div>
            </div>

            {/* B2B/B2G Recipient Selection */}
            {(recipientType === "B2B" || recipientType === "B2G") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="recipient">{t("select")} {recipientType === "B2B" ? "Syarikat" : "Government Entity"}</Label>
                  <Select onValueChange={handleCompanySelect}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${recipientType === "B2B" ? "company" : "government entity"}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleCompanies
                        .filter(company => company.type === recipientType)
                        .map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(company.type)}
                            <span>{company.name}</span>
                            <Badge variant="outline">{company.type}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-manual">{t("orEnterManually")}</Label>
                  <Input
                    id="recipient-manual"
                    placeholder={`${recipientType === "B2B" ? "Company" : "Government entity"} name`}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="recipient@email.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* B2C Customer Manual Entry */}
            {recipientType === "B2C" && (
              <>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">{t("b2cManualInvoice")}</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {t("noteInvoice")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer-name">{t("customerName")}</Label>
                  <Input
                    id="customer-name"
                    placeholder="Enter customer name"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">{t("email")}</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="customer@email.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-phone">{t("phone")}</Label>
                    <Input
                      id="customer-phone"
                      type="tel"
                      placeholder="+60123456789"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">{t("invoiceDate")}</Label>
                <Input
                  id="date"
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">{t("dueDate")}</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                placeholder="Invoice description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Items */}
        <Card>
          <CardHeader>
            <CardTitle>{t("addItems")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("itemDescription")}</Label>
              <Input
                placeholder="Product/Service description"
                value={currentItem.description}
                onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("quantity")}</Label>
                <Input
                  type="number"
                  min="1"
                  value={currentItem.quantity}
                  onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value) || 1})}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("unitPrice")} (RM)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentItem.unitPrice}
                  onChange={(e) => setCurrentItem({...currentItem, unitPrice: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <Button onClick={addItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {t("addItems")}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("invoiceItem")}</CardTitle>
        </CardHeader>
        <CardContent>
          {invoiceItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t("noItemAddedYet")}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>"{t("description")}"</TableHead>
                  <TableHead className="text-center">{t("quantity")}</TableHead>
                  <TableHead className="text-right">{t("unitPrice")}</TableHead>
                  <TableHead className="text-right">{t("total")}</TableHead>
                  <TableHead className="text-center">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="min-w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">RM {item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">RM {item.total.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {t("invoiceSummary")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{t("subtotal")}:</span>
              <span>RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("tax")} ({taxRate}%):</span>
              <span>RM {taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>{t("total")}:</span>
              <span>RM {total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={saveAsDraft} variant="outline" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {t("saveAsDraft")}
        </Button>
        <Button onClick={sendInvoice} className="flex-1" disabled={!recipient || !recipientEmail || invoiceItems.length === 0}>
          <Send className="h-4 w-4 mr-2" />
          {t("sendInvoice")}
        </Button>
      </div>
    </div>
  );
}
