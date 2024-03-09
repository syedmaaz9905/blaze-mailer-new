const {
    contextBridge,
    ipcRenderer
} = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})

// end boilerplate code, on to your stuff..

/**
 * HERE YOU WILL EXPOSE YOUR 'myfunc' FROM main.js
 * TO THE FRONTEND.
 * (remember in main.js, you're putting preload.js
 * in the electron window? your frontend js will be able
 * to access this stuff as a result.
 */
 contextBridge.exposeInMainWorld(
    "api", {
    invoke: (channel, data) => {
        let validChannels = ["shareData", "myfunc"]; // Add your new channels here
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, data);
        }
    },
});