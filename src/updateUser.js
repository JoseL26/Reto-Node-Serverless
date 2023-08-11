const AWS = require('aws-sdk') ;

const updateUser = async(event) =>{

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    const {nombre, apellido, correo} = JSON.parse(event.body);

    await dynamodb.update({
        TableName: 'usersTable',
        Key: {id},
        UpdateExpression: 'set nombre = :nombre, apellido = :apellido, correo = :correo',
        ExpressionAttributeValues: {
            ":nombre": nombre,
            ":apellido": apellido,
            ':correo': correo,
        },
        ReturnValues: "ALL_NEW",
    }).promise()

    return{
        statusCode: 200,
        body: JSON.stringify({
            message: "Usuario actualizado de manera exitosa.",
        }),
    };

};

module.exports = {
    updateUser,
};