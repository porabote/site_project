import React from 'react';
import "@/resources/styles/slideFour.less";

const HomePageSlideFour = (props) => {

    const {isActive, slideKey} = props;

    if (!isActive(slideKey)) {
        return <></>;
    }

    return (
        <>
            <div className="content">
                5555555555555555555555
            </div>
        </>
    );
};

export default HomePageSlideFour;