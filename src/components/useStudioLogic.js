// src/components/useStudioLogic.js
import { useState, useEffect } from 'react';
import {
  gridCells,
  dragItems,
  guestItem,
  correctPositionsMap,
  guestComments
} from './studioConfig';

export function useStudioLogic(difficulty) {
  const [placedItems, setPlacedItems] = useState({ host2: 'cell-1-3' });
  const [doorClosed, setDoorClosed] = useState(false);
  const [guestComment, setGuestComment] = useState('');
  const [showGuestComment, setShowGuestComment] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      setGuestComment(guestComments.initial);
      setShowGuestComment(true);
    }, 500);
  }, []);

  // Post‑drop feedback
  function checkPlacementForComments(itemId, cellId) {
    if (!doorClosed) return;
    const row = Number(cellId.split('-')[1]);
    const col = Number(cellId.split('-')[2]);
    const correctCells = correctPositionsMap[difficulty][itemId] || [];

    // Simple logic: perfect vs general
    if (correctCells.includes(cellId)) {
      // pick right comment key
      const keyMap = {
        host1: 'hostCorrect',
        mic1: 'micCorrect',
        mic2: 'micCorrect',
        camera: 'cameraCorrect',
        light: 'lightCorrect'
      };
      const key = keyMap[itemId] || 'generalBad';
      setGuestComment(guestComments[key]);
    } else {
      setGuestComment(guestComments.generalBad);
    }
    setShowGuestComment(true);
  }

  // Toggle door
  const handleDoorClick = () => {
    const closing = !doorClosed;
    setDoorClosed(closing);
    setGuestComment(closing
      ? guestComments.difficultyChanged
      : guestComments.doorOpen
    );
    setShowGuestComment(true);
  };

  // Begin drag
  const handleDragStart = (e, id) => {
    if (!doorClosed) {
      e.preventDefault();
      setGuestComment(guestComments.doorOpen);
      setShowGuestComment(true);
      return;
    }
    e.dataTransfer.setData('text/plain', id);
  };

  // On drop
  const handleDrop = (e, cellId) => {
    e.preventDefault();
    if (!doorClosed) {
      setGuestComment(guestComments.doorOpen);
      setShowGuestComment(true);
      return;
    }
    const itemId = e.dataTransfer.getData('text/plain');
    if (Object.values(placedItems).includes(cellId)) {
      setGuestComment(guestComments.generalBad);
      setShowGuestComment(true);
      return;
    }
    const updated = { ...placedItems, [itemId]: cellId };
    setPlacedItems(updated);
    checkPlacementForComments(itemId, cellId);

    // Check if all required items are placed
    const required = difficulty === 'easy'
      ? ['host1','mic1','mic2','camera','light','host2']
      : difficulty === 'medium'
        ? ['host1','mic1','mic2','camera','light','host2','headphones']
        : ['host1','mic1','mic2','camera','light','host2','headphones','mixer'];

    if (required.every(i => updated[i])) {
      // Score it
      const correctCells = correctPositionsMap[difficulty];
      const newScore = Object.entries(updated).reduce((sum, [i, c]) =>
        (correctCells[i] || []).includes(c) ? sum + 1 : sum
      , 0);
      setScore(newScore);
      setGameComplete(true);
    }
  };

  return {
    gridCells,
    dragItems,
    guestItem,
    placedItems,
    doorClosed,
    guestComment,
    showGuestComment,
    score,
    gameComplete,
    handleDoorClick,
    handleDragStart,
    handleDrop
  };
}