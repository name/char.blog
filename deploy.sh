#!/bin/bash
set -euo pipefail

echo "Hello $USER!"
echo "Today is $(date)"
echo "Current working directory: $(pwd)"
echo "Starting deployment..."

# Set appropriate permissions for the current directory
echo "Setting appropriate permissions for this folder..."
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Make sure the script is executable
chmod +x "$0"

# Run container deployments
echo "Running container deployments..."

# Run the docker-compose file
if [ -f docker-compose.yml ]; then
    docker compose -f docker-compose.yml up -d --build
else
    echo "Error: docker-compose.yml not found!"
    exit 1
fi

# Prune images
echo "Pruning images..."
docker image prune -f

echo "Deployment complete!"
