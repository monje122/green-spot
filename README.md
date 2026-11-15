# Green Spot Refresco — Landing Page 3D con Scroll-Scrub

Landing page 3D moderna e inmersiva desarrollada para el legendario refresco **Green Spot** (nacido en 1934). Cuenta con un motor de scrollytelling donde **el video de la botella emergiendo con la explosión de naranja se sincroniza y reproduce con la posición del scroll**.

---

## 🍊 Características Principales

1. **Scroll-Driven Video Scrubbing**:
   - El video de alta definición (`greenspot-bottle.webm`) se sincroniza milimétricamente con el desplazamiento del usuario.
   - Algoritmo con interpolación lineal (**LERP**) en `requestAnimationFrame` para un avance y retroceso suave, sin saltos ni tirones de búfer.
   - Las tarjetas de información narrativa (5 fases históricas y sensoriales) aparecen y desaparecen en sincronía con los momentos cumbre de la explosión del video.

2. **Escena 3D WebGL con Three.js**:
   - Rodajas tridimensionales de naranja flotando con física de gravedad cero y reacción al movimiento del ratón (paralaje 3D).
   - Burbujas de carbonatación y gotas de condensación que ascienden continuamente.
   - Iluminación ambiental, destellos esmeralda (Green Spot) y resplandor naranja Valencia.

3. **Audio Procedural (Web Audio API)**:
   - Botón de audio en la barra de navegación que reproduce un sonido sintetizado en tiempo real de apertura de chapa de botella de vidrio (*"¡Pssss-clack!"*) y un lecho sonoro ambiental refrescante.

4. **Colección de Sabores con Efecto 3D Tilt**:
   - Tarjetas interactivas con perspectiva 3D reactiva al cursor (*Green Spot Original*, *Sparkling Citrus*, *Ruby Blood Orange* y *Heritage Zero Sugar*).

5. **Cronología Histórica (1934 - 2026)**:
   - Línea de tiempo interactiva desde los huertos de Claremont, California, pasando por las fuentes de soda de los años 50 y la era dorada en Latinoamérica y Asia, hasta el renacimiento moderno.

6. **Buscador de Puntos de Venta & Acordeón FAQ**:
   - Simulador en vivo de disponibilidad por ciudad.
   - Preguntas y respuestas frecuentes con animación de resortes fluidos.

---

## 🚀 Cómo Iniciar el Proyecto

Abre una terminal en esta carpeta y ejecuta:

```bash
# Opción 1: Con Node.js directo
node server.js

# Opción 2: Con npm
npm start
```

Luego abre tu navegador en:
👉 **`http://localhost:3000`**

---

## 📁 Estructura del Proyecto

```
greenspot-landing/
├── assets/
│   └── greenspot-bottle.webm       # Video de la botella y explosión cítrica
├── css/
│   └── style.css                   # Sistema de diseño, glassmorphism, 3D y responsive
├── js/
│   ├── videoScrub.js               # Motor de sincronización scroll -> video
│   ├── threeScene.js               # Escena Three.js con rodajas 3D y partículas
│   ├── audio.js                    # Síntesis Web Audio API (pop de botella)
│   └── app.js                      # Interacciones de UI, preloader, FAQ, tilt cards
├── index.html                      # Estructura semántica completa
├── server.js                       # Servidor HTTP con soporte de Range Requests (HTTP 206)
├── package.json                    # Scripts del proyecto
└── README.md                       # Documentación
```
