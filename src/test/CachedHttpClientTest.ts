import * as sinon from "sinon";
import {CachedHttpClient} from "../main/CachedHttpClient";
import {HttpClient} from "../main/HttpClient";
import * as assert from "assert";
import {TimeService} from "../main/TimeService";
describe("CachedHttpClientTest", function () {

    let httpRequestCount = 0;
    let time = 200;

    beforeEach(function () {
        sinon.stub(HttpClient, "get", function (url: string) {
            httpRequestCount = httpRequestCount + 1;
            return Promise.resolve(url + " response");
        });

        time = time + 300;
        sinon.stub(TimeService, "getTimeSeconds", function (): number {
            return time;
        });
    });

    it("should call http client when first call", function (done) {

        CachedHttpClient.get("testUrl", 100).then(function (response: string) {
            assert.equal("testUrl response", response);
            assert.equal(1, httpRequestCount);
            done();
        }).catch(done);

    });

    it("should not call http client the second time", function (done) {

        CachedHttpClient.get("testUrl test cache", 100).then(function (response: string) {
            assert.equal("testUrl test cache response", response);

            CachedHttpClient.get("testUrl test cache", 100).then(function (response: string) {
                assert.equal("testUrl test cache response", response);
                assert.equal(1, httpRequestCount);
                done();
            }).catch(done);
        }).catch(done);

    });

    it("should call http client for each unique request", function (done) {

        CachedHttpClient.get("testUrl", 100).then(function (response: string) {
            assert.equal("testUrl response", response);
            CachedHttpClient.get("testUrl2", 100).then(function (response: string) {
                assert.equal("testUrl2 response", response);
                assert.equal(2, httpRequestCount);
                done();
            }).catch(done);
        }).catch(done);

    });

    afterEach(function () {
        httpRequestCount = 0;
        sinon.restore(HttpClient);
        sinon.restore(TimeService)
    })
});