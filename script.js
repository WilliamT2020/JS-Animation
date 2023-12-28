const track = document.getElementById("image-track");

const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
    track.dataset.startPercentage = track.dataset.percentage || "0"; // Store the starting percentage
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";  
    track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = e.clientX - parseFloat(track.dataset.mouseDownAt),
          maxDelta = window.innerWidth / 2;

    // Adjust sensitivity for more scroll per drag
    const sensitivity = 10; 
    const percentage = (mouseDelta / maxDelta) * 100 * sensitivity,
          nextPercentageUnconstrained = parseFloat(track.dataset.startPercentage) - percentage;

    // Calculate the maximum scrollable distance based on the total width of images
    const totalImagesWidth = track.scrollWidth,
          maxScroll = totalImagesWidth - window.innerWidth, // Update this based on actual width
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -maxScroll);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translateX(${nextPercentage}px) translateY(-50%)`;
};

//  event listeners
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('mousemove', handleOnMove);
});
