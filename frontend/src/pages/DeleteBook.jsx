import React, {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import NavBar from '../components/Home/NavBar'

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book Deleted Successfully', {variant: 'success'})
      navigate('/');

    })
    .catch((error) => {
      setLoading(false);
      // alert('Error deleting book');
      enqueueSnackbar('Error deleting book', {variant: 'error'})
      console.log(error);
    })
  }

  return (
    <div className='min-h-screen p-6 bg-slate-900'>
      <NavBar />
      <div className='my-6'>
      <BackButton />
      </div>
      <h1 className='text-3xl my-4 text-slate-300'>Delete Book</h1>
      {loading ? <Spinner /> : ''}  
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto rounded-lg'>
        <h3 className='text-2xl text-slate-300'>Are you Sure You want to delete this book?</h3>

        <button className='p-4 bg-red-600 text-white m-8 w-full rounded-md' onClick={handleDeleteBook}>Yes, Delete it</button>

      </div>
    </div>
  )
}

export default DeleteBook