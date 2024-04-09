import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const requestHeaders = new Headers(request.headers);

    // const { nextUrl: { search } } = request;
    // const urlSearchParams = new URLSearchParams(search);
    // const params = Object.fromEntries(urlSearchParams.entries())


    requestHeaders.set('x-url', request.url);
    requestHeaders.set('x-origin', origin);
    requestHeaders.set('x-pathname', pathname);
    // requestHeaders.set('x-params', params);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
