

var myHeaders = new Headers();
myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6IjRpbXE0d3JkZ3hrbnh2diIsImVtcGxveWVlIjoiMjIwNjAwMzUiLCJmaXJzdE5hbWUiOiJTaHJleWEiLCJtaWRkbGVOYW1lIjpudWxsLCJsYXN0TmFtZSI6Ik1haGVzaHdhcmkiLCJlbWFpbEFkZHJlc3MiOiJzaHJleWEubWFoZXNod2FyaUBDdWJhc3Rpb24uY29tIiwibW9iaWxlUGhvbmUiOiI2Mzc3ODc3MjQzIiwiYmlvbWV0cmljTWFuZGF0b3J5Ijp0cnVlfSwiaWF0IjoxNjY2MDcyNjMyLCJleHAiOjE2NjYwOTI2MzJ9.hSZRdhtzb0IGjwBl4TnnZ0ZGfVmDQwcKDBYWoA1cQWc")
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