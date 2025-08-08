## Requisitos
Node.js >=16 (recomendado)
npm (o yarn)

## Instalación (primeros pasos)
1. Clona el repositorio:

git clone <repo-url>
cd <repo-folder>

2. Instala dependencias:

npm install

3. Crea el archivo de variables de entorno (ver sección Variables de entorno abajo).

4. Arranca el servidor de desarrollo:

npm run dev

5. Para generar una build de producción:

npm run build

6. Para previsualizar la build:

npm run preview

## Variables de entorno (ejemplo)
Copia el archivo .env.example en la raíz y crea un archivo .env, cambia los valores con la dirección local del backend (REINICIA npm run dev después de cambiarlo).

## Endpoints esperados del backend (ejemplo)

Autenticación
POST /auth/login

{ "email": "user@example.com", "password": "12345678" }
Respuesta esperada:

{ "user": { "id": "...", "email": "..." }, "token": "JWT..." }

POST /auth/register

{ "email": "new@example.com", "password": "12345678" }
Respuesta esperada:

{ "user": { "id": "...", "email": "..." }, "token": "JWT..." }

Todos
GET /todos → obtiene todas las tareas

GET /todos?filter=pending → tareas pendientes

GET /todos?filter=completed → tareas completadas

POST /todos → crear tarea { title, description, completed }

PATCH /todos/:id

DELETE /todos/:id → eliminar

## Notas sobre la integración cliente
- src/services/api.ts crea una instancia de Axios con baseURL = import.meta.env.VITE_API_BASE_URL.
- El token JWT (si existe) se guarda en localStorage (clave usada: "token") y api incluye interceptor para añadir Authorization: Bearer <token>.

## CORS / Desarrollo local
Si tu backend está en otro host, puedes:

Habilitar CORS en el backend para http://localhost:5173, o http://localhost:4173

## Diseño / Figma

Figma / Diseño: https://www.figma.com/design/ZBAY63yaF6lSLG79SWx5TG/toDo?node-id=0-1&t=957fvBONLvCPQ0mB-1
