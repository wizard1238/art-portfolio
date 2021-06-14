var num_of_images = 0

window.onload = function() {
    fetch("/getImages")
    .then( (data) => {
        data.json()
        .then( (images) => {
            num_of_images = images.length

            for (let i = 0; i < images.length; i++) {
                let card = document.createElement('div')
                card.setAttribute('class', 'card w-25 mx-auto my-4 px-4 border-0')
                card.setAttribute('data-index', `${i}`)
                
                let image = new Image()
                image.src = 'data:image/jpg;base64,' + images[i]
                image.setAttribute('class', 'card-img')
                let label = document.createElement('label')
                label.setAttribute('for', `${i}`)
                label.setAttribute('id', `${i}_label`)
                label.appendChild(image)
                card.appendChild(label)

                let footer = document.createElement('div')
                footer.setAttribute('class', 'card-footer text-center bg-white')

                let input = document.createElement('input')
                input.setAttribute('type', 'checkbox')
                input.setAttribute('id', `${i}`)
                input.setAttribute('name', `${i}`)
                input.setAttribute('value', `${i}`)
                footer.appendChild(input)
                
                card.appendChild(footer)

                document.getElementById('images_div').appendChild(card)
                
            }

            Sortable.create(document.getElementById('images_div'))
        })
    })

    document.getElementById('upload_submit').addEventListener('click', () => {
        let formData = new FormData(document.getElementById('upload_form'))
        console.log(formData)
        fetch('/upload', {
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
            method: 'POST',
            body: formData,
        })
        .then((res) => location.reload())
        .catch((err) => console.log(err))
    })

    document.getElementById('reorder').addEventListener('click', () => {
        var order = []

        let children = document.getElementById('images_div').children
        for (let child of children) {
            order.push(child.getAttribute('data-index'))
        }

        fetch('/reorder', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST', 
            body: JSON.stringify(order)
        })
    })

    document.getElementById('delete').addEventListener('click', () => {
        var images_to_delete = []

        for (let i = 0; i < document.getElementById('images_div').children.length; i++) {
            console.log(document.getElementById(`${i}`))
            if (document.getElementById(`${i}`).checked) {
                images_to_delete.push(i)
            }
        }

        fetch('/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(images_to_delete)
        })
        .then((res) => {
            location.reload()
        })
        .catch((err) => console.log(err))
    })
}