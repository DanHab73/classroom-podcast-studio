// src/components/studioConfig.js

// Grid definition (5×5)
export const gridCells = Array.from({length:25}, (_,i) => {
    const row = Math.floor(i/5), col = i % 5;
    return {
      id: `cell-${row}-${col}`,
      row, col,
      isTable: row === 2 && col >=1 && col <=3,
      isTableCenter: row === 2 && col === 2,
      isDoor: row === 4 && col === 0
    };
  });
  
  // Drag items metadata
  export const dragItems = [
    { id: 'mic1', type: 'mic', iconName: 'Mic', description: 'Primary Microphone' },
    { id: 'host1', type: 'host', iconName: 'User', description: 'Host' },
    { id: 'camera', type: 'camera', iconName: 'Camera', description: 'Video Camera' },
    { id: 'mic2', type: 'mic', iconName: 'Mic', description: 'Guest Microphone' },
    { id: 'light', type: 'light', iconName: 'Lightbulb', description: 'Light Stand' },
    { id: 'headphones', type: 'headphones', iconName: 'Headphones', description: 'Headphones' },
    { id: 'mixer', type: 'mixer', iconName: 'Music', description: 'Audio Mixer' },
  ];
  
  // Guest is pre‑placed
  export const guestItem = { 
    id: 'host2', type: 'host', iconName: 'User', description: 'Guest' 
  };
  
  // Correct positions per difficulty
  export const correctPositionsMap = {
    easy: { mic1:['cell-2-1'], host1:['cell-1-1'], camera:['cell-3-2'], mic2:['cell-2-3'], host2:['cell-1-3'], light:['cell-4-2'] },
    medium: { ...this.easy, headphones:['cell-0-1','cell-0-3'] },
    hard: { ...this.medium, mixer:['cell-2-0'] },
  };
  
  // All the guest quips
  export const guestComments = {
    initial: "Guest: Ok, I'm here. I hope you know what you're doing!",
    doorOpen: "Guest: It's really noisy outside! Can we close that door?",
    // …and all the others you defined…
  };