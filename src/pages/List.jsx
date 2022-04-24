import React from 'react'
import { Helmet } from 'react-helmet'

import { useParams, useNavigate } from "react-router-dom";
import { getListFromLocalStorage, updateTaskInLocalStorage } from '../services/storage'

import BottomTabButtons from '../components/BottomTabButtons'
import BottomTabWarning from '../components/BottomTabWarning'

import '../styles/pages/list.css' 
import '../styles/list-common.css'
import '../styles/bottom-tab.css' 

export default function List() {
  const { id } = useParams()
  const list = getListFromLocalStorage(id) 
  const navigate = useNavigate()

  const [isBottomTabOpen, setIsBottomTabOpen] = React.useState(false)
  const bottomTabType = React.useRef('buttons')
  const centerTabType = React.useRef('plus')
  const [selectedTask, setSelectedTask] = React.useState(null)
  const [filterActive, setFilterActive] = React.useState(null)
  const [isSearchActive, setIsSearchActive] = React.useState(false)
  const [tasksMatchingSearch, setTasksMatchingSearch] = React.useState([])

  function taskMachesKeywords(taskToCompare, keyWords) {
    return (
      taskToCompare.name.match(new RegExp(keyWords, 'i')) ||
      taskToCompare.description?.match(new RegExp(keyWords, 'i'))
    );
  }
  
  function onTabClick (event) {
    const actionName = event.target.name;
    const actions = {
      check: checkTask,
      uncheck: uncheckTask,
      plus: () =>  navigate(`/new-task/${list.id}`),
      delete: () => {
        if (selectedTask) deleteTask(element, task);
        else bottomTabType.current = ('warning');
      },
      edit: () => {
        const { task } = getSelectedTask();
        if (task) navigate(`/new-task/${task.id}/${list.id}`)
        else navigate(`/new-list/${list.id}`)
      },
    };

    if (actions[actionName]) actions[actionName]();
  };

  function checkTask() {
    const selectedTaskObject = list.tasks.find(task => +task.id === +selectedTask)
    selectedTaskObject.completed = true;
    updateTaskInLocalStorage(selectedTaskObject, list.id);
    centerTabType.current = ('uncheck-task')
  }

  function uncheckTask() {
    const selectedTaskObject = list.tasks.find(task => +task.id === +selectedTask)
    selectedTaskObject.completed = false;
    updateTaskInLocalStorage(selectedTaskObject, list.id);
    centerTabType.current = ('check-task')
  }

  function showTaskOptions(taskId) {
    setSelectedTask(prev => +prev === +taskId ? null : taskId)
    setIsBottomTabOpen(prev => !prev)
    isTaskCompleted(taskId) ? centerTabType.current =('uncheck-task') : centerTabType.current =('check-task')
  }

  function isTaskCompleted(taskId) {
    return list.tasks.find((task) => +task.id === +taskId).completed;
  }

  function filter(event) {
    const type = event.target.dataset.filter_type
    setFilterActive(prev => prev === type ? null : type)
  }

  function isTaskHidden(task) {
    if (isSearchActive) return !tasksMatchingSearch.includes(task.id)
    
    return filterActive === 'done' && !task.completed || filterActive === 'todo' && task.completed
  }

  function search(event) {
    setIsSearchActive(prev => !prev)
  }

  function onSearchInputChange(event) {
    const searchWords = event.target.value
    console.log(searchWords)
    const tasksMatching = list.tasks.map(task => {
      if (taskMachesKeywords(task, searchWords)) return task.id
      return null
    }).filter(t => t !== null)
    setTasksMatchingSearch(tasksMatching)
  }
  
   return <div id="list" className="container-left">
     <header>
      <img
        src="/assets/icons/arrow-left.png"
        width="48px"
        height="48px"
        alt="Ícone de uma seta para esquerda que ao clicar volta à página anterior"
        onClick={() => window.history.back()}
      />
      <section id="list-header-info">
        <h1 className="title limitted-text" id="list-page-title">{list.name}</h1>
        <p className="limitted-text">{list.description}</p>
      </section>
    </header>

     {!!list.tasks.length && 
        <section id="task-filters">
          {isSearchActive ? <input
            style={{width: '100%'}}
            type="text"
            placeholder="Buscar uma tarefa por palavras chave"
            name="taskSearch"
            onKeyUp={onSearchInputChange}
          /> :
            <>
          <button
            data-filter_type="todo"
            className="primary-btn"
            onClick={filter}
            id={filterActive === 'todo' ? 'active_task-filter' : ''}
          >
            TO DO
          </button>
          <button
            data-filter_type="done"
            className="primary-btn"
            onClick={filter}
            id={filterActive === 'done' ? 'active_task-filter' : ''}
          >
            DONE
          </button>
              </>
        }
          <button id="search-btn" onClick={search}>
            <img
              width="32px"
              height="32px"
              src={isSearchActive ? '/assets/icons/filter.png' : "/assets/icons/magnify.png"}
              alt="search task in list"
            />
          </button>
        </section>
     }

     {list.tasks.length ? 
      <ul id="tasks-container">
        {list.tasks.map(task => (
          <li key={task.id} data-taskid={task.id} data-completed={task.completed} className={+selectedTask === +task.id ? 'selected' : ''} data-task_hidden={isTaskHidden(task)}>
             <section className="list-data">
                <h2 className="limitted-text">{task.name}</h2>
                <p className="limitted-text">{task.description}</p>
              </section>
              <aside className="list-actions">
                <img onClick={() => showTaskOptions(task.id)} width="32px" height="32px" src="/assets/icons/settings.png" alt="list settings icon" />
              </aside>
          </li>
        ))}
      </ul>
       :
       <section className="empty-state">
         <h2>Você não tem nenhuma tarefa ainda...</h2>
          <p>Clique no botão abaixo para criar uma nova tarefa.</p>
          <a className="primary-btn" href={`/new-task/${list.id}`}>Nova tarefa</a>
       </section>
     }
     

    <footer id="tasker-bottom-tab" 
      className={"bottom-tab ".concat(isBottomTabOpen ? 'open' : '')} 
      onClick={() => setIsBottomTabOpen(prev => !prev)}>
      {bottomTabType.current === 'hide' && <></>}
      {bottomTabType.current === 'buttons' && <BottomTabButtons onTabClick={onTabClick} centerTabType={centerTabType.current} />}
      {bottomTabType.current === 'warning' && <BottomTabWarning list={list} cancelAction={() => bottomTabType.current = ('buttons')} confirmAction={console.log}/>}
    </footer>
    </div>
}