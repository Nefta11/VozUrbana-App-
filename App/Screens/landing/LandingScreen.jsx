import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, gradients } from "../../utils/colors";
import GoogleButtonComponent from "../../Components/auth/GoogleButtonComponent";

const { width, height } = Dimensions.get("window");

export default function LandingScreen({ animated = false, onNavigateToLogin, onNavigateToRegister, onNavigateToHome }) {
  // Animaciones
  const logoSlideUp = useRef(new Animated.Value(animated ? height : 0)).current;
  const welcomeSlideUp = useRef(new Animated.Value(animated ? height + 100 : 0)).current;
  const buttonsSlideUp = useRef(new Animated.Value(animated ? height + 200 : 0)).current;
  const signUpSlideUp = useRef(new Animated.Value(animated ? height + 300 : 0)).current;

  useEffect(() => {
    if (animated) {
      startEntranceAnimation();
    }

    // Cleanup: detener animaciones al desmontar el componente
    return () => {
      logoSlideUp.stopAnimation();
      welcomeSlideUp.stopAnimation();
      buttonsSlideUp.stopAnimation();
      signUpSlideUp.stopAnimation();
    };
  }, [animated]);

  const startEntranceAnimation = () => {
    const animationDuration = 600;
    const staggerDelay = 100;

    // Secuencia de animaciones escalonadas
    Animated.stagger(staggerDelay, [
      Animated.timing(logoSlideUp, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(welcomeSlideUp, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(buttonsSlideUp, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(signUpSlideUp, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implementar autenticación con Google
  };

  const handleGuestEntry = () => {
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  const handleSignUp = () => {
    console.log("Sign Up pressed");
    if (onNavigateToRegister) {
      onNavigateToRegister();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <LinearGradient
        colors={gradients.primaryGradient.colors}
        style={styles.gradient}
        start={gradients.primaryGradient.start}
        end={gradients.primaryGradient.end}
        locations={gradients.primaryGradient.locations}
      >
        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ translateY: logoSlideUp }] }
          ]}
        >
          <Image
            source={require('../../../assets/White.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Welcome Section */}
        <Animated.View
          style={[
            styles.welcomeContainer,
            { transform: [{ translateY: welcomeSlideUp }] }
          ]}
        >
          <Text style={styles.welcomeTitle}>Bienvenido de Nuevo</Text>
          <Text style={styles.welcomeSubtitle}>
            Inicia sesión para acceder a tu cuenta y{"\n"}gestionar tus reportes
          </Text>
        </Animated.View>

        {/* Buttons Section */}
        <Animated.View
          style={[
            styles.buttonsContainer,
            { transform: [{ translateY: buttonsSlideUp }] }
          ]}
        >
          {/* Main Login Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {/* Google Login Button */}
          <GoogleButtonComponent onPress={handleGoogleLogin} />

          {/* Guest Entry Button */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuestEntry}
          >
            <Text style={styles.guestButtonText}>Entrar como invitado</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Sign Up Section */}
        <Animated.View
          style={[
            styles.signUpContainer,
            { transform: [{ translateY: signUpSlideUp }] }
          ]}
        >
          <Text style={styles.signUpQuestion}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}> Regístrate</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
  },
  logoImage: {
    width: 132,
    height: 132,
    marginBottom: 2,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: colors.textWhite,
    marginBottom: 16,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 26,
  },
  buttonsContainer: {
    marginTop: 5,
    width: '100%',
    alignSelf: 'center',
    flex: 1.5,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 25,
    paddingVertical: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  guestButton: {
    backgroundColor: colors.buttonSecondary,
    borderRadius: 25,
    paddingVertical: 16,
    width: '100%',
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  guestButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  signUpQuestion: {
    color: colors.textLight,
    fontSize: 16,
  },
  signUpLink: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
