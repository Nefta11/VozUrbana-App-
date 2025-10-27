import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, gradients } from '../../utils/colors';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
            return;
        }

        // Aquí iría la lógica de autenticación
        console.log('Login attempt:', { email, password });
        Alert.alert('Login', 'Funcionalidad de login en desarrollo');
    };

    const handleGoBack = () => {
        if (navigation) {
            navigation.goBack();
        }
    };

    const handleRegister = () => {
        console.log('Navigate to Register');
        Alert.alert('Registro', 'Navegación a registro en desarrollo');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header con imagen de fondo */}
            <View style={styles.header}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}
                    style={styles.headerOverlay}
                >
                    {/* Botón de regreso */}
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../assets/White.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Texto descriptivo */}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>CONECTA. REPORTA. TRANSFORMA.</Text>
                        <Text style={styles.headerSubtitle}>
                            Tu voz cuenta para hacer de tu ciudad un lugar{'\n'}mejor para todos
                        </Text>
                    </View>
                </LinearGradient>
            </View>

            {/* Formulario de login */}
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Inicia Sesión</Text>
                <Text style={styles.formSubtitle}>Ingresa tus datos</Text>

                {/* Campo de correo */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Loisbecket@gmail.com"
                        placeholderTextColor="#999999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Campo de contraseña */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Contraseña</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="••••••••"
                            placeholderTextColor="#999999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <MaterialIcons
                                name={showPassword ? "visibility" : "visibility-off"}
                                size={20}
                                color={colors.textLight}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botón de login */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                {/* Separador */}
                <View style={styles.separator}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>O</Text>
                    <View style={styles.separatorLine} />
                </View>

                {/* Texto de registro */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerQuestion}>¿No tienes una cuenta?</Text>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.registerLink}> Regístrate aquí</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
    },
    header: {
        height: '50%',
        backgroundColor: '#8B7355', // Color café de la imagen
        position: 'relative',
    },
    headerOverlay: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'flex-start',
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 8,
        marginBottom: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    headerTextContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    headerTitle: {
        color: colors.textWhite,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 1.2,
    },
    headerSubtitle: {
        color: colors.textWhite,
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.95,
        lineHeight: 22,
        fontWeight: '400',
    },
    formContainer: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    formTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.textDark,
        textAlign: 'center',
        marginBottom: 6,
    },
    formSubtitle: {
        fontSize: 16,
        color: colors.textLight,
        textAlign: 'center',
        marginBottom: 32,
        fontWeight: '400',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 10,
        fontWeight: '600',
    },
    textInput: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: colors.textDark,
        backgroundColor: '#FAFAFA',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: colors.textDark,
    },
    eyeButton: {
        padding: 16,
    },
    loginButton: {
        backgroundColor: '#28A745', // Verde como en la imagen
        borderRadius: 30,
        paddingVertical: 18,
        marginTop: 16,
        shadowColor: '#28A745',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    loginButtonText: {
        color: colors.textWhite,
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    separatorText: {
        marginHorizontal: 16,
        color: colors.textLight,
        fontSize: 14,
        fontWeight: '500',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 30,
    },
    registerQuestion: {
        color: colors.textLight,
        fontSize: 16,
    },
    registerLink: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});