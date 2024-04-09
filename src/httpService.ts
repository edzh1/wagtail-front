import querystring from "querystring";
import {keysToCamelFromSnake, keysToSnakeFromCamel} from './utils'

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

    // if (res.status < 200 || res.status >= 300) {
    //     const error = new WagtailApiResponseError(res, url, params);
    //     error.response = res;
    //     throw error;
    // }

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


export async function getPreviewPageData({contentType, token, inPreviewPanel, headers = {}}) {
    const { json: pagePreviewData } = await getPagePreview(
        contentType,
        token,
        {
            in_preview_panel: inPreviewPanel,
        },
        {
            headers,
        }
    );

    return {
        props: pagePreviewData,
    };
}

export  async function getPageData({path, searchParams, headers = {}, options = null}) {
    const {
        json: { componentName, componentProps, redirect, customResponse },
        headers: responseHeaders,
    } = await getPage(path, searchParams, {
        headers,
        // cache: options?.cache,
        // revalidate: options?.revalidate,
    });

    let setCookieHeader = null;
    if (responseHeaders.get('set-cookie')) {
        setCookieHeader = responseHeaders.get('set-cookie');
    }

    return {
        props: { componentName, componentProps },
        setCookieHeader,
    };
}


export async function getPublicViewData(slug, params, options) {
    return await getRequest(
        `${NEXT_PUBLIC_API_URL}/v1/external_view_data/${slug}/`,
        params,
        options
    );
}
