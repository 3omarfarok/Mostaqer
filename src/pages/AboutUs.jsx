import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaUsers,
  FaTrophy,
  FaCheckCircle,
  FaLightbulb,
  FaHandshake,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowRight,
  FaMapMarkerAlt,
  FaExclamationCircle,
} from "react-icons/fa";

const teamMembers = [
  {
    name: "Omar Farok",
    role: "Founder & CEO",
    image: "/Mostaqer/team/Farok.jpg",
    bio: "Omar has 10+ years of experience in the automotive industry and is passionate about solving urban parking challenges.",
    social: {
      linkedin: "https://linkedin.com/in",
      twitter: "https://twitter.com",
      email: "team@mostqer.com",
    },
  },
  {
    name: "Mahmoud Momean",
    role: "Chief Technology Officer",
    image: "/Mostaqer/team/Mahmoud.jpg",
    bio: "Mahmoud leads our technical team with expertise in developing smart parking solutions and mobile applications.",
    social: {
      linkedin: "https://linkedin.com/in",
      twitter: "https://twitter.com",
      email: "team@mostqer.com",
    },
  },
  {
    name: "A`laa Emad",
    role: "Head of Operations",
    image: "/Mostaqer/team/Alaa.jpg",
    bio: "A`laa oversees all operational aspects of our parking services, ensuring smooth experiences for all customers.",
    social: {
      linkedin: "https://linkedin.com/in",
      twitter: "https://twitter.com",
      email: "team@mostqer.com",
    },
  },
  {
    name: "Mo`amen Abdallah",
    role: "Marketing Director",
    image: "/Mostaqer/team/Moamen.jpg",
    bio: "Mo`amen has built our brand from the ground up and leads all marketing initiatives and partnerships.",
    social: {
      linkedin: "https://linkedin.com/in",
      twitter: "https://twitter.com",
      email: "team@mostqer.com",
    },
  },
  {
    name: "Mahmoud Gaber",
    role: "Financial Director",
    image: "/Mostaqer/team/Gaber.jpg",
    bio: "Gaber manages all financial operations with over 15 years of experience in corporate finance and investment.",
    social: {
      linkedin: "https://linkedin.com/in",
      twitter: "https://twitter.com",
      email: "team@mostqer.com",
    },
  },
  {
    name: "Shahd Rady",
    role: "Customer Experience Manager",
    image: "/Mostaqer/team/Rady.jpg",
    bio: "Rady ensures exceptional customer service and leads our support team with her customer-centric approach.",
    social: {
      linkedin: "https://linkedin.com/in",
      twitter: "https://twitter.com",
      email: "team@mostqer.com",
    },
  },
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description:
      "Mostqer was founded with a vision to revolutionize urban parking.",
  },
  {
    year: "2021",
    title: "Initial Launch",
    description:
      "Launched our services in the first 10 locations with great success.",
  },
  {
    year: "2022",
    title: "Expansion Phase",
    description:
      "Expanded to 30+ locations and introduced the mobile application.",
  },
  {
    year: "2023",
    title: "Partnership Program",
    description:
      "Started partnering with major businesses and property owners.",
  },
  {
    year: "2024",
    title: "Smart Parking Solutions",
    description:
      "Introduced AI-based parking prediction and advanced reservation system.",
  },
];

const values = [
  {
    icon: <FaUsers className="text-3xl text-primary" />,
    title: "Customer First",
    description:
      "We prioritize our customers' needs and continuously improve our services based on feedback.",
  },
  {
    icon: <FaTrophy className="text-3xl text-primary" />,
    title: "Excellence",
    description:
      "We strive for excellence in every aspect of our service and operations.",
  },
  {
    icon: <FaLightbulb className="text-3xl text-primary" />,
    title: "Innovation",
    description:
      "We embrace innovative solutions to create better parking experiences.",
  },
  {
    icon: <FaHandshake className="text-3xl text-primary" />,
    title: "Partnership",
    description:
      "We build strong partnerships with businesses, communities, and customers.",
  },
];

export default function AboutUs() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Form submission states
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission with Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Prepare data for Web3Forms
        const dataToSubmit = new FormData();
        dataToSubmit.append(
          "access_key",
          "d55ee638-ecb3-458d-9890-d37a1306dc54"
        );
        dataToSubmit.append("name", formData.name);
        dataToSubmit.append("email", formData.email);
        dataToSubmit.append("message", formData.message);

        const object = Object.fromEntries(dataToSubmit);
        const json = JSON.stringify(object);

        // Submit to Web3Forms API
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        }).then((res) => res.json());

        if (res.success) {
          // Show success message
          setFormSuccess(true);

          // Reset form
          setFormData({
            name: "",
            email: "",
            message: "",
          });

          // Hide success message after 5 seconds
          setTimeout(() => {
            setFormSuccess(false);
          }, 5000);
        } else {
          // Handle error
          console.error("Form submission failed", res);
          alert("Form submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="space-y-12 py-8 md:space-y-16 md:py-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-dark to-dark/90 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 md:w-48 h-24 md:h-48 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            About <span className="text-primary">Mostqer</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to revolutionize parking by making it convenient,
            accessible, and stress-free for everyone.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative mb-8 md:mb-0">
              <div className="w-full h-60 sm:h-80 bg-gray-200 dark:bg-dark-200 rounded-lg overflow-hidden">
                <img
                  src="/Mostaqer/team/CartoonGang.png"
                  alt="Mostqer Headquarters"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-primary rounded-md"></div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 dark:text-light">
              Our Story
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Mostqer was born out of a simple frustration that many urban
              dwellers face daily: finding convenient and affordable parking.
              Our founders experienced firsthand the challenges of circling
              blocks looking for parking spots and paying exorbitant fees for
              limited options.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Founded in 2020, we set out to create a platform that connects
              drivers with available parking spaces efficiently. By leveraging
              technology and building partnerships with parking lot owners,
              we've developed a solution that benefits both drivers and property
              owners.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Today, Mostqer serves thousands of customers across multiple
              locations, saving them time, money, and frustration when it comes
              to parking their vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="bg-gray-50 dark:bg-dark-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-lg shadow-lg">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <FaCar className="text-2xl sm:text-3xl text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 dark:text-light">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To transform the parking experience by providing accessible,
                affordable, and convenient parking solutions that save time and
                reduce stress for urban commuters and travelers.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-100 p-6 md:p-8 rounded-lg shadow-lg">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <FaLightbulb className="text-2xl sm:text-3xl text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 dark:text-light">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To be the leading parking solution provider, creating smarter
                cities where finding and securing parking is seamless, allowing
                people to focus on their destinations rather than worrying about
                where to park.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 dark:text-light">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-lg text-center hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-light">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 dark:text-light">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Team member image */}
              <div className="h-48 sm:h-56 md:h-64 bg-gray-200 dark:bg-dark-200 overflow-hidden">
                <img
                  src={member.image || `/api/placeholder/300/300`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Team member details */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1 dark:text-light">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-2 sm:mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 sm:mb-4">
                  {member.bio}
                </p>

                {/* Social links */}
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      <FaTwitter size={18} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      <FaEnvelope size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Growth Journey - COMPLETELY REDESIGNED TIMELINE FOR BETTER MOBILE RESPONSIVENESS */}
      <section className="bg-gray-50 dark:bg-dark-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 md:mb-12 dark:text-light">
            Our Growth Journey
          </h2>

          {/* Desktop timeline (hidden on mobile) */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Year circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold z-10">
                    {milestone.year.substring(2)}
                  </div>

                  {/* Content box - alternate sides */}
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "ml-auto pr-8" : "mr-auto pl-8"
                    }`}
                  >
                    <div className="bg-white dark:bg-dark-100 p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2 dark:text-light">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {milestone.year}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline (vertical, shown only on mobile) */}
          <div className="md:hidden relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/30"></div>

            {/* Timeline items */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative pl-12">
                  {/* Year circle */}
                  <div className="absolute left-0 top-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold z-10 transform -translate-x-1/2">
                    {milestone.year.substring(2)}
                  </div>

                  {/* Content box */}
                  <div className="bg-white dark:bg-dark-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-1 dark:text-light">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {milestone.year}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-gradient-to-r from-dark to-dark/90 text-white p-6 md:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6">Get In Touch</h3>
              <p className="text-gray-300 mb-6 md:mb-8">
                Have questions about Mostqer or interested in partnering with
                us? Contact our team today!
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <FaMapMarkerAlt className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-300">
                      123 Om Ali Street, Maganeen's House
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <FaEnvelope className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">omarmfarok.47@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 dark:text-light">
                Send Us a Message
              </h3>

              {/* Success message */}
              {formSuccess && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-center text-sm">
                  <FaCheckCircle className="mr-2" />
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 border ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-200 dark:text-light`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-200 dark:text-light`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2 border ${
                      errors.message
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-dark-200 dark:text-light`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                      <FaExclamationCircle className="mr-1" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}{" "}
                  {!isSubmitting && <FaArrowRight />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-dark to-dark/90 text-white py-10 md:py-16 rounded-xl text-center px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6">
            Ready to Experience Mostqer?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made parking
            stress-free with Mostqer
          </p>

          <Link
            to="/find-parking"
            className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-neon hover:bg-primary/90 transition-all text-base sm:text-lg font-semibold inline-block"
          >
            Find Parking Now
          </Link>
        </div>
      </section>
    </div>
  );
}