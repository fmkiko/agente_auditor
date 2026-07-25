---
description: Genera el informe tecnico en Markdown a partir de hallazgos consolidados.
---

# Skill: generar-excel-tecnico

## Objetivo

Crear el entregable técnico `auditoria-tecnica.md` con el detalle completo de los hallazgos.

## Cuándo debe utilizarse

Después de `consolidar-resultados`, cuando ya se dispone de la lista de hallazgos estructurados.

## Conocimiento para el agente

Generar el archivo:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/auditoria-tecnica.md`

El contenido debe incluir:

1. Identificación (`audit_id`, fecha, proyecto, ruta).
2. Resumen por severidad (conteo total y por nivel).
3. Tabla de hallazgos con columnas:
   - ID
   - Severidad
   - Categoría
   - Archivo
   - Línea
   - Título
   - Descripción
   - Recomendación
4. Riesgos técnicos transversales y prioridades.

## Resultado esperado

El archivo `auditoria-tecnica.md` creado correctamente y trazable al `audit_id`.
