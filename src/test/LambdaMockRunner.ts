import * as ManMetHandler from "../main/ManMetHandler";

process.env.tram_status_url = "https://beta.tfgm.com/api/statuses/tram";
process.env.alexa_skill_application_id ="5739j3k4j332";
process.env.tram_status_cache = 300;

let request = {
    session:{application:{applicationId:"5739j3k4j332"}}
} as Request;

ManMetHandler.handler(request, null, function (error:any, result:any) {
    console.log(JSON.stringify(result));
});