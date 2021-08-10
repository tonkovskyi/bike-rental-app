import React from "react";
import { useHttp } from "../myHooks/http.hook";

export const RentedBikes = ({
  rentedBikesList,
  getAvailableBikesList,
  getRentedBikesList,
  yourTotalRent,
}) => {
  const { request } = useHttp();

  const cancelRent = async (event) => {
    try {
      const idRentedBike = event.target.dataset.id;
      const bikeInfo = await request(`api/bike/rented/${idRentedBike}`);
      const { rentTime, name, type, rentPrice, dateOfRent } = bikeInfo.bike;
      await request(`/api/bike/rented/${idRentedBike}`, "DELETE", null);
      const today = new Date();
      const rentDay = new Date(dateOfRent);
      const rentTimeArr = rentTime.split(" ");
      const diff = (today - rentDay) / (1000 * 60 * 60);
      const timeOfRent = `${+rentTimeArr[0] + Math.round(diff)} hours`;
      if (diff >= 20) {
        const newRentPrice = rentPrice / 2;
        await request("api/bike/available/add", "POST", {
          name,
          type,
          rentPrice: newRentPrice,
          rentTime: timeOfRent,
        });
      } else {
        await request("api/bike/available/add", "POST", {
          name,
          type,
          rentPrice,
          rentTime: timeOfRent,
        });
      }
      console.log(timeOfRent);
      getAvailableBikesList();
      getRentedBikesList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h4>Your rent (Total: ${yourTotalRent})</h4>
      {rentedBikesList.map((bike) => {
        return (
          <div className="border border-secondary rounded bg-light p-4 m-3 d-flex">
            <span className="mr-auto p-2">
              {bike.name} / {bike.type} / ${bike.rentPrice}
            </span>
            <button
              data-id={bike._id}
              className="btn btn-danger p-2"
              onClick={cancelRent}
            >
              Cancel rent
            </button>
          </div>
        );
      })}
    </>
  );
};
