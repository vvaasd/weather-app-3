import { useState, useEffect } from "react";

export const useElementWidth = (ref) => {
    const [width, setWidth] = useState(ref.current ? ref.current?.clientWidth : 0)
    function getWidth() {
        const element = ref.current
        if (element) {
            setWidth(element?.clientWidth)
        }
    }
    useEffect(() => {
        getWidth()
        window.addEventListener('resize', getWidth);
        return () => {
            window.removeEventListener('resize', getWidth);
        };
    }, []);

    return width
}