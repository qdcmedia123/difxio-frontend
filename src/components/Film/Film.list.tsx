import React from 'react';
import Rating from '@mui/material/Rating';

interface InterFilm {
    id: number | string;
    user_id: number;
    name: string;
    description: string;
    realease_date: string;
    rating: number;
    ticket_price: number;
    country: string;
    genre: string[],
    photo?: string;
    created_at?: string;
    updated_at?: string;
}

interface FilmListInterface {
    films: InterFilm[]
}

const FilmList: React.FC<FilmListInterface> = ({ films }: FilmListInterface) => {
    return <div className="list__films">{films.map((film) => (
        <div key={film.id} className="row">
            <div className="col img">
                <img src={film.photo} alt="" className="carImg" />
            </div>
            <div className="col details">
                <div className="title">{film.name}</div>
                <div className="btn__container">
                    <Rating
                        name="simple-controlled"
                        value={film.rating}
                        readOnly
                    />
                </div>
                <div className="descriptions">
                    <div className="d_title">Description</div>
                    <p>{film.description}</p>
                    <p>Country: {film.country}</p>
                    <p>Genre: {film.genre.join(', ')}</p>
                    <p>Release date {film.realease_date}</p>
                </div>
            </div>
            <div className="col actions">
                <div className="price">$ {film.ticket_price}</div>
                <a className="btn btn--primary" href={`/films/${film.id}`}>Details</a>

            </div>
        </div>
    ))}</div>
}


export default FilmList;