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
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            {/* Header con imagen de fondo */}
            <View style={styles.header}>
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
            </View>

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
                            placeholderTextColor="#999999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
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
                                color="#666666"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Botón de login */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                {/* Separador - NOTA: La imagen no muestra un separador 'O', pero lo he dejado simplificado */}
                {/* Si no lo necesitas, puedes borrar el componente 'separator' y sus estilos. */}
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
        backgroundColor: '#FFFFFF',
    },
    // --- HEADER Y IMAGEN DE FONDO ---
    header: {
        height: '40%',
        backgroundColor: '#8B7355', // Color café de fondo
        position: 'relative',
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
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 1.2,
    },
    headerSubtitle: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '400',
    },
    // --- FORMULARIO Y CAMPOS DE TEXTO ---
    formContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 32,
        paddingTop: 28,
        paddingBottom: 32,
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
        justifyContent: 'flex-start',
    },
    formTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 6,
    },
    formSubtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 28,
        fontWeight: '400',
    },
    inputSection: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 10,
        fontWeight: '600',
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        paddingHorizontal: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333333',
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333333',
    },
    eyeButton: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    // --- BOTÓN DE LOGIN ---
    loginButton: {
        backgroundColor: '#28A745', 
        borderRadius: 30,
        paddingVertical: 16,
        marginTop: 12,
        marginBottom: 8,
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
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.5,
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
        backgroundColor: '#E5E5E5',
    },
    separatorText: {
        marginHorizontal: 14,
        color: '#666666',
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
        color: '#666666',
        fontSize: 16,
    },
    registerLink: {
        color: '#007AFF', // Azul como en la imagen
        fontSize: 16,
        fontWeight: '600',
    },
});