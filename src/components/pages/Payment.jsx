 
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api/Api";
import PageWrapper from "../layout/PageWrapper";

// ✅ Fixed UPI regex
const validationSchema = Yup.object().shape({
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pin: Yup.string()
      .required("PIN is required")
      .matches(/^\d{6}$/, "PIN must be 6 digits"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  }),
  paymentMethod: Yup.string().required("Select a payment method"),
  upiId: Yup.string().when("paymentMethod", {
    is: "upi",
    then: (schema) =>
      schema
        .required("UPI ID is required")
        .matches(/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/, "Enter a valid UPI ID"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Payment = () => {
  const { cart, fetchCart, deleteFromCart } = useContext(CartContext);
  const { loggedInUser ,setLoggedInUser} = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log('hjkhjh')
  // console.log(loggedInUser)

  const [selectedAddress, setSelectedAddress] = useState(loggedInUser?.address || null);
  const [showAddressForm, setShowAddressForm] = useState(!selectedAddress);

  // ✅ Ensure cart refreshes when entering Payment
  useEffect(() => {
    if (loggedInUser) fetchCart();
     console.log(loggedInUser)
  }, [loggedInUser]);

  // ✅ Defensive cart calculations
  const itemCost = (cart || []).reduce(
    (total, item) => total + (item.productId?.price || item.price || 0) * item.quantity,
    0
  );
  const tax = itemCost * 0.1;
  const totalCost = itemCost + tax;



  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!loggedInUser) {
        toast.error("Please log in to place an order");
        return;
      }

      if (!cart || cart.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const addressToUse = values.address;

      // ✅ Backend expects only address (cart is fetched from DB)
      const payload = {
        address: `${addressToUse.street}, ${addressToUse.city}, ${addressToUse.state} - ${addressToUse.pin}. Mobile: ${addressToUse.mobile}`,
        paymentMethod: values.paymentMethod,
      };

      console.log("📦 Sending payload:", payload);
      const res = await api.post("/orders/create", payload, { withCredentials: true });

      if (res.data?.status !== "success") {
        toast.error(res.data?.message || "Order failed on server");
        return;
      }

      const newOrder = res.data.data;
      // console.log(`loggedin${loggedInUser}`)
       setLoggedInUser({ ...loggedInUser, address: addressToUse });
      
      // for (const item of cart){
      //   await deleteFromCart(item.productId._id);
      // }
     await fetchCart();

      toast.success("🎉 Order placed successfully!");
      navigate("/order", { state: { order: newOrder } });
    } catch (error) {
      console.error("❌ Payment error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Handle empty cart
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <Formik
          initialValues={{
            address:
              selectedAddress || { street: "", city: "", state: "", pin: "", mobile: "" },
            paymentMethod: "cod",
            upiId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, isSubmitting }) => (
            <Form className="flex flex-col md:flex-row gap-8">
              {/* Left: Address + Payment */}
              <div className="md:w-2/3 space-y-6">
                {/* Address Section */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                  {selectedAddress && !showAddressForm ? (
                    <div>
                      <div className="border p-4 rounded-md bg-gray-50">
                        <p>{selectedAddress.street}</p>
                        <p>
                          {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pin}
                        </p>
                        <p>Mobile: {selectedAddress.mobile}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(true)}
                        className="mt-3 text-emerald-500 text-sm font-medium"
                      >
                        Change Address
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {["street", "city", "state", "pin", "mobile"].map((field) => (
                        <div key={field}>
                          <label className="block text-gray-700 text-sm font-medium mb-1 capitalize">
                            {field}
                          </label>
                          <Field
                            type="text"
                            name={`address.${field}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name={`address.${field}`}
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Payment Method Section */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="flex space-x-4 mb-4">
                    {["cod" /*, "upi" */].map((method) => (
                      <label
                        key={method}
                        className={`px-4 py-2 rounded-md cursor-pointer ${
                          values.paymentMethod === method
                            ? "bg-emerald-700 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          className="hidden"
                        />
                        {method === "cod" ? "Cash on Delivery" : "UPI"}
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />
                  {/* {values.paymentMethod === "upi" && (
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Enter UPI ID
                      </label>
                      <Field
                        type="text"
                        name="upiId"
                        placeholder="example@upi"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="upiId"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )} */}
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className={`mt-6 w-full ${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-emerald-500 hover:bg-emerald-700"
                    } text-white font-medium py-3 px-4 rounded-md`}
                  >
                    {isSubmitting ? "Processing..." : `Place Order $${totalCost.toFixed(2)}`}
                  </button>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="md:w-1/3">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {(cart || []).map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium">
                            {item.productId?.name || item.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Qty: {item.quantity}{" "}
                            {item.size ? `| Size: ${item.size}` : ""}
                          </p>
                        </div>
                        <p className="font-medium">
                          ₹
                          {(
                            (item.productId?.price || item.price || 0) *
                            item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p>₹{itemCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax (10%)</p>
                      <p>₹{tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <p>Total</p>
                      <p>₹{totalCost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Payment;
