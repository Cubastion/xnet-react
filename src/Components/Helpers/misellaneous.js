

var myHeaders = new Headers();
myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6Ims5ZzVmNTFmY2w4N3RjcSIsImVtcGxveWVlIjoiMjExMjAwMDUiLCJmaXJzdE5hbWUiOiJDaGlyYXl1IiwibWlkZGxlTmFtZSI6bnVsbCwibGFzdE5hbWUiOiJWYXJzaG5leSIsImVtYWlsQWRkcmVzcyI6ImNoaXJheXUudmFyc2huZXlAY3ViYXN0aW9uLmNvbSIsIm1vYmlsZVBob25lIjoiOTg3NjU0MzIxMCIsImJpb21ldHJpY01hbmRhdG9yeSI6ZmFsc2V9LCJpYXQiOjE2NjYwNTY5MjYsImV4cCI6MTY2NjA3NjkyNn0.ZosFoU7cwHFEdLCf6qp5wejtbBw6Hmun30f9aEt5tG0")
myHeaders.append("Content-Type", "application/json");
let tokenRequestOption = () =>{
  var requestOptions = {
        method : "GET",
        headers: myHeaders,
        redirect : 'follow'
    }
    return requestOptions
}

let tokenPostRequestOption = (body) => {
    var raw = JSON.stringify(body)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }
    return requestOptions
}

let tokenPutRequestOption = (body) => {
    var raw = JSON.stringify(body)
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }
    return requestOptions
}

module.exports = {
    tokenRequestOption,
    tokenPostRequestOption,
    tokenPutRequestOption
}