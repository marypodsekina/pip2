<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<%@ page import="point.PointBean" %>
<%--
  Created by IntelliJ IDEA.
  User: pods_
  Date: 30.10.2019
  Time: 22:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="history" class="bean.UserHistory" scope="application"/>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=960px, initial-scale=1.0">
    <title>Pip2</title>
    <%--<link href="styles.css" rel="stylesheet">--%>
    <style>
        <%@include file='styles.css' %>
    </style>
</head>
<body background="${pageContext.request.contextPath}/pages/5.jpg">
<script src="http://code.jquery.com/jquery-2.2.4.js"
        type="text/javascript" charset="UTF-8"></script>
<script type="text/javascript" charset="UTF-8">
    <%@include file='functions.js' %>
</script>

<div id="header">
    <div id="mine">Подсекина Мария Викторовна <br> группа P3214</div>
    <div align="center">Вариант 214014</div>
</div>

<div id="leftBar"></div>
<div id="content">
    <div id="smth">
        <div id="changes">
            Изменение X:

            <select name="changeX" id="changeX">
                <option value="null">Не выбрано</option>
                <option value="-4">-4</option>
                <option value="-3">-3</option>
                <option value="-2">-2</option>
                <option value="-1">-1</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <br><br>
            Изменение Y:

            <input type="text" placeholder="от -3 до 3" name="changeY" id="changeY" >

            <br><br>
            Изменение R:

            <input type="text" name="valueOfButton" id="changeR" value="" readonly>

            <br><br>
            <input type="hidden" id="test">
            <input class="button" type="button" value="1" id="one" onclick="doAction(this.value, this.id)">
            <input class="button" type="button" value="1.5" id="two" onclick="doAction(this.value, this.id)">
            <input class="button" type="button" value="2" id="three" onclick="doAction(this.value, this.id)">
            <input class="button" type="button" value="2.5" id="four" onclick="doAction(this.value, this.id)">
            <input class="button" type="button" value="3" id="five" onclick="doAction(this.value, this.id)">

            <br><br>

            <input type="submit" value="Проверить" name="submit_form" onclick="showResults()" id="submit">
            <input type="button" value="Очистить" onclick="cleanAll()">
        </div>
        <div id="graf">
            <svg id="grafic" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
                <symbol id="group">
                    <rect id="odz1" height="30" width="300" x="0" y="0" fill="none"></rect>
                    <rect id="odz2" height="30" width="300" x="0" y="270" fill="none"></rect>

                    <circle id="point" r="3" fill="red" display="none"></circle>

                    <text id="topOnTheEdge" x="155" y="35">R</text>
                    <text id="topMiddle" x="155" y="95">R/2</text>

                    <text id="downOnTheEdge" x="155" y="274">-R</text>
                    <text id="downMiddle" x="155" y="214">-R/2</text>

                    <text id="rightMiddle" x="200" y="145">R/2</text>
                    <text id="rightOnTheEdge" x="265" y="145">R</text>

                    <text id="leftMiddle" x="75" y="145">-R/2</text>
                    <text id="leftOnTheEdge" x="20" y="145">-R</text>

                    <rect id="rect" height="120" width="120" x="30" y="30" fill=#0489B1 opacity="0.7" stroke="none"></rect>
                    <polygon points="150 150, 150 30, 270 150" fill=#0489B1 opacity="0.7" stroke="none"></polygon>
                    <path d="M150,150 L150,270 A120,120 1 0,0 270,150 z"></path>


                    <line x1="150" y1="0" x2="150" y2="300"></line>
                    <line x1="0" y1="150" x2="300" y2="150"></line>

                    <line x1="210" y1="147" x2="210" y2="153"></line>
                    <line x1="270" y1="147" x2="270" y2="153"></line>
                    <line x1="90" y1="147" x2="90" y2="153"></line>
                    <line x1="30" y1="147" x2="30" y2="153"></line>

                    <line x1="147" y1="210" x2="153" y2="210"></line>
                    <line x1="147" y1="270" x2="153" y2="270"></line>
                    <line x1="147" y1="90" x2="153" y2="90"></line>
                    <line x1="147" y1="30" x2="153" y2="30"></line>

                    <line x1="153" y1="3" x2="150" y2="0"></line>
                    <line x1="147" y1="3" x2="150" y2="0"></line>

                    <line x1="297" y1="147" x2="300" y2="150"></line>
                    <line x1="297" y1="153" x2="300" y2="150"></line>
                </symbol>
                <use xlink:href="#group" x="0" y="0"/>
            </svg>

        </div>

        <div class="results" id="results">
            <%if (history.getListOfPoint().size() > 0) {%>
            <h1>History</h1>
            <button type="button" onclick="clearHistory(); location.reload()" id="history-button"
                    class="button history-button">Clean history
            </button>
            <br>
            <table id="result-table">
                <tr id="table-headers">
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                    <th>Time of request</th>
                </tr>
                <%
                    List<PointBean> list = new ArrayList<PointBean>(history.getListOfPoint());
                    Collections.reverse(list);
                    for (PointBean p : list) {
                        System.out.println(p.toString());%>
                <tr>
                    <td class="x"><%=p.getX()%>
                    </td>
                    <td class="y"><%=p.getY()%>
                    </td>
                    <td class="r"><%=p.getR()%>
                    </td>
                    <td><%=p.isInArea()%>
                    </td>
                    <td><%=p.getDate()%>
                    </td>
                </tr>
                <%}%>
            </table>
            <%}%>
        </div>
    </div>
</div>
</body>
</html>
