import React from 'react';

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
    return <>{films.map((film) => (
        <div key={film.id} className="row">
            <div className="col img">
                <img src={film.photo} alt="" className="carImg" />
            </div>
            <div className="col details">
                <div className="title">{film.name}</div>
                <div className="btn__container">
                    <button>
                        <i className="fa fa-user"></i>
                        {film.description}
                    </button>
                    <button>
                        <i className="fa fa-film"></i>
                        {film.realease_date}
                    </button>
                    <button>
                        <i className="fa fa-gas-pump"> {film.rating}</i>
                    </button>
                </div>
                <div className="descriptions">
                    <div className="d_title">Description</div>
                    <p>{film.description}</p>
                    <p>Brand: {film.country}</p>
                    <p>Model: {film.genre.join(', ')}</p>
                </div>
            </div>
            <div className="col actions">
                <div className="price">$ {film.ticket_price}</div>
                <button className="btn btn--primary">Book Now</button>
                <span>Delete film</span>
                <span>Update film</span>
            </div>
        </div>
    ))}</>
}


export default FilmList;