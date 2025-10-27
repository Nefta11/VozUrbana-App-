import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoaderScreen from './App/Screens/landing/LoaderScreen';
import LandingScreen from './App/Screens/landing/LandingScreen';

export default function App() {
  const [showLanding, setShowLanding] = useState(false);

  const handleLoaderComplete = () => {
    setShowLanding(true);
  };

  return (
    <>
      {!showLanding ? (
        <LoaderScreen onComplete={handleLoaderComplete} />
      ) : (
        <LandingScreen animated={true} />
      )}
      <StatusBar style="light" />
    </>
  );
}
