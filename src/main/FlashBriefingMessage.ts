export class FlashBriefingMessage {

    private _uid: string;
    private _updateDate: string;
    private _titleText: string;
    private _mainText: string;
    
    constructor(uid: string, updateDate: string, titleText: string, mainText: string) {
        this._uid = uid;
        this._updateDate = updateDate;
        this._titleText = titleText;
        this._mainText = mainText;
    }

    get uid(): string {
        return this._uid;
    }

    get updateDate(): string {
        return this._updateDate;
    }

    get titleText(): string {
        return this._titleText;
    }

    get mainText(): string {
        return this._mainText;
    }
}