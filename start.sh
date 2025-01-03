#!/usr/bin/env bash



started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker-compose  up -d
echo ""
docker-compose  ps

web=$(docker-compose ps | grep squadhelp_server-prod_1 | awk '{print $1}')


echo "-----> Running application migrations"
docker exec -it "$web" sequelize db:migrate
echo ""


echo "-----> Running application seeds"
docker exec -it "$web" sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
