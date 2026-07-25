# Auditoría de seguridad

## Información general

- **audit_id**: a885d320-9d25-4653-ae8a-b7a3e9ed05fb
- **agente**: agente-seguridad
- **total de hallazgos**: 16
- **npm audit backend**: 28 vulnerabilidades (0 críticas, 12 altas, 13 medias, 3 bajas)
- **npm audit frontend**: 60 vulnerabilidades (1 crítica `tar`, 38 altas, 14 medias, 7 bajas)

## Resumen por severidad

| Severidad | Cantidad |
|-----------|----------|
| Crítica | 3 |
| Alta | 6 |
| Media | 6 |
| Baja | 1 |

## Hallazgos

| ID | Categoría | Severidad | Archivo | Línea | Título |
|----|-----------|-----------|---------|-------|--------|
| SEG-01 | OWASP / Inyección SQL | Crítica | server/src/cards/cards.service.ts | 43 | Inyección SQL en búsqueda raw de tarjetas |
| SEG-02 | OWASP / CORS | Alta | server/src/main.ts | 10 | CORS abierto a cualquier origen |
| SEG-03 | OWASP / AuthN-AuthZ | Crítica | server/src/ | 1 | Sin autenticación ni autorización |
| SEG-04 | Configuración / Secretos | Alta | server/.env | 3 | Credenciales de base de datos hardcodeadas |
| SEG-05 | Configuración / BD | Alta | server/src/config/config.module.ts | 15 | TypeORM synchronize=true en todos los entornos |
| SEG-06 | OWASP / Validación | Media | server/src/cards/cards.controller.ts | 21 | Falta validación UUID en parámetros de ruta |
| SEG-07 | Exposición de datos | Media | client/src/app/boards.service.ts | 18 | Persistencia en localStorage sin validación |
| SEG-08 | Dependencias / Backend | Alta | server/package-lock.json | 1 | Vulnerabilidades npm en backend (28 totales) |
| SEG-09 | Dependencias / Frontend | Crítica | client/package-lock.json | 1 | Vulnerabilidades npm en frontend (60 totales) |
| SEG-10 | OWASP / Control de acceso | Media | server/src/main.ts | 10 | Falta rate limiting y Helmet |
| SEG-11 | Información expuesta | Baja | server/src/main.ts | 13 | Logs internos expuestos en consola |
| SEG-12 | Configuración / Infraestructura | Alta | docker-compose.yml | 10 | PostgreSQL expuesto en puerto 5432 sin red aislada |
| SEG-13 | OWASP / Manejo de errores | Media | server/src/main.ts | 1 | Posible exposición de stack traces sin ExceptionFilter |
| SEG-14 | Configuración / Validación | Media | server/src/config/config.module.ts | 12 | parseInt de DB_PORT sin validación de rango |
| SEG-15 | Configuración / VCS | Alta | .gitignore (ausente) | 1 | Falta .gitignore en raíz y en cliente |
| SEG-16 | OWASP / Asignación masiva | Media | server/src/boards/boards.service.ts | 28 | Object.assign como riesgo de asignación masiva |

## Detalle

### SEG-01 — Inyección SQL en búsqueda raw de tarjetas
`CardsService.searchByTitleUnsafe` concatena directamente el término de búsqueda en `ILIKE '%${q}%'`. Endpoint `GET /cards/search/raw` expone inyección SQL (CWE-89).

**Recomendación:** Usar query builder parametrizado o `Repository.query` con parámetros (`WHERE title ILIKE $1`).

### SEG-02 — CORS abierto a cualquier origen
`app.enableCors()` sin configuración permite llamadas desde cualquier dominio (CWE-942).

**Recomendación:** Configurar `enableCors({ origin: ['http://localhost:4200'] })` u orígenes controlados por variable de entorno.

### SEG-03 — Sin autenticación ni autorización
No existen guards, decorators, estrategias Passport/JWT ni verificación de ownership de recursos. Cualquier cliente puede gestionar tableros, columnas y tarjetas (CWE-306/CWE-285).

**Recomendación:** Implementar JWT/Passport, guards globales y verificar ownership.

### SEG-04 — Credenciales de base de datos hardcodeadas
`DB_USERNAME`, `DB_PASSWORD` y `POSTGRES_PASSWORD` valen `'trello'` en `.env`, `docker-compose.yml`, `ormconfig.json` y fallback en `config.module.ts`.

**Recomendación:** Eliminar secretos del repositorio, rotar contraseñas, usar variables de entorno externas y quitar fallbacks secretos.

### SEG-05 — TypeORM synchronize=true en todos los entornos
La sincronización automática del esquema está activa sin discriminar entorno, pudiendo borrar o alterar datos en producción.

**Recomendación:** Desactivar `synchronize` en producción y usar migraciones controladas.

### SEG-06 — Falta validación UUID en parámetros de ruta
`@Param('id')` recibe strings sin `ParseUUIDPipe`.

**Recomendación:** Aplicar `ParseUUIDPipe` a parámetros de ruta que son UUID.

### SEG-07 — Persistencia en localStorage sin validación
Se almacena `lastBoardId` en `localStorage` y se asigna a `(window as any).__rawSearch` sin sanitizar.

**Recomendación:** Validar UUIDs antes de persistir, eliminar variables globales y sanitizar al recuperar.

### SEG-08 — Vulnerabilidades npm en backend
`npm audit` reporta 28 vulnerabilidades: 12 altas, 13 medias, 3 bajas.

**Recomendación:** Ejecutar `npm audit fix`, actualizar dependencias transitivas y priorizar `lodash`, `multer`, `typeorm/glob`, `@nestjs/core`.

### SEG-09 — Vulnerabilidades npm en frontend
`npm audit` reporta 60 vulnerabilidades: 1 crítica (`tar`), 38 altas, 14 medias, 7 bajas.

**Recomendación:** Actualizar Angular CLI/build-angular y dependencias del ecosistema Angular a versiones seguras.

### SEG-10 — Falta rate limiting y Helmet
No hay rate limiting, protección Helmet ni headers de seguridad.

**Recomendación:** Añadir `@nestjs/throttler` y `Helmet`.

### SEG-11 — Logs internos expuestos en consola
`console.log` expone URL interna del servidor.

**Recomendación:** Usar logger estructurado (Winston/Pino) y desactivar logs de desarrollo en producción.

### SEG-12 — PostgreSQL expuesto en puerto 5432 sin red aislada
`docker-compose.yml` publica el puerto 5432 en el host sin red aislada.

**Recomendación:** Eliminar el mapeo público si no es necesario y usar red Docker interna.

### SEG-13 — Posible exposición de stack traces sin ExceptionFilter
No existe `ExceptionFilter` global; en desarrollo NestJS puede devolver stack traces completos.

**Recomendación:** Implementar `ExceptionFilter` global que oculte stack traces en producción.

### SEG-14 — parseInt de DB_PORT sin validación de rango
No se valida rango de puertos válidos.

**Recomendación:** Validar con esquema (Joi/class-validator).

### SEG-15 — Falta .gitignore en raíz y en cliente
Aumenta riesgo de versionar `node_modules`, `dist`, `.env` y cachés.

**Recomendación:** Añadir `.gitignore` adecuados en raíz y `client/`.

### SEG-16 — Object.assign como riesgo de asignación masiva
Permite asignar propiedades arbitrarias si el whitelist se relaja.

**Recomendación:** Asignar campos explícitamente o usar DTOs estrictos.

---
*Auditoría de seguridad generada por el agente de seguridad.*
