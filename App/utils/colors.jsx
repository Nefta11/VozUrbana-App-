// Archivo de colores y gradientes compartidos para la aplicación VozUrbana

export const colors = {
    // Colores principales
    primary: '#4196E3',
    secondary: '#373598',

    // Colores de botones
    buttonPrimary: '#1778F2',
    buttonSecondary: '#039a6c',
    buttonGoogle: '#4285F4',

    // Colores de texto
    textWhite: '#FFFFFF',
    textDark: '#333333',
    textLight: 'rgba(255, 255, 255, 0.85)',
    textGray: '#666666',
    textPlaceholder: '#999999',

    // Colores de fondo
    backgroundWhite: '#FFFFFF',
    backgroundTransparent: 'rgba(255, 255, 255, 0.15)',
    backgroundInput: '#F8F8F8',

    // Colores de bordes
    borderLight: '#E8E8E8',
    borderSeparator: '#E5E5E5',

    // Colores de sombra
    shadowColor: '#000000',
};

export const gradients = {
    // Gradiente principal de la aplicación
    primaryGradient: {
        colors: ['#4196E3', '#373598'],
        start: { x: 0.1, y: 0 },
        end: { x: 0.9, y: 1 },
        locations: [0.036, 0.515],
    },
};

export default { colors, gradients };