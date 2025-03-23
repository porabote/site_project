import React, {JSXElementConstructor, ReactElement, useState} from 'react'

type PropsType = {
  children?: ReactElement<any, string | JSXElementConstructor<any>>[];
};

const Tabs = (props: PropsType) => {

  const initialSelectedIndex = (localStorage.getItem('active_tab') !== null) ?
    localStorage.getItem('active_tab') : 0;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const {children} = props;

  return (
    <div className="tabs js-tabs">
      {children &&
        React.Children.map(children, (child: ReactElement<any, string | JSXElementConstructor<any>>, id) => {
          if (!child) return;
          return React.cloneElement(child, {
            tabKey: --id,
            selectedIndex,
            setSelectedIndex,
          });
        })
      }
    </div>
  );

}

export default Tabs;