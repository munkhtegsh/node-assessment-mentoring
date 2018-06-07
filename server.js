const express = require('express');
const bodyParser = require('body-parser');
const cr = require('./usersCtrl');

const app = express();
app.use(bodyParser.json());

app.get('/api/users', cr._getUsers);
app.get('/api/users/:userId', cr._getUserById);
app.get('/api/admins', cr._getAdmins);
app.get('/api/nonadmins', cr._getNonAdmins);
app.get('/api/user_type/:userType', cr._getUserType);
app.put('/api/users/:userId', cr._changeUser);
app.post('/api/users', cr._addUser);
app.delete('/api/users/:userId', cr._deleteUser);


const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));