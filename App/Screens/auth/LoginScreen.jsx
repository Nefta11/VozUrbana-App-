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
            placeholderTextColor={colors.textLight}
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
              placeholderTextColor={colors.textLight}
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
    height: '45%',
    backgroundColor: '#8B7355', // Color café de la imagen
    position: 'relative',
  },
  headerOverlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  headerTextContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  headerTitle: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: colors.textWhite,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: 24,
    paddingTop: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
    backgroundColor: colors.backgroundWhite,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: colors.backgroundWhite,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
  },
  eyeButton: {
    padding: 12,
  },
  loginButton: {
    backgroundColor: colors.buttonSecondary,
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: 16,
    color: colors.textLight,
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerQuestion: {
    color: colors.textLight,
    fontSize: 16,
  },
  registerLink: {
    color: colors.buttonPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});