import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Edit(props) {
    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    //the <Route path>.

    let { id } = useParams();

    // update arrays using the React useState()
    // and without the Array objects push() method
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");

    // useNavigate return a function that we can use to navigate
    const navigate = useNavigate();

    //useEffect Hook is similar componentDidMount
    useEffect(() => {
        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the
        //url.
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Assign Response data to the arrays using useState.
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    
    //  Form to handle the edit 
    const handleSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };
        //  axios to update the book info
        axios.put('http://localhost:4000/api/book/' + id, newBook)
            .then((res) => {
                console.log(res.data);
                navigate('/read');
            });
    }
    return (

        <div>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Edit Book Title: </label>
                    <input type="text" className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Edit Release Year: </label>
                    <input type="text" className="form-control"
                        value={cover}
                        onChange={(e) => setCover(e.target.value)} />
                </div>

                <div className="form-group">

                </div>

                <div>
                    <label>Edit cover Url: </label>
                    <input type="text" className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" />
                </div>
            </form >
        </div >
    );
}