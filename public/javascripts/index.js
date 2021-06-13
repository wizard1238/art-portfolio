window.onload = function() {
    fetch("/getImages")
    .then( (data) => {
        data.json()
        .then( (images) => {
            images.forEach((image) => {
                let i = new Image()
                i.src = 'data:image/jpg;base64,' + image
                document.getElementById('images').appendChild(i)
            })
        })
    })
}