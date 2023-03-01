import React, { useState, useEffect } from 'react';

function UpdateRecipe(props) {

  const {title, setTitle, instructions, setInstructions, ingredients, setIngredient} = props;

  return (
    <>
      <input style={{width:"100%"}} type="text" placeholder="Name" value={title ||""} onChange={(e)=>setTitle(e.target.value)} />
      <p>{instructions}</p>
      {(ingredients || []).map((item, index) => (
          <p key={index}>{item}</p>
        ))}
    </>
  )

}

export {UpdateRecipe};
