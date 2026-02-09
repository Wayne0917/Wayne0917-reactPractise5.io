export const Form = ({ product, openModal }) => {
    return (<>
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
            </tr>
        </thead>

        <tbody>
            {product.map((product) => {
                return(
                    <tr key={product.id}>
                        <td 
                        className={product.category  === "茶葉罐" ? "text-success" : "text-danger"}>{product.category}
                        </td>
                        <td>{product.title}</td>
                        <td>{product.origin_price}</td>
                        <td>{product.price}</td>
                        <td>
                            {product.is_enabled ? <span className="text-success">啟用</span> : 
                            <span>未啟用</span>}                                              
                        </td>

                        <td>
                            <div className="btn-group">
                            <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={()=> openModal(product, "edit")}
                            >
                            編輯
                            </button>
                            <button 
                            type="button" 
                            className="btn btn-outline-danger btn-sm"
                            onClick={()=> openModal(product, "delete")}
                            >
                            刪除
                            </button>
                            </div>
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    </>);
};

export default Form;