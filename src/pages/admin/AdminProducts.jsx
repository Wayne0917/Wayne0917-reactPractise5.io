import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import * as bootstrap from "bootstrap";

import Form from "../../components/Form";
import ProductForm from "../../components/ProductForm";
import PageNation from "../../components/PageNation";

import { API_BASE, API_PATH } from "../../api/config";

export const AdminProducts = () => {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    
    //給 新增、刪除、編輯按鈕 一個判斷狀態
    const [modalType, setModalType] = useState("");
    //產品彈跳 表格資料
    const [templateData, setTemplateData] = useState({
        id: "",
        imageUrl: "",
        title: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: false,
        imagesUrl: [],
        starRating: "",
    });

      //所有商品
    const [product, setProduct] = useState([]);

    const [pagination, setPagination] = useState({});

    //productModal bootstrap 初始化
    const productModalRef = useRef(null);
    useEffect(() => {
        productModalRef.current = new bootstrap.Modal("#productModal", {
            keyboard: false,
        });
        document
        .querySelector("#productModal")
        .addEventListener("hide.bs.modal", () => {
            if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
            }
        });
    }, []);


    // API: 登出
    const logout = async () => {
            try {
                const response = await axios.post(`${API_BASE}/logout`);
                console.log(response);
            } 
            catch (error) {
                alert("登出失敗: " + error?.response?.data?.message);
        }
    }

    //打開 modal
    const openModal = (product, type) => {
            setTemplateData({
                id: product.id || "",
                imageUrl: product.imageUrl || "",
                title: product.title || "",
                category: product.category || "",
                unit: product.unit || "",
                origin_price: product.origin_price || "",
                price: product.price || "",
                description: product.description || "",
                content: product.content || "",
                is_enabled: product.is_enabled || false,
                imagesUrl: product.imagesUrl || [],
        });
        productModalRef.current.show();
        setModalType(type);
    };

    //監聽產品彈跳視窗 表格資料
    const handleInputChange = useCallback((e) => {
        const { id, value, type, checked } = e.target;
        setTemplateData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value,
        }));
        
    }, [])

  //API: 取得所有商品
    const getProductData = useCallback(
    async (page = 1) => {
    try {
        const response = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`
        );
        setProduct(response.data.products);
        setPagination(response.data.pagination);
    } 
    catch (err) {
        console.log(err);
    }
    },[])

    
    useEffect(() => {
        const fetchData = async () => {
            await getProductData(currentPage);
        };
        fetchData();
    }, [getProductData, currentPage]);

    return(<>
        <div className="container">
            <div className="text-end mt-4">
                <button 
                className="btn btn-danger  mx-5"
                onClick={logout}
                >登出</button>

                <button 
                className="btn btn-success"
                onClick={()=> openModal({}, "create")}               
                >建立新的產品</button>
            </div>

            <table className="table mt-4">
                <Form
                product={product}
                openModal={openModal}
                />
            </table>

            <PageNation
            pagination={pagination}
            changePage={getProductData}
            />
        </div>

            <ProductForm
            modalType={modalType}
            templateData={templateData}
            setTemplateData={setTemplateData}
            productModalRef={productModalRef}
            getProductData={getProductData}
            openModal={openModal}
            handleInputChange={handleInputChange}
            />
    </>)
}

export default AdminProducts;