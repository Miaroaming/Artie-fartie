// Imports
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCraftsContext } from '../../hooks/useCraftsContext';
import CraftForm from '../../components/nav/craftform/CraftForm'
import CraftDetails from '../../components/nav/craftdetails/CraftDetails'
// scss import
import './home.scss'


// Start of Home functionality
const Home = () => {
  const {crafts, dispatch} = useCraftsContext()
  const [myCrafts, setMyCrafts] = useState(null)
  const [showForm, setShowForm] = useState(false);

  const handleMyCrafts = () => {
    setMyCrafts(true)
  }

  const handleAllCrafts = () => {
    setMyCrafts(null)
  }

  const handleAddCrafts = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchCrafts = async () => {

      const response = await axios.get('http://localhost:4000/api/crafts')

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
        <img className='home-title-img' src="/images/home-title-img.webp" alt="" />
      </div>
      
      <div className='crafts'>
        <div className='btns-cont'>
          <div id='three-btns'>
            <div className='craft-btn-image'>
              <button onClick={handleMyCrafts}>My Crafts</button>
            </div>
            <div className='craft-btn-image'>
              <button onClick={handleAllCrafts}>All Crafts</button>
            </div>
            <div className='craft-btn-image'>
              <select>
              <option value="all">All Types</option>
              <option value="Crochet">Crochet</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Pottery">Pottery</option>
              <option value="Painting">Painting</option>
              </select>
            </div>
          </div>
          

          <div id='craft-btn-image'>
            <button className='add-craft-btn' onClick={handleAddCrafts}> {showForm ? "Cancel" : "Add Craft + "}</button>
          </div>
          
          
        </div>

        {showForm && (
        <CraftForm/>
        )}
          
          {myCrafts ? (crafts && crafts.map((craft) => {
            const user = JSON.parse(localStorage.getItem('user'))
            const user_id = user.email
              if (craft.user_id === user_id) {
                return (
                
                    <CraftDetails key={craft._id} craft={craft}/>
                  
                )
              }
            })) :  ( crafts && crafts.map (( craft ) => {
                  return (
                        <CraftDetails key={ craft._id } craft={craft}/>
                  )
              }))}
        </div>
        
    </div>

  )
}

export default Home
