// Imports
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCraftsContext } from '../../hooks/useCraftsContext';
import CraftForm from '../../components/nav/craftform/CraftForm'
import CraftDetails from '../../components/nav/craftdetails/CraftDetails'
// scss import
import './home.scss'

const baseURL = import.meta.env.VITE_API_BASE_URL

// Start of Home functionality
const Home = () => {
  const {crafts, dispatch} = useCraftsContext()
  const [myCrafts, setMyCrafts] = useState(null)
  const [showForm, setShowForm] = useState(false);
  const [ selectedType, setSelectedType ] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user?.email; // Check if user exists before accessing email
  const [showMyCraftsTitle, setShowMyCraftsTitle] = useState(false);

  const handleMyCrafts = () => {
    setMyCrafts(true);
    setShowMyCraftsTitle(true);
  }

  const handleAllCrafts = () => {
    setMyCrafts(null); 
    setShowMyCraftsTitle(false);
  }

  const handleAddCrafts = () => {
    setShowForm(!showForm);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredCrafts = crafts && crafts.filter((craft) => {
    const matchesType = selectedType === '' || craft.type === selectedType;
    const matchesMyCrafts = !myCrafts || craft.user_id === user_id;
    return matchesType && matchesMyCrafts;
  });
  
  useEffect(() => {
    const fetchCrafts = async () => {

      const response = await axios.get(`${baseURL}/api/crafts/`)

      if (response.status === 200) {
        console.log(response.data)
        dispatch({type: 'SET_CRAFTS', payload: response.data})

      }
    }

    fetchCrafts()
  }, [])

  // Home Output
  return (

    <div className='home'>
      <div className='cardboard-header'>
        <img className='home-title-img' src='/images/home-title-img.webp' alt='' />
      </div>
      
      <div className='crafts'>

        <div className='btns-cont'>
          <div id='three-btns'>
            <div className='craft-btn-image'>
              <button onClick={handleMyCrafts} disabled={!user} className='my-craft-button'>My Crafts</button>
            </div>
            <div className='craft-btn-image'>
              <button onClick={handleAllCrafts}>All Crafts</button>
            </div>
            <div className='craft-btn-image'>
              <select
                value={ selectedType }
                onChange={ handleTypeChange }>
              <option value="">All Types</option>
              <option value="Crochet">Crochet</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Pottery">Pottery</option>
              <option value="Painting">Painting</option>
              </select>
            </div>
          </div>
          

        <div id='craft-btn-image' disabled={!user}>
          <button className='add-craft-btn' onClick={handleAddCrafts} disabled={!user}> {showForm ? "Cancel" : "Add Craft + "}</button>
        </div>

        </div>
        {showForm && (
        <CraftForm/>
        )}
        </div>
        {showMyCraftsTitle && <h2 className='my-crafts-title'>My Crafts</h2>}

        <div className='card-posts-cont'>
          {filteredCrafts && filteredCrafts.map((craft) => (
            <CraftDetails key={craft._id} craft={craft} />
          ))}
      </div>

    </div>

  )
}

export default Home
