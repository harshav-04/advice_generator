document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".button");
    const textBlock = document.querySelector(".text-block");

    async function getQuote() {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            textBlock.textContent = `"${data.content}" — ${data.author}`;
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
