document.getElementById("battlePropertiesSubmit").addEventListener("click", function () {
    // Get input values
    let allyNum = document.getElementById("allyPokemonNum").value;
    let cpuNum = document.getElementById("cpuPokemonNum").value;

    // Get selected radio button
    let selectedRadio = document.querySelector('input[name="teamChoice"]:checked');
    let teamChoice = selectedRadio ? selectedRadio.value : "None";

    // Store values in localStorage (or use URL parameters)
    localStorage.setItem("allyNum", allyNum);
    localStorage.setItem("cpuNum", cpuNum);
    localStorage.setItem("teamChoice", teamChoice);

    // Redirect to a new page
    window.location.href = "battle.html"; // Change to your destination page
});