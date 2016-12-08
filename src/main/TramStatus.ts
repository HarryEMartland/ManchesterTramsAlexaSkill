export class TramStatus{

    private _station:string;
    private _information:string;
    private _status:string;

    constructor(station: string, information: string, status:string) {
        this._station = station;
        this._information = information;
        this._status = status;
    }

    get station(): string {
        return this._station;
    }

    get information(): string {
        return this._information;
    }

    get status(): string {
        return this._status;
    }
}