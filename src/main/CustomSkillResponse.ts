import {CustomSkillResponseResponse} from "./CustomSkillResponseResponse";

export class CustomSkillResponse{

    private _version: "1.0";
    private _sessionAttributes : any;
    private _response: CustomSkillResponseResponse;

    constructor(sessionAttributes: any, response: any) {
        this._sessionAttributes = sessionAttributes;
        this._response = response;
    }

    get version() {
        return this._version;
    }

    get sessionAttributes(): any {
        return this._sessionAttributes;
    }

    get response(): CustomSkillResponseResponse {
        return this._response;
    }

    public toJSON(){
        return {
            version: this.version,
            sessionAttributes: this.sessionAttributes,
            response: this.response
        }
    }
}