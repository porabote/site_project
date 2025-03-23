import React, {useContext} from 'react';
import FormContext from "../FormContext";

const Buttons = (props) => {

    const {buttons} = props;
    const context = useContext(FormContext);

    const onClickHandler = (e, button) => {
        if (typeof button.props.onClick == "function") {
            button.props.onClick(e, {context, ...button.props});
        }
    }

    return (
        <div>
            {buttons.map((button, index) => {
                return React.cloneElement(button, {onClick: (e) => onClickHandler(e, button)})
            })}
        </div>
    );
};

export default Buttons;