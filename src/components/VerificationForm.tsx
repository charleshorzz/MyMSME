import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle } from "lucide-react";

interface VerificationFormProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function VerificationForm({
  onBack,
  onContinue,
}: VerificationFormProps) {
  const { t } = useTranslation();
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const handleFrontImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFrontImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackPreview(reader.result as string);
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
            <h1 className="text-3xl font-bold">{t("icVerification")}</h1>
            <p className="text-muted-foreground">{t("uploadICDescription")}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Front IC Upload */}
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Label htmlFor="front-ic" className="text-base font-medium">
                  {t("frontIC")}
                </Label>
                <div className="relative">
                  {frontPreview ? (
                    <div className="relative">
                      <img
                        src={frontPreview}
                        alt="Front IC Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="front-ic"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">
                            {t("clickToUpload")}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {t("supportedFormats")}
                        </p>
                      </div>
                    </label>
                  )}
                  <input
                    id="front-ic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFrontImageUpload}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back IC Upload */}
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-3">
                <Label htmlFor="back-ic" className="text-base font-medium">
                  {t("backIC")}
                </Label>
                <div className="relative">
                  {backPreview ? (
                    <div className="relative">
                      <img
                        src={backPreview}
                        alt="Back IC Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="back-ic"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">
                            {t("clickToUpload")}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {t("supportedFormats")}
                        </p>
                      </div>
                    </label>
                  )}
                  <input
                    id="back-ic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBackImageUpload}
                  />
                </div>
              </div>
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
