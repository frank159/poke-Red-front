import React from "react"

export const PokeFilter = ({ value, onChange}) => {
  function handlerChange(evn) {
    onChange(evn.target.value)
  }
  return (
    <input type="search" value={value} onChange={handlerChange}/>
  )
}