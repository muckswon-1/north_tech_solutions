import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   selectUserProducts } from "../../../features/products/productSlice";
import { selectUser } from "../../../features/auth/authSlice";
import MyListings from "./MyListings";
import NewProductForm from "./NewProductForm";
import { fetchUserProducts } from "../../../features/products/productThunks";

export default function ProductManager() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("")

 
 
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProducts(user.id));
    }
  }, [dispatch, user]);



  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm ? "Hide Product Form" : "Add New Product"}
        </button>
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </div>

      {showForm && <NewProductForm setErrorMsg={setErrorMsg}  setShowForm={setShowForm}/>}

      {/* List User Products */}
     <MyListings />
    </div>
  );
}
