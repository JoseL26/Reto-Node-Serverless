const AWS = require('aws-sdk')

const getUser = async(event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
        TableName: 'usersTable',
    }).promise()

    const users = result.Items;

    return{
        statusCode: 200,
        body: JSON.stringify(users)
    };

};

module.exports = {
    getUser,
};