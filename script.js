document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    
    // Initially hide all categories except the first one
    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
        if (index > 0) {
            category.style.display = 'none';
        }
    });
    
    // Set the first sidebar item as active
    if (sidebarLinks.length > 0) {
        sidebarLinks[0].classList.add('active');
    }
    
    // Search functionality
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const commands = document.querySelectorAll('.command');
        
        // Show all categories when searching
        categories.forEach(category => {
            category.style.display = 'block';
        });
        
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
    
    // Toggle sidebar on mobile
    toggleSidebarBtn.addEventListener('click', function() {
        sidebarNav.classList.toggle('show');
    });
    
    // Handle sidebar navigation to show only selected category
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // On mobile, hide the sidebar after clicking a link
            if (window.innerWidth < 992) {
                sidebarNav.classList.remove('show');
            }
            
            // Clear search input when switching categories
            searchInput.value = '';
            
            // Get the target category ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all categories
            categories.forEach(category => {
                category.style.display = 'none';
            });
            
            // Show only the selected category
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.style.display = 'block';
                
                // Scroll to the top of the category
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
            
            // Update active class on sidebar items
            sidebarLinks.forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});
