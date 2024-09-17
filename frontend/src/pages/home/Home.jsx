// Imports
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCraftsContext } from '../../hooks/useCraftsContext'
import CraftForm from '../../components/nav/craftdetails/CraftForm'
import CraftDetails from '../../components/nav/craftdetails/CraftDetails'
// scss import
import './home.scss'

// Start of Home functionality
const Home = () => {
  const {crafts, dispatch} = useCraftsContext()

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
            { crafts && crafts.map (( craft ) => {
                return (
                      <CraftDetails key={ craft._id }>{ craft.title }</CraftDetails>
                )
            })}
        </div>
    </div>

  )
}

export default Home
