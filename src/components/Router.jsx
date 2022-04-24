import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from '../pages/Home'
import List from '../pages/List'
import NewList from '../pages/NewList'
import NewTask from '../pages/NewTask'
import MyLists from '../pages/MyLists'

import PageContainer from '../components/PageContainer'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function NewListWithWrapper() {
  return <PageContainer>
          <NewList />
        </PageContainer>
}

function NewTaskWithWrapper() {
  return <PageContainer>
          <NewTask />
        </PageContainer>
}

export default function Router() {
  return (
      <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <PageContainer>
          <Home />
        </PageContainer>
      }/>
      <Route path="/list/:id" element={
        <PageContainer>
            <List />
        </PageContainer>
      } />
     <Route path="/new-list">
        <Route index element={<NewListWithWrapper />} />
        <Route path=":id" element={<NewListWithWrapper />} />
      </Route>

       <Route path="/new-task">
        <Route index element={<NewTaskWithWrapper />} />
        <Route path=":listId" element={<NewTaskWithWrapper />}>
          <Route path=":id" element={<NewTaskWithWrapper />} />
        </Route>
      </Route>
      <Route path="/my-lists" element={
        <PageContainer>
          <MyLists />
        </PageContainer>
      } />
    </Routes>
  </BrowserRouter>
  );
}