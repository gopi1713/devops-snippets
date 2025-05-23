document.addEventListener('DOMContentLoaded', function() {
    initializeCommandCopy();
});

// Function to initialize copy buttons for commands
function initializeCommandCopy() {
    // Wait for content to be loaded
    setTimeout(function() {
        const commandBlocks = document.querySelectorAll('.command');
        
        commandBlocks.forEach(function(command) {
            if (command.querySelector('.copy-button')) return;
            
            const codeElement = command.querySelector('code');
            if (!codeElement) return;
            
            // Create copy button with better UX
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
            
            copyButton.addEventListener('click', function() {
                const commandText = codeElement.textContent;
                
                navigator.clipboard.writeText(commandText)
                    .then(function() {
                        // Better visual feedback
                        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        copyButton.classList.add('copied');
                        
                        // Highlight the code briefly
                        codeElement.parentElement.style.boxShadow = '0 0 0 2px #27ae60';
                        
                        setTimeout(function() {
                            copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
                            copyButton.classList.remove('copied');
                            codeElement.parentElement.style.boxShadow = '';
                        }, 2000);
                    })
                    .catch(function(err) {
                        console.error('Could not copy text: ', err);
                        copyButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error!';
                        
                        setTimeout(function() {
                            copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
                        }, 2000);
                    });
            });
            
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
