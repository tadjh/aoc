"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.readFile("input.txt", function (err, res) {
    var input = res.toString();
    var arr = input.split("\r\n");
    var output = 0;
    var current = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "" || i === arr.length - 1) {
            output = Math.max(current, output);
            current = 0;
            continue;
        }
        current += parseInt(arr[i]);
    }
    console.log(output);
});
