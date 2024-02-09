import React, { useContext, useState, useEffect, useRef } from "react";
import "./CustomCursor.scss";
import CustomCursorContext from "./context/CustomCursorContext";

const CustomCursor = () => {
    const { type, setType } = useContext(CustomCursorContext);
    const cursorWrapperRef = React.useRef(null);

    const secondaryCursor = React.useRef(null);
    const mainCursor = React.useRef(null);
    const [blendMode, setBlendMode] = useState('difference'); // Ajouté pour gérer mix-blend-mode
    const [isPressed, setIsPressed] = useState(false); // État pour gérer si le bouton de la souris est appuyé


    const positionRef = React.useRef({
        mouseX: 0,
        mouseY: 0,
        destinationX: 0,
        destinationY: 0,
        distanceX: 0,
        distanceY: 0,
        key: -1,
    });

    

    useEffect(() => {
        
        const handleMouseDown = () => {
            setIsPressed(true); // Mettre à jour l'état quand le bouton de la souris est appuyé
        };

        const handleMouseUp = () => {
            if (type === 'arrow') {
                setType('default');
            }
            setIsPressed(false); // Réinitialiser l'état quand le bouton de la souris est relâché
            
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [type, setType]);

    // Appliquer l'effet de scale basé sur l'état isPressed
    useEffect(() => {
        if (isPressed) {
            cursorWrapperRef.current.classList.add("pressed");
        } else {
            cursorWrapperRef.current.classList.remove("pressed");
        }
    }, [isPressed]);

    // Écouter les changements de 'type' et ajuster mix-blend-mode avec un délai
    React.useEffect(() => {
        if (type !== "arrow") {
            const timer = setTimeout(() => {
                setBlendMode('difference');
            }, 500); // Appliquer 'difference' après un délai de 0.5s
            return () => clearTimeout(timer);
        } else {
            setBlendMode('initial'); // Ou tout autre valeur appropriée quand 'arrow' est le type
        }
    }, [type]);


    React.useEffect(() => {
        document.addEventListener("mousemove", (event) => {
            const { clientX, clientY } = event;

            const mouseX = clientX;
            const mouseY = clientY;

            positionRef.current.mouseX =
                mouseX - secondaryCursor.current.clientWidth / 2;
            positionRef.current.mouseY =
                mouseY - secondaryCursor.current.clientHeight / 2;
            mainCursor.current.style.transform = `translate3d(${mouseX -
                mainCursor.current.clientWidth / 2}px, ${mouseY -
                mainCursor.current.clientHeight / 2}px, 0)`;
        });

        // Ajouter des écouteurs pour mouseenter et mouseleave
        const showCursor = () => cursorWrapperRef.current.classList.remove("hidden");
        const hideCursor = () => cursorWrapperRef.current.classList.add("hidden");

        document.addEventListener("mouseenter", showCursor);
        document.addEventListener("mouseleave", hideCursor);

        return () => {
            document.removeEventListener("mouseenter", showCursor);
            document.removeEventListener("mouseleave", hideCursor);
        };
    }, []);

    React.useEffect(() => {
        const followMouse = () => {
            positionRef.current.key = requestAnimationFrame(followMouse);
            const {
                mouseX,
                mouseY,
                destinationX,
                destinationY,
                distanceX,
                distanceY,
            } = positionRef.current;
            if (!destinationX || !destinationY) {
                positionRef.current.destinationX = mouseX;
                positionRef.current.destinationY = mouseY;
            } else {
                positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
                positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
                if (
                    Math.abs(positionRef.current.distanceX) +
                    Math.abs(positionRef.current.distanceY) <
                    0.1
                ) {
                    positionRef.current.destinationX = mouseX;
                    positionRef.current.destinationY = mouseY;
                } else {
                    positionRef.current.destinationX += distanceX;
                    positionRef.current.destinationY += distanceY;
                }
            }
            secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
        };
        followMouse();
    }, []);
    return (
        <div className={`cursor-wrapper ${type}`} ref={cursorWrapperRef} >
            <div className="main-cursor " ref={mainCursor} style={{ mixBlendMode: blendMode }}>
                <div className="main-cursor-background">
                    <div className="icon-arrow">
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
                </div>
            </div>
            <div className="secondary-cursor" ref={secondaryCursor}>
                <div className="cursor-border">
                    <div className="cursor-background"></div>
                    <div className="cursor-background-arrow"></div>
                </div>
            </div>
        </div>
    );
};

export default CustomCursor;