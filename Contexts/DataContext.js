import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "../constants/constants";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [food, setFood] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodResponse = await axios.get(`${url}/api/admin/products`);
        setFood(foodResponse.data);

        const foodCategoryResponse = await axios.get(
          `${url}/api/admin/categories`
        );
        setFoodCategories(foodCategoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchOrder = async (id) => {
    setOrderLoading(true);
    try {
      const response = await axios.get(`${url}/api/customer/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{ food, foodCategories, order, orderLoading, fetchOrder }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
