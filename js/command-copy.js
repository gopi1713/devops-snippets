document.addEventListener('DOMContentLoaded', function() {
    initializeCommandCopy();
});

// Function to initialize copy buttons for commands
function initializeCommandCopy() {
    // Wait for content to be loaded
    setTimeout(function() {
        const commandBlocks = document.querySelectorAll('.command');
        
        commandBlocks.forEach(function(command) {
            if (command.querySelector('.copy-button')) return; // Skip if already has button
            
            const codeElement = command.querySelector('code');
            if (!codeElement) return;
            
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            
            // Add copy functionality
            copyButton.addEventListener('click', function() {
                const commandText = codeElement.textContent;
                
                // Copy text to clipboard
                navigator.clipboard.writeText(commandText)
                    .then(function() {
                        // Visual feedback
                        copyButton.textContent = 'Copied!';
                        copyButton.classList.add('copied');
                        
                        // Reset after 2 seconds
                        setTimeout(function() {
                            copyButton.textContent = 'Copy';
                            copyButton.classList.remove('copied');
                        }, 2000);
                    })
                    .catch(function(err) {
                        console.error('Could not copy text: ', err);
                        copyButton.textContent = 'Error!';
                        
                        // Reset after 2 seconds
                        setTimeout(function() {
                            copyButton.textContent = 'Copy';
                        }, 2000);
                    });
            });
            
            // Add button to the command
            command.appendChild(copyButton);
        });
    }, 100);
}

// Add a mutation observer to watch for new command elements
const observer = new MutationObserver(function(mutations) {
    // When DOM changes, check if we need to add copy buttons
    const commandsWithoutButtons = document.querySelectorAll('.command:not(:has(.copy-button))');
    if (commandsWithoutButtons.length > 0) {
        initializeCommandCopy();
    }
});

// Start observing once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});
