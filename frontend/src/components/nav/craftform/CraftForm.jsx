import { useState } from 'react';
import axios from 'axios'
import { useCraftsContext } from '../../../hooks/useCraftsContext';
import './craftForm.scss'


const CraftForm = () => {
    // dispatch for useContext
    const { dispatch } = useCraftsContext()
    // Input States
    const [imageURL, setImageURL] = useState( null )
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [material, setMaterial] = useState('')
    const [price, setPrice] = useState('')
    const [notForSale, setNotForSale] = useState( false )
    const [anonymous, setAnonymous] = useState( false )
    // Error State
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user.email;
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('imageURL', imageURL);  // Make sure imageURL is set correctly
        formData.append('type', type);
        formData.append('description', description);
        formData.append('material', material);
        formData.append('price', price);
        formData.append('notForSale', notForSale);  // Should be boolean
        formData.append('anonymous', anonymous);    // Should be boolean
        formData.append('user_id', user_id);
    
        try {
            const response = await axios.post('http://localhost:4000/api/crafts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
    
            // Reset form fields
            setTitle('');
            setType('');
            setDescription('');
            setMaterial('');
            setPrice('');
            setNotForSale(false);
            setAnonymous(false);
            setError(null);
    
            console.log('new craft added', response.data);
            dispatch({ type: 'CREATE_CRAFTS', payload: response.data });
    
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    // CraftForm Output
    return (

        // Create Craft Form
        <>
        <div id='graphpaper'>
        <div className='create-craft-post-container'>

            <h3>Create your Craft</h3>
            <form className='create-craft-post-form' onSubmit={ handleSubmit }>

                {/* Title Input */}
                <div className='craft-post-input'>

                    <label className='craft-post-label'>Title:</label>
                    <div className='box-background'>
                        <input 
                        type='text'
                        onChange={( e ) => setTitle( e.target.value )}
                        value={ title }
                    /></div>
                    

                </div>

                {/* Description Input */}
                <div className='craft-post-input'>

                    <label className='craft-post-label'>Description:</label>
                    <div className='box-background'>
                    <input 
                        type='text'
                        onChange={( e ) => setDescription( e.target.value )}
                        value={ description }
                    />
                    </div>
                    

                </div>


                {/* Type Input */}
                <div className='craft-post-input'>

                    <label className='craft-post-label'>Type:</label>
                    <div className='box-background'>
                        <select 
                            onChange={( e ) => setType( e.target.value )}
                            value={ type }
                        >
                            <option value=''>Select a Type</option>
                            <option value='Crochet'>Crochet</option>
                            <option value='Embroidery'>Embroidery</option>
                            <option value='Painting'>Painting</option>
                            <option value='Pottery'>Pottery</option>
                            <option value='Jewellery'>Jewellery</option>
                            <option value='Other'>Other</option>

                        </select>
                    </div>
                    

                </div>

                {/* Description Input */}
                <div className='craft-post-input'>

                    <label className='craft-post-label'>Materials:</label>
                    <div className='box-background'>
                    <input 
                        type='text'
                        onChange={( e ) => setMaterial(e.target.value )}
                        value={ material }
                    />
                    </div>
                    

                </div>

                {/* Not For Sale Checkbox */}
                <div className='craft-post-input' id='not-for-sale'>
                    <input 
                        type='checkbox'
                        onChange={( e ) => setNotForSale( e.target.checked )}
                        value={ notForSale }
                    />
                    <label className='craft-post-label'>Not For Sale</label>
                </div>

                {/* Image Upload */}
                <div className='craft-post-input'>

                    <label className='craft-post-label'>Image:</label>
                    <input 
                        id='image-upload'
                        type='file'
                        onChange={( e ) => setImageURL( e.target.files[ 0 ] )}
                        accept='image/*'
                    />

                </div>

                {/* Price Input */}
                <div className='craft-post-input'>

                    <label className='craft-post-label'>Price: ($)</label>
                    <div className='box-background'>
                    <input 
                        type='number'
                        onChange={( e ) => setPrice( e.target.value )}
                        value={ price }
                    />
                    </div>

                </div>

                {/* Anonymous Checkbox */}
                <div className='craft-post-input' id='post-anon'>
                    <input 
                        type='checkbox'
                        onChange={( e ) => setAnonymous( e.target.checked )}
                        value={ anonymous }
                    />
                    <label className='craft-post-label'>Post Anonymously</label>
                </div>

                <div id='add-post-btn'>
                    <button>Add Post</button>
                </div>
                { error && <div className='error'>{ error }</div>}

            </form>


            </div>

        </div>
        
        </>
        
        
  )
}

export default CraftForm
