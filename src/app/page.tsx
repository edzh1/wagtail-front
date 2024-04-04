import { headers, draftMode } from 'next/headers';
import containers from '../containers/LazyContainers';
import { getPage, getPagePreview } from '@/httpService'
import ClientComponent from './clientcomponent';

async function getPreviewPageData({contentType, token, inPreviewPanel, headers = {}}) {
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

async function getPageData({path, searchParams, headers = {}, options = null}) {
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

const Page = async (props) => {
    const headersList = headers();
    const { params, searchParams } = props;
    const { isEnabled: isDraftEnabled } = draftMode();

    let data = null

    if (isDraftEnabled && searchParams.contentType && searchParams.token) {
        const { contentType, token, inPreviewPanel } = searchParams;
        data = await getPreviewPageData({
            contentType,
            token,
            inPreviewPanel: inPreviewPanel === 'true',
            headers: {
                cookie: headersList.get('cookie'),
            },
        });
    } else {
        data = await getPageData({
            path: params.path,
            searchParams: {
                ...searchParams,
                host: headersList.get('host'),
            },
            headers: {
                cookie: headersList.get('cookie'),
            },
        });
    }


    const { componentName, componentProps } = data.props || {};
    console.log('data', data)
    const setCookieHeader = data.setCookieHeader;
    const Component = containers[componentName];

    return (
        <>
            {!!setCookieHeader && (
                <ClientComponent setCookieHeader={setCookieHeader} />
            )}
            <Component {...componentProps} shouldRenderSeo={false} />
        </>
    );

    // return null
}

export default Page
