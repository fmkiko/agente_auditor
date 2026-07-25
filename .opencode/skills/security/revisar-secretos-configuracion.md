---
description: Detecta secretos expuestos y configuraciones inseguras en código, archivos de entorno e infraestructura.
---

# Skill: revisar-secretos-configuracion

## Objetivo

Identificar credenciales expuestas y configuraciones que reduzcan la seguridad del proyecto.

## Cuándo debe utilizarse

Después del análisis de entradas.

## Conocimiento para el agente

Revisar:

- Claves API.
- Contraseñas.
- Tokens.
- Certificados y claves privadas.
- Cadenas de conexión.
- Archivos `.env`.
- Configuraciones por defecto.
- CORS.
- Cookies.
- Cabeceras de seguridad.
- Logs con datos sensibles.
- Modos debug.
- Puertos o servicios expuestos.
- Permisos excesivos.
- Docker, CI/CD e infraestructura como código.

No copiar el valor completo de ningún secreto detectado.

En la evidencia, enmascarar los valores sensibles.

## Resultado esperado

Guardar cada incidencia en MCP Memory utilizando:

`schemas/finding-schema.md`

Usar categorías como:

- `Secretos`
- `Configuración insegura`
- `CORS`
- `Cabeceras de seguridad`
- `Infraestructura`