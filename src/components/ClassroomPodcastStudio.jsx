// src/components/ClassroomPodcastStudio.jsx
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { useStudioLogic } from './useStudioLogic';
import { dragItems, guestItem } from './studioConfig';

export default function ClassroomPodcastStudio() {
  const [difficulty, setDifficulty] = useState('easy');
  const {
    gridCells, placedItems, doorClosed, guestComment, showGuestComment,
    score, gameComplete,
    handleDoorClick, handleDragStart, handleDrop
  } = useStudioLogic(difficulty);

  return (
    <div className="bg-gradient-to-br from-purple-700 to-pink-600 p-6 min-h-screen">
      {/* …your JSX, mapping gridCells, dragItems, icons via <Icons[iconName]> … */}
    </div>
  );
}