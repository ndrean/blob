////////////////////////////////////
// creating CSS style:  <link rel="stylesheet" href="blobURL">
const styleBodyWithBlob = new Blob(
  ["h3 { background-color: yellow; } button {color: red; font-size:20px;}"],
  { type: "text/css" }
);
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = URL.createObjectURL(styleBodyWithBlob);
document.head.appendChild(link);

////////////////////////////////////////
// FileReader and Blob
const textBlobHtml = new Blob(
  [
    `<p>\"Workers allows a page to run Javascript on a background thread so
     the main UI thread can remain responsive. Workers do not have access to
    the DOM or any global variables in the main UI thread and must use the 
    postMessage() method to communicate with the main thread.\"</p>,
    <p>\"The FileReader object lets web applications asynchronously read the contents
     of files (or raw data buffers) stored on the user's computer, using File
      or Blob objects to specify the file or data to read.\"</p>`,
  ],
  { type: "text/html" }
);
// the FileReader lets web app load asynchronously contents of files-blobs
const myReader = new FileReader();
myReader.readAsText(textBlobHtml);
// Handler executed once reading(blob content referenced to a variable) from blob is finished.
myReader.addEventListener("loadend", (e) => {
  // short-cut= myReader.onload = (e)=> {...}
  document.getElementById("insertFile").innerHTML = e.target.result;
});

////////////////////////////////////////

// the data of the blob will be displayed as the result of a link
const blobLink = new Blob(
  [
    '<h1 style="color:red">I am the data of the blob</h1 > ',
    " <p> Yet another line</p> ",
  ],
  { type: "text/html" }
);
// we create a link to this data-blob
const blobLinkURL = URL.createObjectURL(blobLink);

// the link is added to the DOM which will display the data-blob
document.getElementById(
  "insertLink"
).innerHTML = ` <span><a href="${blobLinkURL}">This link</a>  will display the data (text/html) of a blob showed below
    :</span> `;

///////////////////////////
// instead of using an external file, we hardcode a script here and will pass this code into a blob
// that will point to it.
const blobCode = new Blob(["onmessage = (e) =>{ postMessage(e.data**2) };"], {
  type: "application/javascript",
});
// we create a link to this code
const codeURL = URL.createObjectURL(blobCode);

// Creates and starts a background thread that runs the code pointed at by scriptURL of type 'string'
const worker = new Worker(codeURL);

// pass data to the worker
document.querySelector("#scriptForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nb = document.querySelector("input").value;
  worker.postMessage(nb);
});

// main listens to worker's message
worker.addEventListener("message", (e) => {
  document.querySelector("#runScript").textContent = e.data;
});
