import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE, API_PATH } from "../../api/config";

const Cart = () => {
  const [cartData, setCartData] = useState({ carts: [] });
  // 加入讀取狀態，防止 API 尚未回傳時重複觸發
  const [isLoading, setIsLoading] = useState(false);

  // 1. 取得購物車列表
  const getCartData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(response.data.data);
    } catch (err) {
      alert("取得購物車失敗: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 更新數量 (PUT)
  const updateCartItem = async (id, product_id, qty) => {
    if (qty < 1) return; // 防止數量小於 1
    setIsLoading(true);
    try {
      const data = {
        data: {
          product_id,
          qty: Number(qty),
        },
      };
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`, data);
      getCartData(); // 更新完畢後重新取得列表
    } catch (err) {
      alert("更新數量失敗");
      setIsLoading(false);
      console.log(`error: ${err?.response?.data?.message}`);
      
    }
  };

  // 3. 刪除品項 (DELETE)
  const removeCartItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      getCartData(); // 刪除完畢後重新取得列表
    } catch (err) {
      alert("移除商品失敗");
      setIsLoading(false);
      console.log(`error: ${err?.response?.data?.message}`);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="container py-5">
      {cartData.carts?.length > 0 ? (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h4 className="mb-4 fw-bold">購物車內容</h4>
            {cartData.carts.map((item) => (
              <div key={item.id} className="row border-bottom py-4 align-items-center">
                {/* 商品圖片 */}
                <div className="col-3 col-md-2">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ height: "80px", width: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* 商品資訊 */}
                <div className="col-6 col-md-7">
                  <h5 className="fw-bold mb-1">{item.product.title}</h5>
                  <p className="text-muted small mb-2">{item.product.description || "精選商品項目"}</p>
                  <div className="d-flex align-items-center">
                    <div className="input-group input-group-sm" style={{ width: "120px" }}>
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        disabled={item.qty <= 1 || isLoading}
                        onClick={() => updateCartItem(item.id, item.product_id, item.qty - 1)}
                      >-</button>
                      <input type="text" className="form-control text-center bg-white" value={item.qty} readOnly />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        disabled={isLoading}
                        onClick={() => updateCartItem(item.id, item.product_id, item.qty + 1)}
                      >+</button>
                    </div>
                    <button
                      className="btn btn-link text-danger btn-sm ms-3 text-decoration-none"
                      onClick={() => removeCartItem(item.id)}
                      disabled={isLoading}
                    >
                      移除
                    </button>
                  </div>
                </div>

                {/* 價格小計 */}
                <div className="col-3 col-md-3 text-end">
                  <div className="text-muted small mb-4">NT${item.product.price.toLocaleString()}</div>
                  <div className="fw-bold fs-5 text-dark">NT${item.total.toLocaleString()}</div>
                </div>
              </div>
            ))}

            {/* 總計區塊 */}
            <div className="d-flex justify-content-end align-items-center mt-5">
              <span className="text-muted me-3">總計金額</span>
              <span className="h3 mb-0 fw-bold text-primary">NT${cartData.total?.toLocaleString()}</span>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-dark btn-lg px-5 py-3 shadow-sm rounded-pill" style={{ fontSize: '1rem' }}>
                確認訂單
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-4 text-muted" style={{ fontSize: '5rem' }}>🛒</div>
          <p className="fs-4 text-muted mb-4">購物車目前是空的喔！</p>
          <button className="btn btn-primary px-5 py-2 rounded-pill">回商店選購</button>
        </div>
      )}
    </div>
  );
};

export default Cart;