// Get reference to the install button
const butInstall = document.getElementById('buttonInstall');

// Listen for 'beforeinstallprompt' event
// This event is fired when the user is about to be prompted to "install" a web app
window.addEventListener('beforeinstallprompt', (event) => {

    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;

    // Unhide the install button.
    butInstall.classList.toggle('hidden', false);
});

// Event listener for the install button
butInstall.addEventListener('click', async () => {

  // Get the deferred beforeinstallprompt event
  const promptEvent = window.deferredPrompt;

  // If the prompt event is not set, exit the function
  if (!promptEvent) {
   return;
  }

  // Trigger the installation prompt
  promptEvent.prompt();

  // Erase the deferredPrompt from memory
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle('hidden', true);
});

// Listen for 'appinstalled' event
// This event is fired when the user has successfully installed the app
window.addEventListener('appinstalled', (event) => {
    
  // Log the event to the console
  console.log('🌚', 'appinstalled', event);
});
