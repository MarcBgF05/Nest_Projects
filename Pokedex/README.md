<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo
1. Clonar el repositorio
2. Ejecutar 
```
npm i
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a __.env.__ 

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación
```
npm run start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:3002/api/v2/seed 
```
## Stack usado
* MongoDB
* Nest
