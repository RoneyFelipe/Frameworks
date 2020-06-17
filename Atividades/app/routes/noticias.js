module.exports = function(app) {

    app.get('/noticias', function(req, res) {

        var connection = app.config.dbConnection();

        var noticiasModel = new app.app.models.NoticiasDAO(connection);
        noticiasModel.getNoticias(function(error, result) {
            res.render('noticias/noticias', { noticias: result });
        });
    });


    app.get('/noticia', function(req, res) {

        var connection = app.config.dbConnection();
        // Recebemos o app como parâmetro, então recuperamos o módulo dentro do app, diminuindo a necessidade de requires nos
        //projetos.

        var noticiasModel = new app.app.models.NoticiasDAO(connection);
        //app.app significa: O primeiro é a aplicação, o segundo é a pasta app.

        //Select (Regra) foi para o arquivo de model

        noticiasModel.getNoticia(function(error, result) {
            res.render('noticias/noticia', { noticia: result });
        });
    });
}