import { Outlet, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Nav from './nav.js';
import Table from './table.js';
import Counter from './counter.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav />
      <Outlet />
    {/*   */}
      </header>
    </div>
  );
}

export default App;
