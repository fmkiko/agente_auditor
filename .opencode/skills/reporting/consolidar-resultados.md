---
description: Recupera, consolida y ordena la información generada durante la auditoría.
---

# Skill: consolidar-resultados

## Objetivo

Preparar los resultados de la auditoría para generar los entregables finales.

## Cuándo debe utilizarse

Al inicio de la generación del reporte.

## Conocimiento para el agente

Recuperar de MCP Memory:

- Contexto de descubrimiento.
- Hallazgos del agente de revisión.
- Hallazgos del agente de seguridad.

Procesar únicamente los registros asociados al `audit_id`.

Consolidar los hallazgos:

- Eliminando duplicados evidentes.
- Manteniendo la evidencia original.
- Ordenando por severidad.
- Agrupando por agente y categoría.
- Conservando archivo, línea y recomendación.

Orden de severidad:

1. Crítica
2. Alta
3. Media
4. Baja

## Resultado esperado

Dejar preparados los datos consolidados que utilizarán las Skills de generación de entregables.