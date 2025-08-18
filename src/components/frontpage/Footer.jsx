import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif mb-4">Parfum Éternel</h3>
            <p className="text-gray-400 text-sm">
              Crafting timeless fragrances for the discerning individual since
              2010.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              {[
                "All Fragrances",
                "New Arrivals",
                "Best Sellers",
                "Gift Sets",
              ].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">
              Information
            </h4>
            <ul className="space-y-2">
              {["About Us", "Journal", "Contact", "Careers"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-4">
              {["Instagram", "Facebook", "Twitter", "Pinterest"].map(
                (item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                    whileHover={{ y: -3 }}
                  >
                    {item}
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Parfum Éternel. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;