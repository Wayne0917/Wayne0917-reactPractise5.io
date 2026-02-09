import { useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";

import ProductFormInput from "./ProductFormInput";
import ProductFormBtn from "./ProductFormBtn";

import { API_BASE, API_PATH } from "../api/config";

export function ProductForm({
    modalType,
    productModalRef,
    getProductData,
    templateData,
    setTemplateData,
    handleInputChange,
}) {
    const [isLoading, setIsLoading] = useState(false);
  //API: 新增產品 、 更新產品
    const updateProduct = async (id) => {
        if (isLoading) return;
        setIsLoading(true);

        let product;
        if (modalType === "edit") {
            product = `product/${id}`;
        } else {
            product = `product`;
        }

    const url = `${API_BASE}/api/${API_PATH}/admin/${product}`;

    const productData = {
    data: {
        ...templateData,
        origin_price: Number(templateData.origin_price),
        price: Number(templateData.price),
        is_enabled: templateData.is_enabled ? 1 : 0,
        imagesUrl: templateData.imagesUrl,
    },
    };

    try {
        let response;
        if (modalType === "edit") {
            response = await axios.put(url, productData);
            alert("更新成功", response.data);
        } else {
            response = await axios.post(url, productData);
            alert("新增成功", response.data);
        }
        productModalRef.current.hide();
        await getProductData();
        alert("列表已更新");
        } catch (err) {
        if (modalType === "edit") {
            alert("更新失敗", err.response?.data?.message);
        } else {
            alert("新增失敗", err.response?.data?.message);
        }
        } finally {
            setIsLoading(false);
        }
    };

  //API: 刪除產品
    const deleteProduct = async (id) => {
        try {
        const response = await axios.delete(
            `${API_BASE}/api/${API_PATH}/admin/product/${id}`,
        );
        alert("刪除成功", response.data);
        productModalRef.current.hide();
        getProductData();
        } catch (err) {
        alert("刪除失敗", err.response?.data?.message);
        }
    };

    const handleImageChange = (index, value) => {
        setTemplateData((prevData) => {
        const newImages = [...prevData.imagesUrl];
        newImages[index] = value;

        if (
        value !== "" &&
        index === newImages.length - 1 &&
        newImages.length < 5
        ) {
            newImages.push("");
        }

        if (newImages.length > 1 && newImages[newImages.length - 1] === "") {
            newImages.pop();
        }

        return { ...prevData, imagesUrl: newImages };
        });
    };

    const handleAddImage = () => {
        setTemplateData((prevData) => ({
        ...prevData,
        imagesUrl: [...prevData.imagesUrl, ""],
        }));
    };

    const handleDeleteImage = () => {
        setTemplateData((prevData) => {
        const newImages = [...prevData.imagesUrl];
        newImages.pop();
        return { ...prevData, imagesUrl: newImages };
        });
    };

    const handleFileChange = async (e) => {
    const url = `${API_BASE}/api/${API_PATH}/admin/upload`;

    const file = e.target.files?.[0];
    if (!file) return;

    try {
        const formData = new FormData();
        formData.append("file-to-upload", file);

        let res = await axios.post(url, formData);
        const uploadedImageUrl = res.data.imageUrl;

        setTemplateData((prevTemplateData) => ({
            ...prevTemplateData,
            imageUrl: uploadedImageUrl,
        }));
        } catch (error) {
        console.error("Upload error:", error);
        }
    };

  //關閉 彈跳視窗
    const closeModal = () => {
        productModalRef.current.hide();
    };

    return (
        <>
        <div
            id="productModal"
            className="modal fade"
            tabIndex="-1"
            aria-labelledby="productModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
            <div className="modal-content border-0">
                <div
                className={`modal-header text-white
                    ${
                    modalType === "delete"
                        ? "bg-danger"
                        : modalType === "edit"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                >
                <h5 id="productModalLabel" className="modal-title">
                    <span>
                    {modalType === "delete"
                        ? "刪除產品"
                        : modalType === "edit"
                        ? "編輯產品"
                        : "新增產品"}
                    </span>
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>

                <div className="modal-body">
                {modalType === "delete" ? (
                    <p className="h4 text-center">
                    確定要刪除
                    <span className="text-danger">{templateData.title}</span>
                    嗎?
                    </p>
                ) : (
                    <div className="row">
                    <div className="col-sm-4">
                        <div className="mb-2">
                        <div className="mb-3">
                            <label htmlFor="fileInput" className="form-label">
                            圖片上傳
                            </label>
                            <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="form-control"
                            id="fileInput"
                            onChange={handleFileChange}
                            />
                        </div>
                        <p className="my-2">or</p>
                        <div className="mb-3">
                            <ProductFormInput
                            htmlFor={"imageUrl"}
                            labelName={"輸入圖片網址"}
                            inputType={"text"}
                            inputClassName={"form-control"}
                            id={"imageUrl"}
                            placeholder={"請輸入圖片連結"}
                            templateDataKey={templateData.imageUrl}
                            onChangeFunction={handleInputChange}
                            />
                            {templateData?.imageUrl && (
                            <img
                                className="img-fluid mt-2"
                                src={templateData.imageUrl}
                                alt="主圖"
                            />
                            )}
                        </div>
                        {templateData.imageUrl && (
                            <img
                            className="img-fluid"
                            src={templateData.imageUrl}
                            alt="主圖"
                            />
                        )}
                        </div>

                        <div>
                        {templateData?.imagesUrl.map((image, index) => (
                            <div key={index} className="mb-2">
                            <input
                                type="text"
                                value={image}
                                onChange={(e) =>
                                handleImageChange(index, e.target.value)
                                }
                                placeholder={`圖片網址 ${index + 1}`}
                                className="form-control mb-2"
                            />
                            {image && (
                                <img
                                src={image}
                                alt={`副圖 ${index + 1}`}
                                className="img-fluid mb-2"
                                />
                            )}
                            </div>
                        ))}

                        <div className="d-flex justify-content-between">
                            {templateData.imagesUrl.length < 5 &&
                            templateData.imagesUrl[
                                templateData.imagesUrl.length - 1
                            ] !== "" && (
                                <ProductFormBtn
                                btnClassName={
                                    "btn btn-outline-primary btn-sm w-100"
                                }
                                onClickFunction={handleAddImage}
                                btnText={"新增圖片"}
                                />
                            )}

                            {templateData.imagesUrl.length >= 1 && (
                            <ProductFormBtn
                                btnClassName={"btn btn-outline-danger btn-sm w-100"}
                                onClickFunction={handleDeleteImage}
                                btnText={"取消圖片"}
                            />
                            )}
                        </div>
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <ProductFormInput
                        htmlFor={"title"}
                        labelName={"標題"}
                        inputType={"text"}
                        inputClassName={"form-control"}
                        id={"title"}
                        placeholder={"請輸入標題"}
                        templateDataKey={templateData.title}
                        onChangeFunction={handleInputChange}
                        />

                        <div className="row">
                        <ProductFormInput
                            divClassName={"col-md-6"}
                            htmlFor={"category"}
                            labelName={"分類"}
                            inputType={"text"}
                            inputClassName={"form-control"}
                            id={"category"}
                            placeholder={"請輸入分類"}
                            templateDataKey={templateData.category}
                            onChangeFunction={handleInputChange}
                        />
                        <ProductFormInput
                            divClassName={"col-md-6"}
                            htmlFor={"unit"}
                            labelName={"單位"}
                            inputType={"text"}
                            inputClassName={"form-control"}
                            id={"unit"}
                            placeholder={"請輸入單位"}
                            templateDataKey={templateData.unit}
                            onChangeFunction={handleInputChange}
                        />
                        </div>

                        <div className="row">
                        <ProductFormInput
                            divClassName={"col-md-6"}
                            htmlFor={"origin_price"}
                            labelName={"原價"}
                            inputType={"number"}
                            inputClassName={"form-control"}
                            id={"origin_price"}
                            placeholder={"請輸入原價"}
                            templateDataKey={templateData.origin_price}
                            onChangeFunction={handleInputChange}
                            min="0"
                        />
                        <ProductFormInput
                            divClassName={"col-md-6"}
                            htmlFor={"price"}
                            labelName={"售價"}
                            inputType={"number"}
                            inputClassName={"form-control"}
                            id={"price"}
                            placeholder={"請輸入售價"}
                            templateDataKey={templateData.price}
                            onChangeFunction={handleInputChange}
                        />
                        </div>

                        <hr />

                        <ProductFormInput
                        htmlFor={"description"}
                        labelName={"產品描述"}
                        inputType={"textarea"}
                        inputClassName={"form-control"}
                        id="description"
                        placeholder={"請輸入產品描述"}
                        templateDataKey={templateData.description}
                        onChangeFunction={handleInputChange}
                        />
                        <ProductFormInput
                        htmlFor={"content"}
                        labelName={"說明內容"}
                        inputType={"textarea"}
                        inputClassName={"form-control"}
                        id="content"
                        placeholder={"請輸入說明內容"}
                        templateDataKey={templateData.content}
                        onChangeFunction={handleInputChange}
                        />

                        <div className="row">
                        <ProductFormInput
                            divClassName={"col-md-6"}
                            htmlFor={"starRating"}
                            labelName={"商品評價星級"}
                            inputType={"number"}
                            inputClassName={"form-control"}
                            id="starRating"
                            placeholder={"請輸入商品評價星級"}
                            templateDataKey={templateData.starRating}
                            onChangeFunction={handleInputChange}
                            min="0"
                            max="5"
                        />

                        <div className="col-md-6  d-flex align-items-center">
                            <div className="form-check">
                            <input
                                id="is_enabled"
                                className="form-check-input mx-3"
                                type="checkbox"
                                checked={templateData.is_enabled}
                                onChange={handleInputChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="is_enabled"
                            >
                                是否啟用
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                <div className="modal-footer">
                {modalType === "delete" ? (
                    <>
                    <ProductFormBtn
                        btnClassName={"btn btn-danger"}
                        onClickFunction={() => deleteProduct(templateData.id)}
                        btnText={"刪除"}
                    />
                    </>
                ) : modalType === "edit" ? (
                    <>
                    <ProductFormBtn
                        btnClassName={"btn btn-primary"}
                        onClickFunction={() => updateProduct(templateData.id)}
                        btnText={"編輯"}
                    />
                    </>
                ) : (
                    <>
                    <ProductFormBtn
                        btnClassName={"btn btn-success"}
                        onClickFunction={() => updateProduct(templateData.id)}
                        btnText={"新增"}
                    />
                    </>
                )}

                <ProductFormBtn
                    btnClassName={"btn btn-outline-secondary"}
                    onClickFunction={() => closeModal()}
                    btnText={"取消"}
                />
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default ProductForm;
ProductForm.propTypes = {
    modalType: PropTypes.string.isRequired,
    templateData: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    unit: PropTypes.string,
    origin_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    content: PropTypes.string,
    is_enabled: PropTypes.bool,
    imagesUrl: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onCloseModal: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
    onImageChange: PropTypes.func.isRequired,
    onAddImage: PropTypes.func.isRequired,
    onRemoveImage: PropTypes.func.isRequired,
    onUpdateProduct: PropTypes.func.isRequired,
    onDeleteProduct: PropTypes.func.isRequired,
};
