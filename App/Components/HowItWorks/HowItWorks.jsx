import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            icon: 'add-circle',
            title: 'Crea un Reporte',
            description: 'Identifica un problema en tu comunidad y créalo usando el formulario'
        },
        {
            id: 2,
            icon: 'location-on',
            title: 'Geolocaliza el Problema',
            description: 'Marca la ubicación exacta en el mapa interactivo'
        },
        {
            id: 3,
            icon: 'photo-camera',
            title: 'Añade Detalles',
            description: 'Describe el problema y añade fotos si es posible'
        },
        {
            id: 4,
            icon: 'track-changes',
            title: 'Seguimiento',
            description: 'Sigue el estado del reporte y recibe actualizaciones'
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>¿Como Funciona?</Text>
                <Text style={styles.subtitle}>Los reportes más relevantes de la comunidad</Text>
            </View>

            <View style={styles.stepsContainer}>
                {steps.map((step, index) => (
                    <View key={step.id} style={styles.stepCard}>
                        <View style={styles.stepIconContainer}>
                            <MaterialIcons name="priority-high" size={20} color={colors.textWhite} />
                        </View>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                        <Text style={styles.stepDescription}>{step.description}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundWhite,
        paddingVertical: 32,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.textGray,
        lineHeight: 22,
        textAlign: 'center',
    },
    stepsContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },
    stepCard: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        padding: 20,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.borderLight,
        alignItems: 'center',
    },
    stepIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.textDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 8,
        textAlign: 'center',
    },
    stepDescription: {
        fontSize: 14,
        color: colors.textGray,
        lineHeight: 20,
        textAlign: 'center',
    },
});