

var myHeaders = new Headers();
myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6Ims5ZzVmNTFmY2w4N3RjcSIsImVtcGxveWVlIjoiMjExMjAwMDUiLCJmaXJzdE5hbWUiOiJDaGlyYXl1IiwibWlkZGxlTmFtZSI6bnVsbCwibGFzdE5hbWUiOiJWYXJzaG5leSIsImVtYWlsQWRkcmVzcyI6ImNoaXJheXUudmFyc2huZXlAY3ViYXN0aW9uLmNvbSIsIm1vYmlsZVBob25lIjoiOTg3NjU0MzIxMCIsImJpb21ldHJpY01hbmRhdG9yeSI6ZmFsc2V9LCJpYXQiOjE2NjU5OTMxNjQsImV4cCI6MTY2NjAxMzE2NH0.RTbWE-dT4kLAg6pXDbPlCYRkyzkUd5I4Wb7hbiqY_jc")
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


module.exports = {
    tokenRequestOption,
    tokenPostRequestOption
}