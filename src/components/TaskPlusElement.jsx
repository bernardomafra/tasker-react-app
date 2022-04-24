import React from 'react'

export default function TaskPlusElement({onTabClick}) {
  return <button name="plus" className="tab" onClick={onTabClick}>
    <img
      src="/assets/icons/plus.png"
      alt="ícone de mais simbolizando nova tarefa"
    />
  </button>
}