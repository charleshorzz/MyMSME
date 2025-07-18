import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Building, Phone, Building2, CreditCard, Shield, Copy, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  // Mock user role - in real app this would come from auth context
  const userRole = "owner"; // owner, admin, employee

  // Mock company and bank data
  const companyData = {
    companyName: "ABC Trading Sdn Bhd",
    businessId: "MY12345678",
    ssmNumber: "202301234567",
    tinNumber: "C12345678901",
    companyType: "Sdn Bhd",
    incorporationDate: "2023-01-15",
    paidUpCapital: "RM 100,000",
    address: "No. 123, Jalan Sultan, 50000 Kuala Lumpur",
    industry: "Retail Trading",
    businessNature: "General Trading",
  };

  const bankData = {
    bankName: "Maybank Berhad",
    accountNumber: "1234567890123",
    accountHolder: "ABC TRADING SDN BHD",
    swiftCode: "MBBEMYKL",
    duitnowId: "01123456789",
    merchantId: "M123456789",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (!showBankDetails) {
      return "•••• •••• " + accountNumber.slice(-4);
    }
    return accountNumber;
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t("profile")}</h1>
        <p className="text-muted-foreground">{t("manageYourProfile")}</p>
        {userRole === "owner" && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg inline-block">
            <p className="text-sm text-amber-800">
              <Shield className="h-4 w-4 inline mr-1" />
              Some fields are read-only for business owners to maintain data integrity.
            </p>
          </div>
        )}
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t("personalInformation")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t("fullName")}</Label>
              <Input id="name" defaultValue="李明" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                defaultValue="liming@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" defaultValue="+60 12-345-6789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">{t("position")}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="position" 
                  defaultValue={t("owner")}
                  readOnly={userRole === "owner"}
                  className={userRole === "owner" ? "bg-muted" : ""}
                />
                {userRole === "owner" && (
                  <Badge variant="secondary" className="text-xs">Read-only</Badge>
                )}
              </div>
            </div>
          </div>
          <Button>{t("saveChanges")}</Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {t("companyInformation")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t("companyName")}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="companyName" 
                  defaultValue={companyData.companyName}
                  readOnly={userRole === "owner"}
                  className={userRole === "owner" ? "bg-muted" : ""}
                />
                {userRole === "owner" && (
                  <Badge variant="secondary" className="text-xs">Read-only</Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessId">{t("businessId")}</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="businessId" 
                  defaultValue={companyData.businessId}
                  readOnly={userRole === "owner"}
                  className={userRole === "owner" ? "bg-muted" : ""}
                />
                {userRole === "owner" && (
                  <Badge variant="secondary" className="text-xs">Read-only</Badge>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ssmNumber">SSM Registration Number</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="ssmNumber" 
                  defaultValue={companyData.ssmNumber}
                  readOnly={userRole === "owner"}
                  className={userRole === "owner" ? "bg-muted" : ""}
                />
                {userRole === "owner" && (
                  <Badge variant="secondary" className="text-xs">Read-only</Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(companyData.ssmNumber)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tinNumber">Tax Identification Number (TIN)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="tinNumber" 
                  defaultValue={showSensitiveInfo ? companyData.tinNumber : "C••••••••••1"}
                  readOnly={userRole === "owner"}
                  className={userRole === "owner" ? "bg-muted" : ""}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                >
                  {showSensitiveInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(companyData.tinNumber)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType">Company Type</Label>
              <Input 
                id="companyType" 
                defaultValue={companyData.companyType}
                readOnly={userRole === "owner"}
                className={userRole === "owner" ? "bg-muted" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="incorporationDate">Incorporation Date</Label>
              <Input 
                id="incorporationDate" 
                type="date"
                defaultValue={companyData.incorporationDate}
                readOnly={userRole === "owner"}
                className={userRole === "owner" ? "bg-muted" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Input id="address" defaultValue={companyData.address} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">{t("industry")}</Label>
              <Input id="industry" defaultValue={companyData.industry} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessNature">Business Nature</Label>
              <Input id="businessNature" defaultValue={companyData.businessNature} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paidUpCapital">Paid-up Capital</Label>
              <Input id="paidUpCapital" defaultValue={companyData.paidUpCapital} />
            </div>
          </div>
          <Button>{t("saveChanges")}</Button>
        </CardContent>
      </Card>

      {/* Bank Information Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Bank Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input 
                id="bankName" 
                defaultValue={bankData.bankName}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountHolder">Account Holder Name</Label>
              <Input 
                id="accountHolder" 
                defaultValue={bankData.accountHolder}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="accountNumber" 
                  defaultValue={maskAccountNumber(bankData.accountNumber)}
                  readOnly
                  className="bg-muted"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBankDetails(!showBankDetails)}
                >
                  {showBankDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(bankData.accountNumber)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="swiftCode">SWIFT Code</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="swiftCode" 
                  defaultValue={bankData.swiftCode}
                  readOnly
                  className="bg-muted"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(bankData.swiftCode)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Digital Payment Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duitnowId">DuitNow ID</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="duitnowId" 
                    defaultValue={bankData.duitnowId}
                    readOnly
                    className="bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(bankData.duitnowId)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="merchantId">Merchant ID</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="merchantId" 
                    defaultValue={bankData.merchantId}
                    readOnly
                    className="bg-muted"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(bankData.merchantId)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Shield className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800">
              Bank information is managed by your financial institution and cannot be modified here. 
              Contact your bank for any changes.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t("communicationPreferences")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="emailNotifications" defaultChecked />
              <Label htmlFor="emailNotifications">
                {t("emailNotifications")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="smsNotifications" defaultChecked />
              <Label htmlFor="smsNotifications">{t("smsNotifications")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="marketingEmails" />
              <Label htmlFor="marketingEmails">{t("marketingEmails")}</Label>
            </div>
          </div>
          <Button>{t("savePreferences")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
