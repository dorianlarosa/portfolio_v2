// WrapperComponent.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectPage from './ProjectPage'; // Assurez-vous que le chemin d'importation est correct

function WrapperProjectPage() {
  const params = useParams();
  const navigate = useNavigate();

  // Passer les hooks comme props au composant de classe
  return <ProjectPage params={params} navigate={navigate} />;
}

export default WrapperProjectPage;
