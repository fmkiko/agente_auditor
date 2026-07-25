---
description: Genera el plan de accion de remediacion a partir de los hallazgos consolidados.
---

# Skill: generar-plan-accion

## Objetivo

Crear un plan de accion ejecutable y priorizado para remediar los hallazgos.

## Cuándo debe utilizarse

Despues de `consolidar-resultados`.

## Conocimiento para el agente

Generar el archivo:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/plan-accion.md`

El plan debe incluir:

1. Lista de acciones priorizadas por severidad.
2. Responsable propuesto por accion (Rol/Equipo).
3. Esfuerzo estimado (S, M, L).
4. Ventana temporal sugerida.
5. Dependencias y bloqueadores.

No inventar hallazgos. Basar todas las acciones en hallazgos asociados al `audit_id`.

## Resultado esperado

Crear correctamente:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/plan-accion.md`
