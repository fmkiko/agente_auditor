---
description: Valida que los entregables finales existan y contengan la información esperada.
---

# Skill: validar-entregables

## Objetivo

Comprobar que los entregables de la auditoría se han generado correctamente.

## Cuándo debe utilizarse

Al finalizar la generación del reporte.

## Conocimiento para el agente

Validar que:

- Existe la carpeta `auditoria/{project_name}_{YYYYMMDD_HHMM}/`.
- Existe `auditoria/{project_name}_{YYYYMMDD_HHMM}/plan-accion.md`.
- Existe `auditoria/{project_name}_{YYYYMMDD_HHMM}/especificaciones.md`.
- Existe `auditoria/{project_name}_{YYYYMMDD_HHMM}/backlog.md`.
- Existe `auditoria/{project_name}_{YYYYMMDD_HHMM}/roadmap.md`.
- Existe `auditoria/{project_name}_{YYYYMMDD_HHMM}/auditoria-tecnica.md`.
- Existe `auditoria/{project_name}_{YYYYMMDD_HHMM}/informe-ejecutivo.md`.
- `plan-accion.md` contiene acciones priorizadas y responsables propuestos.
- `especificaciones.md` contiene criterios de aceptación verificables.
- `backlog.md` contiene prioridad y DoD por item.
- `roadmap.md` contiene fases e hitos.
- `auditoria-tecnica.md` contiene resumen por severidad y detalle de hallazgos con evidencia.
- Los hallazgos pertenecen al `audit_id`.
- El informe ejecutivo contiene las secciones obligatorias.
- No aparecen secretos ni credenciales.
- Las cantidades del resumen ejecutivo coinciden con `auditoria-tecnica.md`.
- No existen entregables finales en `.notas/`.

## Resultado esperado

Confirmar la ruta de los entregables generados o informar claramente de cualquier error.