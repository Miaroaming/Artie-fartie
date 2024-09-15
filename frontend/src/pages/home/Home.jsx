import { useEffect, useState } from 'react'

const Home = () => {
  const [ crafts, setCrafts ] = useState( null )

  useEffect(() => {
    const fetchCrafts = async () => {


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
