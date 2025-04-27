
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
  error?: string;
}

export function useDeviceLocation() {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your device");
      return;
    }

    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setIsLoading(false);
        setPermissionDenied(false);
      },
      (error) => {
        setLocation(prev => ({ ...prev, error: error.message }));
        setIsLoading(false);
        if (error.code === 1) { // PERMISSION_DENIED
          setPermissionDenied(true);
          toast.error("Location permission denied. Please enable location services to continue.");
        } else {
          toast.error(`Error getting location: ${error.message}`);
        }
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const checkLocationProximity = (targetLat: number, targetLng: number, radiusMeters = 100): boolean => {
    if (!location.latitude || !location.longitude) return false;
    
    // Haversine formula to calculate distance between two points
    const R = 6371e3; // Earth radius in meters
    const φ1 = (location.latitude * Math.PI) / 180;
    const φ2 = (targetLat * Math.PI) / 180;
    const Δφ = ((targetLat - location.latitude) * Math.PI) / 180;
    const Δλ = ((targetLng - location.longitude) * Math.PI) / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance <= radiusMeters;
  };

  return {
    location,
    isLoading,
    permissionDenied,
    requestLocation,
    checkLocationProximity
  };
}
