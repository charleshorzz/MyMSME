import { useState, useEffect, useRef, useCallback } from "react";

interface UseCameraOptions {
  facingMode?: "user" | "environment";
  width?: number;
  height?: number;
  videoElementId?: string;
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  debugInfo: string | null;
  stream: MediaStream | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  captureImage: () => string | null;
}

export function useCamera({
  facingMode = "user",
  width = 1280,
  height = 720,
  videoElementId,
}: UseCameraOptions = {}): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 5;

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Log when videoRef changes
  useEffect(() => {
    if (videoRef.current) {
      setDebugInfo(
        `Video element reference exists: ${videoRef.current.id || "no-id"}`
      );
    }
  }, [videoRef.current]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
    setIsLoading(false);
    setDebugInfo("Camera stopped");
    setAttemptCount(0);
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      setDebugInfo("Starting camera...");
      setIsLoading(true);
      setError(null);
      setAttemptCount(0);

      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Your browser doesn't support camera access");
        setIsLoading(false);
        return;
      }

      // First, ensure we have a video element
      await ensureVideoElement();
    } catch (err) {
      const error = err as Error;

      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          setError("Camera permission denied");
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

      setDebugInfo(`Camera error: ${error.name} - ${error.message}`);
      setIsLoading(false);
    }
  }, [facingMode, width, height, videoElementId]);

  const ensureVideoElement = useCallback(async () => {
    // If we've tried too many times, give up
    if (attemptCount >= maxAttempts) {
      setError("Failed to initialize camera after multiple attempts");
      setIsLoading(false);
      return;
    }

    setAttemptCount((prev) => prev + 1);

    // Try to find the video element
    let videoElement = videoRef.current;

    // If we have a specific ID to look for, try that
    if (videoElementId && !videoElement) {
      videoElement = document.getElementById(
        videoElementId
      ) as HTMLVideoElement;
      if (videoElement) {
        setDebugInfo(`Found video element by ID: ${videoElementId}`);
      }
    }

    // If we still don't have a video element, try to find any video element
    if (!videoElement) {
      const videos = document.getElementsByTagName("video");
      if (videos.length > 0) {
        videoElement = videos[0];
        setDebugInfo(
          `Found video element by tag: ${videoElement.id || "no-id"}`
        );
      }
    }

    if (!videoElement) {
      setDebugInfo(
        `Video element not found (attempt ${attemptCount}/${maxAttempts}). Retrying in 300ms...`
      );
      // Wait a bit and try again
      setTimeout(() => {
        ensureVideoElement();
      }, 300);
      return;
    }

    // We have a video element, now try to get camera access
    try {
      setDebugInfo("Video element found. Requesting camera access...");

      // Request camera access with specified constraints
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: width },
          height: { ideal: height },
        },
        audio: false,
      });

      setDebugInfo("Camera access granted!");
      setStream(mediaStream);

      // Connect stream to video element
      videoElement.srcObject = mediaStream;

      // Make sure our ref points to the video element
      if (!videoRef.current && videoElement) {
        // This is a hack since we can't directly set the ref
        // But at least our hook will know about the element
        Object.defineProperty(videoRef, "current", {
          value: videoElement,
          writable: true,
        });
      }

      try {
        await videoElement.play();
        setDebugInfo(
          `Video is playing (${videoElement.videoWidth}x${videoElement.videoHeight})`
        );
        setIsActive(true);
        setIsLoading(false);
      } catch (playErr) {
        const error = playErr as Error;
        setError(`Error playing video: ${error.message}`);
        setDebugInfo(`Error playing video: ${error.message}`);
        setIsLoading(false);
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    } catch (err) {
      const error = err as Error;
      setError(`Camera access error: ${error.message}`);
      setDebugInfo(`Camera access error: ${error.name} - ${error.message}`);
      setIsLoading(false);

      // If this was a permission error, don't retry
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        return;
      }

      // For other errors, retry if we haven't hit the limit
      if (attemptCount < maxAttempts) {
        setTimeout(() => {
          ensureVideoElement();
        }, 500);
      }
    }
  }, [attemptCount, facingMode, width, height, videoElementId]);

  const captureImage = useCallback((): string | null => {
    try {
      if (!videoRef.current) {
        setError("Video element not found. Cannot capture image.");
        return null;
      }

      const videoElement = videoRef.current;

      if (videoElement.readyState !== 4) {
        // HAVE_ENOUGH_DATA
        setError("Video not ready. Please wait a moment and try again.");
        return null;
      }

      // Create a canvas to capture the image
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setError("Could not initialize image capture");
        return null;
      }

      // Set canvas dimensions to match video
      canvas.width = videoElement.videoWidth || width;
      canvas.height = videoElement.videoHeight || height;

      // Draw the current frame from video to canvas
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const imageDataUrl = canvas.toDataURL("image/png");
      setDebugInfo("Image captured successfully");

      return imageDataUrl;
    } catch (err) {
      const error = err as Error;
      setError(`Error capturing image: ${error.message}`);
      return null;
    }
  }, [width, height]);

  return {
    videoRef,
    isActive,
    isLoading,
    error,
    debugInfo,
    stream,
    startCamera,
    stopCamera,
    captureImage,
  };
}
