import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Camera, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCamera } from "@/hooks/useCamera";

const FACE_VIDEO_ID = "face-verification-video";

interface FaceVerificationFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export function FaceVerificationForm({
  onBack,
  onComplete,
}: FaceVerificationFormProps) {
  const { t } = useTranslation();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [browserInfo, setBrowserInfo] = useState<string | null>(null);

  const {
    videoRef,
    isActive,
    isLoading,
    error,
    debugInfo,
    startCamera,
    stopCamera,
    captureImage,
  } = useCamera({
    facingMode: "user",
    width: 1280,
    height: 720,
    videoElementId: FACE_VIDEO_ID,
  });

  const handleCapture = () => {
    const image = captureImage();
    if (image) {
      setCapturedImage(image);
      stopCamera();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const showBrowserInfo = () => {
    const info = `
      User Agent: ${navigator.userAgent}
      Platform: ${navigator.platform}
      mediaDevices supported: ${!!navigator.mediaDevices}
      getUserMedia supported: ${!!(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      )}
    `;
    setBrowserInfo(info);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-large">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t("faceVerification")}</h1>
            <p className="text-muted-foreground">
              {t("faceVerificationDescription")}
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {debugInfo && (
          <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
            <AlertDescription className="text-xs font-mono">
              {debugInfo}
            </AlertDescription>
          </Alert>
        )}

        {browserInfo && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <AlertDescription className="text-xs font-mono whitespace-pre-wrap">
              {browserInfo}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col items-center justify-center space-y-6">
          {capturedImage ? (
            <div className="relative">
              <img
                src={capturedImage}
                alt="Captured face"
                className="w-64 h-64 rounded-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          ) : (
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-primary">
              <video
                id={FACE_VIDEO_ID}
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute min-w-full min-h-full object-cover"
                style={{ transform: "scaleX(-1)" }} // Mirror effect
              />

              {!isActive && !isLoading && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 cursor-pointer"
                  onClick={startCamera}
                >
                  <Camera className="h-16 w-16 text-white mb-2" />
                  <span className="text-sm text-white">
                    {t("clickToStartCamera")}
                  </span>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="text-white text-sm">
                    Initializing camera...
                  </div>
                </div>
              )}

              {/* Overlay with face outline guide - only show when camera is active */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-white rounded-full opacity-50"></div>
                </div>
              )}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            {capturedImage
              ? t("faceVerificationComplete")
              : isLoading
              ? "Starting camera..."
              : isActive
              ? t("faceVerificationInstructions")
              : t("faceVerificationStart")}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={onBack} variant="outline">
            {t("back")}
          </Button>

          {capturedImage ? (
            <div className="space-x-2">
              <Button variant="outline" onClick={handleRetake}>
                {t("retake")}
              </Button>
              <Button onClick={onComplete}>{t("complete")}</Button>
            </div>
          ) : (
            <>
              {isActive && (
                <Button onClick={handleCapture}>{t("capture")}</Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
