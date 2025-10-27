import React, { useState } from 'react';
import LoaderScreen from '../Screens/landing/LoaderScreen';
import LandingScreen from '../Screens/landing/LandingScreen';

/**
 * AppStack - Navegación principal de la aplicación
 * Maneja el flujo de pantallas y transiciones
 */
export default function AppStack() {
    const [showLanding, setShowLanding] = useState(false);

    const handleLoaderComplete = () => {
        setShowLanding(true);
    };

    // Renderizado condicional de pantallas
    if (!showLanding) {
        return <LoaderScreen onComplete={handleLoaderComplete} />;
    }

    return <LandingScreen animated={true} />;
}

// Registro de pantallas disponibles
export const screens = {
    LOADER: 'LoaderScreen',
    LANDING: 'LandingScreen',
    // Aquí se pueden agregar más pantallas en el futuro
    // LOGIN: 'LoginScreen',
    // HOME: 'HomeScreen',
    // PROFILE: 'ProfileScreen',
};