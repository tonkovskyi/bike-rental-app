import React, { useState } from "react";
import { useHttp } from "../myHooks/http.hook";

export const NewRent = ({ getAvailableBikesList }) => {
  const inputName = document.getElementById("inputName");
  const inputPrice = document.getElementById("inputPrice");

  const [typeOfBike] = useState([
    "Road",
    "Mountain",
    "Touring",
    "Folding",
  ]);

  const [form, setForm] = useState({
    name: "",
    type: "",
    rentPrice: "",
    rentTime: "0 hours",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const { request } = useHttp();

  const addBikeHandler = async () => {
    try {
      await request("/api/bike/available/add", "POST", { ...form });
      getAvailableBikesList();
      inputName.value = "";
      inputPrice.value = "";
    } catch (e) {}
  };

  return (
    <>
      <h4>Create new rent</h4>
      <div class="border border-secondary rounded bg-light p-3 m-3">
        <label>
          Bike name
          <input
            id="inputName"
            className="m-3"
            type="text"
            name="name"
            onChange={changeHandler}
          />
        </label>
        <label>
          Bike type
          <select className="m-3" name="type" onChange={changeHandler}>
            {typeOfBike.map((bikeType) => {
              return <option>{bikeType}</option>;
            })}
          </select>
        </label>
        <label>
          Rent price
          <input
            id="inputPrice"
            className="m-3"
            type="text"
            name="rentPrice"
            onChange={changeHandler}
          />
        </label>
        <button className="btn btn-success" onClick={addBikeHandler}>
          Submit rent
        </button>
      </div>
    </>
  );
};
