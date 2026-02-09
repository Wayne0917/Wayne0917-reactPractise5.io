import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

import ProductFormInput from "../../components/ProductFormInput";

import { API_BASE, API_PATH } from "../../api/config";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const getSingleProduct = async () => {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
            setProduct(res.data.product);
        };
        getSingleProduct();
    }, [id]);

    const shoppingCart = async () => {
        const cartItem = {
            data:{
                product_id: product.id, // 來自 useParams 取得並經由 API 抓回來的產品 ID
                qty: Number(qty),// 預設加入 1 件，你也可以另外做一個 input 讓使用者選數量
            }
        }
        try {
            const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, cartItem);
            alert(`加入購物車成功: ${response.data.message}`);              
        } catch (error) {
            alert(`加入購物車失敗: ${error?.response?.data?.message}`);
        }
    }

    const handlerNumberChange = (e) => {
        setQty(e.target.value);
    }

    return (<>
        <div className="card mx-auto mt-5" style={{maxWidth: "850px"}}>
            <div className="row">
                <div className="col-md-6">
                    <img 
                    src={product.imageUrl} 
                    className="img-fluid rounded-start"
                    alt={product.title} 
                    />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <span className="card-text">
                            <small className="text-muted ">{product.category}</small>
                        </span>
                        <span className="card-text mx-5"><strong>單位:</strong> {product.unit}</span>
                        <span className="card-text"><strong>價位:</strong> {product.price}</span>
                    </div>
                    <div>
                        <ProductFormInput 
                        htmlFor={"num"}
                        labelName={"數量"}
                        inputType={"number"}
                        inputClassName={"form-control text-center"}
                        id={"num"}
                        value={qty}
                        min={1}
                        onChangeFunction={(e) => {handlerNumberChange(e)}}
                        />
                        <button 
                        className="btn btn-primary"
                        onClick={shoppingCart}
                        >立即購買</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SingleProduct;