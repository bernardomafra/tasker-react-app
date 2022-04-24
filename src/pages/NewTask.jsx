import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../styles/pages/new-form.css'
import Input from '../components/Input'
import { getTaskFromLocalStorage, setTaskInLocalStorage } from '../services/storage'

export default function NewTask() {
  const { listId, id: taskId } = useParams()
  const navigate = useNavigate()

  console.log({listId, taskId})
  
  const [isEditting, setIsEditting] = React.useState(!!taskId)
  const task = isEditting ? getTaskFromLocalStorage(taskId) : {}

    
  function create(event) {
    event.preventDefault();
    event.stopPropagation()
    
    const name = event.target.name.value;
    const description = event.target.description.value;
    const newTask = { name, description };

    if (isEditting) newTask.id = taskId
    
    const response = setTaskInLocalStorage(newTask, listId, isEditting);

    if (response.success) {
      // clear form
      console.log('deu bom')
      //event.target.reset();
      navigate(`/list/${listId}`);
    } else {
      console.log('deu ruim')
      console.error({
        type: 'error',
        title: 'Erro!',
        text: response.message || 'Não foi possível criar a tarefa',
      });
    }
  }

  
   return <div id="new-task" className="container-left">
      <img
      src="/assets/icons/arrow-left.png"
      width="48px"
      height="48px"
      alt="Ícone de uma seta para esquerda que ao clicar volta à página anterior"
      onClick={() => window.history.back()}
    />
    <h1 className="title">{isEditting ? 'Editar' : 'Nova'} <br />Tarefa</h1>
    <form onSubmit={create}>
      <Input
          id="name"
          type="text"
          name="name"
          placeholder="Ex.: Comprar pão"
          required
          tabIndex="1"
          label="Nome"
          defaultValue={isEditting ? list.name : ''}
        />
      <Input
          id="description"
          type="text"
          name="description"
          placeholder="Ex.: Comprar 10 pães de sal"
          label="Descrição"
          defaultValue={isEditting ? list.description : ''}
       />
      <button className="primary-btn" type="submit">{isEditting ? 'Salvar' : 'Criar Tarefa'}</button>
    </form>
    </div>
}