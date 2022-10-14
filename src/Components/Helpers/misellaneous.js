

let tokenRequestOption = () =>{
    var myHeaders = new Headers();
    myHeaders.append("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6ImE2emhiYnh1ZWdoemNjMiIsImVtcGxveWVlIjoiMjAxMDAwMjgiLCJmaXJzdE5hbWUiOiJKYXRpbiIsIm1pZGRsZU5hbWUiOm51bGwsImxhc3ROYW1lIjoiQ2hldGl3YWwiLCJlbWFpbEFkZHJlc3MiOiJqYXRpbi5jaGV0aXdhbEBDdWJhc3Rpb24uY29tIiwibW9iaWxlUGhvbmUiOiI5ODk4OTg5ODk4IiwiYmlvbWV0cmljTWFuZGF0b3J5Ijp0cnVlfSwiaWF0IjoxNjY1NzUwNjEwLCJleHAiOjE2NjU3NzA2MTB9.ZW_Cks-7A8aiOscEcdPhhpv0X7DucO-dgIw2eay0uAg")
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