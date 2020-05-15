(function () {
  window.con = {};
  con.json = {};
  con.others = {};
  con.style = {};
  con.style.button = `background: #0000004a;
    padding: 9px;
    color: white;
    font-size: 10px;
    border-radius: 5px;
    border: solid 1px #ffffff61;
    width:-webkit-fill-available;`;
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
  con.log = function (msg, conf) {
    var div = document.createElement("div");
    div.innerHTML = "";
    div.style = `margin-bottom:5px;margin-top:5px;`;
    if (conf) if (conf.back) div.style.background = conf.back;
    if (typeof msg === "string") div.innerHTML += msg ? msg : "";
    if (typeof msg === "object")
      div.innerHTML += con.pre(con.stringify(msg ? msg : ""));
    con.element.appendChild(div);
  };
  con.err = function (msg, msg2, conf) {
    con.log(msg, {
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
  con.addBtn = function (name, callback) {
    var btn = document.createElement("button");
    btn.innerHTML = name;
    btn.style = con.style.button;
    btn.addEventListener("click", () => {
      try {
        callback({
          time: Date.now(),
          con: con,
        });
      } catch (r) {
        con.err(r);
        console.log(r);
      }
    });
    con.element.appendChild(btn);
  };
  con.addInput = function (name, callback, to) {
    var div = document.createElement("div");
    var input = document.createElement("input");
    div.appendChild(input);
    var btn = document.createElement("button");
    div.appendChild(btn);
    btn.innerHTML = name;
    btn.style = con.style.button;
    btn.style.width = "auto";
    btn.style.marginLeft = "10px";
    input.style = con.style.button;
    input.style.width = "auto";
    input.placeholder = "Input";
    btn.addEventListener("click", () => {
      try {
        callback({
          time: Date.now(),
          con: con,
          value: input.value,
          input: input,
        });
      } catch (r) {
        con.err(r);
        console.log(r);
      }
    });
    if (!to) {
      con.element.appendChild(div);
    } else {
      to.appendChild(div);
    }
  };
  con.others.loadJS = function (src, onload) {
    if (Array.isArray(src)) {
      var length = src.length;
      var loaded = 0;
      for (js of src) {
        var el = document.createElement("script");
        el.src = js;
        el.onload = function () {
          loaded += 1;
          load(loaded);
        };
        document.body.appendChild(el);
      }
      function load(v) {
        if (v === length) {
          onload();
        }
      }
    } else {
      var el = document.createElement("script");
      el.src = src;
      el.onload = function () {
        onload();
      };
      document.body.appendChild(el);
    }
  };
  con.others.sec = function (s) {
    return s * 1000;
  };
  con.input.addEventListener("keypress", function (e) {
    if (e.keyCode === 13)
      try {
        var code = eval(this.value);
        console.log(code);
        this.value = "";
      } catch (e) {
        con.err(String(e));
        console.log(e);
      }
  });
  return con;
})();
