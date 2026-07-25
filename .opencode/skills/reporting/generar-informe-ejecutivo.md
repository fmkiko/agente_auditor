---
description: Genera el informe ejecutivo en Markdown a partir de los hallazgos consolidados.
---

# Skill: generar-informe-ejecutivo

## Objetivo

Crear el resumen ejecutivo en Markdown, orientado a responsables técnicos y de negocio.

## Cuándo debe utilizarse

Después de `generar-excel-tecnico`.

## Conocimiento para el agente

Generar el archivo:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/informe-ejecutivo.md`

El informe debe incluir:

1. Identificación del proyecto.
2. Objetivo y alcance.
3. Stack y arquitectura.
4. Valoración general.
5. Resumen de hallazgos por severidad.
6. Principales riesgos.
7. Recomendaciones prioritarias.
8. Próximos pasos.

## Resultado esperado

`informe-ejecutivo.md` con las secciones obligatorias y alineado al `audit_id`.
