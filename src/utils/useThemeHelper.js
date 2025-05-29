import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
