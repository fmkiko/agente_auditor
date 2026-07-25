---
description: Genera un backlog priorizado y trazable a los hallazgos de la auditoria.
---

# Skill: generar-backlog

## Objetivo

Crear un backlog accionable de remediacion.

## Cuándo debe utilizarse

Despues de `generar-especificaciones`.

## Conocimiento para el agente

Generar el archivo:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/backlog.md`

El backlog debe incluir:

1. Items priorizados (P0, P1, P2).
2. Referencia a hallazgo(s) por `audit_id`.
3. Descripcion funcional/tecnica breve.
4. Definicion de terminado (DoD).
5. Riesgo residual si no se implementa.

## Resultado esperado

Crear correctamente:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/backlog.md`
