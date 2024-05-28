import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "../constants/constants";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [food, setFood] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ food, foodCategories, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
