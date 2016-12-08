export class CustomSkillResponseOutputSpeech{

    private _type: string;
    private _text: string;
    private _ssml: string;

    constructor(type: string, text: string, ssml: string) {
        this._type = type;
        this._text = text;
        this._ssml = ssml;
    }

    get type(): string {
        return this._type;
    }

    get text(): string {
        return this._text;
    }

    get ssml(): string {
        return this._ssml;
    }
    
    public toJSON(){
        return{
            type: this.type,
            text: this.text,
            ssml: this.ssml
        }
    }
}