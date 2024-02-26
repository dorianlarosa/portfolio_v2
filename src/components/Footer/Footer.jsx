import React from 'react';
import { Link } from 'react-router-dom';
import { SvgFlower, CustomLink } from "..";
import { useCustomCursor } from '../../hooks/useCustomCursor'; // Assurez-vous que le chemin d'import est correct
import "./Footer.scss";

const Footer = () => {
  const { handleMouseEnter, handleMouseLeave } = useCustomCursor();

  return (
    <>
      <footer id="footer">
        <div className="container content-footer">
          

            <div className="contact-footer">

              <div className="title">
                <SvgFlower />
                <h2>Me contacter</h2>
              </div>

         
              <Link className="mail" to="mailto:hello@dorianlarosa.fr" onMouseEnter={handleMouseEnter('arrow-mix-blend-mode')} onMouseLeave={handleMouseLeave}>
                hello@dorianlarosa.fr
              </Link>
            </div>

            <div className="credits">
              <p>Réalisé avec 🤍 - © Dorian LA ROSA </p>

              <CustomLink to="/mentions-legales" onMouseEnter={handleMouseEnter('arrow-mix-blend-mode')} onMouseLeave={handleMouseLeave}>
                Mentions Légales
              </CustomLink>
            </div>
          </div>
      

      </footer>
    </>
  );
};

export default Footer;
