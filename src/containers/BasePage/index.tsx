import React from 'react';
import BasePage from './BasePage';

export const basePageWrap = (Component) => (props) => {
    return (
        <BasePage {...props} _class={Component.name}>
            <Component {...props} />
        </BasePage>
    );
};

export default BasePage;
