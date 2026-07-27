---
description: Inicia y coordina una auditoría integral de código fuente usando agentes especializados y MCP Memory.
argument-hint: "[path] [--fast]"
agent: agente-descubridor
---

# Comando: /auditar_todo

## Objetivo

Coordinar y ejecutar una auditoría integral de código fuente en un repositorio objetivo, orquestando los agentes de Descubrimiento, Revisión, Seguridad y Reporte, manteniendo el estado centralizado en MCP Memory.

---

## Parámetros

| Parámetro | Tipo | Requerido | Default | Descripción |
| :-------- | :--- | :-------- | :------ | :---------- |
| `path` | string | No | `.` | Ruta relativa o absoluta del proyecto a auditar. |
| `--fast` | flag | No | desactivado | Ejecuta solo el descubrimiento y las revisiones críticas de seguridad. |
| `profundidad` | enum | No | `completa` | `fast` o `completa`. `--fast` equivale a `fast`. |

---

## Preparación

Antes de empezar:

1. Verificar que el servidor MCP Memory está disponible:
   - Intentar `search_nodes` con el nombre del proyecto.
   - Si falla, detener y reportar el error.
2. Generar un `audit_id` único (UUID v4).
3. Resolver `project_path` a ruta absoluta desde el argumento `path`.
4. Derivar `project_name` como el nombre de la última carpeta de `project_path`, en minúsculas y con guiones bajos.
5. Registrar la auditoría en `.notas/path_auditoria.md` con `audit_id`, `project_path`, `project_name`, fecha y profundidad.
6. Crear la entidad `audit_{audit_id}` en MCP Memory con:
   - `audit_id`, `project_path`, `project_name`
   - `fecha_creacion`
   - `profundidad`
   - `estado: en_progreso`
   - `agente_actual: inicializando`

---

## Secuencia de agentes

Ejecutar los agentes de forma **secuencial**. No invocar un agente hasta que el anterior haya finalizado y esté registrado en MCP Memory.

### Paso 1 – Descubrimiento de arquitectura

Invocar `@agente-descubridor` con:

- `audit_id`
- `project_path`
- `profundidad`

Responsabilidades del agente:

- Mapear estructura, lenguajes, frameworks y dependencias.
- Guardar entidades de archivos y módulos en MCP Memory asociadas al `audit_id`.
- Emitir `estado: descubrimiento_completado` en la entidad `audit_{audit_id}`.

### Paso 2 – Análisis de calidad y deuda técnica

Invocar `@agente-revision` con:

- `audit_id`
- `project_path`
- `profundidad`

Responsabilidades:

- Leer de MCP Memory el contexto del agente descubridor.
- Analizar mantenibilidad, SOLID, patrones y deuda técnica.
- Registrar hallazgos con `agent: agente-revision`, siguiendo `schemas/finding-schema.md`.
- Emitir `estado: revision_completada`.

Si `profundidad == fast`, limitar la revisión a archivos de mayor superficie (entrypoints, controladores, servicios principales).

### Paso 3 – Auditoría de seguridad

Invocar `@agente-seguridad` con:

- `audit_id`
- `project_path`
- `profundidad`

Responsabilidades:

- Leer contexto de descubrimiento y hallazgos de revisión.
- Buscar vulnerabilidades OWASP, fugas de credenciales y librerías desactualizadas.
- Registrar hallazgos con `agent: agente-seguridad` y severidad `Crítica|Alta|Media|Baja`.
- Emitir `estado: seguridad_completada`.

### Paso 4 – Consolidación y entregables

Invocar `@agente-reporte` con:

- `audit_id`
- `project_path`
- `profundidad`

Responsabilidades:

- Recuperar todo el estado acumulado con `search_nodes`.
- Ejecutar las skills de reporting (`consolidar-resultados`, planes, Excel, informe ejecutivo, validación).
- Generar los archivos en `auditoria/{project_name}_{YYYYMMDD_HHMM}/`.
- Generar las copias finales `.docs/Reporte_Tecnico.xlsx` y `.docs/Reporte_Ejecutivo.docx`.
- Registrar `estado: reporte_completado` y las rutas de entregables.

---

## Resultado esperado

Al finalizar:

1. Grafo MCP Memory con:
   - Entidad `audit_{audit_id}`.
   - Contexto de descubrimiento.
   - Hallazgos de revisión y seguridad.
   - Resumen final y rutas de entregables.
2. Archivos generados:
   - `auditoria/{project_name}_{YYYYMMDD_HHMM}/auditoria-tecnica.xlsx`
   - `auditoria/{project_name}_{YYYYMMDD_HHMM}/informe-ejecutivo.docx`
   - `.docs/Reporte_Tecnico.xlsx`
   - `.docs/Reporte_Ejecutivo.docx`

---

## Reglas de ejecución

- Todos los agentes usan el mismo `audit_id`.
- Los agentes se ejecutan secuencialmente.
- No modificar el código fuente del proyecto auditado.
- No ejecutar acciones destructivas o exploits.
- Si un agente falla, detener el flujo y reportar el error, dejando `estado: error` en MCP Memory.
