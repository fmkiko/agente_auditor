---
description: Consolida todos los hallazgos obtenidos durante la revisión técnica.
---

# Skill: generar-revision

## Objetivo

Consolidar los resultados obtenidos por las Skills de revisión.

## Cuándo debe utilizarse

Al finalizar la revisión técnica.

## Conocimiento para el agente

Recuperar toda la información generada por las Skills anteriores y construir un único contexto de revisión.

No generar recomendaciones.

Antes de cerrar la consolidación, verificar cobertura mínima de revisión técnica:

1. Existe al menos una comprobación documentada de manejo de errores asíncronos.
2. Existe al menos una comprobación documentada de side effects en frontend.
3. Existe al menos una comprobación documentada de tipado débil (`any`/casts amplios).
4. Existe al menos una comprobación documentada de duplicación.

Si algún punto falta, registrar brecha de cobertura en MCP Memory y marcar la revisión como incompleta.

## Resultado esperado

Guardar en MCP Memory un resumen estructurado de la revisión técnica asociado al `audit_id`.