build_back_dev:
	docker build -t weather-server:dev --no-cache -f ./Dockerfile .

runback_dev:
	docker run -d --name weather-server-dev --env-file ./.env -p 8080:8080 weather-server:dev

build_back_prod:
	docker build -t weather-server:prod --no-cache -f ./Dockerfile.production .

runback_prod:
	docker run -d --name weather-server-prod --env-file ./.env -p 8081:8081 weather-server:prod