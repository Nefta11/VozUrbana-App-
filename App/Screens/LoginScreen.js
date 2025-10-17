import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

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
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <LinearGradient
        colors={["#4A90E2", "#357ABD", "#2E5C8A"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <MaterialIcons name="wifi" size={32} color="white" />
          </View>
          <Text style={styles.logoText}>mi voz</Text>
          <Text style={styles.logoSubtext}>urbana</Text>
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
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
          >
            <View style={styles.googleButtonContent}>
              <MaterialIcons name="account-circle" size={20} color="#4285F4" />
              <Text style={styles.googleButtonText}>
                Iniciar sesión con google
              </Text>
            </View>
          </TouchableOpacity>

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
  logoIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "600",
    color: "white",
    marginBottom: -5,
  },
  logoSubtext: {
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    opacity: 0.9,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.85,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    marginTop: 50,
    width: '100%',
    alignSelf: 'center',
  },
  primaryButton: {
    backgroundColor: '#1E5AA8',
    borderRadius: 25,
    paddingVertical: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  guestButton: {
    backgroundColor: '#28A745',
    borderRadius: 25,
    paddingVertical: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  guestButtonText: {
    color: "white",
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
    color: "white",
    fontSize: 16,
    opacity: 0.85,
  },
  signUpLink: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
