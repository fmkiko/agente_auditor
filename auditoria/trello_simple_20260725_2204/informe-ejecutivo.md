# Reporte Ejecutivo – trello_simple

**Audit ID:** a885d320-9d25-4653-ae8a-b7a3e9ed05fb
**Fecha:** 2026-07-25 22:04
**Ruta auditada:** C:\Users\Usuario\Documents\opencode\opencode_auditor\trello_simple

## 1. Identificación del proyecto
Auditoría integral del proyecto trello_simple. Objetivo: identificar riesgos, deuda técnica y oportunidades de mejora.

## 2. Alcance y stack tecnológico
Frontend Angular 18.2 + CDK Drag&Drop, Backend NestJS 10.4 + TypeORM 0.3.20 + PostgreSQL 16, Docker Compose

## 3. Valoración general
Se detectaron **32** hallazgos: 3 críticos, 11 altos, 15 medios, 3 bajos.

## 4. Principales riesgos
- **[Crítica] Inyección SQL en búsqueda raw de tarjetas** — El método searchByTitleUnsafe concatena directamente el término de búsqueda en una consulta SQL ILIKE sin parametrizar (ILIKE %${q}%), permitiendo inyección SQL clásica (CWE-89). Endpoint expuesto: GE...
- **[Crítica] Sin autenticación ni autorización** — No existen guards, decorators, estrategias Passport/JWT ni verificación de ownership de recursos; cualquier cliente puede crear, modificar o borrar tableros, columnas y tarjetas (CWE-306/CWE-285).
- **[Crítica] Vulnerabilidades npm en frontend (60 totales, 1 crítica tar)** — npm audit reporta 60 vulnerabilidades en el cliente: 1 crítica (tar DoS via unbounded input), 7 bajas, 14 medias y 38 altas, incluyendo Angular XSS, serialize-javascript RCE, piscina prototype polluti...
- **[Alta] Ausencia de tests automatizados** — No se encontraron archivos .spec.ts ni .test.ts en backend ni frontend; no hay cobertura de pruebas unitarias, de integración ni e2e.
- **[Alta] CORS abierto a cualquier origen** — app.enableCors() se invoca sin restricción de origin, permitiendo llamadas desde cualquier dominio (CWE-942).
- **[Alta] Credenciales de base de datos hardcodeadas** — DB_USERNAME, DB_PASSWORD y POSTGRES_PASSWORD tienen valor trello en server/.env, docker-compose.yml y ormconfig.json; config.module.ts usa fallback trello si faltan variables. El archivo .env está pre...
- **[Alta] Eager loading recursivo sin paginación** — Board.columns y BoardColumn.cards usan eager:true, cargando todo el árbol de tableros/columnas/tarjetas en una sola consulta; puede degradar rendimiento y consumir memoria con datos grandes.
- **[Alta] Falta .gitignore en raíz y en cliente** — No existen archivos .gitignore en la raíz del proyecto ni en client/, aumentando el riesgo de versionar node_modules, dist, cachés y potencialmente secretos.
- **[Alta] Manejo de errores vacío en suscripciones** — listBoards(), moveCard() y otros subscribe usan callbacks error vacíos, ocultando fallos del backend y pudiendo dejar el estado del cliente inconsistente.
- **[Alta] PostgreSQL expuesto en puerto 5432 sin red aislada** — docker-compose publica el puerto 5432 de PostgreSQL en el host y no define una red aislada ni límites, aumentando la superficie de ataque local.

## 5. Recomendaciones prioritarias
- **[Alta]** Activar strict: true y las opciones estrictas recomendadas en server/tsconfig.json, corregir los errores de tipado resultantes.
- **[Alta]** Quitar eager, cargar relaciones bajo demanda con find opciones selectivas y añadir paginación en listados.
- **[Alta]** Usar environment.ts (o configuración runtime/injection token) para la URL base de la API.
- **[Alta]** Implementar manejo de errores (toast, logs, rollback de estado) en todos los subscribe.
- **[Alta]** Añadir tests unitarios con Jest (NestJS) y Angular Testing Library/Karma, y tests e2e básicos.
- **[Crítica]** Usar query builder parametrizado de TypeORM o pasar el término como parámetro en Repository.query, p. ej. WHERE title ILIKE $1.
- **[Alta]** Configurar enableCors({ origin: [http://localhost:4200] }) u orígenes controlados por variable de entorno.
- **[Crítica]** Implementar autenticación JWT/Passport, guards globales y verificar ownership de boards/columns/cards.
- **[Alta]** Eliminar secretos del repositorio, rotar contraseñas, usar variables de entorno externas y quitar fallbacks secretos.
- **[Alta]** Desactivar synchronize en producción y usar migraciones controladas con TypeORM.

## 6. Próximos pasos
- Corregir hallazgos críticos y altos antes de cualquier despliegue.
- Actualizar dependencias con vulnerabilidades conocidas.
- Implementar autenticación, autorización y configuraciones seguras.
- Incorporar tests, linters y pipelines de CI/CD.
- Revisar y cerrar hallazgos medios en el siguiente ciclo de desarrollo.