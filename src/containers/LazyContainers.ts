import dynamic from 'next/dynamic';

const containers = {
    HomePage: dynamic(() => import('./HomePage')),
    AboutPage: dynamic(() => import('./AboutPage')),
    NotFoundPage: dynamic(() => import('./NotFoundPage')),
    PureHtmlPage: dynamic(() => import('./PureHtmlPage')),
    Error500Page: dynamic(() => import('./Error500Page')),
}
export default containers;
