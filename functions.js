function shareData() {
    // Gather data from HTML elements
    const subject = document.getElementById('subject').value;
    const name = document.getElementById('name').value;
    const mailDescription = document.querySelector('.text-area').value;
    const recipientFile = document.getElementById('recipientFileInput').value;
    const htmlFile = document.getElementById('htmlFileInput').value;
    const credentialFile = document.getElementById('credentialFileInput').value;

    // Create an object with the gathered data
    const data = {
        subject: subject,
        name: name,
        mailDescription: mailDescription,
        recipientFile: recipientFile,
        htmlFile: htmlFile,
        credentialFile: credentialFile
    };

    // Use window.api.invoke to send data to the main process
    window.api.invoke('myfunc', data)
        .then(function (res) {
            console.log(res); // will print the response from the main process to the browser console
        })
        .catch(function (err) {
            console.error(err); // will print an error message to the browser console if the main process encounters an error
        });
}
