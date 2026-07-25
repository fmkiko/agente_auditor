# Esquema de Reporte

El agente de reporte deberá generar los entregables dentro de:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/`

Convención:

- `project_name`: nombre del proyecto normalizado en minúsculas y con guiones bajos.
- `YYYYMMDD_HHMM`: fecha y hora local de la ejecución.

`.notas/` queda reservada para registros de ejecución y trazabilidad.

## Plan de accion

Archivo:

`plan-accion.md`

Contenido minimo:

- Objetivos de remediacion priorizados.
- Acciones por severidad (Critica, Alta, Media, Baja).
- Responsable propuesto por accion.
- Esfuerzo estimado (S, M, L).
- Fecha objetivo o ventana temporal.

## Especificaciones de remediacion

Archivo:

`especificaciones.md`

Contenido minimo:

- Cambios tecnicos requeridos por area (backend, frontend, infraestructura).
- Criterios de aceptacion verificables.
- Riesgos y dependencias.
- Supuestos y alcance fuera de alcance.

## Backlog

Archivo:

`backlog.md`

Contenido minimo:

- Lista de items priorizados (P0, P1, P2).
- Relacion de cada item con hallazgo(s) por `audit_id`.
- Definicion de terminado (DoD) por item.

## Roadmap

Archivo:

`roadmap.md`

Contenido minimo:

- Fases sugeridas (inmediata, corto plazo, mediano plazo).
- Entregables por fase.
- Riesgos de ejecucion y mitigaciones.
- Hitos de validacion.

## Informe técnico

Archivo:

`auditoria-tecnica.md`

Contenido minimo:

- Identificación del proyecto y alcance.
- Resumen por severidad.
- Detalle de hallazgos con evidencia (archivo y línea aproximada).
- Recomendaciones técnicas priorizadas.
- Riesgos residuales y dependencias.

## Informe ejecutivo

Archivos:

- `informe-ejecutivo.md`

Secciones obligatorias:

- Identificación del proyecto.
- Objetivo y alcance.
- Stack y arquitectura.
- Valoración general.
- Resumen de hallazgos.
- Principales riesgos.
- Recomendaciones prioritarias.
- Próximos pasos.