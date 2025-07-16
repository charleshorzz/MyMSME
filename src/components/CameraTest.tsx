import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Camera, CheckCircle } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";

const VIDEO_ELEMENT_ID = "camera-test-video";

export function CameraTest() {
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
    videoElementId: VIDEO_ELEMENT_ID,
    facingMode: "user",
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
    <div className="p-6 max-w-md mx-auto bg-white min-h-screen flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Camera Test</h2>

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

      <div
        className="mb-4 bg-gray-100 rounded-lg overflow-hidden relative"
        style={{ height: "300px" }}
      >
        {capturedImage ? (
          <div className="relative h-full">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        ) : (
          <>
            <video
              id={VIDEO_ELEMENT_ID}
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            ></video>

            {!isActive && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={startCamera}
                >
                  <Camera className="h-12 w-12 text-gray-500 mb-2" />
                  <p className="text-gray-700">Click to start camera</p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <p className="text-white">Initializing camera...</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex gap-4 justify-center mb-4">
        {capturedImage ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={handleRetake}>
              Retake
            </Button>
            <Button>Use Photo</Button>
          </div>
        ) : (
          isActive && <Button onClick={handleCapture}>Capture</Button>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={showBrowserInfo}>
          Show Browser Info
        </Button>
      </div>
    </div>
  );
}
