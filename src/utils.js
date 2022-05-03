const documentBody = document.querySelector("body");
documentBody.addEventListener('thread-created', (e) => {
    console.log('new create event received')
    const newThread = document.createElement('da-penguins-thread', {is: 'da-penguins-thread'});
    newThread.setAttribute('uid', e.detail.uid);
    document.querySelector(".view-threads").appendChild(newThread)
})

