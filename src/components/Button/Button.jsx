import React, { useContext } from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';
import { useCustomCursor } from '../../hooks/useCustomCursor';

const Button = ({ to, children, target = "_self", ...restProps }) => {
    const { handleMouseEnter, handleMouseLeave } = useCustomCursor();

  return (
    <div {...restProps}>
      <Link 
        className="button" 
        to={to} 
        target={target} 
        onMouseEnter={handleMouseEnter("link")} 
        onMouseLeave={handleMouseLeave}>
          <div className="background"></div>
          <div className="text">{children}</div>
          <div className="icon">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right"
              >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
              </svg>
          </div>
      </Link>
    </div>
  );
}

export default Button;