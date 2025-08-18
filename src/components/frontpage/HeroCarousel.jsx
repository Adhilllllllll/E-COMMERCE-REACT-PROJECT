// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// const HeroCarousel = ({ slides }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   if (!slides || slides.length === 0) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-200">
//         <p>No slides available</p>
//       </div>
//     );
//   }

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

//   const prevSlide = () =>
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

//   const slide = slides[currentSlide];

//   return (
//     <div className="relative h-screen pt-16 overflow-hidden">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={slide.id}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8 }}
//           className={`absolute inset-0 ${slide.bgColor} flex flex-col md:flex-row items-center justify-center text-white`}
//         >
//           {/* Text Section */}
//           <div className="max-w-xl p-6 text-center md:text-left">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4">
//               {slide.title}
//             </h1>
//             <p className="text-lg md:text-xl mb-6">{slide.description}</p>
//             <button className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition">
//               Shop Now
//             </button>
//           </div>

//           {/* Image Section */}
//           <div className="max-w-md">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="rounded-xl shadow-lg"
//             />
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Controls */}
//       <motion.button
//         onClick={prevSlide}
//         className="absolute left-6 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-black/60"
//       >
//         <FiChevronLeft className="h-6 w-6" />
//       </motion.button>
//       <motion.button
//         onClick={nextSlide}
//         className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-black/40 p-2 rounded-full hover:bg-black/60"
//       >
//         <FiChevronRight className="h-6 w-6" />
//       </motion.button>

//       {/* Indicators */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentSlide === index ? "bg-white" : "bg-opacity-40 bg-white"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroCarousel;
