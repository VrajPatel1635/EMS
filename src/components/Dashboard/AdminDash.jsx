import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => {
  // Generate an array of particle elements with random initial positions and delays
  // Adjust the number of particles (e.g., 50, 100, 200) based on desired density and performance
  const numberOfParticles = 80;
  const particles = Array.from({ length: numberOfParticles }).map((_, i) => (
    <div
      key={i}
      className={`absolute bg-white rounded-full opacity-[0.03] filter blur-sm animate-particle`}
      style={{
        width: `${Math.random() * 3 + 1}px`, // Random size between 1px and 4px
        height: `${Math.random() * 3 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`, // Random delay up to 20 seconds
        animationDuration: `${Math.random() * 40 + 20}s`, // Random duration between 20s and 60s
      }}
    />
  ));

  return (
    <div className="relative min-h-screen p-10 text-white bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-y-auto">
      {/* Background container for particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {particles}
      </div>

      {/* NEW CSS ANIMATIONS for the subtle particle effect */}
      <style>{`
        /* Keyframe animation for gentle particle drift and shimmer */
        @keyframes particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.03;
          }
          25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8});
            opacity: ${Math.random() * 0.05 + 0.02}; /* Subtle shimmer */
          }
          50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8});
            opacity: 0.03;
          }
          75% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8});
            opacity: ${Math.random() * 0.05 + 0.02};
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.03;
          }
        }

        .animate-particle {
          animation: particle var(--animation-duration) ease-in-out infinite alternate;
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
