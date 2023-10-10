import React, { useState, useEffect } from 'react';
import { InputWithLabel } from './inputWithLabel';

export const RenderInputDetails = ({uiElement}) => {

  const [buttonAttributes, setButtonAttributes] = useState({
    name: "",
    tag: "",
    type: "",
    value: ""
  })

  const inputHandler = (e) => {
    console.log("Btn inputHandler called: ",e.target.name,e.target.value);
    switch(e.target.name) {
        case "btn_name":
            setButtonAttributes({
                ...buttonAttributes,
                name: e.target.value
            });
            break;
        case "btn_tag":
            setButtonAttributes({
                ...buttonAttributes,
                tag: e.target.value
            });
            break;
        case "btn_type":
            setButtonAttributes({
                ...buttonAttributes,
                type: e.target.value
            });
            break;
        case "btn_value":
            setButtonAttributes({
                ...buttonAttributes,
                value: e.target.value
            });
            break;
        default:
            return null;
    }
  }

  useEffect(() => {
    console.log("buttonAttributes: ", buttonAttributes);
  },[buttonAttributes]);


  return (
    <>
        {uiElement === "button" ? (
            <div className="w-full h-full">
                <div className="grid grid-cols-2 gap-x-2 pb-4">
                    <InputWithLabel
                        label={"Button Name"}
                        inputName={"btn_name"}
                        inputValue={buttonAttributes.name}
                        onChangeHandler={inputHandler}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-2 pb-4">
                    <InputWithLabel
                        label={"Button Tag"}
                        inputName={"btn_tag"}
                        inputValue={buttonAttributes.tag}
                        onChangeHandler={inputHandler}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-2 pb-4">
                    <InputWithLabel
                        label={"Button Type"}
                        inputName={"btn_type"}
                        inputValue={buttonAttributes.type}
                        onChangeHandler={inputHandler}
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-2 pb-4">
                    <InputWithLabel
                        label={"Button Label"}
                        inputName={"btn_value"}
                        inputValue={buttonAttributes.value}
                        onChangeHandler={inputHandler}
                    />
                </div>
            </div>
        ) : null}
    </>
  )
}