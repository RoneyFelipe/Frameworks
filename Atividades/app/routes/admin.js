module.exports = function(app) {
    app.get('/formulario_inclusao_noticia', function(req, res) {
        res.render('admin/form_add_noticias', { validacao: {}, noticia: {} });
    });

    app.post('/noticias/salvar', function(req, res) {
        var noticia = req.body;

        req.assert('titulo', 'Título é obrigatório').notEmpty();
        req.assert('resumo', 'Resumo é obrigatório').notEmpty();
        req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
        req.assert('autor', 'Autor é obrigatório').notEmpty();
        req.assert('data_noticia', 'Data é obrigatório').notEmpty();
        req.assert('noticia', 'Notícia é obrigatório').notEmpty();

        var erros = req.validationErrors();

        console.log(erros); //Mostra a lista de erros no console no terminal

        if (erros) {
            res.render("admin/form_add_noticias", { validacao: erros, noticia: noticia }); //Retorna à pagina de inclusão de notícia
            return; //Interrompe a execução
        }

        var connection = app.config.dbConnection();

        var noticiasModel = new app.app.models.NoticiasDAO(connection);
        noticiasModel.salvarNoticia(noticia, function(error, result) {
            res.redirect('/noticias');
        });

    });
}