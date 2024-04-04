import dynamic from 'next/dynamic';

const containers = {
    AboutPage: dynamic(() => import('./AboutPage/AboutPage')),
    PureHtmlPage: dynamic(() => import('./PureHtmlPage/')),
}
export default containers;
