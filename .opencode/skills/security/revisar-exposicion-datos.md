---
description: Analiza el tratamiento de datos sensibles y detecta posibles exposiciones de información.
---

# Skill: revisar-exposicion-datos

## Objetivo

Identificar situaciones en las que información sensible pueda almacenarse, registrarse o transmitirse de forma insegura.

## Cuándo debe utilizarse

Después del análisis de dependencias.

## Conocimiento para el agente

Revisar:

- Datos personales.
- Credenciales.
- Tokens.
- Información financiera.
- Respuestas de APIs.
- Logs.
- Mensajes de error.
- Cachés.
- Almacenamiento local.
- Base de datos.
- Copias de seguridad.
- Cifrado en tránsito y en reposo.
- Serialización de entidades.
- Campos devueltos innecesariamente.

Diferenciar entre exposición confirmada y riesgo potencial.

## Resultado esperado

Guardar cada incidencia en MCP Memory utilizando:

`schemas/finding-schema.md`

Usar categorías como:

- `Exposición de datos`
- `Datos sensibles`
- `Logging inseguro`
- `Cifrado`
- `Manejo de errores`