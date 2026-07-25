# Descubrimiento de arquitectura

## Información general

- **audit_id**: a885d320-9d25-4653-ae8a-b7a3e9ed05fb
- **project_path**: C:\Users\Usuario\Documents\opencode\opencode_auditor\trello_simple
- **project_name**: trello_simple
- **profundidad**: completa
- **fecha**: 2026-07-25 22:04

## Stack tecnológico

- **Frontend**: Angular 18.2.0, TypeScript 5.5.2, @angular/cdk drag-drop, RxJS 7.8.
- **Backend**: NestJS 10.4.4, TypeScript 5.5.4, TypeORM 0.3.20, PostgreSQL 16 (pg 8.13), class-validator 0.14.1, class-transformer 0.5.1.
- **Infraestructura**: Docker Compose postgres:16, start.ps1.

## Arquitectura

- Frontend SPA standalone Angular sin store centralizado.
- Backend API REST modular NestJS con capas controller/service/entity/DTO.
- Base de datos relacional PostgreSQL con TypeORM.
- Sin capa de autenticación/autorización.
- Sin tests, linting/format ni CI/CD.

## Estructura del proyecto

```
trello_simple/
├── client/
│   └── src/app/
│       ├── app.component.ts
│       ├── boards.service.ts
│       ├── models.ts
│       ├── board/board.component.ts
│       ├── card/card.component.ts
│       └── column/column.component.ts
├── server/
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── config/config.module.ts
│       ├── boards/{controller,service,module,dto,entity}
│       ├── columns/{controller,service,module,dto,entity}
│       └── cards/{controller,service,module,dto,entity}
├── docker-compose.yml
└── start.ps1
```

## Dependencias principales

- `@angular/core`, `@angular/cdk`, `@angular/common`, `@angular/router`
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/config`, `@nestjs/typeorm`
- `typeorm`, `pg`, `rxjs`, `class-validator`, `class-transformer`, `dotenv`

## Puntos de entrada

- `server/src/main.ts` — puerto 3000, ValidationPipe global, CORS global abierto.
- `client/src/main.ts` — `bootstrapApplication(AppComponent, { providers: [provideHttpClient()] })`.

## Endpoints principales

| Método | Ruta |
|--------|------|
| GET/POST | `/boards` |
| GET | `/boards/:id` |
| POST | `/columns` |
| POST | `/cards` |
| POST | `/cards/:id/move` |
| DELETE | `/cards/:id` |
| DELETE | `/columns/:id` |
| GET | `/cards/search/raw` |

## Contexto consolidado

Aplicación tipo Trello simple con frontend Angular (CDK drag & drop) y backend NestJS/TypeORM/PostgreSQL. CRUD de boards, columns y cards; reordenamiento por campo `position` (promedio entre adyacentes). Sin tests, sin linting, sin CI/CD. CORS abierto, credenciales hardcodeadas en `.env`, `ormconfig.json`, `docker-compose.yml` y fallback en `config.module.ts`, TypeORM `synchronize: true`, endpoint de búsqueda con SQLi (`searchByTitleUnsafe`), sin autenticación ni autorización, sin `.gitignore` en raíz/client, URL de API hardcodeada en frontend, drag & drop optimista sin rollback ante fallo backend.

## Observaciones clave

- `server/tsconfig.json` no estricto: `strictNullChecks`, `noImplicitAny`, `strictBindCallApply` y `forceConsistentCasingInFileNames` desactivados.
- `client/tsconfig.json` en strict mode.
- No se detectaron archivos `.gitignore` en raíz ni en `client/`.
- `npm audit` backend: 28 vulnerabilidades (0 críticas, 12 altas, 13 medias, 3 bajas).
- `npm audit` frontend: 60 vulnerabilidades (1 crítica `tar`, 38 altas, 14 medias, 7 bajas).

---
*Descubrimiento generado por el agente descubridor.*
