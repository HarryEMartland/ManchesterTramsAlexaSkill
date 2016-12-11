import {Context, Callback} from "aws-lambda";
import {TramStatusService} from "./TramStatusService";
import {TramStatus} from "./TramStatus";
import {TramStatusTranslator} from "./TramStatusTranslator";
import {CustomSkillResponseTranslator} from "./CustomSkillResponseTranslater";
import getTramStatuses = TramStatusService.getTramStatuses;
import {ApplicationIdVerifierService} from "./ApplicationIdVerifierService";

export function handler(event: Request, context: Context, callback: Callback) {

    ApplicationIdVerifierService.verify(event);

    TramStatusService.getTramStatuses(function (tramStatuses: Array<TramStatus>) {
        let response = TramStatusTranslator.translate(tramStatuses);
        let customSkillResponse = CustomSkillResponseTranslator.translate(response);
        callback(null, customSkillResponse);
    })
}


