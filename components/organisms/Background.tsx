import React from 'react';
import { DecorativeCircle } from '../atoms/DecorativeCircle';
import { GradientBackground } from '../atoms/GradientBackground';

export const Background: React.FC = () => {
  return (
    <>
      <GradientBackground />
      <DecorativeCircle size={300} color="rgba(255, 107, 107, 0.1)" top={-100} right={-100} />
      <DecorativeCircle size={250} color="rgba(238, 90, 111, 0.1)" bottom={-50} left={-80} />
    </>
  );
};
