import React from 'react'

export const InputWithLabel = ({label, inputValue, onChangeHandler}) => {
  return (
    <>
        <label className="justify-self-end self-center">{label}</label>
        <input
            type="text"
            name="page_name"
            className="p-2 border-2 border-solid rounded-md w-48 sm:w-80"
            value={inputValue}
            onChange={onChangeHandler}
        />
    </>
  )
}
