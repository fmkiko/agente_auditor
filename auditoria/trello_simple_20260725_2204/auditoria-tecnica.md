# Informe técnico de auditoría

## Identificación del proyecto

- **Proyecto:** trello_simple
- **Audit ID:** a885d320-9d25-4653-ae8a-b7a3e9ed05fb
- **Ruta auditada:** `C:\Users\Usuario\Documents\opencode\opencode_auditor\trello_simple`
- **Fecha:** 2026-07-25 22:04
- **Profundidad:** completa
- **Alcance:** código fuente completo del frontend Angular, backend NestJS/TypeORM, configuración e infraestructura Docker Compose.

## Stack y arquitectura

- **Frontend:** Angular 18.2.0, TypeScript 5.5.2, @angular/cdk drag-drop, RxJS 7.8, standalone components.
- **Backend:** NestJS 10.4.4, TypeScript 5.5.4, TypeORM 0.3.20, PostgreSQL 16 (pg 8.13), class-validator/transformer.
- **Infraestructura:** Docker Compose postgres:16, start.ps1 para arranque local.
- **Endpoints:** `/boards`, `/columns`, `/cards`, `/cards/:id/move`, `/cards/search/raw`.

## Resumen de hallazgos

| Agente | Total | Crítica | Alta | Media | Baja |
|--------|-------|---------|------|-------|------|
| agente-revision | 16 | 0 | 5 | 9 | 2 |
| agente-seguridad | 16 | 3 | 6 | 6 | 1 |
| **Total** | **32** | **3** | **11** | **15** | **3** |

Adicionalmente, `npm audit` reporta 28 vulnerabilidades en backend y 60 en frontend.

## Matriz de hallazgos

### Hallazgos de revisión técnica

| ID | Categoría | Severidad | Archivo | Línea | Título | Descripción | Recomendación |
|----|-----------|-----------|---------|-------|--------|-------------|---------------|
| REV-01 | Deuda Técnica | Alta | server/tsconfig.json | 1 | TypeScript backend sin modo estricto | Desactiva strictNullChecks, noImplicitAny, strictBindCallApply y forceConsistentCasingInFileNames | Activar strict: true y corregir errores |
| REV-02 | Deuda Técnica | Alta | server/src/boards/entities/board.entity.ts | 25 | Eager loading recursivo sin paginación | Board.columns y BoardColumn.cards con eager:true cargan el árbol completo | Quitar eager, paginar y cargar bajo demanda |
| REV-03 | Clean Code | Media | server/src/boards/boards.service.ts | 28 | Uso de Object.assign para actualizar entidades | Patrón frágil en servicios de boards/columns/cards | Asignar campos explícitamente |
| REV-04 | Deuda Técnica | Alta | client/src/app/boards.service.ts | 8 | URL de API hardcodeada | `const API = 'http://localhost:3000'` impide despliegues | Usar environment.ts o configuración runtime |
| REV-05 | Clean Code | Media | client/src/app/boards.service.ts | 11 | Propiedad cache sin tipado | `private cache: any = {}` | Tipar cache con interfaz o Map |
| REV-06 | Clean Code | Baja | client/src/app/boards.service.ts | 57 | Método duplicado/muerto deleteColumnAgain | Método idéntico a deleteColumn | Eliminar y unificar llamadas |
| REV-07 | Clean Code | Media | client/src/app/column/column.component.ts | 16 | Uso de any en @Input() column | `@Input() column!: any` anula strict mode | Tipar con interfaz Column |
| REV-08 | Clean Code | Media | client/src/app/board/board.component.ts | 80 | Ordenación duplicada de columnas y tarjetas | select() ordena dos veces seguidas | Extraer función sortBoard |
| REV-09 | Mantenibilidad | Alta | client/src/app/board/board.component.ts | 70 | Manejo de errores vacío en suscripciones | Callbacks error vacíos en listBoards, moveCard, etc. | Implementar manejo de errores y rollback |
| REV-10 | UX/Accesibilidad | Baja | client/src/app/board/board.component.ts | 1 | Elementos interactivos sin etiquetas accesibles | Inputs/botones sin aria-label | Añadir aria-label y labels |
| REV-11 | Rendimiento | Media | client/src/app/board/board.component.ts | 109 | Drag & drop optimista sin rollback | Estado local muta antes de confirmar backend | Guardar y restaurar estado ante error |
| REV-12 | Deuda Técnica | Alta | trello_simple/ | 1 | Ausencia de tests automatizados | No existen .spec/.test en backend ni frontend | Añadir tests unitarios, integración y e2e |
| REV-13 | Deuda Técnica | Media | trello_simple/ | 1 | Sin linting, formatting ni CI/CD | Sin ESLint, Prettier, editorconfig, husky ni pipeline | Configurar herramientas de calidad y CI/CD |
| REV-14 | Arquitectura | Media | server/src/cards/cards.service.ts | 14 | Acoplamiento entre dominios | CardsService inyecta ColumnsService | Validar existencia mediante repositorio propio |
| REV-15 | Lógica de negocio | Media | server/src/cards/cards.service.ts | 71 | Cálculo de posición propenso a colisiones | position = (prev+next)/2 converge con uso | Reindexación periódica o enteros espaciados |
| REV-16 | Mantenibilidad | Media | client/src/app/board/board.component.ts | 70 | Suscripciones no gestionadas | Sin desuscripción ni takeUntilDestroyed | Usar async pipe o desuscribirse en ngOnDestroy |

### Hallazgos de seguridad

| ID | Categoría | Severidad | Archivo | Línea | Título | Descripción | Recomendación |
|----|-----------|-----------|---------|-------|--------|-------------|---------------|
| SEG-01 | OWASP / SQLi | Crítica | server/src/cards/cards.service.ts | 43 | Inyección SQL en búsqueda raw | Concatenación `ILIKE '%${q}%'` en query raw | Usar query builder parametrizado |
| SEG-02 | OWASP / CORS | Alta | server/src/main.ts | 10 | CORS abierto a cualquier origen | `enableCors()` sin restricción de origin | Restringir origenes por variable de entorno |
| SEG-03 | OWASP / AuthN-AuthZ | Crítica | server/src/ | 1 | Sin autenticación ni autorización | No existen guards/JWT/Passport/ownership | Implementar JWT/Passport y guards |
| SEG-04 | Configuración / Secretos | Alta | server/.env | 3 | Credenciales hardcodeadas | DB/POSTGRES password = 'trello' en varios archivos | Eliminar secretos del repo, rotar y usar env |
| SEG-05 | Configuración / BD | Alta | server/src/config/config.module.ts | 15 | TypeORM synchronize=true en todos los entornos | Puede borrar/alterar datos en producción | Desactivar en prod, usar migraciones |
| SEG-06 | OWASP / Validación | Media | server/src/cards/cards.controller.ts | 21 | Falta validación UUID en @Param('id') | UUIDs malformados pueden causar 500 | Aplicar ParseUUIDPipe |
| SEG-07 | Exposición de datos | Media | client/src/app/boards.service.ts | 18 | Persistencia en localStorage sin validación | Guarda lastBoardId y variable global window | Validar UUIDs, eliminar variables globales |
| SEG-08 | Dependencias | Alta | server/package-lock.json | 1 | Vulnerabilidades npm backend (28) | 0 críticas, 12 altas, 13 medias, 3 bajas | npm audit fix y actualización de dependencias |
| SEG-09 | Dependencias | Crítica | client/package-lock.json | 1 | Vulnerabilidades npm frontend (60) | 1 crítica (tar), 38 altas, 14 medias, 7 bajas | Actualizar Angular CLI/build-angular |
| SEG-10 | OWASP / Control de acceso | Media | server/src/main.ts | 10 | Falta rate limiting y Helmet | Sin throttling ni headers de seguridad | Añadir @nestjs/throttler y Helmet |
| SEG-11 | Información expuesta | Baja | server/src/main.ts | 13 | Logs internos expuestos en consola | `console.log` de URL interna | Usar logger estructurado configurable |
| SEG-12 | Configuración / Infra | Alta | docker-compose.yml | 10 | PostgreSQL expuesto en puerto 5432 | Sin red aislada ni restricciones | Eliminar mapeo público, usar red Docker |
| SEG-13 | OWASP / Errores | Media | server/src/main.ts | 1 | Posible exposición de stack traces | Sin ExceptionFilter global | Implementar filtro global de errores |
| SEG-14 | Configuración / Validación | Media | server/src/config/config.module.ts | 12 | parseInt de DB_PORT sin validación | No valida rango de puertos | Validar con esquema |
| SEG-15 | Configuración / VCS | Alta | .gitignore (ausente) | 1 | Falta .gitignore en raíz y cliente | Riesgo de versionar secretos/node_modules/dist | Añadir .gitignore adecuados |
| SEG-16 | OWASP / Asignación masiva | Media | server/src/boards/boards.service.ts | 28 | Object.assign como riesgo de asignación masiva | Permite propiedades arbitrarias si whitelist falla | Asignar campos explícitamente |

## Recomendaciones técnicas priorizadas

1. **Remediar inyección SQL (SEG-01)** y eliminar endpoint `/cards/search/raw` hasta parametrizarse.
2. **Implementar autenticación/autorización (SEG-03)** antes de cualquier despliegue público.
3. **Rotar secretos y externalizar credenciales (SEG-04)**, eliminando `.env` y fallbacks.
4. **Actualizar dependencias (SEG-08/09)** priorizando `tar`, Angular CLI y paquetes NestJS críticos.
5. **Restringir CORS (SEG-02)** y añadir rate limiting/Helmet.
6. **Activar TypeScript strict en backend (REV-01)**, añadir tests (REV-12) y CI/CD (REV-13).
7. **Refactorizar drag & drop (REV-11)** con rollback y manejo de errores (REV-09).

## Riesgos residuales y dependencias

- **Riesgo residual:** aunque se mitiguen los hallazgos críticos, la ausencia de tests dificulta detectar regresiones.
- **Dependencias:** actualización de Angular/NestJS a versiones mayores puede requerir cambios significativos en DTOs, decoradores y configuración de build.
- **Datos:** la corrección de `Object.assign` y `eager` puede cambiar el comportamiento de las respuestas JSON y requerir ajustes en el frontend.

---
*Informe técnico generado por el agente de reporte.*
