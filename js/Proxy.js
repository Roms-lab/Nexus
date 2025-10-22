// js/Proxy.js - Placeholder proxy page (with Location and Fullscreen functionality)

// In a real application, you would need a backend service to handle proxy requests
// and route them through servers in different physical locations. The JavaScript
// on the frontend would then communicate with that backend to tell it which proxy
// server to use. This code simulates that client-side behavior.

let currentLocation = 'United States'; // Default location

// Function to handle location change (this is a client-side simulation)
function changeLocation(newLocation) {
    currentLocation = newLocation;
    console.log(`Proxy location set to: ${currentLocation}`);
    // Update the UI
    updateLocationDisplay();
    // In a real app, you would also trigger a backend call here:
    // fetch(`/api/set-proxy-location`, { method: 'POST', body: JSON.stringify({ location: newLocation }) });
}

// Function to update the location display in the UI
function updateLocationDisplay() {
    const locationDisplay = document.getElementById('current-location-display');
    if (locationDisplay) {
        locationDisplay.textContent = currentLocation;
    }
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // If not in fullscreen, request it
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
    } else {
        // If in fullscreen, exit it
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Create a simple proxy interface
function createProxyPage() {
    // Remove existing content
    document.body.innerHTML = '';

    // Create proxy page structure
    const proxyPage = document.createElement('div');
    proxyPage.style.cssText = `
        font-family: 'Inter', sans-serif;
        background-color: #121212;
        color: #E0E0E0;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 0;
        margin: 0;
    `;

    proxyPage.innerHTML = `
        <!-- Browser Header -->
        <div style="width: 100%; background-color: #1e1e1e; border-bottom: 1px solid #2d2d2d; padding: 10px 20px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #4CAF50; font-size: 14px;">●</span>
                <span style="color: #FFC107; font-size: 14px;">●</span>
                <span style="color: #F44336; font-size: 14px;">●</span>
            </div>
            <div style="flex-grow: 1; margin: 0 20px; background-color: #2d2d2d; border-radius: 5px; padding: 8px 15px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);">
                <span style="color: #B0B0B0; font-size: 14px;">nexus-proxy.local</span>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #B0B0B0; font-size: 14px; cursor: pointer;" onclick="window.location.reload();">⟳</span>
                <span style="color: #B0B0B0; font-size: 14px; cursor: pointer;">+</span>
                <span id="fullscreen-toggle" style="color: #B0B0B0; font-size: 14px; cursor: pointer;">&#x26F6;</span>
            </div>
        </div>
        
        <!-- Main Content Area -->
        <div style="max-width: 900px; width: 100%; text-align: center; margin-top: 50px; padding: 0 20px; box-sizing: border-box;">
            <h1 style="font-size: 3em; font-weight: 800; color: #00BFFF; text-shadow: 0 0 10px rgba(0,191,255,0.3); margin-bottom: 10px;">Nexus Proxy</h1>
            <p style="font-size: 1.1em; color: #B0B0B0; margin-bottom: 40px; font-weight: 300;">Your secure and private connection to the web.</p>
            
            <!-- Dashboard Layout -->
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">

                <!-- Status Indicators Card -->
                <div style="flex: 1 1 45%; min-width: 300px; background-color: #1e1e1e; border: 1px solid #2d2d2d; border-radius: 10px; padding: 30px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
                    <h2 style="margin: 0 0 20px 0; font-weight: 600; font-size: 1.5em; text-align: left; border-bottom: 1px solid #2d2d2d; padding-bottom: 15px;">Dashboard</h2>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background-color: #2d2d2d; border-radius: 5px;">
                            <span style="font-weight: 500;">Proxy Status</span>
                            <span style="color: #4CAF50; font-weight: bold;">Active</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background-color: #2d2d2d; border-radius: 5px;">
                            <span style="font-weight: 500;">Connection</span>
                            <span style="color: #00BFFF; font-weight: bold;">Secure</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background-color: #2d2d2d; border-radius: 5px;">
                            <span style="font-weight: 500;">Protocol</span>
                            <span style="color: #E0E0E0; font-weight: bold;">HTTPS</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 15px; background-color: #2d2d2d; border-radius: 5px;">
                            <span style="font-weight: 500;">Current Location</span>
                            <span id="current-location-display" style="color: #FFC107; font-weight: bold;">${currentLocation}</span>
                        </div>
                    </div>
                </div>

                <!-- Action Panel Card -->
                <div style="flex: 1 1 45%; min-width: 300px; background-color: #1e1e1e; border: 1px solid #2d2d2d; border-radius: 10px; padding: 30px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
                    <h2 style="margin: 0 0 20px 0; font-weight: 600; font-size: 1.5em; text-align: left; border-bottom: 1px solid #2d2d2d; padding-bottom: 15px;">Actions</h2>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <!-- Location Dropdown -->
                        <div style="text-align: left;">
                            <label for="location-select" style="font-size: 1em; font-weight: 500; display: block; margin-bottom: 8px;">Change Location</label>
                            <select id="location-select" style="width: 100%; padding: 10px; background-color: #2d2d2d; color: #E0E0E0; border: 1px solid #444; border-radius: 5px; font-size: 1em;">
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="Mexico">Mexico</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="France">France</option>
                                <option value="Germany">Germany</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Japan">Japan</option>
                                <option value="South Korea">South Korea</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Australia">Australia</option>
                                <option value="Brazil">Brazil</option>
                                <option value="South Africa">South Africa</option>
                                <option value="India">India</option>
                            </select>
                        </div>
                        <button style="width: 100%; background-color: #00BFFF; color: #121212; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 1em; text-transform: uppercase; letter-spacing: 1px; transition: background-color 0.3s ease;">Connect Now</button>
                        <button onclick="window.location.href='index.html'" style="width: 100%; background-color: #555; color: #E0E0E0; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 1em; text-transform: uppercase; letter-spacing: 1px; transition: background-color 0.3s ease;">Back to Nexus</button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <p style="color: #555; font-size: 0.9em; margin-top: 50px;">This is a placeholder for the actual proxy functionality. In a real implementation, this would handle proxy operations.</p>
        </div>
    `;

    document.body.appendChild(proxyPage);

    // Add event listener for the location change dropdown
    const locationSelect = document.getElementById('location-select');
    locationSelect.addEventListener('change', (event) => {
        changeLocation(event.target.value);
    });

    // Add event listener for the fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Update initial display
    updateLocationDisplay();
}

// Execute when loaded
createProxyPage();
