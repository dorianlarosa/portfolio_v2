// LenisController.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis'; // Importez useLenis

const LenisController = () => {
    const location = useLocation();
    const lenis = useLenis(); // Accédez à l'instance de Lenis avec le hook useLenis

    useEffect(() => {
        // Assurez-vous que Lenis est arrêté avant de commencer le changement de route
        if (lenis) {
            lenis.stop();
            window.scrollTo(0, 0);
            const reactivateLenis = () => {
                lenis.start();
            };
            setTimeout(reactivateLenis, 100); // Le délai avant de réactiver peut toujours être nécessaire
        }
    }, [location.pathname]); // Dépendance à location.pathname pour détecter les changements de route

    return null; // Ce composant ne rend rien visuellement
};

export default LenisController;