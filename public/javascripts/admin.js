var num_of_images = 0

window.onload = function() {
    fetch("/getImages")
    .then( (data) => {
        data.json()
        .then( (images) => {
            num_of_images = images.length

            for (let i = 0; i < images.length; i++) {
                let input = document.createElement('input')
                input.setAttribute('type', 'checkbox')
                input.setAttribute('id', `${i}`)
                input.setAttribute('value', `${i}`)
                
                let image = new Image()
                image.src = 'data:image/jpg;base64,' + images[i]
                
                let label = document.createElement('label')
                label.setAttribute('for', `${i}`)
                label.setAttribute('id', `${i}_label`)
                
                document.getElementById('images_div').appendChild(input)
                document.getElementById('images_div').appendChild(label)
                document.getElementById(`${i}_label`).appendChild(image)
            }
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

    document.getElementById('delete').addEventListener('click', () => {
        var images_to_delete = []

        for (let i = 0; i < num_of_images; i++) {
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