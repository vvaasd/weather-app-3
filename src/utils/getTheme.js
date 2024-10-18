import { THEMES, LS_KEYS } from 'constants';
import { StorageService } from 'services';

export const getTheme = () => {
  const storedTheme = StorageService.get(LS_KEYS.theme);
  if (storedTheme) {
    return storedTheme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) {
    return THEMES.light;
  }

  return THEMES.dark;
};
