import { useGlobalContext } from "../context"
import {BsHandThumbsUp} from 'react-icons/bs'

const Meals = () => {
    const {meals,loading,selectMeal,addToFavorites} = useGlobalContext()   // imported the meals array data from context

// SETTING UP LOADING
if(loading) {
  return <section className="section">
    <h4>...Loading...</h4>
  </section>
}

// SET UP NO ITEMS case
if(meals.length < 1){
  return <section className="section">
    <h4>Sorry!! Your search didn't matched any menu item. Please try again. </h4>
  </section>
}

// SETTING UP MEALS DISPLAY
    return <section className="section-center">      
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal  //those are the properties of each item can be seen in log
      return <article key={idMeal} className="single-meal" >   
        <img src={image} onClick={() => selectMeal(idMeal)} style={{width:'200px'}} className="img" />
        <footer>
          <h5>{title}</h5>
          <button className='like-btn' onClick={() => addToFavorites(idMeal)}>< BsHandThumbsUp/>  </button>
        </footer>
      </article>
    })}
  </section>
}

export default Meals