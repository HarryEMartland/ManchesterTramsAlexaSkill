import {CustomSkillResponse} from "./CustomSkillResponse";
import {CustomSkillResponseResponse} from "./CustomSkillResponseResponse";
import {CustomSkillResponseCard} from "./CustomSkillResponseCard";
import {CustomSkillResponseOutputSpeech} from "./CustomSkillResponseOutputSpeech";

export module CustomSkillResponseTranslator{
    export function translate(tramStatus: string): CustomSkillResponse{
        return new CustomSkillResponse(null, new CustomSkillResponseResponse(
            new CustomSkillResponseOutputSpeech("PlainText", tramStatus, null),
            new CustomSkillResponseCard("Simple", "Tram Status Update", tramStatus, null)
        ));
    }
}