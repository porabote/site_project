import React, {JSXElementConstructor, ReactElement} from 'react'

type TabListType = {
    tabKey?: number;
    selectedIndex?: number;
    children?: ReactElement<any, string | JSXElementConstructor<any>>[];
    setSelectedIndex?: Function;
};

const TabList = (props: TabListType) => {

    const { children } = props;

    return(
        <div className="tabs__panel">
            {
                React.Children.map(children, (child, key) => {
                    if (!child) return;
                    return React.cloneElement(child, {
                        tabKey: key,
                        selectedIndex: props.selectedIndex,
                        setSelectedIndex: props.setSelectedIndex,
                    });
                })
            }
        </div>
    )
}


export default TabList