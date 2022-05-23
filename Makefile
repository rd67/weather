compose_run_dev:
	docker-compose --env-file ./server/.env -f docker-compose.yml up -d

compose_stop_dev:
	docker-compose --env-file ./server/.env -f docker-compose.yml down

compose_run_prod:
	docker-compose --env-file ./server/.env -f docker-compose-production.yml up -d 

compose_stop_prod:
	docker-compose --env-file ./server/.env -f docker-compose-production.yml down 