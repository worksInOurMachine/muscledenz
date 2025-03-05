'use client';

import React from 'react';

const Page= () => {
  return (
    <div className='min-h-screen py-12 px-6 sm:px-16 bg-gray-900 text-white'>
      <div className='max-w-5xl mx-auto text-center space-y-6'>
        <h1 className='text-5xl font-bold text-yellow-400'>About Us</h1>
        <p className='text-lg text-gray-300 leading-relaxed'>
          Welcome to <span className='text-yellow-400 font-semibold'>[Your Gym Name]</span>, where fitness meets dedication. Our mission is to provide a premium fitness experience with cutting-edge equipment, expert guidance, and a supportive community to help you achieve your fitness goals effectively.
        </p>
      </div>

      <div className='mt-12 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
        <img className='w-full h-auto rounded-lg shadow-lg' src='https://c4.wallpaperflare.com/wallpaper/349/881/191/body-building-bodybuilding-fitness-lifting-wallpaper-preview.jpg' alt='Gym Facility' />
        <div className='space-y-4'>
          <h2 className='text-3xl font-semibold text-yellow-400'>Why Choose Us?</h2>
          <p className='text-gray-300 leading-relaxed'>
            Our gym is designed for individuals who are serious about their health and fitness. Whether you're a beginner or a professional athlete, we offer tailored solutions to help you reach your peak potential.
          </p>
          <ul className='space-y-3 text-gray-300'>
            <li>✔️ Modern and high-tech fitness equipment</li>
            <li>✔️ Certified trainers with personalized coaching</li>
            <li>✔️ Customized workout and nutrition programs</li>
            <li>✔️ Supportive and motivating fitness community</li>
            <li>✔️ Spacious workout zones and recovery areas</li>
          </ul>
        </div>
      </div>

      <div className='mt-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8'>
        <img className='w-full h-auto rounded-lg shadow-lg' src='https://c4.wallpaperflare.com/wallpaper/349/881/191/body-building-bodybuilding-fitness-lifting-wallpaper-preview.jpg' alt='Gym Interior' />
        <img className='w-full h-auto rounded-lg shadow-lg' src='https://source.unsplash.com/400x300/?workout' alt='Personal Training' />
        <img className='w-full h-auto rounded-lg shadow-lg' src='https://source.unsplash.com/400x300/?fitness' alt='Fitness Community' />
      </div>
    </div>
  );
};

export default Page;
