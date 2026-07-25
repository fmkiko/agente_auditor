---
description: Detecta posibles problemas de rendimiento en el código fuente.
---

# Skill: revisar-rendimiento

## Objetivo

Identificar patrones que puedan afectar al rendimiento.

## Cuándo debe utilizarse

Después del análisis de complejidad.

## Conocimiento para el agente

Buscar:

- consultas repetidas
- bucles ineficientes
- operaciones costosas
- carga innecesaria de datos
- uso incorrecto de memoria
- operaciones bloqueantes

## Resultado esperado

Guardar en MCP Memory los posibles problemas de rendimiento asociados al `audit_id`.