import React, { useState, useEffect } from 'react';

function UpdateIngredients (props){
  const {ingredients, setIngredients} = props;

  const [input, setInput] = useState("");
  const [dragging,setDragging] = useState(null);
  const [eclipsing,setEclipsing] = useState(null);
  const [hoverColor,setHoverColor] = useState("#ffffff");

  const addIngredients = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, input]);
    setInput("");
  };

  const updateIngredients = (e, index) => {
    let newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const removeIngredients = (index) => {
    let newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const startDrag = (e, index) => {
    setDragging(index)
    setHoverColor("#aaffaa");
  }

  const dropDrag = (e) =>{
    let to = eclipsing;
    let from = dragging;
    setHoverColor("#ffffff");
    if(to != null  && from != null){
      let arr = ingredients;
      to = (from >= to) ? to : to + 1;
      let toRemove = (from >= to) ? from +1 : from;
      arr.splice(to, 0, arr[from]);
      arr.splice(toRemove,1);
      setIngredients(arr);
    }
  };

  return (
    <div style={{display:'flex', flexFlow: 'column wrap', justifyContent: 'left'}}>
      <h3>Ingredients</h3>
      <ul style={{listStyleType: 'none',width: '100%'}}>
        {
            (ingredients || []).map((item, index) => (
              <li key={index}
                style = {{margin: "5px"}}
                draggable
                onDragStart={(e)=>startDrag(e, index)}
                onDragOver={(e)=>setEclipsing(index)}
                onDragLeave={()=>setEclipsing(null)}
                onDragEnd={()=>dropDrag()}
              >
                <input
                  style = {{margin: "0px", width: '80%', transition: ".3s",
                    backgroundColor:(eclipsing == index) ? hoverColor : "#ffffff",
                    border:(eclipsing == index) ? "solid thin #dfd" : "solid thin #555",
                    marginTop:(eclipsing == index && eclipsing < dragging) ? "20px" : "0px",
                    marginBottom:(eclipsing == index && eclipsing > dragging) ? "20px" : "0px"}}
                  type="text"
                  value={item}
                  onChange={(e) => updateIngredients(e, index)}
                />
                <span style={{ color: '#a00', fontWeight: 'bold', marginLeft:'15px'}} onClick={()=>removeIngredients(index)}><i class="fa fa-trash"></i></span>
              </li>
            ))
        }
        <li>
          <form onSubmit={addIngredients}>
            <input
              style = {{margin: "5px"}}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </li>
      </ul>
    </div>
  )
}

export { UpdateIngredients };
