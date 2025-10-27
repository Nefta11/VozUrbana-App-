import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppStack from './App/navigation/AppStack';

export default function App() {
  return (
    <>
      <AppStack />
      <StatusBar style="light" />
    </>
  );
}
