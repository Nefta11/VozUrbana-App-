import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

/**
 * LeafletMap - Componente de mapa usando Leaflet
 */
const LeafletMap = ({ reports = [] }) => {
  
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mapa de Reportes</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        // Inicializar el mapa centrado en México
        const map = L.map('map').setView([19.4326, -99.1332], 12);
        
        // Agregar capa de tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Iconos personalizados para diferentes categorías
        const categoryIcons = {
          saneamiento: '💧',
          infraestructura: '🏗️',
          salud: '🏥',
          seguridad: '🔒',
          ambiente: '🌱',
          servicios: '⚡',
          transporte: '🚌',
          residuos: '🗑️'
        };
        
        // Reportes de ejemplo
        const sampleReports = [
          { lat: 19.4326, lng: -99.1332, category: 'saneamiento', title: 'Fuga de agua' },
          { lat: 19.4400, lng: -99.1300, category: 'infraestructura', title: 'Bache en vialidad' },
          { lat: 19.4280, lng: -99.1280, category: 'ambiente', title: 'Área verde dañada' },
          { lat: 19.4350, lng: -99.1350, category: 'servicios', title: 'Luz pública descompuesta' },
          { lat: 19.4380, lng: -99.1320, category: 'seguridad', title: 'Falta de iluminación' }
        ];
        
        // Agregar marcadores al mapa
        sampleReports.forEach(report => {
          const icon = categoryIcons[report.category] || '📍';
          const marker = L.marker([report.lat, report.lng]).addTo(map);
          marker.bindPopup(\`
            <div style="text-align: center;">
              <div style="font-size: 20px; margin-bottom: 5px;">\${icon}</div>
              <strong>\${report.title}</strong>
            </div>
          \`);
        });
        
        // Deshabilitar zoom con scroll
        map.scrollWheelZoom.disable();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: mapHtml }}
        style={styles.webview}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  webview: {
    flex: 1,
  },
});

export default LeafletMap;