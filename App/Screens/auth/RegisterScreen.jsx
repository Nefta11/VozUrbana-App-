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
    ImageBackground,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, gradients } from '../../utils/colors';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();

    const handleRegister = async () => {
        // Validar que los campos no estén vacíos
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
            return;
        }

        // Validar longitud mínima de contraseña
        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setLoading(true);

        try {
            const userData = {
                name: fullName.trim(),
                email: email.trim().toLowerCase(),
                password: password,
            };

            const result = await register(userData);

            if (result.success) {
                Alert.alert(
                    'Registro exitoso',
                    'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Login')
                        }
                    ]
                );
                
                // Limpiar formulario
                setFullName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                Alert.alert('Error de registro', result.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ha ocurrido un error inesperado');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        if (navigation) {
            navigation.goBack();
        }
    };

    const handleLogin = () => {
        if (navigation) {
            navigation.navigate('Login');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

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
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={handleGoBack}
                        disabled={loading}
                    >
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

            {/* Formulario de registro */}
            <ScrollView 
                style={styles.formContainer} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.formTitle}>Crea tu cuenta</Text>
                <Text style={styles.formSubtitle}>Únete a Voz Urbana y ayuda a mejorar tu comunidad</Text>

                {/* Campo de nombre completo */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Nombre Completo</Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Tu nombre completo"
                            placeholderTextColor={colors.textPlaceholder}
                            value={fullName}
                            onChangeText={setFullName}
                            autoCapitalize="words"
                            editable={!loading}
                        />
                    </View>
                </View>

                {/* Campo de correo */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Correo Electrónico</Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="tu@email.com"
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
                            placeholder="Mínimo 6 caracteres"
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

                {/* Campo de confirmar contraseña */}
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Confirmar Contraseña</Text>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Repite tu contraseña"
                            placeholderTextColor={colors.textPlaceholder}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            editable={!loading}
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={loading}
                        >
                            <MaterialIcons
                                name={showConfirmPassword ? "visibility" : "visibility-off"}
                                size={20}
                                color={colors.textGray}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botón de registro */}
                <TouchableOpacity 
                    style={[styles.registerButton, loading && styles.registerButtonDisabled]} 
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={colors.textWhite} />
                    ) : (
                        <Text style={styles.registerButtonText}>Crear tu cuenta</Text>
                    )}
                </TouchableOpacity>

                {/* Texto de login */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginQuestion}>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={handleLogin} disabled={loading}>
                        <Text style={styles.loginLink}> Inicia sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        height: '35%',
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
        width: 100,
        height: 100,
        marginBottom: 15,
        alignSelf: 'center',
    },
    headerTextContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    headerTitle: {
        color: colors.textWhite,
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1.0,
    },
    headerSubtitle: {
        color: colors.textWhite,
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
        fontWeight: '400',
    },
    // --- FORMULARIO Y CAMPOS DE TEXTO ---
    formContainer: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
        paddingHorizontal: 32,
        paddingTop: 24,
        paddingBottom: 32,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    formTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: colors.textDark,
        textAlign: 'center',
        marginBottom: 6,
    },
    formSubtitle: {
        fontSize: 15,
        color: colors.textGray,
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '400',
    },
    inputSection: {
        marginBottom: 18,
    },
    inputLabel: {
        fontSize: 16,
        color: colors.textDark,
        marginBottom: 8,
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
    // --- BOTÓN DE REGISTRO ---
    registerButton: {
        backgroundColor: colors.buttonPrimary,
        borderRadius: 30,
        paddingVertical: 16,
        marginTop: 16,
        marginBottom: 8,
        shadowColor: colors.buttonPrimary,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    registerButtonDisabled: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: colors.textWhite,
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    // --- TEXTO DE LOGIN ---
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    loginQuestion: {
        color: colors.textGray,
        fontSize: 16,
    },
    loginLink: {
        color: colors.buttonPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
});