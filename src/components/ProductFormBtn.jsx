export const ProductFormBtn = ({ btnClassName, onClickFunction, btnText }) => {
    return(<>   
            <button
            type="button"
            className={btnClassName}
            onClick={onClickFunction}
            >
            {btnText}
            </button>
    </>)
}

export default ProductFormBtn;