import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Camera, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FaceVerificationFormProps {
  onBack?: () => void;
  onComplete?: () => void;
}

export function FaceVerificationForm({
  onBack,
  onComplete,
}: FaceVerificationFormProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // When component mounts, check for camera support
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Camera API not supported in this browser");
    }

    // Clean up function to stop the camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };

  const startCamera = async () => {
    try {
      setDebugInfo("Starting camera initialization...");

      // Reset any previous errors
      setError(null);

      // Check if videoRef is available
      if (!videoRef.current) {
        setDebugInfo("Video ref is null during startCamera call");
        setError(
          "Video element not found. Please try again or use a different browser."
        );
        return;
      }

      setDebugInfo("Requesting camera access...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setDebugInfo("Camera access granted. Setting up video stream...");

      // Double check that videoRef is still valid
      if (!videoRef.current) {
        setDebugInfo("Video ref became null after getUserMedia");
        setError("Video element lost. Please try again.");
        // Make sure to stop the stream we just got
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      // Directly set the srcObject
      videoRef.current.srcObject = stream;

      // Force a play attempt
      try {
        setDebugInfo("Attempting to play video...");
        await videoRef.current.play();
        setDebugInfo("Video is now playing");
        setIsCameraActive(true);
        setHasPermission(true);
      } catch (playErr) {
        const error = playErr as Error;
        setDebugInfo(`Error playing video: ${error.message}`);
        setError(`Could not start video: ${error.message}`);
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (err: unknown) {
      console.error("Error accessing camera:", err);
      const error = err as Error;
      setDebugInfo(`Camera error: ${error.name} - ${error.message}`);

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setError(t("cameraPermissionDenied"));
        } else if (error.name === "NotFoundError") {
          setError("No camera found. Please connect a camera.");
        } else if (error.name === "NotReadableError") {
          setError("Camera is in use by another application.");
        } else {
          setError(`Camera error: ${error.message}`);
        }
      } else {
        setError(`Camera error: ${error.message}`);
      }

      setHasPermission(false);
    }
  };

  const captureImage = () => {
    try {
      if (!videoRef.current) {
        setDebugInfo("Video ref is null during capture");
        setError("Video element not found. Cannot capture image.");
        return;
      }

      if (!canvasRef.current) {
        setDebugInfo("Canvas ref is null during capture");
        setError("Canvas element not found. Cannot capture image.");
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        setDebugInfo("Could not get canvas context");
        setError("Could not initialize image capture");
        return;
      }

      setDebugInfo(
        `Capturing image. Video dimensions: ${video.videoWidth}x${video.videoHeight}, Video ready state: ${video.readyState}`
      );

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Draw the current frame from video to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageDataUrl);
      setDebugInfo("Image captured successfully");

      // Stop the camera
      stopCamera();
      setIsCameraActive(false);
    } catch (err: unknown) {
      const error = err as Error;
      setDebugInfo(`Error capturing image: ${error.message}`);
      setError(`Error capturing image: ${error.message}`);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
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
            <>
              {isCameraActive ? (
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-primary">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute min-w-full min-h-full object-cover"
                    style={{ transform: "scaleX(-1)" }} // Mirror effect
                  />
                  {/* Overlay with face outline guide */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-dashed border-white rounded-full opacity-50"></div>
                  </div>
                </div>
              ) : (
                <div
                  className="w-64 h-64 rounded-full bg-muted flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 cursor-pointer"
                  onClick={startCamera}
                >
                  <Camera className="h-20 w-20 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {t("clickToStartCamera")}
                  </span>
                </div>
              )}
            </>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <p className="text-center text-sm text-muted-foreground">
            {capturedImage
              ? t("faceVerificationComplete")
              : isCameraActive
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
              <Button variant="outline" onClick={retakePhoto}>
                {t("retake")}
              </Button>
              <Button onClick={onComplete}>{t("complete")}</Button>
            </div>
          ) : (
            isCameraActive && (
              <Button onClick={captureImage}>{t("capture")}</Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
