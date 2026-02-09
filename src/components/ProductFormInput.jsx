export const ProductFormInput = ({ 
    divClassName = "mb-3",
    htmlFor, 
    labelName,  
    inputType = "text", 
    inputClassName = "form-control",
    id, 
    placeholder, 
    templateDataKey, 
    onChangeFunction,
    ...other
    }) => {
    return(<>
        <div className={divClassName}>
                <label htmlFor={htmlFor} className="form-label">
                {labelName}
                </label>

                {inputType === "textarea" ? ( 
                <textarea
                    className={inputClassName}
                    id={id}
                    placeholder={placeholder}
                    value={templateDataKey || ""}
                    onChange={onChangeFunction}
                    {...other}
                />
                ) : (
                <input
                    type={inputType}
                    className={inputClassName}
                    id={id}
                    placeholder={placeholder}
                    value={templateDataKey || ""}
                    onChange={onChangeFunction}
                    {...other}
                />
                )}
        </div>
    </>)
}

export default ProductFormInput;