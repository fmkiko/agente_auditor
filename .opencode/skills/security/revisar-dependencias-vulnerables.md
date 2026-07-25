---
description: Analiza las dependencias declaradas e identifica versiones obsoletas o potencialmente vulnerables.
---

# Skill: revisar-dependencias-vulnerables

## Objetivo

Detectar riesgos asociados a librerías, frameworks, SDK y paquetes de terceros.

## Cuándo debe utilizarse

Después de revisar secretos y configuración.

## Conocimiento para el agente

Analizar:

- Manifiestos de dependencias.
- Archivos lock.
- Versiones fijadas.
- Dependencias sin mantener.
- Paquetes obsoletos.
- Dependencias innecesarias.
- Paquetes instalados desde fuentes no confiables.
- Scripts de instalación.
- Riesgos en la cadena de suministro.

No inventar vulnerabilidades ni identificadores CVE.

Cuando no exista evidencia suficiente para confirmar una vulnerabilidad conocida, registrar el resultado como riesgo potencial y recomendar verificación con herramientas especializadas.

## Resultado esperado

Guardar cada incidencia en MCP Memory utilizando:

`schemas/finding-schema.md`

Usar categorías como:

- `Dependencias`
- `Cadena de suministro`
- `Componente obsoleto`