var gfile;
var cfile;

function createBornSvg(start,end){
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

function createItsHowSvg(words){
    var zip = new JSZip();
    let parsed;
    if(words.length!=0){
       parsed = words.split(",");
    }
    else{
        parsed=cfile.split('\r\n');
    }
    for(let i=0;i<parsed.length;i++){
        let body= gfile.replace("yyy",parsed[i]);
        zip.file("thisisHow_"+parsed[i]+".svg",body);
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

function getCSVFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileCSVContent(
      input.files[0])
  }
}

function placeFileContent(file) {
	readFileContent(file).then(content => {
      gfile = content
  }).catch(error => console.log(error))
}

function placeFileCSVContent(file) {
	readCSVFileContent(file).then(content => {
      cfile = content
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

function readCSVFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}