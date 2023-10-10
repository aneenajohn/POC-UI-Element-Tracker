import React, {useEffect, useState} from 'react'

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
  },[inputs])
  return (
    <div className="flex flex-col items-center h-screen leading-5 font-mono">
        <h2 className="font-medium text-lg p-4 mb-2 tracking-tight">Create UI elements</h2>
        <form className='font-mono flex flex-col gap-4 w-full items-center'>
        {/* <form className='font-mono grid grid-cols-2 gap-4'> */}
            <div className="grid grid-cols-2">
                <label className="justify-self-end self-center">Page Name: </label>
                <input
                    type="text"
                    name="page_name"
                    className="p-2 border-2 border-solid rounded-md w-48 sm:w-80"
                    value={inputs.pageName}
                    onChange={inputHandler}
                />
            </div>
            <div className="grid grid-cols-2">
                <label className="justify-self-end self-center">UI Element Type: </label>
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

            {}
        </form>
    </div>
  )
}
