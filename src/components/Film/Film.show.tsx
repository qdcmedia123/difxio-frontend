import React, { useState, useEffect } from 'react';
import { getError } from 'utils/error';
import axios from 'axios';
import { baseURI } from 'config/networks';
import { useParams } from 'react-router-dom';
import FilmList from './Film.list';
import { useTypedSelector } from 'hooks/use-typed-selector';
import './film.scss';
import './comments.scss';



axios.defaults.withCredentials = true;

const FilmShow = () => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [film, setFilm] = useState([]);
    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState<null | string>(null);

    const state = useTypedSelector((state) => state);
    const { auth: { isAuthenticated } } = state;

    const { id } = useParams();
    useEffect(() => {
        const fetchFilm = async () => {
            setError(null);
            setLoading(true);
            try {

                const reqOne = axios.get(`${baseURI}/api/films/${id}`);
                const reqTwo = axios.get(`${baseURI}/api/comments/${id}`);
                const response = await axios.all([reqOne, reqTwo]);
                setFilm(response[0].data);
                setComments(response[1].data)
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(getError(err));
            }

        }
        fetchFilm();
    }, [id]);

    const commentHandler = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post(`${baseURI}/api/comments`, {
                film_id: id,
                comment: comment
            });

        } catch (err) {
            console.log(err);
        }
    }
    const onChange = (e: any) => {
        setComment(e.target.value)
    }
    return (
        <div>
            <div className="sec-nav">

            </div>
            Show film details
            {error && <div>{error}</div>}
            <div className="film-list">
                {!loading && film.length > 0 && <div>
                    <FilmList films={[...film]} details={true} />
                </div>}
            </div>
            {isAuthenticated && <div className="write-comment">
                <form onSubmit={commentHandler}>
                    <textarea name="" id="" cols={10} rows={10} onChange={onChange}>{comment}</textarea>
                    <button type="submit" className='btn btn--primary'>Submit</button>
                </form>
            </div>}

            <div className="comments">
                {!loading && comments.length > 0 && comments.map(comment => <div className="row" key={comment.id}>
                    <div className="col avatar">
                        <img src="https://gravatar.com/avatar/a0829573c28b7d7f9aedc82ec6240786?s=400&d=robohash&r=x" alt="" />
                    </div>
                    <div className="col">
                        <div className="user-id"> User ID: {comment.user_id}</div>
                        <div className="name">Test User </div>
                        <div className="text">
                            {comment.comment}
                        </div>
                    </div>
                </div>)}


            </div>
        </div>
    );
};



export default FilmShow;