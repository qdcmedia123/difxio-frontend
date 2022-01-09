import React, { useEffect, useState } from 'react';
import FileList from './Film.list';
import { baseURI } from 'config/networks';
import axios from 'axios';

import './film.scss';
import { getError } from 'utils/error';

const FilmIndex = () => {
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
            <div className="film-list">
                {films.length > 0 && <FileList films={films}/>}
            </div>
        </div>
    );
};


export default FilmIndex;