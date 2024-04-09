import dynamic from 'next/dynamic';

const containers = {
    AboutPage: dynamic(() => import('./AboutPage/AboutPage')),
    NotFoundPage: dynamic(() => import('./NotFoundPage/NotFoundPage')),
}
export default containers;
