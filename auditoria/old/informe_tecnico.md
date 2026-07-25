# Informe Técnico de Auditoría de Software

| Campo | Valor |
|-------|-------|
| **ID de auditoría** | AUDIT-20260725-6E5AD73A |
| **Proyecto auditado** | `C:\Users\Usuario\Documents\opencode\opencode_auditor` |
| **Tecnologías** | Angular 18.2.0 + NestJS 10.4.4 + TypeORM 0.3.20 + PostgreSQL 16 + Docker Compose |
| **Punto de entrada backend** | `trello_simple/server/src/main.ts` (PORT 3000, ValidationPipe global, CORS global) |
| **Punto de entrada frontend** | `trello_simple/client/src/main.ts` |
| **Módulos backend** | `boards`, `columns`, `cards` |

## Endpoints principales identificados

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET    | `/boards` | Listar tableros |
| POST   | `/boards` | Crear tablero |
| GET    | `/boards/:id` | Obtener tablero por ID |
| POST   | `/columns` | Crear columna |
| POST   | `/cards` | Crear tarjeta |
| POST   | `/cards/:id/move` | Mover tarjeta |
| DELETE | `/cards/:id` | Eliminar tarjeta |
| DELETE | `/columns/:id` | Eliminar columna |

## Hallazgos técnicos

### 🔴 Crítico

_No se registraron hallazgos técnicos con severidad crítica._

### 🟠 Alto

| ID | Hallazgo | Severidad | Ubicación / Evidencia | Recomendación |
|----|----------|-----------|----------------------|---------------|
| T-01 | Ausencia total de tests | Alto | Sin archivos `.spec.ts` ni `.test.ts` en todo el proyecto | Adoptar Jest para backend y Angular Testing Library/Karma para frontend; alcanzar cobertura mínima del 70 %. |
| T-02 | Sin ESLint / Prettier | Alto | No hay scripts de lint/test ni configuraciones de formato | Configurar ESLint + Prettier y ejecutarlos en pre-commit / CI. |
| T-03 | `tsconfig.json` del backend relaja verificaciones estrictas | Alto | `server/tsconfig.json`: `strictNullChecks`, `noImplicitAny`, `strictBindCallApply`, `forceConsistentCasingInFileNames` desactivados | Restaurar opciones `strict` y corregir errores de tipado resultantes. |
| T-04 | Uso de `any` en componentes Angular a pesar del strict mode | Alto | `ColumnComponent` usa `@Input() column!: any` | Definir interfaces para columnas y tarjetas; eliminar `any`. |
| T-05 | URL de API hardcodeada | Alto | `BoardsService` apunta a `http://localhost:3000` | Usar variables de entorno (`environment.ts` / inyección de tokens). |
| T-06 | Sin `.gitignore` en `server/` y `client/` | Alto | Raíz de cada subproyecto sin `.gitignore` | Agregar archivos `.gitignore` estándar para Node/Angular/NestJS. |
| T-07 | Sin documentación Swagger / OpenAPI | Alto | No se encontró configuración de Swagger | Integrar `@nestjs/swagger` para documentar y validar contratos. |

### 🟡 Medio

| ID | Hallazgo | Severidad | Ubicación / Evidencia | Recomendación |
|----|----------|-----------|----------------------|---------------|
| T-08 | Falta de manejo de errores en el frontend | Medio | Suscripciones sin `catchError` ni manejo de estados de error | Implementar servicio de notificaciones de error y operadores RxJS de control. |
| T-09 | Desuscripción de observables insuficiente | Medio | Componentes pueden generar fugas de memoria | Usar `takeUntilDestroyed`, `async` pipe o `Subscription` TRACK. |
| T-10 | Drag & drop optimista sin rollback | Medio | UI actualiza antes de confirmación del backend | Revertir estado si la petición falla; mostrar feedback al usuario. |
| T-11 | `@Param('id')` no valida UUID | Medio | IDs malformados pueden generar error 500 | Usar `ParseUUIDPipe` de NestJS. |
| T-12 | Uso de `Object.assign` en updates | Medio | Patrón frágil aunque mitigado por whitelist | Preferir DTOs parciales tipados y asignación explícita. |
| T-13 | Cálculo de posición por promedio puede colisionar | Medio | Lógica de ordenamiento de tarjetas/columnas | Implementar re-balanceo periódico o espaciado de enteros. |
| T-14 | `non-null assertion (!)` sobre `this.board` | Medio | `BoardComponent` asume que el tablero siempre existe | Utilizar guards de nulidad o inicialización segura. |

### 🟢 Bajo

| ID | Hallazgo | Severidad | Ubicación / Evidencia | Recomendación |
|----|----------|-----------|----------------------|---------------|
| T-15 | Sin variables de entorno en frontend | Bajo | Valores fijos en código | Centralizar configuración por entorno. |
| T-16 | Consola expone logs internos | Bajo | `console.log` en `main.ts` | Reemplazar por logger estructurado (Winston/Pino) y desactivar en producción. |

## Aspectos positivos

- Backend organizado en módulos NestJS (`boards`, `columns`, `cards`).
- Uso de `ValidationPipe` global.
- Uso de transacciones en la operación `move` de tarjetas.
- Componentes standalone en Angular.
- Tipado centralizado en `models.ts`.

## Métricas técnicas resumidas

| Métrica | Valor |
|---------|-------|
| Tests encontrados | 0 |
| Pipelines CI/CD | 0 |
| Linters configurados | 0 |
| Documentación API | No presente |

---

*Este informe forma parte de los entregables de la auditoría AUDIT-20260725-6E5AD73A.*
