import React from 'react'

const VerticalScrollableCards = () => {
  return (
    <div className="snap-start snap-always">
      <div className="bg-gray-800 h-[92vh] p-4">
        <h2 className="text-lg font-semibold">Card 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  )
}

function Index() {
  return (
    <div className="px-4 snap-mandatory snap-y overflow-auto h-screen  no-scrollbar">
      <VerticalScrollableCards />
      <VerticalScrollableCards />
      <VerticalScrollableCards />
      <VerticalScrollableCards />
      <VerticalScrollableCards />
    </div>
  )
}

export default Index
