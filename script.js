//
// Shared JavaScript for Portfolio Website
// ---
// This file handles the mobile navigation and the 3D animation on the home page.
//

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Logic ---
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Toggle mobile menu visibility
    menuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
    
    // Populate mobile nav with links
    const desktopLinks = document.querySelectorAll('.desktop-nav a');
    desktopLinks.forEach(link => {
        const mobileLink = document.createElement('a');
        mobileLink.href = link.href;
        mobileLink.textContent = link.textContent;
        mobileNav.appendChild(mobileLink);
    });

    // --- 3D Animation (Three.js) Logic ---
    const threeContainer = document.getElementById('three-container');
    if (threeContainer) {
        // Only run this code on the home page
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeContainer.appendChild(renderer.domElement);
        
        camera.position.z = 5;

        // Create a 3D Logo (a simple box to start, could be replaced with a more complex model)
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ffff, // Match the accent color
            roughness: 0.5,
            metalness: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Mouse interaction for a more personal touch
        const mouse = new THREE.Vector2();
        const target = new THREE.Vector2();
        const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

        document.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
            mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
        });

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Subtle rotation
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.001;

            // Follow mouse movement
            target.x = mouse.x * 0.5;
            target.y = mouse.y * 0.5;

            mesh.rotation.y += 0.05 * (target.x - mesh.rotation.y);
            mesh.rotation.x += 0.05 * (target.y - mesh.rotation.x);
            
            renderer.render(scene, camera);
        }
        
        // Handle window resizing
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Only start the animation once the page is fully loaded and the canvas exists
        window.onload = function() {
            if (document.getElementById('three-container')) {
                animate();
            }
        };
    }
});
