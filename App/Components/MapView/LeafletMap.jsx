import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

/**
 * LeafletMap - Componente de mapa usando Leaflet
 */
const LeafletMap = ({ reports = [], onLocationSelect, selectable = false }) => {

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
          seguridadpublica: '🚑',
          seguridad: '🔒',
          medioambiente: '🌱',
          serviciospublicos: '⚡'
        };
        
        // Colores para cada categoría
        const categoryColors = {
          saneamiento: '#3b82f6',
          infraestructura: '#f97316',
          seguridadpublica: '#ef4444',
          seguridad: '#8b5cf6',
          medioambiente: '#10b981',
          serviciospublicos: '#06b6d4'
        };
        
        // Reportes de ejemplo con las nuevas categorías
        const sampleReports = [
          { lat: 19.4326, lng: -99.1332, category: 'saneamiento', title: 'Fuga de agua en tubería principal' },
          { lat: 19.4400, lng: -99.1300, category: 'infraestructura', title: 'Bache profundo en Av. Insurgentes' },
          { lat: 19.4280, lng: -99.1280, category: 'medioambiente', title: 'Área verde abandonada' },
          { lat: 19.4350, lng: -99.1350, category: 'serviciospublicos', title: 'Luz pública descompuesta' },
          { lat: 19.4380, lng: -99.1320, category: 'seguridad', title: 'Zona mal iluminada' },
          { lat: 19.4310, lng: -99.1310, category: 'seguridadpublica', title: 'Accidente vial reportado' }
        ];
        
        // Agregar marcadores al mapa
        sampleReports.forEach(report => {
          const icon = categoryIcons[report.category] || '📍';
          const color = categoryColors[report.category] || '#3b82f6';
          
          // Crear icono personalizado
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: \`
              <div style="
                background-color: \${color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                font-size: 14px;
              ">\${icon}</div>
            \`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });
          
          const marker = L.marker([report.lat, report.lng], { icon: customIcon }).addTo(map);
          marker.bindPopup(\`
            <div style="text-align: center; padding: 8px; min-width: 200px;">
              <div style="
                font-size: 18px; 
                margin-bottom: 8px; 
                padding: 8px;
                background-color: \${color};
                color: white;
                border-radius: 8px;
                font-weight: bold;
              ">\${icon} \${report.category.charAt(0).toUpperCase() + report.category.slice(1)}</div>
              <div style="font-weight: bold; margin-bottom: 4px; color: #333;">\${report.title}</div>
              <div style="font-size: 12px; color: #666;">Toca para más detalles</div>
            </div>
          \`);
        });
        
        // Deshabilitar zoom con scroll
        map.scrollWheelZoom.disable();

        // Agregar funcionalidad para seleccionar ubicación si está habilitada
        const selectable = ${selectable};
        let selectedMarker = null;

        if (selectable) {
          map.on('click', function(e) {
            const lat = e.latlng.lat.toFixed(6);
            const lng = e.latlng.lng.toFixed(6);

            // Remover marcador anterior si existe
            if (selectedMarker) {
              map.removeLayer(selectedMarker);
            }

            // Crear icono personalizado para ubicación seleccionada
            const selectedIcon = L.divIcon({
              className: 'selected-marker',
              html: \`
                <div style="
                  background-color: #ef4444;
                  width: 40px;
                  height: 40px;
                  border-radius: 50% 50% 50% 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 3px solid white;
                  box-shadow: 0 3px 10px rgba(0,0,0,0.4);
                  transform: rotate(-45deg);
                  position: relative;
                ">
                  <div style="
                    font-size: 20px;
                    transform: rotate(45deg);
                  ">📍</div>
                </div>
              \`,
              iconSize: [40, 40],
              iconAnchor: [20, 40]
            });

            // Agregar nuevo marcador
            selectedMarker = L.marker([lat, lng], { icon: selectedIcon }).addTo(map);
            selectedMarker.bindPopup(\`
              <div style="text-align: center; padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">Ubicación seleccionada</div>
                <div style="font-size: 12px; color: #666;">\${lat}, \${lng}</div>
              </div>
            \`).openPopup();

            // Enviar coordenadas a React Native
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                lat: lat,
                lng: lng
              }));
            }
          });
        }
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event) => {
    if (onLocationSelect && selectable) {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        onLocationSelect(data.lat, data.lng);
      } catch (error) {
        console.error('Error parsing location data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: mapHtml }}
        style={styles.webview}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMessage={handleMessage}
        javaScriptEnabled={true}
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