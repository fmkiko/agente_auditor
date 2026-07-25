---
description: Evalúa el código siguiendo principios de Clean Code y buenas prácticas.
---

# Skill: revisar-clean-code

## Objetivo

Detectar problemas de mantenibilidad y legibilidad.

## Cuándo debe utilizarse

Después de revisar la arquitectura.

## Conocimiento para el agente

Revisar:

- nombres
- funciones largas
- clases grandes
- duplicación
- comentarios innecesarios
- principios SOLID
- responsabilidad única
- manejo explícito de errores asíncronos
- callbacks vacíos de error (por ejemplo `error: () => {}`)
- bloques `catch` vacíos o que silencian excepciones
- uso de `any` y castings amplios
  - **Incluir**: propiedades y firmas de métodos (por ejemplo `searchCardsRaw(q: any): Observable<any>`).
  - **Regla estricta**: cada firma con `any` debe convertirse en un hallazgo separado con archivo, línea y firma exacta.

Cuando haya frontend TypeScript, priorizar archivos de componentes y servicios para detectar anti-patrones de robustez.

No marcar como "revisado" si no se verifica explícitamente el manejo de errores de suscripciones/promesas.

## Resultado esperado

Guardar en MCP Memory los problemas detectados asociados al `audit_id`.