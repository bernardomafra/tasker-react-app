import React from 'react'

import TaskCheckElement from './TaskCheckElement'
import TaskUnCheckElement from './TaskUnCheckElement'
import TaskPlusElement from './TaskPlusElement'

export default function BottomTabButtons({ onTabClick, centerTabType }) {
  return <div id="buttons">
        <button name="edit" className="tab" onClick={onTabClick}>
          <img
            src="/assets/icons/edit.png"
            alt="ícone de lápis simbolizando edição da tarefa"
          />
        </button>
        {centerTabType === 'check-task' && <TaskCheckElement onTabClick={onTabClick}/>}
        {centerTabType === 'uncheck-task' && <TaskUnCheckElement onTabClick={onTabClick}/>}
        {centerTabType === 'plus' && <TaskPlusElement onTabClick={onTabClick}/>}
        <button name="delete" className="tab" onClick={onTabClick}>
          <img
            src="/assets/icons/delete.png"
            alt="ícone de lixeira simbolizando exclusão de tarefa"
          />
        </button>
    </div>
}