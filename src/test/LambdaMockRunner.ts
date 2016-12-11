import * as ManMetHandler from "../main/ManMetHandler";

process.env.tram_status_host = "beta.tfgm.com";
process.env.tram_status_path = "/api/statuses/tram";
process.env.alexa_skill_application_id ="5739j3k4j332";

let request = {
    session:{application:{applicationId:"5739j3k4j332"}}
} as Request;

ManMetHandler.handler(request, null, function (error, result) {
    console.log(JSON.stringify(result));
});