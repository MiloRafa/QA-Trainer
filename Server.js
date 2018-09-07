var mysql = require("mysql");
var QS = require("querystring")
var http = require('http')
var Data1 = "";
var URL = require('url')
var fs = require('fs');

var connection = mysql.createConnection(
    {   host: 'localhost',
        user: 'root',
        password: "",
        database: 'QA'
    }
);

connection.connect(function (E) {
    console.log(E);
});

//connecting to server
var server = http.createServer(function (request, response){
    response.writeHead(200, {'content-type': 'text/html'});
    var path = URL.parse(request.url, true).pathname;

    response.write(`
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Trainers</title>
    <style>
        body {
            background: #baaeb5;
        }

        .content {
            max-width: 500px;
            margin: auto;
            background: white;
            padding: 10px;
        }
        table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    }

    tr:nth-child(even) {
    background-color: #dddddd;
    }


        input[type=button] {
            width: 100%;
            background-color: #0ea6af;
            color: white;
            padding: 7px 10px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        input[type=button]:hover {
            background-color: #6c9fa0;
        }
    </style>
</head>
<body>
<div class="content">
<h1 style="text-align:center"> QA TRAINERS </h1>
<form action = 'http://localhost:8000/trainers' method='post'>

    <table>
        <tr>
            <th>Trainer ID</th>
            <th>Trainer Name</th>
            <th> </th>
            <th> </th>

        </tr>
        `);



    connection.query("Select * from trainers", function (E, Result) {
        if (E) {
            console.log(E);
            console.log(" Something went wrong");
        }
        else {
            Result.forEach(function (record) {
                response.write(`
        
        <tr>
            <td><label name="id"> ${record.ID}</label></td>
            <td><label name="name"> ${record.Name} </label></td>
            <td><input type = "button" class="Button" name="Edit" value="Edit"></td>
            <td><input type = "button" class="Button" Value="Delete"></td>

        </tr>
        `)

                response.write(`

        
</form>

</div>
</body>
</html>
                            `)

            });
            response.end();

        }
    });

});


server.listen(8001);
