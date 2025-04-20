import { Link } from "react-router-dom";
import {
  FaCar,
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave,
  FaStar,
  FaParking,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

// Simplified data
const features = [
  {
    icon: <FaCar className="text-4xl text-primary" />,
    title: "Easy Parking",
    description: "Find and book parking spots with just a few clicks",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    title: "Secure Spaces",
    description: "All parking locations are monitored and secure",
  },
  {
    icon: <FaClock className="text-4xl text-primary" />,
    title: "24/7 Access",
    description: "Park your car anytime, day or night",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
    title: "Best Prices",
    description: "Competitive rates and special offers",
  },
];

const pricingPlans = [
  {
    name: "Hourly",
    price: "5",
    features: ["Flexible duration", "Any location", "24/7 support"],
  },
  {
    name: "Daily",
    price: "25",
    features: ["24-hour parking", "Reserved spot", "Premium locations"],
  },
  {
    name: "Monthly",
    price: "299",
    features: ["Unlimited access", "Reserved spot", "Priority support"],
  },
];

const testimonials = [
  {
    name: "Mohamed El-hadad",
    role: "Regular Customer",
    content: "Best parking service I've ever used. Very convenient and secure.",
    rating: 5,
  },
  {
    name: "Sheikh Belal",
    role: "Business Owner",
    content: "Perfect solution for my daily parking needs. Highly recommended!",
    rating: 5,
  },
  {
    name: "Adwy AboGyoshi",
    role: "Tourist",
    content: "Found great parking spots during my vacation. Excellent service!",
    rating: 4,
  },
];

const partners = [
  "Ayaa Hameed",
  "El-Gyoishi",
  "Rady Groub",
  "ElBolbol travel",
  "Mercedes-Benz",
  "Audi",
];

const stats = [
  { value: "10K+", label: "Happy Users" },
  { value: "50+", label: "Parking Locations" },
  { value: "99%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Customer Support" },
];

const howItWorks = [
  {
    icon: <FaSearch className="text-4xl text-primary" />,
    title: "Search",
    description: "Find available parking spots near your destination",
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-primary" />,
    title: "Reserve",
    description: "Choose your time and reserve your spot",
  },
  {
    icon: <FaCar className="text-4xl text-primary" />,
    title: "Park",
    description: "Show your confirmation and park with ease",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative bg-gradient-to-r from-dark to-dark/90 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:py-28 lg:px-8 lg:pl-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                The Smartest Way to{" "}
                <span className="text-primary">Park Your Car</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Save time and money with Mostqer's convenient parking solutions
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  to="/find-parking"
                  className="bg-primary text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-neon hover:bg-primary/90 hover:text-zinc-800 transition-all text-lg font-semibold inline-flex items-center gap-2"
                >
                  Find Parking Now <FaArrowRight />
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Add a stylized illustration or image placeholder */}
                <div className="w-80 h-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <FaParking className="text-primary text-8xl mx-auto mb-6" />
                    <div className="text-2xl font-bold text-white">
                      Mostqer Parking
                    </div>
                    <div className="text-gray-300 mt-4">
                      The future of parking is here
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  <FaCar />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                  <FaMapMarkerAlt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-dark-100 rounded-xl py-12 px-4 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary dark:text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-light">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-lg text-center hover:shadow-neon transition-all h-full">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 dark:text-light">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>

              {/* Connecting arrow */}
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                  <FaArrowRight className="text-2xl" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-light">
          Why Choose Mostqer?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-lg text-center hover:shadow-neon transition-all"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-light">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-light">
          Simple Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-100 p-8 rounded-lg shadow-lg hover:shadow-neon transition-all text-center"
            >
              <h3 className="text-2xl font-bold mb-2 dark:text-light">
                {plan.name}
              </h3>
              <div className="text-4xl font-bold text-primary mb-4">
                ${plan.price}
              </div>
              <ul className="space-y-3 mb-6 dark:text-gray-400">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 justify-center"
                  >
                    <FaCheckCircle className="text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/find-parking"
                className="block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 hover:text-zinc-800 transition-all"
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-dark-200 py-16 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-light">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="font-semibold dark:text-light">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-7xl mx-auto px-4 my-12 md:my-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-8 dark:text-light">
          Trusted Partners
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-100 p-3 md:p-4 rounded-lg shadow-lg text-center font-semibold hover:shadow-neon transition-all dark:text-light flex items-center justify-center min-h-16"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-dark to-dark/90 text-white py-16 rounded-xl text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Perfect Parking Spot?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made parking
            stress-free
          </p>

          <Link
            to="/find-parking"
            className="bg-primary text-white px-8 py-4 rounded-lg shadow-neon hover:bg-primary/90 hover:text-zinc-800 transition-all text-lg font-semibold inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/*Footer */}
    </div>
  );
}
