import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoaderSite.scss';

function LoaderSite({isLoading, progress, currentPath}) {
  // Utilisez useRef pour obtenir une référence à l'élément du DOM que vous souhaitez animer
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {

    console.log(currentPath);
    // Si isLoading est false, animez l'opacité à 0
    if (!isLoading) {
      gsap.to(loaderRef.current, { autoAlpha: 0, duration: 1 });
      gsap.fromTo(progressRef.current, { y: 0, autoAlpha : 1}, { y: 20, autoAlpha : 0, ease: "power3.inOut", duration: 1 });

    } else {
      // Sinon, assurez-vous que l'opacité est à 1 lorsque le composant est chargé
      gsap.to(loaderRef.current, { autoAlpha: 1, duration: 1 });

    }
  }, [isLoading]); // Ajoutez isLoading comme dépendance pour réagir à ses changements

    return (
      <div  ref={loaderRef} id="loader-site" className={currentPath === '/' ? 'homepage-loader' : ''}>
        {/* Vous pouvez ajouter une animation ou une image ici */}
        <div ref={progressRef} className="progress">
            {progress}%
        </div>
      </div>
    );
  }
  
  export default LoaderSite; 