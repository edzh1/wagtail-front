import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const WagtailUserbar = dynamic(() => import('../../components/WagtailUserbar'));

const BasePage = ({ children, wagtailUserbar }) => {
    return (
        <>
            <div className="BasePage">{children}</div>
            {!!wagtailUserbar && <WagtailUserbar {...wagtailUserbar} />}
        </>
    );
};

BasePage.defaultProps = {
    seo: {},
    shouldRenderSeo: true,
};

BasePage.propTypes = {
    children: PropTypes.node,
    shouldRenderSeo: PropTypes.bool,
    wagtailUserbar: PropTypes.shape({
        html: PropTypes.string,
    }),
};

export default BasePage;
