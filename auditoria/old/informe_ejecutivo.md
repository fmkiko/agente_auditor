# Informe Ejecutivo de Auditoría de Software

| Campo | Valor |
|-------|-------|
| **ID de auditoría** | AUDIT-20260725-6E5AD73A |
| **Proyecto auditado** | `C:\Users\Usuario\Documents\opencode\opencode_auditor` |
| **Fecha de creación** | 2026-07-25 20:30:25 |
| **Tecnologías** | Angular 18.2.0 + NestJS 10.4.4 + TypeORM 0.3.20 + PostgreSQL 16 + Docker Compose |
| **Estado** | Completado (entregables generados) |

## Resumen para la dirección

El proyecto auditado es una aplicación de tablero tipo Trello con backend en NestJS y frontend en Angular. Se identificaron **riesgos de seguridad críticos** y **deuda técnica significativa** que deben abordarse antes de cualquier despliegue en producción o exposición pública.

## Hallazgos por severidad

| Severidad | Seguridad | Técnico | Total |
|-----------|-----------|---------|-------|
| Crítico   | 4         | 0       | 4     |
| Alto      | 6         | 5       | 11    |
| Medio     | 6         | 7       | 13    |
| Bajo      | 1         | 2       | 3     |
| **Total** | **17**    | **14**  | **31** |

## Riesgos críticos destacados

1. **Credenciales hardcodeadas** en `.env`, `ormconfig.json` y `docker-compose.yml` (usuario y contraseña `trello`).
2. **Sin autenticación ni autorización**: no existen guards, JWT, Passport ni control de propiedad de recursos.
3. **Vulnerabilidades npm críticas en el frontend** (60 en total, incluyendo 1 crítica en `tar`).
4. **Vulnerabilidades npm en el backend** (28 en total, 12 de severidad alta).

## Fortalezas

- Arquitectura modular en NestJS (módulos `boards`, `columns`, `cards`).
- Uso de `ValidationPipe` global, transacciones en la operación de mover tarjetas y componentes standalone en Angular.
- Tipado centralizado en `models.ts`.

## Recomendaciones prioritarias

1. Rotar credenciales, mover secretos a un gestor seguro y nunca versionarlos.
2. Implementar autenticación/autorización antes de exponer el servicio.
3. Actualizar dependencias npm y aplicar parches de seguridad.
4. Desactivar `synchronize: true` de TypeORM y evitar exponer PostgreSQL.
5. Restringir CORS, agregar `.gitignore`, rate limiting y Helmet.
6. Incorporar tests unitarios, integración y un pipeline CI/CD.

---

*Este informe forma parte de los entregables de la auditoría AUDIT-20260725-6E5AD73A.*
