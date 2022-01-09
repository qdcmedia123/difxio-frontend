import React, { useEffect, useState } from 'react';
import FileList from './Film.list';
import { baseURI } from 'config/networks';
import axios from 'axios';
import { getError } from 'utils/error';
import AddNewCar from 'components/Common/AddNewFilm';
import './film.scss';
axios.defaults.withCredentials = true;

const FilmIndex = () => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [films, setFilms] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<object>({});
    const [genre, setGenre] = useState<string[]>([]);

    const [film, setFilm] = useState<{ genre: string[] }>({ genre: [] });

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

    const onChangeHanlder = (e: any) => {
        const { name, value } = e.target;

        setFilm({ ...film, [name]: value });
    }


    const submitHandler = async (e: any) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post(`${baseURI}/api/films`, film);
            console.log(res);
        } catch (err: any) {
            //setError(err);
            let { errors } = err.response.data;
            let normolizedErr: any = {};
            errors.forEach((err: any) => {
                normolizedErr[err.field] = err.message;
            })

            console.log(err.response.data.errors)
            const getE = getError(err);
            setErrors(normolizedErr)
            console.log(getE)

        }
    }

    const cancelHanlder = (e: any) => {
        e.preventDefault();
        setErrors({});
        setOpen(false);
    };

    const checkboxHandler = (e: any) => {
        const { value } = e.target;
        if (e.target.checked) {

            setFilm((prevState) => {
                return ({
                    ...prevState,
                    genre: [...film.genre, value,]
                });
            });

        } else {
            setFilm((prevState) => {
                return ({
                    ...prevState,
                    genre: film.genre.filter(item => item !== value)
                });
            });
        }
    }

    console.log(errors)
    return (
        <div>
            {open && (
                <AddNewCar
                    setOpen={setOpen}
                    onChangeHanlder={onChangeHanlder}
                    cancelHanlder={cancelHanlder}
                    submitHandler={submitHandler}
                    checkboxHandler={checkboxHandler}
                    errors={errors}
                    film={film}
                />
            )}

            <div className="options">
                <div className="nav" onClick={() => setOpen(true)}>
                    Add New Film
                </div>

            </div>
            {error && <div>{error}</div>}
            <div className="film-list">
                {!loading && films.length > 0 && <FileList films={films} />}
            </div>
        </div>
    );
};


export default FilmIndex;