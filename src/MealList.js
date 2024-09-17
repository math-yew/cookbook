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
  const [actionStepsTaken, setActionStepsTaken] = useState();
  const [recipesArrived, setRecipesArrived] = useState(false);
  const [listArrived, setListArrived] = useState(false);

  const [dragging,setDragging] = useState(null);
  const [eclipsing,setEclipsing] = useState(null);
  const [hoverColor,setHoverColor] = useState("#ffffff");


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

  const startDrag = (e, index) => {
    setDragging(index)
    setHoverColor("#aaffaa");
  }

  const dropDrag = (e) =>{
    let to = eclipsing;
    let from = dragging;
    setHoverColor("#ffffff");
    if(to != null  && from != null){
      let arr = actionStepsTaken;
      to = (from >= to) ? to : to + 1;
      let toRemove = (from >= to) ? from +1 : from;
      arr.splice(to, 0, arr[from]);
      arr.splice(toRemove,1);
      setActionStepsTaken(arr);
    }
  };

  return (
    <>
      <h1>{name}</h1>
      <div style={{display:"flex", flexFlow:"row", width:"50%"}}>
        <div style={{width:"50%"}}>
          {(recipes || []).map((job, i)=>(
            <div key={i} className="caseCard"
              style={{backgroundColor:(job.archive) ? '#88d6d4' : '#e2fdff'}}
              draggable
              onDragStart={(e)=>startDrag(e, i)}
              onDragOver={(e)=>setEclipsing(i)}
              onDragLeave={()=>setEclipsing(null)}
              onDragEnd={()=>dropDrag()}
              >
              <h3 style={{margin: '0px'}}>{job.title}</h3>
              <p>{job.id}</p>
            </div>
          ))}
        </div>
        <div style={{width:"50%"}}>
          {
            (list || []).map((item, i) => (
              <div key={i} className="caseCard"
                style={{backgroundColor:false ? '#88d6d4' : '#e2fdff'}}
                draggable
                onDragStart={(e)=>startDrag(e, i)}
                onDragOver={(e)=>setEclipsing(i)}
                onDragLeave={()=>setEclipsing(null)}
                onDragEnd={()=>dropDrag()}
                >
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
