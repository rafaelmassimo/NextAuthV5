First step install next auth, 

* Copy from documentation 
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})

In the Root create the file auth.ts

Create a middleware.ts file also in the root

Create the route ts inside /app/api/auth/[...nextauth]/route.ts

create the folder action and then the auth.ts inside it


for PRISMA

first we have created the file docker which is 'docker-compose.yml'
after opening the docker app I can run this command docker compose up -d
then, I can install primsa by using npm install prisma typescript tsx @types/node --save-dev
then, npx prisma init
then, npm install @prisma/client @auth/prisma-adapter\nnpm install prisma --save-dev

then I had to copy the schema from the adapter in the documentation 
and finally create the migration for this schema npm exec prisma migrate dev


for docker

1. Set Up PostgreSQL in Docker
Pull the PostgreSQL Image:

docker pull postgres:latest

Run the PostgreSQL Container (database: authjs, user: rafael_massimo, password: docker, port: 54320):

docker run --name my-authjs-tutorial-db-1 -e POSTGRES_USER=rafael_massimo -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=authjs -p 54320:5432 -d postgres:latest

Check Running Containers (to verify or troubleshoot port conflicts):

docker ps -a

- Connect to the Database:

psql -h localhost -p 54320 -U rafael_massimo -d authjs

(Enter password: docker when prompted.)

List Tables (to verify schema):

\dt

Inspect a Table (e.g., User):

\d "User"

