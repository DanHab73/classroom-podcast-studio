// src/components/ClassroomPodcastStudio.jsx
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { useStudioLogic } from './useStudioLogic';
import { dragItems, guestItem } from './studioConfig';

export default function ClassroomPodcastStudio() {
  const [difficulty, setDifficulty] = useState('easy');
  const {
    gridCells,
    placedItems,
    doorClosed,
    guestComment,
    showGuestComment,
    score,
    gameComplete,
    handleDoorClick,
    handleDragStart,
    handleDrop
  } = useStudioLogic(difficulty);

  const requiredLabels = {
    easy:   ['host1','mic1','mic2','camera','light'],
    medium: ['host1','mic1','mic2','camera','light','headphones'],
    hard:   ['host1','mic1','mic2','camera','light','headphones','mixer']
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-pink-600 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Video Podcast Studio Setup</h1>
          <div className="flex items-center gap-2">
            {['easy','medium','hard'].map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors 
                  ${difficulty===level 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </header>

        {showGuestComment && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-gray-700">{guestComment}</p>
          </div>
        )}

        <div className="flex gap-6">
          <aside className="w-1/4 bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-800 mb-2">Equipment</h2>
            <div className="space-y-2">
              {dragItems.map(item => {
                const isPlaced   = Object.keys(placedItems).includes(item.id);
                const isRequired = requiredLabels[difficulty].includes(item.id);
                const Icon       = Icons[item.iconName];
                return (
                  <div
                    key={item.id}
                    draggable={!isPlaced}
                    onDragStart={e => handleDragStart(e, item.id)}
                    className={`flex items-center gap-2 p-2 rounded-md border shadow-sm cursor-grab
                      ${isPlaced   ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white'}
                      ${isRequired ? 'border-l-4 border-blue-500'        : 'border-gray-200'}`}
                  >
                    <Icon size={24} />
                    <span className="text-sm text-gray-800">{item.description}</span>
                    {isRequired && <span className="ml-auto text-xs text-blue-600">Required</span>}
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="flex-1 relative">
            <div className="relative grid grid-cols-5 gap-1 bg-gray-50 p-2 rounded-lg">
              {gridCells.map(cell => {
                const placedEntry = Object.entries(placedItems).find(([,loc]) => loc === cell.id);
                const placedId    = placedEntry?.[0];
                const iconName    = placedId === guestItem.id
                                    ? guestItem.iconName
                                    : dragItems.find(d => d.id === placedId)?.iconName;
                const IconComp    = iconName ? Icons[iconName] : null;
                const isCorrect   = IconComp && 
                  (require(`./studioConfig`).correctPositionsMap[difficulty][placedId] || [])
                    .includes(cell.id);

                return (
                  <div
                    key={cell.id}
                    onDrop={e => handleDrop(e, cell.id)}
                    onDragOver={e => e.preventDefault()}
                    className={`relative aspect-square flex items-center justify-center border bg-white
                      ${cell.isTable ? 'bg-amber-600' : ''}
                      ${cell.isDoor  ? 'bg-transparent border-0 cursor-pointer' : ''}`}
                  >
                    {cell.isDoor && (
                      <div onClick={handleDoorClick} className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-8 h-16 bg-gray-700 ${doorClosed ? 'rounded-bl-full' : 'rounded-l-full'}`} />
                      </div>
                    )}

                    {IconComp && (
                      <IconComp size={32} className={isCorrect ? 'text-green-500' : 'text-gray-800'} />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {gameComplete && (
          <footer className="mt-6 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-lg font-semibold">Your Score: {score}</p>
            <p className="mt-2 text-gray-700">
              {score >= requiredLabels[difficulty].length
                ? 'Excellent! Ready to record.'
                : 'Not quite there—try again.'}
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}