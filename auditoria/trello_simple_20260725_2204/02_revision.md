# Revisión técnica y deuda técnica

## Información general

- **audit_id**: a885d320-9d25-4653-ae8a-b7a3e9ed05fb
- **agente**: agente-revision
- **total de hallazgos**: 16

## Hallazgos

| ID | Categoría | Severidad | Archivo | Línea | Título |
|----|-----------|-----------|---------|-------|--------|
| REV-01 | Deuda Técnica | Alta | server/tsconfig.json | 1 | TypeScript backend sin modo estricto |
| REV-02 | Deuda Técnica | Alta | server/src/boards/entities/board.entity.ts | 25 | Eager loading recursivo sin paginación |
| REV-03 | Clean Code | Media | server/src/boards/boards.service.ts | 28 | Uso de Object.assign para actualizar entidades |
| REV-04 | Deuda Técnica | Alta | client/src/app/boards.service.ts | 8 | URL de API hardcodeada |
| REV-05 | Clean Code | Media | client/src/app/boards.service.ts | 11 | Propiedad cache sin tipado |
| REV-06 | Clean Code | Baja | client/src/app/boards.service.ts | 57 | Método duplicado/muerto deleteColumnAgain |
| REV-07 | Clean Code | Media | client/src/app/column/column.component.ts | 16 | Uso de any en @Input() column |
| REV-08 | Clean Code | Media | client/src/app/board/board.component.ts | 80 | Ordenación duplicada de columnas y tarjetas |
| REV-09 | Mantenibilidad | Alta | client/src/app/board/board.component.ts | 70 | Manejo de errores vacío en suscripciones |
| REV-10 | UX/Accesibilidad | Baja | client/src/app/board/board.component.ts | 1 | Elementos interactivos sin etiquetas accesibles |
| REV-11 | Rendimiento | Media | client/src/app/board/board.component.ts | 109 | Drag & drop optimista sin rollback |
| REV-12 | Deuda Técnica | Alta | trello_simple/ | 1 | Ausencia de tests automatizados |
| REV-13 | Deuda Técnica | Media | trello_simple/ | 1 | Sin linting, formatting ni CI/CD |
| REV-14 | Arquitectura | Media | server/src/cards/cards.service.ts | 14 | Acoplamiento entre dominios (CardsService -> ColumnsService) |
| REV-15 | Lógica de negocio | Media | server/src/cards/cards.service.ts | 71 | Cálculo de posición por promedio propenso a colisiones |
| REV-16 | Mantenibilidad | Media | client/src/app/board/board.component.ts | 70 | Suscripciones no gestionadas (memory leaks) |

## Detalle

### REV-01 — TypeScript backend sin modo estricto
El `tsconfig.json` del backend desactiva `strictNullChecks`, `noImplicitAny`, `strictBindCallApply` y `forceConsistentCasingInFileNames`. Esto reduce la seguridad de tipos y facilita errores en runtime.

**Recomendación:** Activar `strict: true` y corregir los errores resultantes.

### REV-02 — Eager loading recursivo sin paginación
`Board.columns` y `BoardColumn.cards` usan `eager: true`, cargando todo el árbol de tableros/columnas/tarjetas en una sola consulta.

**Recomendación:** Quitar eager, cargar relaciones bajo demanda y paginar listados.

### REV-03 — Uso de Object.assign para actualizar entidades
Los servicios de boards, columns y cards usan `Object.assign(entity, dto)`. Aunque `ValidationPipe` con `whitelist: true` mitiga algo, el patrón es frágil.

**Recomendación:** Asignar campos explícitamente o usar `repository.save` con objeto parcial tipado.

### REV-04 — URL de API hardcodeada
`client/src/app/boards.service.ts` define `const API = 'http://localhost:3000'`.

**Recomendación:** Usar `environment.ts` o configuración runtime para la URL base.

### REV-05 — Propiedad cache sin tipado
`private cache: any = {}` pierde seguridad de tipos.

**Recomendación:** Tipar con interfaz acotada o `Map<string, unknown>`.

### REV-06 — Método duplicado/muerto deleteColumnAgain
Existe `deleteColumnAgain` idéntico a `deleteColumn`.

**Recomendación:** Eliminarlo y unificar las llamadas.

### REV-07 — Uso de any en @Input() column
`ColumnComponent` define `@Input() column!: any` pese al strict mode del cliente.

**Recomendación:** Tipar con la interfaz `Column` de `models.ts`.

### REV-08 — Ordenación duplicada de columnas y tarjetas
El método `select()` ejecuta la misma lógica de ordenación dos veces consecutivas.

**Recomendación:** Extraer una función privada `sortBoard(board)`.

### REV-09 — Manejo de errores vacío en suscripciones
`listBoards()`, `moveCard()` y otros usan callbacks `error: () => {}`, ocultando fallos del backend.

**Recomendación:** Implementar manejo de errores y rollback de estado.

### REV-10 — Elementos interactivos sin etiquetas accesibles
Inputs y botones carecen de `aria-label` y labels visibles asociados.

**Recomendación:** Añadir `aria-label` y asociar labels explícitos.

### REV-11 — Drag & drop optimista sin rollback
Al mover tarjetas se actualiza el estado local inmediatamente y la petición al backend tiene error vacío; no se revierte.

**Recomendación:** Guardar estado previo y restaurarlo en caso de error.

### REV-12 — Ausencia de tests automatizados
No hay archivos `.spec.ts` ni `.test.ts` en backend ni frontend.

**Recomendación:** Añadir tests unitarios con Jest (NestJS) y Angular Testing Library/Karma.

### REV-13 — Sin linting, formatting ni CI/CD
No se detectan ESLint, Prettier, editorconfig, husky ni pipelines CI/CD.

**Recomendación:** Configurar ESLint + Prettier, editorconfig, husky/lint-staged y CI/CD.

### REV-14 — Acoplamiento entre dominios
`CardsService` inyecta `ColumnsService` para validar existencia de columna.

**Recomendación:** Validar mediante repositorio propio o eventos; manejar transacción atómicamente.

### REV-15 — Cálculo de posición por promedio propenso a colisiones
`move()` asigna `position = (prev + next) / 2`. Tras muchos movimientos pueden converger posiciones.

**Recomendación:** Implementar reindexación periódica o usar enteros con espaciado.

### REV-16 — Suscripciones no gestionadas
`BoardComponent` crea suscripciones sin desuscribirse ni usar `takeUntilDestroyed`.

**Recomendación:** Usar `async pipe` o desuscribirse explícitamente en `ngOnDestroy`.

---
*Revisión técnica generada por el agente de revisión.*
