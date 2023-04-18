import { useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {};

export default function useScrollLock() {
    const scrollLocked = useRef();
    const html = safeDocument.documentElement;
    const { body } = safeDocument;

    const lockScroll = () => {
        if (!body || !body.style || scrollLocked.current) return;

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        const bodyPaddingRight =
            parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

        /*
            Fixes for iOS and desktop Safari 
        */
        html.style.position = 'relative';
        html.style.overflow = 'hidden';
        body.style.position = 'relative';
        body.style.overflow = 'hidden';
        body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

        scrollLocked.current = true;
    };

    const unlockScroll = () => {
        if (!body || !body.style || !scrollLocked.current) return;

        html.style.position = '';
        html.style.overflow = '';
        body.style.position = '';
        body.style.overflow = '';
        body.style.paddingRight = '';

        scrollLocked.current = false;
    };

    return [lockScroll, unlockScroll];
};