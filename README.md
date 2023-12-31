<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework, Node, HTTP API, Dynamo y AWS

Este proyecto muestra como realizar un simple CRUD utilizando Node.js y desplegarlo en AWS utilizando Serverless Framework.

A lo largo de este documento se va a mostrar las tecnologias que se ha utilizado para la realización del proyecto, como dependencias, libreías y base de datos.


## Node.js

Primero se debe instalar Node.js. Para eso, se puede instalar desde su plataforma 

```
https://nodejs.org/es/download
```

## CLI AWS

Este proyecto ha sido realizado en Windows 10, asi que para obtener la AWS CLI se ha descargado el instalador desde la web oficial de Amazon:

```
https://aws.amazon.com/es/cli/
```
Una vez descargado, se procede a configurar las clases de acceso, el cual se obtiene desde la plataforma de Amazon, en el panel de IAM, para ser más especifico. Abrimos la consola de comandos y escribimos el comando:
```
aws configure 
```
y procedemos a ingresar las claves de acceso. Esto lo realizamos para poder utilizar los servicios de AWS.

## Serverless Framework

Ahora se debe instalar el framework Serverless. Para esto se abre la consola de comandos y se ejecuta la siguiente linea de comando: 
```
npm install -g serverless
```
Una vez instalado se procede a crear un nuevo proyecto serverless ejecutando serverless se mostraran varias opciones, para este proyecto se utilizó AWS - Node.js - HTTP API , y para finalizar se coloca el nombre del proyecto.

Una vez creado, se abre el proyecto con el IDE que más les guste utilizar. Los archivos principales que se muestran al crear el proyecto son index.js, aquí se puede visualizar una funcion llamado handler; el otro archivo es el serverless.yml, en este archivo se puede realizar la configuracion de la nube donde va a ser subido y las funciones que sirven como un enrutador.

Antes de desplegar el proyecto se debe indicar la region donde se va a subir, por ejemplo region:sa-east-1
y quedaría así:
```bash
provider:
  name: aws
  runtime: nodejs18.x
  region: sa-east-1
```
Nota: La región sa-east-1 se utilizó para este proyecto, puede cambiar dependiendo de la región que cada uno quiera almacenar sus datos.

Para desplegar el proyecto en la nube se ejecuta el siguiente comando: 
```
serverless deploy
```
para poder ver los mensajes por consola, y ver como está subiendo el codigo, se puede agregar --verbose
```
serverless deploy --verbose
```
Nos devolverá un endpoint y podemos acceder a él por medio de metodos GET, POST, PUT o DELETE.
```bash
	GET - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/
```

## DynamoDB

DynamoDB es un servicio de base de datos NoSQL que nos ofrece AWS para almacenar datos.

Dentro del archivo serverless.yml agregamos las siguientes lineas de comado para crear una tabla en DynamoDB

```
resources:
  Resources:
    usersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: usersTable
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

Está información se puede explicar mejor desde la documentación de serverless framework:
```
https://www.serverless.com/framework/docs/providers/aws/guide/resources
```
Agregamos permisos para que el proyecto pueda guardar datos dentro de la tabla creada en la siguiente linea:
```
provider:
  name: aws
  runtime: nodejs18.x
  region: sa-east-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:*
      Resource:
        - arn:aws:dynamodb:sa-east-1:022231376384:table/usersTable
```
con iamRoleStatements brindamos permisos al proyecto para poder escribir dentro de la tabla, y 
```
arn:aws:dynamodb:sa-east-1:022231376384:table/usersTable
```
es la tabla que se obtiene desde la interfaz de DynamoDB en AWS.

## Axios

Instalamos Axios para poder realizar solicitudes HTTP a SWAPI y poder mostrar los datos de los personajes de Star Wars.
Primero debemos instalarlo ejecutando la siguiente linea:
```
	npm install axios
```
Una vez instalado, podemos obtener los datos de SWAPI y mostrarlos, como por ejemplo:

```
const resultado = await axios.get('https://swapi.dev/api/people/');
      const peopleDatos = resultado.data;

      return {
        statusCode: 200,
        body: JSON.stringify(peopleDatos),
      };
```

## SWAPI

Es una API publica, brinda datos relacionados con el universo de Star Wars. Se puede realizar solicitudes GET para poder practicar el consumo de API's. Se puede obtener más información desde la documentación
```
https://swapi.py4e.com/documentation
```

## ENDPOINTS
Los siguientes endpoints se pueden consumir para crear, mostrar todos los datos, mostrar datos en base a un ID, actualizar y eliminar.
Se recomienda realizar primero el ingreso de un usuario con los siguientes valores:
```
{
    "nombre": "Nuevo Usuario",
    "apellido": "Apellidos a ingresar",
    "correo": "Nuevo correo"
}
```
Una vez ingresado los campos, devolverá el usuario con su Id, con el Id podemos reemplazar en el parametro "{id}" y realizar las solicitudes.

```
  POST - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/addUser
  GET - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/Users
  GET - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/Users/{id}
  PUT - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/Users/{id}
  DELETE - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/Users/{id}
```
Y los siguientes endpoints se muesta el consumo de SWAPI, se visualiza todos los datos y también datos según el ID (desde el 1 hasta el 82), para este último se muestran los atributos en español.
```  
  GET - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/people
  GET - https://t4wrtanfjf.execute-api.sa-east-1.amazonaws.com/people/{id}
```

Se recomienda utilizar Postman o Insomnia para poder realizar las pruebas de endpoints.

Se puede descargar Postman desde la siguiente dirección:
```
https://www.postman.com/downloads/
```
Se puede descargar Insomnia desde la siguiente dirección:
```
https://insomnia.rest/download
```
