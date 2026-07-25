---
description: Consolida los hallazgos obtenidos durante la auditoría de seguridad y valida que cumplan el esquema común.
---

# Skill: generar-revision-seguridad

## Objetivo

Consolidar y validar los resultados generados por las Skills de seguridad.

## Cuándo debe utilizarse

Al finalizar la auditoría de seguridad.

## Conocimiento para el agente

Recuperar todos los hallazgos de seguridad asociados al `audit_id`.

Comprobar que:

- Cumplen `schemas/finding-schema.md`.
- Incluyen una severidad válida.
- Incluyen categoría, título y descripción.
- La evidencia corresponde al proyecto auditado.
- No existen duplicados evidentes.
- Los secretos están enmascarados.
- No se presentan riesgos potenciales como vulnerabilidades confirmadas.

No eliminar hallazgos previos de otros agentes.

## Resultado esperado

Dejar en MCP Memory una colección validada de hallazgos de seguridad asociada al `audit_id`.

No generar informes ni documentos.