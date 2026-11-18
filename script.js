const editor = document.getElementById("editor");
const output = document.getElementById("output");

function executeScript() {
    const code = editor.value.trim();

    if (!code) {
        output.textContent = "Please enter a script first!";
        return;
    }

    output.textContent =
        "Script received!\n\n" +
        "Jay Executor's scripting engine is not connected yet.";
}

function clearEditor() {
    editor.value = "";
    output.textContent = "Editor cleared.";
}

function saveScript() {
    const code = editor.value;

    if (!code.trim()) {
        output.textContent = "Nothing to save!";
        return;
    }

    const blob = new Blob([code], {
        type: "text/plain"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "JayScript.lua";
    link.click();

    URL.revokeObjectURL(link.href);

    output.textContent = "Script saved!";
}