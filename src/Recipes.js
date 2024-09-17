import React, { useState, useEffect } from 'react';
import RecipeService from './RecipeService';
import { Link } from 'react-router-dom';


const Recipes = () => {

  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [casePadding, setCasePadding] = useState('20px');
  const [firstComponentWidth, setFirstComponentWidth] = useState('25%');

  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    RecipeService.getAllRecipes(showArchived)
      .then(res => setData(res.data));
  }, [id, showArchived]);

  return (
    <div style={{ display: 'block'}}>
      <h1>Recipes</h1>
      {/* <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="showArchived"
        checked={showArchived}
        onChange={() => setShowArchived(!showArchived)}
      />
      <label name="showArchived">Show Archived</label> */}
      <Link to="/recipe" state={{id:null}}>
        <div  style={{ display: 'flex', width: '100%', justifyContent: 'right'}}>
          <div  style={{backgroundColor:'#a2ff9c', color: '#0a0', height: '50px', width: '50px',
          borderRadius: '50px', textAlign: 'center', justifyContent: 'center', fontSize:'50px',
          lineHeight: '40px', boxShadow: '0px 2px 7px #aaa'}} onClick={()=>{setId(null)}}>+</div>
        </div>
      </Link>
      <div  style={{ width: '100%'}}>
        {(data || []).map((job, i)=>(
          <Link to="/recipe" key={i} state={{id:job._id}}>
            <div className="caseCard" style={{backgroundColor:(job.archive) ? '#88d6d4' : '#e2fdff'}} onClick={()=>setId(job._id)}>
              <h3 style={{margin: '0px'}}>{job.title}</h3>
              <p>{job._id}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
