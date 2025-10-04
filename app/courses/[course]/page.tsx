'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import QuizScreen from '@/GameQuiz/QuizScreen';

export default function CourseDetailPage({ params }: { params: Promise<{ course: string }> }) {
  const unwrappedParams = React.use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const course = decodeURIComponent(unwrappedParams.course);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(`/courses/${unwrappedParams.course}`)}`);
    }
  }, [status, router, unwrappedParams.course]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return <QuizScreen course={course} />;
  }

  return null;
}