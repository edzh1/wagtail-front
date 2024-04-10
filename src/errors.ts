
export class WagtailApiResponseError extends Error {
    constructor(res, url, params) {
        super(
            `${res.statusText}. Url: ${url}. Params: ${JSON.stringify(params)}`
        );
        this.name = 'WagtailApiResponseError';
    }
}
