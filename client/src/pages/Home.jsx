// pages/Home.jsx

import React from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import AcademySection from "../components/AcademySection";
import CourseList from '../components/courseList';
import "./home.css"; 

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <Navbar />
      <AcademySection />
      <h3 className="text-center main-title">Available Courses</h3>

      <div className='main-container'>
       <div className='courselist-container'>
        <CourseList />

        </div>
       
      </div>
    </div>
  );
}

