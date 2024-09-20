import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const SinglePage = () => {
  //  use Navigate unction
  const navigate = useNavigate()
  
  // loading state
  const { id } = useParams()

  // id from url
  const [ loading, setLoading ] = useState ( true )

  // state for single craft
  const [ craft, setCraft ] = useState (null)

  // Use Effect \calling crafts
  useEffect(() => {
    axios.get(`http://localhost:4000/api/crafts/${ id }`)
      .then((res) => {
        console.log(res.data);
        setCraft(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    
  }, [ id ]);

  // loading state returned
  if ( loading ) {
    return <div>Loading...</div>
  }

  // return project after loaded
  if ( !craft ) {
    return <div>Craft not found </div>
  }



  return (
    <>

      <div className='single-craft-container'>
        <div className='top-single-craft-container'>

          <button className='back-button' onClick={() => navigate( -1 )}>Go back</button>
          <h1>user</h1>
          <div></div>

        </div>
        

        <div className='bottom-single-craft-container'>

          <div className='left-single-craft-container'>
            { craft.image && (
              <img src={`http://localhost:4000/public/uploads/${ craft.image }`} alt='craft' />
            )}

            <div className='bottom-left-single-craft-container'>
              <h3>{ craft.title }</h3>
              <h3>{ craft.price }</h3>
            </div>

          </div>
          
          <div className='right-single-craft-container'>

            <div className='right-top-single-craft-container'>
              <h3>{ craft.type }</h3>
              <h3>For Sale</h3>
              <h6>Created by:</h6>
              <p>{ craft.description }</p>
              <p>{ craft.materials }</p>

            </div>

            <div className='right-bottom-single-craft-container'>
              <h6>Posted { formatDistanceToNow( new Date( craft.createdAt ),{ includeSeconds: true }, { addSuffix: true })} ago </h6>
            </div>

            <button className='buy-button'>Buy Now</button>
            
          </div>
        </div>
      </div>

    </>
  )
}

export default SinglePage
