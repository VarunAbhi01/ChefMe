import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';



// these URLs are from MEALDB
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

const AppContext = React.createContext() // AppContext has 2 comp of which provider is wrapped around the req data to be passed i.e. value here and that data will be stored in AppProvider.

const AppProvider = ({children}) => {     //  children is a special prop like a syntax

  // ////////////////////////////////////////////////////////////////////////////////////////       STATE FUNCTIONS

const [meals , setMeals] = useState( [ ] ) //let it be empty data initially
const [ loading, setLoading ] = useState( [ false] )  
const [ searchTerm , setSearchTerm] = useState('')

const[showModal,setShowModal] = useState(false)

const [selectedMeal, setSelectedMeal] = useState(null)
  
const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

// ////////////////////////////////////////////////////////////////////////////////////////////   FUNCTIONS

const fetchMeals = async(url) =>{
  setLoading(true)  //as fetching is slow at start so loading will be displayed
    try {
      const {data} = await axios(url)  // data has meals array in which meals lies in it 
      if(data.meals){  //checking No items case
        setMeals(data.meals)            
      }
      else{
        setMeals( [] )
      }
   
    } catch (error) {
              console.log(error)
    } 
    setLoading(false)
  }

    const fetchRandomMeal = () =>{
     fetchMeals(randomMealUrl)
      }

    const selectMeal = (idMeal, favoriteMeal) => {  
      var meal;
      if (favoriteMeal){
        meal = favorites.find((meal) => meal.idMeal === idMeal);
      }
        meal = meals.find((meal) => meal.idMeal === idMeal);
      
      setSelectedMeal(meal);
      setShowModal(true)
    }

    const closeModal = () => {
      setShowModal(false)
    }

    const addToFavorites = (idMeal) => {
      const meal = meals.find((meal) => meal.idMeal === idMeal);
      const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
      if (alreadyFavorite) return
      const updatedFavorites = [...favorites, meal]
      setFavorites(updatedFavorites)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }
    const removeFromFavorites = (idMeal) => {
      const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
      setFavorites(updatedFavorites)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }
// ///////////////////////////////////////////////////////////////////////////////////////     USE EFFECTS
    useEffect(() => {
      fetchMeals(allMealsUrl)
    }, [])

    useEffect( () => {
      if (!searchTerm) return 
      fetchMeals( `${allMealsUrl}${searchTerm}` )  //IMPORTANT apostrophe 
        }, [searchTerm] ) // allMealsUrl is passed to get meals data from it
        

     return <AppContext.Provider value= { {meals,loading,setSearchTerm,fetchRandomMeal,showModal,
                                          selectMeal,selectedMeal,closeModal,addToFavorites,
                                          removeFromFavorites,favorites} }> {children} </AppContext.Provider> //WHERE IS MEALS DATA  
 }

export const useGlobalContext = () => {
    return useContext(AppContext)  //this will extract the meals data which equals value data.
}


 export { AppContext , AppProvider}
