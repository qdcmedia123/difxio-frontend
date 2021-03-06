import React, { useEffect, useState } from 'react';
import FileList from './Film.list';
import { baseURI } from 'config/networks';
import axios from 'axios';
import { getError } from 'utils/error';
import AddNewFilm from 'components/Common/AddNewFilm';
import './film.scss';
import { useTypedSelector } from 'hooks/use-typed-selector';

axios.defaults.withCredentials = true;

const FilmIndex = () => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [films, setFilms] = useState([]);
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<object>({});
    const state = useTypedSelector((state) => state);
    const { auth: { isAuthenticated } } = state;


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
            await axios.post(`${baseURI}/api/films`, film);
            alert('Film sucessfully added');
            window.location.reload();
        } catch (err: any) {
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
                <AddNewFilm
                    setOpen={setOpen}
                    onChangeHanlder={onChangeHanlder}
                    cancelHanlder={cancelHanlder}
                    submitHandler={submitHandler}
                    checkboxHandler={checkboxHandler}
                    errors={errors}
                    film={film}
                    isPopup={true}
                />
            )}

            {isAuthenticated && <div className="options">
                <div className="nav" onClick={() => setOpen(true)}>
                    Add New Film
                </div>

            </div>}
            {error && <div>{error}</div>}
            <div className="film-list">
                {!loading && films.length > 0 && <FileList films={films} />}
            </div>
        </div>
    );
};


export default FilmIndex;