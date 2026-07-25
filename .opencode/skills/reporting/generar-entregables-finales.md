---
name: generar-entregables-finales
description: Genera los entregables finales de la auditoria en formato Markdown. Use ONLY after consolidar-resultados.
---

# Skill: generar-entregables-finales

## Objetivo

Generar los entregables finales de la auditoría en formato Markdown.

## Cuándo debe utilizarse

Inmediatamente después de `consolidar-resultados`, cuando ya se dispone de:

- `audit_id`
- `project_path`
- `project_name`
- Contexto/stack del proyecto
- Lista consolidada de hallazgos estructurados

## Conocimiento para el agente

1. Construir un archivo JSON temporal con la siguiente estructura:

```json
{
  "meta": {
    "audit_id": "<uuid>",
    "project_path": "<ruta absoluta>",
    "project_name": "<nombre-normalizado>",
    "fecha": "YYYY-MM-DD HH:MM",
    "stack": "resumen del stack"
  },
  "findings": [
    {
      "audit_id": "<uuid>",
      "agent": "agente-revision | agente-seguridad",
      "category": "...",
      "severity": "Crítica|Alta|Media|Baja",
      "file": "...",
      "line": "...",
      "title": "...",
      "description": "...",
      "recommendation": "..."
    }
  ]
}
```

2. Generar los archivos Markdown en:
  - `auditoria/{project_name}_{YYYYMMDD_HHMM}/plan-accion.md`
  - `auditoria/{project_name}_{YYYYMMDD_HHMM}/especificaciones.md`
  - `auditoria/{project_name}_{YYYYMMDD_HHMM}/backlog.md`
  - `auditoria/{project_name}_{YYYYMMDD_HHMM}/roadmap.md`
  - `auditoria/{project_name}_{YYYYMMDD_HHMM}/auditoria-tecnica.md`
  - `auditoria/{project_name}_{YYYYMMDD_HHMM}/informe-ejecutivo.md`

3. Verificar que los archivos anteriores existen.

4. Registrar las rutas generadas como observaciones de la entidad `audit_{audit_id}` en MCP Memory.

## Resultado esperado

Los entregables Markdown creados correctamente y rutas registradas en MCP Memory.
