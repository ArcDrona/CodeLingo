'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaChartBar, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Mock data for user performance
const mockUserData = {
  overallProgress: 68, // percentage
  totalQuizzesTaken: 42,
  totalCorrectAnswers: 156,
  totalWrongAnswers: 84,
  coursePerformance: [
    { name: 'JavaScript', correct: 85, wrong: 15, skipped: 5, difficulty: { easy: 90, medium: 80, hard: 70 } },
    { name: 'React', correct: 75, wrong: 20, skipped: 5, difficulty: { easy: 95, medium: 70, hard: 60 } },
    { name: 'HTML5', correct: 95, wrong: 5, skipped: 0, difficulty: { easy: 100, medium: 90, hard: 80 } },
    { name: 'CSS3', correct: 90, wrong: 8, skipped: 2, difficulty: { easy: 95, medium: 85, hard: 75 } },
    { name: 'TypeScript', correct: 65, wrong: 30, skipped: 5, difficulty: { easy: 80, medium: 60, hard: 40 } },
    { name: 'Node.js', correct: 60, wrong: 35, skipped: 5, difficulty: { easy: 75, medium: 55, hard: 35 } },
  ],
  recentActivity: [
    { date: '2023-06-01', course: 'JavaScript', score: 8, outOf: 10 },
    { date: '2023-06-03', course: 'React', score: 7, outOf: 10 },
    { date: '2023-06-05', course: 'TypeScript', score: 6, outOf: 10 },
    { date: '2023-06-07', course: 'Node.js', score: 6, outOf: 10 },
  ],
};

// Helper function to get personalized recommendations
function getRecommendations(data) {
  // Find courses with lowest performance
  const sortedByPerformance = [...data.coursePerformance].sort((a, b) => 
    (a.correct / (a.correct + a.wrong)) - (b.correct / (b.correct + b.wrong))
  );
  
  const weakestCourse = sortedByPerformance[0];
  const secondWeakestCourse = sortedByPerformance[1];
  
  // Find difficulty areas
  const difficultyChallenges = data.coursePerformance.reduce((acc, course) => {
    const hardScore = course.difficulty.hard;
    if (hardScore < 60) {
      acc.push(`${course.name} (advanced topics)`); 
    }
    return acc;
  }, []);
  
  return {
    focusAreas: [weakestCourse.name, secondWeakestCourse.name],
    difficultyChallenges
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(mockUserData);
  const recommendations = getRecommendations(userData);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const pieData = [
    { name: 'Correct', value: userData.totalCorrectAnswers },
    { name: 'Wrong', value: userData.totalWrongAnswers },
  ];

  const barData = userData.coursePerformance.map(course => ({
    name: course.name,
    correct: course.correct,
    wrong: course.wrong,
    skipped: course.skipped,
  }));

  const difficultyData = userData.coursePerformance.map(course => ({
    name: course.name,
    easy: course.difficulty.easy,
    medium: course.difficulty.medium,
    hard: course.difficulty.hard,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your progress and performance across all courses
          </p>
        </div>

        {/* User Profile Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {session?.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt="Profile" 
                  width={64} 
                  height={64} 
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white">
                  <FaUser size={24} />
                </div>
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{session?.user?.name || 'User'}</h2>
              <p className="text-sm text-gray-500">{session?.user?.email || 'user@example.com'}</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-teal-600">{userData.overallProgress}%</div>
              <p className="text-sm text-gray-500">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                <FaChartBar size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Quizzes</h3>
                <p className="text-2xl font-bold text-gray-900">{userData.totalQuizzesTaken}</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaCheckCircle size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Correct Answers</h3>
                <p className="text-2xl font-bold text-gray-900">{userData.totalCorrectAnswers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <FaTimesCircle size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Wrong Answers</h3>
                <p className="text-2xl font-bold text-gray-900">{userData.totalWrongAnswers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Performance Pie Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#00C49F' : '#FF8042'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Performance Bar Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Course Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" fill="#00C49F" />
                  <Bar dataKey="wrong" fill="#FF8042" />
                  <Bar dataKey="skipped" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Difficulty Performance */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance by Difficulty</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={difficultyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="easy" fill="#00C49F" name="Easy" />
                <Bar dataKey="medium" fill="#FFBB28" name="Medium" />
                <Bar dataKey="hard" fill="#FF8042" name="Hard" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaExclamationTriangle size={24} />
            </div>
            <h3 className="ml-3 text-lg font-medium text-gray-900">Personalized Recommendations</h3>
          </div>
          
          <div className="border-l-4 border-yellow-400 pl-4 py-2 mb-4">
            <p className="text-gray-700">Based on your performance, we recommend focusing on these areas:</p>
            <ul className="mt-2 list-disc list-inside text-gray-600">
              {recommendations.focusAreas.map((area, index) => (
                <li key={index}>{area} - Review fundamentals and practice more</li>
              ))}
            </ul>
          </div>
          
          {recommendations.difficultyChallenges.length > 0 && (
            <div className="border-l-4 border-red-400 pl-4 py-2">
              <p className="text-gray-700">You're finding these topics particularly challenging:</p>
              <ul className="mt-2 list-disc list-inside text-gray-600">
                {recommendations.difficultyChallenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6">
            <p className="text-sm text-gray-500">Continue practicing regularly to improve your skills!</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userData.recentActivity.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.score}/{activity.outOf} 
                      <span className={`ml-2 inline-block w-2 h-2 rounded-full ${activity.score / activity.outOf >= 0.7 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}