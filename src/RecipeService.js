import axios from 'axios';

const RecipeService = {

  getAllRecipes: async function(showArchived){
    let result;
    await axios.get(`http://localhost:3005/recipes/${showArchived}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  getRecipe: async function(id){
    let result;
    await axios.get(`http://localhost:3005/data/${id}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  updateRecipe: async function(id, readyData){
    let result;
    await axios.put(`http://localhost:3005/data/${id}`, readyData)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  postRecipe: async function(readyData){
    let result;
    axios.post('http://localhost:3005/data', readyData)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  deleteRecipe: async function(id){
    let result;
    axios.delete(`http://localhost:3005/data/${id}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  }
}

export default RecipeService;
