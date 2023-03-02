import axios from 'axios';

const MealListService = {

  getAllMealLists: async function(showArchived){
    let result;
    await axios.get(`http://localhost:3005/mealLists/${showArchived}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  getMealList: async function(id){
    let result;
    await axios.get(`http://localhost:3005/meallist/${id}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  updateMealList: async function(id, readyData){
    let result;
    await axios.put(`http://localhost:3005/data/${id}`, readyData)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  postMealList: async function(readyData){
    let result;
    axios.post('http://localhost:3005/data', readyData)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  deleteMealList: async function(id){
    let result;
    axios.delete(`http://localhost:3005/data/${id}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  }
}

export default MealListService;
