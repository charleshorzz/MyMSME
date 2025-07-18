import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-bold">Invoice ID:</span> {invoice.id}
            </div>
            <div>
              <span className="font-bold">Type:</span> <Badge>{invoice.type}</Badge>
            </div>
            <div>
              <span className="font-bold">Role:</span> <Badge>{invoice.role}</Badge>
            </div>
            <div>
              <span className="font-bold">{invoice.role === "sender" ? "Recipient" : "Sender"}:</span> {invoice.recipient}
            </div>
            <div className="mt-4">
              <div className="font-bold mb-2">Breakdown</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>1x {invoice.description}</div>
                <div className="text-right">{(invoice.amount - invoice.taxAmount).toLocaleString()} {invoice.currency}</div>
                <div>Tax ({((invoice.taxAmount / (invoice.amount - invoice.taxAmount)) * 100).toFixed(2)}%)</div>
                <div className="text-right">{invoice.taxAmount.toLocaleString()} {invoice.currency}</div>
                <div className="font-bold">Total Amount</div>
                <div className="text-right font-bold">{invoice.amount.toLocaleString()} {invoice.currency}</div>
              </div>
            </div>
            <div>
              <span className="font-bold">Date:</span> {invoice.date}
            </div>
            <div>
              <span className="font-bold">Due Date:</span> {invoice.dueDate}
            </div>
            <div>
              <span className="font-bold">Status:</span> <Badge>{invoice.status}</Badge>
            </div>
            <div>
              <span className="font-bold">Description:</span> {invoice.description}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDetails;
