import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCraftsContext } from '../../hooks/useCraftsContext'

import CraftDetails from '../../components/nav/craftdetails/CraftDetails'
import CraftForm from '../../components/nav/craftdetails/CraftForm'

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

  return (

    <div>
      HOME
    </div>

  )
}

export default Home
