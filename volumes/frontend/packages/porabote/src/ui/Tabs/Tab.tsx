import React from 'react'

type TabType = {
  tabKey?: number;
  selectedIndex?: number;
  setSelectedIndex?: Function;
  children?: string;
};

const Tab = (props: TabType) => {

  const selectedState = (props.tabKey != props.selectedIndex) ? '' : 'selected'

  return (
    <span
      className={`tabs__panel__item ${selectedState}`}
      onClick={() => {
        if (props.setSelectedIndex) {
          props.setSelectedIndex(props.tabKey);
        }

        localStorage.setItem('report_active_tab', props.tabKey ? props.tabKey.toString() : "");
      }}
    >
            {props.children}
        </span>
  )
}

export default Tab