import React from 'react'
import LinkButton from '../components/LinkButton'
import '../styles/pages/home.css';

export default function Home() {
   return <div id="home" className="container-center">
      <button className="theme-switcher"></button>
      <header>
        <img alt="tasker-logo" id="tasker-logo" src="/assets/logo-only.png" />
        <h1 className="title">TaskeR</h1>
        <small>Organize suas tarefas e as separe por listas</small>
      </header>
      <footer>
        <LinkButton path="/new-list">nova lista</LinkButton>
        <LinkButton path="/my-lists">minhas litas</LinkButton>
      </footer>
    </div>
}