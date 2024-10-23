import { useState } from 'react';
import { LS_KEYS, THEMES } from 'constants';
import { ThemeContext } from 'context';
import { StorageService } from 'services';
import { getTheme } from 'utils';

const setThemeDataset = (theme) => {
  document.documentElement.dataset.theme = theme;
};

export const ThemeProvider = (props) => {
  const { children } = props;

  const [theme, setTheme] = useState(getTheme());
  setThemeDataset(theme);

  const onToggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === THEMES.light ? THEMES.dark : THEMES.light;
      StorageService.set(LS_KEYS.theme, newTheme);
      setThemeDataset(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, onToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
