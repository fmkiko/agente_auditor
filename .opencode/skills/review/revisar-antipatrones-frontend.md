---
description: Detecta anti-patrones frontend que suelen escaparse en revisiones genéricas.
---

# Skill: revisar-antipatrones-frontend

## Objetivo

Detectar errores silenciosos, side effects no controlados, tipado débil y duplicación en componentes y servicios frontend.

## Cuándo debe utilizarse

Después de `revisar-clean-code` y antes de complejidad/rendimiento.

## Conocimiento para el agente

Aplicar esta Skill solo si el stack incluye frontend TypeScript (Angular/React/Vue).

Buscar de forma explícita:

- Errores silenciosos:
  - `catch {}` vacío.
  - `catch(() => {})`.
  - `subscribe({ error: () => {} })`.
  - callbacks de error vacíos.
- Side effects no controlados:
  - escrituras a `localStorage` / `sessionStorage` en componentes.
  - mutaciones de `document`, `window`, `history`, `location`.
    - **Patrón concreto a verificar**: asignaciones a `document.title`, `document.body`, `document.cookie`, `window.__*`, `window.*` dinámico.
    - **Regla estricta**: toda asignación a `document.title` debe registrarse como hallazgo separado con título explícito, archivo y línea.
    - **Regla estricta**: toda escritura a `localStorage`/`sessionStorage` dentro de un componente o servicio debe registrarse como hallazgo separado.
  - estado global ad-hoc (`window.xxx`).
- Tipado débil:
  - uso de `any` en propiedades, parámetros o retornos.
    - **Verificar explícitamente**: firmas de métodos en servicios Angular, como `searchCardsRaw(q: any): Observable<any>`.
    - **Regla estricta**: todo método con parámetro `any`, retorno `any` o propiedad `any` debe registrarse como hallazgo individual con firma exacta.
  - castings amplios `as any`.
- Duplicación de lógica:
  - bloques consecutivos repetidos.
  - métodos equivalentes con distinto nombre.

Para cada hallazgo, incluir evidencia concreta:

- archivo
- línea aproximada
- patrón exacto detectado

## Criterios mínimos de cobertura

Antes de finalizar la Skill, confirmar checklist:

1. Se revisó manejo de errores en flujos asíncronos del frontend.
2. Se revisaron side effects en componentes y servicios.
3. Se revisó uso de `any` y castings débiles.
   - Registrar hallazgos concretos de firmas de métodos, no solo propiedades.
4. Se revisó duplicación de lógica en archivos críticos.

Si algún punto no aplica, justificar explícitamente por qué.

## Resultado esperado

Guardar los hallazgos en MCP Memory asociados al `audit_id` con categorías sugeridas:

- `Robustez frontend`
- `Side effects`
- `Tipado`
- `Duplicación`
