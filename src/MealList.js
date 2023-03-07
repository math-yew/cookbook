import React, { useState, useEffect } from 'react';
import MealListService from './MealListService';
import RecipeService from './RecipeService';
import { useLocation } from 'react-router-dom';

const MealList = (props) => {

  const location = useLocation();
  const [id, setId] = useState(null);
  const [recipeData, setRecipeData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [name, setName] = useState();
  const [recipesArrived, setRecipesArrived] = useState(false);
  const [listArrived, setListArrived] = useState(false);


  useEffect(() => {
    setRecipesArrived(false);
    setListArrived(false);

    RecipeService.getAllRecipes()
      .then(res => {
        setRecipeData(res.data);
        let cleanList = res.data.map((r)=>({id: r._id, title: r.title}));
        setRecipes(cleanList);
        setRecipesArrived(true);
      });

    MealListService.getMealList(location.state.id)
      .then(res => {
        setId(location.state.id);
        if(res.data != null){
          setData(res.data[0]);
          setName(res.data[0].name);
          let cleanList = res.data[0].mealDetails.map((r)=>({ id: r._id, title: r.title}));
          setList(cleanList);
          setListArrived(true);
        }
      });

  }, []);

  useEffect(() => {
    if(recipesArrived && listArrived) cleanRecipeList();
  }, [recipesArrived, listArrived]);

  const cleanRecipeList = () => {
    let usedIds = list.map((r)=>r.id) || [];
    let unUsedIds = recipes.filter((r)=>usedIds.indexOf(r.id) == -1);
    setRecipes(unUsedIds);
  }

  let dataStructure = {
    name: name
  };

  const saveCase = () => {
    let readyData = dataStructure;
    // readyData.ingredients = ingredients;
    console.log("readyData: " + JSON.stringify(readyData));
    if(!!id){
      MealListService.updateMealList(id, readyData)
      .then((res)=>{
        if(res.status == '200') setId(id);
      });
    }else {
      readyData.startDate = new Date();
      console.log(readyData.startDate);
      MealListService.postMealList(readyData)
      .catch(err => console.log(err));
    }
  }

  return (
    <>
      <h1>{name}</h1>
      <div style={{display:"flex", flexFlow:"row", width:"50%"}}>
        <div style={{width:"50%"}}>
          {(recipes || []).map((job, i)=>(
            <div key={i} className="caseCard" style={{backgroundColor:(job.archive) ? '#88d6d4' : '#e2fdff'}} onClick={()=>setId(job.id)}>
              <h3 style={{margin: '0px'}}>{job.title}</h3>
              <p>{job.id}</p>
            </div>
          ))}
        </div>
        <div style={{width:"50%"}}>
          {
            (list || []).map((item, i) => (
              <div key={i} className="caseCard" style={{backgroundColor:false ? '#88d6d4' : '#e2fdff'}}>
                <h3 style={{margin: '0px'}}>{item.title}</h3>
                <p>{item.id}</p>
              </div>
            ))
          }
        </div>
      </div>


      <p>:{JSON.stringify(recipes, null, 2)}</p>
      <p>:{JSON.stringify(list, null, 2)}</p>

    </>
  )

}

export default MealList;
