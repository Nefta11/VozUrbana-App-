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

    // Colores de fondo
    backgroundWhite: '#FFFFFF',
    backgroundTransparent: 'rgba(255, 255, 255, 0.15)',

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