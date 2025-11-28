#!/bin/bash
set -e

COMPOSE_FILE="docker-compose-dev.yml"

echo "Stopping Docker Compose services..."
docker-compose -f $COMPOSE_FILE down

echo "✅ All containers stopped!"