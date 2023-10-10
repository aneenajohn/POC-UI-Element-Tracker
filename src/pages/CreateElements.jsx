import React, {useEffect, useState} from 'react';
import { InputWithLabel, RenderInputDetails  } from '../components';

export const CreateElements = () => {

  const [inputs, setInputs] = useState({
    pageName: "",
    uiElementType: ""
  })
  const inputHandler = (e) => {
    console.log(e.target.value, e.target.name);
    switch(e.target.name) {
        case "page_name":
            setInputs({
                ...inputs,
                pageName: e.target.value
            });
            break;
        case "element_type":
            setInputs({
                ...inputs,
                uiElementType: e.target.value
            });
            break;
        default:
            return null;
    }
  }

  useEffect(() => {
    console.log("Inputs: ", inputs);
  },[inputs]);

  return (
    <div className="flex flex-col items-center h-screen leading-5 font-mono">
        <h2 className="font-medium text-lg p-4 mb-2 tracking-tight">Create UI elements</h2>
        <form className='font-mono flex flex-col gap-4 w-full items-center'>
            <div className="grid grid-cols-2 gap-x-2">
                <InputWithLabel
                    label={"Page Name"}
                    inputName={"page_name"}
                    inputValue={inputs.pageName}
                    onChangeHandler={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2 gap-x-2">
                <label className="justify-self-end self-center">UI Element Type</label>
                <select
                    className="p-2 border-2 border-solid rounded-md w-48 sm:w-80"
                    onChange={inputHandler}
                    name="element_type"
                >
                    <option value="">Select UI element type</option>
                    <option value="button">Button</option>
                    <option value="input">Input</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="slider">Slider</option>
                </select>
            </div>
            {inputs?.uiElementType ? <RenderInputDetails uiElement={inputs.uiElementType} /> : null}
        </form>
    </div>
  )
}
