document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    
    // Search functionality
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
    
    // Toggle sidebar on mobile
    toggleSidebarBtn.addEventListener('click', function() {
        sidebarNav.classList.toggle('show');
    });
    
    // Handle sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On mobile, hide the sidebar after clicking a link
            if (window.innerWidth < 992) {
                sidebarNav.classList.remove('show');
            }
            
            // Smooth scroll to the section
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in sidebar based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.category').forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.sidebar-item').forEach(function(item) {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add active class to sidebar items
    document.querySelector('.sidebar-nav').addEventListener('click', function(e) {
        if (e.target.classList.contains('sidebar-item')) {
            document.querySelectorAll('.sidebar-item').forEach(function(item) {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
});
