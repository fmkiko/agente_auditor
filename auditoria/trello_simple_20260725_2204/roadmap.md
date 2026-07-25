# Roadmap de remediación

## Fase 1 — Inmediata (0-2 semanas)

**Objetivo:** cerrar brechas de seguridad críticas y alta que bloquean producción.

**Entregables:**
- Parametrizar/eliminar endpoint SQLi (BK-01).
- Implementar autenticación JWT y ownership (BK-02).
- Actualizar dependencias frontend críticas (BK-03).
- Restringir CORS y añadir rate limiting/Helmet (BK-04, BK-22).
- Rotar secretos y externalizar credenciales (BK-05).
- Desactivar TypeORM `synchronize` en producción y crear migraciones (BK-06).
- Aislar PostgreSQL en Docker (BK-08).
- Añadir `.gitignore` en raíz y client (BK-26).

**Hitos de validación:**
- Pruebas de pentest no logran inyección SQL ni acceso sin token.
- `npm audit` frontend sin críticas/altas justificadas.
- Contenedores solo se comunican a través de red interna Docker.

**Riesgos:** actualizar Angular/NestJS a versiones mayores puede romper build; mitigar con PR separado y tests de compilación.

## Fase 2 — Corto plazo (2-6 semanas)

**Objetivo:** mejorar calidad, mantenibilidad y estabilidad del frontend.

**Entregables:**
- Activar TypeScript estricto en backend (BK-09).
- Reemplazar `Object.assign` por asignación explícita (BK-14).
- Quitar eager loading, paginar y corregir cálculo de posiciones (BK-10).
- Desacoplar `CardsService` de `ColumnsService` (BK-17).
- URL de API configurable en frontend (BK-11).
- Manejo de errores y rollback en drag & drop (BK-12).
- Validar UUIDs en parámetros de ruta (BK-20).
- Sanitizar `localStorage` y eliminar variable global (BK-21).
- Implementar `ExceptionFilter` global y validar variables de entorno (BK-23, BK-25).

**Hitos de validación:**
- Compilación backend con `strict: true` sin errores.
- Cobertura de tests unitarios backend > 60%.
- Frontend despliega en entorno no-local sin cambios de código.

**Riesgos:** cambios de arquitectura pueden romper contratos API; mitigar con tests de integración.

## Fase 3 — Mediano plazo (6-12 semanas)

**Objetivo:** consolidar cultura de calidad y preparar el proyecto para escalado.

**Entregables:**
- Pipeline CI/CD con lint, tests y `npm audit` (BK-13).
- Tipado completo en frontend (BK-15).
- Limpieza de código duplicado (BK-16).
- Mejoras de accesibilidad (BK-18).
- Gestión de suscripciones para evitar memory leaks (BK-19).
- Documentación de API (OpenAPI/Swagger).
- Monitoreo y logging estructurado en producción.

**Hitos de validación:**
- Cada PR pasa CI/CD antes de merge.
- Auditoría de accesibilidad sin errores bloqueantes.
- Métricas de cobertura y deuda técnica visibles.

**Riesgos:** baja priorización de deuda técnica ante nuevas features; mitigar reservando capacidad de sprint.

---
*Roadmap generado por el agente de reporte.*
