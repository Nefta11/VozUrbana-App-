import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');

const Toast = ({ visible, message, type = 'success', onHide, duration = 3000 }) => {
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Animación de entrada
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();

            // Auto-ocultar después del tiempo especificado
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        } else {
            hideToast();
        }
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide) onHide();
        });
    };

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#10B981',
                    iconName: 'check-circle',
                };
            case 'error':
                return {
                    backgroundColor: '#EF4444',
                    iconName: 'error',
                };
            case 'warning':
                return {
                    backgroundColor: '#F59E0B',
                    iconName: 'warning',
                };
            case 'info':
                return {
                    backgroundColor: '#3B82F6',
                    iconName: 'info',
                };
            default:
                return {
                    backgroundColor: '#10B981',
                    iconName: 'check-circle',
                };
        }
    };

    const toastStyle = getToastStyle();

    if (!visible && translateY._value === 100) {
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: toastStyle.backgroundColor,
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <View style={styles.content}>
                <MaterialIcons
                    name={toastStyle.iconName}
                    size={24}
                    color="white"
                    style={styles.icon}
                />
                <Text style={styles.message} numberOfLines={2}>
                    {message}
                </Text>
                <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
                    <MaterialIcons name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        zIndex: 9999,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 12,
    },
    message: {
        flex: 1,
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
    },
    closeButton: {
        padding: 4,
        marginLeft: 8,
    },
});

export default Toast;
