mysql:
	docker run --name mysql-db --network global -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -d mysql:8.0

getdblist:
	docker exec -it mysql-db mysql -uroot -psecret -e "show databases;"

createdb:
	docker exec -it mysql-db mysql -uroot -psecret -e "create database products_and_variants;"

dropdb:
	docker exec -it mysql-db mysql -uroot -psecret -e "drop database if exists products_and_variants;"

localmigrateup:
	migrate -path db/migration -database "mysql://root:secret@tcp(localhost:3306)/products_and_variants" -verbose up

localmigratedown:
	migrate -path db/migration -database "mysql://root:secret@tcp(localhost:3306)/products_and_variants" -verbose down
	
sqlc:
	sqlc generate

test:
	go test -v -cover ./...

server:
	go run main.go

.PHONY: sqlc mysql createdb dropdb localmigrateup localmigratedown test server mock getdblist