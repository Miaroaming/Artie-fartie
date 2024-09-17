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

  const handleMyCrafts = () => {
    setMyCrafts(true)
  }

  const handleAllCrafts = () => {
    setMyCrafts(null)
  }

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
        <div className='crafts'>
        <button onClick={handleMyCrafts}>My Crafts</button>
        <button onClick={handleAllCrafts}>All Crafts</button>
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
        <CraftForm/>
    </div>

  )
}

export default Home
