"use client";
import { useState } from "react";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đặt tour thành công!");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto mt-6">
      {/* Thông tin khách hàng */}
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Thông Tin Khách Hàng
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <textarea
          name="note"
          rows="3"
          placeholder="Ghi chú"
          value={formData.note}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {/* Phương thức thanh toán */}
        <h2 className="text-2xl font-bold text-purple-700 mt-6">
          Chọn Phương Thức Thanh Toán
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          {["cash", "momo", "bank"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paymentMethod === method}
                onChange={() => handlePaymentSelect(method)}
              />
              <span>
                {method === "cash" && "Thanh toán tiền mặt khi đi tour"}
                {method === "momo" && "Ví MoMo"}
                {method === "bank" && "Chuyển khoản ngân hàng"}
              </span>
            </label>
          ))}
        </div>

        {/* Hiển thị thông tin chuyển khoản */}
        {paymentMethod === "bank" && (
          <div className="bg-gray-100 border-l-4 border-purple-600 p-4 mt-4 rounded-lg">
            <h3 className="font-semibold text-purple-700 mb-1">
              Thông tin chuyển khoản
            </h3>
            <p>
              Ngân hàng: <strong>Vietcombank</strong>
            </p>
            <p>
              Tên tài khoản: <strong>Le Van A</strong>
            </p>
            <p>
              STK: <strong>0123456789</strong>
            </p>
          </div>
        )}

        {/* Nút đặt tour */}
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold w-full py-3 rounded-lg mt-6 transition-all"
        >
          ĐẶT TOUR
        </button>
      </form>
    </div>
  );
}
