# Rick & Morty Buscadora API

Una aplicación desarrollada con Ionic y Angular que te permite explorar el multiverso de Rick and Morty. Puedes ver el catálogo completo de personajes, buscar a tus favoritos por nombre y guardarlos directamente en tu dispositivo.

# Funcionalidades Principales

*Catálogo de Personajes:* Explora cientos de personajes. La aplicación carga más resultados automáticamente a medida que te desplazas hacia abajo (infinite scroll).

*Buscador Inteligente:* Encuentra personajes específicos rápidamente escribiendo su nombre en la barra de búsqueda de la pantalla principal.

*Mis Favoritos:* Guarda personajes con un solo toque. Esta lista se almacena en tu dispositivo (gracias a Capacitor Preferences), por lo que tus favoritos no se borrarán al cerrar la aplicación.

*Pestaña de Gestión:* Una sección dedicada exclusivamente para consultar y eliminar los personajes que has guardado previamente.

# Tecnologías Utilizadas

*Ionic 9:* Para el diseño visual, iconos y componentes de la interfaz.

*Angular 22:* Para controlar la lógica, los servicios y la navegación entre pantallas.

*Capacitor:* Permite el uso del almacenamiento local del dispositivo.

*The Rick and Morty API:* La base de datos pública y gratuita desde donde se consulta toda la información (imágenes, nombres, estado vital, etc.).

# Estructura de la Aplicación

La aplicación está organizada mediante un sistema de navegación por pestañas (Tabs):

Tab 1 (Catálogo y Búsqueda): Se conecta a la API para mostrar a los personajes y gestionar las búsquedas.

Tab 2 (Favoritos): Muestra únicamente los personajes guardados de forma local por el usuario.

# Cómo probar este proyecto en tu computadora

Sigue estos sencillos pasos para hacer funcionar la aplicación en tu entorno local:

Asegúrate de tener Node.js instalado.

Descarga o clona este repositorio en tu equipo.

Abre una terminal (o consola) en la carpeta del proyecto.

Instala las dependencias necesarias ejecutando:

npm install


# Inicia el servidor de desarrollo:

npm start


Abre tu navegador web y visita la dirección que aparezca en la terminal (generalmente http://localhost:4200).
