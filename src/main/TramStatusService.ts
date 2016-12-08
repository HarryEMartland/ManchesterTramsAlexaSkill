import {TramStatus} from "./TramStatus";
import * as https from "https";

export module TramStatusService {

    function removeAllTags(value:string){
        return value.replace(/<[^>]*>/g , '');
    }

    function endWithPeriodAndSpace(value:string){
        return value + ". ";
    }

    function trim(value:string){
        return value.trim();
    }

    function removeTrailingPeriod(value:string){
        if(value[value.length-1] == '.'){
            return value.substring(0, value.length - 1);
        }
        return value;
    }

    function notEmpty(value:string){
        return value != "";
    }

    function removeGrovel(value:string){
        let upperCase = value.toUpperCase();
        return upperCase.indexOf("SORRY") == -1
            && upperCase.indexOf("APOLOGISE") == -1
            && upperCase.indexOf("APOLOGISES") == -1;
    }

    function processResponse(responseBody: string) {
        let response = JSON.parse(responseBody);
        let tramStatues: Array<TramStatus> = [];
        for (let entry of response.items) {

            let tramDetail = entry.detail || "";
            let tramDetailSentence = tramDetail.split("</p>")
                .filter(removeGrovel)
                .map(removeAllTags)
                .map(trim)
                .filter(notEmpty)
                .map(removeTrailingPeriod)
                .map(endWithPeriodAndSpace)
                .join("");

            tramStatues.push(new TramStatus(entry.name,
                tramDetailSentence,
                entry.severity))
        }
        return tramStatues;
    }

    export function getTramStatuses(callback: (tramStatuses: Array<TramStatus>) => any) {
        https.get({
            hostname: process.env.tram_status_host,
            port: 443,
            path: process.env.tram_status_path,
            agent: false
        }, (res) => {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                callback(processResponse(body))
            });
        });
    }


}