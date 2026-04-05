'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Full-Stack Developer',
  'ML Enthusiast',
  'Problem Solver',
  'React Developer',
  'Open Source Contributor',
];

export default function AnimatedText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <span className="text-coral">
      {roles[roleIndex].substring(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}
