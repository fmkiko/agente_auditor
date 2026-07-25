# Plan de acción

## Información general

- **Audit ID:** a885d320-9d25-4653-ae8a-b7a3e9ed05fb
- **Proyecto:** trello_simple
- **Fecha:** 2026-07-25 22:04
- **Total de hallazgos:** 32 (3 Críticos, 11 Altos, 15 Medios, 3 Bajos)

## Objetivos de remediación priorizados

1. Eliminar vulnerabilidades explotables antes de cualquier despliegue (SQLi, AuthN/AuthZ, CORS, secretos).
2. Estabilizar la base de código con TypeScript estricto, tests y CI/CD.
3. Mejorar mantenibilidad del frontend (errores, rollback, tipado, accesibilidad).
4. Actualizar dependencias y endurecer la infraestructura Docker.

## Acciones por severidad

### Crítica (inmediato, bloqueante para producción)

| Acción | Hallazgos | Responsable | Esfuerzo | Ventana |
|--------|-----------|-------------|----------|---------|
| Parametrizar búsqueda SQL y eliminar endpoint raw vulnerable | SEG-01 | Backend Senior | M | 1-2 días |
| Implementar autenticación JWT/Passport y autorización por recurso | SEG-03 | Backend Senior | L | 1-2 semanas |
| Actualizar dependencias frontend críticas (tar, Angular CLI/build-angular) | SEG-09 | Frontend Senior | M | 3-5 días |

### Alta (primer sprint)

| Acción | Hallazgos | Responsable | Esfuerzo | Ventana |
|--------|-----------|-------------|----------|---------|
| Activar modo estricto en backend y corregir tipado | REV-01 | Backend Mid | M | 1 semana |
| Quitar eager loading, paginar y cargar relaciones bajo demanda | REV-02 | Backend Mid | M | 1 semana |
| Externalizar URL de API mediante environment.ts | REV-04 | Frontend Mid | S | 2-3 días |
| Implementar manejo de errores y rollback en suscripciones | REV-09 | Frontend Mid | M | 1 semana |
| Configurar pipeline CI/CD, ESLint y Prettier | REV-12, REV-13 | DevOps / Tech Lead | M | 1-2 semanas |
| Restringir CORS a orígenes permitidos | SEG-02 | Backend Mid | S | 1 día |
| Rotar secretos y mover credenciales a variables de entorno | SEG-04 | Tech Lead | S | 2-3 días |
| Desactivar synchronize en producción y usar migraciones | SEG-05 | Backend Senior | M | 1 semana |
| Actualizar dependencias backend vulnerables | SEG-08 | Backend Mid | M | 1 semana |
| Aislar PostgreSQL en Docker y eliminar mapeo público si no es necesario | SEG-12 | DevOps | S | 2-3 días |
| Añadir .gitignore en raíz y client | SEG-15 | Tech Lead | S | 1 día |

### Media (segundo sprint / backlog técnico)

| Acción | Hallazgos | Responsable | Esfuerzo | Ventana |
|--------|-----------|-------------|----------|---------|
| Reemplazar Object.assign por asignación explícita | REV-03, SEG-16 | Backend Mid | S | 2-3 días |
| Tipar cache y @Input column | REV-05, REV-07 | Frontend Junior | S | 2-3 días |
| Eliminar deleteColumnAgain y ordenación duplicada | REV-06, REV-08 | Frontend Junior | S | 1-2 días |
| Implementar rollback en drag & drop | REV-11 | Frontend Mid | M | 1 semana |
| Desacoplar CardsService de ColumnsService | REV-14 | Backend Mid | M | 1 semana |
| Revisar lógica de cálculo de posiciones | REV-15 | Backend Mid | M | 1 semana |
| Gestionar suscripciones para evitar memory leaks | REV-16 | Frontend Mid | S | 2-3 días |
| Validar UUIDs en parámetros de ruta | SEG-06 | Backend Mid | S | 1 día |
| Validar y sanitizar datos en localStorage | SEG-07 | Frontend Mid | S | 2-3 días |
| Añadir rate limiting y Helmet | SEG-10 | Backend Mid | S | 2-3 días |
| Implementar ExceptionFilter global | SEG-13 | Backend Mid | S | 2-3 días |
| Validar DB_PORT y otras variables de entorno | SEG-14 | Backend Mid | S | 1 día |

### Baja (mantenimiento continuo)

| Acción | Hallazgos | Responsable | Esfuerzo | Ventana |
|--------|-----------|-------------|----------|---------|
| Mejorar accesibilidad (aria-label, labels) | REV-10 | Frontend Junior | S | 1-2 días |
| Reemplazar console.log por logger estructurado | SEG-11 | Backend Junior | S | 1 día |

---
*Plan de acción generado por el agente de reporte.*
