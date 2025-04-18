// src/components/useStudioLogic.js
import { useState, useEffect } from 'react';
import { gridCells, correctPositionsMap, guestComments } from './studioConfig';

export function useStudioLogic(difficulty) {
  const [placedItems, setPlaced] = useState({ host2:'cell-1-3' });
  const [doorClosed, setDoor] = useState(false);
  const [guestComment, setGuestComment] = useState('');
  const [showGuestComment, setShowComment] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => { setGuestComment(guestComments.initial); setShowComment(true); }, 500);
  }, []);

  const correctPositions = correctPositionsMap[difficulty];

  const handleDoorClick = () => { /* …toggle door & comment… */ };
  const handleDragStart = (e,id) => { /* … */ };
  const handleDrop = (e,cellId) => { /* …place, score, comment… */ };

  return {
    gridCells,
    dragItems, guestItem,
    placedItems, doorClosed,
    guestComment, showGuestComment,
    score, gameComplete,
    handleDoorClick, handleDragStart, handleDrop,
    setDifficulty: () => {}, // if you need it
  };
}