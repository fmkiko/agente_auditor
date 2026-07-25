# Backlog

## Convenciones

- **P0:** bloqueante para producción.
- **P1:** alto impacto, resolver en el primer sprint.
- **P2:** mejora técnica o deuda, abordar en sprints siguientes.

## Items

| ID | Prioridad | Hallazgo(s) | Título | Definición de terminado (DoD) |
|----|-----------|-------------|--------|-------------------------------|
| BK-01 | P0 | SEG-01 | Parametrizar búsqueda SQL | Endpoint `/cards/search/raw` eliminado o usa query parametrizado; tests unitarios y de integración verifican que no permite inyección. |
| BK-02 | P0 | SEG-03 | Implementar autenticación JWT | Login endpoint funcional; guard global protege escrituras; ownership verificado en boards/columns/cards. |
| BK-03 | P0 | SEG-09 | Actualizar dependencias frontend críticas | `npm audit` frontend sin vulnerabilidades críticas; build y tests de Angular pasan. |
| BK-04 | P1 | SEG-02 | Restringir CORS | `enableCors` usa lista blanca desde variable de entorno; pruebas rechazan orígenes no permitidos. |
| BK-05 | P1 | SEG-04 | Externalizar y rotar secretos | `.env` y `ormconfig.json` eliminados del repo; credenciales nuevas; fallbacks secretos removidos; Docker usa variables/secrets. |
| BK-06 | P1 | SEG-05 | Desactivar synchronize en prod | `synchronize` condicionado a entorno; migraciones creadas y testeadas en staging. |
| BK-07 | P1 | SEG-08 | Actualizar dependencias backend | `npm audit` backend sin vulnerabilidades altas; build y tests pasan. |
| BK-08 | P1 | SEG-12 | Aislar PostgreSQL en Docker | Puerto 5432 no expuesto al host o restringido; red interna definida en docker-compose. |
| BK-09 | P1 | REV-01 | TypeScript estricto en backend | `strict: true` activo; compilación sin errores. |
| BK-10 | P1 | REV-02, REV-15 | Optimizar carga de relaciones y posiciones | `eager` removido; endpoints paginan; cálculo de position con reindexación periódica. |
| BK-11 | P1 | REV-04 | URL de API configurable | Frontend lee URL de API desde `environment.ts`; build de producción apunta al endpoint correcto. |
| BK-12 | P1 | REV-09, REV-11 | Manejo de errores y rollback | Todos los subscribe tienen manejo de error; drag & drop revierte estado ante fallo. |
| BK-13 | P1 | REV-12, REV-13 | Tests y CI/CD | Pipeline ejecuta lint, test y npm audit; cobertura mínima definida. |
| BK-14 | P2 | REV-03, SEG-16 | Asignación explícita en updates | `Object.assign` removido; tests verifican que solo campos permitidos se actualizan. |
| BK-15 | P2 | REV-05, REV-07 | Tipado en frontend | `cache` tipado; `@Input() column` usa interfaz `Column`. |
| BK-16 | P2 | REV-06, REV-08 | Limpieza de código duplicado | `deleteColumnAgain` eliminado; ordenación extraída a función única. |
| BK-17 | P2 | REV-14 | Desacoplar CardsService | CardsService no depende de ColumnsService; transacción incluye validación de columna. |
| BK-18 | P2 | REV-10 | Mejorar accesibilidad | Todos los botones/inputs relevantes tienen `aria-label`; validado con herramienta a11y. |
| BK-19 | P2 | REV-16 | Gestión de suscripciones | No hay memory leaks en BoardComponent (validable con pruebas). |
| BK-20 | P2 | SEG-06 | Validar UUIDs en rutas | `ParseUUIDPipe` aplicado en todos los `@Param('id')`; tests con UUID malformado devuelven 400. |
| BK-21 | P2 | SEG-07 | Sanitizar localStorage | Validación de UUID al guardar/recuperar; variable global `__rawSearch` eliminada. |
| BK-22 | P2 | SEG-10 | Rate limiting y Helmet | `@nestjs/throttler` y `helmet` configurados; pruebas de carga/tasa validan límites. |
| BK-23 | P2 | SEG-11 | Logger estructurado | `console.log` removido; logger configurable (Winston/Pino) en producción. |
| BK-24 | P2 | SEG-13 | ExceptionFilter global | Filtro global implementado; stack traces ocultos en producción. |
| BK-25 | P2 | SEG-14 | Validar variables de entorno | Schema de validación al inicio; arranque falla si variables son inválidas. |
| BK-26 | P2 | SEG-15 | .gitignore en raíz y client | Archivos `.gitignore` presentes; `git status` no muestra node_modules/dist/.env. |

---
*Backlog generado por el agente de reporte.*
