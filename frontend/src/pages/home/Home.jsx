// Imports
import { useEffect, useState } from 'react'
import axios from 'axios'
import CraftDetails from '../../components/nav/craftdetails/CraftDetails'
// scss import
import './home.scss'

// Start of Home functionality
const Home = () => {
  const [ crafts, setCrafts ] = useState( null )

  useEffect(() => {
    const fetchCrafts = async () => {
      const response = await axios.get( 'http://localhost:4000/api/crafts/' )

      if ( response.status === 200 ) {
        setCrafts( response.data )
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
