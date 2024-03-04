import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import NavBar from '../components/Home/NavBar'

const EditBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setTitle(response.data.title);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('Error fetching book');
      console.log(error);
    })
  }, [])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/books/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book Updated Successfully', {variant: 'success'})
      navigate('/');
    }) 
    .catch((error) => {
      setLoading(false);
      // alert('Error creating book');
      enqueueSnackbar('Error updating book', {variant: 'error'})
      console.log(error);
    })
  };

  return (
    <div className='min-h-screen p-6 bg-slate-900'>
      <NavBar />

      <div className='my-6'>
      <BackButton />
      </div>
      <h1 className='text-3xl my-4 text-slate-300'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto rounded-lg'>
        <div className='my-4'>
          <label className='text-xl mr-4  text-slate-300'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full rounded-md'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-slate-300'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full rounded-md'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-slate-300'>Publish Year</label>
          <input type='text' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-grey-500 px-4 py-2 w-full rounded-md'/>
        </div>
        <button className='p-2 bg-indigo-800 text-white my-7 rounded-md w-120' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook