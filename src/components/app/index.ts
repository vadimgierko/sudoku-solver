export function getApp() {
    const APP_EL = document.getElementById("app");
    return APP_EL
}

export function appendChildToApp(child: Node) {
    const APP_EL = getApp();

    if (!APP_EL) return console.error("No APP_EL... Cannot append child...");

    APP_EL.appendChild(child);
}

export function removeChildFromApp(child: Node) {
    const APP_EL = getApp();

    if (!APP_EL) return console.error("No APP_EL... Cannot append child...");

    APP_EL.removeChild(child);
}