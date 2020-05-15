(function () {
  window.con = {};
  window.con.json = {};
  con.prefix = ">";
  con.body = document.createElement("div");
  con.input = document.createElement("input");
  con.input.addEventListener("focus", function () {
    this.style["outline"] = "none";
  });
  con.input.placeholder = "Try to make the world a better place";
  con.inputPrefix = document.createElement("span");
  con.inputPrefix.innerHTML = con.prefix;
  con.element = document.createElement("div");
  con.body.appendChild(con.element);
  con.json.col = function (type) {
    switch (type) {
      case "string":
        return "#a9dc76";
        break;
      case "number":
        return "#78dce8";
        break;
      case "boolean":
        return "blue";
        break;

      case "null":
        return "#ab9df2";
        break;
      case "key":
        return "#ff6188";
        break;
    }
  };
  con.stringify = function (json) {
    if (typeof json != "string") {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return (
          '<span style="color:' + con.json.col(cls) + ';">' + match + "</span>"
        );
      }
    );
  };
  con.pre = function (msg) {
    var style = `border: solid 2px #343434;
    padding: 5px;
    border-radius: 9px;
    background: #1b1b1b;`;
    return `<pre style="${style}">${msg ? msg : ""}</pre>`;
  };
  con.theme = function (name, data) {
    switch (name) {
      case "default":
        con.body.style["font-family"] = "monospace";
        con.body.style["background"] = "#252526";
        con.body.style["padding"] = "10px";
        con.body.style["color"] = "white";

        con.input.style["background"] = "transparent";
        con.input.style["border"] = "none";
        con.inputPrefix.style["color"] = "skyblue";
        con.input.style["margin-left"] = "10px";
        con.input.style["color"] = "white";
        break;
    }
  };
  con.appendTo = function (el) {
    el.appendChild(con.body);
  };
  con.setElement = function (el) {
    con.body = el ? el : con.body;
  };
  con.col = function (msg, col) {
    return `<span style="color:${col ? col : "white"};">${msg}</span>`;
  };
  con.log = function (msg, msg2, conf) {
    var div = document.createElement("div");
    div.innerHTML = "";
    div.style = `margin-bottom:5px;margin-top:5px;`;
    if (conf) if (conf.back) div.style.background = conf.back;
    if (typeof msg === "string") div.innerHTML += msg ? msg : "";
    if (typeof msg2 === "string") div.innerHTML += msg2 ? msg2 : "";
    if (typeof msg === "object")
      div.innerHTML += con.pre(con.stringify(msg ? msg : ""));
    if (typeof msg2 === "object")
      div.innerHTML += con.pre(con.stringify(msg ? msg : ""));
    con.element.appendChild(div);
  };
  con.err = function (msg, msg2, conf) {
    con.log(msg, false, {
      back: "red",
    });
  };

  con.clear = function () {
    con.element.innerHTML = con.col("Con cleared", "grey");
  };
  con.config = function (conf) {
    if (conf.input) {
      con.body.appendChild(con.inputPrefix);
      con.body.appendChild(con.input);
    }
  };
  con.input.addEventListener("keypress", function (e) {
    if (e.keyCode === 13)
      try {
        eval(this.value);
        this.value = "";
      } catch (e) {
        con.err(String(e));
        console.log(e);
      }
  });
  //return con;
})();
