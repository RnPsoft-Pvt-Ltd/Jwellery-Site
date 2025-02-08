// utils/GlobalLoadingManager.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const LoadingContext = createContext(null);

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
  }
  return context;
};

export const GlobalLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRegistry = useRef(new Set());
  const loadedImages = useRef(new Set());
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (imageRegistry.current.size === 0) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    const loadedCount = loadedImages.current.size;
    const totalCount = imageRegistry.current.size;
    const progressPercent = Math.round((loadedCount / totalCount) * 100);
    
    setProgress(progressPercent);
    if (loadedCount === totalCount) {
      // Add a small delay before removing loading screen
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  const registerImage = useCallback((src) => {
    if (!imageRegistry.current.has(src)) {
      imageRegistry.current.add(src);
      updateProgress();
    }
  }, [updateProgress]);

  const markImageLoaded = useCallback((src) => {
    if (!loadedImages.current.has(src)) {
      loadedImages.current.add(src);
      updateProgress();
    }
  }, [updateProgress]);

  // Reset on unmount
  useEffect(() => {
    return () => {
      imageRegistry.current.clear();
      loadedImages.current.clear();
    };
  }, []);

  const value = {
    isLoading,
    progress,
    registerImage,
    markImageLoaded
  };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-lg font-light">Loading... {progress}%</p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useImageLoader = (src) => {
  const { registerImage, markImageLoaded } = useGlobalLoading();
  
  useEffect(() => {
    if (!src) return;
    
    registerImage(src);
    const img = new Image();
    
    img.onload = () => markImageLoaded(src);
    img.onerror = () => markImageLoaded(src);
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, registerImage, markImageLoaded]);
};