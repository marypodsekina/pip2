var lastId = "test";
//текущие значения полей
var chX;
var chY;
var chR;
//текущие значения переменных
var x;
var y;
var r;

var req;
var buttons; //кнопки изменения R
var svg; //график
var previousR = null; //переменная для хранения прошлого радиуса
var input = null;

// работа с массивом кнопок
function doAction(value, id) {
    document.getElementById(id).style.backgroundColor = "crimson";
    document.getElementById(this.lastId).style.backgroundColor = "";
    lastId = id;
    var valueOfButton = value;
    document.getElementById("changeR").value = valueOfButton;
}

// проверка значения на число
function isNumber(n) {
    if ((/^[-]?[0-9]+[.,][0-9]+$/.test(n)) || (/^[-]?[0-9]+$/.test(n))) {
        return true;
    } else {
        return false;
    }
}

// валидация всех значений
function validX() {
    chX = $("#changeX");
    chX.css("backgroundColor", "");
    chX.attr("placeholder", "от -4 до 4");
    x = chX.val();

    if (!x) {
        chX.css("backgroundColor", "red");
        chX.attr("placeholder", "Enter something");
        return false;
    } else {
        if (!isNumber(x)) {
            chX.css("backgroundColor", "red");
            chX.attr("placeholder", "Enter NUMBER");
            chX.val("");
            return false;
        } else {
            x = x.replace(/,/g, '.');
            if ((-4 <= x) && (x <= 4)) {
                return true;
            } else {
                chX.css("backgroundColor", "red");
                chX.attr("placeholder", "Not include in the range");
                chX.val("");
                return false;
            }
        }
    }
}

function validY() {
    chY = $("#changeY");
    chY.css("backgroundColor", "");
    chY.attr("placeholder", "");
    y = chY.val();

    if (!y) {
        chY.css("backgroundColor", "red");
        chY.attr("placeholder", "Enter something");
        return false;
    } else {
        if (!isNumber(y)) {
            chY.css("backgroundColor", "red");
            chY.attr("placeholder", "Enter NUMBER");
            chY.val("");
            return false;
        } else {
            y = y.replace(/,/g, '.');
            if ((-3 <= y) && (y <= 3)) {
                return true;
            } else {
                chY.css("backgroundColor", "red");
                chY.attr("placeholder", "Not include in the range");
                chY.val("");
                return false;
            }
        }
    }
}

function validR() {
    chR = $("#changeR");
    chR.css("backgroundColor", "");
    chR.attr("placeholder", "");
    r = chR.val();

    if (!r) {
        chR.css("backgroundColor", "red");
        chR.attr("placeholder", "Enter something");
        return false;
    } else {
        if (!isNumber(r)) {
            chR.css("backgroundColor", "red");
            chR.attr("placeholder", "Enter NUMBER");
            chR.val("");
            return false;
        } else {
            r = r.replace(/,/g, '.');
            if ((1 <= r) && (r <= 3)) {
                return true;
            } else {
                chR.css("backgroundColor", "red");
                chR.attr("placeholder", "Not include in the range");
                chR.val("");
                return false;
            }
        }
    }
}

//отправка формы
function showResults() {
    var xReady = validX();
    var yReady = validY();
    var rReady = validR();
    if (xReady && yReady && rReady) {
        req = new XMLHttpRequest();
        req.open('GET', document.documentURI + '?X=' + x + '&Y=' + y + '&R=' + r, true);
        req.onload = function () {
            changePage(req.responseText, true)
        };
        req.send();
    }
}

//отправка кликнутой точки
function sendPoint() {
    req = new XMLHttpRequest();
    req.open('GET', document.documentURI + '?X=' + x + '&Y=' + y + '&R=' + r, true);
    // req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.onload = function () {
        changePage(req.responseText, true)

    };
    req.send();
}

//действия после загрузки html: лисенеры на кнопки R и на поле Y
window.onload = function () {
    $('#changeY').on('keyup', function () {
        var val = document.getElementById("changeY").value;
        if ((val != "") && (!isNumber(val))) {
            document.getElementById("changeY").style.backgroundColor = "red";
            document.getElementById("submit").disabled = true;
        } else {
            document.getElementById("changeY").style.backgroundColor = "";
            document.getElementById("submit").disabled = false;
        }
    });
    document.getElementById("changeR").value = "";
    document.getElementById("changeY").value = "";
    document.getElementById('changeX').options[0].selected = true;

    svg = document.getElementsByTagName("svg");
    svg[0].addEventListener('click', handlerClick);
    buttons = document.getElementsByClassName('button');
    for (var j = 0; j < 5; j++) {
        buttons.item(j).addEventListener('click', changeFigures);
    }
};

//лисенер для svg графика
function handlerClick(event) {
    if (validR()) {
        x = (event.offsetX - 150) / 120 * r;
        y = -(event.offsetY - 150) / 120 * r;
        if (r != 3) {
            sendPoint();
        } else {
            if ((y >= r) || (y <= -r)) { //одз
            } else {
                sendPoint();
            }
        }
    } else {
    }
}

//изменение графика при изменении радиуса
function changeFigures(event) {
    validR();
   if(r=="3"){
        document.getElementById("odz1").setAttribute("fill","rgba(240, 115, 115, 0.3)");
        document.getElementById("odz2").setAttribute("fill","rgba(240, 115, 115, 0.3)");
   }else {document.getElementById("odz1").setAttribute("fill","none");
   document.getElementById("odz2").setAttribute("fill","none");}
    //работа с подписями
    $('#rightOnTheEdge').text(r);
    $('#topOnTheEdge').text(r);
    $('#downOnTheEdge').text("-" + r);
    $('#leftOnTheEdge').text("-" + r);
    $('#rightMiddle').text(r / 2);
    $('#topMiddle').text(r / 2);
    $('#downMiddle').text("-" + r / 2);
    $('#leftMiddle').text("-" + r / 2);
    //работа с точками
    var points = document.getElementsByTagName("circle");
    if (points.length > 1) { //если точки у нас уже есть (нарисованы)
        for (var i = 0; i < points.length; i++) {
            if (previousR != null) {
                var point = points[i];
                point.setAttribute("cx", (point.getAttribute("cx") - 150) / 120 * previousR / r * 120 + 150);
                point.setAttribute("cy", -(-(point.getAttribute("cy") - 150) / 120 * previousR / r * 120) + 150);
                var cx = (point.getAttribute("cx") - 150) / 120 * r;
                var cy = -(point.getAttribute("cy") - 150) / 120 * r;
                if (((cy >= 0) && (cx <= 0) && (cy <= r) && (cx >= -r)) || (((cx * cx + cy * cy) <= r * r) && (cx >= 0) && (cy <= 0)) || ((cx >= 0) && (cy >= 0) && (cy <= (r - cx)))) {
                    point.setAttribute("fill", "green");
                } else {
                    point.setAttribute("fill", "red");
                }
            }
        }
    } else {//если точек нет, но есть таблица с их координатами (после перезагрузки странциы)
        if (document.getElementById('result-table')) {
            var table_x = $(".x");
            var table_y = $(".y");
            var table_r = $(".r");
            var svgNS = document.getElementById("group").namespaceURI;
            for (var l = 0; l < table_x.length; l++) {
                var circle = document.createElementNS(svgNS, "circle");
                circle.setAttribute("cx", (table_x[l].innerText / r * 120 + 150));
                circle.setAttribute("cy", (-table_y[l].innerText / r * 120) + 150);
                circle.setAttribute("r", "3");
                circle.setAttribute("fill", "black");
                cx = table_x[l].innerText;
                cy = table_y[l].innerText;
                if (((cy >= 0) && (cx <= 0) && (cy <= r) && (cx >= -r)) || (((cx * cx + cy * cy) <= r * r) && (cx >= 0) && (cy <= 0)) || ((cx >= 0) && (cy >= 0) && (cy <= (r - cx)))) {
                    circle.setAttribute("fill", "green");
                } else {
                    circle.setAttribute("fill", "red");
                }
                document.getElementById("group").appendChild(circle);
            }
        }
    }
    previousR = r;
}

//кнопка очистить
function cleanAll() {
    document.getElementById('changeX').options[0].selected = true;
    $('#changeY').val("");
    $('#changeR').val("");
    document.getElementById(this.lastId).style.backgroundColor = "";
    $('#rightOnTheEdge').text("R");
    $('#topOnTheEdge').text("R");
    $('#downOnTheEdge').text("-R");
    $('#leftOnTheEdge').text("-R");
    $('#rightMiddle').text("R/2");
    $('#topMiddle').text("R/2");
    $('#downMiddle').text("-R/2");
    $('#leftMiddle').text("-R/2");
    // var odz= document.getElementById('odz');
    // odz.setAttribute("fill","none");
    $("circle").attr("fill", "none");
}

//кнопка очистки истории
function clearHistory() {
    var req = new XMLHttpRequest();
    req.open("GET", document.documentURI + '?type=clear', false);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send();
}

//добавление новых точек в таблицу и отравка координат на отрисовку точки
function changePage(res, writable) {
    console.log(res);
    var point = JSON.parse(res);
    if (writable) {
        if (!document.getElementById("result-table")) {
            var table = document.createElement("table");
            table.id = "result-table";
            var headers = document.createElement("tr");
            headers.id = "table-headers";
            headers.innerHTML = "<th>X</th><th>Y</th><th>R</th><th>Result</th><th>Time of request</th>";
            var header = document.createElement("h1");
            header.innerText = "History";
            var button = document.createElement("div");
            button.innerHTML = "<button type='button' onclick=\"clearHistory(); location.reload();\" id=\"history-button\" class=\"button history-button\">Clean history</button><br>";
            var result = document.getElementsByClassName("results")[0];
            result.appendChild(header);
            result.appendChild(button);
            result.appendChild(table);
            table.appendChild(headers);
        }
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td>" + point['isInArea'] + "</td><td>" + point['time'] + "</td>";
        document.getElementById("result-table").appendChild(row);
        draw(point);
    }
}

//отрисовка самой точки
function draw(point) {
    var svgNS = document.getElementById("group").namespaceURI;
    var circles = document.createElementNS(svgNS, "circle");
    circles.setAttribute("cx", point['x'] / point['r'] * 120 + 150);
    circles.setAttribute("cy", -point['y'] / point['r'] * 120 + 150);
    circles.setAttribute("r", "3");
    if (point['isInArea'] == "Yes") {
        circles.setAttribute("fill", "green");
    } else {
        circles.setAttribute("fill", "red");
    }
    document.getElementById("group").appendChild(circles);
}


//TODO: одз