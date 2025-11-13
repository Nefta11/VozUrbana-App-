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
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, gradients } from '../../utils/colors';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../Components/generals/Toast';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

    const { login, user } = useAuth();

    const showToast = (message, type = 'success') => {
        setToast({ visible: true, message, type });
    };

    const handleLogin = async () => {
        if (!email || !password) {
            showToast('Por favor ingresa tu correo y contraseña', 'error');
            return;
        }

        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                // Obtener el nombre del usuario para el mensaje de bienvenida
                const userName = result.user?.name || email.split('@')[0];
                showToast(`¡Bienvenido a Voz Urbana, ${userName}!`, 'success');

                // Navegar después de un breve delay para que se vea el toast
                setTimeout(() => {
                    navigation.navigate('MainTabs');
                }, 1500);
            } else {
                showToast(result.error || 'Error de inicio de sesión', 'error');
            }
        } catch (error) {
            showToast('Ha ocurrido un error inesperado', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        if (navigation) {
            navigation.goBack();
        }
    };

    const handleRegister = () => {
        console.log('Navigate to Register');
        if (navigation) {
            navigation.navigate('Register');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            {/* Toast component */}
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={() => setToast({ ...toast, visible: false })}
            />

            {/* Header con imagen de fondo */}
            <ImageBackground 
                source={require('../../../assets/uno.jpg')}
                style={styles.header}
                resizeMode="cover"
                imageStyle={styles.headerBackgroundImage}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}
                    style={styles.headerOverlay}
                >
                    {/* Botón de regreso */}
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <MaterialIcons name="arrow-back" size={26} color="white" />
                    </TouchableOpacity>

                    {/* Contenido del Header (Logo y Texto) */}
                    <View style={styles.headerContent}>
                        {/* Logo */}
                        <Image
                            source={require('../../../assets/White.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                        
                        {/* Texto descriptivo */}
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle}>CONECTA. REPORTA. TRANSFORMA.</Text>
                            <Text style={styles.headerSubtitle}>
                                Tu voz cuenta para hacer de tu ciudad un lugar{'\n'}mejor para todos
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>

            {/* Formulario de login */}
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Inicia Sesión</Text>
                <Text style={styles.formSubtitle}>Ingresa tus datos</Text>

                {/* Campo de correo */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Correo Electronico</Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Loisbecket@gmail.com"
                            placeholderTextColor={colors.textPlaceholder}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                    </View>
                </View>

                {/* Campo de contraseña */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Contraseña</Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="********"
                            placeholderTextColor={colors.textPlaceholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            editable={!loading}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowPassword(!showPassword)}
                            disabled={loading}
                        >
                            <MaterialIcons
                                name={showPassword ? "visibility" : "visibility-off"}
                                size={20}
                                color={colors.textGray}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botón de login */}
                <TouchableOpacity 
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={colors.textWhite} />
                    ) : (
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    )}
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
                    <TouchableOpacity onPress={handleRegister} disabled={loading}>
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
    // --- HEADER Y IMAGEN DE FONDO ---
    header: {
        height: '40%',
        position: 'relative',
        overflow: 'hidden',
    },
    headerBackgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    headerOverlay: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'flex-start',
    },
    backButton: {
        // La flecha en la imagen está en la esquina superior izquierda
        position: 'absolute',
        top: StatusBar.currentHeight + 10 || 40, 
        left: 20,
        zIndex: 10,
        padding: 5,
    },
    headerContent: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
    },
    logoImage: {
        width: 120,
        height: 120,
        marginBottom: 15,
        alignSelf: 'center',
    },
    headerTextContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    headerTitle: {
        color: colors.textWhite,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 1.2,
    },
    headerSubtitle: {
        color: colors.textWhite,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '400',
    },
    // --- FORMULARIO Y CAMPOS DE TEXTO ---
    formContainer: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
        paddingHorizontal: 32,
        paddingTop: 28,
        paddingBottom: 32,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        justifyContent: 'flex-start',
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
        color: colors.textGray,
        textAlign: 'center',
        marginBottom: 28,
        fontWeight: '400',
    },
    inputSection: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 10,
        fontWeight: '600',
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundInput,
        borderRadius: 12,
        paddingHorizontal: 0,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: colors.textDark,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: colors.textDark,
    },
    eyeButton: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    // --- BOTÓN DE LOGIN ---
    loginButton: {
        backgroundColor: colors.buttonSecondary, 
        borderRadius: 30,
        paddingVertical: 16,
        marginTop: 12,
        marginBottom: 8,
        shadowColor: colors.buttonSecondary,
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
    loginButtonDisabled: { 
        opacity: 0.7,
    },
    // --- SEPARADOR (O) y REGISTRO ---
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 18,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.borderSeparator,
    },
    separatorText: {
        marginHorizontal: 14,
        color: colors.textGray,
        fontSize: 15,
        fontWeight: '500',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    registerQuestion: {
        color: colors.textGray,
        fontSize: 16,
    },
    registerLink: {
        color: colors.buttonPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
});