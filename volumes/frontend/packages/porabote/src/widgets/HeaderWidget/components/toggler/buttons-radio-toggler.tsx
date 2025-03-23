import React, {useState} from 'react';
import "./style.less";

const ButtonsRadioToggler = (props) => {

  const [selectedValue, setSelectedValue] = useState(null);

  const onClickHandle = (e) => {
    let value = e.target.getAttribute('data-value');
    setSelectedValue(value);
    props.onSelect({value});
  }

  return (
    <div className="btns-radio-toggler">
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          onClick: onClickHandle,
          className: `btns-radio-toggler_item ${selectedValue == child.props['data-value'] ? 'active' : ''}`,
        });
      })}
    </div>
  );
};

export default ButtonsRadioToggler;