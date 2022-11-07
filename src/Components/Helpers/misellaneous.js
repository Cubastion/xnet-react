var myHeaders = new Headers();
myHeaders.append(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6IjJqODVobWMxc2tiNDNncSIsImVtcGxveWVlIjoiMjIwNDAwMTMiLCJmaXJzdE5hbWUiOiJSYWh1bCIsIm1pZGRsZU5hbWUiOm51bGwsImxhc3ROYW1lIjoiU2hhcm1hIiwiZW1haWxBZGRyZXNzIjoicmFodWwuc2hhcm1hQGN1YmFzdGlvbi5jb20iLCJtb2JpbGVQaG9uZSI6IjEyMzQ1Njc4OTAiLCJiaW9tZXRyaWNNYW5kYXRvcnkiOnRydWV9LCJpYXQiOjE2Njc3OTgyNjEsImV4cCI6MTY2NzgxODI2MX0.polqAISDdK_8yNv6d-hY9V9Itl1nyxjSV26malZZLVE"
);
myHeaders.append("Content-Type", "application/json");
let tokenRequestOption = () => {
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  return requestOptions;
};

let tokenPostRequestOption = (body, isFormData) => {
  if (isFormData) {
    myHeaders.delete("Content-Type");
  }
  var raw = JSON.stringify(body);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: isFormData ? body : raw,
    redirect: "follow",
  };
  return requestOptions;
};

let tokenPutRequestOption = (body) => {
  var raw = JSON.stringify(body);
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  return requestOptions;
};

module.exports = {
  tokenRequestOption,
  tokenPostRequestOption,
  tokenPutRequestOption,
};
