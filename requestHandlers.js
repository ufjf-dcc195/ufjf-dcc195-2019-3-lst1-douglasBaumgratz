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
    response.write("<label> Matrícula: 201276007 </label><br/>")
    response.write("<label> Curso: Sistemas de Informação </label><br/>")
    response.write("<a href='index.html'>Voltar</a> \n")
    response.end()
}

function separarAleatoriosParImpar(response) {
    let pares = []
    let impares = []
    for (let i = 0; i < 100; i++) {
        let numero = Math.floor(Math.random() * 100)
        if (numero % 2 == 0) pares[i] = numero
        else impares[i] = numero
    }

    response.write("Pares: ")
    for (i = 0; i < pares.length; i++) {
        if (pares[i] != undefined) response.write(" " + pares[i] + " ")
    }

    response.write("<br/>Ímpares: ")
    for (i = 0; i < impares.length; i++) {
        if (impares[i] != undefined) response.write(" " + impares[i] + " ")
    }
}

function aleatorios(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h2> Aleatórios </h2>")
    separarAleatoriosParImpar(response)
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

function calcularPrimos(response, numero1, numero2) {
    if (numero1 < numero2 && numero2 < 100) {
        response.write("Intervalo de primos: ")
        while (numero1 <= numero2) {
            if (ehPrimo(numero1)) {
                response.write(" " + numero1 + " ")
            }
            numero1++
        }
    } else response.write("Ausentes ou Inválidos")
}

function primos(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h2> Primos </h2>")
    response.write("<label>Insira os parâmetros pela URL</label><br/>")
    let url = require('url')
    let dados = url.parse(request.url, true).query
    let numero1 = dados.numero1
    let numero2 = dados.numero2
    calcularPrimos(response, numero1, numero2)
    response.write("<br/><a href='index.html'>Voltar</a> \n")
    response.end()
}

function formularioEquacao(response) {
    response.write("<form method=post>")
    response.write("<label>Digite valor de A: </label><input type=text name=a><br/>")
    response.write("<label>Digite valor de B: </label><input type=text name=b><br/>")
    response.write("<label>Digite valor de C: </label><input type=text name=c><br/>")
    response.write("<input type=submit />")
    response.write("</form>")
}

function calcularEquacao(response, a, b, c) {
    let delta = (b * b) - (4 * a * c)
    if (delta >= 0) {
        let raizDelta = Math.sqrt(delta)
        let x1 = (-b + raizDelta) / (2 * a)
        let x2 = (-b - raizDelta) / (2 * a)
        response.write("<label>" + "Valor x¹ = " + x1.toFixed(2) + "</label><br/>")
        response.write("<label>" + "Valor x² = " + x2.toFixed(2) + "</label>")
    } else response.write("Ausentes ou Inválidos")
}

function equacao(request, response) {
    if (request.method == "GET") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        response.write("<h2> Equação </h2>")
        formularioEquacao(response)
        response.write("<a href='index.html'>Voltar</a> \n")
        response.end()
    } else {
        let body = ''
        request.on('data', function (data) { body += data })
        request.on('end', function () {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
            let dados = qs.parse(body)
            let a = parseFloat(dados.a)
            let b = parseFloat(dados.b)
            let c = parseFloat(dados.c)
            calcularEquacao(response, a, b, c)
            response.end()
        })
    }
}

function cssTabuleiro(response) {
    response.write("<h2>Xadrez</h2>")
    response.write("<style type='text/css'>");
    response.write(" td {line-height: 70px; text-align:center; font-size: 60px; }");
    response.write(".branco {width:70px; height:70px;}");
    response.write(".preto {width:70px; height:70px; background-color: gray;}</style>");
    response.write("</style>");
}

function formularioTabuleiro(response) {
    response.write("<form method=post>")
    response.write("<br/><label>Linha: </label><input type=number name=x><br/>")
    response.write("<label>Coluna: </label><input type=number name=y><br/>")
    response.write("<input type=submit />")
    response.write("</form>")
}

function matrizSimples() {
    let matriz = [];
    for (let i = 0; i < 8; i++) {
        matriz[i] = [];
        for (let j = 0; j < 8; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz
}

function matrizTabuleiro(x, y) {
    let matriz = matrizSimples()
    matriz[x][y] = 1
    matriz[x - 2][y - 1] = 2
    matriz[x - 2][y + 1] = 2
    matriz[x - 1][y + 2] = 2
    matriz[x + 1][y + 2] = 2
    matriz[x + 2][y + 1] = 2
    matriz[x + 2][y - 1] = 2
    matriz[x - 1][y - 2] = 2
    matriz[x + 1][y - 2] = 2
    return matriz
}

function tabuleiro(tabuleiro, response) {
    response.write("<table>");
    for (let i = 0; i < tabuleiro.length; i++) {
        response.write("<tr>")
        for (let j = 0; j < tabuleiro.length; j++) {
            response.write("<td>")
            if (i % 2 == 0) {
                if (j % 2 == 0) {
                    if (tabuleiro[i][j] == 1) {
                        response.write("<div class=branco>&#9816</div>")
                    }
                    else if (tabuleiro[i][j] == 2) {
                        response.write("<div class=branco>&#9816</div>")
                    }
                    else {
                        response.write("<div class=branco></div>")
                    }
                } else {
                    if (tabuleiro[i][j] == 1) {
                        response.write("<div class=preto>&#9822</div>")
                    }
                    else if (tabuleiro[i][j] == 2) {
                        response.write("<div class=preto>&#9822</div>")
                    }
                    else {
                        response.write("<div class=preto></div>")
                    }
                }
            } else {
                if (j % 2 == 0) {
                    if (tabuleiro[i][j] == 1) {
                        response.write("<div class=preto>&#9822</div>")
                    }
                    else if (tabuleiro[i][j] == 2) {
                        response.write("<div class=preto>&#9822</div>")
                    }
                    else {
                        response.write("<div class=preto></div>")
                    }
                } else {
                    if (tabuleiro[i][j] == 1) {
                        response.write("<div class=branco>&#9816</div>")
                    }
                    else if (tabuleiro[i][j] == 2) {
                        response.write("<div class=branco>&#9816</div>")
                    }
                    else {
                        response.write("<div class=branco></div>")
                    }
                }
            }
            response.write("</td>")
        }
        response.write("</tr>")
    }
    response.write("</table>")
}

function xadrez(request, response) {
    let matriz = matrizSimples()
    if (request.method == "GET") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        cssTabuleiro(response)
        tabuleiro(matriz, response)
        formularioTabuleiro(response)
        response.write("<a href='index.html'>Voltar</a> \n")
        response.end()
    } else {
        let body = ''
        request.on('data', function (data) { body += data })
        request.on('end', function () {
            let dados = qs.parse(body)
            let x = parseFloat(dados.x)
            let y = parseFloat(dados.y)

            if (!isNaN(x) && !isNaN(y)) {
                let matriz = []
                matriz = matrizTabuleiro(x, y)
                response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                cssTabuleiro(response)
                tabuleiro(matriz, response)
                response.write("<a href='xadrez.html'>Voltar</a> \n")
                response.end()
            } else {
                response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                response.write("Dados ausentes ou inválidos \n")
                response.write("<a href='xadrez.html'>Voltar</a> \n")
                response.end()
            }
        })
    }
}

function xadrezJson(request, response) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write("<h2>Xadrez JSON</h2>")
    response.write("<a href='index.html'>Voltar</a> \n")
    response.end()
}

exports.index = index
exports.sobre = sobre
exports.aleatorios = aleatorios
exports.primos = primos
exports.equacao = equacao
exports.xadrez = xadrez
exports.xadrezJson = xadrezJson

