import {React,useState} from 'react';

const AddPostForm = () => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [postWillDeliver, setPostWillDeliver] = useState(false);
  const [postDescription, setPostDescription] = useState('');
  return (
    <div style={{
      backgroundColor: (formIsOpen ? "#DCDCDC" : null)
    }} className='add-post-form'>
    <button onClick={(event) => {
        event.preventDefault();
        setFormIsOpen(!formIsOpen);
      }
    } className="add-post-button"><strong>{formIsOpen ? "-" : "+"}</strong></button>

    {
      formIsOpen ? (
        <>
          <h2>Sell Item</h2>
          <form className="post-form" onSubmit={() => {
            event.preventDefault();
            console.log('title: ', postTitle);
            console.log('price: ', postPrice);
            console.log('location: ', postLocation);
            console.log('delivery: ', postWillDeliver);
            console.log('description: ', postDescription);
            setPostTitle('');
            setPostPrice('');
            setPostLocation('');
            setPostWillDeliver(false);
            setPostDescription('');
          }}>

            <label htmlFor="post-title">Name </label>
            <input required={true} type="text" name="post-title" placeholder="Enter Name" value={postTitle} onChange={(event) => setPostTitle(event.target.value)}/>
            <br/>

            <label htmlFor="post-price">Price </label>
            <input required={true} type="text" name="post-price" placeholder="Enter Price" value={postPrice} onChange={(event) => setPostPrice(event.target.value)}/>
            <br/>

            <label htmlFor="post-location">Location </label>
            <input type="text" name="post-location" placeholder="Enter Location" value={postLocation} onChange={(event) => setPostLocation(event.target.value)}/>

            <label htmlFor="post-will-deliver"> Will Deliver? </label>
            <input type="checkbox" name="post-will-deliver" value={postWillDeliver} onChange={(event) => setPostWillDeliver(event.target.checked)}/>
            <br/>

            <label htmlFor="post-description">Description </label>
            <textarea required name="post-description" placeholder="Describe item..." rows="4" cols="50" value={postDescription} onChange={(event) => setPostDescription(event.target.value)} />
            <br />

            <input type="submit" value="Post" />
          </form>
        </>
      ) : null
    }
    </div>
  )
}

export default AddPostForm;
