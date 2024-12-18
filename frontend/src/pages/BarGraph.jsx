import React from 'react';
import img from '../assets/DTUspots/bargraph.png'

function BarGraph() {
  return (
    <div className="w-full h-full flex items-center justify-center">
  <img 
    src={img}
    alt="Bar Graph"
    className="max-w-full max-h-full object-contain"
  />
</div>

  )
}

export default BarGraph;