// UserDashboard.jsx (Parent Layout Component)
import { useState } from "react";
import UserAccount from "./manageUserInfo/UserAccount";
import ProductManager from "./manageUserProducts/ProductManager.jsx";
import Company from "../company/Company.jsx";

export default function UserDashboard() {
  const [tab, setTab] = useState("account");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setTab("account")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            tab === "account"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
        >
          Edit Info
        </button>
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            tab === "products"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
        >
          My Products
        </button>
        <button
          onClick={() => setTab("company")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            tab === "company"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-blue-600"
          }`}
        >
          My Company
        </button>

      </div>

      {/* Tab Content */}
      {tab === "account" && <UserAccount />}
      {tab === "products" && <ProductManager />}
      {tab === "company" && <Company />}
    </div>
  );
}
