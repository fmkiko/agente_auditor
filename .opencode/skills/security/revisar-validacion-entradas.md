---
description: Detecta entradas no validadas, sanitización insuficiente y posibles vulnerabilidades de inyección.
---

# Skill: revisar-validacion-entradas

## Objetivo

Identificar puntos donde datos no confiables puedan alterar consultas, comandos, respuestas o lógica de negocio.

## Cuándo debe utilizarse

Después de revisar autenticación y autorización.

## Conocimiento para el agente

Analizar entradas procedentes de:

- Parámetros de URL.
- Cuerpo de peticiones.
- Cabeceras.
- Cookies.
- Formularios.
- Archivos subidos.
- Mensajes de colas.
- Webhooks.
- Variables externas.

Buscar posibles riesgos de:

- SQL Injection.
- NoSQL Injection.
- Command Injection.
- Cross-Site Scripting.
- Path Traversal.
- Server-Side Request Forgery.
- Deserialización insegura.
- Carga de archivos insegura.
- Validación insuficiente de tipos, formatos o tamaños.
- Exposición de endpoints raw, debug o administrativos sin autenticación ni sanitización.

No afirmar que existe una vulnerabilidad sin evidencia suficiente.

## Resultado esperado

Guardar cada incidencia en MCP Memory utilizando:

`schemas/finding-schema.md`

Usar categorías como:

- `Validación de entradas`
- `Inyección`
- `Exposición de endpoint`
- `XSS`
- `Carga de archivos`
- `SSRF`

Para cada endpoint raw o debug detectado, crear un hallazgo separado que incluya:
- ruta exacta (por ejemplo `GET /cards/search/raw`)
- parámetro de entrada sin validar
- consecuencia directa (inyección, exfiltración, etc.)
- severidad mínima Alta