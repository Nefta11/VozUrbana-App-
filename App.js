import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {AuthProvider} from './App/context/AuthContext';
import AppStack from './App/navigation/AppStack';

export default function App() {
  return (
    <AuthProvider>
      <AppStack />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
