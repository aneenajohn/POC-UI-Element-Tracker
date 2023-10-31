import React, {useEffect, useState} from 'react';
import { InputWithLabel, ButtonDetails, InputDetails } from '../components';

import { BUTTON_INITIAL_VALUES, INPUT_INITIAL_VALUES, BASE_URL, API } from '../constants';

export const CreateElements = () => {

  const [inputs, setInputs] = useState({
    pageName: "",
    uiElementType: ""
  });

  const [buttonAttributes, setButtonAttributes] = useState(BUTTON_INITIAL_VALUES)

  const [inputAttributes, setInputAttributes] = useState(INPUT_INITIAL_VALUES)

  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const [alertDetails, setAlertDetails] = useState({});

  const resetUiAttributes = () => {
    setButtonAttributes(BUTTON_INITIAL_VALUES)
    setInputAttributes(INPUT_INITIAL_VALUES)
  }

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
            resetUiAttributes();
            break;
        default:
            return null;
    }
  }

  useEffect(() => {
    console.log("Inputs: ", inputs);
  },[inputs]);

  const getLocatorElements = (uiElementType) => {
    switch(uiElementType) {
        case "button":
            return {
                name: buttonAttributes.name,
                tag: buttonAttributes.tag,
                type: buttonAttributes.type,
                value: buttonAttributes.value,
            }
        case "input":
            return {
                name: inputAttributes.name,
                tag: inputAttributes.tag,
                type: inputAttributes.type,
                value: inputAttributes.value,
            }
        default:
            return
    }
  }

  const getStyles = (uiElementType) => {
    switch(uiElementType) {
        case "button":
            return buttonAttributes.styles
        case "input":
            return inputAttributes.styles
        default:
            return
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData =  {
        data: [
            {
                pageName: inputs.pageName,
                elements: [
                    {
                        locator: getLocatorElements(inputs.uiElementType),
                        styles: getStyles(inputs.uiElementType)
                    }
                ]
            }
        ]
    }

    try {
        const response = await API.post('/', formData);
        console.log("Resp: ", response.data);
        if(response.status === "SUCCESS") {
            setAlertDetails({
                title: "Success!",
                message: "UI Element created successfully"
            })
        }
    }catch (error) {
        console.error('Error posting data:', error);
        // throw error;
        setAlertDetails({
            title: "Failure!",
            message: "UI Element creation failed"
        })
    }
  }

  useEffect(() => {
    console.log("Btn Atrr from Create main", buttonAttributes)
  }, [buttonAttributes])

  return (
    <div className="flex flex-col items-center flex-grow leading-5 font-mono bg-secondary">
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
            {inputs?.uiElementType === "button" ? (
                <ButtonDetails
                    buttonAttributes={buttonAttributes}
                    setButtonAttributes={setButtonAttributes}
                />) : null}
            {inputs?.uiElementType === "input" ? (
                <InputDetails
                    inputAttributes={inputAttributes}
                    setInputAttributes={setInputAttributes}
                />) : null}
            <button
                // className={`px-6 py-3 bg-primary text-text_secondary mb-4 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-1'}`}
                // disabled={isButtonDisabled}
                className={`px-6 py-3 bg-primary text-text_secondary mb-4`}
                onClick={submitHandler}
            >
                Create
            </button>
        </form>
    </div>
  )
}
