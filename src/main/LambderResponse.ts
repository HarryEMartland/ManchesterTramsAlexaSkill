export class LambderResponse{

    private body: string;
    private statusCode = 200;
    private headers = {
        "Content-Type": "application/json"
    };

    constructor(body: any) {
        this.body = JSON.stringify(body);
    }
}