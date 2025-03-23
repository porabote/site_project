import React, {useState} from 'react'

type TabPanelType = {
    tabKey?: number;
    selectedIndex?: number;
    children?: React.ReactChild;
    style?: {[key: string]: string | number};
};

const TabPanel = (props: TabPanelType) => {

    const selectedState = (props.tabKey != props.selectedIndex) ? '' : 'selected'

    const [style] = useState(props.style || {});

    return(
      <div className={`tabs__item ${selectedState}`} style={style}>
          {props.children}
      </div>
    )
}

export default TabPanel