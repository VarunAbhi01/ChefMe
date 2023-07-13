import logo from './logo.svg';
import './App.css'; 
import Favourites from './Components/Favourites';
import Meals from './Components/Meals';
import Modal from './Components/Modal';
import Search from './Components/Search';
import { useGlobalContext } from './context';

function App() {

  const {showModal,favorites} = useGlobalContext()

  return (
    <main>

      <Search/>

      {favorites.length > 0 && <Favourites/>}

      <Meals/> 

      { showModal && <Modal/> }  
       {/* this means only if showModalis true Modal will be displayed */}

    </main>
  );
}

export default App;
