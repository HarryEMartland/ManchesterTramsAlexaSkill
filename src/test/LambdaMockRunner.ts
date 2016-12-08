import * as ManMetHandler from "../main/ManMetHandler";

process.env.tram_status_host = "beta.tfgm.com";
process.env.tram_status_path = "/api/statuses/tram";

ManMetHandler.handler(null, null, function (error, result) {
    console.log(JSON.stringify(result));
});