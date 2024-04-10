import { getPage, getPagePreview, get500 } from "@/httpService";
import { WagtailApiResponseError } from "@/errors"
import { notFound } from 'next/navigation'

const isProd = process.env.NODE_ENV === 'production';

export async function getPreviewPageData({contentType, token, inPreviewPanel, headers = {}}) {
    try {
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
    } catch (err) {
        await errorHandler(err)

        throw err;
    }
}

export async function getPageData({path, searchParams, headers = {}, options = null}) {
    try {
        const {
            json: {componentName, componentProps, redirect, customResponse},
            headers: responseHeaders,
            } = await getPage(path, searchParams, {
                headers,
                cache: options?.cache,
                revalidate: options?.revalidate,
            });

        let setCookieHeader = null;
        if (responseHeaders.get('set-cookie')) {
            setCookieHeader = responseHeaders.get('set-cookie');
        }

        return {
            props: { componentName, componentProps },
            setCookieHeader,
        };
    } catch (err) {
        return errorHandler(err)
    }
}


const errorHandler = async (err) => {
    if (!(err instanceof WagtailApiResponseError)) {
        throw err;
    }

    if (!isProd && err.response.status >= 500) {
        return {
            props: {
                componentName: 'Error500Page',
                componentProps: {},
            },
        };
    }
}

