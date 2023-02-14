import React, { useState, createContext } from "react";
import '../TimeTracking.css'

export const CategoryContext = createContext();
export const DialogProvider = function(props){
  const [categories, setCategories] = useState([
      'Work',
      'Personal',
      'Youtube',
      'Break',
      'Facebook'
  ]);
    return (
      <CategoryContext.Provider value={{categories, setCategories}}>
        {props.children}
      </CategoryContext.Provider>
    )
}