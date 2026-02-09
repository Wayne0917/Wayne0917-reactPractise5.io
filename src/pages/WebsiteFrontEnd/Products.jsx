import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { API_BASE, API_PATH } from "../../api/config";

export const Products = () => {
    //所有商品
    const [product, setProduct] = useState([]);

    //API: 取得所有商品
    useEffect(() => {
        const getProductData = async () => {
            try {
            const response = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
            setProduct(response.data.products);
            } catch (err) {
            console.log(err);
            }
        };
        getProductData();
    },[])

    return (<>
        <div className="container">
        <div className="row">
        {product.map((item) => (
            <div className="col-sm-3 mb-4" key={item.id}>
            <div className="card" style={{ width: "100%" }}> {/* 修正 style 格式 */}
                <img 
                src={item.imageUrl} // 帶入真實圖片路徑
                className="card-img-top" 
                alt={item.title} 
                />
                <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <Link className="btn btn-primary" to={`/SingleProduct/${item.id}`}>查看更多</Link>
                </div>
            </div>
            </div>
        ))} 
        </div> 
    </div> 
    </>)
    }
export default Products;
