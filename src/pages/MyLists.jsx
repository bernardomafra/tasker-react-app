import React from 'react'
// import { Link } from 'react-router-dom'

export default function MyLists() {
   return <div id="home" className="container-left">
          <img
            src="/assets/icons/arrow-left.png"
            width="48px"
            height="48px"
            alt="Ícone de uma seta para esquerda que ao clicar volta à página anterior"
            onClick={() => window.history.back()}
          />
          <h1 className="title">Minhas <br />Listas</h1>
          <ul id="lists-container"></ul>
    </div>
}