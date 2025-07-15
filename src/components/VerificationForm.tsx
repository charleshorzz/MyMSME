import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VerificationFormProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function VerificationForm({
  onBack,
  onContinue,
}: VerificationFormProps) {
  const { t } = useTranslation();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFrontImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t("fileTooLarge"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFrontImage(event.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t("fileTooLarge"));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setBackImage(event.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t("idVerification")}</h1>
            <p className="text-muted-foreground">{t("uploadIdDescription")}</p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Front ID Card Upload */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t("frontId")}</CardTitle>
            </CardHeader>
            <CardContent>
              {frontImage ? (
                <div className="relative">
                  <img
                    src={frontImage}
                    alt="ID Front"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => setFrontImage(null)}
                  >
                    {t("retake")}
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {t("clickToUpload")}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFrontImageUpload}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          {/* Back ID Card Upload */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t("backId")}</CardTitle>
            </CardHeader>
            <CardContent>
              {backImage ? (
                <div className="relative">
                  <img
                    src={backImage}
                    alt="ID Back"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => setBackImage(null)}
                  >
                    {t("retake")}
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {t("clickToUpload")}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleBackImageUpload}
                  />
                </label>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={onBack} variant="outline">
            {t("back")}
          </Button>
          <Button onClick={onContinue} disabled={!frontImage || !backImage}>
            {t("continue")}
          </Button>
        </div>
      </div>
    </div>
  );
}
