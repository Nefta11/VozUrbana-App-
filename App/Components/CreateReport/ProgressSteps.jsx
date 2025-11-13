import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const ProgressSteps = ({ currentStep, steps }) => {
  return (
    <View style={styles.progressContainer}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        return (
          <View key={stepNumber} style={styles.stepIndicator}>
            <View style={[
              styles.stepCircle,
              stepNumber <= currentStep && styles.stepCircleActive
            ]}>
              <Text style={[
                styles.stepNumber,
                stepNumber <= currentStep && styles.stepNumberActive
              ]}>
                {stepNumber}
              </Text>
            </View>
            <Text style={[
              styles.stepLabel,
              stepNumber <= currentStep && styles.stepLabelActive
            ]}>
              {step}
            </Text>
            {stepNumber < steps.length && (
              <View style={[
                styles.stepConnector,
                stepNumber < currentStep && styles.stepConnectorActive
              ]} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: colors.backgroundLight,
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textGray,
  },
  stepNumberActive: {
    color: colors.textWhite,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  stepConnector: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: colors.borderLight,
    zIndex: -1,
  },
  stepConnectorActive: {
    backgroundColor: colors.primary,
  },
});

export default ProgressSteps;
