
import { toast } from "sonner";

// Konami code sequence
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

// Secret agent code sequence
const agentCode = ['0', '0', '7'];
let agentIndex = 0;

// Handle keydown events for easter eggs
export const handleEasterEggKeydown = (event: KeyboardEvent) => {
  // Konami code checker
  if (event.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateMatrixMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }

  // Agent code checker
  if (event.key === agentCode[agentIndex]) {
    agentIndex++;
    if (agentIndex === agentCode.length) {
      activateAgentMode();
      agentIndex = 0;
    }
  } else {
    agentIndex = 0;
  }
};

// Matrix rain effect
const activateMatrixMode = () => {
  toast("MATRIX MODE ACTIVATED", {
    description: "You've discovered a secret code!",
    duration: 3000,
  });
  
  document.body.classList.add('matrix-mode');
  setTimeout(() => {
    document.body.classList.remove('matrix-mode');
  }, 10000);
};

// Secret agent mode
const activateAgentMode = () => {
  toast("🕶️ SECRET AGENT MODE ACTIVATED", {
    description: "Agent status: Classified",
    duration: 3000,
  });
  
  document.body.classList.add('agent-mode');
  setTimeout(() => {
    document.body.classList.remove('agent-mode');
  }, 5000);
};
