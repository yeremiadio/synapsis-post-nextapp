// Filename - src/components/SwitcherDarkMode/index.tsx

import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import useDarkMode from "@/utils/hooks/useDarkMode";

const SwitcherDarkMode: React.FC = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={24} />
    </>
  );
};

export default SwitcherDarkMode;
