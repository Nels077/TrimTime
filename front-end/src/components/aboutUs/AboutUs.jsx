// src/AboutUs.js
import React from 'react';

function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            About Our Barbershop Booking Service
          </h2>
        </div>
        <div className="mt-8 text-center">
          <p className="text-base text-gray-700">
            Welcome to our Barbershop Booking service! We are passionate about connecting you with the best barbershops and barbers in your area.
          </p>
          <p className="text-base text-gray-700">
            Our mission is to provide a seamless and convenient way for you to book your favorite services at recommended barbershops. Whether you're looking for a classic haircut, a stylish beard trim, or a relaxing shave, we've got you covered.
          </p>
          <p className="text-base text-gray-700">
            Explore our list of recommended barbershops, choose your preferred services, and easily book your appointment online. Enjoy a personalized grooming experience at your fingertips!
          </p>
          <p className="text-base text-gray-700">
            If you have any questions or suggestions, feel free to <a href="/contact" className="text-indigo-600 hover:text-indigo-500">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
