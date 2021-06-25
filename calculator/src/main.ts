import './styles/styles.scss';

import { createButtons } from './structural/buttons';

// Export a main function for serverless functions
export function main(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }

  createButtons();
}

main();
