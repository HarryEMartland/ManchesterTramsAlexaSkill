import {CustomSkillResponseOutputSpeech} from "./CustomSkillResponseOutputSpeech";
import {CustomSkillResponseCard} from "./CustomSkillResponseCard";
export class CustomSkillResponseResponse{

    private _outputSpeech: CustomSkillResponseOutputSpeech;
    private _card: CustomSkillResponseCard;

    constructor(outputSpeach: CustomSkillResponseOutputSpeech, cart: CustomSkillResponseCard) {
        this._outputSpeech = outputSpeach;
        this._card = cart;
    }

    get outputSpeech(): CustomSkillResponseOutputSpeech {
        return this._outputSpeech;
    }

    get card(): CustomSkillResponseCard {
        return this._card;
    }
    
    public toJSON(){
        return {
            outputSpeech: this.outputSpeech,
            card: this._card
        }
    }
}