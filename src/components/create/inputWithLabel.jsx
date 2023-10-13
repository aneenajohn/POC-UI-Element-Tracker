import React from 'react'

export const InputWithLabel = ({label, inputName, inputValue, onChangeHandler, inputType = "text", key}) => {
  return (
    <>
        <label className="justify-self-end self-center">{label}</label>
        <input
            type={inputType}
            name={inputName}
            className="p-2 border-2 border-solid rounded-md w-48 sm:w-80"
            value={inputValue}
            onChange={onChangeHandler}
            required
        />
    </>
  )
}
