// src/components/UI/Button.jsx
export default function Button({ children, className = '', textOnly, ...props }) {
    const cssClass = textOnly ? `text-button ${className}` : `button ${className}`;
    
    return (
        <button className={cssClass} {...props}>
            {children}
        </button>
    );
}
