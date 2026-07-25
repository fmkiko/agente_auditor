# Esquema de Descubrimiento

El agente descubridor deberá almacenar el contexto técnico del proyecto en MCP Memory utilizando el siguiente formato:

```json
{
  "audit_id": "",
  "project_path": "",
  "stack_tecnologico": {},
  "arquitectura": {},
  "estructura_proyecto": {},
  "dependencias_detectadas": [],
  "contexto_consolidado": ""
}
```

## Campos obligatorios

- `audit_id`
- `project_path`
- `stack_tecnologico`
- `arquitectura`
- `estructura_proyecto`
- `dependencias_detectadas`
- `contexto_consolidado`

## Descripción de los campos

### `audit_id`

Identificador único de la auditoría.

### `project_path`

Ruta del proyecto analizado.

### `stack_tecnologico`

Lenguajes, frameworks, runtimes, gestores de paquetes, bases de datos, herramientas de testing, build, cloud y contenedores detectados.

### `arquitectura`

Arquitectura identificada en el proyecto y breve justificación basada en la estructura y patrones encontrados.

### `estructura_proyecto`

Directorios principales, capas, módulos, componentes, servicios, puntos de entrada y archivos de configuración relevantes.

### `dependencias_detectadas`

Librerías, frameworks, SDK, APIs, servicios externos y dependencias internas relevantes.

### `contexto_consolidado`

Resumen técnico del proyecto que será utilizado por los agentes de revisión, seguridad y reporte.