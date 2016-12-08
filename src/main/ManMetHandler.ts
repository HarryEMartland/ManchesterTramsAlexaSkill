import {Context, Callback} from "aws-lambda";
import {TramStatusService} from "./TramStatusService";
import {TramStatus} from "./TramStatus";
import {TramStatusTranslator} from "./TramStatusTranslator";
import {CustomSkillResponseTranslator} from "./CustomSkillResponseTranslater";
import {LambderResponse} from "./LambderResponse";
import getTramStatuses = TramStatusService.getTramStatuses;

export function handler(event: any, context: Context, callback: Callback) {
    TramStatusService.getTramStatuses(function (tramStatuses: Array<TramStatus>) {
        let response = TramStatusTranslator.translate(tramStatuses);
        let customSkillResponse = CustomSkillResponseTranslator.translate(response);
        callback(null, customSkillResponse);
    })
}


