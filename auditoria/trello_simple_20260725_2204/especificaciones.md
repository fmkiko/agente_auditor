# Especificaciones de remediación

## 1. Backend

### 1.1 Seguridad

- **Autenticación/autorización**
  - Implementar JWT con Passport (`@nestjs/passport`, `passport-jwt`).
  - Crear guard global `JwtAuthGuard` aplicado por defecto con `@UseGuards` opcional en endpoints públicos.
  - Asociar cada board/column/card a un `ownerId` (UUID de usuario) y verificar ownership en operaciones de escritura/eliminación.
  - Usar `@nestjs/throttler` para rate limiting (por ejemplo, 100 peticiones/minuto por IP).
  - Instalar y configurar `helmet` para headers de seguridad.

- **Inyección SQL**
  - Reemplazar `searchByTitleUnsafe` por query builder o `Repository.query` con parámetros:
    ```ts
    return this.cardRepo.createQueryBuilder('c')
      .select(['c.id', 'c.title', 'c.columnId', 'c.position'])
      .where('c.title ILIKE :term', { term: `%${term}%` })
      .orderBy('c.position', 'ASC')
      .getMany();
    ```
  - Eliminar endpoint `/cards/search/raw` o mantenerlo solo con query parametrizada y autenticación.

- **Validación de entradas**
  - Aplicar `ParseUUIDPipe` en todos los `@Param('id')` de boards, columns y cards.
  - Validar variables de entorno con `class-validator`/`joi` al arrancar la aplicación.

- **Gestión de secretos**
  - Eliminar `server/.env`, `server/ormconfig.json` y credenciales del repositorio.
  - Usar variables de entorno externas en runtime y herramientas de secretos (Docker secrets, Azure Key Vault, AWS Secrets Manager) en producción.
  - Quitar fallbacks secretos de `config.module.ts`.

- **Base de datos**
  - Desactivar `synchronize: true` en producción.
  - Crear migraciones TypeORM para esquema actual y futuro.

- **Manejo de errores**
  - Implementar `ExceptionFilter` global que devuelva respuestas genéricas en producción y loguee detalles de forma segura.

### 1.2 Calidad

- Activar `strict: true` en `server/tsconfig.json` y corregir errores resultantes.
- Reemplazar `Object.assign(entity, dto)` por asignación explícita de campos permitidos.
- Quitar `eager: true` y cargar relaciones bajo demanda con `find` opciones y paginación.
- Desacoplar `CardsService` de `ColumnsService` validando existencia mediante repositorio propio.
- Refactorizar cálculo de `position` para evitar colisiones (reindexación periódica o espaciado entero).

## 2. Frontend

### 2.1 Seguridad

- **URL de API**: usar `environment.ts` o un `InjectionToken` para la URL base.
- **localStorage**: validar formato UUID antes de almacenar y al recuperar; eliminar `(window as any).__rawSearch`.
- **Sanitización**: Angular escapa interpolaciones por defecto; evitar `innerHTML` con datos de usuario.

### 2.2 Calidad y UX

- Tipar `cache` con interfaz restringida o `Map<string, unknown>`.
- Tipar `@Input() column!: Column` en `ColumnComponent`.
- Eliminar `deleteColumnAgain` y la ordenación duplicada en `select()`.
- Implementar manejo de errores en todos los `subscribe` (toast, logs, rollback).
- Implementar rollback en drag & drop guardando estado previo.
- Gestionar suscripciones con `takeUntilDestroyed` o `async pipe`.
- Mejorar accesibilidad: `aria-label` en botones/inputs y labels explícitos.

## 3. Infraestructura

- **Docker Compose**
  - Eliminar mapeo público de puerto 5432 si no es estrictamente necesario.
  - Definir red Docker interna para backend y base de datos.
  - No exponer credenciales en `docker-compose.yml`; usar variables de entorno o secrets.

- **Control de versiones**
  - Añadir `.gitignore` en raíz y `client/` para `node_modules`, `dist`, `.env`, `*.log`, cachés.
  - Asegurar que archivos con secretos no estén rastreados.

## Criterios de aceptación verificables

- [ ] `npm audit` backend y frontend sin vulnerabilidades críticas ni altas no justificadas.
- [ ] Endpoint `/cards/search/raw` no permite inyección SQL ( validable con pruebas de pentest).
- [ ] Todos los endpoints de escritura requieren autenticación y verifican ownership.
- [ ] `synchronize: true` no está activo en producción.
- [ ] `server/tsconfig.json` tiene `strict: true` y compila sin errores.
- [ ] Pipeline CI/CD ejecuta lint, tests y npm audit en cada PR.
- [ ] Frontend usa variables de entorno para URL de API y maneja errores de forma visible.

## Riesgos y dependencias

- Actualizar Angular/NestJS a versiones mayores puede introducir breaking changes.
- Cambios en eager loading requieren ajustes en cómo el frontend consume boards.
- La implementación de autenticación implica diseñar flujo de usuarios (registro/login) no existente.

## Supuestos y alcance fuera de alcance

- Se asume que el proyecto seguirá usando PostgreSQL y NestJS/Angular.
- No se incluye rediseño UI/UX ni migración a otro framework.
- No se realizará corrección automática del código; este documento sirve como especificación.

---
*Especificaciones generadas por el agente de reporte.*
