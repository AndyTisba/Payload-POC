#!/bin/bash

# Charger les variables d'environnement depuis le fichier .env
export $(grep -v '^#' .env | xargs)

# Vérifie si MinIO tourne déjà
if docker ps | grep -q "minio/minio"; then
  echo "MinIO est déjà en cours d'exécution."
else
  echo "Lancement de MinIO..."
  docker run -d \
    --name minio \
    -p 9000:9000 -p 9001:9001 \
    -e "MINIO_ROOT_USER=${MINIO_ROOT_USER}" \
    -e "MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}" \
    quay.io/minio/minio server /data --console-address ":9001"
  
  echo "MinIO lancé sur http://localhost:9001"
fi