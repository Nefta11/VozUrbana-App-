import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoaderScreen from '../Screens/landing/LoaderScreen';
import LandingScreen from '../Screens/landing/LandingScreen';
import LoginScreen from '../Screens/auth/LoginScreen';
import RegisterScreen from '../Screens/auth/RegisterScreen';
import HomeScreen from '../Screens/HomeScreen';
import ReportsScreen from '../Screens/ReportsScreen';
import ReportDetailScreen from '../Screens/ReportDetailScreen';
import CreateReportScreen from '../Screens/CreateReportScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createNativeStackNavigator();

/**
 * AppStack - Navegación principal de la aplicación
 * Maneja el flujo de pantallas y transiciones usando React Navigation
 */
const AppStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Loader"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4F46E5',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    animation: 'fade',
                    animationDuration: 350,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            >
                <Stack.Screen
                    name="Loader"
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 300,
                        gestureEnabled: false,
                    }}
                >
                    {({ navigation }) => (
                        <LoaderScreen
                            onComplete={() => navigation.replace('Landing')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Landing"
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 400,
                        gestureEnabled: false,
                    }}
                >
                    {({ navigation }) => (
                        <LandingScreen
                            animated={true}
                            onNavigateToLogin={() => navigation.navigate('Login')}
                            onNavigateToRegister={() => navigation.navigate('Register')}
                            onNavigateToHome={() => navigation.navigate('Home')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        animationDuration: 400,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        animationDuration: 400,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 350,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="Reports"
                    component={ReportsScreen}
                    options={{
                        title: 'Reportes',
                        animation: 'slide_from_right',
                        animationDuration: 350,
                    }}
                />
                <Stack.Screen
                    name="ReportDetail"
                    component={ReportDetailScreen}
                    options={{
                        title: 'Detalle del Reporte',
                        animation: 'slide_from_right',
                        animationDuration: 350,
                    }}
                />
                <Stack.Screen
                    name="CreateReport"
                    component={CreateReportScreen}
                    options={{
                        title: 'Crear Reporte',
                        animation: 'slide_from_bottom',
                        animationDuration: 350,
                    }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        title: 'Mi Perfil',
                        animation: 'slide_from_right',
                        animationDuration: 350,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;