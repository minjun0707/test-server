#!/bin/bash
# Docker Compose 실행
echo "🔄 도커 컨테이너 중지 중..."
docker-compose down

echo "🏗️ 도커 이미지 새로 빌드 중..."
docker-compose build --no-cache

echo "🚀 도커 컨테이너 시작 중..."
docker compose --env-file ./.env up -d

echo "✅ 개발 환경이 시작되었습니다. http://localhost:3000 에서 접속 가능합니다." 