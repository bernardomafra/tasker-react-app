import React from 'react'

export default function TaskUnCheckElement({onTabClick}) {
  return <button name="uncheck" className="tab" onClick={onTabClick}>
     <img
        src="/assets/icons/uncheck.png"
        alt="ícone de mais simbolizando nova tarefa"
      />
  </button>
}
