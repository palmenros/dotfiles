var $jscomp = {scope:{}, checkStringArgs:function(f, t, q) {
  if (null == f) {
    throw new TypeError("The 'this' value for String.prototype." + q + " must not be null or undefined");
  }
  if (t instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + q + " must not be a regular expression");
  }
  return f + "";
}};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, t, q) {
  if (q.get || q.set) {
    throw new TypeError("ES3 does not support getters and setters.");
  }
  f != Array.prototype && f != Object.prototype && (f[t] = q.value);
};
$jscomp.getGlobal = function(f) {
  return "undefined" != typeof window && window === f ? f : "undefined" != typeof global && null != global ? global : f;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(f, t, q, p) {
  if (t) {
    q = $jscomp.global;
    f = f.split(".");
    for (p = 0;p < f.length - 1;p++) {
      var r = f[p];
      r in q || (q[r] = {});
      q = q[r];
    }
    f = f[f.length - 1];
    p = q[f];
    t = t(p);
    t != p && null != t && $jscomp.defineProperty(q, f, {configurable:!0, writable:!0, value:t});
  }
};
$jscomp.polyfill("String.prototype.endsWith", function(f) {
  return f ? f : function(f, q) {
    var p = $jscomp.checkStringArgs(this, f, "endsWith");
    f += "";
    void 0 === q && (q = p.length);
    for (var r = Math.max(0, Math.min(q | 0, p.length)), t = f.length;0 < t && 0 < r;) {
      if (p[--r] != f[--t]) {
        return !1;
      }
    }
    return 0 >= t;
  };
}, "es6-impl", "es3");
(function() {
  var f = window, t = "console", q = "clear";
  String.prototype.hashCode = function() {
    var a = 0, c, b, d;
    if (0 === this.length) {
      return a;
    }
    c = 0;
    for (d = this.length;c < d;c++) {
      b = this.charCodeAt(c), a = (a << 5) - a + b, a |= 0;
    }
    return a;
  };
  1.2 < Math.random() && (q = t = "c");
  var p = !!window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), r = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), U = r ? "firefox" : "chrome", x = !p && !r, D = {}, E = 0;
  if (x || p || r) {
    chrome.runtime.onMessage.addListener(function(a, c, b) {
      if (c.tab && c.tab.url || c.url) {
        switch(a.type) {
          case "getStorage":
            a.key && g.get(a.key);
            b({value:window.localStorage});
            break;
          case "setStorage":
            g.set(a.key, a.val);
            b({value:window.localStorage});
            break;
          case "removeStorage":
            g.remove(a.key);
            b({value:window.localStorage});
            break;
          case "getFilters":
            b({value:u.getFilters()});
            break;
          case "sendData":
            a = a.val;
            c = a.ratings;
            if (1E3 > E) {
              if ("f1" == a.key) {
                if (c) {
                  for (var d = c.length;d--;) {
                    var e = c[d];
                    null == e ? c.splice(d, 1) : (e = a.domainId + e.asin, D[e] ? c.splice(d, 1) : (D[e] = 1, E++));
                  }
                  0 < c.length && v.sendPlainMessage(a);
                }
              } else {
                v.sendPlainMessage(a);
              }
            } else {
              D = null;
            }
            b({});
            break;
          case "log":
            n.quiet || console.log(a.val);
            b({});
            break;
          case "refreshStorage":
            n.refreshSettings();
            b({value:window.localStorage});
            break;
          case "showAlert":
            g.showAlert(a.val);
            b({});
            break;
          default:
            b({});
        }
      }
    });
    window.onload = function() {
      var a = document.getElementById("keepa_storage");
      a.src = "https://keepa.com/storageProxy" + (r ? "Firefox" : "") + ".html";
      a.onload = function() {
        document.getElementById("keepa_storage");
        n.register();
      };
    };
    var Q = null;
  }
  var g = {storage:chrome.storage.local, showAlert:function(a) {
    try {
      if (a = a.split("#")[1], a = a.split("/"), !(7 > a.length)) {
        var c = a[0], b = parseInt(a[1], 10), d, e, w = String.fromCharCode(165), f = parseInt(a[2], 10), q = parseInt(a[4], 10), v = decodeURIComponent(a[6]), t = decodeURIComponent(a[7]);
        switch(b) {
          case 1:
            e = "$";
            d = "com";
            break;
          case 2:
            e = "\u00a3";
            d = "co.uk";
            break;
          case 3:
            e = "\u20ac";
            d = "de";
            break;
          case 4:
            e = "\u20ac";
            d = "fr";
            break;
          case 5:
            e = w;
            d = "co.jp";
            break;
          case 6:
            e = "$";
            d = "ca";
            break;
          case 7:
            e = w;
            d = "cn";
            break;
          case 8:
            e = "\u20ac";
            d = "it";
            break;
          case 9:
            e = "\u20ac";
            d = "es";
            break;
          case 10:
            e = "\u20b9";
            d = "in";
            break;
          case 11:
            e = "$";
            d = "mx";
            break;
          default:
            e = "$", d = "com";
        }
        v = "https://keepa.com/images/" + v;
        g.get("token", function(a) {
          try {
            var w = "https://dyn.keepa.com/r/?user=" + a.token + "&domain=" + b + "&asin=" + c + "&source=addonNotification&path=" + f, u = t + " has dropped below your desired price. The new price is " + e + " " + g.formatCurrency(g.addComma(q, b), !1, b) + ".", L = {type:"basic", iconUrl:v, title:"Good news from Keepa!", message:u, priority:2};
            p || r || (L.buttons = [{title:"Show product on Amazon." + d, iconUrl:"https://www.amazon.com/favicon.ico"}, {title:"Manage your trackings", iconUrl:"../../icons/i16.png"}]);
            var y = new XMLHttpRequest;
            y.open("GET", v);
            y.responseType = "blob";
            y.onload = function() {
              L.iconUrl = window.URL.createObjectURL(this.response);
              chrome.notifications.create(w, L, function(a) {
              });
            };
            y.send(null);
          } catch (I) {
            n.reportBug(I);
          }
        });
      }
    } catch (H) {
      n.reportBug(H);
    }
  }, addComma:function(a, c) {
    null == c && (c = domain);
    return 5 != c ? (a / 100).toFixed(2) : a.toFixed(0);
  }, formatCurrency:function(a, c, b) {
    if ("" == a) {
      return a;
    }
    a = a.toString().replace(/\$|\u20ac|\uffe5|\u00a3|,|-/g, "");
    isNaN(a) && (a = "0");
    a = Math.floor(100 * a + .50000000001);
    var d = a % 100;
    a = Math.floor(a / 100).toString();
    10 > d && (d = "0" + d);
    for (var e = 0;e < Math.floor((a.length - (1 + e)) / 3);e++) {
      a = a.substring(0, a.length - (4 * e + 3)) + "," + a.substring(a.length - (4 * e + 3));
    }
    null == b && (b = domain);
    return 5 == b || c ? a : a + "." + d;
  }, log:function(a) {
    n.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, init:function() {
    g.iframeWin = document.getElementById("keepa_storage").contentWindow;
    g.iframeWin.postMessage({type:"getAll"}, "*");
    n.convertToStorage();
    var a = null;
    g.get(["token", "hashSynced"], function(c) {
      a = c.token;
      !a && x && chrome.storage.sync.get("KeepaHash", function(b) {
        if (!chrome.runtime.lastError) {
          try {
            var c = b.KeepaHash;
            c && 64 == c.length ? (g.set("token", c), console.log("loaded token from sync")) : g.get({token:n.Guid.newGuid()}, function(b) {
              a = b.token;
            });
          } catch (e) {
            n.reportBug("r9 " + e);
          }
        }
      });
    });
    chrome.storage.onChanged.addListener(function(a, b) {
      if ("local" == b) {
        for (var c in a) {
          var e = a[c];
          "string" != typeof e.oldValue && (e.oldValue = JSON.stringify(e.oldValue));
          "string" != typeof e.newValue && (e.newValue = JSON.stringify(e.newValue));
          e.oldValue != e.newValue && g.iframeWin.postMessage({type:"set", key:c, value:e.newValue}, "*");
        }
      }
    });
    window.addEventListener("message", function(a) {
      var b = a.data;
      if (b) {
        if (r) {
          try {
            b = JSON.parse(b);
          } catch (y) {
            n.reportBug(b + " ### " + y);
            return;
          }
        }
        if (b.log) {
          console.log(b.log);
        } else {
          if (a.origin != n.url) {
            var c = u.getMessage();
            if (null != c && "undefined" == typeof c.sent && b.sandbox && a.source == document.getElementById("keepa_data").contentWindow) {
              if (b.sandbox == c.url) {
                u.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:c}, "*");
                } catch (y) {
                  u.abortJob(407);
                }
              } else {
                b.isUrlMsg ? u.abortJob(405) : (c = u.getOutgoingMessage(c, b.sandbox), v.sendMessage(c));
              }
            }
          } else {
            switch(b.type) {
              case "get":
                g.set(b.key, b.value);
                break;
              case "getAll":
                a = b.value;
                var e = {}, w = !0;
                for (c in a) {
                  var f = a[c];
                  f && "null" != f && "" != f && "undefined" != f && (e[c] = f, w = !1);
                }
                w || g.setAll(e);
                break;
              case "update":
                g.get(b.key, function(a) {
                  a[b.key] != b.value && (b.value ? g.set(b.key, b.value) : g.remove(b.key));
                });
            }
          }
        }
      }
    });
    try {
      chrome.notifications.onButtonClicked.addListener(function(c, b) {
        "unvalidInstallSource" == c ? window.open("https://chrome.google.com/webstore/detail/keepacom-price-tracker/neebplgakaahbhdphmkckjjcegoiijjo") : "optPermission" == c ? chrome.runtime.openOptionsPage(function() {
        }) : 0 == b ? window.open(c) : 1 == b && (null != a && 64 == a.length ? window.open("https://keepa.com/r/" + a + "manage") : window.open("https://keepa.com/#manage"));
      });
    } catch (c) {
    }
  }, set:function(a, c, b) {
    var d = {};
    d[a] = c;
    g.storage.set(d, b);
    g.iframeWin.postMessage({type:"set", key:a, value:c}, "*");
    "token" == a && 64 == c.length && x && chrome.storage.sync.set({KeepaHash:c}, function() {
    });
  }, remove:function(a, c) {
    g.storage.remove(a, c);
    g.iframeWin.postMessage({type:"remove", key:a}, "*");
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    g.storage.get(a, function(b) {
      if ("string" == typeof a && void 0 == b[a]) {
        if (b = n.defaultSettings[a]) {
          g.set(a, b);
          var d = {};
          d[a] = b;
          c(d);
        } else {
          c({});
        }
      } else {
        c(b);
      }
    });
  }, getAll:function(a) {
    g.storage.get(a);
  }, setAll:function(a, c) {
    g.storage.set(a, c);
    void 0 != a.token && 64 == a.token.length && x && chrome.storage.sync.set({KeepaHash:a.token}, function() {
    });
  }}, n = {quiet:!0, version:"2.95", browser:1, url:"https://keepa.com", getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "ca":
        return 6;
      case "cn":
        return 7;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      default:
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(b, c, e) {
      return b.length >= c ? b : a(e + b, c, e || " ");
    }, c = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(c) {
        var b = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === c ? b : b & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var b = "undefined" != typeof window.crypto.getRandomValues, d;
      if ("undefined" != typeof window.crypto && b) {
        b = new window.Uint16Array(16);
        window.crypto.getRandomValues(b);
        var e = "";
        for (d in b) {
          var w;
          w = b[d].toString(16);
          w = a(w, 4, "0");
          e += w;
        }
        d = e;
      } else {
        d = c();
      }
      return d;
    }};
  }(), convertToStorage:function() {
    chrome.storage.local.get("migrated", function(a) {
      if (void 0 == a.migrated) {
        a = {migrated:1};
        for (var c in localStorage) {
          var b = localStorage[c];
          b && "function" != typeof b && (a[c] = b);
        }
        chrome.storage.local.set(a, function() {
          chrome.runtime.lastError || localStorage.clear();
        });
      }
    });
  }, defaultSettings:{s_merchantChart:"111", s_range:"2160", s_zoom:"0", s_extreme:"0", s_dateFormat:"D, M j G:i", s_percent:"5", s_merchantTrack:"100", s_boxVertical:"200", s_boxHorizontal:"0", s_boxType:"0", s_alerts:"0", s_alertTimer:"900000", extremeFilter:"0", revealStock:"0", optOut_crawl:"0"}, resetSettings:function() {
    console.log("loading default settings.");
    for (var a in n.defaultSettings) {
      g.set(a, n.defaultSettings[a]);
    }
    g.set("install", Date.now());
    g.set("token", n.Guid.newGuid());
  }, settingsArray:"s_merchantChart s_range s_zoom s_extreme s_dateFormat s_percent s_merchantTrack s_boxVertical s_boxHorizontal s_boxType s_alerts s_alertTimer extremeFilter revealStock".split(" "), refreshSettings:function() {
  }, register:function() {
    g.init();
    r ? g.set("addonVersionFirefox", n.version) : g.set("addonVersionChrome", n.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + (x ? "keepaChrome" : p ? "keepaOpera" : "keepaFirefox") + "." + n.version);
    } catch (a) {
    }
    try {
      !p && x && "neebplgakaahbhdphmkckjjcegoiijjo" != chrome.runtime.id && "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && chrome.notifications.create("unvalidInstallSource", {type:"basic", iconUrl:"../../icons/i100.png", title:"Your Keepa installation is not from an official source!", message:"Please uninstall Keepa and reinstall it from the Chrome Web Store", buttons:[{title:"Open Chrome Web Store", iconUrl:"../../icons/i16.png"}], priority:2}, function(a) {
      });
    } catch (a) {
      n.reportBug(a);
    }
    x && setTimeout(function() {
      g.get("noFreshInstall", function(a) {
        if ("undefined" == typeof a.noFreshInstall) {
          try {
            g.set("noFreshInstall", 1), chrome.notifications.create("firstInstall", {type:"basic", iconUrl:"../../icons/i100.png", title:"Hi there and thanks for using Keepa!", message:"This extension does not add any context menus or browser buttons. You can access it directly on any Amazon product page.", priority:2}, function(a) {
            });
          } catch (c) {
            n.reportBug(c);
          }
        }
      });
    }, 3E3);
    g.get(["s_merchantChart", "token"], function(a) {
      void 0 != a.s_merchantChart && void 0 != a.token && 64 == a.token.length || n.resetSettings();
    });
    window.setTimeout(function() {
      n.checkAlerts(!1);
    }, 15E3);
    (x || p || r) && window.setTimeout(function() {
      v.initWebSocket();
    }, 1E3);
  }, unregister:function() {
  }, evaluateNotificationData:function(a) {
    if (a && 0 != a.length) {
      for (var c = 0;c < a.length;c++) {
        var b = a[c], d = encodeURIComponent(b.title), e = encodeURIComponent(b.image), w = 0, f = b.currentPrices[b.csvType];
        try {
          w = b.csvType;
        } catch (y) {
        }
        g.showAlert("https://keepa.com/app/notification.html#" + b.asin + "/" + b.notificationDomainId + "/" + w + "/" + n.browser + "/" + f + "/0/" + e + "/" + d);
      }
    }
  }, checkAlerts:function(a) {
    g.get(["s_alertsLastChecked", "s_alerts", "token"], function(c) {
      var b = Number(c.s_alertsLastChecked);
      !a && b + 42E4 > Date.now() ? n.log("last alert check within 7 minutes") : 1 == c.s_alerts ? n.log("no alerts setting active") : (g.set("s_alertsLastChecked", "" + Date.now()), (c = c.token) && 64 == c.length && (b = Math.floor(b / 6E4) - 21564E3, 0 > b && (b = 0), n.httpGet("https://dyn.keepa.com/v2/user/notification/?type=app&user=" + c + "&lastCheck=" + b, function(a) {
        try {
          0 != parseInt(a, 10) && (a = JSON.parse(a), n.evaluateNotificationData(a.data));
        } catch (e) {
        }
      }, !1)));
    });
  }, log:function(a) {
    g.log(a);
  }, lastBugReport:0, reportBug:function(a) {
    g.get(["install", "token"], function(c) {
      var b = c.install, d = Date.now();
      if (!(12E5 > d - n.lastBugReport || /(dead object)|(Script error)|(\.location is null)/i.test(a))) {
        n.lastBugReport = d;
        var e = "bug";
        try {
          var d = {}, w;
          for (w in navigator) {
            !navigator.hasOwnProperty(w) || "string" != typeof navigator[w] && "number" != typeof navigator[w] || (d[w] = navigator[w]);
          }
          e = JSON.stringify(d, null, "&emsp;").replace(/(\r\n)|\n/g, "<br>");
        } catch (y) {
        }
        var f = "";
        w = x ? "keepaChrome" : p ? "keepaOpera" : "keepaFirefox";
        d = n.version;
        try {
          f = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        } catch (y) {
        }
        try {
          f = f.replace(RegExp("chrome-extension://.*?/content/", "g"), "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (y) {
        }
        try {
          f = '<span style="color: #999; font-size: xx-small">' + w + ":" + d + "-" + b + "&emsp;" + f + "</span>";
        } catch (y) {
        }
        setTimeout(function() {
          n.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + c.token + "&type=" + U, a + "<br><br>" + f + "<br><br>" + e, null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, c, b) {
    var d = new XMLHttpRequest;
    c && (d.onreadystatechange = function() {
      4 == d.readyState && c.call(this, d.responseText);
    });
    d.withCredentials = b;
    d.open("GET", a, !0);
    d.send();
  }, httpPost:function(a, c, b, d) {
    var e = new XMLHttpRequest;
    b && (e.onreadystatechange = function() {
      4 == e.readyState && b.call(this, e.responseText);
    });
    e.withCredentials = d;
    e.open("POST", a, !0);
    e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    e.send(c);
  }};
  window.onerror = function(a, c, b, d, e) {
    "object" === typeof a && a.srcElement && a.target && (a = "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script" : "Event Error - target:" + a.target + " srcElement:" + a.srcElement);
    a = a.toString();
    var f = "";
    d = d || 0;
    var g = e.stack;
    if (e && g) {
      f = g;
      try {
        f = g.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), f = f.replace(RegExp("http|s://.*?/", "g"), "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (y) {
        console.log(y);
      }
    }
    a = "error: " + a + " url: " + (c || document.location.toString()) + " line: " + parseInt(b || 0) + " col: " + parseInt(d || 0) + " date: " + new Date + " stack: " + f;
    n.reportBug(a);
    return !1;
  };
  var v, F = 0;
  if (x || p || r) {
    v = {server:["wss://dyn.keepa.com"], serverIndex:0, webSocket:null, sendPlainMessage:function(a) {
      a = JSON.stringify(a);
      v.webSocket.send(pako.deflate(a));
    }, sendMessage:function(a) {
      u.clearIframe();
      JSON.stringify(a);
      var c = pako.deflate(JSON.stringify(a));
      u.clearMessage();
      v.webSocket.send(c);
      403 == a.status && u.endSession(F);
      f[t][q]();
    }, initWebSocket:function() {
      g.get(["token", "optOut_crawl"], function(a) {
        var c = a.token, b = a.optOut_crawl;
        if (c && 64 == c.length) {
          var d = function() {
            if (null == v.webSocket || 1 != v.webSocket.readyState) {
              v.serverIndex++;
              v.serverIndex %= v.server.length;
              if ("undefined" == typeof b || "undefined" == b || null == b || "null" == b) {
                b = "0";
              }
              var a = new WebSocket(v.server[v.serverIndex] + "/apps/cloud/?user=" + c + "&app=" + (x ? "keepaChrome" : "keepaFirefox") + "&version=" + n.version + "&optOut=" + b);
              a.binaryType = "arraybuffer";
              a.onmessage = function(a) {
                a = a.data;
                a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
                a = JSON.parse(a);
                108 != a.status && (a.domainId && (F = a.domainId), u.onMessage(a));
              };
              a.onclose = function() {
                setTimeout(function() {
                  d();
                }, 6E5 * Math.random());
              };
              a.onerror = function() {
                a.close();
              };
              a.onopen = function() {
                u.abortJob(414);
                setTimeout(function() {
                  n.checkAlerts(!0);
                }, 18E4 * Math.random());
              };
              v.webSocket = a;
            }
          };
          d();
        }
      });
    }};
  }
  var u;
  if (x || p || r) {
    u = function() {
      function a(a) {
        try {
          h.stats.times.push(a), h.stats.times.push(Date.now() - h.stats.start);
        } catch (k) {
        }
      }
      function c(c, b) {
        c.sent = !0;
        a(25);
        var m = {key:c.key, messageId:c.messageId, stats:c.stats, sessionId:z[B]["session-id"], payload:[], status:200}, k;
        for (k in b) {
          m[k] = b[k];
        }
        return m;
      }
      function b(b) {
        B = h.domainId;
        M = r(z);
        "object" != typeof z[B] && (z[B] = {});
        "undefined" == typeof h.headers.Accept && (h.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
        e(b, !b.isAjax, function(m) {
          a(0);
          var k = {payload:[]};
          if (m.match(D)) {
            k.status = 403;
          } else {
            if (b.contentFilters && 0 < b.contentFilters.length) {
              for (var d in b.contentFilters) {
                var e = m.match(new RegExp(b.contentFilters[d]));
                if (e) {
                  k.payload[d] = e[1].replace(/\n/g, "");
                } else {
                  k.status = 305;
                  k.payload[d] = m;
                  break;
                }
              }
            } else {
              k.payload = [m];
            }
          }
          try {
            b.stats.times.push(3), b.stats.times.push(n.lastBugReport);
          } catch (J) {
          }
          "undefined" == typeof b.sent && (k = c(b, k), v.sendMessage(k));
        });
      }
      function d(b) {
        B = h.domainId;
        M = r(z);
        "object" != typeof z[B] && (z[B] = {});
        "undefined" == typeof h.headers.Accept && (h.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
        a(4);
        e(b, !b.isAjax, function(k, m) {
          a(6);
          if ("undefined" == typeof b.sent) {
            var d = {};
            try {
              if (k.querySelector("body").textContent.match(D)) {
                d.status = 403;
                if ("undefined" != typeof b.sent) {
                  return;
                }
                d = c(b, d);
                v.sendMessage(d);
                return;
              }
            } catch (N) {
              console.error(N);
            }
            a(7);
            if (b.scrapeFilters && 0 < b.scrapeFilters.length) {
              var e = {}, f = {}, g = {}, h, A = "", q = null, w = function(a, b, c) {
                var d = [];
                if (null == a.selector) {
                  if (null == a.regExp) {
                    return A = "invalid selector, sel/regexp", !1;
                  }
                  d = k.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                  if (!d || d.length < a.reGroup) {
                    c = "regexp fail: html - " + a.name + c;
                    if (!1 === a.optional) {
                      return A = c, !1;
                    }
                    q += " // " + c;
                    return !0;
                  }
                  return d[a.reGroup];
                }
                var m = b.querySelectorAll(a.selector);
                0 == m.length && (m = b.querySelectorAll(a.altSelector));
                if (0 == m.length) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  A = "selector no match: " + a.name + c;
                  return !1;
                }
                if (null != a.parentSelector && (m = [m[0].parentNode.querySelector(a.parentSelector)], null == m[0])) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  A = "parent selector no match: " + a.name + c;
                  return !1;
                }
                if (null != a.multiple && (!0 === a.multiple && 1 > m.length || !1 === a.multiple && 1 < m.length)) {
                  c = "selector multiple mismatch: " + a.name + c + " found: " + m.length;
                  if (!1 === a.optional) {
                    return A = c, !1;
                  }
                  q += " // " + c;
                  return !0;
                }
                if (null != a.isListSelector && !0 === a.isListSelector) {
                  return e[a.name] = m, !0;
                }
                if (null == a.attribute) {
                  return A = "selector attribute undefined?: " + a.name + c, !1;
                }
                for (var f in m) {
                  if (m.hasOwnProperty(f)) {
                    var g = m[f];
                    if (!g) {
                      break;
                    }
                    if (null !== a.childNode) {
                      a.childNode = Number(a.childNode);
                      b = g.childNodes;
                      if (b.length < a.childNode) {
                        c = "childNodes fail: " + b.length + " - " + a.name + c;
                        if (!1 === a.optional) {
                          return A = c, !1;
                        }
                        q += " // " + c;
                        return !0;
                      }
                      g = b[a.childNode];
                    }
                    b = null;
                    "text" == a.attribute ? b = g.textContent : "html" != a.attribute && (b = g.getAttribute(a.attribute));
                    if (null == b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                      c = "selector attribute null: " + a.name + c;
                      if (!1 === a.optional) {
                        return A = c, !1;
                      }
                      q += " // " + c;
                      return !0;
                    }
                    if (null != a.regExp) {
                      g = b.match(new RegExp(a.regExp));
                      if (!g || g.length < a.reGroup) {
                        c = "regexp fail: " + b + " - " + a.name + c;
                        if (!1 === a.optional) {
                          return A = c, !1;
                        }
                        q += " // " + c;
                        return !0;
                      }
                      d.push("undefined" == typeof g[a.reGroup] ? g[0] : g[a.reGroup]);
                    } else {
                      d.push(b);
                    }
                    if (!a.multiple) {
                      break;
                    }
                  }
                }
                return a.multiple ? d : d[0];
              }, p = !1, l = {}, t;
              for (t in b.scrapeFilters) {
                if (p) {
                  break;
                }
                var u = b.scrapeFilters[t], r = u.pageVersionTest, x = k.querySelectorAll(r.selector);
                0 == x.length && (x = k.querySelectorAll(r.altSelector));
                if (0 != x.length) {
                  if (null != r.multiple) {
                    if (!0 === r.multiple && 2 > x.length) {
                      continue;
                    }
                    if (!1 === r.multiple && 1 < x.length) {
                      continue;
                    }
                  }
                  if (null != r.attribute) {
                    var y = null, y = "text" == r.attribute ? "" : x[0].getAttribute(r.attribute);
                    if (null == y) {
                      continue;
                    }
                  }
                  h = t;
                  l.revealMAP = u.revealMAP;
                  l.afterAjaxFinished = function() {
                    a(26);
                    for (var m in u) {
                      var h = u[m];
                      if (h.name != r.name && "revealMAP" != h.name) {
                        var l = k;
                        if (null != h.parentList) {
                          if ("undefined" != typeof e[h.parentList]) {
                            l = e[h.parentList];
                          } else {
                            if (!0 === w(u[h.parentList], l, t)) {
                              l = e[h.parentList];
                            } else {
                              break;
                            }
                          }
                          f[h.parentList] || (f[h.parentList] = []);
                          for (var p in l) {
                            if (l.hasOwnProperty(p)) {
                              var C = w(h, l[p], t);
                              if (!1 === C) {
                                break;
                              }
                              if (!0 !== C) {
                                if (f[h.parentList][p] || (f[h.parentList][p] = {}), h.multiple) {
                                  for (var J in C) {
                                    C.hasOwnProperty(J) && (C[J] = C[J].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                  }
                                  C = C.join("\u271c\u271c");
                                  f[h.parentList][p][h.name] = C;
                                } else {
                                  f[h.parentList][p][h.name] = C.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                }
                              }
                            }
                          }
                        } else {
                          l = w(h, l, t);
                          if (!1 === l) {
                            break;
                          }
                          if (!0 !== l) {
                            if (h.multiple) {
                              for (var x in l) {
                                l.hasOwnProperty(x) && (l[x] = l[x].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              l = l.join();
                            } else {
                              l = l.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                            }
                            g[h.name] = l;
                          }
                        }
                      }
                    }
                    if ("" === A) {
                      d.payload = [q];
                      d.scrapedData = g;
                      for (var y in f) {
                        d[y] = f[y];
                      }
                    } else {
                      d.status = 305, d.payload = [q, A, ""];
                    }
                    try {
                      b.stats.times.push(99), b.stats.times.push(n.lastBugReport);
                    } catch (W) {
                      console.error(W);
                    }
                    "undefined" == typeof b.sent && (d = c(b, d), v.sendMessage(d));
                  };
                  if (null != l.revealMAP) {
                    if (p = k.querySelector(l.revealMAP.selector), null != p) {
                      l.url = p.getAttribute(l.revealMAP.attribute);
                      if (null == l.url || 0 == l.url.length) {
                        l.afterAjaxFinished();
                        break;
                      }
                      0 != l.url.indexOf("http") && (p = document.createElement("a"), p.href = b.url, l.url = p.origin + l.url);
                      g[l.revealMAP.name] = "1";
                      l.url = l.url.replace(/(mapPopover.*?)(false)/, "$1true");
                      l.xhr = new XMLHttpRequest;
                      l.xhr.onreadystatechange = function(a) {
                        return function() {
                          if (4 == a.xhr.readyState) {
                            if (200 == a.xhr.status) {
                              var b = a.xhr.responseText;
                              if (a.revealMAP.regExp) {
                                var c = b.match(new RegExp(a.revealMAP.regExp));
                                if (!c || c.length < a.revealMAP.reGroup) {
                                  if (c = k.querySelector(a.revealMAP.selector)) {
                                    var d = c.cloneNode(!1);
                                    d.innerHTML = b;
                                    c.parentNode.replaceChild(d, c);
                                  }
                                } else {
                                  g[a.revealMAP.name] = c[a.revealMAP.reGroup], g[a.revealMAP.name + "url"] = a.url;
                                }
                              }
                            }
                            a.afterAjaxFinished();
                          }
                        };
                      }(l);
                      l.xhr.timeout = 4E3;
                      l.xhr.ontimeout = function(a) {
                        return function() {
                          a.afterAjaxFinished();
                        };
                      }(l);
                      l.xhr.onerror = l.xhr.ontimeout;
                      l.xhr.open("GET", l.url, !0);
                      l.xhr.send();
                    } else {
                      l.afterAjaxFinished();
                    }
                  } else {
                    l.afterAjaxFinished();
                  }
                  p = !0;
                  l = {xhr:l.xhr, revealMAP:l.revealMAP, url:l.url, afterAjaxFinished:l.afterAjaxFinished};
                }
              }
              a(8);
              if (null == h) {
                A += " // no pageVersion matched";
                d.payload = [q, A, ""];
                d.status = 308;
                a(10);
                try {
                  d.stats.times.push(99), d.stats.times.push(n.lastBugReport);
                } catch (N) {
                  console.error(N);
                }
                "undefined" == typeof b.sent && (d = c(b, d), v.sendMessage(d));
              }
            } else {
              a(9), d.status = 306, "undefined" == typeof b.sent && (d = c(b, d), v.sendMessage(d));
            }
          }
        });
      }
      function e(b, c, d) {
        if (c) {
          a(11), document.getElementById("keepa_data").src = b.url;
        } else {
          if (1 == b.httpMethod && (null != b.scrapeFilters && 0 < b.scrapeFilters.length && (H = b), !F && (F = !0, null != b.l && 0 < b.l.length))) {
            for (c = 0;c < b.l.length;c++) {
              var k = b.l[c];
              try {
                for (var e = window, m = 0;m < k.path.length - 1;m++) {
                  e = e[k.path[m]];
                }
                if (null != k.b) {
                  e[k.path[m]](E[k.index], k.a, k.b);
                } else {
                  e[k.path[m]](E[k.index], k.a);
                }
              } catch (X) {
              }
            }
            f[t][q]();
          }
          p(b.url, I[b.httpMethod], b.postData, b.timeout, function(c) {
            a(12);
            if ("o0" == b.key) {
              d(c);
            } else {
              var k = document.getElementById("keepa_data");
              k.src = "";
              c = c.replace(/src=".*?"/g, 'src=""');
              c = c.replace(/http.*?(\.gif|\.jpg|\.png)/g, "");
              c = c.replace(/'\/\/fls-/g, "https://fls-");
              a(13);
              var m = !1;
              try {
                k.contentWindow.document.open("text/html"), a(14);
              } catch (K) {
                a(15);
                G(410);
                return;
              }
              try {
                k.contentWindow.document.write(c), a(16);
              } catch (K) {
                a(17);
                G(412);
                return;
              }
              k.contentWindow.document.close();
              a(18);
              k.onload = function() {
                a(19);
                m || (k.onload = void 0, m = !0, a(20), setTimeout(function() {
                  a(21);
                  Q = document.getElementById("keepa_data").contentWindow;
                  try {
                    d(Q.document, c);
                  } catch (K) {
                    console.error(K), n.reportBug(K), G(410);
                  }
                }, 80));
              };
              f[t][q]();
            }
          });
        }
      }
      function g() {
        document.getElementById("keepa_data").src = "";
      }
      function p(b, c, d, e, f) {
        var k = new XMLHttpRequest;
        f && (k.onreadystatechange = function() {
          2 == k.readyState && a(27);
          4 == k.readyState && (a(29), 0 == k.status || 399 < k.status ? u.abortJob(415, [k.status]) : 50 > k.responseText.length && c == I[0] ? u.abortJob(416) : f.call(this, k.responseText));
        }, k.timeout = e || 15E3, k.ontimeout = function() {
          u.abortJob(413);
        }, k.onerror = function() {
          u.abortJob(408);
        });
        k.open(c, b, !0);
        null == d ? k.send() : k.send(d);
      }
      function r(a) {
        var b = "", c = "", d;
        for (d in a[B]) {
          b += c + d + "=" + a[B][d] + ";", c = " ";
        }
        return b;
      }
      function x(a) {
        delete z["" + a];
        localStorage.session = JSON.stringify(z);
      }
      function G(a, b) {
        if (null != h) {
          if ("undefined" != typeof h.sent) {
            return;
          }
          var d = c(h, {});
          b && (d.payload = b);
          d.status = a;
          v.sendMessage(d);
          g();
        }
        f[t][q]();
      }
      var H = null, h = null, D = /automated access/, E = [function(a) {
        if (!(20 < R) && null == h && 0 < a.url.indexOf("eywords")) {
          var b = a.url.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|it|cn|in|com\.mx|com\.br)\/(?:.*?arch\/ajax|s)\/.*?rh=(.*?)(?:$|&)/), c = 0;
          null != b && 3 == b.length ? c = 200 : (b = a.url.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|it|cn|in|com\.mx|com\.br)\/(?:.*?arch\/ajax|s)\/.*?words=(.*?)(?:$|&)/), null != b && 3 == b.length && (c = 201));
          0 != c && (a = (b[1] + b[2]).hashCode(), O[a] || (O[a] = 1, 20 < ++R && (O = {}), v.sendPlainMessage({key:"i1", payload:[b[1], b[2]], status:c})));
        }
      }, function(a) {
        if (null != h) {
          var b = !0;
          h.url == a.url && (P = a.frameId, S = a.tabId, T = a.parentFrameId, b = !1);
          if (-2 != P && P == a.frameId && S == a.tabId && T == a.parentFrameId) {
            a = a.requestHeaders;
            var c = {};
            (h.timeout + "").endsWith("108") || (h.headers.Cookie = b ? "" : M);
            for (var d in h.headers) {
              for (var b = !1, e = 0;e < a.length;++e) {
                if (a[e].name == d) {
                  "" == h.headers[d] ? a.splice(e, 1) : a[e].value = h.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == h.headers[d] || a.push({name:d, value:h.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, function(a) {
        var b = a.responseHeaders;
        try {
          if (null == h || h.url != a.url) {
            return;
          }
          a = !1;
          for (var c = 0;c < b.length;++c) {
            var d = b[c], e = d.name.toLowerCase();
            if ("set-cookie" == e) {
              var f = d.value.substring(0, d.value.indexOf(";")), g = f.indexOf("="), m = [f.substring(0, g), f.substring(g + 1)];
              b.splice(c, 1);
              c--;
              2 != m.length || "undefined" != typeof z[B][m[0]] && z[B][m[0]] == m[1] || (a = !0, z[B][m[0]] = m[1]);
            } else {
              "x-frame-options" == e && (b.splice(c, 1), c--);
            }
          }
          a && (localStorage.session = JSON.stringify(z));
        } catch (V) {
          console.log(V);
        }
        return {responseHeaders:b};
      }, function(a) {
        if (null != h && h.url == a.url) {
          var b = 0;
          switch(a.error) {
            case "net::ERR_TUNNEL_CONNECTION_FAILED":
              b = 510;
              break;
            case "net::ERR_INSECURE_RESPONSE":
              b = 511;
              break;
            case "net::ERR_CONNECTION_REFUSED":
              b = 512;
              break;
            case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
              b = 513;
              break;
            case "net::ERR_CONNECTION_CLOSED":
              b = 514;
              break;
            case "net::ERR_NAME_NOT_RESOLVED":
              b = 515;
              break;
            case "net::ERR_NAME_RESOLUTION_FAILED":
              b = 516;
              break;
            case "net::ERR_ABORTED":
            case "net::ERR_CONNECTION_ABORTED":
              b = 517;
              break;
            case "net::ERR_CONTENT_DECODING_FAILED":
              b = 518;
              break;
            case "net::ERR_NETWORK_ACCESS_DENIED":
              b = 519;
              break;
            case "net::ERR_NETWORK_CHANGED":
              b = 520;
              break;
            case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
              b = 521;
              break;
            case "net::ERR_CONNECTION_TIMED_OUT":
            case "net::ERR_TIMED_OUT":
              b = 522;
              break;
            case "net::ERR_CONNECTION_RESET":
              b = 523;
              break;
            case "net::ERR_NETWORK_IO_SUSPENDED":
              b = 524;
              break;
            case "net::ERR_EMPTY_RESPONSE":
              b = 525;
              break;
            case "net::ERR_SSL_PROTOCOL_ERROR":
              b = 526;
              break;
            case "net::ERR_ADDRESS_UNREACHABLE":
              b = 527;
              break;
            case "net::ERR_INTERNET_DISCONNECTED":
              b = 528;
              break;
            case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
              b = 529;
              break;
            case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
              b = 530;
              break;
            case "net::ERR_CONTENT_LENGTH_MISMATCH":
              b = 531;
              break;
            case "net::ERR_PROXY_CONNECTION_FAILED":
              b = 532;
              break;
            default:
              b = 533;
              return;
          }
          setTimeout(function() {
            u.setStatTime(33);
            u.abortJob(b);
          }, 0);
        }
      }], F = !1, I = ["GET", "HEAD", "POST", "PUT", "DELETE"], z = {}, M = "", B = 1;
      try {
        localStorage.session && (z = JSON.parse(localStorage.session));
      } catch (m) {
        setTimeout(function() {
          n.reportBug(m);
        }, 2E3);
      }
      var P = -2, S = -2, T = -2, O = {}, R = 0;
      return {onMessage:function(a) {
        switch(a.key) {
          case "o0":
          case "o1":
            h = a, h.stats = {start:Date.now(), times:[]};
        }
        switch(a.key) {
          case "checkNotification":
            n.checkAlerts(!0);
            break;
          case "update":
            chrome.runtime.requestUpdateCheck(function(a, b) {
              "update_available" == a && chrome.runtime.reload();
            });
            break;
          case "o0":
            u.clearIframe();
            b(a);
            break;
          case "o1":
            u.clearIframe();
            d(a);
            break;
          case "o2":
            x(a.domainId);
            break;
          case "o3":
            document.location.reload(!1);
        }
      }, clearIframe:g, endSession:x, getOutgoingMessage:c, setStatTime:a, getFilters:function() {
        return H;
      }, getMessage:function() {
        return h;
      }, clearMessage:function() {
        h = null;
      }, abortJob:G};
    }();
  }
})();

