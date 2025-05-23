document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('mainSidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    
    // Exit early if sidebar element doesn't exist
    if (!sidebar) {
        console.warn('Sidebar element not found. Auto-hide functionality disabled.');
        return;
    }
    
    let sidebarTimer;
    let isMouseOverSidebar = false;
    
    // Function to collapse the sidebar
    function collapseSidebar() {
        if (sidebar && !isMouseOverSidebar && !sidebar.classList.contains('collapsed')) {
            sidebar.classList.add('collapsed');
        }
    }
    
    // Function to show the sidebar
    function showSidebar() {
        if (sidebar) {
            sidebar.classList.remove('collapsed');
            resetTimer();
        }
    }
    
    // Function to reset the auto-hide timer
    function resetTimer() {
        clearTimeout(sidebarTimer);
        sidebarTimer = setTimeout(collapseSidebar, 2000); // 2 seconds
    }
    
    // Initialize the timer when page loads
    resetTimer();
    
    // Track mouse movement over document to reveal sidebar
    document.addEventListener('mousemove', function(e) {
        if (sidebar && sidebar.classList.contains('collapsed') && e.clientX < 50) {
            // Show sidebar when mouse is near the left edge
            showSidebar();
        } else {
            resetTimer();
        }
    });
    
    // Toggle button click handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
                // If sidebar is now visible, reset timer
                if (!sidebar.classList.contains('collapsed')) {
                    resetTimer();
                }
            }
        });
    }
    
    // Prevent auto-hide when mouse is over the sidebar
    if (sidebar) {
        sidebar.addEventListener('mouseenter', function() {
            isMouseOverSidebar = true;
            showSidebar(); // Ensure sidebar is visible
        });
        
        sidebar.addEventListener('mouseleave', function() {
            isMouseOverSidebar = false;
            resetTimer(); // Start the timer again
        });
    }
    
    // Don't auto-hide when interacting with elements
    document.addEventListener('click', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('scroll', resetTimer);
});
