// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const products = [ /* your products array */ ];

// const FeaturedCollection = () => {
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const navigate = useNavigate();

//   return (
//     <div className="py-20 px-6 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <motion.div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-serif mb-4">Signature Collection</h2>
//           <p className="text-gray-600">Our most coveted fragrances...</p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <motion.div
//               key={product.id}
//               className="group"
//               onMouseEnter={() => setHoveredProduct(product.id)}
//               onMouseLeave={() => setHoveredProduct(null)}
//             >
//               {/* image + hover add button */}
//               {/* --- keep existing code --- */}
//             </motion.div>
//           ))}
//         </div>

//         <motion.div className="text-center mt-16">
//           <motion.a onClick={() => navigate("/shop")} className="border-b border-black pb-1 text-sm uppercase">
//             View All Fragrances
//           </motion.a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCollection;
