import {TramStatus} from "./TramStatus";

export module TramStatusTranslator {

    const ALL_OK_RESPONSE = "All services ok.";
    const ENDING = "That's all from Man Met.";

    function goodService(tramStatus: TramStatus): boolean {
        return (tramStatus.station == "Other lines" && tramStatus.status == "success") ||
         (tramStatus.station == "All lines" && tramStatus.status == "success") ;
    }

    function createStatusResponse(tramStatus: TramStatus): string {
        return tramStatus.station + ". " + tramStatus.information;
    }

    export function translate(tramStatuses: Array<TramStatus>): string {

        var response = "";

        if (tramStatuses.length == 0 || (tramStatuses.length == 1 && goodService(tramStatuses[0]))) {
            return ALL_OK_RESPONSE;
        }

        for (let tramStatus of tramStatuses) {
            if (!goodService(tramStatus)) {
                if(response != ""){
                    response = response;
                }
                response = response + createStatusResponse(tramStatus);
            }
        }

        return response + ENDING;
    }

}