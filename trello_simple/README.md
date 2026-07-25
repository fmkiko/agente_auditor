# Trello Simple

Trello simplificado con **Angular + CDK Drag & Drop** (frontend),
**NestJS + TypeORM** (backend) y **PostgreSQL** (base de datos).

## Estructura

```
trello_simple/
├── server/   NestJS API (boards, columns, cards + drag & drop)
├── client/   Angular app con @angular/cdk/drag-drop
└── docker-compose.yml  PostgreSQL 16
```

## Puertos

- Angular: http://localhost:4200
- NestJS API: http://localhost:3000
- PostgreSQL: localhost:5432

## Arranque

### 1. Base de datos (Docker)
```bash
docker compose up -d
```

### 2. Backend
```bash
cd server
npm install
npm run start:dev
```

### 3. Frontend
```bash
cd client
npm install
npm start
```
Abre http://localhost:4200

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/boards` | Listar tableros |
| POST | `/boards` | Crear tablero |
| GET | `/boards/:id` | Tablero con columnas y tarjetas |
| POST | `/columns` | Crear columna |
| POST | `/cards` | Crear tarjeta |
| POST | `/cards/:id/move` | Mover tarjeta (drag & drop) |
| DELETE | `/cards/:id` | Borrar tarjeta |
| DELETE | `/columns/:id` | Borrar columna |

## Drag & Drop

El reordenamiento usa un campo `position` numérico. Al mover una tarjeta,
el backend (`CardsService.move`) recalcula la posición como el promedio
entre la tarjeta anterior y la siguiente, evitando reindexar toda la lista.
