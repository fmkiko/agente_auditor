---
description: Consolida toda la información obtenida durante el descubrimiento y la almacena en MCP Memory para el resto de agentes.
---

# Skill: generar-contexto

## Objetivo

Consolidar toda la información obtenida durante el descubrimiento.

## Cuándo debe utilizarse

Al finalizar la fase de descubrimiento.

## Conocimiento para el agente

Recuperar la información generada por las Skills anteriores y construir un contexto único del proyecto que incluya:

- Información general
- Stack tecnológico
- Arquitectura
- Estructura
- Módulos principales
- Dependencias

No generar informes ni recomendaciones.

## Resultado esperado

Guardar en MCP Memory un contexto consolidado asociado al `audit_id` que será utilizado por el resto de agentes.