---
description: Genera un roadmap de remediacion por fases a partir de hallazgos consolidados.
---

# Skill: generar-roadmap

## Objetivo

Definir una ruta de ejecucion por fases para implementar la remediacion.

## Cuándo debe utilizarse

Despues de `generar-backlog`.

## Conocimiento para el agente

Generar el archivo:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/roadmap.md`

El roadmap debe incluir:

1. Fase inmediata (0-2 semanas): acciones criticas.
2. Corto plazo (2-6 semanas): acciones altas.
3. Mediano plazo (6-12 semanas): acciones medias/bajas y mejoras estructurales.
4. Hitos de validacion y salida por fase.
5. Riesgos de ejecucion y mitigaciones.

El roadmap debe derivarse del backlog y de la severidad de hallazgos del `audit_id`.

## Resultado esperado

Crear correctamente:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/roadmap.md`
