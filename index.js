const config = require('./config');
const { Client } = require('pg');

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

exports.handler = async (event, context) => {
    const client = new Client({
        connectionString: connectionString,
    });
    await client.connect();

    try {
        // Get the ccurrent timestamp to store creation date in database
        const currentISODate = new Date(Date.now()).toISOString();

        // Get the sub (uuid) of the new Cognito user
        if (!event.request.userAttributes.sub) {
            // No UUID available, stop execution
            throw 'No UUID available';
        }
        const sub = event.request.userAttributes.sub;

        await client.query(`INSERT INTO cognito_user (sub, created_at) VALUES ('${sub}', '${currentISODate}')`);
    } catch (error) {
        console.log(error);
    }

    client.end();
    context.done(null, event);
};