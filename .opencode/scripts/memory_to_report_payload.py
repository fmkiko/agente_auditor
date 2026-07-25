#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lee un snapshot JSON exportado del grafo de MCP Memory y genera el JSON
que consume generate_report_assets.py.

Uso:
  python memory_to_report_payload.py --input findings.json --output payload.json
  python memory_to_report_payload.py --audit_id <uuid> --output payload.json

Si se pasa --audit_id, se lee el grafo completo desde stdin en formato JSON
(memory_read_graph) o desde --graph.
"""
import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path


def parse_observations(observations):
    data = {}
    for obs in observations:
        if ":" in obs:
            key, _, value = obs.partition(":")
            data[key.strip().lower().replace(" ", "_")] = value.strip()
    return data


def parse_audit_entity(entity):
    data = parse_observations(entity.get("observations", []))
    return {
        "audit_id": data.get("audit_id", ""),
        "project_path": data.get("project_path", ""),
        "project_name": data.get("project_name", ""),
        "profundidad": data.get("profundidad", "completa"),
        "fecha_creacion": data.get("fecha_creacion", datetime.now().strftime("%Y-%m-%d %H:%M")),
    }


def parse_discovery_entity(entity):
    data = parse_observations(entity.get("observations", []))
    return data.get("contexto_consolidado", "") or data.get("stack_tecnologico", "")


def parse_finding_entity(entity):
    data = parse_observations(entity.get("observations", []))
    sev = data.get("severity", "Media")
    # Normalizar términos comunes
    sev_lower = sev.lower()
    mapping = {
        "critica": "Crítica", "crítica": "Crítica", "critical": "Crítica",
        "alta": "Alta", "high": "Alta", "grave": "Alta",
        "media": "Media", "medio": "Media", "medium": "Media",
        "baja": "Baja", "low": "Baja", "leve": "Baja",
    }
    for k, v in mapping.items():
        if k in sev_lower:
            sev = v
            break
    if sev not in ("Crítica", "Alta", "Media", "Baja"):
        sev = "Media"
    return {
        "audit_id": data.get("audit_id", ""),
        "agent": data.get("agent", ""),
        "category": data.get("category", ""),
        "severity": sev,
        "file": data.get("file", ""),
        "line": data.get("line", ""),
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "recommendation": data.get("recommendation", ""),
    }


def build_payload(graph, audit_id=None):
    audit_info = {}
    stack_summary = ""
    findings = []
    for entity in graph.get("entities", []):
        name = entity.get("name", "")
        etype = entity.get("entityType", "")
        obs = entity.get("observations", [])
        data = parse_observations(obs)
        entity_audit_id = data.get("audit_id", "")
        if audit_id and entity_audit_id != audit_id:
            continue
        if etype in ("audit", "auditoria") and not audit_info:
            audit_info = parse_audit_entity(entity)
        if etype in ("discovery_result", "descubrimiento") and not stack_summary:
            stack_summary = parse_discovery_entity(entity)
        if etype in ("finding", "hallazgo", "security_result", "review_result"):
            # Para entidades resultado, intentar extraer hallazgos internos si no tienen formato estándar
            if entity_audit_id:
                findings.append(parse_finding_entity(entity))

    if not audit_info and audit_id:
        audit_info = {
            "audit_id": audit_id,
            "project_path": "",
            "project_name": "proyecto",
            "profundidad": "completa",
            "fecha_creacion": datetime.now().strftime("%Y-%m-%d %H:%M"),
        }

    return {
        "meta": {
            "audit_id": audit_info.get("audit_id", audit_id or ""),
            "project_path": audit_info.get("project_path", ""),
            "project_name": audit_info.get("project_name", "proyecto_auditoria"),
            "fecha": audit_info.get("fecha_creacion", datetime.now().strftime("%Y-%m-%d %H:%M")),
            "profundidad": audit_info.get("profundidad", "completa"),
            "stack": stack_summary,
        },
        "findings": [f for f in findings if f.get("title")],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--audit_id", help="UUID de la auditoría")
    parser.add_argument("--input", "-i", help="JSON del grafo completo exportado")
    parser.add_argument("--output", "-o", required=True, help="Archivo JSON de salida")
    args = parser.parse_args()

    if args.input:
        graph = json.loads(Path(args.input).read_text(encoding="utf-8"))
    else:
        graph = json.loads(sys.stdin.read())

    payload = build_payload(graph, args.audit_id)
    Path(args.output).write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Payload generado: {args.output}")
    print(f"Hallazgos incluidos: {len(payload['findings'])}")


if __name__ == "__main__":
    main()
