import React, { useState, useEffect } from 'react';

import { UpdateIngredients } from './UpdateIngredients';

function UpdateRecipe(props) {

  const {title, setTitle, instructions, setInstructions, ingredients, setIngredients, saveCase, deleteRecipe} = props;

  return (
    <>
      <input style={{width:"100%"}} type="text" placeholder="Name" value={title ||""} onChange={(e)=>setTitle(e.target.value)} />
      <textarea style={{width:"100%"}} type="text" placeholder="Name" value={instructions ||""} onChange={(e)=>setInstructions(e.target.value)} />
      <UpdateIngredients
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <button  onClick={()=>saveCase()}>Save?</button>
      <button  onClick={()=>deleteRecipe()}>Delete</button>
    </>
  )

}

export {UpdateRecipe};
