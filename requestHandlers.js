var qs = require("querystring")

function index(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h1> Sistemas </h1>")
    response.write("<ul><li><a href='aleatorios.html'>Aleatórios</a></li><br/>")
    response.write("<li><a href='primos.html'>Primos</a></li><br/>")
    response.write("<li><a href='equacao.html'>Equação</a></li><br/>")
    response.write("<li><a href='xadrez.html'>Xadrez</a></li><br/>")
    response.write("<li><a href='xadrez.json'>Xadrez JSON</a></li><br/>")
    response.write("<li><a href='sobre.html'>Sobre</a></li></ul>")
    response.end()
}

function sobre(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h2> Sobre </h2>")
    response.write("<label> Nome: Douglas Baumgratz de Carvalho </label><br/>")
    response.write("<label> Número de Matrícula: 201276007 </label><br/>")
    response.write("<label> Curso: Sistemas de Informação </label><br/>")
    response.write("<a href='index.html'>Voltar</a> \n")
    response.end()
}

function aleatorios(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h2> Aleatórios </h2>")

    let pares = []
    let impares = []
    for (let i = 0; i < 100; i++) {
        let numero = Math.floor(Math.random() * 1000)
        if (numero % 2 == 0) {
            pares[i] = numero
        } else {
            impares[i] = numero
        }
    }

    response.write("Pares: ")
    for (i = 0; i < pares.length; i++) {
        if (pares[i] != undefined) response.write(" " + pares[i] + " ")
    }

    response.write("<br/>Ímpares: ")
    for (i = 0; i < impares.length; i++) {
        if (impares[i] != undefined) response.write(" " + impares[i] + " ")
    }

    response.write("<br/><a href='index.html'>Voltar</a> \n")
    response.end()
}

function ehPrimo(numero) {
    if (numero != 1) {
        for (let i = 2; i < numero; i++) {
            if (numero % i == 0) return false
        }
        return true
    }
    return false
}

function primos(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h2> Primos </h2>")
    response.write("<label>Insira os parâmetros pela URL</label><br/>")
    let url = require('url')
    let dados = url.parse(request.url, true).query
    let numero1 = dados.numero1
    let numero2 = dados.numero2

    if (numero1 < numero2 && numero2 < 100) {
        response.write("Intervalo de primos: ")
        while (numero1 <= numero2) {
            if (ehPrimo(numero1)) {
                response.write(" " + numero1 + " ")
            }
            numero1++
        }
    } else response.write("Ausentes ou Inválidos")

    response.write("<br/><a href='index.html'>Voltar</a> \n")
    response.end()
}

function equacao(request, response) {
    if (request.method == "GET") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        response.write("<h2> Equação </h2>")
        response.write("<form method=post>")
        response.write("<label>Digite valor de A: </label><input type=text name=a><br/>")
        response.write("<label>Digite valor de B: </label><input type=text name=b><br/>")
        response.write("<label>Digite valor de C: </label><input type=text name=c><br/>")
        response.write("<input type=submit />")
        response.write("</form>")
        response.write("<a href='index.html'>Voltar</a> \n")
        response.end()
    } else {
        body = ''
        request.on('data', function (data) { body += data })
        request.on('end', function () {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
            let dados = qs.parse(body)
            let a = parseFloat(dados.a)
            let b = parseFloat(dados.b)
            let c = parseFloat(dados.c)
            let delta = (b * b) - (4 * a * c)

            if (delta >= 0) {
                let raizDelta = Math.sqrt(delta)
                let x1 = (-b + raizDelta) / 2 * a
                let x2 = (-b - raizDelta) / 2 * a
                response.write("<label>" + "Valor x¹ = " + x1.toFixed(2) + "</label><br/>")
                response.write("<label>" + "Valor x² = " + x2.toFixed(2) + "</label>")
            } else response.write("Ausentes ou Inválidos")
            response.end()
        })
    }
}

function xadrez(request, response) {
    if (request.method == "GET") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        response.write("<h2> Xadrez </h2>")

        response.write("<a href='index.html'>Voltar</a> \n")
        response.end()
    }
}

exports.index = index
exports.sobre = sobre
exports.aleatorios = aleatorios
exports.primos = primos
exports.equacao = equacao
exports.xadrez = xadrez

