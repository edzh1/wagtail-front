import querystring from "querystring";
import { keysToCamelFromSnake, keysToSnakeFromCamel } from './utils'
import { WagtailApiResponseError } from "@/errors"

const API_URL = 'http://localhost:8081/wt/api/nextjs';
const NEXT_PUBLIC_API_URL = '/wt/api/nextjs';

export async function getRequest(url, params, options) {
    params = params || {};
    params = keysToSnakeFromCamel(params);

    let headers = options?.headers || {};
    headers = {
        'Content-Type': 'application/json',
        ...headers,
    };
    const queryString = querystring.stringify(params);

    let fetchOptions = { headers };

    if (options?.cache) {
        fetchOptions = {
            ...fetchOptions,
            cache: options.cache,
        };
    }

    if (options?.revalidate) {
        fetchOptions = {
            ...fetchOptions,
            next: {
                revalidate: options.revalidate,
            },
        };
    }
    const res = await fetch(`${url}?${queryString}`, fetchOptions);

    if (res.status < 200 || res.status >= 300) {
        const error = new WagtailApiResponseError(res, url, params);
        error.response = res;
        throw error;
    }

    const json = await res.json();
    return {
        headers: res.headers,
        json: keysToCamelFromSnake(json),
    };
}

export async function getPage(path, params, options) {
    params = params || {};
    params = {
        htmlPath: path,
        ...params,
    };

    return await getRequest(`${API_URL}/v1/page_by_path/`, params, options);
}

export async function getPagePreview(contentType, token, params, options) {
    params = params || {};
    params = {
        contentType,
        token,
        ...params,
    };

    return await getRequest(`${API_URL}/v1/page_preview/`, params, options);
}

export async function getRedirect(path, params, options) {
    params = params || {};
    params = {
        htmlPath: path,
        ...params,
    };

    return await getRequest(`${API_URL}/v1/redirect_by_path/`, params, options);
}


// debug //
export async function get500() {
    return await getRequest(`http://localhost:8081/wt/500/`, {}, {});
}
