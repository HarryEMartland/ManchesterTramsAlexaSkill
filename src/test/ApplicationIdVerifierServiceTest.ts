import {ApplicationIdVerifierService} from "../main/ApplicationIdVerifierService";
import * as assert from "assert";

describe("ApplicationIdVerifierService", function () {

    it("Should throw exception when invalid id is passed", function () {
        process.env.alexa_skill_application_id = "5739j3k4j332";

        let request = {
            session: {application: {applicationId: "lmlmlrewlrew"}}
        } as Request;

        assert.throws(function () {
            ApplicationIdVerifierService.verify(request)
        });
    });

    it("Should not throw exception when correct id is passed", function () {

        process.env.alexa_skill_application_id = "5739j3k4j332";

        let request = {
            session: {application: {applicationId: "5739j3k4j332"}}
        } as Request;

        ApplicationIdVerifierService.verify(request)
    })

});