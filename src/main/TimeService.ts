export namespace TimeService {

    export function getTimeSeconds(): number {
        return new Date().getTime() / 1000;
    }

}