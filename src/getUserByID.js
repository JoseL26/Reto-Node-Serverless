const AWS = require('aws-sdk')

const getUserByID = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters; //capturamos el dato que se encuentra en la URL, despues del path "Users"

    const result = await dynamodb.get({
        TableName: 'usersTable',
        Key:{
            id,
        },
    }).promise()

    const user = result.Item;

    return{
        statusCode: 200,
        body: JSON.stringify(user),
    };

};

module.exports = {
    getUserByID,
};