import "./App.css";
import { NewRent } from "./components/NewRent";
import { AvailableBikes } from "./components/AvailableBikes";
import { useHttp } from "./myHooks/http.hook";
import { useCallback, useEffect, useState } from "react";
import { RentedBikes } from "./components/RentedBikes";

function App() {
  const { request } = useHttp();
  const [availableBikesList, setAvailableBikesList] = useState([]);
  const getAvailableBikesList = useCallback(async () => {
    try {
      const data = await request("/api/bike/available", "GET", null);
      console.log(data);
      setAvailableBikesList(data.bikes);
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  useEffect(() => {
    getAvailableBikesList();
  }, [getAvailableBikesList]);

  const [rentedBikesList, setRentedBikesList] = useState([]);
  const [yourTotalRent, setYourTotalRent] = useState(0);
  const getRentedBikesList = useCallback(async () => {
    try {
      const data = await request("/api/bike/rented", "GET", null);
      console.log(data);
      setRentedBikesList(data.bikes);
      let totalRent = 0;
      data.bikes.forEach((item) => {
        totalRent += item.rentPrice;
      });
      setYourTotalRent(totalRent);
    } catch (e) {
      console.log(e);
    }
  }, [request]);

  useEffect(() => {
    getRentedBikesList();
  }, [getRentedBikesList]);

  return (
    <div className="container">
      <h1>Awesome Bike Rental</h1>
      <NewRent getAvailableBikesList={getAvailableBikesList} />
      <RentedBikes
        yourTotalRent={yourTotalRent}
        rentedBikesList={rentedBikesList}
        getAvailableBikesList={getAvailableBikesList}
        getRentedBikesList={getRentedBikesList}
      />
      <AvailableBikes
        availableBikesList={availableBikesList}
        getAvailableBikesList={getAvailableBikesList}
        getRentedBikesList={getRentedBikesList}
      />
    </div>
  );
}

export default App;
