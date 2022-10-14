

let tokenRequestOption = () =>{
    var myHeaders = new Headers();
    myHeaders.append("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6IjRpbXE0d3JkZ3hrbnh2diIsImVtcGxveWVlIjoiMjIwNjAwMzUiLCJmaXJzdE5hbWUiOiJTaHJleWEiLCJtaWRkbGVOYW1lIjpudWxsLCJsYXN0TmFtZSI6Ik1haGVzaHdhcmkiLCJlbWFpbEFkZHJlc3MiOiJzaHJleWEubWFoZXNod2FyaUBDdWJhc3Rpb24uY29tIiwibW9iaWxlUGhvbmUiOiI2Mzc3ODc3MjQzIiwiYmlvbWV0cmljTWFuZGF0b3J5Ijp0cnVlfSwiaWF0IjoxNjY1NzI4MDE0LCJleHAiOjE2NjU3NDgwMTR9.EHss7d3fLQ8gURSdLMU5WawAU7i6fosEeGFWksppnLM")
    var requestOptions = {
        method : "GET",
        headers: myHeaders,
        redirect : 'follow'
    }
    return requestOptions
}


module.exports = {
    tokenRequestOption
}