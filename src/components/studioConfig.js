// src/components/studioConfig.js

// 5×5 grid definition
export const gridCells = Array.from({ length: 25 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    return {
      id: `cell-${row}-${col}`,
      row,
      col,
      isTable: row === 2 && col >= 1 && col <= 3,
      isTableCenter: row === 2 && col === 2,
      isDoor: row === 4 && col === 0,
    };
  });
  
  // Draggable items metadata
  export const dragItems = [
    { id: 'mic1', type: 'mic', iconName: 'Mic', description: 'Primary Microphone' },
    { id: 'host1', type: 'host', iconName: 'User', description: 'Host' },
    { id: 'camera', type: 'camera', iconName: 'Camera', description: 'Video Camera' },
    { id: 'mic2', type: 'mic', iconName: 'Mic', description: 'Guest Microphone' },
    { id: 'light', type: 'light', iconName: 'Lightbulb', description: 'Light Stand' },
    { id: 'headphones', type: 'headphones', iconName: 'Headphones', description: 'Headphones' },
    { id: 'mixer', type: 'mixer', iconName: 'Music', description: 'Audio Mixer' },
  ];
  
  // Guest pre‑placed on the upper‑right cell
  export const guestItem = {
    id: 'host2',
    type: 'host',
    iconName: 'User',
    description: 'Guest',
  };
  
  // Correct positions per difficulty
  export const correctPositionsMap = {
    easy: {
      mic1:   ['cell-2-1'],
      host1:  ['cell-1-1'],
      camera: ['cell-3-2'],
      mic2:   ['cell-2-3'],
      host2:  ['cell-1-3'],
      light:  ['cell-4-2'],
    },
    medium: {
      mic1:      ['cell-2-1'],
      host1:     ['cell-1-1'],
      camera:    ['cell-3-2'],
      mic2:      ['cell-2-3'],
      host2:     ['cell-1-3'],
      light:     ['cell-4-2'],
      headphones:['cell-0-1','cell-0-3'],
    },
    hard: {
      mic1:      ['cell-2-1'],
      host1:     ['cell-1-1'],
      camera:    ['cell-3-2'],
      mic2:      ['cell-2-3'],
      host2:     ['cell-1-3'],
      light:     ['cell-4-2'],
      headphones:['cell-0-1','cell-0-3'],
      mixer:     ['cell-2-0'],
    },
  };
  
  // Guest commentary lines
  export const guestComments = {
    initial:           "Guest: Ok, I'm here. I hope you know what you're doing!",
    doorOpen:          "Guest: It's really noisy outside! Can we close that door?",
    hostTooClose:      "Guest: Whoa! I feel uncomfortable with you sitting so close. Personal space, please!",
    hostTooFar:        "Guest: Do I smell or something? Why are you sitting so far away?",
    hostCorrect:       "Guest: Perfect! I can see you clearly now. Let's have a great conversation!",
    micOffTable:       "Guest: Shouldn't the microphone be on the table? I can barely reach it!",
    micCorrect:        "Guest: Nice one! This mic position is perfect for my voice.",
    cameraOnTable:     "Guest: Don't you have a tripod? The camera shouldn't be on the table.",
    cameraCorrect:     "Guest: Great camera angle! My good side will look fabulous.",
    lightTooClose:     "Guest: The light hurts my eyes! Can you move it back?",
    lightCorrect:      "Guest: Perfect lighting! I look five years younger in this light.",
    generalBad:        "Guest: Hmm, I'm not sure about this...",
    difficultyChanged: "Guest: This should be interesting! Let's see how well you know podcast setups.",
  };