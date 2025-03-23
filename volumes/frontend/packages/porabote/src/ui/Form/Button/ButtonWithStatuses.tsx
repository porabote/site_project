import React, {useState, useContext} from 'react';
import FormContext from "../FormContext";
import Icon, {LoaderClockIcon} from "@porabote/ui/Icons";
import {ButtonPropsType} from "../FormTypes";

const ButtonWithStatuses = (props: ButtonPropsType) => {

    let context = useContext(FormContext);

    const [className, setClassName] = useState(props.class || "prb-button");
    const [style, setStyle] = useState(props.style || {});
    const [isLoading, setIsLoading] = useState(false);

    const stopLoading = () => {
        setIsLoading(false);
    }
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {

        if (isLoading) {
            return;
        }
        setIsLoading(true);
        
        if (props.type == "submit") {
            context.onSubmit(context);
        } else {
            if (!isLoading && typeof props.onClick !== "undefined") {
                props.onClick(event, {...props, context, elementParams: {stopLoading}});
            }
        }
    }

    let isVisible = typeof props.isVisible != "undefined" ? props.isVisible({...props}) : true;

    if (!isVisible) {
        return <></>
    }

    return (

        <div
            className={`${className} ${isLoading ? "" : ""}`}
            style={{...style}}
            onClick={handleClick}
        >
            {isLoading && <Icon size={20} style={{paddingRight: '12px', position: 'relative', top: '1px'}}><LoaderClockIcon/></Icon>}
            {props.children &&
                props.children
            }
            {typeof props.label == "string" && props.label}
        </div>

    );
};

export default ButtonWithStatuses;