---
description: Genera especificaciones tecnicas de remediacion con criterios de aceptacion.
---

# Skill: generar-especificaciones

## Objetivo

Definir especificaciones tecnicas claras para implementar las remediaciones.

## Cuándo debe utilizarse

Despues de `generar-plan-accion`.

## Conocimiento para el agente

Generar el archivo:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/especificaciones.md`

Debe incluir:

1. Cambios requeridos por area (backend, frontend, infraestructura).
2. Criterios de aceptación verificables por cada bloque de cambios.
3. Riesgos tecnicos y mitigaciones.
4. Supuestos y fuera de alcance.

Las especificaciones deben estar trazadas a los hallazgos del `audit_id`.

## Resultado esperado

Crear correctamente:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/especificaciones.md`
