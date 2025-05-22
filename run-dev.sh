#!/bin/bash
# Docker Compose 실행
docker-compose down
docker compose --env-file ./.env up -d

echo "개발 환경이 시작되었습니다. http://localhost:3000 에서 접속 가능합니다." 