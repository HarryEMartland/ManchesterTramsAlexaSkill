import * as fs from "fs";
import * as https from "https";
import * as ManMetHandler from "../main/ManMetHandler";
import "mocha";
import * as assert from "assert";

let files = fs.readdirSync("./src/test/resources");

process.env.response_ending = "That's all from the trams.";
process.env.alexa_skill_application_id ="5739j3k4j332";

let request = {
    session:{application:{applicationId:"5739j3k4j332"}}
} as Request;

describe("End To End Tests", function () {
    files.forEach(function (file) {
        it("should match with file " + file, function (done) {
            let testJson = require("./resources/" + file);

            mockHttp(testJson.mockResponse);

            ManMetHandler.handler(request, null, function (error, result) {
                let actual = JSON.stringify(result);
                let expected = JSON.stringify(testJson.expectedResponse);
                assert.equal(actual, expected);
                done();
            });
        })
    })
});


function mockHttp(mockResponse: any) {
    https.get = function (options: any, callback: (any: any) => any) {
        let result = {
            on: function (type: string, callback: (data: string)=>any) {
                if (type == "data") {
                    callback(JSON.stringify(mockResponse))
                }
                if (type == "end") {
                    callback(null)
                }
            }
        };
        callback(result)
    };
}