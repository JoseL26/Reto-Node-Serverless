const {v4} = require('uuid')
const AWS = require('aws-sdk')

const addUser = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {nombre, apellido, correo} = JSON.parse(event.body)
    const id = v4()

    const newUser = {
        id,
        nombre,
        apellido,
        correo
    }

    await dynamodb.put({
        TableName: 'usersTable',
        Item: newUser
    }).promise()

    return{
        statusCode: 200,
        body: JSON.stringify(newUser)
    };

};

module.exports = {
    addUser,
};