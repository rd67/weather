build_back_dev:
	docker build -t backend:dev -f ./Dockerfile .

runback_dev:
	docker run -d --name back_dev_container -p 8080:8080 backend:dev

build_back_prod:
	docker build -t backend:prod -f ./Dockerfile.production .

runback_prod:
	docker run -d --name back_prod_container -p 8081:8081 backend:prod