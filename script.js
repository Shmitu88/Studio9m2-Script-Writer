// Dodawanie tytułu do listy
function addTitle() {
    let titleInput = document.getElementById("titleInput").value;
    if (titleInput.trim() !== "") {
        let titleList = document.getElementById("titleList");
        let newTitle = document.createElement("li");
        newTitle.textContent = titleInput;
        titleList.appendChild(newTitle);
        document.getElementById("titleInput").value = ""; // Czyszczenie pola
    } else {
        alert("Proszę wpisać tytuł.");
    }
}

// Dodawanie hooka do listy z opisem ujęcia
function addHook() {
    let hookInput = document.getElementById("hookInput").value;
    let hookCategory = document.getElementById("hookCategory").value;
    let hookDescription = document.getElementById("hookDescription").value;

    if (hookInput.trim() !== "") {
        let hookList = document.getElementById("hookList");
        let newHook = document.createElement("li");

        // Wyświetl Hook + kategoria + opis
        newHook.innerHTML = `<strong>${hookCategory}:</strong> ${hookInput}<br><em>Opis ujęcia:</em> ${hookDescription}`;
        hookList.appendChild(newHook);

        // Czyszczenie pól
        document.getElementById("hookInput").value = "";
        document.getElementById("hookDescription").value = "";
    } else {
        alert("Proszę wpisać hook.");
    }
}

// Numerowanie i dodawanie kolejnych linii skryptu oraz opisów ujęć
let lineNumber = 1;

function addScriptLine() {
    let scriptLineInput = document.getElementById("scriptLineInput").value;
    let scriptDescription = document.getElementById("scriptDescription").value;

    if (scriptLineInput.trim() !== "") {
        let scriptList = document.getElementById("scriptList");

        // Tworzenie nowej linii skryptu z numerem
        let newLineItem = document.createElement("li");
        newLineItem.innerHTML = `<strong>Linia ${lineNumber}:</strong> ${scriptLineInput}<br><em>Opis ujęcia:</em> ${scriptDescription}`;

        // Dodanie linii do listy
        scriptList.appendChild(newLineItem);

        // Zwiększanie numeracji linii
        lineNumber++;

        // Czyszczenie pól input
        document.getElementById("scriptLineInput").value = "";
        document.getElementById("scriptDescription").value = "";
    } else {
        alert("Proszę wpisać linię skryptu.");
    }
}

// Eksport do pliku Word w formacie .doc (HTML)
function exportToWord() {
    let projectName = document.getElementById("projectName").value || "Projekt";
    let creativeBrief = document.getElementById("creativeBrief").value;
    let titles = Array.from(document.getElementById("titleList").children).map(li => li.textContent);
    let hooks = Array.from(document.getElementById("hookList").children).map(li => li.innerHTML);
    let scriptLines = Array.from(document.getElementById("scriptList").children).map(li => li.innerHTML);

    // Zbuduj zawartość HTML do zapisania jako plik .doc
    let content = `
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: 'Poppins', sans-serif; }
            h1, h2 { color: #4BD1A0; }
            p, li { margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <h1>${projectName} - Script</h1>
        <h2>Creative Brief:</h2>
        <p>${creativeBrief}</p>

        <h2>Tytuły:</h2>
        <ul>${titles.map(title => `<li>${title}</li>`).join('')}</ul>

        <h2>Hooki:</h2>
        <ul>${hooks.map(hook => `<li>${hook}</li>`).join('')}</ul>

        <h2>Skrypt:</h2>
        <ol>${scriptLines.map(line => `<li>${line}</li>`).join('')}</ol>
    </body>
    </html>
    `;

    // Utwórz Blob i pobierz plik .doc
    let blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${projectName}_skrypt.doc`;
    link.click();
}
