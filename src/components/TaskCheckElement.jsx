import React from 'react'

export default function TaskCheckElement({onTabClick}) {
  return <button name="check" className="tab" onClick={onTabClick}>
     <img
        src="/assets/icons/check.png"
        alt="ícone de mais simbolizando nova tarefa"
      />
  </button>
}