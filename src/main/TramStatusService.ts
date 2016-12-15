import {TramStatus} from "./TramStatus";
import {CachedHttpClient} from "./CachedHttpClient";

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
        CachedHttpClient.get(process.env.tram_status_url, process.env.tram_status_cache).then(function (response) {
            callback(processResponse(response));
        });
    }


}