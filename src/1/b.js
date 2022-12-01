"use strict";
exports.__esModule = true;
var fs = require("fs");
fs.readFile("input.txt", function (err, res) {
    var input = res.toString();
    var arr = input.split("\r\n");
    var output = [];
    var current = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "" || i === arr.length - 1) {
            if (i === arr.length - 1) {
                current += parseInt(arr[i]);
            }
            output.push(current);
            current = 0;
            continue;
        }
        current += parseInt(arr[i]);
    }
    output.sort(function (a, b) { return b - a; });
    console.log(output[0] + output[1] + output[2]);
});
