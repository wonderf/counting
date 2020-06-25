var gfile;

function createBornSvg(start,end){
    var a = $('#fileToUpload').get(0).files[0];
    var zip = new JSZip();
    for(let i=start;i<=end;i++){
        let body= gfile.replace("xxx",i);
        zip.file("born_in_"+i+".svg",body);
    }
    
    zip.generateAsync({type:"blob"})
     .then(function(content) {
       saveAs(content, "files.zip");
     });
}

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(
      input.files[0])
  }
}

function placeFileContent(file) {
	readFileContent(file).then(content => {
      gfile = content
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}