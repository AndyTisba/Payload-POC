#!/bin/bash

echo "Arrêt de MinIO..."
docker stop minio && docker rm minio
echo "MinIO arrêté."
