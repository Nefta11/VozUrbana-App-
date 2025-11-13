import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/home/HomeScreen';
import ReportsScreen from '../Screens/reports/ReportsScreen';
import CreateReportScreen from '../Screens/reports/CreateReportScreen';
import ProfileScreen from '../Screens/profile/ProfileScreen';
import BottomTabBar from '../Components/navigation/BottomTabBar';

const Tab = createBottomTabNavigator();

/**
 * MainTabNavigator - Navegador principal con tabs inferiores
 * Utiliza la barra de navegación personalizada estilo Spotify
 */
const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                // Configuraciones adicionales para mejorar la experiencia
                lazy: true,
                tabBarHideOnKeyboard: true,
            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarAccessibilityLabel: 'Pantalla de inicio',
                }}
            />
            <Tab.Screen
                name="Reports"
                component={ReportsScreen}
                options={{
                    tabBarAccessibilityLabel: 'Lista de reportes',
                }}
            />
            <Tab.Screen
                name="CreateReport"
                component={CreateReportScreen}
                options={{
                    tabBarAccessibilityLabel: 'Crear nuevo reporte',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarAccessibilityLabel: 'Mi perfil de usuario',
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;