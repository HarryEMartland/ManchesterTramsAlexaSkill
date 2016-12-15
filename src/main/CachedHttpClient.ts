import {HttpClient} from "./HttpClient";
import {TimeService} from "./TimeService";
export namespace CachedHttpClient {

    let cache = new Map<string, CacheObject>();

    function isCacheExpired(url: string, ttl: number) {
        let createdAt = cache.get(url).cratedAt;
        return TimeService.getTimeSeconds() > createdAt + ttl;
    }

    export function get(url: string, ttl: number): Promise<string> {

        if (cache.has(url) && !isCacheExpired(url, ttl)) {
            return Promise.resolve(cache.get(url).value);
        }

        return HttpClient.get(url).then(function (response: string) {
            cache.set(url, new CacheObject(response, TimeService.getTimeSeconds()));
            return Promise.resolve(response);
        });
    }

    class CacheObject {
        private _value: string;
        private _cratedAt: number;

        constructor(value: string, cratedAt: number) {
            this._value = value;
            this._cratedAt = cratedAt;
        }


        get value(): string {
            return this._value;
        }

        get cratedAt(): number {
            return this._cratedAt;
        }
    }
}