var qs = require("querystring");

function index(request, response) {
    if (request.method == "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<h1> Sistemas </h1>");
        response.write("<li><a href='aleatorios.html'>Aleatórios</a></li><br/>");
        response.write("<li><a href='primos.html'>Primos</a></li><br/>");
        response.write("<li><a href='equacao.html'>Equação</a></li><br/>");
        response.write("<li><a href='xadrez.html'>Xadrez</a></li><br/>");
        response.write("<li><a href='xadrez.json'>Xadrez JSON</a></li><br/>");
        response.write("<li><a href='sobre.html'>Sobre</a></li>");
        response.end();
    }
}

function sobre(request, response) {
    if (request.method == "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<h3> Sobre </h3>");
        response.write("<a href='index.html'>Voltar</a> \n");
        response.end();
    }
}


exports.index = index;
exports.sobre = sobre;

