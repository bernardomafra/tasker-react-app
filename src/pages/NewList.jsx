import React from 'react'
// import { Link } from 'react-router-dom'
import '../styles/pages/new-form.css'
import Input from '../components/Input'
import { useParams, useNavigate } from "react-router-dom";
import { getListFromLocalStorage, setListInLocalStorage } from '../services/storage'

export default function NewList(props) {
  const navigate = useNavigate()
  
  const params = useParams()
  const [isEditting, setIsEditting] = React.useState(!!params.id)
  const list = isEditting ? getListFromLocalStorage(params.id) : {}
  
  function create(event) {
    event.preventDefault();
    // get form input values
    const name = event.target.name.value;
    const description = event.target.description.value;
    const newList = {
      name,
      description,
    }
    if (isEditting) newList.id = list.id

    const response = setListInLocalStorage(newList, isEditting);
  
    if (response.success) {
      // clear form
      event.target.reset();
      navigate(`/list/${response.data.id}`);
    } else {
      console.error({
        type: 'error',
        title: 'Erro!',
        text: response.message || 'Não foi possível criar a lista',
      });
    }
  }
  
   return <div id="new-list" className="container-left">
     <img
      src="/assets/icons/arrow-left.png"
      width="48px"
      height="48px"
      alt="Ícone de uma seta para esquerda que ao clicar volta à página anterior"
      onClick={() => window.history.back()}
    />
    <h1 className="title">{isEditting ? 'Editar' : 'Nova'}<br />Lista</h1>
    <form onSubmit={create}>
      <Input id="name"
          type="text"
          name="name"
          placeholder="Ex.: Lista de compras"
          required
          tabIndex="1"
          label="Nome"
          defaultValue={isEditting ? list.name : ''}
      />
      <Input
          id="description"
          type="text"
          name="description"
          placeholder="Ex.: Lista para lembrar o que comprar no super-mercado"
          tabIndex="2"
          label="Descrição"
          defaultValue={isEditting ? list.description : ''}
        />
      <button className="primary-btn" type="submit">{isEditting ? 'Salvar' : 'Criar Lista'}</button>
    </form>
    </div>
}