# Sistema de la colección de registros en video del LAIS

Proyecto para registrar, organizar y mostrar la información de los registros audiovisuales de la colección de registros en video del Laboratorio Audiovisual de Investigación Social (LAIS).

El modelo de sistema presentado puede servir para otras personas o instancias que desean replicar un modelo similar para este tipo de registros.

## Dependencias

- [NodeJS](https://nodejs.org) (version LTS)
- [MongoDB](https://www.mongodb.org/) (Community Server)

## Archivo de configuración

Se debe crear un archivo de configuración `.env` [(dotenv)](https://www.npmjs.com/package/dotenv) para almacenar los datos importantes del proyecto:

```sh
MY_PORT=8081

MY_HOST=localhost
MY_DB_HOST=mongodb://localhost:27017
MY_TOKEN=mi-token-secreto

MY_DB_NAME_DEV=lais-video-dev
MY_DB_NAME_PROD=lais-video
```

## Instrucciones para desarrollo

Instalar dependencias:

```sh
npm install
```

Ejecutar entorno de desarrollo

```sh
npm run dev
```

La versión de desarrollo estará ejecutandose en: http://localhost:8080/

## Instrucciones para compilar proyecto

Instalar dependencias:

```sh
npm install
```

Compilar el proyecto:

```sh
npm run build
```

Al concluir, el directorio `/dist` contendrá la versión compilada y lista para ingresar en servidor web (Apache, Nginx)

## Licencia

Este proyecto es software libre: puede ser redistribuido y/o modificado bajo los términos de **GNU General Public License v3.0** siempre y cuando se mantenga la misma licencia.
