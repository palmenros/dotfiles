var scanner = function() {
  function D(l, b, m, a, e, c) {
    var d = new XMLHttpRequest;
    d.onreadystatechange = function() {
      e(d);
    };
    d.timeout = a || 3E3;
    d.ontimeout = c;
    d.onerror = c;
    d.open(b, l, !0);
    null == m ? d.send() : d.send(m);
  }
  function z(l, b) {
    var m = {};
    if (document.body.textContent.match(/you're not a robot/)) {
      m.status = 403, b(m);
    } else {
      var a = 0;
      if (l.scrapeFilters && 0 < l.scrapeFilters.length) {
        var e = {}, c = null, d = "", g = null, h = {}, f = {}, q = !1, A = function(a, b, c) {
          var e = [];
          if (null == a.selector) {
            if (null == a.regExp) {
              return d = "invalid selector, sel/regexp", !1;
            }
            var f = document.getElementsByTagName("html")[0].innerHTML.match(new RegExp(a.regExp));
            if (!f || f.length < a.reGroup) {
              f = "regexp fail: html - " + a.name + c;
              if (!1 === a.optional) {
                return d = f, !1;
              }
              g += " // " + f;
              return !0;
            }
            return f[a.reGroup];
          }
          f = b.querySelectorAll(a.selector);
          0 == f.length && (f = b.querySelectorAll(a.altSelector));
          if (0 == f.length) {
            if (!0 === a.optional) {
              return !0;
            }
            d = "selector no match: " + a.name + c;
            return !1;
          }
          if (null != a.parentSelector && (f = [f[0].parentNode.querySelector(a.parentSelector)], null == f[0])) {
            if (!0 === a.optional) {
              return !0;
            }
            d = "parent selector no match: " + a.name + c;
            return !1;
          }
          if (null != a.multiple && (!0 === a.multiple && 1 > f.length || !1 === a.multiple && 1 < f.length)) {
            if (!q) {
              return q = !0, A(a, b, c);
            }
            c = "selector multiple mismatch: " + a.name + c + " found: " + f.length;
            if (!1 === a.optional) {
              a = "";
              for (var k in f) {
                !f.hasOwnProperty(k) || 1E3 < a.length || (a += " - " + k + ": " + f[k].outerHTML + " " + f[k].getAttribute("class") + " " + f[k].getAttribute("id"));
              }
              d = c + a + " el: " + b.getAttribute("class") + " " + b.getAttribute("id");
              return !1;
            }
            g += " // " + c;
            return !0;
          }
          if (null != a.isListSelector && !0 === a.isListSelector) {
            return h[a.name] = f, !0;
          }
          if (null == a.attribute) {
            return d = "selector attribute undefined?: " + a.name + c, !1;
          }
          for (var p in f) {
            if (f.hasOwnProperty(p)) {
              k = f[p];
              if (!k) {
                break;
              }
              if (null !== a.childNode) {
                a.childNode = Number(a.childNode);
                b = k.childNodes;
                if (b.length < a.childNode) {
                  f = "childNodes fail: " + b.length + " - " + a.name + c;
                  if (!1 === a.optional) {
                    return d = f, !1;
                  }
                  g += " // " + f;
                  return !0;
                }
                k = b[a.childNode];
              }
              b = null;
              "text" == a.attribute ? b = k.textContent : "html" != a.attribute && (b = k.getAttribute(a.attribute));
              if (null == b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                f = "selector attribute null: " + a.name + c;
                if (!1 === a.optional) {
                  return d = f, !1;
                }
                g += " // " + f;
                return !0;
              }
              if (null != a.regExp) {
                k = b.match(new RegExp(a.regExp));
                if (!k || k.length < a.reGroup) {
                  f = "regexp fail: " + b + " - " + a.name + c;
                  if (!1 === a.optional) {
                    return d = f, !1;
                  }
                  g += " // " + f;
                  return !0;
                }
                e.push(k[a.reGroup]);
              } else {
                e.push(b);
              }
              if (!a.multiple) {
                break;
              }
            }
          }
          return a.multiple ? e : e[0];
        }, r = document, B = !1, t = {}, x;
        for (x in l.scrapeFilters) {
          if (B) {
            break;
          }
          t.pageFilter = l.scrapeFilters[x];
          var u = t.pageFilter.pageVersionTest, k = document.querySelectorAll(u.selector);
          0 == k.length && (k = document.querySelectorAll(u.altSelector));
          if (0 != k.length) {
            if (null != u.multiple) {
              if (!0 === u.multiple && 2 > k.length) {
                continue;
              }
              if (!1 === u.multiple && 1 < k.length) {
                continue;
              }
            }
            if (null != u.attribute) {
              var n = null, n = "text" == u.attribute ? "" : k[0].getAttribute(u.attribute);
              if (null == n) {
                continue;
              }
            }
            var c = x, C;
            for (C in t.pageFilter) {
              if (B) {
                break;
              }
              k = t.pageFilter[C];
              if (k.name != u.name) {
                if ("undefined" != typeof k.parentList && null != k.parentList) {
                  n = [];
                  if ("undefined" != typeof h[k.parentList]) {
                    n = h[k.parentList];
                  } else {
                    if (!0 === A(t.pageFilter[k.parentList], r, x)) {
                      n = h[k.parentList];
                    } else {
                      break;
                    }
                  }
                  f[k.parentList] || (f[k.parentList] = []);
                  var y = {}, v;
                  for (v in n) {
                    if (B) {
                      break;
                    }
                    if (n.hasOwnProperty(v)) {
                      if ("revealMAP" == k.name) {
                        y.revealMAP = k;
                        var p = void 0, p = y.revealMAP.selector ? n[v].querySelector(y.revealMAP.selector) : n[v];
                        if (null != p) {
                          if (!p.textContent.match(new RegExp(y.revealMAP.regExp))) {
                            continue;
                          }
                          p = document.location.href.match(/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/);
                          p = p[1];
                          if (null == t.pageFilter.sellerId || null == p || 2 > p.length) {
                            continue;
                          }
                          var w = n[v].querySelector('input[name="oid"]').value;
                          if (null == w || 20 > w + 0) {
                            continue;
                          }
                          p = y.revealMAP.altSelector.replace("OFFERID", w).replace("ASINID", p);
                          a++;
                          y.mapIndex = v + "";
                          D(p, "GET", null, 3E3, function(d, c) {
                            return function(e) {
                              if (4 == e.readyState) {
                                a--;
                                if (200 == e.status) {
                                  try {
                                    var h = e.responseText, k = d.pageFilter.price;
                                    if (k && k.regExp) {
                                      if (h.match(/no valid offer--/)) {
                                        f[c.revealMAP.parentList][c.mapIndex] || (f[c.revealMAP.parentList][c.mapIndex] = {}), f[c.revealMAP.parentList][c.mapIndex][c.revealMAP.name] = -1;
                                      } else {
                                        var p = h.match(new RegExp("price info--\x3e(?:.|\\n)*?" + k.regExp + "(?:.|\\n)*?\x3c!--")), n = h.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                        if (!p || p.length < k.reGroup) {
                                          g += " // " + (" priceMAP regexp fail: " + h + " - " + k.name + x);
                                        } else {
                                          var q = p[k.reGroup];
                                          f[c.revealMAP.parentList][c.mapIndex] || (f[c.revealMAP.parentList][c.mapIndex] = {});
                                          f[c.revealMAP.parentList][c.mapIndex][c.revealMAP.name] = q;
                                          null != n && 2 == n.length && (f[c.revealMAP.parentList][c.mapIndex][c.revealMAP.name + "Shipping"] = n[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                          window.parent.postMessage({log:"found map price " + c.mapIndex + " " + f[c.revealMAP.parentList] + " " + JSON.stringify(f[c.revealMAP.parentList][c.mapIndex]) + " " + q + "\n\n" + n[1]}, "*");
                                        }
                                      }
                                    }
                                  } catch (I) {
                                  }
                                }
                                0 == a && b(m);
                              }
                            };
                          }(t, y), function() {
                            0 == --a && b(m);
                          });
                        }
                      } else {
                        p = A(k, n[v], x);
                        if (!1 === p) {
                          B = !0;
                          break;
                        }
                        if (!0 === p) {
                          continue;
                        }
                        f[k.parentList][v] || (f[k.parentList][v] = {});
                        if (k.multiple) {
                          for (var E in p) {
                            p.hasOwnProperty(E) && (p[E] = p[E].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                          }
                          p = p.join("\u271c\u271c");
                          f[k.parentList][v][k.name] = p;
                        } else {
                          f[k.parentList][v][k.name] = p.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                        }
                      }
                      y = {revealMAP:y.revealMAP, mapIndex:y.mapIndex};
                    }
                  }
                } else {
                  n = A(k, r, x);
                  if (!1 === n) {
                    B = !0;
                    break;
                  }
                  if (!0 !== n) {
                    if (k.multiple) {
                      for (var G in n) {
                        n.hasOwnProperty(G) && (n[G] = n[G].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                      }
                      n = n.join();
                    } else {
                      n = n.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                    }
                    e[k.name] = n;
                  }
                }
              }
            }
            B = !0;
            t = {pageFilter:t.pageFilter};
          }
        }
        if (null == c) {
          d += " // no pageVersion matched", m.status = 308, m.payload = [g, d, ""];
        } else {
          if ("" === d) {
            m.payload = [g];
            m.scrapedData = e;
            for (var z in f) {
              m[z] = f[z];
            }
          } else {
            m.status = 305, m.payload = [g, d, ""];
          }
        }
      } else {
        m.status = 306;
      }
      0 == a && b(m);
    }
  }
  var F = !!window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), w = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), l = !0;
  !F && !w || F || w || (l = !1);
  window.self == window.top && (l = !1);
  window.sandboxHasRun && (l = !1);
  l && (window.sandboxHasRun = !0, window.addEventListener("message", function(l) {
    if (l.source == window.parent && l.data) {
      var b = l.data.value;
      "data" == l.data.key && b.url && b.url == document.location && setTimeout(function() {
        z(b, function(b) {
          window.parent.postMessage({sandbox:b}, "*");
        });
      }, 800);
    }
  }, !1), window.parent.postMessage({sandbox:document.location + "", isUrlMsg:!0}, "*"));
  return {scan:z};
}();
(function() {
  var D = !!window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), z = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), F = z ? "firefox" : "chrome", w = !D && !z;
  if (w || D || z) {
    if (window.keepaHasRun) {
      return;
    }
    window.keepaHasRun = !0;
  }
  var l = {amazonBridge:function() {
    var a = document.getElementsByTagName("head")[0], e = document.createElement("script");
    e.type = "text/javascript";
    e.src = "https://cdn.keepa.com/selectionHook.js";
    a.appendChild(e);
    var c = 0;
    window.addEventListener("message", function(a) {
      if ("undefined" == typeof a.data.sandbox) {
        if ("https://keepa.com" == a.origin || "https://test.keepa.com" == a.origin) {
          if (a.data.hasOwnProperty("origin") && "keepaIframe" == a.data.origin) {
            b.handleIFrameMessage(a.data.key, a.data.value, function(c) {
              a.source.postMessage({origin:"keepaContentScript", key:a.data.key, value:c, id:a.data.id}, a.origin);
            });
          } else {
            var d = a.data.split(",");
            if (2 > d.length) {
              return;
            }
            if (2 < d.length) {
              for (var e = 2, f = d.length;e < f;e++) {
                d[1] += "," + d[e];
              }
            }
            b.handleIFrameMessage(d[0], d[1], function(c) {
              a.source.postMessage({origin:"keepaContentScript", value:c}, a.origin);
            });
          }
        }
        if (a.origin.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|it|cn|in|com\.mx|com\.br)/)) {
          l.staticBridge("log", "msg: " + a.data);
          var q;
          try {
            q = JSON.parse(a.data);
          } catch (A) {
            return;
          }
          (q = q.asin) && "null" != q && /(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(q) && (q != b.ASIN ? (b.ASIN = q, b.swapIFrame()) : 0 != c ? (window.clearTimeout(c), c = 1) : c = window.setTimeout(function() {
            b.swapIFrame();
          }, 1E3));
        }
      }
    });
  }, storage:chrome.storage.local, iframeBridge:function() {
    chrome.runtime.onMessage.addListener(function(a, b, c) {
    });
  }, get:function(a, b) {
    "function" != typeof b && (b = function() {
    });
    chrome.storage.local.get(a, b);
  }, set:function(a, b, c) {
    var d = {};
    d[a] = b;
    l.storage.set(d, c);
    "token" == a && 64 == b.length && w && chrome.storage.sync.set({KeepaHash:b}, function() {
    });
  }, remove:function(a, b) {
    l.storage.remove(a, b);
  }, staticBridge:function(a, b) {
    switch(a) {
      case "log":
        return null;
      case "showAlert":
        return chrome.runtime.sendMessage({type:"showAlert", val:b}), null;
      default:
        return null;
    }
  }}, H = {insertAfter:function(a, b) {
    var c = b.parentNode;
    c.lastChild == b ? c.appendChild(a) : c.insertBefore(a, b.nextSibling);
  }, onPageLoad:function() {
    var a = b.getDomain(RegExp.$2), e = /([A-Z0-9]{12,13})/, c, d = document.querySelectorAll(".wl-list.selected");
    0 == d.length && (d = document.querySelectorAll(".wl-friend-list.selected"));
    var g = null, h = !1;
    if (0 < d.length) {
      c = d[0], e = d[0].querySelector("a").getAttribute("href"), /wishlist\/([A-Z0-9]{12,13})/.test(e) && (g = RegExp.$1, h = !0);
    } else {
      c = document.getElementById("printThisList");
      c || (c = document.getElementById("rememberButton"), e = /registryId=([A-Z0-9]{12,13})/);
      c || (c = document.getElementsByClassName("g-active-list").item(0), e = /wishlist\/([A-Z0-9]{12,13})/);
      c || (c = document.getElementById("createList"), e = /wishlist\/([A-Z0-9]{12,13})/);
      if (!c) {
        return;
      }
      if (e.test(c.innerHTML) || e.test(c.getAttribute("href"))) {
        g = RegExp.$1;
      }
    }
    if (null != g) {
      e = document.createElement("span");
      e.setAttribute("id", "importWishlist");
      d = document.createElement("div");
      d.setAttribute("style", "height: 100px;display: block;padding: 12px;border-top: 3px solid #ff9900;border-bottom: 1px solid #444;background-color: #f9f9f9;");
      h && d.setAttribute("style", "display: block;padding: 6px;background-color: #E2E2E2;font-size: 12px;margin: 6px 6px 6px 0px;");
      var f = document.createElement("a");
      f.setAttribute("id", "keepaWishlistLink");
      f.setAttribute("class", "a-link-normal a-block a-color-base");
      f.textContent = "\u00bb Track this Wish List via Keepa.com (must be public or shared)";
      d.appendChild(f);
      e.appendChild(d);
      h ? c.appendChild(e) : (h = document.getElementById("createList")) ? b.insertAfter(e, h.parentNode) : b.insertAfter(e, c);
      var q = document.getElementById("keepaWishlistLink"), A = !1;
      e.addEventListener("click", function() {
        A || (A = !0, q.textContent = "\u00bb Track this Wish List via Keepa.com (must be public or shared)... working...", l.set("wishlistDomain", a), l.set("wishlistAddonId", g), window.setTimeout(function() {
          q.textContent = "\u00bb Track this Wish List via Keepa.com (must be public or shared)";
          window.open("https://keepa.com/#!import");
          A = !1;
        }, 1E3));
      }, !1);
    }
  }, getFlex:function(a) {
    switch(a) {
      case "com":
        return "us";
      case "co.uk":
        return "gb";
      case "de":
        return "de";
      case "fr":
        return "fr";
      case "co.jp":
        return "jp";
      case "ca":
        return "ca";
      case "cn":
        return "cn";
      case "it":
        return "it";
      case "es":
        return "es";
      case "in":
        return "in";
      case "com.mx":
        return "com.mx";
      case "com.br":
        return "com.br";
      default:
        return -1;
    }
  }, httpGet:function(a, b) {
    var c = new XMLHttpRequest;
    b && (c.onreadystatechange = function() {
      4 == c.readyState && b.call(this, c.responseText);
    });
    c.open("GET", a, !0);
    c.send();
  }}, b = {offset:12938364E5, offsetHours:359399, domain:0, yen:String.fromCharCode(165), iframeDocument:[], iframeWindow:[], iframeDOM:[], iframeJQ:[], iframeStorage:[], ASIN:null, tld:"", placeholder:"", storageIndex:-1, cssFlex:function() {
    var a = "flex", b = ["flex", "-webkit-flex", "-moz-box", "-webkit-box", "-ms-flexbox"], c = document.createElement("flexelement"), d;
    for (d in b) {
      try {
        if ("undefined" != c.style[b[d]]) {
          a = b[d];
          break;
        }
      } catch (g) {
      }
    }
    return a;
  }(), getDomain:function(a) {
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
      case "jp":
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
        return -1;
    }
  }, revealWorking:!1, revealCache:{}, revealCacheStock:{}, revealMAP:function() {
    l.get("revealStock", function(a) {
      var e = 0;
      try {
        e = "1" == a.revealStock;
      } catch (p) {
      }
      try {
        if ((e || "com" == b.tld) && !b.revealWorking) {
          if (b.revealWorking = !0, document.getElementById("keepaMAP")) {
            b.revealWorking = !1;
          } else {
            var c = function() {
              var a = new MutationObserver(function(c) {
                setTimeout(function() {
                  b.revealMAP();
                }, 100);
                try {
                  a.disconnect();
                } catch (E) {
                }
              });
              a.observe(document.getElementById("keepaMAP").parentNode.parentNode.parentNode, {childList:!0, subtree:!0});
            }, d = function(a, d, e) {
              b.revealWorking = !1;
              var f = document.createElement("div"), g = "", h = !1;
              d && (g = '<div id="keepaMAP" style="font-size: 12px;color: #999;">Hidden Price revealed by Keepa:<span id="keepaMAPObserver"></span></div>' + b.revealCache[b.ASIN + e], h = !0);
              b.revealCacheStock[b.ASIN + e] && (g += '<div id="keepaMAP" style="font-size: 12px;color: #999;">Stock revealed by Keepa:<span id="keepaMAPObserver"></span></div>' + b.revealCacheStock[b.ASIN + e], h = !0);
              h && (f.innerHTML = g, a.appendChild(f), c());
            }, g = document.location.href;
            a = function(a, c, e) {
              b.httpGet("https://www.amazon." + b.tld + "/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + b.ASIN + "&offerlistingid=" + a, function(f) {
                f && (f.match(/no valid offer--/) ? (b.revealCache[b.ASIN + a] = -1, b.revealCacheStock[b.ASIN + a] = 0, d(c, e, a)) : f.match(/price info--\x3e((.|\n)*?)\x3c!--/) ? (b.revealCache[b.ASIN + a] = RegExp.$1, f.match(/sc-product-scarcity">((.|\n)*?)<\//) && (b.revealCacheStock[b.ASIN + a] = RegExp.$1), (e || b.revealCacheStock[b.ASIN + a]) && d(c, e, a)) : b.reportBug("invalid MAP response: https://www.amazon.com/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + 
                b.ASIN + "&offerlistingid=" + a + " result: " + f));
              });
            };
            if (-1 != g.indexOf("offer-listing")) {
              try {
                var h = document.getElementById("olpTabContent");
                if (null == h && (h = document.getElementById("olpOfferList"), null == h)) {
                  return;
                }
                var f = h.querySelector('[role="main"]');
                if (null != f) {
                  var q = f.childNodes, l;
                  for (l in q) {
                    if (q.hasOwnProperty(l)) {
                      var r = q[l];
                      if (null != r && "DIV" == r.nodeName) {
                        var m = r.querySelector('input[name="offeringID.1"]');
                        if (m) {
                          var t = m.getAttribute("value"), x = r.children[0];
                          -1 != r.textContent.toLowerCase().indexOf("add to cart to see product details.") ? a(t, x, !0) : e && a(t, x, !1);
                        }
                      }
                    }
                  }
                }
              } catch (p) {
                console.log(p), b.reportBug("MAP error: " + g + " " + p);
              }
            } else {
              var u = document.getElementById("price");
              if (null != u && /(our price|always remove it|add this item to your cart|see product details in cart|see price in cart)/i.test(u.textContent)) {
                var k = document.getElementById("merchant-info"), n = "", C = "";
                if (k) {
                  if (-1 == k.textContent.toLowerCase().indexOf("amazon.com")) {
                    var y = u.querySelector('span[data-action="a-modal"]');
                    if (y) {
                      var v = y.getAttribute("data-a-modal");
                      v.match(/offeringID\.1=(.*?)&amp/) && (n = RegExp.$1);
                    }
                    if (0 == n.length) {
                      if (v.match(/map_help_pop_(.*?)"/)) {
                        C = RegExp.$1;
                      } else {
                        b.revealWorking = !1;
                        return;
                      }
                    }
                  }
                  void 0 != b.revealCache[b.ASIN + n] ? d(u, !0, n) : b.httpGet("https://www.amazon.com/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + b.ASIN + "&offerlistingid=" + n, function(a) {
                    "" != C && -1 == a.indexOf("seller=" + C) && (b.revealWorking = !1);
                    a.match(/price info--\x3e((.|\n)*?)\x3c!--/) ? (b.revealCache[b.ASIN + n] = RegExp.$1, d(u, document.getElementById("price"), n)) : a.match(/no valid offer/) || b.reportBug("invalid MAP response: https://www.amazon.com/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + b.ASIN + "&offerlistingid=" + n + " " + a);
                  });
                } else {
                  b.revealWorking = !1;
                }
              } else {
                b.revealWorking = !1;
              }
            }
          }
        }
      } catch (p) {
        b.revealWorking = !1, console.error(p);
      }
    });
  }, onPageLoad:function() {
    b.tld = RegExp.$2;
    var a = RegExp.$4;
    l.amazonBridge();
    b.ASIN || (b.ASIN = a);
    b.domain = b.getDomain(b.tld);
    l.get("s_boxType", function(a) {
      if ("0" == a.s_boxType) {
        b.swapIFrame();
      } else {
        var c = document.getElementsByClassName("bucketDivider"), d = 0;
        if (void 0 === c[d]) {
          if (void 0 === c[0]) {
            return;
          }
          d = 0;
        }
        a = document.createElement("div");
        a.setAttribute("id", "keepaButton");
        a.setAttribute("style", "background-color: #444; border: 0 solid #ccc; border-radius: 6px 6px 6px 6px; color: #fff;cursor: pointer; font-size: 12px; margin: 15px;\tpadding: 6px; text-decoration: none; text-shadow: none;\tfloat:left;\tbox-shadow: 0px 0px 7px 0px #888;");
        var e = document.createElement("style");
        e.appendChild(document.createTextNode("#keepaButton:hover{background-color:#666 !important}"));
        document.getElementsByTagName("head")[0].appendChild(e);
        a.addEventListener("click", function() {
          var a = document.getElementById("keepaButton");
          a.parentNode.removeChild(a);
          b.swapIFrame();
        }, !1);
        a.textContent = "Show KeepaBox";
        c = document.getElementsByClassName("lpo")[0] && c[1] && 0 == d ? c[1] : c[d];
        c = "promotions_feature_div" == c.parentNode.id ? c.parentNode : c;
        c.parentNode.insertBefore(a, c);
      }
    });
  }, swapIFrame:function() {
    l.staticBridge("log", "swap in ASIN: " + b.ASIN);
    try {
      b.revealMAP(document, b.ASIN, b.tld);
    } catch (d) {
    }
    if (!document.getElementById("keepaButton")) {
      var a, e, c;
      for (c in b.iframeStorage) {
        if (b.iframeStorage[c].style.display = "none", a = b.iframeStorage[c].id, a = a.replace("Container", "Clear"), e = document.getElementById(a)) {
          e.style.display = "none";
        }
      }
      b.swapIFrame.swapTimer && clearTimeout(b.swapIFrame.swapTimer);
      b.swapIFrame.swapTimer = setTimeout(function() {
        document.getElementById("keepaContainer" + b.ASIN) || b.getPlaceholderAndInsertIFrame();
        b.swapIFrame.swapTimer = setTimeout(function() {
          document.getElementById("keepaContainer" + b.ASIN) || b.getPlaceholderAndInsertIFrame();
        }, 2E3);
      }, 2E3);
      c = document.getElementById("keepaContainer" + b.ASIN);
      if (b.iframeStorage[b.ASIN] && c) {
        l.staticBridge("log", "swap in ASIN - found old iframe: " + b.ASIN + " element: " + c);
        try {
          if (b.iframeStorage[b.ASIN].style.display = b.cssFlex, a = b.iframeStorage[b.ASIN].id, a = a.replace("Container", "Clear"), e = document.getElementById(a)) {
            e.style.display = "";
          }
        } catch (d) {
          l.staticBridge("log", "swap - catch: " + b.ASIN), b.iframeStorage[b.ASIN].style.display = "none", b.iframeStorage[b.ASIN] = null, window.setTimeout(function() {
            b.getPlaceholderAndInsertIFrame();
          }, 500);
        }
      } else {
        b.getPlaceholderAndInsertIFrame();
      }
    }
  }, getPlaceholderAndInsertIFrame:function() {
    l.get(["keepaBoxPlaceholder", "keepaBoxPlaceholderBackup", "keepaBoxPlaceholderBackupClass"], function(a) {
      var e = 0, c = function() {
        if (!document.getElementById("keepaButton")) {
          var d, g = document.getElementsByClassName("mocaGlamorContainer")[0];
          g || (g = document.getElementById("dv-sims"));
          g || (g = document.getElementById("mas-terms-of-use"));
          if (g && g.nextSibling) {
            b.insertIFrame(g.nextSibling, !1, !0);
          } else {
            if ((g = document.getElementById("ppd")) || (g = document.getElementById("ppd-left")), g && g.nextSibling) {
              b.insertIFrame(g.nextSibling, !1, !0);
            } else {
              if (d = a.keepaBoxPlaceholder || "bottomRow", g = !1, d = document.getElementById(d)) {
                "sims_fbt" == d.previousElementSibling.id && (d = d.previousElementSibling, "bucketDivider" == d.previousElementSibling.className && (d = d.previousElementSibling), g = !0), b.insertIFrame(d, g);
              } else {
                if (d = a.keepaBoxPlaceholderBackup || "elevatorBottom", d = document.getElementById(d)) {
                  b.insertIFrame(d, !0);
                } else {
                  if (d = document.getElementById("hover-zoom-end")) {
                    b.insertIFrame(d, !0);
                  } else {
                    if (d = a.keepaBoxPlaceholderBackupClass || "a-fixed-left-grid", (d = document.getElementsByClassName(d)[0]) && d.nextSibling) {
                      b.insertIFrame(d.nextSibling, !0);
                    } else {
                      g = 0;
                      d = document.getElementsByClassName("twisterMediaMatrix");
                      var h = !!document.getElementById("dm_mp3Player");
                      if ((d = 0 == d.length ? document.getElementById("handleBuy") : d[0]) && 0 == g && !h && null != d.nextElementSibling) {
                        for (var f = !1, h = d;h;) {
                          if (h = h.parentNode, "table" === h.tagName.toLowerCase()) {
                            if ("buyboxrentTable" === h.className || /buyBox/.test(h.className) || "buyingDetailsGrid" === h.className) {
                              f = !0;
                            }
                            break;
                          } else {
                            if ("html" === h.tagName.toLowerCase()) {
                              break;
                            }
                          }
                        }
                        if (!f) {
                          d = d.nextElementSibling;
                          b.insertIFrame(d, !1);
                          return;
                        }
                      }
                      d = document.getElementsByClassName("bucketDivider");
                      0 == d.length && (d = document.getElementsByClassName("a-divider-normal"));
                      if (!d[g]) {
                        if (!d[0]) {
                          40 > e++ && window.setTimeout(function() {
                            c();
                          }, 100);
                          return;
                        }
                        g = 0;
                      }
                      for (h = d[g];h && d[g];) {
                        if (h = h.parentNode, "table" === h.tagName.toLowerCase()) {
                          if ("buyboxrentTable" === h.className || /buyBox/.test(h.className) || "buyingDetailsGrid" === h.className) {
                            h = d[++g];
                          } else {
                            break;
                          }
                        } else {
                          if ("html" === h.tagName.toLowerCase()) {
                            break;
                          }
                        }
                      }
                      b.placeholder = d[g];
                      d[g] && d[g].parentNode && (l.staticBridge("log", "getPlaceholderAndInsertIFrame Insert"), g = document.getElementsByClassName("lpo")[0] && d[1] && 0 == g ? d[1] : d[g], b.insertIFrame(g, !1));
                    }
                  }
                }
              }
            }
          }
        }
      };
      c();
    });
  }, getAFComment:function(a) {
    for (a = [a];0 < a.length;) {
      for (var b = a.pop(), c = 0;c < b.childNodes.length;c++) {
        var d = b.childNodes[c];
        if (8 === d.nodeType && -1 < d.textContent.indexOf("MarkAF")) {
          return d;
        }
        a.push(d);
      }
    }
    return null;
  }, insertIFrame:function(a, e) {
    if (b.iframeStorage[b.ASIN] && document.getElementById("keepaContainer" + b.ASIN)) {
      b.swapIFrame();
    } else {
      var c = document.getElementById("hover-zoom-end"), d = function(a) {
        for (var b = document.getElementById(a), c = [];b;) {
          c.push(b), b.id = "a-different-id", b = document.getElementById(a);
        }
        for (b = 0;b < c.length;++b) {
          c[b].id = a;
        }
        return c;
      }("hover-zoom-end");
      l.get("s_boxHorizontal", function(g) {
        var h = g.s_boxHorizontal, f = window.innerWidth - 50;
        if (document.getElementById("keepaContainer" + b.ASIN)) {
          l.staticBridge("log", "could not find keepa container");
        } else {
          var q = "https://keepa.com/iframe_addon.html#" + b.domain + "-0-" + b.ASIN;
          g = document.createElement("div");
          "0" == h ? (f -= 550, 960 > f && (f = 960), g.setAttribute("style", "min-width: 700px; max-width:" + f + "px;display: flex;  height: 320px; border:0 none; margin: 10px 0 0;")) : g.setAttribute("style", "width: calc(100% - 30px); height: 320px; display: flex; border:0 none; margin: 10px 0 0;");
          g.setAttribute("id", "keepaContainer" + b.ASIN);
          var m = document.createElement("iframe"), h = document.createElement("div");
          h.setAttribute("id", "keepaClear" + b.ASIN);
          m.setAttribute("style", "width: 100%; height: 100%; border:0 none;");
          m.setAttribute("src", q);
          m.setAttribute("scrolling", "no");
          m.setAttribute("id", "keepa" + b.ASIN);
          g.appendChild(m);
          if (!e) {
            if (null != a.parentNode && "promotions_feature_div" === a.parentNode.id || "dp-out-of-stock-top_feature_div" === a.parentNode.id) {
              a = a.parentNode;
            }
            try {
              var r = a.previousSibling.previousSibling;
              null != r && "technicalSpecifications_feature_div" == r.id && (a = r);
            } catch (C) {
            }
            var B = !1;
            0 < d.length && (c = d[d.length - 1]) && (a = b.getFirstInDOM([a, c], document.body), a === c && (B = !0));
            (r = document.getElementById("title") || document.getElementById("title_row")) && b.getFirstInDOM([a, r], document.body) !== r && (a = r);
            100 < b.getClipRect(a.parentNode).left && (a = b.findPlaceholderBelowImages(a));
          }
          r = document.getElementById("vellumMsg");
          null != r && (a = r);
          var r = document.body, f = document.documentElement, f = Math.max(r.scrollHeight, r.offsetHeight, f.clientHeight, f.scrollHeight, f.offsetHeight), t = a.offsetTop / f;
          if (.5 < t || 0 > t) {
            r = b.getAFComment(r), null != r && (t = a.offsetTop / f, .5 > t && (a = r));
          }
          if (a.parentNode) {
            -1 != document.location.href.indexOf("offer-listing") ? (a = document.getElementById("olpTabContent"), a || (a = document.getElementById("olpProduct"), a = a.nextSibling), a.parentNode.insertBefore(g, a)) : "burjPageDivider" == a.id ? (a.parentNode.insertBefore(g, a), e || a.parentNode.insertBefore(h, g.nextSibling)) : "bottomRow" == a.id ? (a.parentNode.insertBefore(g, a), e || a.parentNode.insertBefore(h, g.nextSibling)) : B ? (a.parentNode.insertBefore(g, a.nextSibling), e || a.parentNode.insertBefore(h, 
            g.nextSibling)) : (a.parentNode.insertBefore(g, a), e || a.parentNode.insertBefore(h, g));
            b.iframeStorage[b.ASIN] = g;
            b.iframeStorage[b.ASIN].style.display = b.cssFlex;
            var x = !1, u = 5;
            if (w || D || z) {
              var k = setInterval(function() {
                if (0 >= u--) {
                  clearInterval(k);
                } else {
                  try {
                    if (x) {
                      throw 1;
                    }
                    document.getElementById("keepa" + b.ASIN).contentDocument.location = q;
                  } catch (C) {
                    clearInterval(k);
                  }
                }
              }, 4E3);
            }
            var n = function() {
              x = !0;
              m.removeEventListener("load", n, !1);
              b.synchronizeIFrame();
            };
            m.addEventListener("load", n, !1);
          } else {
            b.swapIFrame(), l.staticBridge("log", "placeholder.parentNode null...");
          }
        }
      });
    }
  }, handleIFrameMessage:function(a, e, c) {
    switch(a) {
      case "resize":
        e = "" + e;
        -1 == e.indexOf("px") && (e += "px");
        document.getElementById("keepaContainer" + b.ASIN).style.height = e;
        break;
      case "alert":
        a = encodeURIComponent("Kindle Fire HD Tablet"), e = encodeURIComponent("51e5r0yV5AL.jpg"), l.staticBridge("showAlert", "https://keepa.com/app/notification.html#B0083PWAPW/1/0/0/16900/19000/" + e + "/" + a);
    }
  }, synchronizeIFrame:function() {
    l.iframeBridge();
    var a = 0;
    l.get("s_boxHorizontal", function(b) {
      a = b.s_boxHorizontal;
    });
    var e = window.innerWidth, c = !1;
    window.addEventListener("resize", function() {
      c || (c = !0, window.setTimeout(function() {
        if (e != window.innerWidth) {
          e = window.innerWidth;
          var d = window.innerWidth - 50;
          "0" == a && (d -= 550, 800 > d && (d = 800));
          document.getElementById("keepaContainer" + b.ASIN).style.width = d;
        }
        c = !1;
      }, 100));
    }, !1);
  }, getFirstInDOM:function(a, e) {
    var c, d;
    for (c = e.firstChild;c;c = c.nextSibling) {
      if ("IFRAME" !== c.nodeName && 1 === c.nodeType) {
        if (-1 !== a.indexOf(c)) {
          return c;
        }
        if (d = b.getFirstInDOM(a, c)) {
          return d;
        }
      }
    }
    return null;
  }, getClipRect:function(a) {
    "string" === typeof a && (a = document.querySelector(a));
    var e = 0, c = 0, d = function(a) {
      e += a.offsetLeft;
      c += a.offsetTop;
      a.offsetParent && d(a.offsetParent);
    };
    d(a);
    return 0 == c && 0 == e ? b.getClipRect(a.parentNode) : {top:c, left:e, width:a.offsetWidth, height:a.offsetHeight};
  }, findPlaceholderBelowImages:function(a) {
    var e = a, c, d = 100;
    do {
      for (d--, c = null;!c;) {
        c = a.nextElementSibling, c || (c = a.parentNode.nextElementSibling), a = c ? c : a.parentNode.parentNode, !c || "IFRAME" !== c.nodeName && "SCRIPT" !== c.nodeName && 1 === c.nodeType || (c = null);
      }
    } while (0 < d && 100 < b.getClipRect(c).left);
    return c ? c : e;
  }, httpGet:function(a, b) {
    var c = new XMLHttpRequest;
    b && (c.onreadystatechange = function() {
      4 == c.readyState && b.call(this, c.responseText);
    });
    c.open("GET", a, !0);
    c.send();
  }, httpPost:function(a, b, c, d) {
    var e = new XMLHttpRequest;
    c && (e.onreadystatechange = function() {
      4 == e.readyState && c.call(this, e.responseText);
    });
    e.withCredentials = d;
    e.open("POST", a, !0);
    e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    e.send(b);
  }, lastBugReport:0, reportBug:function(a) {
    var e = Date.now();
    if (!(6E5 > e - b.lastBugReport || /(dead object)|(Script error)|(\.location is null)/i.test(a))) {
      b.lastBugReport = e;
      var e = w ? "keepaChrome" : D ? "keepaOpera" : "keepaFirefox", c = "";
      try {
        c = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(c)) {
          return;
        }
        c = c.replace(RegExp("chrome-extension://.*?/content/", "g"), "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        c = '<span style="color: #999; font-size: xx-small">' + e + ":2.95debug:content.js&emsp;" + c + "</span>";
      } catch (g) {
      }
      var d = a + ('<br><span style="color: #222; font-size: x-small">' + window.location.protocol + "//" + window.location.hostname + '</span><span style="color: #777; font-size: x-small">' + window.location.pathname + "</span>&emsp;&emsp;") + c;
      l.get("token", function(a) {
        b.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + a.token + "&type=" + F, d);
      });
    }
  }};
  window.onerror = function(a, e, c, d, g) {
    "object" === typeof a && a.srcElement && a.target && (a = "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script" : "Event Error - target:" + a.target + " srcElement:" + a.srcElement);
    a = a.toString();
    var h = "";
    d = d || 0;
    if (g && g.stack) {
      h = g.stack;
      try {
        h = g.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), h = h.replace(RegExp("http|s://.*?/", "g"), "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (f) {
        console.log(f);
      }
    }
    a = "error: " + a + " url: " + (e || document.location.toString()) + " line: " + parseInt(c || 0) + " col: " + parseInt(d || 0) + " date: " + new Date + " stack: " + h;
    b.reportBug(a);
    return !1;
  };
  if (w || D || z) {
    if (window.self != window.top) {
      return;
    }
    chrome.runtime.sendMessage({type:"getStorage"}, function(a) {
      var e = !1;
      /((\/images)|(\/review)|(\/product-reviews))/.test(document.location.href) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(document.location.href) || !document.location.href.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)[^.]*?(\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !document.location.href.match(/^htt(p|ps):\/\/.*?\.amzn\.(com).*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) || (b.onPageLoad(), e = !0);
      if (document.location.href.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)[^.]*?\/(wishlist|registry)/) || document.location.href.match(/^htt(p|ps):\/\/w*?\.amzn\.(com)[^.]*?\/(wishlist|registry)/)) {
        H.onPageLoad();
      }
      if (w) {
        var c = /^http(?:|s):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/(s\/|gp\/search\/|.*?\/b\/)/;
        if (e || document.location.href.match(c)) {
          var d = null;
          chrome.runtime.sendMessage({type:"getFilters"}, function(a) {
            d = a;
            if (null != d && null != d.value) {
              var g = function() {
                if (e || document.location.href.match(c)) {
                  var d = b.getDomain(RegExp.$1);
                  scanner.scan(a.value, function(a) {
                    a.key = "f1";
                    a.domainId = d;
                    chrome.runtime.sendMessage({type:"sendData", val:a}, function(a) {
                    });
                  });
                }
              };
              g();
              var f = document.location.href, q = -1, m = -1, l = -1, m = setInterval(function() {
                f != document.location.href && (f = document.location.href, clearTimeout(l), l = setTimeout(function() {
                  g();
                }, 2E3), clearTimeout(q), q = setTimeout(function() {
                  clearInterval(m);
                }, 18E4));
              }, 2E3), q = setTimeout(function() {
                clearInterval(m);
              }, 18E4);
            }
          });
        }
      }
      document.location.href.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)/) && setTimeout(function() {
        l.get(["overlayPriceGraph", "s_overlay"], function(a) {
          try {
            var b = a.overlayPriceGraph, c = a.s_overlay;
            try {
              c = JSON.parse(c);
            } catch (x) {
            }
            var d;
            if (1 == b) {
              var e = document.getElementsByTagName("a");
              if (void 0 != e && null != e) {
                for (d = 0;d < e.length;d++) {
                  var g = e[d].href;
                  /\/images/.test(g) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(g) || !g.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)[^.]*?(?:\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !g.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) || -1 == g.indexOf("offer-listing") && m.add_events(c, e[d], g, RegExp.$1, RegExp.$2);
                }
              }
              var l = function(a) {
                if ("A" == a.nodeName) {
                  var b = a.href;
                  /\/images/.test(b) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(b) || !b.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)[^.]*?(?:\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !b.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) || -1 == b.indexOf("offer-listing") && m.add_events(c, a, b, RegExp.$1, RegExp.$2);
                }
              }, t = new MutationObserver(function(a) {
                a.forEach(function(a) {
                  try {
                    if ("childList" === a.type) {
                      for (d = 0;d < a.addedNodes.length;d++) {
                        l(a.addedNodes[d]);
                        for (var b = a.addedNodes[d].children;null != b && "undefined" != b && 0 < b.length;) {
                          for (var c = [], e = 0;e < b.length;e++) {
                            l(b[e]);
                            try {
                              if (b[e].children && 0 < b[e].children.length) {
                                for (var f = 0;f < b[e].children.length && 30 > f;f++) {
                                  c.push(b[e].children[f]);
                                }
                              }
                            } catch (v) {
                            }
                          }
                          b = c;
                        }
                      }
                    } else {
                      if (c = a.target.getElementsByTagName("a"), "undefined" != c && null != c) {
                        for (b = 0;b < c.length;b++) {
                          l(c[b]);
                        }
                      }
                    }
                    l(a.target);
                  } catch (v) {
                  }
                });
              });
              t.observe(document.querySelector("html"), {childList:!0, attributes:!1, characterData:!1, subtree:!0, attributeOldValue:!1, characterDataOldValue:!1});
              window.onunload = function u() {
                try {
                  window.detachEvent("onunload", u), t.disconnect();
                } catch (k) {
                }
              };
            }
          } catch (x) {
          }
        });
      }, 100);
    });
  }
  var m = {image_urls_main:[], pf_preview_current:"", preview_images:[], tld:"", img_string:'<img style="border: 1px solid #ff9f29;  -moz-border-radius: 0px;  margin: -3px;   display:block;   position: relative;   top: -3px;   left: -3px;" src=\'', createNewImageElement:function(a) {
    a = a.createElement("img");
    a.style.borderTop = "2px solid #ff9f29";
    a.style.borderBottom = "3px solid grey";
    a.style.display = "block";
    a.style.position = "relative";
    a.style.padding = "5px";
    return a;
  }, preview_image:function(a, b, c, d, g) {
    var e;
    try {
      e = b.originalTarget.ownerDocument;
    } catch (r) {
      e = document;
    }
    if (!e.getElementById("pf_preview")) {
      var f = e.createElement("div");
      f.id = "pf_preview";
      f.addEventListener("mouseout", function(a) {
        m.clear_image(a);
      }, !1);
      f.style.boxShadow = "rgb(68, 68, 68) 0px 1px 7px -2px";
      f.style.position = "fixed";
      f.style.zIndex = "10000000";
      f.style.bottom = "0px";
      f.style.right = "0px";
      f.style.margin = "12px 12px";
      f.style.backgroundColor = "#fff";
      e.body.appendChild(f);
    }
    m.pf_preview_current = e.getElementById("pf_preview");
    if (!m.pf_preview_current.firstChild) {
      var f = Math.max(Math.floor(.3 * e.defaultView.innerHeight), 128), l = Math.max(Math.floor(.3 * e.defaultView.innerWidth), 128), w = 2;
      if (300 > l || 150 > f) {
        w = 1;
      }
      1E3 < l && (l = 1E3);
      1E3 < f && (f = 1E3);
      m.pf_preview_current.current = -1;
      m.pf_preview_current.a = d;
      m.pf_preview_current.href = c;
      m.pf_preview_current.size = Math.floor(1.1 * Math.min(l, f));
      e.defaultView.innerWidth - b.clientX < 1.05 * l && e.defaultView.innerHeight - b.clientY < 1.05 * f && (b = e.getElementById("pf_preview"), b.style.right = "", b.style.left = "6px");
      d = "https://dyn.keepa.com/pricehistory.png?type=" + w + "&asin=" + d + "&domain=" + g + "&width=" + l + "&height=" + f;
      d = "undefined" == typeof a ? d + "&amazon=1&new=1&used=1&salesrank=1&range=365" : d + ("&amazon=" + a[0] + "&new=" + a[1] + "&used=" + a[2] + "&salesrank=" + a[3] + "&range=" + a[4]);
      e.getElementById("pf_preview").style.display = "block";
      a = m.createNewImageElement(e);
      a.setAttribute("src", d);
      m.pf_preview_current.appendChild(a);
    }
  }, clear_image:function(a) {
    var b;
    try {
      var c;
      try {
        c = a.originalTarget.ownerDocument;
      } catch (d) {
        c = document;
      }
      b = c.getElementById("pf_preview");
      b.style.display = "none";
      b.style.right = "2px";
      b.style.left = "";
      m.pf_preview_current.innerHTML = "";
    } catch (d) {
    }
  }, add_events:function(a, b, c, d, g) {
    0 <= c.indexOf("#") || (m.tld = d, "pf_prevImg" != b.getAttribute("keepaPreview") && (b.addEventListener("mouseover", function(b) {
      m.preview_image(a, b, c, g, d);
      return !0;
    }, !0), b.addEventListener("mouseout", function(a) {
      m.clear_image(a);
    }, !1), b.setAttribute("keepaPreview", "pf_prevImg")));
  }};
})();

