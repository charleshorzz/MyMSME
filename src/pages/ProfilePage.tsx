import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Building, Phone } from "lucide-react";

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">{t("profile")}</h1>
        <p className="text-muted-foreground">{t("manageYourProfile")}</p>
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
              <Input id="position" defaultValue={t("owner")} />
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
              <Input id="companyName" defaultValue="明辉企业" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessId">{t("businessId")}</Label>
              <Input id="businessId" defaultValue="MY12345678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Input id="address" defaultValue="吉隆坡市中心123号" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">{t("industry")}</Label>
              <Input id="industry" defaultValue={t("retail")} />
            </div>
          </div>
          <Button>{t("saveChanges")}</Button>
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
              <input type="checkbox" id="emailNotifications" defaultChecked />
              <Label htmlFor="emailNotifications">
                {t("emailNotifications")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="smsNotifications" defaultChecked />
              <Label htmlFor="smsNotifications">{t("smsNotifications")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="marketingEmails" />
              <Label htmlFor="marketingEmails">{t("marketingEmails")}</Label>
            </div>
          </div>
          <Button>{t("savePreferences")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
