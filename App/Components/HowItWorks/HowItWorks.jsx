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
            description: 'Identifica un problema en tu comunidad y crealo usando el formulario'
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
                            <MaterialIcons name={step.icon} size={24} color={colors.textWhite} />
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>{step.title}</Text>
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>

                        {/* Connector line - no mostrar en el último paso */}
                        {index < steps.length - 1 && <View style={styles.connector} />}
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
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textGray,
        lineHeight: 20,
    },
    stepsContainer: {
        paddingHorizontal: 20,
    },
    stepCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
        position: 'relative',
    },
    stepIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stepContent: {
        flex: 1,
        paddingTop: 2,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 6,
    },
    stepDescription: {
        fontSize: 14,
        color: colors.textGray,
        lineHeight: 20,
    },
    connector: {
        position: 'absolute',
        left: 23,
        top: 48,
        width: 2,
        height: 24,
        backgroundColor: colors.borderLight,
    },
});