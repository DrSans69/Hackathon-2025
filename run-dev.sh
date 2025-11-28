#!/bin/bash
set -e

# Name of the backend service in docker-compose
BACKEND_SERVICE="backend"
COMPOSE_FILE="docker-compose-dev.yml"

# Start all services in detached mode
echo "Starting Docker Compose..."
docker-compose -f $COMPOSE_FILE up -d --build
# docker-compose -f $COMPOSE_FILE up --build


# Wait for PostgreSQL to be ready
# echo "Waiting for PostgreSQL to be ready..."
# until docker-compose -f $COMPOSE_FILE exec -T db pg_isready -U ${POSTGRES_USER:-postgres} > /dev/null 2>&1; do
#   sleep 1
# done
# echo "PostgreSQL is ready!"

# Run Django migrations
echo "Applying Django migrations..."
docker-compose -f $COMPOSE_FILE exec -T $BACKEND_SERVICE python manage.py makemigrations
docker-compose -f $COMPOSE_FILE exec -T $BACKEND_SERVICE python manage.py migrate

# Create superuser admin if it doesn't exist
# echo "Creating superuser admin..."
# docker-compose -f $COMPOSE_FILE exec -T $BACKEND_SERVICE python manage.py createsuperuser --no-input


# echo "✅ Dev environment is ready! Superuser admin/admin created."
