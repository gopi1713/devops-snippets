document.addEventListener("DOMContentLoaded", function() {
    // Load sidebar component
    const sidebarElements = document.querySelectorAll('[data-include="sidebar"]');
    
    sidebarElements.forEach(function(element) {
        const rootPath = element.getAttribute('data-root-path') || '';
        const activePage = element.getAttribute('data-active-page') || '';
        
        fetch(rootPath + '/components/sidebar.html')
            .then(response => response.text())
            .then(html => {
                // Replace placeholders with actual values
                html = html.replace(/ROOT_PATH/g, rootPath);
                html = html.replace(`${activePage}_ACTIVE`, 'active');
                
                // Set page title and icon
                const pageTitles = {
                    'HOME': 'Home',
                    'DOCKER': 'Docker Commands',
                    'GIT': 'Git Commands',
                    'MAGENTO': 'Magento Commands',
                    'MYSQL': 'MySQL Commands',
                    'OPENSEARCH': 'OpenSearch Commands',
                    'REDIS': 'Redis Commands',
                    'PACKAGES': 'Package Installation'
                };
                
                const pageIcons = {
                    'HOME': 'fas fa-home',
                    'DOCKER': 'fab fa-docker',
                    'GIT': 'fab fa-git-alt',
                    'MAGENTO': 'fas fa-shopping-cart',
                    'MYSQL': 'fas fa-database',
                    'OPENSEARCH': 'fas fa-search',
                    'REDIS': 'fas fa-server',
                    'PACKAGES': 'fas fa-box'
                };
                
                html = html.replace('PAGE_NAME', pageTitles[activePage] || 'Commands');
                html = html.replace('PAGE_ICON', pageIcons[activePage] || 'fas fa-code');
                
                // Remove all other active placeholders
                const pages = ['HOME', 'DOCKER', 'GIT', 'MAGENTO', 'MYSQL', 'OPENSEARCH', 'REDIS', 'PACKAGES'];
                pages.forEach(page => {
                    if (page !== activePage) {
                        html = html.replace(`${page}_ACTIVE`, '');
                    }
                });
                
                element.innerHTML = html;
                
                // Reattach event listener for sidebar toggle
                const toggleBtn = element.querySelector('#toggleSidebar');
                const sidebarNav = element.querySelector('.sidebar-nav');
                
                if (toggleBtn && sidebarNav) {
                    toggleBtn.addEventListener('click', function() {
                        sidebarNav.classList.toggle('show');
                    });
                }
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
                element.innerHTML = '<p>Error loading sidebar</p>';
            });
    });
});
