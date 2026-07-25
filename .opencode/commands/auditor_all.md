---
description: Inicia una auditoría integral de código utilizando agentes especializados.
argument-hint: [ruta_proyecto]
---

# /auditar_todo

## Contexto compartido

Al iniciar la auditoría:

- Generar un `audit_id` único.
- Resolver el `project_path`.

Todos los agentes deben recibir:

- `audit_id`
- `project_path`

Registrar la auditoría en `.notas/path_auditoria.md`, almacenando:

- `audit_id`
- `project_path`
- Fecha de creación

Este registro es solo de trazabilidad.
Los entregables finales no deben guardarse en `.notas/`.
Los entregables deben guardarse en:

`auditoria/{project_name}_{YYYYMMDD_HHMM}/`

Este registro permitirá reutilizar una auditoría o realizar seguimientos posteriores.

Toda la información almacenada en MCP Memory deberá estar asociada al mismo `audit_id`.

Cada agente será responsable de:

- Recuperar el contexto del proyecto utilizando el `audit_id`.
- Leer la información generada por los agentes anteriores.
- Guardar sus propios resultados utilizando el mismo `audit_id`.

---

## Objetivo

Iniciar y coordinar el flujo de auditoría de un proyecto de software.

Este comando no realiza análisis ni genera informes.

Sus responsabilidades son:

- Inicializar la auditoría.
- Generar el contexto compartido.
- Registrar la auditoría.
- Orquestar la ejecución de los agentes especializados.

---

## Parámetros

| Parámetro | Descripción | Obligatorio | Valor por defecto |
|-----------|-------------|-------------|-------------------|
| `ruta_proyecto` | Ruta del proyecto a auditar | No | `.` |

---

## Flujo

1. Iniciar la auditoría.
2. Invocar `@agente-descubridor` y esperar a su finalización.
3. Invocar `@agente-revision` y esperar a su finalización.
4. Invocar `@agente-seguridad` y esperar a su finalización.
5. Invocar `@agente-reporte` y esperar a su finalización.

Cada agente es responsable de:

- Ejecutar su propia lógica.
- Utilizar las Skills necesarias.
- Leer y escribir la información compartida en MCP Memory.
- Gestionar sus propios errores.

---

## Agentes

- `@agente-descubridor`
- `@agente-revision`
- `@agente-seguridad`
- `@agente-reporte`

---

## Resultado esperado

Al finalizar la ejecución estarán disponibles los entregables generados por el agente de reporte.
La salida debe cumplir la convención `project_name + fecha + hora`.

---

## Reglas de ejecución

- Los agentes deben ejecutarse de forma secuencial.
- No invocar un agente hasta que el anterior haya finalizado correctamente.
- Todos los agentes deben utilizar el mismo `audit_id` y `project_path`.
- Cada agente es responsable de leer y actualizar la información compartida en MCP Memory.