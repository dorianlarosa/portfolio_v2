import { useContext } from 'react';
import CustomCursorContext from '../components/CustomCursor/context/CustomCursorContext';
import { useLocation } from 'react-router-dom'; // Importez useLocation

export function useCustomCursor() {
  const { setType } = useContext(CustomCursorContext);
  const location = useLocation(); // Utilisez useLocation pour obtenir l'objet location

  const handleMouseEnter = (type) => () => {
    setType(type);
  };

  const handleMouseLeave = () => {
    if (location.pathname === '/projets') {
      setType("scroll");
    } else {
      setType("default");
    }
  };


  return { handleMouseEnter, handleMouseLeave };
}
