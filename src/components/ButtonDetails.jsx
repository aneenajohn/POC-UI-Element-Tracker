import React, { useState, useEffect } from 'react';
import { InputWithLabel } from './inputWithLabel';
import { camelToHyphen } from '../utils/index';

import { btnStyleOptions } from '../constants/styleOptions';

export const ButtonDetails = ({buttonAttributes, setButtonAttributes}) => {

  const [selected, setSelected] = useState([])

  const inputHandler = (e) => {
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

  const toggle = (option) => {
    if(selected.includes(option)) {
      setSelected(selected.filter(o => o !== option))
      setButtonAttributes(buttonAttributes?.styles?.filter(style => style.key !== option))
    } else {
      setSelected([...selected, option])
      let obj ={
        key: option,
        name: camelToHyphen(option),
        value: ""
      }
      setButtonAttributes({
        ...buttonAttributes,
        styles: [...buttonAttributes?.styles, obj]
      })
    }
  }

  const findInputLabel = (inputName) => {
    let found = btnStyleOptions.find((item) => item.value === inputName);
    console.log({ found });
    return found.label;
  };

  const findInputValue = (inputName) => {
    let element = buttonAttributes?.styles?.find((item) => item.key === inputName);
    console.log({element});
  }

  const stylesInputHandler = (e) => {
    const updatedStyles = buttonAttributes?.styles?.map(style => {
        if (style.key === e.target.name) {
            return {...style, value: e.target.value};
        }
        return style;
    });

    setButtonAttributes({
        ...buttonAttributes,
        styles: updatedStyles
    });
  }

  useEffect(() => {
    console.log("buttonAttributes: ", buttonAttributes);
  },[buttonAttributes]);

  useEffect(() => {
    console.log({selected})
  },[selected])


  return (
    <>
        <div className="w-full h-full">
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Button Name"}
                    inputName={"btn_name"}
                    inputValue={buttonAttributes?.name}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Button Tag"}
                    inputName={"btn_tag"}
                    inputValue={buttonAttributes?.tag}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Button Type"}
                    inputName={"btn_type"}
                    inputValue={buttonAttributes?.type}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Button Label"}
                    inputName={"btn_value"}
                    inputValue={buttonAttributes?.value}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <label className="justify-self-end self-center">Styles</label>
                <div>
                    {btnStyleOptions.map(option => (
                        <label key={option.value} className='flex'>
                            <input
                                type="checkbox"
                                checked={selected.includes(option.value)}
                                onChange={() => toggle(option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </div>
            {selected?.length ? (
                <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                    {selected.map((style) => (
                        <>
                            <InputWithLabel
                                label={findInputLabel(style)}
                                inputName={style}
                                inputValue={findInputValue(style)}
                                onChangeHandler={stylesInputHandler}
                                key={style}
                            />
                        </>
                    ))}
                </div>
            ) : null}
        </div>
    </>
  )
}