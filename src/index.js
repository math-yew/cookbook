import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Main from './main';
import Recipes from './Recipes';
import Recipe from './Recipe';
import Table from './table';
import Counter from './counter';
import Math from './math';
import FullName from './fullName';
import TaskApp from './TaskApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="*" element={<Main />} />
        <Route path="table" element={<Table />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="counter" element={<Counter/>} />
        <Route path="math" element={<Math/>} />
        <Route path="name" element={<FullName/>} />
        <Route path="taskapp" element={<TaskApp/>} />
      </Route>
    </Routes>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
