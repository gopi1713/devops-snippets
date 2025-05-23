document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const commands = document.querySelectorAll('.command');
        
        commands.forEach(function(command) {
            const title = command.querySelector('h3').textContent.toLowerCase();
            const code = command.querySelector('code').textContent.toLowerCase();
            const description = command.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || code.includes(searchTerm) || description.includes(searchTerm)) {
                command.style.display = 'block';
                // Make sure parent category is visible
                command.closest('.category').style.display = 'block';
            } else {
                command.style.display = 'none';
            }
        });
        
        // Hide empty categories
        document.querySelectorAll('.category').forEach(function(category) {
            const visibleCommands = category.querySelectorAll('.command[style="display: block;"]');
            if (visibleCommands.length === 0 && searchTerm !== '') {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });
    });
});
