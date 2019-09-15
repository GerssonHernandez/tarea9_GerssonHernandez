const server = require('server');
const {get, socket } = server.router;
const { file } = server.reply;
const chat = require('./chat');

server([

    get('/', file('./public/index.html')),

    socket('login', chat.login),
    socket('message', chat.message),
    socket('logout', chat.logout),
    socket('disconnect', chat.logout),

    get('*', ctx => 404)
]);