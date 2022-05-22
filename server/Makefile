build_back_dev:
	docker build -t backend:dev -f ./Dockerfile .

runback_dev:
	docker run -d --name back_dev_container -p 3333:3333 backend:dev

build_back_prod:
	docker build -t backend:prod -f ./Dockerfile.production .

runback_prod:
	docker run -d --name back_prod_container -p 3335:3335 backend:prod