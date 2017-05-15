module.exports = function (app) {

    app.get('/pagamentos', function (req, res) {
        console.log('entrou na pagina de teste');
        res.send("ok");
    });



    app.post('/pagamentos/pagamento', function (req, res) {

        req.assert('forma_de_pagamento',
            "Forma de pagamento eh obrigatorio").notEmpty();
        req.assert('valor',
            "Valor eh obrigatorio e deve ser um decimal")
            .notEmpty().isFloat();
        
        console.log(req.assert);
        var erros = req.validationErrors();

        if (erros) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(erros);
            return;
        }

        var pagamento = req.body;
        console.log("processando uma nova requisição de pagamento");

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);


        pagamentoDAO.salva(pagamento, function (erro, resultado) {
            if (erro) {
                console.log('erro ao inserrir no banco');
                res.status(400).send(erro)
            } else {
                res.json(pagamento);
                console.log('pagamento criado');
            }
        });
    });
}
