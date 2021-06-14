window.onload = function() {
    fetch("/getImages")
    .then( (data) => {
        data.json()
        .then( (images) => {
            images.forEach((image) => {
                let i = new Image()
                i.src = 'data:image/jpg;base64,' + image
                i.setAttribute('class', 'card-img img-fluid')

                let card = document.createElement('div')
                card.setAttribute('class', 'card w-25 mx-auto my-4 px-4 border-0')

                card.appendChild(i)

                document.getElementById('images').appendChild(card)
            })
        })
    })
}