import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => {
  // --- Raindrop Ripple Animation Logic (retained) ---
  const rainbowColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
    '#FF0000', '#FF7F00', '#FFFF00',
  ];
  const numberOfRaindrops = 80;

  const raindropElements = Array.from({ length: numberOfRaindrops }).map((_, i) => {
    const colorIndex = i % rainbowColors.length;
    const color = rainbowColors[colorIndex];
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;

    const topPos = Math.random() * 100;
    const leftPos = Math.random() * 100;

    return (
      <div
        key={i}
        className="absolute raindrop-ripple-layer"
        style={{
          top: `${topPos}vh`,
          left: `${leftPos}vw`,
          backgroundColor: color,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          '--ripple-color': color,
        }}
      ></div>
    );
  });
  // --- End Raindrop Ripple Animation Logic ---

  return (
    // Main container - now acts as the scrollable content wrapper
    // The background animation will be outside this, fixed to viewport
    <div className="relative min-h-screen p-10 text-white overflow-y-auto bg-transparent z-10"> {/* bg-transparent as background is now fixed */}
      {/* FIXED BACKGROUND LAYER (NEW) */}
      {/* This div is positioned fixed to the viewport and covers the whole screen */}
      <div className="fixed inset-0 z-0 bg-gray-950 overflow-hidden pointer-events-none">
        {raindropElements}
      </div>

      {/* CSS for the Subtle Raindrop Ripple Animation (Moved here for fixed bg) */}
      <style>{`
        .raindrop-ripple-layer {
          width: 0;
          height: 0;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background-image: radial-gradient(circle at center, var(--ripple-color) 0%, transparent 60%);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          opacity: 0;
          animation-name: raindrop-ripple-anim;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          mix-blend-mode: screen;
          filter: blur(2px);
        }

        @keyframes raindrop-ripple-anim {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0;
          }
          10% {
            width: 8px;
            height: 8px;
            opacity: 0.8;
            filter: blur(1px);
          }
          20% {
            width: 20px;
            height: 20px;
            opacity: 0.6;
            filter: blur(2px);
          }
          70% {
            width: 100px;
            height: 100px;
            opacity: 0;
            filter: blur(15px);
          }
          100% {
            width: 0px;
            height: 0px;
            opacity: 0;
            filter: blur(0px);
          }
        }
      `}</style>

      {/* Main content remains on top - it will scroll */}
      {/* Its z-index ensures it's above the fixed background */}
      <div className="relative z-20"> 
        <Header userName="Admin" changeUser={props.changeUser} />
        <CreateTask />
        <AllTask allEmployees={props.allEmployees} />
      </div>
    </div>
  );
};

export default AdminDash;
