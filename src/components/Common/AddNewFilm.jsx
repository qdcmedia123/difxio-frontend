// @ts-nocheck
import React from "react";
import PropTypes from "prop-types";
import { errorUI } from "./ErrorsHandler";

const AddNewCar = ({
  setOpen,
  onChangeHanlder,
  cancelHanlder,
  submitHandler,
  errors,
  film,
  checkboxHandler,
  isPopup
}) => {
  return (
    <section className="add__new__car">
      <div className="model">
        <div className="title">Add New Film</div>
        <div className="content">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                id="name"
                placeholder="name"
                name="name"
                onChange={onChangeHanlder}
                value={film.name || ""}
                className={errors.name ? "invalid" : ""}
                required
              />
              {errorUI(errors.name)}
            </div>

            <div className="form-group">
              <label htmlFor="ticket_price">Ticket Price</label>
              <input
                type="number"
                id="ticket_price"
                placeholder="ticket price"
                name="ticket_price"
                onChange={onChangeHanlder}
                value={film.ticket_price || ""}
                className={errors.ticket_price ? "invalid" : ""}
                required
              />
              {errorUI(errors.ticket_price)}
            </div>

            <div className="f-col">
              <div className="col">
                <label htmlFor="ticket_price">Realease Date</label>
                <input
                  type="date"
                  id="realease_date"
                  placeholder="realease date"
                  name="realease_date"
                  onChange={onChangeHanlder}
                  value={film.realease_date || ""}
                  className={errors.realease_date ? "invalid" : ""}
                  required
                />
                {errorUI(errors.realease_date)}
              </div>

              <div className="col">
                <label htmlFor="ticket_price">Rating</label>
                <select
                  id="rating"
                  placeholder="rating"
                  name="rating"
                  onChange={onChangeHanlder}
                  value={film.rating || ""}
                  className={errors.rating ? "invalid" : ""}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>a<option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {errorUI(errors.rating)}
              </div>
            </div>

            <div className="f-col">
              <div className="col flex">
                <label htmlFor="comedy">Comedy</label>

                <input
                  type="checkbox"
                  name="genre"
                  id="comedy"
                  value="comedy"
                  onChange={checkboxHandler}
                />
              </div>
              <div className="col flex">
                <label htmlFor="thriller">Thriller</label>
                <input
                  type="checkbox"
                  name="genre"
                  id="thriller"
                  value="thriller"
                  onChange={checkboxHandler}
                />
              </div>

              <div className="col flex">
                <label htmlFor="suspense">Suspense</label>
                <input
                  type="checkbox"
                  name="genre"
                  id="suspense"
                  value="suspense"
                  onChange={checkboxHandler}
                />
              </div>
              <div>
              </div>
            </div>
            {errorUI(errors.genre)}

            <div className="form-control">
              <label htmlFor="ticket_price">Photo</label>
              <input
                type="text"
                id="photo"
                placeholder="photo"
                name="photo"
                onChange={onChangeHanlder}
                value={film.photo || ""}
                className={errors.photo ? "invalid" : ""}
                required
              />
              {errorUI(errors.photo)}
            </div>

            <div className="form-control">
              <label htmlFor="ticket_price">Country</label>
              <input
                type="text"
                id="country"
                placeholder="country"
                name="country"
                onChange={onChangeHanlder}
                value={film.country || ""}
                className={errors.country ? "invalid" : ""}
                required
              />
              {errorUI(errors.country)}
            </div>

            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="description"
                name="description"
                onChange={onChangeHanlder}
                value={film.description || ""}
                className={errors.description ? "invalid" : ""}
                required
              />
              {errorUI(errors.description)}
            </div>

            <div className="form-group">
              <div className="actions-btn">
                {isPopup && <button className="btn btn--secoundary" onClick={cancelHanlder}>
                  Cancel
                </button>}
                <button type="submit" className="btn btn--primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
AddNewCar.propTypes = {
  isPopup: PropTypes.bool,
  setOpen: PropTypes.any,
  onChangeHanlder: PropTypes.func.isRequired,
  cancelHanlder: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  checkboxHandler: PropTypes.func.isRequired,
};
export default AddNewCar;
