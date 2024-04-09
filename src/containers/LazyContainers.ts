import dynamic from 'next/dynamic';

const containers = {
    HomePage: dynamic(() => import('./HomePage/HomePage')),
    AboutPage: dynamic(() => import('./AboutPage/AboutPage')),
    NotFoundPage: dynamic(() => import('./NotFoundPage/NotFoundPage')),
}
export default containers;
