import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => {
  return (
    <div className="relative min-h-screen p-10 text-white bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-y-auto">
      {/* NEW: More subtle, larger, and diffused animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Large, very blurred, slowly moving gradients */}
        <div className="absolute w-[800px] h-[800px] bg-indigo-700 opacity-5 rounded-full mix-blend-screen filter blur-3xl animate-nebula-slow top-[-200px] left-[-200px] animation-delay-0" />
        <div className="absolute w-[1000px] h-[1000px] bg-purple-700 opacity-5 rounded-full mix-blend-screen filter blur-3xl animate-nebula-medium bottom-[-300px] right-[-300px] animation-delay-3000" />
        <div className="absolute w-[700px] h-[700px] bg-blue-700 opacity-5 rounded-full mix-blend-screen filter blur-3xl animate-nebula-fast top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animation-delay-6000" />
        <div className="absolute w-[900px] h-[900px] bg-cyan-700 opacity-3 rounded-full mix-blend-screen filter blur-3xl animate-nebula-slow top-[20%] right-[-100px] animation-delay-9000" />
      </div>

      {/* NEW CSS ANIMATIONS for the subtle nebula effect */}
      <style>{`
        /* Keyframe animation for subtle, slow nebulous movement */
        @keyframes nebula-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translate(50px, -70px) scale(1.02) rotate(5deg);
            opacity: 0.08;
          }
        }
        @keyframes nebula-medium {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translate(-60px, 80px) scale(0.98) rotate(-8deg);
            opacity: 0.07;
          }
        }
        @keyframes nebula-fast {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translate(70px, -50px) scale(1.03) rotate(10deg);
            opacity: 0.09;
          }
        }

        .animate-nebula-slow {
          animation: nebula-slow 20s ease-in-out infinite alternate;
        }
        .animate-nebula-medium {
          animation: nebula-medium 25s ease-in-out infinite alternate;
        }
        .animate-nebula-fast {
          animation: nebula-fast 18s ease-in-out infinite alternate;
        }

        /* Utility classes for animation delays */
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-9000 { animation-delay: 9s; }
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
