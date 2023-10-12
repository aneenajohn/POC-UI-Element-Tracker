import React, { useState, useEffect } from 'react';
import { InputWithLabel } from './inputWithLabel';
import { camelToHyphen } from '../utils/index';

import { inputStyleOptions } from '../constants/styleOptions';

export const InputDetails = ({inputAttributes, setInputAttributes}) => {

  const [selected, setSelected] = useState([])

  const inputHandler = (e) => {
    switch(e.target.name) {
        case "input_name":
            setInputAttributes({
                ...inputAttributes,
                name: e.target.value
            });
            break;
        case "input_tag":
            setInputAttributes({
                ...inputAttributes,
                tag: e.target.value
            });
            break;
        case "input_type":
            setInputAttributes({
                ...inputAttributes,
                type: e.target.value
            });
            break;
        case "input_value":
            setInputAttributes({
                ...inputAttributes,
                value: e.target.value
            });
            break;
        case "input_placeholder":
            setInputAttributes({
                ...inputAttributes,
                placeholder: e.target.value
            })
        default:
            return null;
    }
  }

  const toggle = (option) => {
    if(selected.includes(option)) {
      setSelected(selected.filter(o => o !== option))
      setInputAttributes(inputAttributes?.styles?.filter(style => style.key !== option))
    } else {
      setSelected([...selected, option])
      let obj ={
        key: option,
        name: camelToHyphen(option),
        value: ""
      }
      setInputAttributes({
        ...inputAttributes,
        styles: [...inputAttributes.styles, obj]
      })
    }
  }

  const findInputLabel = (inputName) => {
    let found = inputStyleOptions.find((item) => item.value === inputName);
    console.log({ found });
    return found.label;
  };

  const findInputValue = (inputName) => {
    let element = inputAttributes?.styles?.find((item) => item.key === inputName);
    console.log({element});
  }

  const stylesInputHandler = (e) => {
    const updatedStyles = inputAttributes?.styles?.map(style => {
        if (style.key === e.target.name) {
            return {...style, value: e.target.value};
        }
        return style;
    });

    setInputAttributes({
        ...inputAttributes,
        styles: updatedStyles
    });
  }

  useEffect(() => {
    console.log("inputAttributes: ", inputAttributes);
  },[inputAttributes]);

  useEffect(() => {
    console.log({selected})
  },[selected])


  return (
    <>
        <div className="w-full h-full">
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Input Name"}
                    inputName={"input_name"}
                    inputValue={inputAttributes?.name}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Input Tag"}
                    inputName={"input_tag"}
                    inputValue={inputAttributes?.tag}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Input Type"}
                    inputName={"input_type"}
                    inputValue={inputAttributes?.type}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Input Label"}
                    inputName={"input_value"}
                    inputValue={inputAttributes?.value}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <InputWithLabel
                    label={"Input Placeholder"}
                    inputName={"input_placeholder"}
                    inputValue={inputAttributes?.placeholder}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2 pb-4">
                <label className="justify-self-end self-center">Styles</label>
                <div>
                    {inputStyleOptions.map(option => (
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
                            />
                        </>
                    ))}
                </div>
            ) : null}
        </div>
    </>
  )
}