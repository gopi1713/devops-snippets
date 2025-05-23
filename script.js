document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    
    // Toggle sidebar on mobile
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebarNav.classList.toggle('show');
        });
    }
    
    // Set active sidebar item based on current page
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
            link.classList.add('active');
        } else if (window.location.pathname.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Search functionality (only if search input exists on the page)
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const commands = document.querySelectorAll('.command');
            
            commands.forEach(function(command) {
                const title = command.querySelector('h3').textContent.toLowerCase();
                const code = command.querySelector('code').textContent.toLowerCase();
                const description = command.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || code.includes(searchTerm) || description.includes(searchTerm)) {
                    command.style.display = 'block';
                } else {
                    command.style.display = 'none';
                }
            });
        });
    }
});
