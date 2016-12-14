import * as fs from "fs";
import * as ManMetHandler from "../main/ManMetHandler";
import * as sinon from "sinon";
import "mocha";
import * as assert from "assert";
import {HttpClient} from "../main/HttpClient";

let files = fs.readdirSync("./src/test/resources");

process.env.response_ending = "That's all from the trams.";
process.env.alexa_skill_application_id = "5739j3k4j332";

let request = {
    session: {application: {applicationId: "5739j3k4j332"}}
} as Request;

describe("End To End Tests", function () {
    files.forEach(function (file) {
        it("should match with file " + file, function (done) {
            let testJson = require("./resources/" + file);

            mockHttpClient(testJson.mockResponse);

            ManMetHandler.handler(request, null, function (error: any, result: any) {
                let actual = JSON.stringify(result);
                let expected = JSON.stringify(testJson.expectedResponse);
                assert.equal(actual, expected);
                done();
            });
        })
    });

    afterEach(function () {
        sinon.restore(HttpClient);
    })
});

function mockHttpClient(mockResponse: any) {
    sinon.stub(HttpClient, "get", function (): Promise<string> {
        return Promise.resolve(JSON.stringify(mockResponse))
    });
}