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
  const [ingredients, setIngredients] = useState([]);


  useEffect(() => {
    console.log(location.state.id);
    RecipeService.getRecipe(location.state.id)
      .then(res => {
        setId(location.state.id);
        setData(res.data);
        setTitle(res.data.title);
        setInstructions(res.data.instructions);
        setIngredients(res.data.ingredients);
      });
  }, []);

  let dataStructure = {
    title: title,
    instructions: instructions,
    ingredients: []
  };

  const saveCase = () => {
    let readyData = dataStructure;
    readyData.ingredients = ingredients;
    console.log("readyData: " + JSON.stringify(readyData));
    if(!!id){
      RecipeService.updateRecipe(id, readyData)
      .then((res)=>{
        if(res.status == '200') setId(id);
      });
    }else {
      readyData.startDate = new Date();
      console.log(readyData.startDate);
      RecipeService.postRecipe(readyData)
      .catch(err => console.log(err));
    }
  }

  return (
    <>
      <h1>{title}</h1>
      <ul>
        {(ingredients || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
      <p>{instructions}</p>

      <UpdateRecipe
        title={title}
        setTitle={setTitle}
        instructions={instructions}
        setInstructions={setInstructions}
        ingredients={ingredients}
        setIngredients={setIngredients}
        saveCase={saveCase}
      />
    </>
  )

}

export default Recipe;
