# Manual de Instalación y Configuración del Proyecto

Este manual describe los pasos necesarios para configurar y correr el proyecto "Creativa Tesis" (Next.js) en una nueva computadora después de clonar o realizar un commit/pull desde el repositorio.

---

## 1. Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:
- **Node.js** (Se recomienda la versión LTS actual, v20 o superior).
- **Git** (Para clonar el repositorio).
- Un editor de código como **VS Code**.

---

## 2. Instalación Principal (Comando Rápido)

Si ya has clonado o descargado tu proyecto en la nueva computadora, abre la terminal en la raíz del proyecto (`creativa-tesis-nextjs`) y ejecuta el siguiente comando. Esto instalará **todas** las dependencias y *skills* listadas en el archivo `package.json` de un solo golpe:

```bash
npm install
```

---

## 3. Desglose de las "Skills" y Dependencias Utilizadas

Si por alguna razón necesitas instalar dependencias de forma manual o quieres saber qué módulos principales le dan vida al proyecto, aquí tienes los comandos categorizados:

### 🎨 Frontend Framework y React
El corazón del proyecto usando las últimas versiones de React.
```bash
npm install next@16.1.1 react@19.2.3 react-dom@19.2.3
```

### 🪄 Animaciones y Gráficos (GSAP, Framer Motion, Three.js)
Las librerías encargadas de las experiencias interactivas, covers 3D y partículas.
```bash
npm install gsap @gsap/react framer-motion
npm install three @react-three/fiber @react-three/drei
```

### 🖋️ Íconos y Componentes Visuales
Para la iconografía se está utilizando la librería Phosphor Icons.
```bash
npm install @phosphor-icons/react
```
*(Nota: Aunque mencionaste "icons/react", en tu proyecto estás utilizando `@phosphor-icons/react` en lugar de `react-icons` o `lucide-react` para tus iconos. Si necesitas agregar más adelante iconos clásicos de React Icons, el comando sería `npm install react-icons`).*

### 🗄️ CMS (Sanity)
Las herramientas de conexión con el backend de contenido.
```bash
npm install sanity @sanity/client @sanity/vision next-sanity @portabletext/react
```

### 🧩 Estilos y Tailwind CSS
Configuración de Tailwind CSS con plugins de formularios y tipados base.
```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms
npm install styled-components
```

### 📺 Multimedia
Para la reproducción de video fluida.
```bash
npm install react-player
```

---

## 4. Guía Paso a Paso para Iniciar en una Nueva PC

Cuando te pases a una nueva computadora, debes seguir exactamente este flujo en la terminal:

### Paso 1: Abrir la terminal en la carpeta del proyecto
Navega hasta la carpeta del frontend, que debería ser donde clonaste el repo:
```bash
cd creativa-tesis-nextjs
```

### Paso 2: Instalar todas las dependencias
Este comando lee tu `package.json` y completa la carpeta `node_modules` de manera automática, sin necesidad de instalar paquete por paquete.
```bash
npm install
```
*> **Tip:** Si llegaras a tener algún problema de conflicto de dependencias de React 19 con otras librerías, un comando salvavidas es forzarlo mediante: `npm install --legacy-peer-deps`.*

### Paso 3: Configurar Variables de Entorno (¡Muy Importante!)
Las variables de entorno (contraseñas, IDs de proyectos) **no se suben a tu repositorio por seguridad**. Para que Sanity funcione en la nueva compu:
1. Crea un archivo llamado `.env.local` en la raíz de `creativa-tesis-nextjs`.
2. Pega las variables de conexión a Sanity. Generalmente son estas (búscalas en tu PC original o tu panel de Sanity):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### Paso 4: Levantar el Servidor de Desarrollo
Una vez descargados los paquetes y con el `.env.local` listo, arranca el servidor local para empezar a trabajar:
```bash
npm run dev
```

### Paso 5: Abrir el navegador
Abre tu navegador web y dirígete a:
👉 [http://localhost:3000](http://localhost:3000)

---

## 5. Otros Comandos Complementarios

- **Para crear la versión de Producción:**
  Si quieres compilar el proyecto para ver si hay algún error antes del despliegue oficial.
  ```bash
  npm run build
  ```
- **Para arrancar la versión de Producción (después del build):**
  Te permite probar la web como si estuviera en vivo.
  ```bash
  npm run start
  ```
- **Para revisar problemas de código (Linter):**
  Revisa errores de sintaxis y buenas prácticas.
  ```bash
  npm run lint
  ```
