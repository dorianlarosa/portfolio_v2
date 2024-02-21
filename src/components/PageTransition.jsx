import { motion } from 'framer-motion';

const PageTransition = ({ key }) => {

    return (
        <>
            <motion.div
                className="page-transition"
                initial={{ scaleY: 1}}
                animate={{ scaleY: 0, transformOrigin: "top",  transition:{ duration: .7, ease: "easeInOut" }}}
                exit={{ scaleY: 1 , transformOrigin: "bottom", transition:{ duration: .7, ease: "easeInOut" }}}
               
            />

            
        </>

    );
};

export default PageTransition;
