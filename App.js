import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './App/context/AuthContext';
import { ReportProvider } from './App/context/ReportContext';
import AppStack from './App/navigation/AppStack';

export default function App() {
  return (
    <AuthProvider>
      <ReportProvider>
        <AppStack />
        <StatusBar style="light" />
      </ReportProvider>
    </AuthProvider>
  );
}
