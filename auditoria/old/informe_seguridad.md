# Informe de Seguridad de Auditoría de Software

| Campo | Valor |
|-------|-------|
| **ID de auditoría** | AUDIT-20260725-6E5AD73A |
| **Proyecto auditado** | `C:\Users\Usuario\Documents\opencode\opencode_auditor` |
| **Tecnologías** | Angular 18.2.0 + NestJS 10.4.4 + TypeORM 0.3.20 + PostgreSQL 16 + Docker Compose |

## Resumen de riesgos

| Severidad | Cantidad |
|-----------|----------|
| Crítico   | 4 |
| Alto      | 6 |
| Medio     | 6 |
| Bajo      | 1 |
| **Total** | **17** |

## Hallazgos de seguridad

### 🔴 Crítico

| ID | Hallazgo | Severidad | Evidencia | Recomendación |
|----|----------|-----------|-----------|---------------|
| S-01 | Credenciales hardcodeadas | Crítico | `.env`, `ormconfig.json`, `docker-compose.yml`: `DB_USERNAME/DB_PASSWORD/POSTGRES_PASSWORD = "trello"` | Usar un gestor de secretos (vault, AWS Secrets Manager, Azure Key Vault) o variables de entorno inyectadas en runtime; rotar credenciales inmediatamente. |
| S-02 | Sin autenticación ni autorización | Crítico | No existen guards, JWT, Passport ni control de propiedad de recursos | Implementar JWT/Passport, control de propiedad de tableros/columnas/tarjetas y al menos RBAC básico. |
| S-03 | Vulnerabilidades npm críticas en frontend | Crítico | 60 vulnerabilidades npm; 1 crítica en `tar` | Ejecutar `npm audit fix --force` cautelosamente, migrar dependencias y validar con `npm audit`. |
| S-04 | Vulnerabilidades npm en backend | Crítico/Alto | 28 vulnerabilidades npm; 12 de severidad alta (`lodash`, `multer`, `typeorm/glob`, `tmp`, etc.) | Actualizar paquetes, revisar advisories oficiales y aplicar parches. |

### 🟠 Alto

| ID | Hallazgo | Severidad | Evidencia | Recomendación |
|----|----------|-----------|-----------|---------------|
| S-05 | Falta de `.gitignore` en `client/` y raíz | Alto | Riesgo de filtración de `node_modules`, `dist` y cachés | Agregar `.gitignore` robusto y auditar historial de Git por secretos expuestos. |
| S-06 | CORS abierto globalmente | Alto | `app.enableCors()` en `main.ts` sin restricción de orígenes | Configurar `origin` con dominios explícitos y `credentials` controlado. |
| S-07 | TypeORM `synchronize: true` activo | Alto | Configurado en `config.module.ts` y `ormconfig.json` | Desactivar en producción; usar migraciones controladas. |
| S-08 | PostgreSQL expuesto en puerto 5432 | Alto | `docker-compose.yml` publica el puerto sin red aislada | No exponer el puerto; usar red interna de Docker y firewall. |
| S-09 | Frontend sin sanitización XSS | Alto | Interpolación directa de títulos/descripciones de usuario | Usar mecanismos de Angular (`innerHTML` con `DomSanitizer` solo si es imprescindible) y validar entrada. |
| S-10 | Exposición de URL API en frontend | Alto | `http://localhost:3000` hardcodeada | externalizar en variables de entorno. |

### 🟡 Medio

| ID | Hallazgo | Severidad | Evidencia | Recomendación |
|----|----------|-----------|-----------|---------------|
| S-11 | `@Param('id')` no valida UUID | Medio | IDs malformados pueden generar 500 | Aplicar `ParseUUIDPipe` de NestJS. |
| S-12 | `Object.assign` en updates de servicios | Medio | Patrón frágil ante cambios en whitelist | Usar DTOs parciales tipados y asignación explícita. |
| S-13 | Sin rate limiting | Medio | No se encontró `nestjs/throttler` ni alternativa | Instalar y configurar `@nestjs/throttler`. |
| S-14 | Sin Helmet | Medio | No hay cabeceras de seguridad HTTP | Integrar `helmet` en NestJS. |
| S-15 | Sin logger de seguridad ni manejo centralizado de errores | Medio | Fallos dispersos sin trazabilidad | Implementar logger estructurado y middleware de errores uniforme. |
| S-16 | Drag & drop optimista sin rollback | Medio | UI actualiza antes del backend | Revertir estado en caso de fallo. |

### 🟢 Bajo

| ID | Hallazgo | Severidad | Evidencia | Recomendación |
|----|----------|-----------|-----------|---------------|
| S-17 | Consola expone logs internos | Bajo | `console.log` en `main.ts` | Usar logger configurado por entorno. |

## Vulnerabilidades npm destacadas

### Backend (28 vulnerabilidades, 12 altas)

- `lodash`
- `multer`
- `typeorm` / `glob`
- `tmp`
- `brace-expansion`
- `minimatch`
- `picomatch`
- `@nestjs/core`
- `@nestjs/platform-express`

### Frontend (60 vulnerabilidades, 1 crítica, 38 altas)

- `tar` (crítica)
- Angular XSS
- `serialize-javascript` (RCE)
- `piscina` (prototype pollution)
- `vite` / `rollup` (path traversal)
- `postcss` (XSS)

## Recomendaciones prioritarias

1. **Rotar credenciales** y eliminarlas del repositorio.
2. **Implementar autenticación/autorización** antes de cualquier despliegue.
3. **Actualizar dependencias** y aplicar `npm audit fix` de forma controlada.
4. **Desactivar `synchronize: true`** de TypeORM en producción.
5. **Restringir CORS**, agregar **Helmet**, **rate limiting** y red aislada para PostgreSQL.
6. **Auditar historial de Git** por secretos filtrados y agregar `.gitignore`.
7. **Validar inputs** (UUIDs) y **sanitizar salidas** para prevenir XSS e inyecciones.

---

*Este informe forma parte de los entregables de la auditoría AUDIT-20260725-6E5AD73A.*
