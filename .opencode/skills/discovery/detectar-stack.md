---
description: Identifica el stack tecnológico utilizado por un proyecto de software y almacena el resultado en MCP Memory.
---

# Skill: detectar-stack

## Objetivo

Identificar el stack tecnológico del proyecto.

## Cuándo debe utilizarse

Al inicio de la fase de descubrimiento, antes de cualquier análisis técnico o de seguridad.

## Conocimiento para el agente

Analizar el proyecto buscando archivos y configuraciones como:

- package.json
- pom.xml
- build.gradle
- requirements.txt
- pyproject.toml
- composer.json
- go.mod
- Cargo.toml
- Dockerfile
- docker-compose.yml
- angular.json
- vite.config.*
- next.config.*
- tsconfig.json

Identificar cuando sea posible:

- Lenguajes
- Frameworks
- Runtime
- Gestor de paquetes
- Base de datos
- Herramientas de build
- Herramientas de testing
- Cloud
- Contenedores

No realizar valoraciones ni recomendaciones.

## Resultado esperado

Guardar en MCP Memory, asociado al `audit_id`, el stack tecnológico identificado.