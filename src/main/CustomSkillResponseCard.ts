export class CustomSkillResponseCard{
    private _type: string;
    private _title: string;
    private _content: string;
    private _text: string;

    constructor(type: string, title: string, content: string, text: string) {
        this._type = type;
        this._title = title;
        this._content = content;
        this._text = text;
    }

    get type(): string {
        return this._type;
    }

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get text(): string {
        return this._text;
    }

    public toJSON(){
        return {
            type:this.type,
            title: this.title,
            content: this.content,
            text: this.text
        }
    }
}