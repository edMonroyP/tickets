# tickets

* prompts mio
Generame un prompt para crear una aplicación web para un sistema de tickets, que tenga las funcionalidades necesarias según las aplicaciones de este tipo.

Para el prompt considera que trabajare con una ia para crear el codigo, con vsc para probarlo, con GitHub pages para subirlo y con firebase para la base de datos y autenticación, requiero que cada una de las paginas de mi aplicación se genere el codigo en un solo archivo usándosela html, css y js, además utiliza bibliotecas de contenido y diseño de un CDN para hacerla la mas moderna posible, agrega un icono para tener tema oscuro y claro.

Hazla lo mas completa y funcional posible.


/*
=======================================
🔥 SISTEMA DE TICKETS CON FIREBASE 🔥
=======================================
Estructura de archivos:
- index.html -> Login / Registro
- dashboard.html -> Resumen de tickets
- crear-ticket.html -> Crear un ticket
- tickets.html -> Lista de tickets
- ticket-detalle.html -> Ver ticket detallado
- perfil.html -> Configuración de usuario
- 404.html -> Página de error
- styles.css -> Estilos generales
- app.js -> Lógica global de Firebase
*/


prompt final

 PROMPT FINAL PARA CREAR UN SISTEMA DE TICKETS COMPLETO

“Quiero crear una aplicación web completa para un sistema de tickets usando Firebase como backend y Firebase Authentication para autenticación de usuarios.

🔹 Tecnologías y herramientas:
	•	HTML, CSS y JavaScript (cada archivo tendrá su propio código JS y CSS directamente incrustado).
	•	Firebase para la base de datos (Firestore) y autenticación.
	•	Bootstrap o Tailwind para diseño moderno desde un CDN.
	•	GitHub Pages para el despliegue de la app.
	•	VSCode como entorno de desarrollo.

⸻

🌐 Páginas de la aplicación:
	1.	index.html → Página de inicio con formulario de login y registro.
	•	Login con correo y contraseña.
	•	Login con Google.
	•	Manejo de errores y mensajes emergentes con un popup (toast).
	2.	dashboard.html → Resumen de tickets con estadísticas.
	•	Mostrar el total de tickets, abiertos y cerrados.
	•	Botones para ver la lista de tickets y crear un nuevo ticket.
	•	Botón flotante para acceder al perfil del usuario.
	•	Mostrar mensajes emergentes tipo toast para errores y confirmaciones.
	3.	crear-ticket.html → Formulario para crear un nuevo ticket.
	•	Campos para título, descripción y prioridad.
	•	Guardado directo en Firestore.
	•	Popup (toast) para confirmación o error.
	4.	tickets.html → Lista de tickets existentes.
	•	Mostrar tickets desde Firestore en una tabla.
	•	Opción para actualizar estado (abierto, en progreso, cerrado).
	•	Opción para eliminar tickets con confirmación.
	•	Clic en un ticket para abrir el detalle.
	•	Popup (toast) para notificaciones de éxito/error.
	5.	ticket-detalle.html → Detalle de un ticket.
	•	Mostrar título, descripción, prioridad y estado del ticket.
	•	Permitir actualizar estado y eliminar ticket.
	•	Botón para volver a la lista de tickets.
	•	Mostrar mensajes emergentes tipo toast para cambios de estado o eliminación.
	6.	perfil.html → Página de perfil del usuario.
	•	Mostrar nombre, email y foto de perfil desde Firebase Authentication.
	•	Opción para actualizar nombre del usuario.
	•	Opción para cerrar sesión.
	•	Mostrar mensajes emergentes tipo toast para éxito/error.
	7.	404.html → Página de error para rutas incorrectas.
	•	Mostrar mensaje amigable de error (“Página no encontrada”).
	•	Opción para volver a la página de inicio o Dashboard.

⸻

🚀 Requisitos adicionales:

✅ La app debe ser responsiva y funcionar bien en dispositivos móviles y escritorio.
✅ Debe incluir temas claro y oscuro con un botón para cambiar entre ellos.
✅ Los mensajes emergentes (toast) deben ser claros y desaparecer automáticamente después de 4 segundos.
✅ La autenticación debe mantenerse activa entre sesiones.
✅ Firebase debe permitir el acceso solo a usuarios autenticados.
✅ El código debe estar estructurado y seguir buenas prácticas.

⸻

⚠️ Consideraciones de Firebase:
	•	Configurar Firestore para almacenar los tickets por ID.
	•	Configurar permisos para que solo el usuario autenticado pueda leer y escribir sus propios tickets.
	•	Permitir autenticación con correo/contraseña y Google.
	•	Configurar reglas de Firestore para asegurar la seguridad de los datos.