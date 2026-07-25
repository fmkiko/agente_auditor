# Matriz de Severidad vs Hallazgo Esperado

| ID | Categoría | Hallazgo esperado | Severidad esperada | Archivo | Regla/indicador para el auditor |
|----|-----------|-------------------|--------------------|---------|----------------------------------|
| H-01 | Seguridad | SQL injection por concatenación de input en query SQL | Crítico | server/src/cards/cards.service.ts | query SQL construida con template string e interpolación de q |
| H-02 | Seguridad/API | Endpoint raw de búsqueda sin validación ni sanitización | Alto | server/src/cards/cards.controller.ts | GET /cards/search/raw consume q y llama método inseguro |
| H-03 | Calidad | Error silencioso en carga de boards | Medio | client/src/app/board/board.component.ts | subscribe con bloque error vacío |
| H-04 | Calidad | Error silencioso en moveCard | Medio | client/src/app/board/board.component.ts | subscribe con error: () => {} |
| H-05 | Arquitectura | Side effect en UI por escritura en localStorage | Medio | client/src/app/board/board.component.ts | localStorage.setItem dentro de select |
| H-06 | Arquitectura | Side effect en UI al mutar document.title | Bajo | client/src/app/board/board.component.ts | document.title mutado por evento de selección |
| H-07 | Arquitectura | Estado global compartido en window | Medio | client/src/app/boards.service.ts | asignación a (window as any).__rawSearch |
| H-08 | Tipado | Uso de any en cache de servicio | Medio | client/src/app/boards.service.ts | private cache: any |
| H-09 | Tipado | Método con input/output any | Medio | client/src/app/boards.service.ts | searchCardsRaw(q: any): Observable<any> |
| H-10 | Mantenibilidad | Bloque de ordenamiento duplicado | Bajo/Medio | client/src/app/board/board.component.ts | dos bloques consecutivos iguales de sort/forEach |
| H-11 | Mantenibilidad | Método duplicado de borrado de columna | Bajo | client/src/app/boards.service.ts | deleteColumnAgain replica deleteColumn |

## Resumen por severidad esperada

| Severidad | Cantidad esperada |
|-----------|-------------------|
| Crítico | 1 |
| Alto | 1 |
| Medio | 6 |
| Bajo | 2 |
| Bajo/Medio | 1 |
| Total | 11 |

## Cobertura mínima recomendada del auditor

1. Seguridad: detectar H-01 y H-02 obligatoriamente.
2. Calidad/robustez: detectar al menos H-03 y H-04.
3. Mantenibilidad/tipado: detectar al menos 3 entre H-08, H-09, H-10, H-11.

## Criterio de resultado

- Excelente: detecta 10-11/11 hallazgos.
- Aceptable: detecta 8-9/11 hallazgos.
- Insuficiente: detecta <= 7/11 hallazgos.
