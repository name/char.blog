import { get } from 'node_modules/axios/index.cjs';
import React from 'react';

interface GreetingProps {
  className?: string;
}

export function Greeting({ className = '' }: GreetingProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return (
    <h2 className={`text-4xl pb-4 font-bold ${className}`}>
      {getGreeting()}
    </h2>
  );
}

export function GreetingRaw() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return getGreeting();
}
