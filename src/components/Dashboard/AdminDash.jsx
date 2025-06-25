import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => {
  const rainbowColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
    // Repeating a few colors for smoother cycling with more drops
    '#FF0000', '#FF7F00', '#FFFF00',
  ];

  // Increased number of raindrops for a more "raining" feel
  const numberOfRaindrops = 80; // Adjust this for more/fewer raindrops

  const raindropElements = Array.from({ length: numberOfRaindrops }).map((_, i) => {
    const colorIndex = i % rainbowColors.length;
    const color = rainbowColors[colorIndex];
    // Randomize animation delays and durations for a non-repeating pattern
    const delay = Math.random() * 5; // Drops appear within 5 seconds
    const duration = Math.random() * 3 + 2; // Each ripple lasts 2-5 seconds

    // Randomize initial position across the entire screen
    const topPos = Math.random() * 100; // 0% to 100%
    const leftPos = Math.random() * 100; // 0% to 100%

    return (
      <div
        key={i}
        className="absolute raindrop-ripple-layer"
        style={{
          top: `${topPos}vh`, // Use vh/vw for full screen coverage
          left: `${leftPos}vw`,
          backgroundColor: color, // Base color for the ripple
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          // Pass color as a CSS variable for radial-gradient usage in CSS
          '--ripple-color': color,
        }}
      ></div>
    );
  });

  return (
    // Base dark background and main scrollable container
    <div className="relative min-h-screen p-10 text-white bg-gray-950 overflow-y-auto">
      {/* Background layer for the animated raindrops */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {raindropElements}
      </div>

      {/* NEW CSS for the Subtle Raindrop Ripple Animation */}
      <style>{`
        .raindrop-ripple-layer {
          /* Initial state is a tiny dot at the specific top/left */
          width: 0;
          height: 0;
          border-radius: 50%;
          transform: translate(-50%, -50%); /* Center the ripple origin */
          
          background-image: radial-gradient(circle at center, var(--ripple-color) 0%, transparent 60%);
          background-repeat: no-repeat;
          background-size: 100% 100%; /* The background-size relates to element's size */

          opacity: 0; /* Hidden initially */
          animation-name: raindrop-ripple-anim;
          animation-iteration-count: infinite; /* Continuous raining */
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Natural ripple ease */
          
          mix-blend-mode: screen; /* Lighten effect for overlaps with dark background */
          filter: blur(2px); /* Subtle blur for liquid feel */
        }

        @keyframes raindrop-ripple-anim {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0;
          }
          10% { /* Initial small burst */
            width: 8px; /* Small visible "drop" size */
            height: 8px;
            opacity: 0.8; /* More opaque at impact point */
            filter: blur(1px);
          }
          20% {
            width: 20px; /* Expands quickly */
            height: 20px;
            opacity: 0.6;
            filter: blur(2px);
          }
          70% { /* Expands to max size and fades */
            width: 100px; /* Max ripple diameter */
            height: 100px;
            opacity: 0;
            filter: blur(15px); /* Increased blur as it dissipates */
          }
          100% { /* Reset for next iteration */
            width: 0px;
            height: 0px;
            opacity: 0;
            filter: blur(0px);
          }
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
