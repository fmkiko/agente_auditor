---
description: Identifica deuda técnica y oportunidades de mejora del código.
---

# Skill: revisar-deuda-tecnica

## Objetivo

Detectar elementos que incrementan el coste de mantenimiento.

## Cuándo debe utilizarse

Al finalizar la revisión técnica.

## Conocimiento para el agente

Buscar:

- código obsoleto
- código muerto
- TODO/FIXME
- duplicación
- configuraciones innecesarias
- malas prácticas repetidas
- métodos con implementación duplicada
- bloques consecutivos repetidos en una misma función
- side effects en capa de presentación (`localStorage`, `document`, `window`)
  - **Verificar explícitamente**: asignaciones a `document.title`, `document.body`, `document.cookie`, `window.__*` o `window.*` dinámico.
  - **Regla estricta**: `document.title = ...` siempre se reporta como hallazgo individual.
- estado global no encapsulado
- firmas de métodos con tipado débil (`any` como parámetro o retorno)

Para cada hallazgo incluir evidencia concreta con archivo y línea aproximada.

## Resultado esperado

Guardar en MCP Memory la deuda técnica detectada utilizando el `audit_id`.