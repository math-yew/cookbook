import React, { useState } from 'react';

// import './App.css';
import './styles.css';
import Cases from './Cases';
import MainForm from './MainForm';

function TaskApp() {

  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [casePadding, setCasePadding] = useState('20px');
  const [firstComponentWidth, setFirstComponentWidth] = useState('25%');

  const toggleWidth = () => {
    setFirstComponentWidth(firstComponentWidth === '25%' ? '0%' : '25%');
    setCasePadding(firstComponentWidth === '25%' ? '0px' : '20px');
  };
  return (
    <div className="App"  style={{ display: 'flex', height: '100%' }}>
      <div style={{backgroundColor: '#eee', width:firstComponentWidth, height:'100%', boxSizing:"border-box", padding: casePadding, transition:'1s'}}>
        <Cases data={data} setData={setData} id={id} setId={setId} />
      </div>
      <div className="triangles" style={{backgroundColor: '#cbddde', width:`calc(100% - ${firstComponentWidth})`, height:'100%'}}>
        <div style={{backgroundColor: '#d1d1d1', width:'20px',height:'100%', position: 'fixed', boxShadow: '10px 0px 25px #bbb'}}  onClick={toggleWidth}/>
        <div style={{margin: '0 0 0 20px', padding: '20px', wordWrap: 'break-word'}}>
          <MainForm style={{backgroundColor: '#f0f', margin: '100px'}} id={id} setId={setId} />
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
