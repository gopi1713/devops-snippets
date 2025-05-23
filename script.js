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
        const href = link.getAttribute('href');
        const path = window.location.pathname;
        
        // Better home link detection
        if ((path.endsWith('/index') || path.endsWith('/') || path === '') && 
            (href === 'index' || href === '/index' || href === '/' || href === '')) {
            link.classList.add('active');
        } 
        // For other pages
        else if (path.includes(href) && href !== 'index' && href !== '/' && href !== '') {
            link.classList.add('active');
        }
    });
    
    // Enhanced search functionality (only if search input exists on the page)
    if (searchInput) {
        // Use input event instead of keyup for better responsiveness
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const commands = document.querySelectorAll('.command');
            
            commands.forEach(function(command) {
                const title = command.querySelector('h3').textContent.toLowerCase();
                const code = command.querySelector('code').textContent.toLowerCase();
                const description = command.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || code.includes(searchTerm) || description.includes(searchTerm)) {
                    command.style.display = 'block';
                    
                    // Add highlight animation for better UX
                    if (searchTerm.length > 0) {
                        command.classList.add('search-match');
                        setTimeout(() => command.classList.remove('search-match'), 500);
                    }
                } else {
                    command.style.display = 'none';
                }
            });
        });
        
        // Add keyboard shortcut to focus search box (press '/')
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && document.activeElement !== searchInput) {
                searchInput.focus();
                e.preventDefault();
            }
        });
    }
    
    // Add search highlight animation styles
    document.head.insertAdjacentHTML('beforeend', `
    <style>
    .search-match {
        animation: highlightMatch 0.5s ease-in-out;
    }
    
    @keyframes highlightMatch {
        0% { background-color: rgba(52, 152, 219, 0.1); }
        50% { background-color: rgba(52, 152, 219, 0.3); }
        100% { background-color: transparent; }
    }
    </style>
    `);
});
