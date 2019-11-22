var lastId="test";
// работа с массивом кнопок
function doAction(value, id){
    document.getElementById(id).style.backgroundColor="crimson";
    document.getElementById(this.lastId).style.backgroundColor="";
    lastId=id;
    var valueOfButton=value;
    document.getElementById("changeR").value = valueOfButton;
}
// проверка значения на число
function isNumber(n) {
    if((/^[-]?[0-9]+[.,][0-9]+$/.test(n))||(/^[-]?[0-9]+$/.test(n))){
        return true;
    }else {
        return false;
    }
}
// валидация всех значений
var chX;
var x;
function validX(){
    chX = $("#changeX");
    chX.css("backgroundColor","");
    chX.attr("placeholder","от -4 до 4");
    x = chX.val();

    if(!x){
        chX.css("backgroundColor","red");
        chX.attr("placeholder","Enter something");
        return false;
    }else{
        if(!isNumber(x)){
            chX.css("backgroundColor","red");
            chX.attr("placeholder","Enter NUMBER");
            chX.val("");
            return false;
        }else{
            x=x.replace(/,/g, '.');
            if((-4<=x)&&(x<=4)){
                return true;
            }else{
                chX.css("backgroundColor","red");
                chX.attr("placeholder","Not include in the range");
                chX.val("");
                return false;
            }
        }
    }
}

var chY;
var y;
function validY() {
    chY = $("#changeY");
    chY.css("backgroundColor","");
    chY.attr("placeholder","");
    y = chY.val();

    if(!y){
        chY.css("backgroundColor","red");
        chY.attr("placeholder","Enter something");
        return false;
    }else{
        if(!isNumber(y)){
            chY.css("backgroundColor","red");
            chY.attr("placeholder","Enter NUMBER");
            chY.val("");
            return false;
        }else{
            y=y.replace(/,/g, '.');
            if((-3<=y)&&(y<=3)){
                return true;
            }else{
                chY.css("backgroundColor","red");
                chY.attr("placeholder","Not include in the range");
                chY.val("");
                return false;
            }
        }
    }
}

var chR;
var r;
function validR() {
    chR = $("#changeR");
    chR.css("backgroundColor","");
    chR.attr("placeholder","");
    r = chR.val();

    if(!r){
        chR.css("backgroundColor","red");
        chR.attr("placeholder","Enter something");
        return false;
    }else{
        if(!isNumber(r)){
            chR.css("backgroundColor","red");
            chR.attr("placeholder","Enter NUMBER");
            chR.val("");
            return false;
        }else{
            r=r.replace(/,/g, '.');
            if((1<=r)&&(r<=3)){
                return true;
            }else{
                chR.css("backgroundColor","red");
                chR.attr("placeholder","Not include in the range");
                chR.val("");
                return false;
            }
        }
    }
}


var URL="Handling.php";


var req;
function processReqChange() {
    try{
        if(req.readyState==4){
            if(req.status==200){
                // $('#results').html(req.responseText);
                // var cx=String(120/r*x+150);
                // var cy=String(-(120/r*y)+150);
                // var point = $('#point');
                // point.attr("cx",cx);
                // point.attr("cy",cy);
                // point.show();
            }else{
                alert("Не удалось получить данные: "+
                    req.statusText);
            }
        }
    }catch(e){
        alert("Ошибка: "+e.description);
    }
}

function showResults(){
    // $('#new').hide();
    // $('#point').hide();
    var xReady=validX();
    var yReady=validY();
    var rReady=validR();
    if(xReady&yReady&rReady){
        // alert("i am here");
        req = new XMLHttpRequest();
        req.open('GET', document.documentURI+'?X='+x+'&Y='+y+'&R='+r, true);
        // req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // req.onreadystatechange=processReqChange;
        req.onload = function(){changePage(req.responseText, true)};
        req.send();
    }
}
function sendPoint(){
    req = new XMLHttpRequest();
    req.open('GET', document.documentURI+'?X='+x+'&Y='+y+'&R='+r, true);
    // req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.onload = function(){changePage(req.responseText, true)};
    // req.onreadystatechange=processReqChange;
    req.send();
}
var buttons;
var svg;
window.onload=function() {
    svg = document.getElementsByTagName("svg");
    svg[0].addEventListener('click', handlerClick);
    buttons = document.getElementsByClassName('button');
    for (var j = 0; j < 5; j++) {
        buttons.item(j).addEventListener('click', changeFigures);
    }
    if(document.getElementById('result-table')){
        var table_x = document.getElementsByClassName('x');
        var table_y = document.getElementsByClassName('y');
        var table_r = document.getElementsByClassName('r');
        var svgNS=svg[0].namespaceURI;
        for (var i=1; i<=table_x.length; i++){
            var circles = document.createElementNS(svgNS,"circle");

            circles.setAttribute("cx","150");
            //(table_x[i].innerHTML-150)/120*table_r[i].innerHTML/r*120+150
            alert('hi');
            //
            circles.setAttribute("cy","150");
            //-(-(table_y[i].innerHTML-150)/120*table_r[i].innerHTML/r*120)+150)
            circles.setAttribute("r","3");
            circles.setAttribute("fill","black");
        }
    }
};

function handlerClick(event){
    if(validR()) {
        x = (event.offsetX - 150)/120*r;
        y = -(event.offsetY - 150)/120*r;
        if(r!=3){
        sendPoint();}
        else{
            if ((y>=r)||(y<=-r)){
            }else{sendPoint();}
        }
    }else{}
}
var previousR=null;
var odz= document.getElementById('odz');
function changeFigures(event){
    validR();
    $('#rightOnTheEdge').text(r);
    $('#topOnTheEdge').text(r);
    $('#downOnTheEdge').text("-"+r);
    $('#leftOnTheEdge').text("-"+r);
    $('#rightMiddle').text(r/2);
    $('#topMiddle').text(r/2);
    $('#downMiddle').text("-"+r/2);
    $('#leftMiddle').text("-"+r/2);
    var odz= document.getElementById('odz');
    odz.setAttribute("fill","none");
    if(r!="3"){
        odz.setAttribute("x","0");
        odz.setAttribute("y","0");
        odz.setAttribute("width","300");
        odz.setAttribute("height","300");
        odz.setAttribute("fill","#AFEEEE");
    }else{
        odz.setAttribute("x","0");
        odz.setAttribute("y","30");
        odz.setAttribute("width","300");
        odz.setAttribute("height","240");
        odz.setAttribute("fill","#AFEEEE");
    }
    var points = document.getElementsByTagName("circle");
    for (var i=0; i<points.length;i++){
        if(previousR!=null){
        var point = points[i];
        point.setAttribute("cx",(point.getAttribute("cx")-150)/120*previousR/r*120+150);
        point.setAttribute("cy",-(-(point.getAttribute("cy")-150)/120*previousR/r*120)+150);
        var cx = (point.getAttribute("cx")-150)/120*r;
        var cy = -(point.getAttribute("cy")-150)/120*r;
        if(((cy>=0)&&(cx<=0)&&(cy<=r)&&(cx>=-r))||(((cx*cx+cy*cy)<=r*r)&&(cx>=0)&&(cy<=0))||((cx>=0)&&(cy>=0)&&(cy<=(r-cx)))){
            point.setAttribute("fill","green");
        }else{
            point.setAttribute("fill","red");
        }
        }
    }
    previousR = r;
}
function cleanAll() {
    document.getElementById('changeX').options[0].selected=true;
    $('#changeY').val("");
    $('#changeR').val("");
    document.getElementById(this.lastId).style.backgroundColor="";
    $('#rightOnTheEdge').text("R");
    $('#topOnTheEdge').text("R");
    $('#downOnTheEdge').text("-R");
    $('#leftOnTheEdge').text("-R");
    $('#rightMiddle').text("R/2");
    $('#topMiddle').text("R/2");
    $('#downMiddle').text("-R/2");
    $('#leftMiddle').text("-R/2");
    var odz= document.getElementById('odz');
    odz.setAttribute("fill","none");
    $("circle").attr("fill","none");
}
function clearHistory() {
    var req = new XMLHttpRequest();
    req.open("GET", document.documentURI+'?type=clear', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send();
}
function changePage(res, writable) {
    var point = JSON.parse(res);
    // drawPoint(point.x, point.y, point.inArea);
    if(writable) {
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
            document.getElementsByClassName("results")[0].append(header);
            document.getElementsByClassName("results")[0].append(button);
            document.getElementsByClassName("results")[0].append(table);
            table.append(headers);

        }
        var row = document.createElement("tr");
        row.innerHTML = "<td>"+x+"</td><td>"+y+"</td><td>"+r+"</td><td>"+point['isInArea']+"</td><td>"+point['time']+"</td>";
        document.getElementById("table-headers").after(row);
        draw(point);
    }
}
function draw(point) {
    var svgNS=svg[0].namespaceURI;
    var circles = document.createElementNS(svgNS,"circle");
    circles.setAttribute("cx",point['x']/point['r']*120+150);
    circles.setAttribute("cy",-point['y']/point['r']*120+150);
    circles.setAttribute("r","3");
    if(point['isInArea']=="Yes"){
        circles.setAttribute("fill","green");
    }else{
        circles.setAttribute("fill","red");
    }
    svg[0].appendChild(circles);
}