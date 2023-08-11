const AWS = require('aws-sdk')

const deleteUser = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    await dynamodb.delete({
        TableName: 'usersTable',
        Key: {id},
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Usuario eliminado con éxito.",
        }),
    }
}

module.exports = {
    deleteUser,
};