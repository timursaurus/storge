

let audio = document.getElementById('audio')


document.getElementById('micButton').addEventListener("click", function() {
    console.log('button pressed')
    navigator.mediaDevices.getUserMedia({
        audio: {
            sampleSize: 8,
            echoCancellation: true
        }
    }).then(stream => {audio.srcObject = stream})
        .catch(err => {console.log(err.name + ': ' + err.message)},)
    }, false)

document.getElementById('leaveRoom').addEventListener("click", function() {
    console.log('pressed')
})

