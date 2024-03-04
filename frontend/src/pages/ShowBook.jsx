import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
  return (
    <div className='p-4 min-h-screen p-6 bg-slate-900'>
        <BackButton />
        <h1 className='text-3xl my-4 text-slate-300'>Show Book</h1>
        {loading ? (
            <Spinner />
        ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-8 rounded-lg my-5'>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Id</span>
                    <span className='text-slate-300'>{book._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Title</span>
                    <span className='text-slate-300'>{book.title}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Author</span>
                    <span className='text-slate-300'>{book.author}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                    <span className='text-slate-300'>{book.publishYear}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                    <span className='text-slate-300'>{new Date(book.createAt).toString()}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-gray-500'>Last Updated Time</span>
                    <span className='text-slate-300'>{new Date(book.updatedAt).toString()}</span>
                </div>
            </div>
        )}
    </div>
  )
}

export default ShowBook