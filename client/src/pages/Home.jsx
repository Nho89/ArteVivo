// pages/Home.jsx

import React from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import AcademySection from "../components/AcademySection";
import CourseList from "../components/courseList";
import "./home.css";  // برای استایل‌های صفحه اصلی

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <Navbar />
      <AcademySection />
      <div className='main-container'>
        <h3 className="text-center main-title">Available Courses</h3>
        <CourseList />
      </div>
    </div>
  );
}

