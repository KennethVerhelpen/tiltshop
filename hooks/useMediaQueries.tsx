
import { useWindowSize } from './useWindowSize';

export const useMediaQueries = () => {
  const { width } = useWindowSize();
  
  return {
    media: {
      xs: width <= 600,
      sm: width > 600 && width <= 960,
      md: width > 960 && width <= 1280,
      lg: width > 1280 && width <= 2048,
      xl: width > 2048
    }
  }
}