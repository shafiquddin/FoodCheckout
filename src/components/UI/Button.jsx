const Button = ({children,textOnly,className,...props}) => {
    let cssStyle = textOnly ? 'text-button' : 'button';
    cssStyle += " "+cssStyle;
    return <button className={cssStyle} {...props}>{children}</button>
}

export default Button;