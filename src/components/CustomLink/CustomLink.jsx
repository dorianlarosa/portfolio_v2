import React from 'react';
import './CustomLink.scss';
import { Link } from 'react-router-dom';
import { useCustomCursor } from '../../hooks/useCustomCursor';

// Transformez CustomLink en un composant fonctionnel
const CustomLink = ({ to, children, target = "_self", ...restProps }) => {
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();

  return (
    <div className="container-custom-link" {...restProps}>
      <Link 
        className="custom-link" 
        to={to} 
        target={target} 
        onMouseEnter={handleMouseEnter("link")} // Vous devez spécifier le type ici
        onMouseLeave={handleMouseLeave}>
          {children}
      </Link>
    </div>
  );
}

export default CustomLink;