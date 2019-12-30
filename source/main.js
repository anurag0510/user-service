const express = require('express');
const app = express();

const userRouters = require('./apis/v1/users/user-router');

app.use(express.json());
app.use('/v1/users', userRouters);

app.get('*', (request, response) => {
    response.status(404).json({ message: `No such route '${request.url}' to respond.` });
});

app.listen(3000, () => {
    console.log('Listening to port 3000')
});