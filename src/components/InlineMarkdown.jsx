import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InlineMarkdown = ({ text, markdown }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <span style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}>
            <span
                style={{

                    backgroundColor: 'black', // Black highlight
                    color: 'white', // Reverse video text
                    transition: 'background-color 0.3s, color 0.3s', // Smooth transitions
                    padding: '0.1em',
                }}
                onClick={toggleDropdown}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'white'; // Invert on hover
                    e.target.style.color = 'black'; // Text changes to black on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'black'; // Revert to black highlight
                    e.target.style.color = 'white'; // Revert to white text
                }}
            >
                {text}
            </span>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            background: '#f9f9f9',
                            border: '1px solid #ddd',
                            padding: '1rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            marginTop: '0.5rem',
                            zIndex: 10,
                            left: '50%', // Start in the middle of the parent container
                            transform: 'translateX(-50%)', // Center the dropdown box relative to its trigger
                            width: '300%', // Occupy most of the paragraph's width
                            maxWidth: '400px', // Prevent the box from becoming too wide 
                        }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: markdown }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};

export default InlineMarkdown;
