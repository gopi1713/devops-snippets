document.addEventListener("DOMContentLoaded", function() {
    // Load sidebar component
    const sidebarElements = document.querySelectorAll('[data-include="sidebar"]');
    
    sidebarElements.forEach(function(element) {
        const rootPath = element.getAttribute('data-root-path') || '';
        const activePage = element.getAttribute('data-active-page') || '';
        
        fetch(rootPath + '/components/sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch sidebar: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Replace placeholders with actual values
                html = html.replace(/ROOT_PATH/g, rootPath);
                html = html.replace(`${activePage}_ACTIVE`, 'active');
                
                // Remove all other active placeholders
                const pages = ['HOME', 'DOCKER', 'GIT', 'MAGENTO', 'MAGENTO_INSTALL', 'MYSQL', 'OPENSEARCH', 'REDIS', 'PACKAGES'];
                pages.forEach(page => {
                    if (page !== activePage) {
                        html = html.replace(`${page}_ACTIVE`, '');
                    }
                });
                
                element.innerHTML = html;
                
                // Initialize sidebar controls AFTER sidebar is loaded
                initSidebarControls();
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
                element.innerHTML = `<p>Error loading sidebar: ${error.message}</p>`;
            });
    });
});

// Function to initialize sidebar controls after sidebar is loaded
function initSidebarControls() {
    const sidebar = document.getElementById('mainSidebar');
    const mainContent = document.querySelector('main');
    
    if (!sidebar) {
        console.warn('Sidebar element not found. Auto-hide functionality disabled.');
        return;
    }
    
    // Add a class to indicate loading is complete
    document.body.classList.add('page-loaded');
    
    // Set initial main content margin based on window width
    if (mainContent) {
        if (window.innerWidth < 768) {
            // On mobile, start collapsed
            sidebar.classList.add('collapsed');
            mainContent.style.marginLeft = '50px';
        } else {
            mainContent.style.marginLeft = '250px';
        }
    }
    
    let sidebarTimer;
    let isMouseOverSidebar = false;
    
    // Function to collapse the sidebar
    function collapseSidebar() {
        if (!isMouseOverSidebar && !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
            if (mainContent) {
                mainContent.style.marginLeft = '50px';
            }
        }
    }
    
    // Function to show the sidebar
    function showSidebar() {
        sidebar.classList.remove('collapsed');
        if (mainContent) {
            mainContent.style.marginLeft = '250px';
        }
        resetTimer();
    }
    
    // Function to reset the auto-hide timer
    function resetTimer() {
        clearTimeout(sidebarTimer);
        
        // Reduce timeout to ensure it's exactly 2 seconds
        sidebarTimer = setTimeout(collapseSidebar, 2000); // Strict 2 seconds
    }
    
    // Initialize the timer immediately for all pages
    // Call directly rather than waiting for any events
    resetTimer();
    
    // Track mouse movement over document to reveal sidebar
    document.addEventListener('mousemove', function(e) {
        if (sidebar.classList.contains('collapsed') && e.clientX < 50) {
            // Show sidebar when mouse is near the left edge
            showSidebar();
        } else {
            // Only reset the timer if the sidebar is expanded
            // This prevents resetting during normal mouse movement
            if (!sidebar.classList.contains('collapsed')) {
                resetTimer();
            }
        }
    });
    
    // Prevent auto-hide when mouse is over the sidebar
    sidebar.addEventListener('mouseenter', function() {
        isMouseOverSidebar = true;
        showSidebar(); // Ensure sidebar is visible
    });
    
    sidebar.addEventListener('mouseleave', function() {
        isMouseOverSidebar = false;
        resetTimer(); // Start the timer again
    });
    
    // Don't auto-hide when interacting with elements
    document.addEventListener('click', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('scroll', resetTimer);
}
