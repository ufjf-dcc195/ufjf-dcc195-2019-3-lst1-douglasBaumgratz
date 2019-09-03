var http = require("http");
var url = require("url");

function start(route, handlers) {
    function onRequest(request, response) {
        console.log("Requisição recebida");
        route(
            url.parse(request.url).pathname,
            handlers,
            request,
            response
        );
    }
    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciado em localhost:8888");
}
exports.start = start
