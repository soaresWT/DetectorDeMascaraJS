const video = document.getElementById('video')

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video:true})
        .then(stream => {
           video.srcObject = stream
        })
}
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/tfLPHK490/';
ml5.imageClassifier(imageModelURL + 'model.json').then(classifier => {
  iniciar(classifier)
});

function iniciar(classifier){
    setInterval(async()=>{
        classificarVideo(classifier)
    },500)
}
function classificarVideo(classifier){
    const snapShot = ml5.flipImage(video)
    classifier.classify(snapShot,tratarResultado)
}
function tratarResultado(error, resultado){
    if(error){
        console.log(error)
        return
    }
    if(resultado[0] === 'mascara'){
        document.body.style.backgroundColor = 'green'
    }else{
        document.body.style.backgroundColor = 'red'
    }
}