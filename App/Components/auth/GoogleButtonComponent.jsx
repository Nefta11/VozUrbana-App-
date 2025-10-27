import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { colors } from "../../utils/colors";

const GoogleButtonComponent = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.googleButton} onPress={onPress}>
            <View style={styles.googleButtonContent}>
                {/* Cargar la imagen del ícono de Google desde assets */}
                <Image source={require("../../../assets/google.png")} style={styles.icon} />
                <Text style={styles.socialButtonText}>Iniciar sesión con google</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 25,
        paddingVertical: 16,
        marginBottom: 16,
        width: '100%',
        shadowColor: colors.shadowColor,
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
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    socialButtonText: {
        color: colors.textDark,
        fontSize: 16,
        fontWeight: "500",
    },
});

export default GoogleButtonComponent;