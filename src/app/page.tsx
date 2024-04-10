import { headers, draftMode } from 'next/headers';
import containers from '../containers/LazyContainers';
import { getPreviewPageData, getPageData } from '@/pageService'
import ClientComponent from './clientcomponent';
import { notFound, permanentRedirect, redirect } from 'next/navigation';

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


    const { componentName, componentProps } = data?.props || {};
    const setCookieHeader = data?.setCookieHeader;
    const Component = containers[componentName];

    if (data?.redirect) {
        const { destination, permanent } = data.redirect;
        return permanent
            ? permanentRedirect(destination)
            : redirect(destination);
    }

    if (!Component) {
        return notFound();
    }

    return (
        <>
            {!!setCookieHeader && (
                <ClientComponent setCookieHeader={setCookieHeader} />
            )}
            <Component {...componentProps} />
        </>
    );
}

export default Page
