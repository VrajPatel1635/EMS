import React from 'react'

const InteractiveGrid = () => {
  const columns = 40
  const rows = 25
  const totalBoxes = columns * rows

  return (
    <div
      className="fixed top-0 left-0 w-full h-full grid -z-10"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`
      }}
    >
      {Array.from({ length: totalBoxes }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-800 hover:bg-blue-600 transition duration-100"
        ></div>
      ))}
    </div>
  )
}

export default InteractiveGrid
