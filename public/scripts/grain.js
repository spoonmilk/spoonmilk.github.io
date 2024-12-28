const canvas = document.getElementById("grain-canvas");
const ctx = canvas.getContext("2d");

// Resize canvas to match the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create an offscreen canvas for pre-rendering grain
const offscreenCanvas = document.createElement("canvas");
const offCtx = offscreenCanvas.getContext("2d");

// Generate pre-rendered grain with a variable grain size
function generateGrainTexture(grainSize) {
    offscreenCanvas.width = grainSize * 16; // Scales with grain size
    offscreenCanvas.height = grainSize * 16;

    for (let y = 0; y < offscreenCanvas.height; y += grainSize) {
        for (let x = 0; x < offscreenCanvas.width; x += grainSize) {
            const intensity = Math.random() * 255; // Random grain intensity
            offCtx.fillStyle = `rgba(${intensity}, ${intensity}, ${intensity}, 0.15)`;
            offCtx.fillRect(x, y, grainSize, grainSize);
        }
    }
}

// Draw the grain onto the main canvas
function drawGrain(grainSize) {
    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate grain texture based on the current grain size
    generateGrainTexture(grainSize);

    // Apply the pre-rendered grain as a repeating pattern
    ctx.fillStyle = ctx.createPattern(offscreenCanvas, "repeat");
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Control the update frequency
let grainSize = 8; // Default grain size
function startGrainEffect() {
    setInterval(() => {
        drawGrain(grainSize); // Adjust grain size dynamically if needed
    }, 250); // Lower frequency updates for better performance (4fps)
}

// Allow dynamic grain size adjustment (e.g., via user input or UI)
window.addEventListener("keydown", (event) => {
    if (event.key === "+") {
        grainSize = Math.min(grainSize + 1, 20); // Increase grain size
    } else if (event.key === "-") {
        grainSize = Math.max(grainSize - 1, 1); // Decrease grain size
    }
});

// Start the effect
startGrainEffect();

