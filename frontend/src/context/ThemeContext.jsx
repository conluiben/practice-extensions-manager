// guide: https://www.freecodecamp.org/news/how-to-use-react-context/ (implementation below)
// alt: https://www.freecodecamp.org/news/how-to-use-react-context/

import { createContext, useState } from "react";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
  };
  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider, ThemeContext};
