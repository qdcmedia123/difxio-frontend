import React, {useState, useEffect} from 'react';
import { getError } from 'utils/error';
import axios from 'axios';
import { baseURI } from 'config/networks';
import './film.scss';

const FilmShow = () => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [films, setFilms] = useState([]);
    useEffect(() => {
        const fetchFilm = async () => {
            setError(null);
            setLoading(true);
            try {
                const res = await axios.get(`${baseURI}/api/films`);
                setFilms(res.data);
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(getError(err));
            }

        }
        fetchFilm();
    }, []);
    return (
        <div>
            <div className="sec-nav">
                Create
            </div>
            {error && <div>{error}</div>}
            <div className="film-list">
                {!loading && films.length > 0 && <div>Film full detail</div>}
            </div>
        </div>
    );
};



export default FilmShow;