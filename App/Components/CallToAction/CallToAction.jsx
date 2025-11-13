import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { colors } from '../../utils/colors';

export default function CallToAction({ onCreateReport }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    ¿Ves un problema en tu{'\n'}
                    comunidad?
                </Text>
                <Text style={styles.subtitle}>
                    Tu participación es clave para mejorar nuestra{'\n'}
                    ciudad
                </Text>

                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../../assets/images/problem.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={onCreateReport}
                    activeOpacity={0.8}
                >
                    <Text style={styles.ctaButtonText}>Crear un Reporte Ahora</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundWhite,
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: '1000',
        color: colors.textDark,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 30,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textGray,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    illustrationContainer: {
        width: 250,
        height: 200,
        marginBottom: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    ctaButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 5,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        minWidth: 200,
    },
    ctaButtonText: {
        color: colors.textWhite,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});