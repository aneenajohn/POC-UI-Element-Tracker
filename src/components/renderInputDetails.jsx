import React, { useState } from 'react'

export const RenderInputDetails = ({uiElement}) => {

  const [buttonAttributes, setButtonAttributes] = useState({
    name: "",
    tag: "",
    type: "",
    value: ""
  })

  return (
    <>
        {uiElement === "button" ? (
            <div>
                <label className="justify-self-end self-center">Page Name: </label>
                <input
                    type="text"
                    name="page_name"
                    className="p-2 border-2 border-solid rounded-md w-48 sm:w-80"
                    value={inputs.pageName}
                    onChange={inputHandler}
                />
            </div>
        ) : null}
    </>
  )
}
