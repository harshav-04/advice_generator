document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".button");
    const textBlock = document.querySelector(".text-block");

    async function getQuote() {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");

            // Force parse the text (not json!)
            const rawText = await response.text();
            const data = JSON.parse(rawText); // Manually parse it as JSON

            const quote = data.slip.advice;

            textBlock.textContent = `"${quote}"`;
        } catch (error) {
            console.error("Error fetching quote:", error);
            textBlock.textContent = "Something went wrong!";
        }
    }

    // ✅ Call immediately on page load
    getQuote();

    // ✅ Also on button click
    button.addEventListener("click", () => {
        button.classList.add("paused"); // ⏸️ pause the wiggle

        // Call your quote function
        getQuote();

        // 🕒 Resume wiggle after a short pause
        setTimeout(() => {
            button.classList.remove("paused");
        }, 10000); // adjust pause time here (ms)
    });
});
