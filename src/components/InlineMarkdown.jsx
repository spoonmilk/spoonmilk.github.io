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
                    backgroundColor: isOpen ? 'rgba(255, 255, 0, 0.6)' : 'rgba(255, 255, 0, 0.3)',
                    transition: 'background-color 0.3s',
                    padding: '0.1em',
                }}
                onClick={toggleDropdown}
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
