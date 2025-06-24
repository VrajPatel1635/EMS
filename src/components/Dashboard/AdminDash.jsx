import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => {
  return (
    // FIX: Changed h-screen to min-h-screen and overflow-hidden to overflow-y-auto
    // This allows the content to dictate the height and enables vertical scrolling when necessary.
    <div className="relative min-h-screen p-10 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-y-auto">
      {/* NEW ANIMATED BACKGROUND ELEMENTS */}
      {/* The background elements should also respect the scrolling for a continuous effect.
          Moving them inside the main scrollable div, but still keeping them absolute,
          will allow them to extend beyond the initial viewport height if content scrolls.
          If the desire is for the background to be fixed and content to scroll over it,
          we'd need a different approach (e.g., fixed positioning on a parent or global level).
          For now, keeping them within the scrollable content container makes them scroll with content.
      */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-flow top-[-50px] left-[-100px] animation-delay-0" />
        <div className="absolute w-[500px] h-[500px] bg-pink-600 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-flow top-[100px] left-[calc(50%-250px)] animation-delay-2000" />
        <div className="absolute w-[350px] h-[350px] bg-blue-600 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-flow bottom-[-50px] right-[-100px] animation-delay-4000" />
        <div className="absolute w-[450px] h-[450px] bg-green-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-flow top-[calc(50%-225px)] right-[-150px] animation-delay-6000" />
        <div className="absolute w-[600px] h-[600px] bg-orange-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-flow bottom-[0px] left-[calc(20%)] animation-delay-8000" />
      </div>

      {/* NEW CSS ANIMATIONS */}
      <style>{`
        @keyframes flow {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translate(20px, -30px) scale(1.05) rotate(15deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(-10px, 40px) scale(0.95) rotate(-10deg);
            opacity: 0.1;
          }
          75% {
            transform: translate(30px, -20px) scale(1.1) rotate(5deg);
            opacity: 0.25;
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.15;
          }
        }
        .animate-flow {
          animation: flow 10s ease-in-out infinite alternate; /* Longer duration, alternate direction */
        }
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-8000 { animation-delay: 8s; }
      `}</style>

      {/* Main content remains on top */}
      <div className="relative z-10">
        <Header userName="Admin" changeUser={props.changeUser} />
        {/*
          AdminDash needs to pass the allEmployees data to AllTask.
          The allEmployees prop should be coming from App.jsx -> AdminDash.
          Assuming props.allEmployees is available now, or it can be fetched
          from AuthContext directly in AllTask if AdminDash doesn't need to pass it explicitly.
          For consistency with previous AdminDash updates, I'm expecting props.allEmployees.
        */}
        <CreateTask />
        <AllTask allEmployees={props.allEmployees} />
      </div>
    </div>
  );
};

export default AdminDash;
