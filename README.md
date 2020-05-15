# conjs
a worst version of the console.log api

## a testing script 
```js
//test
const test = {
  messages: [
    "Hello World", //messages
    con.col("[HELLO]", "gold") + " - World", //colors
    {
      type: "object", //JSON object
    },
  ],
};
con.theme("default");
con.appendTo(document.body);
con.config({
  input: true,
});
for (msg of test.messages) {
  con.log(msg);
}
con.err("This is an error message");
con.addBtn("button", function (data) {
  con.log("btn clicked", data.time);
});
con.others.loadJS([
    "https://code.jquery.com/jquery-3.5.1.min.js",
    "https://threejs.org/build/three.min.js",
  ],
  function () {
    if (THREE && $) {
      con.log(con.col("Jquery and Threejs is loaded", "lightgreen"));
    } else {
      con.log(con.col(" there was an error Jquery and Threejs", "red"));
    }
  }
);
setTimeout(function () {
  con.log(con.col("this is a timeout [1sec]", "purple"));
}, 1000);
con.log("1.5 = " + con.others.sec(1.5));
con.addInput("input", function (data) {
  if (data.value) {
    con.log(data.value);
    data.input.value = "";
  }
});
```
![Preview](https://cdn.discordapp.com/attachments/653476702860607498/710984801632387162/unknown.png)
