import { useState} from "react"
import { useGlobalContext } from "../context"

const Search = () => {

    const [text, setText] = useState("")
    const {setSearchTerm,fetchRandomMeal,fetchMeals,allMealsUrl} = useGlobalContext()

    const handleChange = (e) =>{
        setText(e.target.value)  // setting input text into state variable
    } 
    const handleSubmit = (e) => {
        e.preventDefault()
        if(text){
            setSearchTerm(text);
        }
             
    }

    const handleRandomMeal = () =>{
        setSearchTerm( '' )
        setText('')
        fetchRandomMeal()
    }

    return <header className="search-container">
        <form onSubmit={handleSubmit}> 
            <input type = "text" onChange={handleChange} value={text} placeholder="What's your favourite meal" className="form-input" />
            <button type="submit" className="btn">Search 🔎</button>
            <button type="btn" className="btn btn-hipster" onClick={handleRandomMeal}>Surprise 🎊</button>
        </form>
    </header>
}

export default Search