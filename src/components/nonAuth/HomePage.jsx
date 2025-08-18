import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../frontpage/NavBar";
import Footer from "../frontpage/Footer";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Élégance Nocturne",
      subtitle: "The Essence of Midnight",
      description:
        "A captivating blend of dark amber, black orchid, and smoky vanilla",
      price: "$225",
      bgColor: "bg-gradient-to-br from-gray-900 to-purple-900",
      image:
        "https://images.unsplash.com/photo-1606391376017-b6a28f19f45a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxoZVphYWE3MUhfWXx8ZW58MHx8fHx8",
    },
    {
      title: "Lumière d'Or",
      subtitle: "Golden Radiance",
      description: "Sun-kissed citrus, golden saffron, and precious woods",
      price: "$245",
      bgColor: "bg-gradient-to-br from-amber-800 to-yellow-600",
      image:
        "https://images.unsplash.com/photo-1748481080614-d965bf96f7c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyayUyMGF2ZW51ZSUyMHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Brise Marine",
      subtitle: "Oceanic Serenity",
      description: "Crisp sea salt, blue cypress, and mineral musk",
      price: "$210",
      bgColor: "bg-gradient-to-br from-blue-900 to-teal-700",
      image:
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=294&dpr=2&h=294&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTA0NDAzODh8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Velvet Oud",
      category: "Eau de Parfum",
      price: "$285",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyZnVtZXN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      name: "Jasmin Blanc",
      category: "Extrait de Parfum",
      price: "$265",
      image:
        "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHBhcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Cuir Noir",
      category: "Eau de Parfum",
      price: "$295",
      image:
        "https://images.unsplash.com/photo-1632928145408-ef47a7672964?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Rose de Mai",
      category: "Extrait de Parfum",
      price: "$275",
      image:
        "https://images.pexels.com/photos/31117962/pexels-photo-31117962.jpeg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Carousel Section */}
      <div className="relative h-screen pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 ${heroSlides[currentSlide].bgColor} flex items-center`}
          >
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-white"
                >
                  <motion.p
                    className="text-sm uppercase tracking-widest mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  <motion.h1
                    className="text-5xl md:text-6xl font-serif mb-6 leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  <motion.p
                    className="text-lg mb-8 max-w-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex items-center space-x-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Discover
                    </motion.button>
                    <motion.p className="text-2xl" whileHover={{ scale: 1.05 }}>
                      {heroSlides[currentSlide].price}
                    </motion.p>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex justify-center"
                >
                  <div className="relative w-64 h-96 md:w-80 md:h-112">
                    <motion.div
                      className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg"
                      initial={{ rotate: -5 }}
                      animate={{ rotate: 5 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 8,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-48 h-72 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                        <img
                          src={heroSlides[currentSlide].image}
                          alt={heroSlides[currentSlide].title}
                          className="w-48 h-72 object-cover rounded-lg"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight className="h-6 w-6" />
        </motion.button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-white bg-opacity-30"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>

      {/* Featured Collection Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Signature Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most coveted fragrances, crafted with rare ingredients and
              unparalleled artistry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden mb-4">
                  <motion.div
                    className="aspect-square bg-gray-100 flex items-center justify-center"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-3/4 h-3/4 bg-gray-200 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4 text-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-sm uppercase tracking-wider"
                        >
                          Quick Add
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.category}
                  </p>
                  <motion.p className="text-lg" whileHover={{ scale: 1.05 }}>
                    {product.price}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border-b border-black pb-1 text-sm uppercase tracking-wider"
              onClick={() => navigate("/shop")}
            >
              View All Fragrances
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Parallax Section */}
      <div className="relative h-96 md:h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gray-800"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center text-white px-6"
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-6">
                The Art of Perfumery
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                Each fragrance is a masterpiece, blending tradition with
                innovation to create scents that transcend time.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="border-2 border-white px-8 py-3 text-sm uppercase tracking-wider"
              >
                Our Craft
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Client Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what our discerning clients say about our fragrances.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The most exquisite fragrance I've ever worn. It's become my signature scent.",
                author: "Sophia Laurent",
                role: "Fashion Editor",
              },
              {
                quote:
                  "The longevity is remarkable. I receive compliments all day long.",
                author: "James Wilson",
                role: "Art Director",
              },
              {
                quote:
                  "A true masterpiece. The complexity reveals itself beautifully over time.",
                author: "Isabella Chen",
                role: "Luxury Buyer",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8"
                whileHover={{ y: -10 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-serif mb-2">
              Join Our World
            </h2>
            <p className="text-gray-600">
              Subscribe for exclusive launches, private events, and fragrance
              insights.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4"
          >
            <motion.div
              className="flex-1 border-b border-gray-300 focus-within:border-black transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full py-3 px-1 bg-transparent focus:outline-none"
              />
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#000000" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wider"
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
