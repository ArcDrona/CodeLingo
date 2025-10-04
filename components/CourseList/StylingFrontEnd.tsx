"use client";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { SiTailwindcss, SiJavascript, SiNextdotjs, SiHtml5, SiCss3, SiTypescript, SiRedux } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';

const courses = [
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={64} className="course-icon tailwind" /> },
  { name: 'JavaScript', icon: <SiJavascript size={64} className="course-icon javascript" /> },
  { name: 'HTML5', icon: <SiHtml5 size={64} className="course-icon html5" /> },
  { name: 'React', icon: <FaReact size={64} className="course-icon react" /> },
  { name: 'CSS3', icon: <SiCss3 size={64} className="course-icon css3" /> },
  { name: 'TypeScript', icon: <SiTypescript size={64} className="course-icon typescript" /> },
  { name: 'Redux', icon: <SiRedux size={64} className="course-icon redux" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={64} className="course-icon nextjs" /> },
];

const Button = () => {
  return (
    <StyledWrapper>
      <div className="main">
        {/* Course cards */}
        {courses.slice(0, 4).map((course, idx) => (
          <Link
            key={course.name}
            href={`/courses/${encodeURIComponent(course.name.toLowerCase().replace(/\s+/g, '-'))}`}
            className="card"
          >
            {course.icon}
            <span className="label font-logo">{course.name}</span>
        </Link>
        ))}
        {/* Logo card (not linked) */}
        <div className="card">
          <Image src="/LogoWithoutText.png" alt="CodeLingo logo" width={88} height={88} className="logo filter brightness-0" />
        </div>
        {/* Remaining course cards */}
        {courses.slice(4).map((course, idx) => (
          <Link
            key={course.name}
            href={`/courses/${encodeURIComponent(course.name.toLowerCase().replace(/\s+/g, '-'))}`}
            className="card"
            style={{ cursor: 'pointer' }}
          >
            {course.icon}
            <span className="label font-logo">{course.name}</span>
        </Link>
        ))}
        <p className="text">EXPLORE<br /><br/><br />COURSES</p>
        <div className="main_back" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .main_back {
    position: absolute;
    border-radius: 10px;
    transform: rotate(90deg);
    width: 22em;
    height: 22em;
    background: linear-gradient(270deg, #03a9f4, #cc39a4, #ffb5d2);
    z-index: 0;
    box-shadow: inset 0px 0px 180px 5px #ffffff;
  }

  .main {
    display: flex;
    flex-wrap: wrap;
    width: 28em;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-top-left-radius: 20px;
    background: lightgrey;
    transition: 0.4s ease-in-out, 0.2s background-color ease-in-out,
      0.2s background-image ease-in-out;
    background: rgba(255, 255, 255, 0.596);
    backdrop-filter: blur(5px);
    border: 1px solid transparent;
    -webkit-backdrop-filter: blur(5px);
    position: relative;
    z-index: 1;
  }

  .card .tailwind,
  .card .javascript,
  .card .html5,
  .card .react,
  .card .css3,
  .card .typescript,
  .card .redux,
  .card .nextjs {
    opacity: 0;
    transition: 0.2s ease-in-out;
  }

  .label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: #111827;
    letter-spacing: 0.05em;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 2;
    text-shadow: 0 1px 1px rgba(255,255,255,0.6);
  }

  .card .tailwind { color: #06b6d4; }
  .card .javascript { color: #f7df1e; }
  .card .html5 { color: #e34f26; }
  .card .react { color: #61dafb; }
  .card .css3 { color: #1572B6; }
  .card .typescript { color: #3178C6; }
  .card .redux { color: #764abc; }
  .card .nextjs { color: #000000; }

  .card:nth-child(2) {
    border-radius: 0px;
  }

  .card:nth-child(2) .javascript {
    opacity: 0;
  }

  .card:nth-child(3) {
    border-top-right-radius: 20px;
    border-top-left-radius: 0px;
  }

  .card:nth-child(3) .html5 { opacity: 0; }

  .card:nth-child(4) {
    border-radius: 0px;
  }

  .card:nth-child(4) .react { opacity: 0; }

  .card:nth-child(5) {
    border-radius: 0px;
  }

  .card:nth-child(5) .logo {
    position: absolute;
    margin-left: 0.2em;
    margin-top: 0.2em;
    opacity: 1;
    transition: 0.2s ease-in-out;
    border-radius: 6px;
  }

  .card:nth-child(6) {
    border-radius: 0px;
  }

  .card:nth-child(6) .css3 { opacity: 0; }

  .card:nth-child(7) {
    border-bottom-left-radius: 20px;
    border-top-left-radius: 0px;
  }

  .card:nth-child(7) .typescript { opacity: 0; }

  .card:nth-child(8) {
    border-radius: 0px;
  }

  .card:nth-child(8) .redux { opacity: 0; }

  .card:nth-child(9) {
    border-bottom-right-radius: 20px;
    border-top-left-radius: 0px;
  }

  .card:nth-child(9) .nextjs { opacity: 0; }

  .main:hover {
    width: 28em;
    cursor: pointer;
  }

  .main:hover .main_back {
    opacity: 0;
  }

  .main:hover .card {
    margin: 0.4em;
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }

  .main:hover .card:nth-child(5) {
    border: transparent;
  }

  .main:hover .text {
    opacity: 0;
    z-index: -3;
  }

  .main:hover .tailwind { opacity: 1; }
  .main:hover .javascript { opacity: 1; }
  .main:hover .html5 { opacity: 1; }
  .main:hover .react { opacity: 1; }
  .main:hover .logo { opacity: 1; }
  .main:hover .css3 { opacity: 1; }
  .main:hover .typescript { opacity: 1; }
  .main:hover .redux { opacity: 1; }
  .main:hover .nextjs { opacity: 1; }

  .card:hover .course-icon { opacity: 0.2; }
  .card:hover .label { opacity: 1; }

  .card:nth-child(1):hover { background-color: #06b6d4; }
  .card:nth-child(1):hover .tailwind { color: white; }

  .card:nth-child(2):hover { background-color: #f7df1e; }
  .card:nth-child(2):hover .javascript { color: #1e1e1e; }

  .card:nth-child(3):hover { background-color: #e34f26; }
  .card:nth-child(3):hover .html5 { color: white; }

  .card:nth-child(4):hover { background-color: #61dafb; }
  .card:nth-child(4):hover .react { color: white; }

  .card:nth-child(5):hover {
    animation: backgroundIMG 0.1s;
    animation-fill-mode: forwards;
  }

  @keyframes backgroundIMG {
    100% {
      background-image: linear-gradient(#bf66ff, #6248ff, #00ddeb);
    }
  }

  .card:nth-child(6):hover { background-color: #1572B6; }
  .card:nth-child(6):hover .css3 { color: white; }

  .card:nth-child(7):hover { background-color: #3178C6; }
  .card:nth-child(7):hover .typescript { color: white; }

  .card:nth-child(8):hover { background-color: #764abc; }
  .card:nth-child(8):hover .redux { color: white; }

  .card:nth-child(9):hover { background-color: #000000; }
  .card:nth-child(9) .nextjs { color: white; }

  .text {
    position: absolute;
    font-size: 1.2em;
    transition: 0.4s ease-in-out;
    color: black;
    text-align: center;
    font-weight: bold;
    letter-spacing: 0.33em;
    z-index: 3;
  }`;

export default Button;
