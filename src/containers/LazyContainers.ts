import dynamic from 'next/dynamic';

const containers = {
    HomePage: dynamic(() => import('./HomePage/HomePage')),
    AboutPage: dynamic(() => import('./AboutPage/AboutPage')),
    NotFoundPage: dynamic(() => import('./NotFoundPage/NotFoundPage')),
    PureHtmlPage: dynamic(() => import('./PureHtmlPage/PureHtmlPage')),
    Error500Page: dynamic(() => import('./Error500Page/Error500Page')),
}
export default containers;
