var app = require('./config/custom-express')();

app.listen(4000, function () {
    console.log("servidor rodando na porta 4000");
});


