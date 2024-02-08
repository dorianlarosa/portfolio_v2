import { useContext } from 'react';
import CustomCursorContext from '../components/CustomCursor/context/CustomCursorContext';

export function useCustomCursor() {
  const { setType } = useContext(CustomCursorContext);

  const handleMouseEnter = (type) => () => {
    setType(type);
  };

  const handleMouseLeave = () => {
    setType("default");
  };

  return { handleMouseEnter, handleMouseLeave };
}