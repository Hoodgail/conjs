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
con.theme("default"); // the only one (For now)
con.appendTo(document.body);
con.config({
  input: true, // the con input where u type ur code
});
for (msg of test.messages) {
  con.log(msg);
}
con.err("This is an error message"); // for errors
```
![Preview](https://cdn.discordapp.com/attachments/697347914061709393/710677729359429642/unknown.png)
