import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedRecipe = JSON.parse(localStorage.getItem("recipe"));
  // Initialize user state with stored data or null
  const [user, setUser] = useState(storedUser || null);
  const [recipe, setRecipe] = useState(storedRecipe || null);
  const holdRecipe = (recipe) => {
    setRecipe(recipe);
  };
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // Use useEffect to update localStorage whenever user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("recipe", JSON.stringify(recipe));
  }, [user, recipe]);

  return (
    <UserContext.Provider value={{ user, login, logout, recipe, holdRecipe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
