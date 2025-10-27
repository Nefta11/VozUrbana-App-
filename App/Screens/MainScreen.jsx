import React, { useState } from 'react';
import LoaderScreen from './LoaderScreen';
import LoginScreen from './LoginScreen';

export default function MainScreen() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoaderComplete = () => {
        setShowLogin(true);
    };

    if (!showLogin) {
        return <LoaderScreen onComplete={handleLoaderComplete} />;
    }

    return <LoginScreen animated={true} />;
}