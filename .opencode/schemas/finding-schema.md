# Esquema de Hallazgos

Todos los agentes que detecten incidencias deberán almacenar los hallazgos en MCP Memory utilizando el siguiente formato:

```json
{
  "audit_id": "",
  "agent": "",
  "category": "",
  "severity": "",
  "file": "",
  "line": "",
  "title": "",
  "description": "",
  "recommendation": ""
}
```

## Campos obligatorios

- `audit_id` → Identificador único de la auditoría.
- `agent` → Agente que ha generado el hallazgo.
- `category` → Categoría del hallazgo (Clean Code, Arquitectura, Rendimiento, OWASP, Dependencias, etc.).
- `severity` → Nivel de criticidad (`Crítica`, `Alta`, `Media`, `Baja`).
- `title` → Título breve del hallazgo.
- `description` → Descripción detallada del problema detectado.

## Campos opcionales

- `file` → Archivo donde se detectó el problema.
- `line` → Línea aproximada del hallazgo.
- `recommendation` → Acción recomendada para resolver el problema.