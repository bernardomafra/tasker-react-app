import React from 'react'

export default function BottomTabWarning({ list, cancelAction, confirmAction }) {
  return <div id="warning">  
      <header>
          <h4>Atenção!</h4>
      </header>
      <main>
        <p>
          Tem certeza que deseja excluir a lista
          <span className="limitted-text"
            >${list.name}</span
          >
          e todas suas tarefas ?
        </p>
      </main>
      <footer>
        <button className="primary-btn" onClick={cancelAction}>
          cancelar
        </button>
        <button className="primary-btn" onClick={confirmAction}>confirmar</button>
      </footer>
  </div>
}