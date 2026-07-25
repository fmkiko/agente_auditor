# Batería de Pruebas para Validar el Auditor

| Campo | Valor |
|-------|-------|
| Proyecto objetivo | trello_simple |
| Objetivo | Verificar que el auditor detecte fallos intencionales de seguridad, calidad y mantenibilidad |
| Fecha | 2026-07-25 |

## Alcance de pruebas

Esta batería cubre los fallos intencionales introducidos en frontend y backend:

1. SQL injection por concatenación de entrada de usuario.
2. Manejo silencioso de errores (errores tragados).
3. Side effects no controlados en capa de UI/servicios.
4. Uso de any y degradación de tipado.
5. Código duplicado.

## Preparación

1. Ejecutar análisis estático del repositorio (sin modificar código).
2. Si se desea prueba dinámica, instalar dependencias en client y server.
3. Levantar backend en puerto 3000 para pruebas HTTP.

## Casos de prueba

### CP-01 - Detección de SQL injection (backend)

- Tipo: Seguridad (SAST)
- Archivo objetivo: server/src/cards/cards.service.ts
- Patrón esperado:
  - Uso de DataSource.query con template string.
  - Interpolación directa de q dentro del SQL.
- Severidad esperada: Crítico
- Evidencia esperada:
  - Método searchByTitleUnsafe(term: string)
  - SQL con ILIKE '%${q}%'

### CP-02 - Endpoint expuesto que permite activar la inyección

- Tipo: Seguridad/API
- Archivo objetivo: server/src/cards/cards.controller.ts
- Patrón esperado:
  - Endpoint GET /cards/search/raw
  - Parámetro q sin validación/sanitización
- Severidad esperada: Alto o Crítico (según política)

### CP-03 - Prueba dinámica de payload SQL injection

- Tipo: DAST
- Precondición: Backend arriba
- Request de ejemplo:

```powershell
curl "http://localhost:3000/cards/search/raw?q=' OR 1=1 --"
```

- Resultado esperado vulnerable:
  - Respuesta con múltiples filas no acotadas por búsqueda legítima.
- Resultado esperado del auditor:
  - Hallazgo de SQL injection explotable o potencialmente explotable.

### CP-04 - Error silencioso en carga inicial de tableros

- Tipo: Calidad/Robustez (Frontend)
- Archivo objetivo: client/src/app/board/board.component.ts
- Patrón esperado:
  - Suscripción con error: () => {}
- Severidad esperada: Medio
- Riesgo:
  - Fallos de red no visibles para usuario ni trazables.

### CP-05 - Error silencioso al mover tarjetas

- Tipo: Calidad/Robustez (Frontend)
- Archivo objetivo: client/src/app/board/board.component.ts
- Patrón esperado:
  - moveCard(...).subscribe({ error: () => {} })
- Severidad esperada: Medio
- Riesgo:
  - Estado UI inconsistente sin rollback ni aviso.

### CP-06 - Side effects no controlados en UI

- Tipo: Arquitectura/Mantenibilidad
- Archivo objetivo: client/src/app/board/board.component.ts
- Patrones esperados:
  - localStorage.setItem('last-selected-board', id)
  - document.title = `Board ${id}`
- Severidad esperada: Bajo o Medio

### CP-07 - Side effects y estado global en servicio

- Tipo: Arquitectura/Anti-pattern
- Archivo objetivo: client/src/app/boards.service.ts
- Patrones esperados:
  - cache con tipo any
  - localStorage.setItem(...) dentro del servicio
  - (window as any).__rawSearch = q
- Severidad esperada: Medio

### CP-08 - Uso explícito de any

- Tipo: Calidad de código
- Archivo objetivo: client/src/app/boards.service.ts
- Patrones esperados:
  - private cache: any = {}
  - searchCardsRaw(q: any): Observable<any>
- Severidad esperada: Medio

### CP-09 - Duplicación de lógica en componente

- Tipo: Mantenibilidad
- Archivo objetivo: client/src/app/board/board.component.ts
- Patrón esperado:
  - Bloque de ordenamiento de columnas/tarjetas repetido dos veces consecutivas.
- Severidad esperada: Bajo o Medio

### CP-10 - Duplicación de método en servicio

- Tipo: Mantenibilidad
- Archivo objetivo: client/src/app/boards.service.ts
- Patrón esperado:
  - deleteColumn y deleteColumnAgain con implementación equivalente.
- Severidad esperada: Bajo

## Criterios de aceptación del auditor

La validación se considera correcta si el auditor:

1. Detecta al menos 1 hallazgo crítico de SQL injection.
2. Detecta los 2 errores silenciosos en board.component.ts.
3. Detecta side effects de localStorage/document/window.
4. Detecta uso de any en servicio frontend.
5. Detecta al menos 2 duplicaciones de código.

## Métrica sugerida para evaluación

- Recall de hallazgos esperados:
  - formula = hallazgos_detectados / hallazgos_esperados
- Meta mínima:
  - recall >= 0.80
- Meta recomendada:
  - recall >= 0.90

## Observaciones

Si las pruebas dinámicas no pueden correrse por dependencias faltantes, esta batería sigue siendo válida para SAST (análisis estático), ya que todos los patrones están presentes en código fuente.
