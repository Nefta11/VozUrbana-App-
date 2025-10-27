import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, gradients } from "../utils/colors";
import GoogleButtonComponent from "../Components/GoogleButtonComponent";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const handleLogin = () => {
    console.log("Iniciar sesión pressed");
  };

  const handleGoogleLogin = () => {
    console.log("Iniciar sesión con Google pressed");
  };

  const handleGuestEntry = () => {
    console.log("Entrar como invitado pressed");
  };

  const handleSignUp = () => {
    console.log("Sign In pressed");
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
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/White.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Bienvenido de Nuevo</Text>
          <Text style={styles.welcomeSubtitle}>
            Inicia sesión para acceder a tu cuenta y{"\n"}gestionar tus reportes
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
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
        </View>

        {/* Sign Up Section */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpQuestion}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logoImage: {
    width: 132,
    height: 132,
    marginBottom: 8,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.textWhite,
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    marginTop: 50,
    width: '100%',
    alignSelf: 'center',
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
    marginTop: 30,
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
