import React, {useState} from 'react';
import AddNewFilm from 'components/Common/AddNewFilm';
import { useTypedSelector } from 'hooks/use-typed-selector';
import axios from 'axios';
import { baseURI } from 'config/networks';
import { getError } from 'utils/error';

const FilmCreate = () => {
    const [error, setError] = useState<null | string>(null);
    const [errors, setErrors] = useState<object>({});
    const state = useTypedSelector((state) => state);
    const { auth: { isAuthenticated } } = state;
    const [film, setFilm] = useState<{ genre: string[] }>({ genre: [] });
    
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
    const onChangeHanlder = (e: any) => {
        const { name, value } = e.target;
        setFilm({ ...film, [name]: value });
    }

    const cancelHanlder = (e: any) => {
        e.preventDefault();
        setErrors({});
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

    return (
        <>{isAuthenticated && <div>
            <h2>Add New Film</h2>
            {error && <div>{error}</div>}
            <AddNewFilm
                    
                    onChangeHanlder={onChangeHanlder}
                    cancelHanlder={cancelHanlder}
                    submitHandler={submitHandler}
                    checkboxHandler={checkboxHandler}
                    errors={errors}
                    film={film}
                />
        </div>}</>
    );
};


export default FilmCreate;