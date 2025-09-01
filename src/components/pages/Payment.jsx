import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userApi } from "../../Api";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Validation schema
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
        // ✅ More flexible regex for UPI
        .matches(/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/, "Enter a valid UPI ID"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Payment = () => {
  const { cart } = useContext(CartContext);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(
    loggedInUser?.address ? loggedInUser.address : null
  );
  const [showAddressForm, setShowAddressForm] = useState(!selectedAddress);

  const itemCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = itemCost * 0.1;
  const totalCost = itemCost + tax;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const addressToUse = values.address;

      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart,
        total: totalCost,
        status: "processing",
        shippingAddress: addressToUse,
        paymentMethod: values.paymentMethod,
        upiId: values.paymentMethod === "upi" ? values.upiId : null,
      };

      const updatedUser = {
        ...loggedInUser,
        address: addressToUse,
        orders: [...(loggedInUser.orders || []), order],
        cart: [], // clear cart
      };

      await axios.patch(`${userApi}/${updatedUser.id}`, updatedUser);

      setLoggedInUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("🎉 Order placed successfully!");
      navigate("/order", { state: { order } });
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <Formik
          initialValues={{
            address: selectedAddress || {
              street: "",
              city: "",
              state: "",
              pin: "",
              mobile: "",
            },
            paymentMethod: "cod",
            upiId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, isSubmitting }) => (
            <Form className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-2/3">
                {/* Address Section */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Delivery Address
                  </h2>

                  {loggedInUser?.address && !showAddressForm ? (
                    <div>
                      <div className="border p-4 rounded-md bg-gray-50">
                        <p>{loggedInUser.address.street}</p>
                        <p>
                          {loggedInUser.address.city},{" "}
                          {loggedInUser.address.state} -{" "}
                          {loggedInUser.address.pin}
                        </p>
                        <p>Mobile: {loggedInUser.address.mobile}</p>
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
                      {["street", "city", "state", "pin", "mobile"].map(
                        (field) => (
                          <div key={field}>
                            <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
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
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Payment Section */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Payment Method
                  </h2>

                  <div className="flex space-x-4 mb-6">
                    <label
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        values.paymentMethod === "cod"
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        className="hidden"
                      />
                      Cash on Delivery
                    </label>

                    <label
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        values.paymentMethod === "upi"
                          ? "bg-emerald-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Field
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        className="hidden"
                      />
                      UPI
                    </label>
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-red-500 text-sm mb-2"
                  />

                  {values.paymentMethod === "upi" && (
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
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
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-6 w-full ${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-emerald-500 hover:bg-emerald-700"
                    } text-white font-medium py-3 px-4 rounded-md`}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Place Order $${totalCost.toFixed(2)}`}
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:w-1/3">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500 text-sm">
                            Qty: {item.quantity} | Size: {item.size}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p>${itemCost.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax (10%)</p>
                      <p>${tax.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between font-bold text-lg mt-4">
                      <p>Total</p>
                      <p>${totalCost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Payment;
