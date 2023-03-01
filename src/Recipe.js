import React, { useState, useEffect } from 'react';
import RecipeService from './RecipeService';
import { UpdateRecipe } from './UpdateRecipe';
import { useLocation } from 'react-router-dom';

const Recipe = (props) => {

  const location = useLocation();
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState();
  const [instructions, setInstructions] = useState();
  const [ingredients, setIngredient] = useState([]);


  useEffect(() => {
    console.log(location.state.id);
    RecipeService.getRecipe(location.state.id)
      .then(res => {
        setId(location.state.id);
        setData(res.data);
        setTitle(res.data.title);
        setInstructions(res.data.instructions);
        setIngredient(res.data.ingredients);
      });
  }, []);

  return (
    <>
      <h1>{title}</h1>
      {(ingredients || []).map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      <p>{instructions}</p>

      <UpdateRecipe
        title={title}
        setTitle={setTitle}
        instructions={instructions}
        setInstructions={setInstructions}
        ingredients={ingredients}
        setIngredient={setIngredient}
      />
    </>
  )

}

export default Recipe;
