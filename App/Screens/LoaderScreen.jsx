import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../utils/colors';

const { width, height } = Dimensions.get('window');

export default function LoaderScreen({ onComplete }) {
  const [loadingText, setLoadingText] = useState('Verificando permisos...');
  const [showLogo, setShowLogo] = useState(false);
  
  // Animaciones
  const progressAnim = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoFallAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    startLoadingSequence();
  }, []);

  const startLoadingSequence = () => {
    // Paso 1: Verificando permisos (0-25%)
    setTimeout(() => {
      setLoadingText('Verificando permisos...');
      Animated.timing(progressAnim, {
        toValue: 25,
        duration: 1200,
        useNativeDriver: false,
      }).start();
    }, 500); // Delay inicial para mostrar la pantalla

    // Paso 2: Un momento más (25-60%) + logo aparece
    setTimeout(() => {
      setLoadingText('Un momento más...');
      
      // Mostrar y animar logo
      setShowLogo(true);
      
      // Animar logo cayendo desde arriba + fade in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoFallAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start();
      
      // Iniciar rotación del logo
      startLogoRotation();
      
      // Continuar progreso
      Animated.timing(progressAnim, {
        toValue: 60,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 2000);

    // Paso 3: Lo tenemos (60-100%)
    setTimeout(() => {
      setLoadingText('Lo tenemos...');
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: 1200,
        useNativeDriver: false,
      }).start();
    }, 4000);

    // Finalizar y hacer transición
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 6000);
  };

  const startLogoRotation = () => {
    logoRotation.setValue(0);
    const rotateAnimation = Animated.loop(
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const logoRotate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
        <View style={styles.content}>
          {/* Logo animado - siempre presente pero inicialmente invisible */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [
                  { translateY: logoFallAnim },
                  { rotateY: logoRotate }
                ],
              },
            ]}
          >
            <Image 
              source={require('../../assets/White.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>
          
          {/* Área de carga en la parte inferior */}
          <View style={styles.loadingArea}>
            {/* Barra de progreso */}
            <View style={styles.progressBarContainer}>
              <Animated.View 
                style={[
                  styles.progressBar,
                  { width: progressWidth }
                ]} 
              />
            </View>
            
            {/* Texto de carga */}
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logoImage: {
    width: 140,
    height: 140,
  },
  loadingArea: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '80%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 6,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.textWhite,
    borderRadius: 6,
    shadowColor: colors.textWhite,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  loadingText: {
    color: colors.textWhite,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});