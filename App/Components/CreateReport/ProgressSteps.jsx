import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const ProgressSteps = ({ currentStep, steps }) => {
  return (
    <View style={styles.progressContainer}>
      {/* Línea continua de fondo */}
      <View style={styles.backgroundLine} />
      
      {/* Línea de progreso */}
      <View style={[
        styles.progressLine,
        { width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }
      ]} />
      
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        
        return (
          <View key={stepNumber} style={styles.stepIndicator}>
            <View style={[
              styles.stepCircle,
              isActive && styles.stepCircleActive
            ]}>
              <Text style={[
                styles.stepNumber,
                isActive && styles.stepNumberActive
              ]}>
                {stepNumber}
              </Text>
            </View>
            <Text style={[
              styles.stepLabel,
              isActive && styles.stepLabelActive
            ]}>
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: colors.backgroundLight,
    position: 'relative',
  },
  backgroundLine: {
    position: 'absolute',
    top: 34,
    left: 54,
    right: 54,
    height: 2,
    backgroundColor: '#E5E7EB',
    zIndex: 1,
  },
  progressLine: {
    position: 'absolute',
    top: 34,
    left: 54,
    height: 2,
    backgroundColor: '#0043CE',
    zIndex: 2,
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    zIndex: 3,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  stepCircleActive: {
    backgroundColor: '#0043CE',
    borderColor: '#0043CE',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  stepNumberActive: {
    color: colors.textWhite,
  },
  stepLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 60,
  },
  stepLabelActive: {
    color: '#0043CE',
    fontWeight: '600',
  },
});

export default ProgressSteps;
