import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => {
  // Generate some "light points" for the grid intersections or random glow
  const numberOfLights = 30; // Fewer, but more noticeable
  const pulsatingLights = Array.from({ length: numberOfLights }).map((_, i) => (
    <div
      key={i}
      className={`absolute bg-cyan-400 rounded-full animate-pulse-light mix-blend-screen`}
      style={{
        width: `${Math.random() * 8 + 4}px`, // Size 4px-12px
        height: `${Math.random() * 8 + 4}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`, // Random delay up to 5s
        animationDuration: `${Math.random() * 5 + 3}s`, // Pulse duration 3s-8s
        filter: `blur(${Math.random() * 5 + 2}px)`, // Random blur 2px-7px
        opacity: `${Math.random() * 0.2 + 0.3}` // Opacity between 0.3 and 0.5
      }}
    />
  ));

  return (
    <div className="relative min-h-screen p-10 text-white overflow-y-auto bg-gray-950">
      {/* Background layer for the animated grid and pulsating lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none animated-tech-grid">
        {pulsatingLights}
      </div>

      {/* NEW CSS for the Tech Grid and Pulsating Lights */}
      <style>{`
        .animated-tech-grid {
          /* Grid Pattern */
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px; /* Adjust grid cell size */
          background-position: 0 0;
          animation: grid-pan 60s linear infinite; /* Slow, continuous pan */
        }

        /* Keyframes for grid panning */
        @keyframes grid-pan {
          from { background-position: 0 0; }
          to { background-position: 40px 40px; } /* Shifts one grid cell to repeat */
        }

        /* Keyframes for light pulsing */
        @keyframes pulse-light {
          0%, 100% {
            transform: scale(1);
            opacity: var(--initial-opacity); /* Use initial random opacity */
          }
          50% {
            transform: scale(1.5); /* Grow larger */
            opacity: var(--pulsed-opacity, 0.6); /* Become brighter */
          }
        }

        .animate-pulse-light {
          animation: pulse-light var(--animation-duration) ease-in-out infinite alternate;
          /* Pass random opacity values from JS to CSS variables for keyframes */
          /* These will be set by inline style={{opacity: ...}} directly */
        }
      `}</style>

      {/* Main content remains on top */}
      <div className="relative z-10">
        <Header userName="Admin" changeUser={props.changeUser} />
        <CreateTask />
        <AllTask allEmployees={props.allEmployees} />
      </div>
    </div>
  );
};

export default AdminDash;
