"use client";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { SiMongodb, SiExpress, SiNextdotjs, SiPostgresql, SiPrisma, SiDocker } from 'react-icons/si';
import { FaNodeJs, FaPython } from 'react-icons/fa';

const courses = [
  { name: 'Node.js', icon: <FaNodeJs size={64} className="course-icon nodejs" /> },
  { name: 'MongoDB', icon: <SiMongodb size={64} className="course-icon mongodb" /> },
  { name: 'Express', icon: <SiExpress size={64} className="course-icon express" /> },
  { name: 'Python', icon: <FaPython size={64} className="course-icon python" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql size={64} className="course-icon postgres" /> },
  { name: 'Prisma', icon: <SiPrisma size={64} className="course-icon prisma" /> },
  { name: 'Docker', icon: <SiDocker size={64} className="course-icon docker" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={64} className="course-icon nextjs" /> },
];

const Button = () => {
  return (
    <StyledWrapper>
      <div className="main">
        {/* First 4 course cards */}
        {courses.slice(0, 4).map(course => (
          <Link
            key={course.name}
            href={`/courses/${encodeURIComponent(course.name.toLowerCase().replace(/\s+/g, '-'))}`}
            className="card cursor-pointer"
          >
            {course.icon}
            <span className="label font-logo">{course.name}</span>
          </Link>
        ))}

        {/* Logo card (not linked) */}
        <div className="card">
          <Image
            src="/LogoWithoutText.png"
            alt="CodeLingo logo"
            width={88}
            height={88}
            className="logo filter brightness-0"
          />
        </div>

        {/* Remaining course cards */}
        {courses.slice(4).map(course => (
          <Link
            key={course.name}
            href={`/courses/${encodeURIComponent(course.name.toLowerCase().replace(/\s+/g, '-'))}`}
            className="card cursor-pointer"
          >
            {course.icon}
            <span className="label font-logo">{course.name}</span>
          </Link>
        ))}

        {/* Center text */}
        <p className="text">
          EXPLORE<br /><br /><br />COURSES
        </p>
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
    background: linear-gradient(270deg, #10b981, #06b6d4, #8b5cf6);
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

  .card .nodejs,
  .card .mongodb,
  .card .express,
  .card .python,
  .card .postgres,
  .card .prisma,
  .card .docker,
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
  .card .nodejs { color: #339933; }
  .card .react { color: #61dafb; }
  .card .mongodb { color: #47a248; }
  .card .python { color: #3776ab; }
  .card .express { color: #000000; }
  .card .nextjs { color: #000000; }

  .card:nth-child(2) { border-radius: 0px; }
  .card:nth-child(3) { border-top-right-radius: 20px; border-top-left-radius: 0px; }
  .card:nth-child(4) { border-radius: 0px; }
  .card:nth-child(5) { border-radius: 0px; }
  .card:nth-child(6) { border-radius: 0px; }
  .card:nth-child(7) { border-bottom-left-radius: 20px; border-top-left-radius: 0px; }
  .card:nth-child(8) { border-radius: 0px; }
  .card:nth-child(9) { border-bottom-right-radius: 20px; border-top-left-radius: 0px; }

  .main:hover {
    width: 28em;
    cursor: pointer;
  }

  .main:hover .main_back { opacity: 0; }

  .main:hover .card {
    margin: 0.4em;
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }

  .main:hover .card:nth-child(5) { border: transparent; }
  .main:hover .text { opacity: 0; z-index: -3; }

  .main:hover .nodejs,
  .main:hover .logo,
  .main:hover .mongodb,
  .main:hover .python,
  .main:hover .express,
  .main:hover .postgres,
  .main:hover .prisma,
  .main:hover .docker,
  .main:hover .nextjs { opacity: 1; }

  .card:hover .course-icon { opacity: 0.2; }
  .card:hover .label { opacity: 1; }

  .card:nth-child(1):hover { background-color: #06b6d4; }
  .card:nth-child(2):hover { background-color: #f7df1e; }
  .card:nth-child(3):hover { background-color: #339933; }
  .card:nth-child(4):hover { background-color: #61dafb; }
  .card:nth-child(5):hover { animation: backgroundIMG 0.1s; animation-fill-mode: forwards; }
  .card:nth-child(6):hover { background-color: #47a248; }
  .card:nth-child(7):hover { background-color: #3776ab; }
  .card:nth-child(8):hover { background-color: #000000; }
  .card:nth-child(9):hover { background-color: #000000; }

  @keyframes backgroundIMG {
    100% {
      background-image: linear-gradient(#bf66ff, #6248ff, #00ddeb);
    }
  }

  .text {
    position: absolute;
    font-size: 1.2em;
    transition: 0.4s ease-in-out;
    color: black;
    text-align: center;
    font-weight: bold;
    letter-spacing: 0.33em;
    z-index: 3;
  }
`;

export default Button;
