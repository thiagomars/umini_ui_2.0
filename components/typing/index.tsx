'use client'

import React, { useState, useEffect } from 'react';

interface TypingProps {
    texts: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    waitDelay?: number;
    loop?: boolean;
    cursorStyle?: React.CSSProperties;
    className?: string;
}

export const Typing: React.FC<TypingProps> = ({
    texts,
    typeSpeed = 100,
    deleteSpeed = 50,
    waitDelay = 1500,
    loop = true,
    cursorStyle = {},
    className = ''
}) => {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!texts || texts.length === 0) return;

        const currentText = texts[textIndex];

        const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    if (!loop && textIndex === texts.length - 1) {
                        return;
                    }
                    setTimeout(() => setIsDeleting(true), waitDelay);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, currentSpeed);

        return () => clearTimeout(timer);
    }, [
        displayText,
        isDeleting,
        textIndex,
        texts,
        typeSpeed,
        deleteSpeed,
        waitDelay,
        loop
    ]);

    return (
        <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
            <span aria-label={texts[textIndex]}>
                {displayText}
            </span>
            <span
                style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.2em',
                    marginLeft: '4px',
                    backgroundColor: 'currentColor',
                    animation: 'blink 1s step-end infinite',
                    ...cursorStyle,
                }}
            />
            <style jsx global>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};