---
description: Analiza los mecanismos de autenticación, autorización y control de acceso del proyecto.
---

# Skill: revisar-autenticacion-autorizacion

## Objetivo

Detectar debilidades en los mecanismos de identidad y control de acceso.

## Cuándo debe utilizarse

Al inicio de la auditoría de seguridad, cuando el proyecto utilice autenticación, sesiones, tokens, roles o permisos.

## Conocimiento para el agente

Revisar, cuando aplique:

- Inicio y cierre de sesión.
- Gestión de sesiones.
- JWT y otros tokens.
- Expiración y renovación de credenciales.
- Almacenamiento de contraseñas.
- Recuperación de contraseña.
- Roles y permisos.
- Autorización por recurso.
- Acceso horizontal y vertical.
- Endpoints sin protección.
- Middleware, guards y filtros de acceso.
- Principio de mínimo privilegio.

Basar cada hallazgo en evidencia observable en el código.

## Resultado esperado

Guardar cada incidencia en MCP Memory utilizando:

`schemas/finding-schema.md`

Usar categorías como:

- `Autenticación`
- `Autorización`
- `Control de acceso`
- `Gestión de sesión`