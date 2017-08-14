function VisitorId() {
    this.createWithParams = function(n) {
        var t = n.split(".");
        this.domainHash = t[0];
        this.visitorHash = t[1];
        this.initial = t[2];
        this.previousSession = t[3];
        this.currentSession = t[4];
        this.sessionCounter = t[5];
        this.updateIdString()
    };
    this.create = function() {
        this.domainHash = 1;
        this.visitorHash = murmurhash3_32_gc(navigator.userAgent + generateUUID());
        this.initial = Math.round(Date.now() / 1e3);
        this.previousSession = this.initial;
        this.currentSession = this.initial;
        this.sessionCounter = 1;
        this.updateIdString()
    };
    this.checkVisit = function() {
        var n = Math.round(Date.now() / 1e3);
        return n - this.currentSession > 1800 ? (this.previousSession = this.currentSession, this.currentSession = n, this.sessionCounter++, this.updateIdString(), !0) : (this.currentSession = n, this.updateIdString(), !1)
    };
    this.updateIdString = function() {
        this.idString = this.domainHash + "." + this.visitorHash + "." + this.initial + "." + this.previousSession + "." + this.currentSession + "." + this.sessionCounter
    }
}

function getCookie(n) {
    for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1);
        if (t.indexOf(r) == 0) return t.substring(r.length, t.length)
    }
    return ""
}

function setCookie(n, t, i) {
    var r = new Date,
        u;
    r.setTime(r.getTime() + i * 864e5);
    u = "expires=" + r.toUTCString();
    document.cookie = n + "=" + t + "; " + u + "; path=/"
}

function setUpdateVisitor(n, t, i) {
    var u = getCookie("_gveuid"),
        r;
    EventHub.init(t, i);
    u === "" ? (r = new VisitorId, r.create(), setCookie("_gveuid", r.idString, 730), EventHub.send({
        platformId: r.domainHash,
        visitor: r.visitorHash,
        initial: r.initial,
        previous: r.previousSession,
        current: r.currentSession,
        visits: r.sessionCounter,
        type: "UniqueVisitor"
    })) : (r = new VisitorId, r.createWithParams(u), r.checkVisit() && EventHub.send({
        platformId: r.domainHash,
        visitor: r.visitorHash,
        initial: r.initial,
        previous: r.previousSession,
        current: r.currentSession,
        visits: r.sessionCounter,
        type: "Visitor"
    }), setCookie("_gveuid", r.idString, 730))
}

function murmurhash3_32_gc(n, t) {
    var o, h, r, s, f, e, i, u;
    for (o = n.length & 3, h = n.length - o, r = t, f = 3432918353, e = 461845907, u = 0; u < h;) i = n.charCodeAt(u) & 255 | (n.charCodeAt(++u) & 255) << 8 | (n.charCodeAt(++u) & 255) << 16 | (n.charCodeAt(++u) & 255) << 24, ++u, i = (i & 65535) * f + (((i >>> 16) * f & 65535) << 16) & 4294967295, i = i << 15 | i >>> 17, i = (i & 65535) * e + (((i >>> 16) * e & 65535) << 16) & 4294967295, r ^= i, r = r << 13 | r >>> 19, s = (r & 65535) * 5 + (((r >>> 16) * 5 & 65535) << 16) & 4294967295, r = (s & 65535) + 27492 + (((s >>> 16) + 58964 & 65535) << 16);
    i = 0;
    switch (o) {
        case 3:
            i ^= (n.charCodeAt(u + 2) & 255) << 16;
        case 2:
            i ^= (n.charCodeAt(u + 1) & 255) << 8;
        case 1:
            i ^= n.charCodeAt(u) & 255;
            i = (i & 65535) * f + (((i >>> 16) * f & 65535) << 16) & 4294967295;
            i = i << 15 | i >>> 17;
            i = (i & 65535) * e + (((i >>> 16) * e & 65535) << 16) & 4294967295;
            r ^= i
    }
    return r ^= n.length, r ^= r >>> 16, r = (r & 65535) * 2246822507 + (((r >>> 16) * 2246822507 & 65535) << 16) & 4294967295, r ^= r >>> 13, r = (r & 65535) * 3266489909 + (((r >>> 16) * 3266489909 & 65535) << 16) & 4294967295, r ^= r >>> 16, r >>> 0
}

function generateUUID() {
    var n = Date.now();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
        var i = (n + Math.random() * 16) % 16 | 0;
        return n = Math.floor(n / 16), (t == "x" ? i : i & 3 | 8).toString(16)
    })
}
var mod, theApp, CryptoJS, EventHub, Utils;
(function(n) {
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(jQuery)
})(function(n) {
    function i(n) {
        return t.raw ? n : encodeURIComponent(n)
    }

    function f(n) {
        return t.raw ? n : decodeURIComponent(n)
    }

    function e(n) {
        return i(t.json ? JSON.stringify(n) : String(n))
    }

    function o(n) {
        n.indexOf('"') === 0 && (n = n.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return n = decodeURIComponent(n.replace(u, " ")), t.json ? JSON.parse(n) : n
        } catch (i) {}
    }

    function r(i, r) {
        var u = t.raw ? i : o(i);
        return n.isFunction(r) ? r(u) : u
    }
    var u = /\+/g,
        t = n.cookie = function(u, o, s) {
            var y, a, h, v, c, p;
            if (o !== undefined && !n.isFunction(o)) return s = n.extend({}, t.defaults, s), typeof s.expires == "number" && (y = s.expires, a = s.expires = new Date, a.setDate(a.getDate() + y)), document.cookie = [i(u), "=", e(o), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("");
            for (h = u ? undefined : {}, v = document.cookie ? document.cookie.split("; ") : [], c = 0, p = v.length; c < p; c++) {
                var w = v[c].split("="),
                    b = f(w.shift()),
                    l = w.join("=");
                if (u && u === b) {
                    h = r(l, o);
                    break
                }
                u || (l = r(l)) === undefined || (h[b] = l)
            }
            return h
        };
    t.defaults = {};
    n.removeCookie = function(t, i) {
        return n.cookie(t) === undefined ? !1 : (n.cookie(t, "", n.extend({}, i, {
            expires: -1
        })), !n.cookie(t))
    }
}),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["jquery"], n) : n(typeof jQuery != "undefined" ? jQuery : window.Zepto)
}(function(n) {
    "use strict";

    function u(t) {
        var i = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), n(t.target).ajaxSubmit(i))
    }

    function f(t) {
        var r = t.target,
            u = n(r),
            f, i, e;
        if (!u.is("[type=submit],[type=image]")) {
            if (f = u.closest("[type=submit]"), f.length === 0) return;
            r = f[0]
        }
        i = this;
        i.clk = r;
        r.type == "image" && (t.offsetX !== undefined ? (i.clk_x = t.offsetX, i.clk_y = t.offsetY) : typeof n.fn.offset == "function" ? (e = u.offset(), i.clk_x = t.pageX - e.left, i.clk_y = t.pageY - e.top) : (i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop));
        setTimeout(function() {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    }

    function t() {
        if (n.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var i = {},
        r;
    i.fileapi = n("<input type='file'/>").get(0).files !== undefined;
    i.formdata = window.FormData !== undefined;
    r = !!n.fn.prop;
    n.fn.attr2 = function() {
        if (!r) return this.attr.apply(this, arguments);
        var n = this.prop.apply(this, arguments);
        return n && n.jquery || typeof n == "string" ? n : this.attr.apply(this, arguments)
    };
    n.fn.ajaxSubmit = function(u) {
        function ot(t) {
            for (var r = n.param(t, u.traditional).split("&"), o = r.length, e = [], f, i = 0; i < o; i++) r[i] = r[i].replace(/\+/g, " "), f = r[i].split("="), e.push([decodeURIComponent(f[0]), decodeURIComponent(f[1])]);
            return e
        }

        function st(t) {
            for (var f, r, s, o = new FormData, i = 0; i < t.length; i++) o.append(t[i].name, t[i].value);
            if (u.extraData)
                for (f = ot(u.extraData), i = 0; i < f.length; i++) f[i] && o.append(f[i][0], f[i][1]);
            return u.data = null, r = n.extend(!0, {}, n.ajaxSettings, u, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: e || "POST"
            }), u.uploadProgress && (r.xhr = function() {
                var t = n.ajaxSettings.xhr();
                return t.upload && t.upload.addEventListener("progress", function(n) {
                    var t = 0,
                        i = n.loaded || n.position,
                        r = n.total;
                    n.lengthComputable && (t = Math.ceil(i / r * 100));
                    u.uploadProgress(n, i, r, t)
                }, !1), t
            }), r.data = null, s = r.beforeSend, r.beforeSend = function(n, t) {
                t.data = u.formData ? u.formData : o;
                s && s.call(this, n, t)
            }, n.ajax(r)
        }

        function ft(i) {
            function ot(n) {
                var i = null;
                try {
                    n.contentWindow && (i = n.contentWindow.document)
                } catch (r) {
                    t("cannot get iframe.contentWindow document: " + r)
                }
                if (i) return i;
                try {
                    i = n.contentDocument ? n.contentDocument : n.document
                } catch (r) {
                    t("cannot get iframe.contentDocument: " + r);
                    i = n.document
                }
                return i
            }

            function st() {
                function h() {
                    try {
                        var n = ot(a).readyState;
                        t("state = " + n);
                        n && n.toLowerCase() == "uninitialized" && setTimeout(h, 50)
                    } catch (i) {
                        t("Server abort: ", i, " (", i.name, ")");
                        b(tt);
                        g && clearTimeout(g);
                        g = undefined
                    }
                }
                var u = f.attr2("target"),
                    s = f.attr2("action"),
                    y = f.attr("enctype") || f.attr("encoding") || "multipart/form-data",
                    r, i, c;
                l.setAttribute("target", d);
                (!e || /post/i.test(e)) && l.setAttribute("method", "POST");
                s != o.url && l.setAttribute("action", o.url);
                o.skipEncodingOverride || e && !/post/i.test(e) || f.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                });
                o.timeout && (g = setTimeout(function() {
                    rt = !0;
                    b(ut)
                }, o.timeout));
                r = [];
                try {
                    if (o.extraData)
                        for (i in o.extraData) o.extraData.hasOwnProperty(i) && (n.isPlainObject(o.extraData[i]) && o.extraData[i].hasOwnProperty("name") && o.extraData[i].hasOwnProperty("value") ? r.push(n('<input type="hidden" name="' + o.extraData[i].name + '">').val(o.extraData[i].value).appendTo(l)[0]) : r.push(n('<input type="hidden" name="' + i + '">').val(o.extraData[i]).appendTo(l)[0]));
                    o.iframeTarget || v.appendTo("body");
                    a.attachEvent ? a.attachEvent("onload", b) : a.addEventListener("load", b, !1);
                    setTimeout(h, 15);
                    try {
                        l.submit()
                    } catch (p) {
                        c = document.createElement("form").submit;
                        c.apply(l)
                    }
                } finally {
                    l.setAttribute("action", s);
                    l.setAttribute("enctype", y);
                    u ? l.setAttribute("target", u) : f.removeAttr("target");
                    n(r).remove()
                }
            }

            function b(i) {
                var r, u, w, f, k, d, e, c, l;
                if (!s.aborted && !lt) {
                    if (h = ot(a), h || (t("cannot access response document"), i = tt), i === ut && s) {
                        s.abort("timeout");
                        y.reject(s, "timeout");
                        return
                    }
                    if (i == tt && s) {
                        s.abort("server abort");
                        y.reject(s, "error", "server abort");
                        return
                    }
                    if (h && h.location.href != o.iframeSrc || rt) {
                        a.detachEvent ? a.detachEvent("onload", b) : a.removeEventListener("load", b, !1);
                        r = "success";
                        try {
                            if (rt) throw "timeout";
                            if (w = o.dataType == "xml" || h.XMLDocument || n.isXMLDoc(h), t("isXml=" + w), !w && window.opera && (h.body === null || !h.body.innerHTML) && --ct) {
                                t("requeing onLoad callback, DOM not available");
                                setTimeout(b, 250);
                                return
                            }
                            f = h.body ? h.body : h.documentElement;
                            s.responseText = f ? f.innerHTML : null;
                            s.responseXML = h.XMLDocument ? h.XMLDocument : h;
                            w && (o.dataType = "xml");
                            s.getResponseHeader = function(n) {
                                var t = {
                                    "content-type": o.dataType
                                };
                                return t[n.toLowerCase()]
                            };
                            f && (s.status = Number(f.getAttribute("status")) || s.status, s.statusText = f.getAttribute("statusText") || s.statusText);
                            k = (o.dataType || "").toLowerCase();
                            d = /(json|script|text)/.test(k);
                            d || o.textarea ? (e = h.getElementsByTagName("textarea")[0], e ? (s.responseText = e.value, s.status = Number(e.getAttribute("status")) || s.status, s.statusText = e.getAttribute("statusText") || s.statusText) : d && (c = h.getElementsByTagName("pre")[0], l = h.getElementsByTagName("body")[0], c ? s.responseText = c.textContent ? c.textContent : c.innerText : l && (s.responseText = l.textContent ? l.textContent : l.innerText))) : k == "xml" && !s.responseXML && s.responseText && (s.responseXML = at(s.responseText));
                            try {
                                ht = yt(s, k, o)
                            } catch (nt) {
                                r = "parsererror";
                                s.error = u = nt || r
                            }
                        } catch (nt) {
                            t("error caught: ", nt);
                            r = "error";
                            s.error = u = nt || r
                        }
                        s.aborted && (t("upload aborted"), r = null);
                        s.status && (r = s.status >= 200 && s.status < 300 || s.status === 304 ? "success" : "error");
                        r === "success" ? (o.success && o.success.call(o.context, ht, "success", s), y.resolve(s.responseText, "success", s), p && n.event.trigger("ajaxSuccess", [s, o])) : r && (u === undefined && (u = s.statusText), o.error && o.error.call(o.context, s, r, u), y.reject(s, "error", u), p && n.event.trigger("ajaxError", [s, o, u]));
                        p && n.event.trigger("ajaxComplete", [s, o]);
                        p && !--n.active && n.event.trigger("ajaxStop");
                        o.complete && o.complete.call(o.context, s, r);
                        lt = !0;
                        o.timeout && clearTimeout(g);
                        setTimeout(function() {
                            o.iframeTarget ? v.attr("src", o.iframeSrc) : v.remove();
                            s.responseXML = null
                        }, 100)
                    }
                }
            }
            var l = f[0],
                it, nt, o, p, d, v, a, s, k, w, rt, g, y = n.Deferred(),
                ut, tt, ft, et, ht, h, ct, lt;
            if (y.abort = function(n) {
                    s.abort(n)
                }, i)
                for (nt = 0; nt < c.length; nt++) it = n(c[nt]), r ? it.prop("disabled", !1) : it.removeAttr("disabled");
            if (o = n.extend(!0, {}, n.ajaxSettings, u), o.context = o.context || o, d = "jqFormIO" + (new Date).getTime(), o.iframeTarget ? (v = n(o.iframeTarget), w = v.attr2("name"), w ? d = w : v.attr2("name", d)) : (v = n('<iframe name="' + d + '" src="' + o.iframeSrc + '" />'), v.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), a = v[0], s = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(i) {
                        var r = i === "timeout" ? "timeout" : "aborted";
                        t("aborting upload... " + r);
                        this.aborted = 1;
                        try {
                            a.contentWindow.document.execCommand && a.contentWindow.document.execCommand("Stop")
                        } catch (u) {}
                        v.attr("src", o.iframeSrc);
                        s.error = r;
                        o.error && o.error.call(o.context, s, r, i);
                        p && n.event.trigger("ajaxError", [s, o, r]);
                        o.complete && o.complete.call(o.context, s, r)
                    }
                }, p = o.global, p && 0 == n.active++ && n.event.trigger("ajaxStart"), p && n.event.trigger("ajaxSend", [s, o]), o.beforeSend && o.beforeSend.call(o.context, s, o) === !1) return o.global && n.active--, y.reject(), y;
            if (s.aborted) return y.reject(), y;
            k = l.clk;
            k && (w = k.name, w && !k.disabled && (o.extraData = o.extraData || {}, o.extraData[w] = k.value, k.type == "image" && (o.extraData[w + ".x"] = l.clk_x, o.extraData[w + ".y"] = l.clk_y)));
            ut = 1;
            tt = 2;
            ft = n("meta[name=csrf-token]").attr("content");
            et = n("meta[name=csrf-param]").attr("content");
            et && ft && (o.extraData = o.extraData || {}, o.extraData[et] = ft);
            o.forceSync ? st() : setTimeout(st, 10);
            ct = 50;
            var at = n.parseXML || function(n, t) {
                    return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(n)) : t = (new DOMParser).parseFromString(n, "text/xml"), t && t.documentElement && t.documentElement.nodeName != "parsererror" ? t : null
                },
                vt = n.parseJSON || function(s) {
                    return window.eval("(" + s + ")")
                },
                yt = function(t, i, r) {
                    var f = t.getResponseHeader("content-type") || "",
                        e = i === "xml" || !i && f.indexOf("xml") >= 0,
                        u = e ? t.responseXML : t.responseText;
                    return e && u.documentElement.nodeName === "parsererror" && n.error && n.error("parsererror"), r && r.dataFilter && (u = r.dataFilter(u, i)), typeof u == "string" && (i === "json" || !i && f.indexOf("json") >= 0 ? u = vt(u) : (i === "script" || !i && f.indexOf("javascript") >= 0) && n.globalEval(u)), u
                };
            return y
        }
        var e, b, o, f, a, v, c, y, s, l, h, d, g, nt, ut, p, w;
        if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"), this;
        if (f = this, typeof u == "function" ? u = {
                success: u
            } : u === undefined && (u = {}), e = u.type || this.attr2("method"), b = u.url || this.attr2("action"), o = typeof b == "string" ? n.trim(b) : "", o = o || window.location.href || "", o && (o = (o.match(/^([^#]+)/) || [])[1]), u = n.extend(!0, {
                url: o,
                success: n.ajaxSettings.success,
                type: e || n.ajaxSettings.type,
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, u), a = {}, this.trigger("form-pre-serialize", [this, u, a]), a.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (u.beforeSerialize && u.beforeSerialize(this, u) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        if (v = u.traditional, v === undefined && (v = n.ajaxSettings.traditional), c = [], s = this.formToArray(u.semantic, c), u.data && (u.extraData = u.data, y = n.param(u.data, v)), u.beforeSubmit && u.beforeSubmit(s, this, u) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [s, this, u, a]), a.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        l = n.param(s, v);
        y && (l = l ? l + "&" + y : y);
        u.type.toUpperCase() == "GET" ? (u.url += (u.url.indexOf("?") >= 0 ? "&" : "?") + l, u.data = null) : u.data = l;
        h = [];
        u.resetForm && h.push(function() {
            f.resetForm()
        });
        u.clearForm && h.push(function() {
            f.clearForm(u.includeHidden)
        });
        !u.dataType && u.target ? (d = u.success || function() {}, h.push(function(t) {
            var i = u.replaceTarget ? "replaceWith" : "html";
            n(u.target)[i](t).each(d, arguments)
        })) : u.success && h.push(u.success);
        u.success = function(n, t, i) {
            for (var e = u.context || this, r = 0, o = h.length; r < o; r++) h[r].apply(e, [n, t, i || f, f])
        };
        u.error && (g = u.error, u.error = function(n, t, i) {
            var r = u.context || this;
            g.apply(r, [n, t, i, f])
        });
        u.complete && (nt = u.complete, u.complete = function(n, t) {
            var i = u.context || this;
            nt.apply(i, [n, t, f])
        });
        var et = n("input[type=file]:enabled", this).filter(function() {
                return n(this).val() !== ""
            }),
            tt = et.length > 0,
            it = "multipart/form-data",
            rt = f.attr("enctype") == it || f.attr("encoding") == it,
            k = i.fileapi && i.formdata;
        for (t("fileAPI :" + k), ut = (tt || rt) && !k, u.iframe !== !1 && (u.iframe || ut) ? u.closeKeepAlive ? n.get(u.closeKeepAlive, function() {
                p = ft(s)
            }) : p = ft(s) : p = (tt || rt) && k ? st(s) : n.ajax(u), f.removeData("jqxhr").data("jqxhr", p), w = 0; w < c.length; w++) c[w] = null;
        return this.trigger("form-submit-notify", [this, u]), this
    };
    n.fn.ajaxForm = function(i) {
        if (i = i || {}, i.delegation = i.delegation && n.isFunction(n.fn.on), !i.delegation && this.length === 0) {
            var r = {
                s: this.selector,
                c: this.context
            };
            return !n.isReady && r.s ? (t("DOM not ready, queuing ajaxForm"), n(function() {
                n(r.s, r.c).ajaxForm(i)
            }), this) : (t("terminating; zero elements found by selector" + (n.isReady ? "" : " (DOM not ready)")), this)
        }
        if (i.delegation) {
            n(document).off("submit.form-plugin", this.selector, u).off("click.form-plugin", this.selector, f).on("submit.form-plugin", this.selector, i, u).on("click.form-plugin", this.selector, i, f);
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", i, u).bind("click.form-plugin", i, f)
    };
    n.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    n.fn.formToArray = function(t, r) {
        var e = [],
            l, h, f, c, u, b, k, a, p, v;
        if (this.length === 0) return e;
        var o = this[0],
            w = this.attr("id"),
            s = t ? o.getElementsByTagName("*") : o.elements,
            y;
        if (s && !/MSIE [678]/.test(navigator.userAgent) && (s = n(s).get()), w && (y = n(":input[form=" + w + "]").get(), y.length && (s = (s || []).concat(y))), !s || !s.length) return e;
        for (l = 0, b = s.length; l < b; l++)
            if (u = s[l], f = u.name, f && !u.disabled) {
                if (t && o.clk && u.type == "image") {
                    o.clk == u && (e.push({
                        name: f,
                        value: n(u).val(),
                        type: u.type
                    }), e.push({
                        name: f + ".x",
                        value: o.clk_x
                    }, {
                        name: f + ".y",
                        value: o.clk_y
                    }));
                    continue
                }
                if (c = n.fieldValue(u, !0), c && c.constructor == Array)
                    for (r && r.push(u), h = 0, k = c.length; h < k; h++) e.push({
                        name: f,
                        value: c[h]
                    });
                else if (i.fileapi && u.type == "file")
                    if (r && r.push(u), a = u.files, a.length)
                        for (h = 0; h < a.length; h++) e.push({
                            name: f,
                            value: a[h],
                            type: u.type
                        });
                    else e.push({
                        name: f,
                        value: "",
                        type: u.type
                    });
                else c !== null && typeof c != "undefined" && (r && r.push(u), e.push({
                    name: f,
                    value: c,
                    type: u.type,
                    required: u.required
                }))
            }
        return !t && o.clk && (p = n(o.clk), v = p[0], f = v.name, f && !v.disabled && v.type == "image" && (e.push({
            name: f,
            value: p.val()
        }), e.push({
            name: f + ".x",
            value: o.clk_x
        }, {
            name: f + ".y",
            value: o.clk_y
        }))), e
    };
    n.fn.formSerialize = function(t) {
        return n.param(this.formToArray(t))
    };
    n.fn.fieldSerialize = function(t) {
        var i = [];
        return this.each(function() {
            var f = this.name,
                r, u, e;
            if (f)
                if (r = n.fieldValue(this, t), r && r.constructor == Array)
                    for (u = 0, e = r.length; u < e; u++) i.push({
                        name: f,
                        value: r[u]
                    });
                else r !== null && typeof r != "undefined" && i.push({
                    name: this.name,
                    value: r
                })
        }), n.param(i)
    };
    n.fn.fieldValue = function(t) {
        for (var f, i, r = [], u = 0, e = this.length; u < e; u++)(f = this[u], i = n.fieldValue(f, t), i !== null && typeof i != "undefined" && (i.constructor != Array || i.length)) && (i.constructor == Array ? n.merge(r, i) : r.push(i));
        return r
    };
    n.fieldValue = function(t, i) {
        var a = t.name,
            u = t.type,
            h = t.tagName.toLowerCase(),
            e, o, r, f;
        if (i === undefined && (i = !0), i && (!a || t.disabled || u == "reset" || u == "button" || (u == "checkbox" || u == "radio") && !t.checked || (u == "submit" || u == "image") && t.form && t.form.clk != t || h == "select" && t.selectedIndex == -1)) return null;
        if (h == "select") {
            if (e = t.selectedIndex, e < 0) return null;
            var c = [],
                l = t.options,
                s = u == "select-one",
                v = s ? e + 1 : l.length;
            for (o = s ? e : 0; o < v; o++)
                if (r = l[o], r.selected) {
                    if (f = r.value, f || (f = r.attributes && r.attributes.value && !r.attributes.value.specified ? r.text : r.value), s) return f;
                    c.push(f)
                }
            return c
        }
        return n(t).val()
    };
    n.fn.clearForm = function(t) {
        return this.each(function() {
            n("input,select,textarea", this).clearFields(t)
        })
    };
    n.fn.clearFields = n.fn.clearInputs = function(t) {
        var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var r = this.type,
                u = this.tagName.toLowerCase();
            i.test(r) || u == "textarea" ? this.value = "" : r == "checkbox" || r == "radio" ? this.checked = !1 : u == "select" ? this.selectedIndex = -1 : r == "file" ? /MSIE/.test(navigator.userAgent) ? n(this).replaceWith(n(this).clone(!0)) : n(this).val("") : t && (t === !0 && /hidden/.test(r) || typeof t == "string" && n(this).is(t)) && (this.value = "")
        })
    };
    n.fn.resetForm = function() {
        return this.each(function() {
            typeof this.reset != "function" && (typeof this.reset != "object" || this.reset.nodeType) || this.reset()
        })
    };
    n.fn.enable = function(n) {
        return n === undefined && (n = !0), this.each(function() {
            this.disabled = !n
        })
    };
    n.fn.selected = function(t) {
        return t === undefined && (t = !0), this.each(function() {
            var r = this.type,
                i;
            r == "checkbox" || r == "radio" ? this.checked = t : this.tagName.toLowerCase() == "option" && (i = n(this).parent("select"), t && i[0] && i[0].type == "select-one" && i.find("option").selected(!1), this.selected = t)
        })
    };
    n.fn.ajaxSubmit.debug = !1
}),
function() {
    "use strict";
    var n, i, r, t = function(n, t) {
        return function() {
            return n.apply(t, arguments)
        }
    };
    n = jQuery;
    i = function() {
        function n() {}
        return n.transitions = {
            webkitTransition: "webkitTransitionEnd",
            mozTransition: "mozTransitionEnd",
            oTransition: "oTransitionEnd",
            transition: "transitionend"
        }, n.transition = function(n) {
            var r, u, t, i;
            r = n[0];
            i = this.transitions;
            for (t in i)
                if (u = i[t], r.style[t] != null) return u
        }, n
    }();
    r = function() {
        function r(i) {
            i == null && (i = {});
            this.html = t(this.html, this);
            this.$growl = t(this.$growl, this);
            this.$growls = t(this.$growls, this);
            this.animate = t(this.animate, this);
            this.remove = t(this.remove, this);
            this.dismiss = t(this.dismiss, this);
            this.present = t(this.present, this);
            this.cycle = t(this.cycle, this);
            this.close = t(this.close, this);
            this.unbind = t(this.unbind, this);
            this.bind = t(this.bind, this);
            this.render = t(this.render, this);
            this.settings = n.extend({}, r.settings, i);
            this.$growls().attr("class", this.settings.location);
            this.render()
        }
        return r.settings = {
            namespace: "growl",
            duration: 3200,
            close: "&#215;",
            location: "default",
            style: "default",
            size: "medium"
        }, r.growl = function(n) {
            return n == null && (n = {}), this.initialize(), new r(n)
        }, r.initialize = function() {
            return n("body:not(:has(#growls))").append('<div id="growls" />')
        }, r.prototype.render = function() {
            var n;
            n = this.$growl();
            this.$growls().append(n);
            this.settings["static"] != null ? this.present() : this.cycle()
        }, r.prototype.bind = function(n) {
            n == null && (n = this.$growl());
            return n.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close)
        }, r.prototype.unbind = function(n) {
            return n == null && (n = this.$growl()), n.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close)
        }, r.prototype.close = function(n) {
            var t;
            return n.preventDefault(), n.stopPropagation(), t = this.$growl(), t.stop().queue(this.dismiss).queue(this.remove)
        }, r.prototype.cycle = function() {
            var n;
            return n = this.$growl(), n.queue(this.present).delay(this.settings.duration).queue(this.dismiss).queue(this.remove)
        }, r.prototype.present = function(n) {
            var t;
            return t = this.$growl(), this.bind(t), this.animate(t, "" + this.settings.namespace + "-incoming", "out", n)
        }, r.prototype.dismiss = function(n) {
            var t;
            return t = this.$growl(), this.unbind(t), this.animate(t, "" + this.settings.namespace + "-outgoing", "in", n)
        }, r.prototype.remove = function(n) {
            return this.$growl().remove(), n()
        }, r.prototype.animate = function(n, t, r, u) {
            var f;
            if (r == null && (r = "in"), f = i.transition(n), n[r === "in" ? "removeClass" : "addClass"](t), n.offset().position, n[r === "in" ? "addClass" : "removeClass"](t), u != null)
                if (f != null) n.one(f, u);
                else u()
        }, r.prototype.$growls = function() {
            return this.$_growls != null ? this.$_growls : this.$_growls = n("#growls")
        }, r.prototype.$growl = function() {
            return this.$_growl != null ? this.$_growl : this.$_growl = n(this.html())
        }, r.prototype.html = function() {
            return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  <div class='" + this.settings.namespace + "-close'>" + this.settings.close + "<\/div>\n  <div class='" + this.settings.namespace + "-title'>" + this.settings.title + "<\/div>\n  <div class='" + this.settings.namespace + "-message'>" + this.settings.message + "<\/div>\n<\/div>"
        }, r
    }();
    n.growl = function(n) {
        return n == null && (n = {}), r.growl(n)
    };
    n.growl.error = function(t) {
        var i;
        return t == null && (t = {}), i = {
            title: "Error!",
            style: "error"
        }, n.growl(n.extend(i, t))
    };
    n.growl.notice = function(t) {
        var i;
        return t == null && (t = {}), i = {
            title: "Notice!",
            style: "notice"
        }, n.growl(n.extend(i, t))
    };
    n.growl.warning = function(t) {
        var i;
        return t == null && (t = {}), i = {
            title: "Warning!",
            style: "warning"
        }, n.growl(n.extend(i, t))
    }
}.call(this),
    function() {
        function d(n, t, i) {
            for (var r = (i || 0) - 1, u = n ? n.length : 0; ++r < u;)
                if (n[r] === t) return r;
            return -1
        }

        function ft(n, t) {
            var i = typeof t,
                r;
            return (n = n.cache, i == "boolean" || t == null) ? n[t] ? 0 : -1 : (i != "number" && i != "string" && (i = "object"), r = i == "number" ? t : ht + t, n = (n = n[i]) && n[r], i == "object" ? n && d(n, t) > -1 ? 0 : -1 : n ? 0 : -1)
        }

        function pi(n) {
            var u = this.cache,
                t = typeof n,
                i, r;
            t == "boolean" || n == null ? u[n] = !0 : (t != "number" && t != "string" && (t = "object"), i = t == "number" ? n : ht + n, r = u[t] || (u[t] = {}), t == "object" ? (r[i] || (r[i] = [])).push(n) : r[i] = !0)
        }

        function ni(n) {
            return n.charCodeAt(0)
        }

        function wi(n, t) {
            for (var f = n.criteria, e = t.criteria, u = -1, o = f.length, i, r; ++u < o;)
                if (i = f[u], r = e[u], i !== r) {
                    if (i > r || typeof i == "undefined") return 1;
                    if (i < r || typeof r == "undefined") return -1
                }
            return n.index - t.index
        }

        function at(n) {
            var u = -1,
                r = n.length,
                f = n[0],
                e = n[r / 2 | 0],
                o = n[r - 1],
                t, i;
            if (f && typeof f == "object" && e && typeof e == "object" && o && typeof o == "object") return !1;
            for (t = vt(), t["false"] = t["null"] = t["true"] = t.undefined = !1, i = vt(), i.array = n, i.cache = t, i.push = pi; ++u < r;) i.push(n[u]);
            return i
        }

        function bi(n) {
            return "\\" + vi[n]
        }

        function f() {
            return ot.pop() || []
        }

        function vt() {
            return st.pop() || {
                array: null,
                cache: null,
                criteria: null,
                "false": !1,
                index: 0,
                "null": !1,
                number: null,
                object: null,
                push: null,
                string: null,
                "true": !1,
                undefined: !1,
                value: null
            }
        }

        function et(n) {
            return typeof n.toString != "function" && typeof(n + "") == "string"
        }

        function i(n) {
            n.length = 0;
            ot.length < pt && ot.push(n)
        }

        function g(n) {
            var t = n.cache;
            t && g(t);
            n.array = n.cache = n.criteria = n.object = n.number = n.string = n.value = null;
            st.length < pt && st.push(n)
        }

        function n(n, t, i) {
            t || (t = 0);
            typeof i == "undefined" && (i = n ? n.length : 0);
            for (var r = -1, u = i - t || 0, f = Array(u < 0 ? 0 : u); ++r < u;) f[r] = n[t + r];
            return f
        }

        function yt(b) {
            function rt(n) {
                return n && typeof n == "object" && !ot(n) && vi.call(n, "__wrapped__") ? n : new ar(n)
            }

            function ar(n, t) {
                this.__chain__ = !!t;
                this.__wrapped__ = n
            }

            function us(t) {
                function r() {
                    var t, e, o;
                    return (u && (t = n(u), iu.apply(t, arguments)), this instanceof r) ? (e = fu(i.prototype), o = i.apply(e, t || arguments), ki(o) ? o : e) : i.apply(f, t || arguments)
                }
                var i = t[0],
                    u = t[2],
                    f = t[4];
                return pu(r, t), r
            }

            function sf(t, r, e, o, s) {
                var c, d, b, l, w, g, k;
                if (e && (c = e(t), typeof c != "undefined")) return c;
                if (d = ki(t), d) {
                    if (b = pt.call(t), !u[b] || !ut.nodeClass && et(t)) return t;
                    l = cr[b];
                    switch (b) {
                        case a:
                        case v:
                            return new l(+t);
                        case y:
                        case h:
                            return new l(t);
                        case p:
                            return c = l(t.source, oi.exec(t)), c.lastIndex = t.lastIndex, c
                    }
                } else return t;
                if (w = ot(t), r) {
                    for (g = !o, o || (o = f()), s || (s = f()), k = o.length; k--;)
                        if (o[k] == t) return s[k];
                    c = w ? l(t.length) : {}
                } else c = w ? n(t) : bu({}, t);
                return (w && (vi.call(t, "index") && (c.index = t.index), vi.call(t, "input") && (c.input = t.input)), !r) ? c : (o.push(t), s.push(c), (w ? yi : er)(t, function(n, t) {
                    c[t] = sf(n, r, e, o, s)
                }), g && (i(o), i(s)), c)
            }

            function fu(n) {
                return ki(n) ? au(n) : {}
            }

            function ur(n, t, i) {
                var r, u;
                if (typeof n != "function") return kf;
                if (typeof t == "undefined" || !("prototype" in n) || (r = n.__bindData__, typeof r == "undefined" && (ut.funcNames && (r = !n.name), r = r || !ut.funcDecomp, r || (u = ns.call(n), ut.funcNames || (r = !si.test(u)), r || (r = kt.test(u), pu(n, r)))), r === !1 || r !== !0 && r[1] & 1)) return n;
                switch (i) {
                    case 1:
                        return function(i) {
                            return n.call(t, i)
                        };
                    case 2:
                        return function(i, r) {
                            return n.call(t, i, r)
                        };
                    case 3:
                        return function(i, r, u) {
                            return n.call(t, i, r, u)
                        };
                    case 4:
                        return function(i, r, u, f) {
                            return n.call(t, i, r, u, f)
                        }
                }
                return eo(n, t)
            }

            function re(t) {
                function f() {
                    var y = c ? o : this,
                        t, p;
                    return (e && (t = n(e), iu.apply(t, arguments)), (u || h) && (t || (t = n(arguments)), u && iu.apply(t, u), h && t.length < s)) ? (i |= 16, re([r, a ? i : i & -4, t, null, o, s])) : (t || (t = arguments), l && (r = y[v]), this instanceof f) ? (y = fu(r.prototype), p = r.apply(y, t), ki(p) ? p : y) : r.apply(y, t)
                }
                var r = t[0],
                    i = t[1],
                    e = t[2],
                    u = t[3],
                    o = t[4],
                    s = t[5],
                    c = i & 1,
                    l = i & 2,
                    h = i & 4,
                    a = i & 8,
                    v = r;
                return pu(f, t), f
            }

            function eu(n, t) {
                var e = -1,
                    i = yu(),
                    o = n ? n.length : 0,
                    r = o >= ct && i === d,
                    s = [],
                    u, f;
                for (r && (u = at(t), u ? (i = ft, t = u) : r = !1); ++e < o;) f = n[e], i(t, f) < 0 && s.push(f);
                return r && g(t), s
            }

            function vr(n, t, i, r) {
                for (var e = (r || 0) - 1, h = n ? n.length : 0, f = [], u; ++e < h;)
                    if (u = n[e], u && typeof u == "object" && typeof u.length == "number" && (ot(u) || nr(u))) {
                        t || (u = vr(u, t, i));
                        var o = -1,
                            s = u.length,
                            c = f.length;
                        for (f.length += s; ++o < s;) f[c++] = u[o]
                    } else i || f.push(u);
                return f
            }

            function kr(n, t, u, o, s, w) {
                var b, lt, at, d, it, rt, ft, ot, nt, tt, vt, g, k, ht, ct;
                if (u && (b = u(n, t), typeof b != "undefined")) return !!b;
                if (n === t) return n !== 0 || 1 / n == 1 / t;
                if (lt = typeof n, at = typeof t, n === n && !(n && e[lt]) && !(t && e[at])) return !1;
                if (n == null || t == null) return n === t;
                if (d = pt.call(n), it = pt.call(t), d == c && (d = r), it == c && (it = r), d != it) return !1;
                switch (d) {
                    case a:
                    case v:
                        return +n == +t;
                    case y:
                        return n != +n ? t != +t : n == 0 ? 1 / n == 1 / t : n == +t;
                    case p:
                    case h:
                        return n == sr(t)
                }
                if (rt = d == l, !rt) {
                    if (ft = vi.call(n, "__wrapped__"), ot = vi.call(t, "__wrapped__"), ft || ot) return kr(ft ? n.__wrapped__ : n, ot ? t.__wrapped__ : t, u, o, s, w);
                    if (d != r || !ut.nodeClass && (et(n) || et(t)) || (nt = !ut.argsObject && nr(n) ? rr : n.constructor, tt = !ut.argsObject && nr(t) ? rr : t.constructor, nt != tt && !(st(nt) && nt instanceof nt && st(tt) && tt instanceof tt) && "constructor" in n && "constructor" in t)) return !1
                }
                for (vt = !s, s || (s = f()), w || (w = f()), g = s.length; g--;)
                    if (s[g] == n) return w[g] == t;
                if (k = 0, b = !0, s.push(n), w.push(t), rt) {
                    if (g = n.length, k = t.length, b = k == g, b || o)
                        while (k--)
                            if (ht = g, ct = t[k], o) {
                                while (ht--)
                                    if (b = kr(n[ht], ct, u, o, s, w)) break
                            } else if (!(b = kr(n[k], ct, u, o, s, w))) break
                } else ir(t, function(t, i, r) {
                    if (vi.call(r, i)) return k++, b = vi.call(n, i) && kr(n[i], t, u, o, s, w)
                }), b && !o && ir(n, function(n, t, i) {
                    if (vi.call(i, t)) return b = --k > -1
                });
                return s.pop(), w.pop(), vt && (i(s), i(w)), b
            }

            function ue(n, t, i, r, u) {
                (ot(t) ? wr : er)(t, function(t, f) {
                    var c, l, o = t,
                        e = n[f],
                        s, h;
                    if (t && ((l = ot(t)) || du(t))) {
                        for (s = r.length; s--;)
                            if (c = r[s] == t) {
                                e = u[s];
                                break
                            }
                        c || (i && (o = i(e, t), (h = typeof o != "undefined") && (e = o)), h || (e = l ? ot(e) ? e : [] : du(e) ? e : {}), r.push(t), u.push(e), h || ue(e, t, i, r, u))
                    } else i && (o = i(e, t), typeof o == "undefined" && (o = t)), typeof o != "undefined" && (e = o);
                    n[f] = e
                })
            }

            function hf(n, t) {
                return n + go(te() * (t - n + 1))
            }

            function cf(n, t, r) {
                var e = -1,
                    c = yu(),
                    a = n ? n.length : 0,
                    l = [],
                    o = !t && a >= ct && c === d,
                    u = r || o ? f() : l,
                    v, s, h;
                for (o && (v = at(u), c = ft, u = v); ++e < a;) s = n[e], h = r ? r(s, e, n) : s, (t ? !e || u[u.length - 1] !== h : c(u, h) < 0) && ((r || o) && u.push(h), l.push(s));
                return o ? (i(u.array), g(u)) : r && i(u), l
            }

            function lf(n) {
                return function(t, i, r) {
                    var f = {},
                        u, o, e;
                    if (i = rt.createCallback(i, r, 3), ot(t))
                        for (u = -1, o = t.length; ++u < o;) e = t[u], n(f, e, i(e, u, t), t);
                    else yi(t, function(t, r, u) {
                        n(f, t, i(t, r, u), u)
                    });
                    return f
                }
            }

            function fr(t, i, r, u, f, e) {
                var c = i & 1,
                    a = i & 2,
                    v = i & 4,
                    y = i & 8,
                    s = i & 16,
                    h = i & 32,
                    o, l;
                if (!a && !st(t)) throw new hr;
                return (s && !r.length && (i &= -17, s = r = !1), h && !u.length && (i &= -33, h = u = !1), o = t && t.__bindData__, o && o !== !0) ? (o = n(o), o[2] && (o[2] = n(o[2])), o[3] && (o[3] = n(o[3])), !c || o[1] & 1 || (o[4] = f), !c && o[1] & 1 && (i |= 8), !v || o[1] & 4 || (o[5] = e), s && iu.apply(o[2] || (o[2] = []), r), h && ts.apply(o[3] || (o[3] = []), u), o[1] |= i, fr.apply(null, o)) : (l = i == 1 || i === 17 ? us : re, l([t, i, r, u, f, e]))
            }

            function dr() {
                var n, i, r, u, f;
                for (t.shadowedProps = lt, t.array = t.bottom = t.loop = t.top = "", t.init = "iterable", t.useHas = !0, i = 0; n = arguments[i]; i++)
                    for (r in n) t[r] = n[r];
                return u = t.args, t.firstArg = /^[^,]+/.exec(u)[0], f = gr("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + u + ") {\n" + ie(t) + "\n}"), f(ur, dt, ff, vi, ii, nr, ot, or, t.keys, hu, e, pi, h, po, pt)
            }

            function fs(n) {
                return vf[n]
            }

            function yu() {
                var n = (n = rt.indexOf) === to ? d : n;
                return n
            }

            function yr(n) {
                return typeof n == "function" && bo.test(n)
            }

            function fe(n) {
                var i, t;
                return !(n && pt.call(n) == r) || (i = n.constructor, st(i) && !(i instanceof i)) || !ut.argsClass && nr(n) || !ut.nodeClass && et(n) ? !1 : ut.ownLast ? (ir(n, function(n, i, r) {
                    return t = vi.call(r, i), !1
                }), t !== !1) : (ir(n, function(n, i) {
                    t = i
                }), typeof t == "undefined" || vi.call(n, t))
            }

            function es(n) {
                return se[n]
            }

            function nr(n) {
                return n && typeof n == "object" && typeof n.length == "number" && pt.call(n) == c || !1
            }

            function hs(n, t, i, r) {
                return typeof t != "boolean" && t != null && (r = i, i = t, t = !1), sf(n, t, typeof i == "function" && ur(i, r, 1))
            }

            function cs(n, t, i) {
                return sf(n, !0, typeof t == "function" && ur(t, i, 1))
            }

            function ls(n, t) {
                var i = fu(n);
                return t ? bu(i, t) : i
            }

            function as(n, t, i) {
                var r;
                return t = rt.createCallback(t, i, 3), er(n, function(n, i, u) {
                    if (t(n, i, u)) return r = i, !1
                }), r
            }

            function vs(n, t, i) {
                var r;
                return t = rt.createCallback(t, i, 3), he(n, function(n, i, u) {
                    if (t(n, i, u)) return r = i, !1
                }), r
            }

            function ys(n, t, i) {
                var r = [],
                    u;
                for (ir(n, function(n, t) {
                        r.push(t, n)
                    }), u = r.length, t = ur(t, i, 3); u--;)
                    if (t(r[u--], r[u], n) === !1) break;
                return n
            }

            function he(n, t, i) {
                var u = gi(n),
                    f = u.length,
                    r;
                for (t = ur(t, i, 3); f--;)
                    if (r = u[f], t(n[r], r, n) === !1) break;
                return n
            }

            function ou(n) {
                var t = [];
                return ir(n, function(n, i) {
                    st(n) && t.push(i)
                }), t.sort()
            }

            function ps(n, t) {
                return n ? vi.call(n, t) : !1
            }

            function ce(n) {
                for (var i = -1, r = gi(n), f = r.length, u = {}, t; ++i < f;) t = r[i], u[n[t]] = t;
                return u
            }

            function ws(n) {
                return n === !0 || n === !1 || n && typeof n == "object" && pt.call(n) == a || !1
            }

            function bs(n) {
                return n && typeof n == "object" && pt.call(n) == v || !1
            }

            function ks(n) {
                return n && n.nodeType === 1 || !1
            }

            function ds(n) {
                var i = !0,
                    t, u;
                return n ? (t = pt.call(n), u = n.length, t == l || t == h || (ut.argsClass ? t == c : nr(n)) || t == r && typeof u == "number" && st(n.splice)) ? !u : (er(n, function() {
                    return i = !1
                }), i) : i
            }

            function gs(n, t, i, r) {
                return kr(n, t, typeof i == "function" && ur(i, r, 2))
            }

            function nh(n) {
                return is(n) && !rs(parseFloat(n))
            }

            function st(n) {
                return typeof n == "function"
            }

            function ki(n) {
                return !!(n && e[typeof n])
            }

            function th(n) {
                return le(n) && n != +n
            }

            function ih(n) {
                return n === null
            }

            function le(n) {
                return typeof n == "number" || n && typeof n == "object" && pt.call(n) == y || !1
            }

            function rh(n) {
                return n && e[typeof n] && pt.call(n) == p || !1
            }

            function or(n) {
                return typeof n == "string" || n && typeof n == "object" && pt.call(n) == h || !1
            }

            function uh(n) {
                return typeof n == "undefined"
            }

            function fh(n, t, i) {
                var r = {};
                return t = rt.createCallback(t, i, 3), er(n, function(n, i, u) {
                    r[i] = t(n, i, u)
                }), r
            }

            function eh(t) {
                var u = arguments,
                    r = 2,
                    e;
                if (!ki(t)) return t;
                typeof u[2] != "number" && (r = u.length);
                r > 3 && typeof u[r - 2] == "function" ? e = ur(u[--r - 1], u[r--], 2) : r > 2 && typeof u[r - 1] == "function" && (e = u[--r]);
                for (var c = n(arguments, 1, r), o = -1, s = f(), h = f(); ++o < r;) ue(t, c[o], e, s, h);
                return i(s), i(h), t
            }

            function oh(n, t, i) {
                var u = {},
                    r, f, o, e;
                if (typeof t != "function")
                    for (r = [], ir(n, function(n, t) {
                            r.push(t)
                        }), r = eu(r, vr(arguments, !0, !1, 1)), f = -1, o = r.length; ++f < o;) e = r[f], u[e] = n[e];
                else t = rt.createCallback(t, i, 3), ir(n, function(n, i, r) {
                    t(n, i, r) || (u[i] = n)
                });
                return u
            }

            function sh(n) {
                for (var t = -1, r = gi(n), u = r.length, f = di(u), i; ++t < u;) i = r[t], f[t] = [i, n[i]];
                return f
            }

            function hh(n, t, i) {
                var u = {},
                    r;
                if (typeof t != "function")
                    for (var f = -1, e = vr(arguments, !0, !1, 1), o = ki(n) ? e.length : 0; ++f < o;) r = e[f], r in n && (u[r] = n[r]);
                else t = rt.createCallback(t, i, 3), ir(n, function(n, i, r) {
                    t(n, i, r) && (u[i] = n)
                });
                return u
            }

            function ch(n, t, i, r) {
                var f = ot(n),
                    u, e;
                return i == null && (f ? i = [] : (u = n && n.constructor, e = u && u.prototype, i = fu(e))), t && (t = rt.createCallback(t, r, 4), (f ? yi : er)(n, function(n, r, u) {
                    return t(i, n, r, u)
                })), i
            }

            function gu(n) {
                for (var t = -1, i = gi(n), r = i.length, u = di(r); ++t < r;) u[t] = n[i[t]];
                return u
            }

            function lh(n) {
                var t = arguments,
                    i = -1,
                    r = vr(t, !0, !1, 1),
                    u = t[2] && t[2][t[1]] === n ? 1 : r.length,
                    f = di(u);
                for (ut.unindexedChars && or(n) && (n = n.split("")); ++i < u;) f[i] = n[r[i]];
                return f
            }

            function ae(n, t, i) {
                var e = -1,
                    u = yu(),
                    f = n ? n.length : 0,
                    r = !1;
                return i = (i < 0 ? tr(0, f + i) : i) || 0, ot(n) ? r = u(n, t, i) > -1 : typeof f == "number" ? r = (or(n) ? n.indexOf(t, i) : u(n, t, i)) > -1 : yi(n, function(n) {
                    if (++e >= i) return !(r = n === t)
                }), r
            }

            function ye(n, t, i) {
                var u = !0,
                    r, f;
                if (t = rt.createCallback(t, i, 3), ot(n)) {
                    for (r = -1, f = n.length; ++r < f;)
                        if (!(u = !!t(n[r], r, n))) break
                } else yi(n, function(n, i, r) {
                    return u = !!t(n, i, r)
                });
                return u
            }

            function nf(n, t, i) {
                var u = [],
                    r, e, f;
                if (t = rt.createCallback(t, i, 3), ot(n))
                    for (r = -1, e = n.length; ++r < e;) f = n[r], t(f, r, n) && u.push(f);
                else yi(n, function(n, i, r) {
                    t(n, i, r) && u.push(n)
                });
                return u
            }

            function yf(n, t, i) {
                var r, f, u, e;
                if (t = rt.createCallback(t, i, 3), ot(n)) {
                    for (r = -1, f = n.length; ++r < f;)
                        if (u = n[r], t(u, r, n)) return u
                } else return yi(n, function(n, i, r) {
                    if (t(n, i, r)) return e = n, !1
                }), e
            }

            function ah(n, t, i) {
                var r;
                return t = rt.createCallback(t, i, 3), tf(n, function(n, i, u) {
                    if (t(n, i, u)) return r = n, !1
                }), r
            }

            function wr(n, t, i) {
                if (t && typeof i == "undefined" && ot(n)) {
                    for (var r = -1, u = n.length; ++r < u;)
                        if (t(n[r], r, n) === !1) break
                } else yi(n, t, i);
                return n
            }

            function tf(n, t, i) {
                var f = n,
                    r = n ? n.length : 0,
                    u;
                if (t = t && typeof i == "undefined" ? t : ur(t, i, 3), ot(n)) {
                    while (r--)
                        if (t(n[r], r, n) === !1) break
                } else typeof r != "number" ? (u = gi(n), r = u.length) : ut.unindexedChars && or(n) && (f = n.split("")), yi(n, function(n, i, e) {
                    return i = u ? u[--r] : --r, t(f[i], i, e)
                });
                return n
            }

            function vh(t, i) {
                var f = n(arguments, 2),
                    e = -1,
                    o = typeof i == "function",
                    r = t ? t.length : 0,
                    u = di(typeof r == "number" ? r : 0);
                return wr(t, function(n) {
                    u[++e] = (o ? i : n[i]).apply(n, f)
                }), u
            }

            function su(n, t, i) {
                var r = -1,
                    u = n ? n.length : 0,
                    f = di(typeof u == "number" ? u : 0);
                if (t = rt.createCallback(t, i, 3), ot(n))
                    while (++r < u) f[r] = t(n[r], r, n);
                else yi(n, function(n, i, u) {
                    f[++r] = t(n, i, u)
                });
                return f
            }

            function be(n, t, i) {
                var u = -Infinity,
                    r = u,
                    f, o, e;
                if (typeof t != "function" && i && i[t] === n && (t = null), t == null && ot(n))
                    for (f = -1, o = n.length; ++f < o;) e = n[f], e > r && (r = e);
                else t = t == null && or(n) ? ni : rt.createCallback(t, i, 3), yi(n, function(n, i, f) {
                    var e = t(n, i, f);
                    e > u && (u = e, r = n)
                });
                return r
            }

            function yh(n, t, i) {
                var u = Infinity,
                    r = u,
                    f, o, e;
                if (typeof t != "function" && i && i[t] === n && (t = null), t == null && ot(n))
                    for (f = -1, o = n.length; ++f < o;) e = n[f], e < r && (r = e);
                else t = t == null && or(n) ? ni : rt.createCallback(t, i, 3), yi(n, function(n, i, f) {
                    var e = t(n, i, f);
                    e < u && (u = e, r = n)
                });
                return r
            }

            function pf(n, t, i, r) {
                var f = arguments.length < 3,
                    u, e;
                if (t = rt.createCallback(t, r, 4), ot(n))
                    for (u = -1, e = n.length, f && (i = n[++u]); ++u < e;) i = t(i, n[u], u, n);
                else yi(n, function(n, r, u) {
                    i = f ? (f = !1, n) : t(i, n, r, u)
                });
                return i
            }

            function ke(n, t, i, r) {
                var u = arguments.length < 3;
                return t = rt.createCallback(t, r, 4), tf(n, function(n, r, f) {
                    i = u ? (u = !1, n) : t(i, n, r, f)
                }), i
            }

            function ph(n, t, i) {
                return t = rt.createCallback(t, i, 3), nf(n, function(n, i, r) {
                    return !t(n, i, r)
                })
            }

            function wh(n, t, i) {
                if (n && typeof n.length != "number" ? n = gu(n) : ut.unindexedChars && or(n) && (n = n.split("")), t == null || i) return n ? n[hf(0, n.length - 1)] : s;
                var r = de(n);
                return r.length = uu(tr(0, t), r.length), r
            }

            function de(n) {
                var i = -1,
                    r = n ? n.length : 0,
                    t = di(typeof r == "number" ? r : 0);
                return wr(n, function(n) {
                    var r = hf(0, ++i);
                    t[i] = t[r];
                    t[r] = n
                }), t
            }

            function bh(n) {
                var t = n ? n.length : 0;
                return typeof t == "number" ? t : gi(n).length
            }

            function ge(n, t, i) {
                var u, r, f;
                if (t = rt.createCallback(t, i, 3), ot(n)) {
                    for (r = -1, f = n.length; ++r < f;)
                        if (u = t(n[r], r, n)) break
                } else yi(n, function(n, i, r) {
                    return !(u = t(n, i, r))
                });
                return !!u
            }

            function kh(n, t, r) {
                var h = -1,
                    s = ot(t),
                    u = n ? n.length : 0,
                    e = di(typeof u == "number" ? u : 0),
                    o;
                for (s || (t = rt.createCallback(t, r, 3)), wr(n, function(n, i, r) {
                        var u = e[++h] = vt();
                        s ? u.criteria = su(t, function(t) {
                            return n[t]
                        }) : (u.criteria = f())[0] = t(n, i, r);
                        u.index = h;
                        u.value = n
                    }), u = e.length, e.sort(wi); u--;) o = e[u], e[u] = o.value, s || i(o.criteria), g(o);
                return e
            }

            function dh(t) {
                return t && typeof t.length == "number" ? ut.unindexedChars && or(t) ? t.split("") : n(t) : gu(t)
            }

            function gh(n) {
                for (var i = -1, u = n ? n.length : 0, r = [], t; ++i < u;) t = n[i], t && r.push(t);
                return r
            }

            function nc(n) {
                return eu(n, vr(arguments, !0, !0, 1))
            }

            function tc(n, t, i) {
                var r = -1,
                    u = n ? n.length : 0;
                for (t = rt.createCallback(t, i, 3); ++r < u;)
                    if (t(n[r], r, n)) return r;
                return -1
            }

            function ic(n, t, i) {
                var r = n ? n.length : 0;
                for (t = rt.createCallback(t, i, 3); r--;)
                    if (t(n[r], r, n)) return r;
                return -1
            }

            function wf(t, i, r) {
                var u = 0,
                    e = t ? t.length : 0,
                    f;
                if (typeof i != "number" && i != null)
                    for (f = -1, i = rt.createCallback(i, r, 3); ++f < e && i(t[f], f, t);) u++;
                else if (u = i, u == null || r) return t ? t[0] : s;
                return n(t, 0, uu(tr(0, u), e))
            }

            function rc(n, t, i, r) {
                return typeof t != "boolean" && t != null && (r = i, i = typeof t != "function" && r && r[t] === n ? null : t, t = !1), i != null && (n = su(n, i, r)), vr(n, t)
            }

            function to(n, t, i) {
                var u, r;
                if (typeof i == "number") u = n ? n.length : 0, i = i < 0 ? tr(0, u + i) : i || 0;
                else if (i) return r = io(n, t), n[r] === t ? r : -1;
                return d(n, t, i)
            }

            function uc(t, i, r) {
                var u = 0,
                    e = t ? t.length : 0,
                    f;
                if (typeof i != "number" && i != null)
                    for (f = e, i = rt.createCallback(i, r, 3); f-- && i(t[f], f, t);) u++;
                else u = i == null || r ? 1 : i || u;
                return n(t, 0, uu(tr(0, e - u), e))
            }

            function fc() {
                for (var e = [], r = -1, o = arguments.length, u = f(), h = yu(), v = h === d, s = f(), n, t; ++r < o;) n = arguments[r], (ot(n) || nr(n)) && (e.push(n), u.push(v && n.length >= ct && at(r ? e[r] : s)));
                var c = e[0],
                    l = -1,
                    y = c ? c.length : 0,
                    a = [];
                n: while (++l < y)
                    if (t = u[0], n = c[l], (t ? ft(t, n) : h(s, n)) < 0) {
                        for (r = o, (t || s).push(n); --r;)
                            if (t = u[r], (t ? ft(t, n) : h(e[r], n)) < 0) continue n;
                        a.push(n)
                    }
                while (o--) t = u[o], t && g(t);
                return i(u), i(s), a
            }

            function ec(t, i, r) {
                var u = 0,
                    e = t ? t.length : 0,
                    f;
                if (typeof i != "number" && i != null)
                    for (f = e, i = rt.createCallback(i, r, 3); f-- && i(t[f], f, t);) u++;
                else if (u = i, u == null || r) return t ? t[e - 1] : s;
                return n(t, tr(0, e - u))
            }

            function oc(n, t, i) {
                var r = n ? n.length : 0;
                for (typeof i == "number" && (r = (i < 0 ? tr(0, r + i) : uu(i, r - 1)) + 1); r--;)
                    if (n[r] === t) return r;
                return -1
            }

            function sc(n) {
                for (var i = arguments, r = 0, e = i.length, u = n ? n.length : 0, t, f; ++r < e;)
                    for (t = -1, f = i[r]; ++t < u;) n[t] === f && (gf.call(n, t--, 1), u--);
                return n
            }

            function hc(n, t, i) {
                n = +n || 0;
                i = typeof i == "number" ? i : +i || 1;
                t == null && (t = n, n = 0);
                for (var r = -1, u = tr(0, ko((t - n) / (i || 1))), f = di(u); ++r < u;) f[r] = n, n += i;
                return f
            }

            function cc(n, t, i) {
                var r = -1,
                    f = n ? n.length : 0,
                    e = [],
                    u;
                for (t = rt.createCallback(t, i, 3); ++r < f;) u = n[r], t(u, r, n) && (e.push(u), gf.call(n, r--, 1), f--);
                return e
            }

            function bf(t, i, r) {
                if (typeof i != "number" && i != null) {
                    var u = 0,
                        f = -1,
                        e = t ? t.length : 0;
                    for (i = rt.createCallback(i, r, 3); ++f < e && i(t[f], f, t);) u++
                } else u = i == null || r ? 1 : tr(0, i);
                return n(t, u)
            }

            function io(n, t, i, r) {
                var u = 0,
                    e = n ? n.length : u,
                    f;
                for (i = i ? rt.createCallback(i, r, 1) : kf, t = i(t); u < e;) f = u + e >>> 1, i(n[f]) < t ? u = f + 1 : e = f;
                return u
            }

            function lc() {
                return cf(vr(arguments, !0, !0))
            }

            function ro(n, t, i, r) {
                return typeof t != "boolean" && t != null && (r = i, i = typeof t != "function" && r && r[t] === n ? null : t, t = !1), i != null && (i = rt.createCallback(i, r, 3)), cf(n, t, i)
            }

            function ac(t) {
                return eu(t, n(arguments, 1))
            }

            function vc() {
                for (var i = -1, r = arguments.length, n, t; ++i < r;) n = arguments[i], (ot(n) || nr(n)) && (t = t ? cf(eu(t, n).concat(eu(n, t))) : n);
                return t || []
            }

            function uo() {
                for (var n = arguments.length > 1 ? arguments : arguments[0], t = -1, i = n ? be(rf(n, "length")) : 0, r = di(i < 0 ? 0 : i); ++t < i;) r[t] = rf(n, t);
                return r
            }

            function fo(n, t) {
                var r = -1,
                    f = n ? n.length : 0,
                    u = {},
                    i;
                for (t || !f || ot(n[0]) || (t = []); ++r < f;) i = n[r], t ? u[i] = t[r] : i && (u[i[0]] = i[1]);
                return u
            }

            function yc(n, t) {
                if (!st(t)) throw new hr;
                return function() {
                    if (--n < 1) return t.apply(this, arguments)
                }
            }

            function eo(t, i) {
                return arguments.length > 2 ? fr(t, 17, n(arguments, 2), null, i) : fr(t, 1, null, null, i)
            }

            function pc(n) {
                for (var i = arguments.length > 1 ? vr(arguments, !0, !1, 1) : ou(n), r = -1, u = i.length, t; ++r < u;) t = i[r], n[t] = fr(n[t], 1, null, null, n);
                return n
            }

            function wc(t, i) {
                return arguments.length > 2 ? fr(i, 19, n(arguments, 2), null, t) : fr(i, 3, null, null, t)
            }

            function bc() {
                for (var n = arguments, t = n.length; t--;)
                    if (!st(n[t])) throw new hr;
                return function() {
                    for (var t = arguments, i = n.length; i--;) t = [n[i].apply(this, t)];
                    return t[0]
                }
            }

            function kc(n, t) {
                return t = typeof t == "number" ? t : +t || n.length, fr(n, 4, null, null, null, t)
            }

            function oo(n, t, i) {
                var f, u, o, h, e, r, y, c = 0,
                    l = !1,
                    a = !0,
                    v, p, w;
                if (!st(n)) throw new hr;
                return t = tr(0, t) || 0, i === !0 ? (v = !0, a = !1) : ki(i) && (v = i.leading, l = "maxWait" in i && (tr(t, i.maxWait) || 0), a = "trailing" in i ? i.trailing : a), p = function() {
                        var i = t - (pr() - h),
                            l;
                        i <= 0 ? (u && cu(u), l = y, u = r = y = s, l && (c = pr(), o = n.apply(e, f), r || u || (f = e = null))) : r = ru(p, i)
                    }, w = function() {
                        r && cu(r);
                        u = r = y = s;
                        (a || l !== t) && (c = pr(), o = n.apply(e, f), r || u || (f = e = null))
                    },
                    function() {
                        var b, s, i;
                        return f = arguments, h = pr(), e = this, y = a && (r || !v), l === !1 ? b = v && !r : (u || v || (c = h), s = l - (h - c), i = s <= 0, i ? (u && (u = cu(u)), c = h, o = n.apply(e, f)) : u || (u = ru(w, s))), i && r ? r = cu(r) : r || t === l || (r = ru(p, t)), b && (i = !0, o = n.apply(e, f)), !i || r || u || (f = e = null), o
                    }
            }

            function dc(t) {
                if (!st(t)) throw new hr;
                var i = n(arguments, 1);
                return ru(function() {
                    t.apply(s, i)
                }, 1)
            }

            function gc(t, i) {
                if (!st(t)) throw new hr;
                var r = n(arguments, 2);
                return ru(function() {
                    t.apply(s, r)
                }, i)
            }

            function nl(n, t) {
                if (!st(n)) throw new hr;
                var i = function() {
                    var r = i.cache,
                        u = t ? t.apply(this, arguments) : ht + arguments[0];
                    return vi.call(r, u) ? r[u] : r[u] = n.apply(this, arguments)
                };
                return i.cache = {}, i
            }

            function tl(n) {
                var i, t;
                if (!st(n)) throw new hr;
                return function() {
                    return i ? t : (i = !0, t = n.apply(this, arguments), n = null, t)
                }
            }

            function il(t) {
                return fr(t, 16, n(arguments, 1))
            }

            function rl(t) {
                return fr(t, 32, null, n(arguments, 1))
            }

            function ul(n, t, i) {
                var r = !0,
                    u = !0;
                if (!st(n)) throw new hr;
                return i === !1 ? r = !1 : ki(i) && (r = "leading" in i ? i.leading : r, u = "trailing" in i ? i.trailing : u), it.leading = r, it.maxWait = t, it.trailing = u, oo(n, t, it)
            }

            function fl(n, t) {
                return fr(t, 16, [n])
            }

            function el(n) {
                return function() {
                    return n
                }
            }

            function ol(n, t, i) {
                var f = typeof n;
                if (n == null || f == "function") return ur(n, t, i);
                if (f != "object") return co(n);
                var u = gi(n),
                    e = u[0],
                    r = n[e];
                return u.length == 1 && r === r && !ki(r) ? function(n) {
                    var t = n[e];
                    return r === t && (r !== 0 || 1 / r == 1 / t)
                } : function(t) {
                    for (var i = u.length, r = !1; i--;)
                        if (!(r = kr(t[u[i]], n[u[i]], null, !0))) break;
                    return r
                }
            }

            function sl(n) {
                return n == null ? "" : sr(n).replace(ss, fs)
            }

            function kf(n) {
                return n
            }

            function df(n, t, i) {
                var u = !0,
                    f = t && ou(t),
                    r, e;
                t && (i || f.length) || (i == null && (i = t), r = ar, t = n, n = rt, f = ou(t));
                i === !1 ? u = !1 : ki(i) && "chain" in i && (u = i.chain);
                r = n;
                e = st(r);
                wr(f, function(i) {
                    var f = n[i] = t[i];
                    e && (r.prototype[i] = function() {
                        var i = this.__chain__,
                            e = this.__wrapped__,
                            o = [e],
                            t;
                        if (iu.apply(o, arguments), t = f.apply(n, o), u || i) {
                            if (e === t && ki(t)) return this;
                            t = new r(t);
                            t.__chain__ = i
                        }
                        return t
                    })
                })
            }

            function hl() {
                return b._ = wo, this
            }

            function so() {}

            function co(n) {
                return function(t) {
                    return t[n]
                }
            }

            function cl(n, t, i) {
                var f = n == null,
                    r = t == null,
                    u;
                return (i == null && (typeof n == "boolean" && r ? (i = n, n = 1) : r || typeof t != "boolean" || (i = t, r = !0)), f && r && (t = 1), n = +n || 0, r ? (t = n, n = 0) : t = +t || 0, i || n % 1 || t % 1) ? (u = te(), uu(n + u * (t - n + parseFloat("1e-" + ((u + "").length - 1))), t)) : hf(n, t)
            }

            function ll(n, t) {
                if (n) {
                    var i = n[t];
                    return st(i) ? n[t]() : i
                }
            }

            function al(n, t, i) {
                var h = rt.templateSettings,
                    u, o, v, f;
                n = sr(n || "");
                i = ku({}, i, h);
                var c = ku({}, i.imports, h.imports),
                    p = gi(c),
                    w = gu(c),
                    e, l = 0,
                    a = i.interpolate || nt,
                    r = "__p += '",
                    b = tu((i.escape || nt).source + "|" + a.source + "|" + (a === bt ? ei : nt).source + "|" + (i.evaluate || nt).source + "|$", "g");
                n.replace(b, function(t, i, u, f, o, s) {
                    return u || (u = f), r += n.slice(l, s).replace(ci, bi), i && (r += "' +\n__e(" + i + ") +\n'"), o && (e = !0, r += "';\n" + o + ";\n__p += '"), u && (r += "' +\n((__t = (" + u + ")) == null ? '' : __t) +\n'"), l = s + t.length, t
                });
                r += "';\n";
                u = i.variable;
                o = u;
                o || (u = "obj", r = "with (" + u + ") {\n" + r + "\n}\n");
                r = (e ? r.replace(ri, "") : r).replace(ui, "$1").replace(fi, "$1;");
                r = "function(" + u + ") {\n" + (o ? "" : u + " || (" + u + " = {});\n") + "var __t, __p = '', __e = _.escape" + (e ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + r + "return __p\n}";
                v = "\n/*\n//# sourceURL=" + (i.sourceURL || "/lodash/template/source[" + ai++ +"]") + "\n*/";
                try {
                    f = gr(p, "return " + r + v).apply(s, w)
                } catch (y) {
                    y.source = r;
                    throw y;
                }
                return t ? f(t) : (f.source = r, f)
            }

            function vl(n, t, i) {
                n = (n = +n) > -1 ? n : 0;
                var r = -1,
                    u = di(n);
                for (t = ur(t, i, 1); ++r < n;) u[r] = t(r);
                return u
            }

            function yl(n) {
                return n == null ? "" : sr(n).replace(os, es)
            }

            function pl(n) {
                var t = ++ti;
                return sr(n == null ? "" : n) + t
            }

            function wl(n) {
                return n = new ar(n), n.__chain__ = !0, n
            }

            function bl(n, t) {
                return t(n), n
            }

            function kl() {
                return this.__chain__ = !0, this
            }

            function dl() {
                return sr(this.__wrapped__)
            }

            function lo() {
                return this.__wrapped__
            }
            var pi, ut, ie, pu, ku, ir, er, du, ve, pe, we, rf, no, pr, ho;
            b = b ? o.defaults(w.Object(), b, o.pick(w, li)) : w;
            var di = b.Array,
                ao = b.Boolean,
                uf = b.Date,
                vo = b.Error,
                gr = b.Function,
                nu = b.Math,
                yo = b.Number,
                rr = b.Object,
                tu = b.RegExp,
                sr = b.String,
                hr = b.TypeError,
                lr = [],
                ff = vo.prototype,
                hu = rr.prototype,
                po = sr.prototype,
                wo = b._,
                pt = hu.toString,
                bo = tu("^" + sr(pt).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
                ko = nu.ceil,
                cu = b.clearTimeout,
                go = nu.floor,
                ns = gr.prototype.toString,
                br = yr(br = rr.getPrototypeOf) && br,
                vi = hu.hasOwnProperty,
                iu = lr.push,
                lu = hu.propertyIsEnumerable,
                ru = b.setTimeout,
                gf = lr.splice,
                ts = lr.unshift,
                ne = function() {
                    try {
                        var t = {},
                            n = yr(n = rr.defineProperty) && n,
                            i = n(t, t, t) && n
                    } catch (r) {}
                    return i
                }(),
                au = yr(au = rr.create) && au,
                ef = yr(ef = di.isArray) && ef,
                is = b.isFinite,
                rs = b.isNaN,
                vu = yr(vu = rr.keys) && vu,
                tr = nu.max,
                uu = nu.min,
                of = b.parseInt,
                te = nu.random,
                cr = {};
            cr[l] = di;
            cr[a] = ao;
            cr[v] = uf;
            cr[tt] = gr;
            cr[r] = rr;
            cr[y] = yo;
            cr[p] = tu;
            cr[h] = sr;
            pi = {};
            pi[l] = pi[v] = pi[y] = {
                constructor: !0,
                toLocaleString: !0,
                toString: !0,
                valueOf: !0
            };
            pi[a] = pi[h] = {
                constructor: !0,
                toString: !0,
                valueOf: !0
            };
            pi[dt] = pi[tt] = pi[p] = {
                constructor: !0,
                toString: !0
            };
            pi[r] = {
                    constructor: !0
                },
                function() {
                    for (var i = lt.length, t, n; i--;) {
                        t = lt[i];
                        for (n in pi) vi.call(pi, n) && !vi.call(pi[n], t) && (pi[n][t] = !1)
                    }
                }();
            ar.prototype = rt.prototype;
            ut = rt.support = {},
                function() {
                    var t = function() {
                            this.x = 1
                        },
                        u = {
                            "0": 1,
                            length: 1
                        },
                        i = [],
                        n;
                    t.prototype = {
                        valueOf: 1,
                        y: 1
                    };
                    for (n in new t) i.push(n);
                    for (n in arguments);
                    ut.argsClass = pt.call(arguments) == c;
                    ut.argsObject = arguments.constructor == rr && !(arguments instanceof di);
                    ut.enumErrorProps = lu.call(ff, "message") || lu.call(ff, "name");
                    ut.enumPrototypes = lu.call(t, "prototype");
                    ut.funcDecomp = !yr(b.WinRTError) && kt.test(yt);
                    ut.funcNames = typeof gr.name == "string";
                    ut.nonEnumArgs = n != 0;
                    ut.nonEnumShadows = !/valueOf/.test(i);
                    ut.ownLast = i[0] != "x";
                    ut.spliceObjects = (lr.splice.call(u, 0, 1), !u[0]);
                    ut.unindexedChars = "x" [0] + rr("x")[0] != "xx";
                    try {
                        ut.nodeClass = !(pt.call(document) == r && !({
                            toString: 0
                        } + ""))
                    } catch (f) {
                        ut.nodeClass = !0
                    }
                }(1);
            rt.templateSettings = {
                escape: /<%-([\s\S]+?)%>/g,
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: bt,
                variable: "",
                imports: {
                    _: rt
                }
            };
            ie = function(n) {
                var t = "var index, iterable = " + n.firstArg + ", result = " + n.init + ";\nif (!iterable) return result;\n" + n.top + ";",
                    i;
                if (n.array ? (t += "\nvar length = iterable.length; index = -1;\nif (" + n.array + ") {  ", ut.unindexedChars && (t += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "), t += "\n  while (++index < length) {\n    " + n.loop + ";\n  }\n}\nelse {  ") : ut.nonEnumArgs && (t += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + n.loop + ";\n    }\n  } else {  "), ut.enumPrototypes && (t += "\n  var skipProto = typeof iterable == 'function';\n  "), ut.enumErrorProps && (t += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  "), i = [], ut.enumPrototypes && i.push('!(skipProto && index == "prototype")'), ut.enumErrorProps && i.push('!(skipErrorProps && (index == "message" || index == "name"))'), n.useHas && n.keys) t += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n", i.length && (t += "    if (" + i.join(" && ") + ") {\n  "), t += n.loop + ";    ", i.length && (t += "\n    }"), t += "\n  }  ";
                else if (t += "\n  for (index in iterable) {\n", n.useHas && i.push("hasOwnProperty.call(iterable, index)"), i.length && (t += "    if (" + i.join(" && ") + ") {\n  "), t += n.loop + ";    ", i.length && (t += "\n    }"), t += "\n  }    ", ut.nonEnumShadows) {
                    for (t += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ", k = 0; k < 7; k++) t += "\n    index = '" + n.shadowedProps[k] + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))", n.useHas || (t += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"), t += ") {\n      " + n.loop + ";\n    }      ";
                    t += "\n  }    "
                }
                return (n.array || ut.nonEnumArgs) && (t += "\n}"), t + (n.bottom + ";\nreturn result")
            };
            au || (fu = function() {
                function n() {}
                return function(t) {
                    if (ki(t)) {
                        n.prototype = t;
                        n.prototype = null
                    }
                    return {} || b.Object()
                }
            }());
            pu = ne ? function(n, t) {
                gt.value = t;
                ne(n, "__bindData__", gt)
            } : so;
            ut.argsClass || (nr = function(n) {
                return n && typeof n == "object" && typeof n.length == "number" && vi.call(n, "callee") && !lu.call(n, "callee") || !1
            });
            var ot = ef || function(n) {
                    return n && typeof n == "object" && typeof n.length == "number" && pt.call(n) == l || !1
                },
                ee = dr({
                    args: "object",
                    init: "[]",
                    top: "if (!(objectTypes[typeof object])) return result",
                    loop: "result.push(index)"
                }),
                gi = vu ? function(n) {
                    return ki(n) ? ut.enumPrototypes && typeof n == "function" || ut.nonEnumArgs && n.length && nr(n) ? ee(n) : vu(n) : []
                } : ee,
                wu = {
                    args: "collection, callback, thisArg",
                    top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
                    array: "typeof length == 'number'",
                    keys: gi,
                    loop: "if (callback(iterable[index], index, collection) === false) return result"
                },
                af = {
                    args: "object, source, guard",
                    top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",
                    keys: gi,
                    loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
                    bottom: "  }\n}"
                },
                oe = {
                    top: "if (!objectTypes[typeof iterable]) return result;\n" + wu.top,
                    array: !1
                },
                vf = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                se = ce(vf),
                os = tu("(" + gi(se).join("|") + ")", "g"),
                ss = tu("[" + gi(vf).join("") + "]", "g"),
                yi = dr(wu),
                bu = dr(af, {
                    top: af.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),
                    loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"
                });
            return ku = dr(af), ir = dr(wu, oe, {
                useHas: !1
            }), er = dr(wu, oe), st(/x/) && (st = function(n) {
                return typeof n == "function" && pt.call(n) == tt
            }), du = br ? function(n) {
                if (!(n && pt.call(n) == r) || !ut.argsClass && nr(n)) return !1;
                var i = n.valueOf,
                    t = yr(i) && (t = br(i)) && br(t);
                return t ? n == t || br(n) == t : fe(n)
            } : fe, ve = lf(function(n, t, i) {
                vi.call(n, i) ? n[i] ++ : n[i] = 1
            }), pe = lf(function(n, t, i) {
                (vi.call(n, i) ? n[i] : n[i] = []).push(t)
            }), we = lf(function(n, t, i) {
                n[i] = t
            }), rf = su, no = nf, pr = yr(pr = uf.now) && pr || function() {
                return (new uf).getTime()
            }, ho = of(wt + "08") == 8 ? of : function(n, t) {
                return of(or(n) ? n.replace(hi, "") : n, t || 0)
            }, rt.after = yc, rt.assign = bu, rt.at = lh, rt.bind = eo, rt.bindAll = pc, rt.bindKey = wc, rt.chain = wl, rt.compact = gh, rt.compose = bc, rt.constant = el, rt.countBy = ve, rt.create = ls, rt.createCallback = ol, rt.curry = kc, rt.debounce = oo, rt.defaults = ku, rt.defer = dc, rt.delay = gc, rt.difference = nc, rt.filter = nf, rt.flatten = rc, rt.forEach = wr, rt.forEachRight = tf, rt.forIn = ir, rt.forInRight = ys, rt.forOwn = er, rt.forOwnRight = he, rt.functions = ou, rt.groupBy = pe, rt.indexBy = we, rt.initial = uc, rt.intersection = fc, rt.invert = ce, rt.invoke = vh, rt.keys = gi, rt.map = su, rt.mapValues = fh, rt.max = be, rt.memoize = nl, rt.merge = eh, rt.min = yh, rt.omit = oh, rt.once = tl, rt.pairs = sh, rt.partial = il, rt.partialRight = rl, rt.pick = hh, rt.pluck = rf, rt.property = co, rt.pull = sc, rt.range = hc, rt.reject = ph, rt.remove = cc, rt.rest = bf, rt.shuffle = de, rt.sortBy = kh, rt.tap = bl, rt.throttle = ul, rt.times = vl, rt.toArray = dh, rt.transform = ch, rt.union = lc, rt.uniq = ro, rt.values = gu, rt.where = no, rt.without = ac, rt.wrap = fl, rt.xor = vc, rt.zip = uo, rt.zipObject = fo, rt.collect = su, rt.drop = bf, rt.each = wr, rt.eachRight = tf, rt.extend = bu, rt.methods = ou, rt.object = fo, rt.select = nf, rt.tail = bf, rt.unique = ro, rt.unzip = uo, df(rt), rt.clone = hs, rt.cloneDeep = cs, rt.contains = ae, rt.escape = sl, rt.every = ye, rt.find = yf, rt.findIndex = tc, rt.findKey = as, rt.findLast = ah, rt.findLastIndex = ic, rt.findLastKey = vs, rt.has = ps, rt.identity = kf, rt.indexOf = to, rt.isArguments = nr, rt.isArray = ot, rt.isBoolean = ws, rt.isDate = bs, rt.isElement = ks, rt.isEmpty = ds, rt.isEqual = gs, rt.isFinite = nh, rt.isFunction = st, rt.isNaN = th, rt.isNull = ih, rt.isNumber = le, rt.isObject = ki, rt.isPlainObject = du, rt.isRegExp = rh, rt.isString = or, rt.isUndefined = uh, rt.lastIndexOf = oc, rt.mixin = df, rt.noConflict = hl, rt.noop = so, rt.now = pr, rt.parseInt = ho, rt.random = cl, rt.reduce = pf, rt.reduceRight = ke, rt.result = ll, rt.runInContext = yt, rt.size = bh, rt.some = ge, rt.sortedIndex = io, rt.template = al, rt.unescape = yl, rt.uniqueId = pl, rt.all = ye, rt.any = ge, rt.detect = yf, rt.findWhere = yf, rt.foldl = pf, rt.foldr = ke, rt.include = ae, rt.inject = pf, df(function() {
                var n = {};
                return er(rt, function(t, i) {
                    rt.prototype[i] || (n[i] = t)
                }), n
            }(), !1), rt.first = wf, rt.last = ec, rt.sample = wh, rt.take = wf, rt.head = wf, er(rt, function(n, t) {
                var i = t !== "sample";
                rt.prototype[t] || (rt.prototype[t] = function(t, r) {
                    var u = this.__chain__,
                        f = n(this.__wrapped__, t, r);
                    return !u && (t == null || r && !(i && typeof t == "function")) ? f : new ar(f, u)
                })
            }), rt.VERSION = "2.4.1", rt.prototype.chain = kl, rt.prototype.toString = dl, rt.prototype.value = lo, rt.prototype.valueOf = lo, yi(["join", "pop", "shift"], function(n) {
                var t = lr[n];
                rt.prototype[n] = function() {
                    var n = this.__chain__,
                        i = t.apply(this.__wrapped__, arguments);
                    return n ? new ar(i, n) : i
                }
            }), yi(["push", "reverse", "sort", "unshift"], function(n) {
                var t = lr[n];
                rt.prototype[n] = function() {
                    return t.apply(this.__wrapped__, arguments), this
                }
            }), yi(["concat", "slice", "splice"], function(n) {
                var t = lr[n];
                rt.prototype[n] = function() {
                    return new ar(t.apply(this.__wrapped__, arguments), this.__chain__)
                }
            }), ut.spliceObjects || yi(["pop", "shift", "splice"], function(n) {
                var t = lr[n],
                    i = n == "splice";
                rt.prototype[n] = function() {
                    var r = this.__chain__,
                        n = this.__wrapped__,
                        u = t.apply(n, arguments);
                    return n.length === 0 && delete n[0], r || i ? new ar(u, r) : u
                }
            }), rt
        }
        var s, ot = [],
            st = [],
            ti = 0,
            ii = {},
            ht = +new Date + "",
            ct = 75,
            pt = 40,
            wt = " \t\x0b\f ﻿\n\r\u2028\u2029 ᠎             　",
            ri = /\b__p \+= '';/g,
            ui = /\b(__p \+=) '' \+/g,
            fi = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
            ei = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
            oi = /\w*$/,
            si = /^\s*function[ \n\r\t]+\w/,
            bt = /<%=([\s\S]+?)%>/g,
            hi = RegExp("^[" + wt + "]*0+(?=.$)"),
            nt = /($^)/,
            kt = /\bthis\b/,
            ci = /['\n\r\t\u2028\u2029\\]/g,
            li = ["Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"],
            lt = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
            ai = 0,
            c = "[object Arguments]",
            l = "[object Array]",
            a = "[object Boolean]",
            v = "[object Date]",
            dt = "[object Error]",
            tt = "[object Function]",
            y = "[object Number]",
            r = "[object Object]",
            p = "[object RegExp]",
            h = "[object String]",
            u = {},
            o;
        u[tt] = !1;
        u[c] = u[l] = u[a] = u[v] = u[y] = u[r] = u[p] = u[h] = !0;
        var it = {
                leading: !1,
                maxWait: 0,
                trailing: !1
            },
            gt = {
                configurable: !1,
                enumerable: !1,
                value: null,
                writable: !1
            },
            t = {
                args: "",
                array: null,
                bottom: "",
                firstArg: "",
                init: "",
                keys: null,
                loop: "",
                shadowedProps: null,
                support: null,
                top: "",
                useHas: !1
            },
            e = {
                boolean: !1,
                "function": !0,
                object: !0,
                number: !1,
                string: !1,
                undefined: !1
            },
            vi = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\t": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            w = e[typeof window] && window || this,
            rt = e[typeof exports] && exports && !exports.nodeType && exports,
            ut = e[typeof module] && module && !module.nodeType && module,
            yi = ut && ut.exports === rt && rt,
            b = e[typeof global] && global;
        b && (b.global === b || b.window === b) && (w = b);
        o = yt();
        typeof define == "function" && typeof define.amd == "object" && define.amd ? (w._ = o, define(function() {
            return o
        })) : rt && ut ? yi ? (ut.exports = o)._ = o : rt._ = o : w._ = o
    }.call(this),
    function(n) {
        if (typeof define == "function" && define.amd) define(["jquery", "moment"], n);
        else if (jQuery)
            if (moment) n(jQuery, moment);
            else throw "bootstrap-datetimepicker requires moment.js to be loaded first";
        else throw "bootstrap-datetimepicker requires jQuery to be loaded first";
    }(function(n, t) {
        if (typeof t == "undefined") {
            alert("momentjs is requried");
            throw new Error("momentjs is required");
        }
        var u = 0,
            r = t,
            f = function(t, f) {
                var ot = {
                        pickDate: !0,
                        pickTime: !0,
                        useMinutes: !0,
                        useSeconds: !1,
                        minuteStepping: 1,
                        startDate: new r({
                            y: 1970
                        }),
                        endDate: (new r).add(50, "y"),
                        collapse: !0,
                        language: "en",
                        defaultDate: "",
                        disabledDates: !1,
                        enabledDates: !1,
                        icons: {},
                        useStrict: !1,
                        direction: "auto"
                    },
                    st = {
                        time: "glyphicon glyphicon-time",
                        date: "glyphicon glyphicon-calendar",
                        up: "glyphicon glyphicon-chevron-up",
                        down: "glyphicon glyphicon-chevron-down"
                    },
                    e = this,
                    ht = function() {
                        var i = !1,
                            o, c, s;
                        if (e.options = n.extend({}, ot, f), e.options.icons = n.extend({}, st, e.options.icons), e.element = n(t), ct(), !(e.options.pickTime || e.options.pickDate)) throw new Error("Must choose at least one picker");
                        if (e.id = u++, r.lang(e.options.language), e.date = r(), e.unset = !1, e.isInput = e.element.is("input"), e.component = !1, e.element.hasClass("input-group") && (e.component = e.element.find(".datepickerbutton").size() == 0 ? e.element.find("[class^='input-group-']") : e.element.find(".datepickerbutton")), e.format = e.options.format, o = r()._lang._longDateFormat, e.format || (e.format = e.isInput ? e.element.data("format") : e.element.find("input").data("format"), e.format || (e.format = e.options.pickDate ? o.L : "", e.options.pickDate && e.options.pickTime && (e.format += " "), e.format += e.options.pickTime ? o.LT : "", e.options.useSeconds && (~o.LT.indexOf(" A") ? e.format = e.format.split(" A")[0] + ":ss A" : e.format += ":ss"))), e.options.use24hours = e.format.toLowerCase().indexOf("a") < 1, e.component && (i = e.component.find("span")), e.options.pickTime && i && i.addClass(e.options.icons.time), e.options.pickDate && i && (i.removeClass(e.options.icons.time), i.addClass(e.options.icons.date)), e.widget = n(gt(e.options.pickDate, e.options.pickTime, e.options.collapse)).appendTo("body"), e.minViewMode = e.options.minViewMode || e.element.data("date-minviewmode") || 0, typeof e.minViewMode == "string") switch (e.minViewMode) {
                            case "months":
                                e.minViewMode = 1;
                                break;
                            case "years":
                                e.minViewMode = 2;
                                break;
                            default:
                                e.minViewMode = 0
                        }
                        if (e.viewMode = e.options.viewMode || e.element.data("date-viewmode") || 0, typeof e.viewMode == "string") switch (e.viewMode) {
                            case "months":
                                e.viewMode = 1;
                                break;
                            case "years":
                                e.viewMode = 2;
                                break;
                            default:
                                e.viewMode = 0
                        }
                        e.options.disabledDates = k(e.options.disabledDates);
                        e.options.enabledDates = k(e.options.enabledDates);
                        e.startViewMode = e.viewMode;
                        e.setStartDate(e.options.startDate || e.element.data("date-startdate"));
                        e.setEndDate(e.options.endDate || e.element.data("date-enddate"));
                        lt();
                        at();
                        vt();
                        yt();
                        pt();
                        h();
                        w();
                        rt();
                        e.options.defaultDate !== "" && e.setValue(e.options.defaultDate);
                        e.options.minuteStepping !== 1 && (c = e.date.minutes(), s = e.options.minuteStepping, e.date.minutes(Math.round(c / s) * s % 60).seconds(0))
                    },
                    ct = function() {
                        var n;
                        n = e.element.is("input") ? e.element.data() : e.element.find("input").data();
                        n.pickdate !== undefined && (e.options.pickDate = n.pickdate);
                        n.picktime !== undefined && (e.options.pickTime = n.picktime);
                        n.useminutes !== undefined && (e.options.useMinutes = n.useminutes);
                        n.useseconds !== undefined && (e.options.useSeconds = n.useseconds);
                        n.minutestepping !== undefined && (e.options.minuteStepping = n.minutestepping);
                        n.startdate !== undefined && (e.options.startDate = n.startdate);
                        n.enddate !== undefined && (e.options.endDate = n.enddate);
                        n.collapse !== undefined && (e.options.collapse = n.collapse);
                        n.language !== undefined && (e.options.language = n.language);
                        n.defaultdate !== undefined && (e.options.defaultDate = n.defaultdate);
                        n.disableddates !== undefined && (e.options.disabledDates = n.disableddates);
                        n.enableddates !== undefined && (e.options.enabledDates = n.enableddates);
                        n.icons !== undefined && (e.options.icons = n.icons);
                        n.usestrict !== undefined && (e.options.useStrict = n.usestrict)
                    },
                    tt = function() {
                        var r = "absolute",
                            t = e.component ? e.component.offset() : e.element.offset(),
                            i = n(window);
                        e.width = e.component ? e.component.outerWidth() : e.element.outerWidth();
                        t.top = t.top + e.element.outerHeight();
                        e.options.width !== undefined && e.widget.width(e.options.width);
                        e.options.orientation === "left" && (e.widget.addClass("left-oriented"), t.left = t.left - e.widget.width() + 20);
                        dt() && (r = "fixed", t.top -= i.scrollTop(), t.left -= i.scrollLeft());
                        i.width() < t.left + e.widget.outerWidth() ? (t.right = i.width() - t.left - e.width, t.left = "auto", e.widget.addClass("pull-right")) : (t.right = "auto", e.widget.removeClass("pull-right"));
                        e.widget.css({
                            position: r,
                            top: t.top,
                            left: t.left,
                            right: t.right
                        })
                    },
                    a = function(n, t) {
                        e.element.trigger({
                            type: "change.dp",
                            date: r(e.date),
                            oldDate: r(n)
                        });
                        t !== "change" && e.element.change()
                    },
                    d = function(n) {
                        e.element.trigger({
                            type: "error.dp",
                            date: r(n)
                        })
                    },
                    h = function(n) {
                        r.lang(e.options.language);
                        var t = n;
                        t || (t = e.isInput ? e.element.val() : e.element.find("input").val(), t && (e.date = r(t, e.format, e.options.useStrict)), e.date || (e.date = r()));
                        e.viewDate = r(e.date).startOf("month");
                        v();
                        g()
                    },
                    lt = function() {
                        r.lang(e.options.language);
                        var i = n("<tr>"),
                            u = r.weekdaysMin(),
                            t;
                        if (r()._lang._week.dow == 0)
                            for (t = 0; t < 7; t++) i.append('<th class="dow">' + u[t] + "<\/th>");
                        else
                            for (t = 1; t < 8; t++) t == 7 ? i.append('<th class="dow">' + u[0] + "<\/th>") : i.append('<th class="dow">' + u[t] + "<\/th>");
                        e.widget.find(".datepicker-days thead").append(i)
                    },
                    at = function() {
                        r.lang(e.options.language);
                        for (var n = "", t = 0, i = r.monthsShort(); t < 12;) n += '<span class="month">' + i[t++] + "<\/span>";
                        e.widget.find(".datepicker-months td").append(n)
                    },
                    v = function() {
                        r.lang(e.options.language);
                        var t = e.viewDate.year(),
                            h = e.viewDate.month(),
                            f = e.options.startDate.year(),
                            y = e.options.startDate.month(),
                            o = e.options.endDate.year(),
                            p = e.options.endDate.month(),
                            i, w, c = [],
                            v, s, u, k, d, l, a = r.months();
                        for (e.widget.find(".datepicker-days").find(".disabled").removeClass("disabled"), e.widget.find(".datepicker-months").find(".disabled").removeClass("disabled"), e.widget.find(".datepicker-years").find(".disabled").removeClass("disabled"), e.widget.find(".datepicker-days th:eq(1)").text(a[h] + " " + t), i = r(e.viewDate).subtract("months", 1), k = i.daysInMonth(), i.date(k).startOf("week"), (t == f && h <= y || t < f) && e.widget.find(".datepicker-days th:eq(0)").addClass("disabled"), (t == o && h >= p || t > o) && e.widget.find(".datepicker-days th:eq(2)").addClass("disabled"), w = r(i).add(42, "d"); i.isBefore(w);) i.weekday() === r().startOf("week").weekday() && (v = n("<tr>"), c.push(v)), s = "", i.year() < t || i.year() == t && i.month() < h ? s += " old" : (i.year() > t || i.year() == t && i.month() > h) && (s += " new"), i.isSame(r({
                            y: e.date.year(),
                            M: e.date.month(),
                            d: e.date.date()
                        })) && (s += " active"), (b(i) || !et(i)) && (s += " disabled"), v.append('<td class="day' + s + '">' + i.date() + "<\/td>"), i.add(1, "d");
                        for (e.widget.find(".datepicker-days tbody").empty().append(c), l = r().year(), a = e.widget.find(".datepicker-months").find("th:eq(1)").text(t).end().find("span").removeClass("active"), l === t && a.eq(r().month()).addClass("active"), l - 1 < f && e.widget.find(".datepicker-months th:eq(0)").addClass("disabled"), l + 1 > o && e.widget.find(".datepicker-months th:eq(2)").addClass("disabled"), u = 0; u < 12; u++) t == f && y > u || t < f ? n(a[u]).addClass("disabled") : (t == o && p < u || t > o) && n(a[u]).addClass("disabled");
                        for (c = "", t = parseInt(t / 10, 10) * 10, d = e.widget.find(".datepicker-years").find("th:eq(1)").text(t + "-" + (t + 9)).end().find("td"), e.widget.find(".datepicker-years").find("th").removeClass("disabled"), f > t && e.widget.find(".datepicker-years").find("th:eq(0)").addClass("disabled"), o < t + 9 && e.widget.find(".datepicker-years").find("th:eq(2)").addClass("disabled"), t -= 1, u = -1; u < 11; u++) c += '<span class="year' + (u === -1 || u === 10 ? " old" : "") + (l === t ? " active" : "") + (t < f || t > o ? " disabled" : "") + '">' + t + "<\/span>", t += 1;
                        d.html(c)
                    },
                    vt = function() {
                        r.lang(e.options.language);
                        var f = e.widget.find(".timepicker .timepicker-hours table"),
                            n = "",
                            t, i, u;
                        if (f.parent().hide(), e.options.use24hours)
                            for (t = 0, i = 0; i < 6; i += 1) {
                                for (n += "<tr>", u = 0; u < 4; u += 1) n += '<td class="hour">' + s(t.toString()) + "<\/td>", t++;
                                n += "<\/tr>"
                            } else
                                for (t = 1, i = 0; i < 3; i += 1) {
                                    for (n += "<tr>", u = 0; u < 4; u += 1) n += '<td class="hour">' + s(t.toString()) + "<\/td>", t++;
                                    n += "<\/tr>"
                                }
                        f.html(n)
                    },
                    yt = function() {
                        var r = e.widget.find(".timepicker .timepicker-minutes table"),
                            n = "",
                            u = 0,
                            t, i;
                        for (r.parent().hide(), t = 0; t < 5; t++) {
                            for (n += "<tr>", i = 0; i < 4; i += 1) n += '<td class="minute">' + s(u.toString()) + "<\/td>", u += 3;
                            n += "<\/tr>"
                        }
                        r.html(n)
                    },
                    pt = function() {
                        var r = e.widget.find(".timepicker .timepicker-seconds table"),
                            n = "",
                            u = 0,
                            t, i;
                        for (r.parent().hide(), t = 0; t < 5; t++) {
                            for (n += "<tr>", i = 0; i < 4; i += 1) n += '<td class="second">' + s(u.toString()) + "<\/td>", u += 3;
                            n += "<\/tr>"
                        }
                        r.html(n)
                    },
                    g = function() {
                        if (e.date) {
                            var t = e.widget.find(".timepicker span[data-time-component]"),
                                n = e.date.hours(),
                                i = "AM";
                            e.options.use24hours || (n >= 12 && (i = "PM"), n === 0 ? n = 12 : n != 12 && (n = n % 12), e.widget.find(".timepicker [data-action=togglePeriod]").text(i));
                            t.filter("[data-time-component=hours]").text(s(n));
                            t.filter("[data-time-component=minutes]").text(s(e.date.minutes()));
                            t.filter("[data-time-component=seconds]").text(s(e.date.second()))
                        }
                    },
                    wt = function(t) {
                        t.stopPropagation();
                        t.preventDefault();
                        e.unset = !1;
                        var i = n(t.target).closest("span, td, th"),
                            u, f, s, h, c = r(e.date);
                        if (i.length === 1 && !i.is(".disabled")) switch (i[0].nodeName.toLowerCase()) {
                            case "th":
                                switch (i[0].className) {
                                    case "switch":
                                        w(1);
                                        break;
                                    case "prev":
                                    case "next":
                                        s = o.modes[e.viewMode].navStep;
                                        i[0].className === "prev" && (s = s * -1);
                                        e.viewDate.add(s, o.modes[e.viewMode].navFnc);
                                        v()
                                }
                                break;
                            case "span":
                                i.is(".month") ? (u = i.parent().find("span").index(i), e.viewDate.month(u)) : (f = parseInt(i.text(), 10) || 0, e.viewDate.year(f));
                                e.viewMode === e.minViewMode && (e.date = r({
                                    y: e.viewDate.year(),
                                    M: e.viewDate.month(),
                                    d: e.viewDate.date(),
                                    h: e.date.hours(),
                                    m: e.date.minutes()
                                }), a(c, t.type));
                                w(-1);
                                v();
                                break;
                            case "td":
                                i.is(".day") && (h = parseInt(i.text(), 10) || 1, u = e.viewDate.month(), f = e.viewDate.year(), i.is(".old") ? u === 0 ? (u = 11, f -= 1) : u -= 1 : i.is(".new") && (u == 11 ? (u = 0, f += 1) : u += 1), e.date = r({
                                    y: f,
                                    M: u,
                                    d: h,
                                    h: e.date.hours(),
                                    m: e.date.minutes()
                                }), e.viewDate = r({
                                    y: f,
                                    M: u,
                                    d: Math.min(28, h)
                                }), v(), y(), a(c, t.type))
                        }
                    },
                    p = {
                        incrementHours: function() {
                            c("add", "hours", 1)
                        },
                        incrementMinutes: function() {
                            c("add", "minutes", e.options.minuteStepping)
                        },
                        incrementSeconds: function() {
                            c("add", "seconds", 1)
                        },
                        decrementHours: function() {
                            c("subtract", "hours", 1)
                        },
                        decrementMinutes: function() {
                            c("subtract", "minutes", e.options.minuteStepping)
                        },
                        decrementSeconds: function() {
                            c("subtract", "seconds", 1)
                        },
                        togglePeriod: function() {
                            var n = e.date.hours();
                            n >= 12 ? n -= 12 : n += 12;
                            e.date.hours(n)
                        },
                        showPicker: function() {
                            e.widget.find(".timepicker > div:not(.timepicker-picker)").hide();
                            e.widget.find(".timepicker .timepicker-picker").show()
                        },
                        showHours: function() {
                            e.widget.find(".timepicker .timepicker-picker").hide();
                            e.widget.find(".timepicker .timepicker-hours").show()
                        },
                        showMinutes: function() {
                            e.widget.find(".timepicker .timepicker-picker").hide();
                            e.widget.find(".timepicker .timepicker-minutes").show()
                        },
                        showSeconds: function() {
                            e.widget.find(".timepicker .timepicker-picker").hide();
                            e.widget.find(".timepicker .timepicker-seconds").show()
                        },
                        selectHour: function(t) {
                            e.date.hours(parseInt(n(t.target).text(), 10));
                            p.showPicker.call(e)
                        },
                        selectMinute: function(t) {
                            e.date.minutes(parseInt(n(t.target).text(), 10));
                            p.showPicker.call(e)
                        },
                        selectSecond: function(t) {
                            e.date.seconds(parseInt(n(t.target).text(), 10));
                            p.showPicker.call(e)
                        }
                    },
                    bt = function(t) {
                        var i = r(e.date),
                            u = n(t.currentTarget).data("action"),
                            f = p[u].apply(e, arguments);
                        return nt(t), e.date || (e.date = r({
                            y: 1970
                        })), y(), g(), a(i, t.type), f
                    },
                    nt = function(n) {
                        n.stopPropagation();
                        n.preventDefault()
                    },
                    it = function(t) {
                        r.lang(e.options.language);
                        var f = n(t.target),
                            u = r(e.date),
                            i = r(f.val(), e.format, e.options.useStrict);
                        i.isValid() && !b(i) && et(i) ? (h(), e.setValue(i), a(u, t.type), y()) : (e.viewDate = u, a(u, t.type), d(i), e.unset = !0)
                    },
                    w = function(n) {
                        n && (e.viewMode = Math.max(e.minViewMode, Math.min(2, e.viewMode + n)));
                        e.widget.find(".datepicker > div").hide().filter(".datepicker-" + o.modes[e.viewMode].clsName).show()
                    },
                    rt = function() {
                        var i, r, t, f, u;
                        e.widget.on("click", ".datepicker *", n.proxy(wt, this));
                        e.widget.on("click", "[data-action]", n.proxy(bt, this));
                        e.widget.on("mousedown", n.proxy(nt, this));
                        if (e.options.pickDate && e.options.pickTime) e.widget.on("click.togglePicker", ".accordion-toggle", function(o) {
                            if (o.stopPropagation(), i = n(this), r = i.closest("ul"), t = r.find(".in"), f = r.find(".collapse:not(.in)"), t && t.length) {
                                if (u = t.data("collapse"), u && u.transitioning) return;
                                t.collapse("hide");
                                f.collapse("show");
                                i.find("span").toggleClass(e.options.icons.time + " " + e.options.icons.date);
                                e.element.find(".input-group-addon span").toggleClass(e.options.icons.time + " " + e.options.icons.date)
                            }
                        });
                        if (e.isInput) e.element.on({
                            focus: n.proxy(e.show, this),
                            change: n.proxy(it, this),
                            blur: n.proxy(e.hide, this)
                        });
                        else {
                            e.element.on({
                                change: n.proxy(it, this)
                            }, "input");
                            if (e.component) e.component.on("click", n.proxy(e.show, this));
                            else e.element.on("click", n.proxy(e.show, this))
                        }
                    },
                    kt = function() {
                        n(window).on("resize.datetimepicker" + e.id, n.proxy(tt, this));
                        if (!e.isInput) n(document).on("mousedown.datetimepicker" + e.id, n.proxy(e.hide, this))
                    },
                    ut = function() {
                        e.widget.off("click", ".datepicker *", e.click);
                        e.widget.off("click", "[data-action]");
                        e.widget.off("mousedown", e.stopEvent);
                        e.options.pickDate && e.options.pickTime && e.widget.off("click.togglePicker");
                        e.isInput ? e.element.off({
                            focus: e.show,
                            change: e.change
                        }) : (e.element.off({
                            change: e.change
                        }, "input"), e.component ? e.component.off("click", e.show) : e.element.off("click", e.show))
                    },
                    ft = function() {
                        n(window).off("resize.datetimepicker" + e.id);
                        e.isInput || n(document).off("mousedown.datetimepicker" + e.id)
                    },
                    dt = function() {
                        if (e.element) {
                            for (var i = e.element.parents(), r = !1, t = 0; t < i.length; t++)
                                if (n(i[t]).css("position") == "fixed") {
                                    r = !0;
                                    break
                                }
                            return r
                        }
                        return !1
                    },
                    y = function() {
                        r.lang(e.options.language);
                        var n = "",
                            t;
                        e.unset || (n = r(e.date).format(e.format));
                        e.isInput ? e.element.val(n) : (e.component && (t = e.element.find("input"), t.val(n)), e.element.data("date", n));
                        e.options.pickTime || e.hide()
                    },
                    c = function(n, t, i) {
                        r.lang(e.options.language);
                        var u;
                        if (n == "add" ? (u = r(e.date), u.hours() == 23 && u.add(i, t), u.add(i, t)) : u = r(e.date).subtract(i, t), b(r(u.subtract(i, t))) || b(u)) {
                            d(u.format(e.format));
                            return
                        }
                        n == "add" ? e.date.add(i, t) : e.date.subtract(i, t);
                        e.unset = !1
                    },
                    b = function(n) {
                        if (r.lang(e.options.language), n.isAfter(e.options.endDate) || n.isBefore(e.options.startDate)) return !0;
                        if (e.options.disabledDates === !1) return !1;
                        var t = r(n).format("YYYY-MM-DD");
                        return e.options.disabledDates[t] === !0
                    },
                    et = function(n) {
                        if (r.lang(e.options.language), e.options.enabledDates === !1) return !0;
                        var t = r(n).format("YYYY-MM-DD");
                        return e.options.enabledDates[t] === !0
                    },
                    k = function(n) {
                        var t = {},
                            u = 0;
                        for (i = 0; i < n.length; i++) dDate = n[i], dDate = r(dDate), dDate.isValid() && (t[dDate.format("YYYY-MM-DD")] = !0, u++);
                        return u > 0 ? t : !1
                    },
                    s = function(n) {
                        return n = n.toString(), n.length >= 2 ? n : "0" + n
                    },
                    gt = function(n, t, i) {
                        return n && t ? '<div class="bootstrap-datetimepicker-widget dropdown-menu" style="z-index:9999 !important;"><ul class="list-unstyled"><li' + (i ? ' class="collapse in"' : "") + '><div class="datepicker">' + o.template + '<\/div><\/li><li class="picker-switch accordion-toggle"><a class="btn" style="width:100%"><span class="' + e.options.icons.time + '"><\/span><\/a><\/li><li' + (i ? ' class="collapse"' : "") + '><div class="timepicker">' + l.getTemplate() + "<\/div><\/li><\/ul><\/div>" : t ? '<div class="bootstrap-datetimepicker-widget dropdown-menu"><div class="timepicker">' + l.getTemplate() + "<\/div><\/div>" : '<div class="bootstrap-datetimepicker-widget dropdown-menu"><div class="datepicker">' + o.template + "<\/div><\/div>"
                    },
                    o = {
                        modes: [{
                            clsName: "days",
                            navFnc: "month",
                            navStep: 1
                        }, {
                            clsName: "months",
                            navFnc: "year",
                            navStep: 1
                        }, {
                            clsName: "years",
                            navFnc: "year",
                            navStep: 10
                        }],
                        headTemplate: '<thead><tr><th class="prev">&lsaquo;<\/th><th colspan="5" class="switch"><\/th><th class="next">&rsaquo;<\/th><\/tr><\/thead>',
                        contTemplate: '<tbody><tr><td colspan="7"><\/td><\/tr><\/tbody>'
                    },
                    l = {
                        hourTemplate: '<span data-action="showHours"   data-time-component="hours"   class="timepicker-hour"><\/span>',
                        minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"><\/span>',
                        secondTemplate: '<span data-action="showSeconds"  data-time-component="seconds" class="timepicker-second"><\/span>'
                    };
                o.template = '<div class="datepicker-days"><table class="table-condensed">' + o.headTemplate + '<tbody><\/tbody><\/table><\/div><div class="datepicker-months"><table class="table-condensed">' + o.headTemplate + o.contTemplate + '<\/table><\/div><div class="datepicker-years"><table class="table-condensed">' + o.headTemplate + o.contTemplate + "<\/table><\/div>";
                l.getTemplate = function() {
                    return '<div class="timepicker-picker"><table class="table-condensed"><tr><td><a href="#" class="btn" data-action="incrementHours"><span class="' + e.options.icons.up + '"><\/span><\/a><\/td><td class="separator"><\/td><td>' + (e.options.useMinutes ? '<a href="#" class="btn" data-action="incrementMinutes"><span class="' + e.options.icons.up + '"><\/span><\/a>' : "") + "<\/td>" + (e.options.useSeconds ? '<td class="separator"><\/td><td><a href="#" class="btn" data-action="incrementSeconds"><span class="' + e.options.icons.up + '"><\/span><\/a><\/td>' : "") + (e.options.use24hours ? "" : '<td class="separator"><\/td>') + "<\/tr><tr><td>" + l.hourTemplate + '<\/td> <td class="separator">:<\/td><td>' + (e.options.useMinutes ? l.minuteTemplate : '<span class="timepicker-minute">00<\/span>') + "<\/td> " + (e.options.useSeconds ? '<td class="separator">:<\/td><td>' + l.secondTemplate + "<\/td>" : "") + (e.options.use24hours ? "" : '<td class="separator"><\/td><td><button type="button" class="btn btn-primary" data-action="togglePeriod"><\/button><\/td>') + '<\/tr><tr><td><a href="#" class="btn" data-action="decrementHours"><span class="' + e.options.icons.down + '"><\/span><\/a><\/td><td class="separator"><\/td><td>' + (e.options.useMinutes ? '<a href="#" class="btn" data-action="decrementMinutes"><span class="' + e.options.icons.down + '"><\/span><\/a>' : "") + "<\/td>" + (e.options.useSeconds ? '<td class="separator"><\/td><td><a href="#" class="btn" data-action="decrementSeconds"><span class="' + e.options.icons.down + '"><\/span><\/a><\/td>' : "") + (e.options.use24hours ? "" : '<td class="separator"><\/td>') + '<\/tr><\/table><\/div><div class="timepicker-hours" data-action="selectHour"><table class="table-condensed"><\/table><\/div><div class="timepicker-minutes" data-action="selectMinute"><table class="table-condensed"><\/table><\/div>' + (e.options.useSeconds ? '<div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"><\/table><\/div>' : "")
                };
                e.destroy = function() {
                    ut();
                    ft();
                    e.widget.remove();
                    e.element.removeData("DateTimePicker");
                    e.component && e.component.removeData("DateTimePicker")
                };
                e.show = function(n) {
                    e.widget.show();
                    e.height = e.component ? e.component.outerHeight() : e.element.outerHeight();
                    tt();
                    e.element.trigger({
                        type: "show.dp",
                        date: r(e.date)
                    });
                    kt();
                    n && nt(n)
                };
                e.disable = function() {
                    var n = e.element.find("input");
                    n.prop("disabled") || (n.prop("disabled", !0), ut())
                };
                e.enable = function() {
                    var n = e.element.find("input");
                    n.prop("disabled") && (n.prop("disabled", !1), rt())
                };
                e.hide = function(t) {
                    if (!t || !n(t.target).is(e.element.attr("id"))) {
                        for (var f = e.widget.find(".collapse"), u, i = 0; i < f.length; i++)
                            if (u = f.eq(i).data("collapse"), u && u.transitioning) return;
                        e.widget.hide();
                        e.viewMode = e.startViewMode;
                        w();
                        e.element.trigger({
                            type: "hide.dp",
                            date: r(e.date)
                        });
                        ft()
                    }
                };
                e.setValue = function(n) {
                    r.lang(e.options.language);
                    n ? e.unset = !1 : (e.unset = !0, y());
                    r.isMoment(n) || (n = r(n));
                    n.isValid() ? (e.date = n, y(), e.viewDate = r({
                        y: e.date.year(),
                        M: e.date.month()
                    }), v(), g()) : d(n)
                };
                e.getDate = function() {
                    return e.unset ? null : e.date
                };
                e.setDate = function(n) {
                    n ? e.setValue(r(n)) : e.setValue(null)
                };
                e.setDisabledDates = function(n) {
                    e.options.disabledDates = k(n);
                    e.viewDate && h()
                };
                e.setEnabledDates = function(n) {
                    e.options.enabledDates = k(n);
                    e.viewDate && h()
                };
                e.setEndDate = function(n) {
                    n != undefined && (e.options.endDate = r(n), e.viewDate && h())
                };
                e.setStartDate = function(n) {
                    n != undefined && (e.options.startDate = r(n), e.viewDate && h())
                };
                ht()
            };
        n.fn.datetimepicker = function(t) {
            return this.each(function() {
                var i = n(this),
                    r = i.data("DateTimePicker");
                r || i.data("DateTimePicker", new f(this, t))
            })
        }
    });
mod = angular.module("infinite-scroll", []);
mod.value("THROTTLE_MILLISECONDS", null);
mod.directive("infiniteScroll", ["$rootScope", "$window", "$interval", "THROTTLE_MILLISECONDS", function(n, t, i, r) {
        return {
            scope: {
                infiniteScroll: "&",
                infiniteScrollContainer: "=",
                infiniteScrollDistance: "=",
                infiniteScrollDisabled: "=",
                infiniteScrollUseDocumentBottom: "=",
                infiniteScrollListenForEvent: "@"
            },
            link: function(u, f, e) {
                var v, c, o, p, w, b, k, s, h, d, l, g, nt, y, rt, a, tt, it;
                return it = angular.element(t), nt = null, y = null, c = null, o = null, d = !0, tt = !1, a = null, h = function(n) {
                    return n = n[0] || n, isNaN(n.offsetHeight) ? n.document.documentElement.clientHeight : n.offsetHeight
                }, l = function(n) {
                    if (n[0].getBoundingClientRect && !n.css("none")) return n[0].getBoundingClientRect().top + g(n)
                }, g = function(n) {
                    return n = n[0] || n, isNaN(window.pageYOffset) ? n.document.documentElement.scrollTop : n.ownerDocument.defaultView.pageYOffset
                }, s = function() {
                    var i, r, t, e, s;
                    if (o === it ? (i = h(o) + g(o[0].document.documentElement), t = l(f) + h(f)) : (i = h(o), r = 0, l(o) !== void 0 && (r = l(o)), t = l(f) - r + h(f)), tt && (t = h((f[0].ownerDocument || f[0].document).documentElement)), e = t - i, s = e <= h(o) * nt + 1, s) {
                        if (c = !0, y) return u.$$phase || n.$$phase ? u.infiniteScroll() : u.$apply(u.infiniteScroll)
                    } else return c = !1
                }, rt = function(n, t) {
                    var f, u, r;
                    return r = null, u = 0, f = function() {
                            return u = (new Date).getTime(), i.cancel(r), r = null, n.call(), null
                        },
                        function() {
                            var e, o;
                            return (e = (new Date).getTime(), o = t - (e - u), o <= 0) ? (clearTimeout(r), i.cancel(r), r = null, u = e, n.call()) : r ? void 0 : r = i(f, o, 1)
                        }
                }, r != null && (s = rt(s, r)), u.$on("$destroy", function() {
                    return o.unbind("scroll", s), a != null ? (a(), a = null) : void 0
                }), b = function(n) {
                    return nt = parseFloat(n) || 0
                }, u.$watch("infiniteScrollDistance", b), b(u.infiniteScrollDistance), w = function(n) {
                    return y = !n, y && c ? (c = !1, s()) : void 0
                }, u.$watch("infiniteScrollDisabled", w), w(u.infiniteScrollDisabled), k = function(n) {
                    return tt = n
                }, u.$watch("infiniteScrollUseDocumentBottom", k), k(u.infiniteScrollUseDocumentBottom), v = function(n) {
                    return o != null && o.unbind("scroll", s), o = n, n != null ? o.bind("scroll", s) : void 0
                }, v(it), u.infiniteScrollListenForEvent && (a = n.$on(u.infiniteScrollListenForEvent, s)), p = function(n) {
                    if (n != null && n.length !== 0) {
                        if (n instanceof HTMLElement ? n = angular.element(n) : typeof n.append == "function" ? n = angular.element(n[n.length - 1]) : typeof n == "string" && (n = angular.element(document.querySelector(n))), n != null) return v(n);
                        throw new Exception("invalid infinite-scroll-container attribute.");
                    }
                }, u.$watch("infiniteScrollContainer", p), p(u.infiniteScrollContainer || []), e.infiniteScrollParent != null && v(angular.element(f.parent())), e.infiniteScrollImmediateCheck != null && (d = u.$eval(e.infiniteScrollImmediateCheck)), i(function() {
                    if (d) return s()
                }, 0, 1)
            }
        }
    }]),
    function() {
        function r(n, t) {
            window.XMLHttpRequest.prototype[n] = t(window.XMLHttpRequest.prototype[n])
        }

        function u(n, t, i, r, u, f) {
            function o(n, t, i, r, u) {
                f(function() {
                    for (var t = [], e = 0; e < n.length; e++) t.push(n.item(e));
                    i && (r.fileModel = t, i && i.$setViewValue(t != null && t.length == 0 ? "" : t));
                    f(function() {
                        r.change({
                            $files: t,
                            $event: u
                        })
                    })
                })
            }
            if (r && r.$setViewValue(""), t[0].tagName.toLowerCase() !== "input" || (t.attr("type") && t.attr("type").toLowerCase()) !== "file") {
                var e = angular.element('<input type="file">');
                i.multiple && e.attr("multiple", i.multiple);
                i.accept && e.attr("accept", i.accept);
                e.css("width", "1px").css("height", "1px").css("opacity", 0).css("position", "absolute").css("filter", "alpha(opacity=0)").css("padding", 0).css("margin", 0).css("overflow", "hidden").attr("tabindex", "-1").attr("ng-file-generated-elem", !0);
                t.append(e);
                t.__afu_fileClickDelegate__ = function() {
                    e[0].click()
                };
                t.bind("click", t.__afu_fileClickDelegate__);
                t.css("overflow", "hidden");
                t = e
            }
            n.resetOnClick() != !1 && t.bind("click", function(t) {
                this.value = null;
                o([], i, r, n, t)
            });
            i.ngFileSelect != "" && (n.change = n.select);
            t.bind("change", function(t) {
                var u;
                u = t.__files_ || t.target.files;
                o(u, i, r, n, t)
            })
        }

        function f(n, r, u, f, o, s, h) {
            function p(n, t, i) {
                var e = !0,
                    u, f, r;
                if (c && (u = i.dataTransfer.items, u != null))
                    for (f = 0; f < u.length && e; f++) e = e && (u[f].kind == "file" || u[f].kind == "") && (u[f].type.match(c) != null || u[f].name != null && u[f].name.match(c) != null);
                return r = n.dragOverClass({
                    $event: i
                }), r && (r.delay && (y = r.delay), r.accept && (r = e ? r.accept : r.reject)), r || t.dragOverClass || "dragover"
            }

            function w(n, t, i, r) {
                function a(n) {
                    !c || n.type.match(c) || n.name != null && n.name.match(c) ? o.push(n) : w.push(n)
                }

                function k(n, t, i) {
                    if (t != null)
                        if (t.isDirectory) {
                            a({
                                name: t.name,
                                type: "directory",
                                path: (i ? i : "") + t.name
                            });
                            var r = t.createReader();
                            l++;
                            r.readEntries(function(r) {
                                try {
                                    for (var u = 0; u < r.length; u++) k(n, r[u], (i ? i : "") + t.name + "/")
                                } finally {
                                    l--
                                }
                            })
                        } else l++, t.file(function(n) {
                            l--;
                            n.path = (i ? i : "") + n.name;
                            a(n)
                        })
                }
                var o = [],
                    w = [],
                    f = n.dataTransfer.items,
                    v, p, y, u, b, l;
                if (f && f.length > 0 && h.protocol() != "file")
                    for (u = 0; u < f.length; u++) {
                        if (f[u].webkitGetAsEntry && f[u].webkitGetAsEntry() && f[u].webkitGetAsEntry().isDirectory) {
                            if (v = f[u].webkitGetAsEntry(), v.isDirectory && !i) continue;
                            v != null && (e(v.name) ? k(o, v) : f[u].webkitGetAsEntry().isDirectory || a(f[u].getAsFile()))
                        } else p = f[u].getAsFile(), p != null && a(p);
                        if (!r && o.length > 0) break
                    } else if (y = n.dataTransfer.files, y != null)
                        for (u = 0; u < y.length; u++)
                            if (a(y.item(u)), !r && o.length > 0) break;
                b = 0,
                    function d(n) {
                        s(function() {
                            if (l) b++ * 10 < 2e4 && d(10);
                            else {
                                if (!r && o.length > 1) {
                                    for (var n = 0; o[n].type == "directory";) n++;
                                    o = [o[n]]
                                }
                                t(o, w)
                            }
                        }, n || 0)
                    }();
                l = 0
            }
            var l;
            if (f && f.$setViewValue(""), l = t(), u.dropAvailable && s(function() {
                    n.dropAvailable = l
                }), !l) {
                n.hideOnDropNotAvailable() != !1 && r.css("display", "none");
                return
            }
            var v = null,
                a = n.stopPropagation(),
                y = 1,
                c = u.accept == null ? null : new RegExp(i(u.accept));
            r[0].addEventListener("dragover", function(t) {
                t.preventDefault();
                a && t.stopPropagation();
                s.cancel(v);
                n.actualDragOverClass || (n.actualDragOverClass = p(n, u, t));
                r.addClass(n.actualDragOverClass)
            }, !1);
            r[0].addEventListener("dragenter", function(n) {
                n.preventDefault();
                a && n.stopPropagation()
            }, !1);
            r[0].addEventListener("dragleave", function() {
                v = s(function() {
                    r.removeClass(n.actualDragOverClass);
                    n.actualDragOverClass = null
                }, y || 1)
            }, !1);
            u.ngFileDrop != "" && (n.change = n.drop);
            r[0].addEventListener("drop", function(t) {
                t.preventDefault();
                a && t.stopPropagation();
                r.removeClass(n.actualDragOverClass);
                n.actualDragOverClass = null;
                w(t, function(i, r) {
                    f && (n.fileModel = i, f && f.$setViewValue(i != null && i.length == 0 ? "" : i));
                    u.ngFileRejectedModel && (n.fileRejectedModel = r);
                    s(function() {
                        n.change({
                            $files: i,
                            $rejectedFiles: r,
                            $event: t
                        })
                    })
                }, n.allowDir() != !1, u.multiple)
            }, !1)
        }

        function t() {
            var n = document.createElement("div");
            return "draggable" in n && "ondrop" in n
        }

        function e(n) {
            return /^[\000-\177]*$/.test(n)
        }

        function i(n) {
            var r, t, u;
            if (n.length > 2 && n[0] === "/" && n[n.length - 1] === "/") return n.substring(1, n.length - 1);
            if (r = n.split(","), t = "", r.length > 1)
                for (u = 0; u < r.length; u++) t += "(" + i(r[u]) + ")", u < r.length - 1 && (t += "|");
            else t = "^" + n.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g"), "\\$&") + "$", t = t.replace(/\\\*/g, ".*").replace(/\\\?/g, ".");
            return t
        }
        window.XMLHttpRequest && !window.XMLHttpRequest.__isFileAPIShim && r("setRequestHeader", function(n) {
            return function(t, i) {
                if (t === "__setXHR_") {
                    var r = i(this);
                    r instanceof Function && r(this)
                } else n.apply(this, arguments)
            }
        });
        var n = angular.module("angularFileUpload", []);
        n.version = "2.0.2";
        n.service("$upload", ["$http", "$q", "$timeout", function(n, t, i) {
            function r(r) {
                r.method = r.method || "POST";
                r.headers = r.headers || {};
                r.transformRequest = r.transformRequest || function(t, i) {
                    return window.ArrayBuffer && t instanceof window.ArrayBuffer ? t : n.defaults.transformRequest[0](t, i)
                };
                var f = t.defer(),
                    u = f.promise;
                return r.headers.__setXHR_ = function() {
                    return function(n) {
                        n && (r.__XHR = n, r.xhrFn && r.xhrFn(n), n.upload.addEventListener("progress", function(n) {
                            n.config = r;
                            f.notify ? f.notify(n) : u.progress_fn && i(function() {
                                u.progress_fn(n)
                            })
                        }, !1), n.upload.addEventListener("load", function(n) {
                            n.lengthComputable && (n.config = r, f.notify ? f.notify(n) : u.progress_fn && i(function() {
                                u.progress_fn(n)
                            }))
                        }, !1))
                    }
                }, n(r).then(function(n) {
                    f.resolve(n)
                }, function(n) {
                    f.reject(n)
                }, function(n) {
                    f.notify(n)
                }), u.success = function(n) {
                    return u.then(function(t) {
                        n(t.data, t.status, t.headers, r)
                    }), u
                }, u.error = function(n) {
                    return u.then(null, function(t) {
                        n(t.data, t.status, t.headers, r)
                    }), u
                }, u.progress = function(n) {
                    return u.progress_fn = n, u.then(null, null, function(t) {
                        n(t)
                    }), u
                }, u.abort = function() {
                    return r.__XHR && i(function() {
                        r.__XHR.abort()
                    }), u
                }, u.xhr = function(n) {
                    return r.xhrFn = function(t) {
                        return function() {
                            t && t.apply(u, arguments);
                            n.apply(u, arguments)
                        }
                    }(r.xhrFn), u
                }, u
            }
            this.upload = function(t) {
                t.headers = t.headers || {};
                t.headers["Content-Type"] = undefined;
                t.transformRequest = t.transformRequest || n.defaults.transformRequest;
                var f = new FormData,
                    u = t.transformRequest,
                    i = t.data;
                return t.transformRequest = function(n, r) {
                    var o, e, h, s, c, f;
                    if (i)
                        if (t.formDataAppender)
                            for (o in i) e = i[o], t.formDataAppender(n, o, e);
                        else
                            for (o in i) {
                                if (e = i[o], typeof u == "function") e = u(e, r);
                                else
                                    for (f = 0; f < u.length; f++) h = u[f], typeof h == "function" && (e = h(e, r));
                                e != undefined && n.append(o, e)
                            }
                        if (t.file != null)
                            if (s = t.fileFormDataName || "file", Object.prototype.toString.call(t.file) === "[object Array]")
                                for (c = Object.prototype.toString.call(s) === "[object String]", f = 0; f < t.file.length; f++) n.append(c ? s : s[f], t.file[f], t.fileName && t.fileName[f] || t.file[f].name);
                            else n.append(s, t.file, t.fileName || t.file.name);
                    return n
                }, t.data = f, r(t)
            };
            this.http = function(n) {
                return r(n)
            }
        }]);
        n.directive("ngFileSelect", ["$parse", "$timeout", function(n, t) {
            return {
                restrict: "AEC",
                require: "?ngModel",
                scope: {
                    fileModel: "=ngModel",
                    change: "&ngFileChange",
                    select: "&ngFileSelect",
                    resetOnClick: "&resetOnClick"
                },
                link: function(i, r, f, e) {
                    u(i, r, f, e, n, t)
                }
            }
        }]);
        n.directive("ngFileDrop", ["$parse", "$timeout", "$location", function(n, t, i) {
            return {
                restrict: "AEC",
                require: "?ngModel",
                scope: {
                    fileModel: "=ngModel",
                    fileRejectedModel: "=ngFileRejectedModel",
                    change: "&ngFileChange",
                    drop: "&ngFileDrop",
                    allowDir: "&allowDir",
                    dragOverClass: "&dragOverClass",
                    dropAvailable: "=dropAvailable",
                    stopPropagation: "&stopPropagation",
                    hideOnDropNotAvailable: "&hideOnDropNotAvailable"
                },
                link: function(r, u, e, o) {
                    f(r, u, e, o, n, t, i)
                }
            }
        }]);
        n.directive("ngNoFileDrop", function() {
            return function(n, i) {
                t() && i.css("display", "none")
            }
        });
        n.directive("ngFileDropAvailable", ["$parse", "$timeout", function(n, i) {
            return function(r, u, f) {
                if (t()) {
                    var e = n(f.ngFileDropAvailable);
                    i(function() {
                        e(r)
                    })
                }
            }
        }])
    }(),
    function() {
        function t(n, t) {
            window.XMLHttpRequest.prototype[n] = t(window.XMLHttpRequest.prototype[n])
        }
        var i = function() {
                try {
                    var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (n) return !0
                } catch (t) {
                    if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) return !0
                }
                return !1
            },
            r;
        if (window.XMLHttpRequest && !window.FormData || window.FileAPI && FileAPI.forceLoad) {
            r = function(n) {
                if (!n.__listeners) {
                    n.upload || (n.upload = {});
                    n.__listeners = [];
                    var t = n.upload.addEventListener;
                    n.upload.addEventListener = function(i, r) {
                        n.__listeners[i] = r;
                        t && t.apply(this, arguments)
                    }
                }
            };
            t("open", function(n) {
                return function(t, i, u) {
                    r(this);
                    this.__url = i;
                    try {
                        n.apply(this, [t, i, u])
                    } catch (f) {
                        f.message.indexOf("Access is denied") > -1 && n.apply(this, [t, "_fix_for_ie_crossdomain__", u])
                    }
                }
            });
            t("getResponseHeader", function(n) {
                return function(t) {
                    return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(t) : n == null ? null : n.apply(this, [t])
                }
            });
            t("getAllResponseHeaders", function(n) {
                return function() {
                    return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : n == null ? null : n.apply(this)
                }
            });
            t("abort", function(n) {
                return function() {
                    return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : n == null ? null : n.apply(this)
                }
            });
            t("setRequestHeader", function(n) {
                return function(t, i) {
                    if (t === "__setXHR_") {
                        r(this);
                        var u = i(this);
                        u instanceof Function && u(this)
                    } else this.__requestHeaders = this.__requestHeaders || {}, this.__requestHeaders[t] = i, n.apply(this, arguments)
                }
            });

            function n(n, t, i) {
                try {
                    Object.defineProperty(n, t, {
                        get: i
                    })
                } catch (r) {}
            }
            t("send", function(t) {
                return function() {
                    var r = this,
                        o, f, e, u;
                    if (arguments[0] && arguments[0].__isFileAPIShim) {
                        for (o = arguments[0], f = {
                                url: r.__url,
                                jsonp: !1,
                                cache: !0,
                                complete: function(t, i) {
                                    r.__completed = !0;
                                    !t && r.__listeners.load && r.__listeners.load({
                                        type: "load",
                                        loaded: r.__loaded,
                                        total: r.__total,
                                        target: r,
                                        lengthComputable: !0
                                    });
                                    !t && r.__listeners.loadend && r.__listeners.loadend({
                                        type: "loadend",
                                        loaded: r.__loaded,
                                        total: r.__total,
                                        target: r,
                                        lengthComputable: !0
                                    });
                                    t === "abort" && r.__listeners.abort && r.__listeners.abort({
                                        type: "abort",
                                        loaded: r.__loaded,
                                        total: r.__total,
                                        target: r,
                                        lengthComputable: !0
                                    });
                                    i.status !== undefined && n(r, "status", function() {
                                        return i.status == 0 && t && t !== "abort" ? 500 : i.status
                                    });
                                    i.statusText !== undefined && n(r, "statusText", function() {
                                        return i.statusText
                                    });
                                    n(r, "readyState", function() {
                                        return 4
                                    });
                                    i.response !== undefined && n(r, "response", function() {
                                        return i.response
                                    });
                                    var u = i.responseText || (t && i.status == 0 && t !== "abort" ? t : undefined);
                                    n(r, "responseText", function() {
                                        return u
                                    });
                                    n(r, "response", function() {
                                        return u
                                    });
                                    t && n(r, "err", function() {
                                        return t
                                    });
                                    r.__fileApiXHR = i;
                                    r.onreadystatechange && r.onreadystatechange();
                                    r.onload && r.onload()
                                },
                                fileprogress: function(n) {
                                    if (n.target = r, r.__listeners.progress && r.__listeners.progress(n), r.__total = n.total, r.__loaded = n.loaded, n.total === n.loaded) {
                                        var t = this;
                                        setTimeout(function() {
                                            r.__completed || (r.getAllResponseHeaders = function() {}, t.complete(null, {
                                                status: 204,
                                                statusText: "No Content"
                                            }))
                                        }, 1e4)
                                    }
                                },
                                headers: r.__requestHeaders
                            }, f.data = {}, f.files = {}, e = 0; e < o.data.length; e++) u = o.data[e], u.val != null && u.val.name != null && u.val.size != null && u.val.type != null ? f.files[u.key] = u.val : f.data[u.key] = u.val;
                        setTimeout(function() {
                            if (!i()) throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
                            r.__fileApiXHR = FileAPI.upload(f)
                        }, 1)
                    } else t.apply(r, arguments)
                }
            });
            window.XMLHttpRequest.__isFileAPIShim = !0;
            var f = function(n) {
                    var t, r, u;
                    if (!i()) throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
                    t = angular.element(n);
                    t.attr("disabled") || !t.hasClass("js-fileapi-wrapper") && (t.attr("ng-file-select") != null || t.attr("data-ng-file-select") != null || t.attr("ng-file-generated-elem") && (t.parent().attr("ng-file-select") != null || t.parent().attr("data-ng-file-select") != null)) && (FileAPI.wrapInsideDiv ? (r = document.createElement("div"), r.innerHTML = '<div class="js-fileapi-wrapper" style="position:relative; overflow:hidden"><\/div>', r = r.firstChild, u = n.parentNode, u.insertBefore(r, n), u.removeChild(n), r.appendChild(n)) : (t.addClass("js-fileapi-wrapper"), t.attr("ng-file-generated-elem") && ((t.parent().css("position") === "" || t.parent().css("position") === "static") && t.parent().css("position", "relative"), t.css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("width", "100%").css("height", "100%").css("padding", 0).css("margin", 0), t.parent().unbind("click", t.parent().__afu_fileClickDelegate__))))
                },
                u = function(n) {
                    return function(t) {
                        for (var i = FileAPI.getFiles(t), r = 0; r < i.length; r++) i[r].size === undefined && (i[r].size = 0), i[r].name === undefined && (i[r].name = "file"), i[r].type === undefined && (i[r].type = "undefined");
                        t.target || (t.target = {});
                        t.target.files = i;
                        t.target.files != i && (t.__files_ = i);
                        (t.__files_ || t.target.files).item = function(n) {
                            return (t.__files_ || t.target.files)[n] || null
                        };
                        n && n.apply(this, [t])
                    }
                },
                e = function(n, t) {
                    return (t.toLowerCase() === "change" || t.toLowerCase() === "onchange") && n.getAttribute("type") == "file"
                };
            HTMLInputElement.prototype.addEventListener && (HTMLInputElement.prototype.addEventListener = function(n) {
                return function(t, i, r, o) {
                    e(this, t) ? (f(this), n.apply(this, [t, u(i), r, o])) : n.apply(this, [t, i, r, o])
                }
            }(HTMLInputElement.prototype.addEventListener));
            HTMLInputElement.prototype.attachEvent && (HTMLInputElement.prototype.attachEvent = function(n) {
                return function(t, i) {
                    e(this, t) ? (f(this), window.jQuery ? angular.element(this).bind("change", u(null)) : n.apply(this, [t, u(i)])) : n.apply(this, [t, i])
                }
            }(HTMLInputElement.prototype.attachEvent));
            window.FormData = FormData = function() {
                    return {
                        append: function(n, t, i) {
                            this.data.push({
                                key: n,
                                val: t,
                                name: i
                            })
                        },
                        data: [],
                        __isFileAPIShim: !0
                    }
                },
                function() {
                    if (window.FileAPI || (window.FileAPI = {}), FileAPI.forceLoad && (FileAPI.html5 = !1), !FileAPI.upload) {
                        var f, n, e = document.createElement("script"),
                            o = document.getElementsByTagName("script"),
                            t, r, u;
                        if (window.FileAPI.jsUrl) f = window.FileAPI.jsUrl;
                        else if (window.FileAPI.jsPath) n = window.FileAPI.jsPath;
                        else
                            for (t = 0; t < o.length; t++)
                                if (u = o[t].src, r = u.search(/\/angular\-file\-upload[\-a-zA-z0-9\.]*\.js/), r > -1) {
                                    n = u.substring(0, r + 1);
                                    break
                                }
                        FileAPI.staticPath == null && (FileAPI.staticPath = n);
                        e.setAttribute("src", f || n + "FileAPI.js");
                        document.getElementsByTagName("head")[0].appendChild(e);
                        FileAPI.hasFlash = i()
                    }
                }();
            FileAPI.disableFileInput = function(n, t) {
                t ? n.removeClass("js-fileapi-wrapper") : n.addClass("js-fileapi-wrapper")
            }
        }
        window.FileReader || (window.FileReader = function() {
            var n = this,
                r = !1,
                t, i;
            this.listeners = {};
            this.addEventListener = function(t, i) {
                n.listeners[t] = n.listeners[t] || [];
                n.listeners[t].push(i)
            };
            this.removeEventListener = function(t, i) {
                n.listeners[t] && n.listeners[t].splice(n.listeners[t].indexOf(i), 1)
            };
            this.dispatchEvent = function(t) {
                var r = n.listeners[t.type],
                    i;
                if (r)
                    for (i = 0; i < r.length; i++) r[i].call(n, t)
            };
            this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;
            t = function(t, i) {
                var r = {
                    type: t,
                    target: n,
                    loaded: i.loaded,
                    total: i.total,
                    error: i.error
                };
                return i.result != null && (r.target.result = i.result), r
            };
            i = function(i) {
                var u;
                r || (r = !0, n.onloadstart && this.onloadstart(t("loadstart", i)));
                i.type === "load" ? (n.onloadend && n.onloadend(t("loadend", i)), u = t("load", i), n.onload && n.onload(u), n.dispatchEvent(u)) : i.type === "progress" ? (u = t("progress", i), n.onprogress && n.onprogress(u), n.dispatchEvent(u)) : (u = t("error", i), n.onerror && n.onerror(u), n.dispatchEvent(u))
            };
            this.readAsArrayBuffer = function(n) {
                FileAPI.readAsBinaryString(n, i)
            };
            this.readAsBinaryString = function(n) {
                FileAPI.readAsBinaryString(n, i)
            };
            this.readAsDataURL = function(n) {
                FileAPI.readAsDataURL(n, i)
            };
            this.readAsText = function(n) {
                FileAPI.readAsText(n, i)
            }
        })
    }();
theApp = angular.module("app", ["infinite-scroll", "ngResource", "ngRoute", "ui.bootstrap", "diply.article-cards"]);
theApp.provider("$cookieStore", [function() {
    var n = this;
    n.defaultOptions = {};
    n.setDefaultOptions = function(t) {
        n.defaultOptions = t
    };
    n.$get = function() {
        return {
            get: function(n) {
                var t = $.cookie(n);
                if (t) return angular.fromJson(t)
            },
            put: function(t, i, r) {
                r = $.extend({}, n.defaultOptions, r);
                $.cookie(t, angular.toJson(i), r)
            },
            remove: function(t, i) {
                i = $.extend({}, n.defaultOptions, i);
                $.removeCookie(t, i)
            }
        }
    }
}]);
theApp.config(["$routeProvider", "$locationProvider", "$httpProvider", "$cookieStoreProvider", function(n, t, i, r) {
    typeof enableNGRoutes != "undefined" && enableNGRoutes && (t.html5Mode(!0).hashPrefix("!"), n.when("/shop", {
        controller: "PostController",
        templateUrl: "/content/static/ng-templates/shop_layout.html?" + build_id,
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "shop",
            postFlags: !1
        }
    }).when("/shop/:cat_slug", {
        controller: "PostController",
        templateUrl: "/content/static/ng-templates/shop_layout.html?" + build_id,
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "shop",
            postFlags: !1
        }
    }).when("/c/videos", {
        controller: "PostController",
        templateUrl: "/content/static/ng-templates/post_layout.html?" + build_id,
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "videos",
            postFlags: !1
        }
    }).when("/c/:cat_slug", {
        controller: "categoryCardsController",
        templateUrl: "/content/static/ng-templates/category_stream.html",
        caseInsensitiveMatch: !0
    }).when("/g/:cat_slug", {
        controller: "PostController",
        templateUrl: "/content/static/ng-templates/post_layout.html?" + build_id,
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "category",
            postFlags: !1
        },
        resolve: {
            resolve_data: ["$route", "$q", "Categories", function(n, t, i) {
                i.get({
                    slug: n.current.params.cat_slug
                })
            }]
        }
    }).when("/c/:cat_slug/:sub_slug", {
        controller: "categoryCardsController",
        templateUrl: "/content/static/ng-templates/category_stream.html",
        caseInsensitiveMatch: !0
    }).when("/search", {
        controller: "PostController",
        templateUrl: "/content/static/ng-templates/search_results.html?" + build_id,
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "search",
            postFlags: !1
        }
    }).when("/search?q=", {
        controller: "PostController",
        templateUrl: "/content/static/ng-templates/search_results.html?" + build_id,
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "search",
            postFlags: !1
        }
    }).when("/:brand_slug", {
        controller: "publicationCardsController",
        templateUrl: "/Scripts/ng-app/article-cards/templates/publicationStream.html",
        caseInsensitiveMatch: !0,
        resolve: {
            profileDetails: ["$route", "articleCardFactory", function(n, t) {
                return t.publicationDetails({
                    slug: n.current.params.brand_slug
                }).$promise
            }]
        }
    }).when("/my-profile/:username", {
        controller: "UserProfileCtrl",
        templateUrl: "/content/static/ng-templates/userprofile.html",
        caseInsensitiveMatch: !0,
        extras: {
            post_type: "user"
        }
    }).when("/profile/:username/:post_layout?", {
        controller: "userCardsController",
        templateUrl: "/Scripts/ng-app/article-cards/templates/userStream.html",
        caseInsensitiveMatch: !0,
        resolve: {
            profileDetails: ["$route", "articleCardFactory", function(n, t) {
                return t.userDetails({
                    username: n.current.params.username
                }).$promise
            }]
        }
    }).otherwise(function(n, t) {
        window.location.href = window.location.origin ? window.location.origin + t.url() : t.url()
    }));
    var u = ["$rootScope", "$q", function(n, t) {
        function i(n) {
            return n
        }

        function r(n) {
            var r = n.status,
                i, u;
            if (r == 401) return i = t.defer(), u = {
                config: n.config,
                deferred: i
            }, u.config.params.postid && $("#signUp").modal("show"), i.promise;
            if (r == 404) {
                window.location = "/error/error404";
                return
            }
            return t.reject(n)
        }
        return function(n) {
            return n.then(i, r)
        }
    }];
    i.responseInterceptors.push(u);
    r.setDefaultOptions({
        path: "/",
        expires: 7
    })
}]);
theApp.run(["$rootScope", "$route", "$routeParams", "$filter", "PageMeta", "Categories", "$location", function(n, t, i, r, u, f, e) {
    n.$on("$routeChangeStart", function() {});
    n.$on("$locationChangeStart", function(n, t, i) {
        var r = document.createElement("a");
        r.href = i;
        r.host === "" && (r.href = r.href);
        (r.pathname === "/" || r.pathname === "") && (window.location.href = window.location.origin ? window.location.origin + e.url() : e.url())
    });
    n.$on("$routeChangeSuccess", function() {
        var n = t.current,
            e;
        n.extras && (n.extras.post_type === "category" ? f.query(function(n) {
            var t = r("exact")(n, {
                Slug: i.cat_slug
            })[0];
            u.set((t.MetaTitle || t.Name) + " | Diply", t.MetaDescription || "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", t.MetaKeywords || "")
        }) : n.extras.post_type === "subcat" ? f.getSubs(function(n) {
            var i = r("exact")(n, {
                Slug: t.current.params.sub_slug
            })[0];
            u.set((i.MetaTitle || i.Name) + " | Diply", i.MetaDescription || "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", i.MetaKeywords || "")
        }) : n.extras.post_type === "videos" ? u.set("Videos | Diply", "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", "") : n.extras.post_type === "featured" ? u.set("Diply.com: Go for a dip!", "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", "") : n.extras.post_type === "shop" ? (e = i.cat_slug, e ? f.query(function(n) {
            var t = r("exact")(n, {
                Slug: e
            })[0];
            u.set("Shop > " + t.Name + " | Diply", "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", "")
        }) : u.set("Shop | Diply", "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", "")) : n.extras.post_type === "user" ? u.setTitle(i.username + "'s Profile | Diply", "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", "") : n.extras.post_type === "search" && u.setTitle("Search '" + i.q + "' | Diply", "Diply is an oddities and wonders discovery network dedicated to showcasing the world's most creative ideas, projects and people.", ""))
    })
}]);
theApp.factory("GrowlFactory", function() {
    return {
        info: function(n, t) {
            $.growl.notice({
                title: n,
                message: t
            })
        },
        warning: function(n, t) {
            $.growl.warning({
                title: n,
                message: t
            })
        },
        error: function(n, t) {
            $.growl.error({
                title: n,
                message: t
            })
        }
    }
});
theApp.controller("UserProfileCtrl", ["$scope", "$http", "Posts", "GrowlFactory", function(n, t, i) {
    n.draftPosts = {
        CurrentPage: 0,
        TotalItems: 0,
        Items: []
    };
    n.OriginalUsername = i.OriginalUsername;
    n.submissionPosts = {
        CurrentPage: 0,
        TotalItems: 0,
        Items: []
    };
    n.dippedPosts = {
        CurrentPage: 0,
        TotalItems: 0,
        Items: []
    };
    n.postType = "";
    var r = function(t) {
        return t === "drafts" ? n.draftPosts : t === "submissions" ? n.submissionPosts : t === "likes" ? n.dippedPosts : void 0
    };
    n.getPage = function() {
        var i = n.postType,
            u = r(n.postType);
        t({
            url: "/api/posts",
            method: "GET",
            params: {
                type: n.postType,
                page: u.CurrentPage,
                size: 20,
                userid: n.user.Id
            }
        }).success(function(t) {
            i === "drafts" ? n.draftPosts = t : i === "submissions" ? n.submissionPosts = t : i === "likes" && (n.dippedPosts = t)
        }).error(function() {
            alert("There was an error retrieving posts for " + i)
        })
    };
    n.PostEditUrl = function(n) {
        return "/admin/userposts/edit/" + n.Id
    };
    n.deletePost = function(n, i) {
        t({
            url: "/api/posts",
            method: "DELETE",
            params: {
                id: n.Id
            }
        }).success(function() {
            var t = r(i),
                u = _.findIndex(t.Items, function(t) {
                    return t.Id === n.Id
                });
            u != -1 && t.Items.splice(u, 1)
        }).error(function() {})
    };
    n.changePostType = function(t) {
        n.postType = t;
        t === "drafts" ? n.heading = "Drafts" : t === "submissions" ? n.heading = "Submitted Posts" : t === "likes" && (n.heading = "Dipped Posts");
        var i = r(n.postType);
        i.CurrentPage === 0 && (i.CurrentPage = 1, n.getPage())
    };
    n.user = {};
    t({
        url: "/api/v1/user/current",
        method: "GET"
    }).success(function(t) {
        n.user = t;
        n.changePostType("submissions")
    }).error(function() {})
}]);
theApp.controller("FooterContentCtrl", ["$scope", "$resource", function(n, t) {
    function i(n) {
        for (var i, r, t = n.length; t; i = Math.floor(Math.random() * t), r = n[--t], n[t] = n[i], n[i] = r);
        return n
    }
    var r = t("/api/v1/content/footer/:categoryId", {
        categoryId: "@categoryId"
    });
    n.getFooterContent = function(t, u, f) {
        r.query({
            categoryId: t,
            currentPostId: u,
            nextPostId: f
        }, function(t) {
            i(t);
            n.horizontalContent = t.slice(0, 4);
            n.verticalContent = t.slice(4, 6)
        }, function() {})
    }
}]);
theApp.controller("PostSubmissionCtrl", ["$scope", "$http", "GrowlFactory", "$window", function(n, t, i, r) {
    var u, f, e;
    n.loading = !1;
    n.post = {};
    n.submission = {};
    u = !1;
    n.loadPost = function(r) {
        t({
            url: "/api/postsubmission",
            method: "GET",
            params: {
                postId: r
            }
        }).success(function(t) {
            n.post = t
        }).error(function() {
            i.error("Uh-oh", "There was a problem retrieving your post. Contact admin or try again later.")
        })
    };
    window.setInterval(function() {
        u = !0;
        n.save()
    }, 3e5);
    f = function() {
        $("div.note-editable :not(div.videoWrapper) > iframe").wrap("<div class='videoWrapper'><\/div>");
        $("#post_description").val(localPost.Editor.PagedDescription());
        var t = {
                Description: $("#post_description").val(),
                Status: n.post.Status == 0 ? 1 : n.post.Status
            },
            i = $.extend({}, n.post, t);
        n.submission = i
    };
    e = function() {
        return t.post("/api/postsubmission/save", n.submission)
    };
    n.upload = function(t) {
        f();
        e().then(function(r) {
            var f, u, e;
            n.post = r.data;
            localPost.Editor.UpdateDescription(n.post.Description);
            f = new FormData;
            u = [];
            t === "collage" ? u = $("#collageImageUpload").get(0).files : t === "post" && (u = $("#postImageUpload").get(0).files);
            u.length > 0 && (f.append("UploadedImage", u[0]), e = $.ajax({
                type: "POST",
                url: "/api/postsubmission/imageupload/" + n.post.Id + "/post",
                contentType: !1,
                processData: !1,
                data: f
            }), e.success(function(t) {
                n.post = t;
                n.$apply();
                i.info("Saved!", "Image updated successfully")
            }), e.error(function() {
                i.error("Uh-oh", "There was a problem saving your post image.")
            }))
        }, function() {
            i.error("Uh-oh", "There was a problem saving your post image. Unable to sync post content")
        })
    };
    n.publish = function() {
        n.post.Status = 2;
        n.save()
    };
    n.unpublish = function() {
        n.post.Status = 1;
        n.save()
    };
    n.done = function(t) {
        f();
        e().then(function() {
            r.location.href = "/my-profile/" + t
        }, function() {
            i.error("Uh-oh", "There was a problem saving your post. Contact admin");
            n.loading = !1
        })
    };
    n.save = function() {
        f();
        n.submission.Description ? (n.loading = !0, e().then(function(t) {
            n.post = t.data;
            localPost.Editor.UpdateDescription(n.post.Description);
            u ? i.info("Saved!", "We put your post somewhere safe for you, just in case :)") : i.info("Saved!", "Your post was saved successfully");
            u = !1;
            n.loading = !1
        }, function(t) {
            t.status == 400 && t.data.Message ? i.error("Uh-oh", t.data.Message) : i.error("Uh-oh", "There was a problem saving your post. Contact admin or try again later.");
            n.loading = !1
        })) : i.info("Blank Post", "It appears you're trying to save a post with no content. Contact admin if this is not the case.")
    }
}]);
theApp.controller("PostController", ["$scope", "$http", "$route", "$routeParams", "$filter", "$cookieStore", "Posts", "Categories", "UserBoardPosts", "Users", "$q", "$timeout", "SwipedPosts", "CarouselImages", "$sce", function(n, t, i, r, u, f, e, o, s, h, c, l, a, v, y) {
    n.loading = e.posts.loading;
    n.posts = [];
    n.categories = o.query();
    n.sub_cats = o.getSubs();
    n.spotlight_swipes = a.spotlight();
    n.carousel_images = v.images();
    n.endOfResults = !1;
    n.postFlags = r.postFlags;
    n.query = r.q;
    n.CurrentUser = h.getLoggedIn();
    n.heading;
    n.UserLikes = s;
    n.getCarouselImageUrl = function(n) {
        var t = $(window).width() <= 767;
        return t ? n.ImageMediumUrl : n.ImageUrl
    };
    n.$on("gotPosts", function() {
        n.posts = e.posts.items;
        n.posts.Count = e.posts.TotalItems;
        n.endOfResults = e.posts.end_of_results;
        n.loading = e.posts.loading
    });
    n.getPosts = function() {
        n.loading || n.endOfResults || (n.loading = !0, e.getPosts(i.current.extras.post_type, !1))
    };
    n.PageHeading = function() {
        var t, f;
        if (r.cat_slug) {
            if (typeof n.heading != "undefined") return n.heading;
            n.categories.$resolved && n.sub_cats.$resolved && (t = u("exact")(n.categories, {
                Slug: r.cat_slug
            })[0], r.sub_slug && (f = u("exact")(n.sub_cats, {
                Slug: r.sub_slug
            })[0]), n.heading = typeof f == "undefined" ? y.trustAsHtml(typeof t == "undefined" ? "" : t.Name) : y.trustAsHtml((typeof t == "undefined" ? "" : "<a class='breadcrumbLink' href=/c/" + t.Slug + ">" + t.Name + "<\/a>") + (typeof f == "undefined" ? "" : " <i class='fa fa-caret-right text-muted breadcrumbArrow'><\/i> <div class='breadcrumbSub'>" + f.Name + "<\/div>")))
        } else if (i.current.extras && i.current.extras.post_type === "videos") {
            if (typeof n.heading != "undefined") return n.heading;
            n.heading = y.trustAsHtml("Videos")
        }
    };
    n.CategoryName = function(t) {
        var i;
        if (t.SubCategoryId && t.SubCategoryId > 0) {
            if (i = u("exact")(n.sub_cats, {
                    Id: t.SubCategoryId
                })[0], typeof i != "undefined") return i.Name
        } else if (t.CategoryId > 0 && (i = u("exact")(n.categories, {
                Id: t.CategoryId
            })[0], typeof i != "undefined")) return i.Name;
        return "Diply"
    };
    n.OriginalUsername = e.OriginalUsername;
    n.OriginalUsername2 = e.OriginalUsername2;
    n.TileClass = function(t) {
        var r = n.posts.indexOf(t),
            i;
        if (r < 0) return "col-md-4 col-sm-6 grid-tile";
        for (i = [], i[0] = "col-md-4 col-sm-6", i[1] = "col-md-4 col-sm-6", i[2] = "col-md-4 col-sm-6", i[3] = "col-md-4 col-sm-6", i[4] = "col-md-4 col-sm-6"; r > 4;) r -= 5;
        return i[r] + " grid-tile"
    };
    n.TileImage = function(t) {
        return n.IsHomepage() ? t.CollageImageUrl ? t.CollageImageUrl : t.ImageUrl : n.TileClass(t).indexOf("col-sm-3") > -1 ? t.ThumbUrl : t.MediumThumbUrl
    };
    n.ShowFlag = function(t) {
        var i, r, u, f;
        if (!n.IsHomepage()) return !1;
        for (i = n.posts.indexOf(t), r = i, u = i - 1;; u--) {
            if (r === 0) break;
            if (f = n.posts[u], f.BrandId === t.BrandId) r = u;
            else break
        }
        return r === i ? !0 : !1
    };
    n.SwipePost = function(n) {
        window.location.href = "/userposts/swipe/" + n
    };
    n.ToggleUserPostsCookie = function() {
        var t = !n.searchoptions.includeuserposts;
        f.put("IncludeUserPosts", t, {
            expires: 365
        });
        n.searchoptions.includeuserposts = t;
        n.endOfResults = !1;
        n.getPosts()
    };
    n.PostsInGroup = function(t) {
        if (!r.cat_slug) return !0;
        var i = u("exact")(n.categories, {
            Slug: r.cat_slug
        })[0];
        return t.CategoryId === i.Id
    };
    n.ShopCategoryActive = function(n) {
        if (n === r.cat_slug) return "active"
    };
    n.WrapperClasses = function() {
        return n.IsHomepage() ? "col-md-7 col-md-offset-1 col-sm-11 col-sm-offset-1" : "col-lg-10 col-lg-offset-1 col-md-12 gridPage"
    };
    n.IsHomepage = function() {
        return !r.brand_slug && !r.cat_slug && i.current.$$route.extras.post_type != "videos"
    };
    n.IsAnon = function() {
        return !n.CurrentUser.Id && n.CurrentUser.$resolved
    };
    n.ShopFill = function() {
        n.shopPosts.length < 9 && n.getPosts()
    }
}]);
theApp.controller("PostDetailController", ["$scope", "$filter", "$route", "UserBoardPosts", "Posts", "Categories", "Users", "$cookieStore", function(n, t, i, r, u, f, e, o) {
    n.is_next = !0;
    n.fblike = {
        show: typeof o.get("facebook_like_show") != "undefined" ? o.get("facebook_like_show") : !0
    };
    n.categories = f.query();
    n.sub_cats = f.getSubs();
    n.Users = [];
    n.OrigPosts = [];
    n.UserLikes = r;
    n.SwipePost = function(n) {
        window.location.href = "/userposts/swipe/" + n
    };
    n.BrandName = function(i) {
        var r;
        return r = t("exact")(n.brands, {
            Id: i
        })[0], r == undefined ? "" : r.Name
    };
    n.AbsoluteURI = function(n) {
        return baseUrl + n
    };
    n.NextPost = function(t) {
        var f = u.posts.items.indexOf(t),
            r = f + 1,
            i = u.posts.items[r];
        if (r === u.posts.items.length && u.getPosts(), i) return "/" + i.PublicationSlug + "/" + i.slug + "/" + i.Id;
        n.is_next = !1
    };
    n.CloseFacebookLike = function() {
        o.put("facebook_like_show", !1, {
            expires: 365
        })
    };
    n.CloseFacebookLikeAndShowShareButtons = function() {
        o.put("facebook_like_show", !1, {
            expires: 365
        });
        $(".fbPageAlert").hide();
        $("#bottom-social-share-buttons").show()
    };
    n.CloseFacebookLikeAndShowShareButtonsNoCookie = function() {
        $(".fbPageAlert").hide();
        $("#bottom-social-share-buttons").show()
    };
    n.ShowFacebookLike = function() {
        $(".fbPageAlert").show();
        $("#bottom-social-share-buttons").hide()
    };
    n.ReportPost = function(n) {
        $("#btnSendReport").attr("disabled", "disabled");
        var i = $("#txtAdditionalInfo").val(),
            r = $("#reportBody :input[type=checkbox]").serializeArray(),
            t = 0;
        $.each(r, function(n, i) {
            t += parseInt(i.value)
        });
        u.reportPost({
            id: n,
            reasons: t,
            details: i
        }, function() {
            $("#report").modal("toggle");
            $("#txtAdditionalInfo").val("");
            var n = $("#reportBody :input[type=checkbox]");
            $.each(n, function(n, t) {
                $(t).removeAttr("checked")
            });
            $("#btnSendReport").removeAttr("disabled")
        })
    };
    n.CategoryName = function(i) {
        var r;
        if (i.SubCategoryId && i.SubCategoryId > 0) {
            if (r = t("exact")(n.sub_cats, {
                    Id: i.SubCategoryId
                })[0], typeof r != "undefined") return r.Name
        } else if (i.CategoryId > 0 && (r = t("exact")(n.categories, {
                Id: i.CategoryId
            })[0], typeof r != "undefined")) return r.Name;
        return "Diply"
    };
    n.PostUsername = function(t) {
        var i = n.OrigPosts[t.OriginalPostId],
            r;
        if (i) {
            if (i.$resolved)
                if (r = n.Users[i.UserID], r) {
                    if (r.$resolved) return r.UserName
                } else n.Users[i.UserID] = e.get({
                    id: i.UserID
                })
        } else n.OrigPosts[t.OriginalPostId] = u.get({
            id: t.OriginalPostId
        })
    }
}]);
theApp.controller("NavController", ["$scope", "$window", "$filter", "Categories", "Posts", "$rootScope", "PageMeta", "$location", function(n, t, i, r, u) {
    n.subposts = [];
    n.subcats = [];
    n.cats = r.query(function() {
        n.subcats = r.getSubs({
            allsubs: !0
        }, function() {
            $.each(n.cats, function(t, r) {
                var u = i("exact")(n.subcats, {
                    ParentCategoryId: r.Id
                });
                r.subCategories = u ? u : []
            });
            n.subposts = u.getSubPosts({
                size: 9,
                page: 1
            }, function() {
                var t, r;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                    for (t in n.subposts)
                        for (r in n.subposts[t].Posts) n.subposts[t].Posts[r].ImageUrl = null, n.subposts[t].Posts[r].ThumbUrl = null, n.subposts[t].Posts[r].MediumThumbUrl = null, n.subposts[t].Posts[r].SmallThumbUrl = null, n.subposts[t].Posts[r].CollageImageUrl = null;
                $.each(n.subcats, function(t, r) {
                    var u = i("exact")(n.subposts, {
                        CategoryId: r.Id
                    })[0];
                    u && (r.posts = u.Posts)
                })
            })
        })
    });
    n.query = {
        term: ""
    };
    n.isNavActive = function(n) {
        var i = t.location.href.indexOf(n) > -1;
        return i ? "active" : ""
    };
    n.getThumbUrl = function(n) {
        return n.SmallThumbUrl ? n.SmallThumbUrl : n.ThumbUrl
    };
    n.isMegaMenu = function(n) {
        return n.subCategories && n.subCategories.length > 0 ? "dropdown-mega" : ""
    };
    n.SearchKey = function(t) {
        t.keyCode === 13 && n.Search()
    };
    var f = function(n) {
        return /\S+@\S+\.\S+/.test(n)
    };
    n.Search = function() {
        f(n.query.term) || (t.location.href = "/search?q=" + window.escape(n.query.term))
    }
}]);
theApp.controller("AdminController", ["$scope", "Posts", "Users", "$route", function(n, t, i) {
    n.markPost = function(n, i) {
        t.markPost({
            id: n
        }, function() {
            i.target.tagName === "I" ? (i.target.classList.toggle("fa-flag"), i.target.classList.toggle("fa-flag-o"), i.target.parentElement.classList.toggle("btn-mark-edit"), i.target.parentElement.classList.toggle("btn-default")) : (i.target.firstElementChild.classList.toggle("fa-flag"), i.target.firstElementChild.classList.toggle("fa-flag-o"), i.target.classList.toggle("btn-mark-edit"), i.target.classList.toggle("btn-default"))
        })
    };
    n.toggleFeatured = function(n, i) {
        t.featureToggle({
            id: n
        }, function() {
            i.target.tagName === "I" ? i.target.parentElement.classList.toggle("btn-warning") : i.target.classList.toggle("btn-warning")
        })
    };
    n.toggleRole = function(n, t, r) {
        i.toggleUserRole({
            userName: n,
            roleName: t,
            activate: r.target.checked
        }, function() {
            r.target.checked === !0 && (t === "Moderator" || t === "Accountant" || t === "Curator") && location.reload()
        })
    };
    n.toggleVerified = function(n, t) {
        i.toggleVerified({
            id: n
        }, function() {
            t.target.children[0].classList.toggle("inactive")
        })
    }
}]);
theApp.controller("HeadController", ["$scope", "PageMeta", function(n, t) {
    n.PageMeta = t
}]);
theApp.factory("Posts", ["$resource", "$filter", "$rootScope", "$route", "Users", function(n, t, i, r, u) {
    function e() {
        return {
            items: [],
            current_page: 0,
            next_page: 1,
            end_of_results: !1,
            loading: !1
        }
    }
    var f = n("/api/posts/:id/", {
        id: "@id"
    }, {
        markPost: {
            method: "PUT",
            params: {
                state: !0,
                type: "mark",
                params: {
                    includeUserPosts: !1
                }
            }
        },
        featureToggle: {
            method: "PUT",
            params: {
                state: !0,
                type: "feature",
                includeUserPosts: !1
            }
        },
        userLikes: {
            method: "GET",
            params: {
                type: "likes"
            }
        },
        userSubmissions: {
            method: "GET",
            params: {
                type: "submissions"
            }
        },
        userCombined: {
            method: "GET",
            params: {
                type: "all"
            }
        },
        get: {
            method: "GET",
            isArray: !1
        },
        reportPost: {
            method: "PUT",
            params: {
                postId: "@id",
                reportReasons: "@reasons",
                additionalInfo: "@details",
                includeUserPosts: !1
            }
        },
        recommendedPosts: {
            method: "GET",
            params: {
                size: 9,
                page: 1,
                includeUserPosts: !1,
                featured: !0
            }
        },
        getSubPosts: {
            method: "GET",
            url: "/api/posts/GetRecentSubPosts/",
            isArray: !0,
            cache: !0,
            params: {
                size: 9,
                page: 1
            }
        }
    });
    return f.posts = e(), f.scope = i, f.OrigPosts = [], f.OrigUsers = [], f.current_post_type = "", f.current_params = "", f.user_posts = "", f.getPost = function(n) {
        var i = t("exact")(this.posts.items, {
            Id: parseInt(n)
        })[0];
        return i ? i : new f.get({
            Id: n
        })
    }, f.getPosts = function(n, t) {
        if (n != "detail" && (n != f.current_post_type || f.current_params != r.current.params && n != "shop" || f.user_posts != t) && (f.current_post_type = n, f.current_params = r.current != "undefined" ? r.current.params : "", f.user_posts = t, f.posts = e()), f.posts.loading || f.posts.end_of_results) {
            f.scope.$broadcast("gotPosts");
            return
        }
        f.posts.loading = !0;
        var i = {
            size: n === "search" ? 30 : 9,
            page: f.posts.next_page,
            includeUserPosts: f.user_posts || !1
        };
        n === "featured" ? i.featured = !0 : n === "shop" ? i.store = !0 : n === "search" ? i.query = r.current.params.q : n === "brand" || n === "category" || n === "subcat" ? (i.slug = r.current.params.brand_slug || "", i.catslug = r.current.params.cat_slug || "", i.subslug = r.current.params.sub_slug || "") : n === "videos" && (i.videos = !0, delete i.includeUserPosts);
        f.get(i, function(n) {
            f.posts.current_page = n.CurrentPage;
            f.posts.next_page = n.CurrentPage + 1;
            f.posts.items = f.posts.items.concat(n.Items);
            f.posts.end_of_results = f.posts.next_page > n.TotalPages || n.CurrentPage >= 10;
            f.posts.total_pages = n.TotalPages;
            f.posts.TotalItems = n.TotalItems;
            f.posts.loading = !1;
            f.scope.$broadcast("gotPosts")
        })
    }, f.OriginalUsername = function(n) {
        var t, i, r;
        if (n.OriginalPostId)
            if (t = f.OrigPosts[n.OriginalPostId], t) {
                if (t.$resolved) {
                    if (t.BrandId > 0) return "";
                    if (i = f.OrigUsers[t.UserID], i) {
                        if (i.$resolved) return i.UserName
                    } else f.OrigUsers[t.UserID] = u.get({
                        id: t.UserID
                    })
                }
            } else r = f.posts[n.OriginalPostId], f.OrigPosts[n.OriginalPostId] = r ? r : f.get({
                id: n.OriginalPostId
            })
    }, f.OriginalUsername2 = function(n) {
        var t = f.OrigPosts[n.OriginalPostId],
            i;
        if (t) {
            if (t.$resolved)
                if (i = f.OrigUsers[t.UserID], i) {
                    if (i.$resolved) return i.UserName
                } else f.OrigUsers[t.UserID] = u.get({
                    id: t.UserID
                })
        } else f.OrigPosts[n.OriginalPostId] = f.get({
            id: n.OriginalPostId
        })
    }, f.PostUrl = function(n) {
        return "//" + window.location.host + "/" + n.Url
    }, f.EncodedUrl = function(n) {
        var t = f.PostUrl(n);
        return encodeURIComponent(t)
    }, f
}]);
theApp.factory("Categories", ["$resource", function(n) {
    return n("/api/categories/", {}, {
        query: {
            method: "GET",
            isArray: !0,
            cache: !0
        },
        getSubs: {
            method: "GET",
            isArray: !0,
            cache: !0,
            params: {
                allsubs: !0
            }
        }
    })
}]);
theApp.factory("UserBoardPosts", ["$resource", "$cacheFactory", "$filter", function(n, t, i) {
    var r = {},
        u = t("userLikes");
    return r.resource = n("/api/userboardposts", {}, {
        toggle: {
            method: "POST",
            params: {
                boardid: "@boardid",
                postid: "@postid"
            }
        },
        forUser: {
            method: "GET",
            params: {
                forUser: !0
            },
            isArray: !0
        }
    }), r.user_likes = function() {
        var n = u.get("likes");
        return n || (n = r.resource.forUser(), u.put("likes", n)), n
    }, r.LikeStatus = function(n) {
        var t = i("exact")(r.user_likes(), {
            PostId: n.Id
        }).length;
        return t > 0 ? "active" : ""
    }, r.LikePost = function(n) {
        var t = u.get("likes"),
            f = i("exact")(r.user_likes(), {
                PostId: n.Id
            });
        r.resource.toggle({
            boardid: "",
            postid: n.Id
        });
        f.length ? t.splice(t.indexOf(f[0]), 1) : t.push({
            PostId: n.Id,
            BoardId: "null",
            UserId: 0,
            CreatedAt: "null"
        });
        u.put("likes", t)
    }, r
}]);
theApp.factory("Users", ["$resource", function(n) {
    return n("/api/users/:id/", {
        id: "@id"
    }, {
        get: {
            method: "GET",
            cache: !0
        },
        getLoggedIn: {
            method: "GET",
            cache: !0,
            params: {
                currentUser: !0
            }
        },
        toggleUserRole: {
            method: "PUT",
            params: {
                userName: "@userName",
                roleName: "@roleName",
                activate: "@activate"
            }
        },
        toggleVerified: {
            method: "PUT",
            params: {
                toggle_ver: "1"
            }
        }
    })
}]);
theApp.factory("SwipedPosts", ["$resource", function(n) {
    return n("/api/swipe", {}, {
        spotlight: {
            method: "GET",
            params: {
                spotlight: "true"
            },
            isArray: !0
        }
    })
}]);
theApp.factory("CarouselImages", ["$resource", function(n) {
    return n("/api/carousel", {}, {
        images: {
            method: "GET",
            isArray: !0,
            cache: !0
        }
    })
}]);
theApp.factory("PageMeta", function() {
    var n, t, i;
    return {
        title: function() {
            return n || document.title
        },
        description: function() {
            return t || document.description
        },
        keywords: function() {
            return i
        },
        setTitle: function(t) {
            n = t
        },
        set: function(r, u, f) {
            n = r;
            t = u;
            i = f
        }
    }
});
theApp.factory("Taboola", function() {
    return $resource("//api.taboola.com/1.1/json/##apiKey##/:operation", {
        operation: "@operation",
        "app.type": "web"
    }, {
        get: {
            method: "GET",
            isArray: !0
        }
    })
});
theApp.filter("fromNow", function() {
    return function(n) {
        return moment.utc(n).fromNow()
    }
});
theApp.filter("exact", function() {
    return function(n, t) {
        var u = [],
            i, r = !0;
        return (angular.forEach(t, function(n) {
            r = r && !n
        }), r) ? n : (angular.forEach(n, function(n) {
            i = !0;
            angular.forEach(t, function(t, r) {
                !t || (i = i && n[r] === t)
            });
            i && u.push(n)
        }), u)
    }
});
theApp.directive("hrefReload", ["$location", "$route", "$filter", function(n, t) {
    return function(i, r, u) {
        i.$watch("hrefReload", function() {
            u.hrefReload && (r.attr("href", u.hrefReload), r.bind("click", function() {
                i.$apply(function() {
                    n.path() == u.hrefReload && t.reload()
                })
            }))
        })
    }
}]);
theApp.directive("fbLike", function() {
    return {
        restrict: "E",
        link: function() {
            typeof FB != "undefined" && FB.XFBML.parse()
        }
    }
});
theApp.directive("adSense", function() {
    return {
        restrict: "A",
        transclude: !0,
        replace: !0,
        template: "<div data-ng-transclude><\/div>",
        link: function() {}
    }
});
theApp.directive("morePostsIn", ["Posts", "$filter", function(n, t) {
    return {
        restrict: "A",
        replace: !0,
        templateUrl: "/content/static/ng-templates/partials/more_posts_in_v2.html?" + build_id,
        link: function(i, r, u) {
            i.category = i.$eval(u.morePostsIn);
            i.subcat = i.$eval(u.morePostsInSubcat);
            i.cat = function() {
                return typeof i.subcat != "undefined" ? i.subcat : i.category
            };
            i.SendEvent = function(n) {
                ga("send", "event", {
                    eventCategory: "More Posts",
                    eventAction: "Recommended",
                    eventLabel: "Recommended " + (n + 1),
                    eventValue: n
                })
            };
            var f = {
                size: 9,
                page: 1,
                includeUserPosts: !1,
                catslug: i.category.Slug,
                subslug: i.subcat.Slug,
                slug: ""
            };
            n.get(f, function(r) {
                i.more_posts_page1 = r.Items;
                f.page = 2;
                n.get(f, function(n) {
                    var r = i.more_posts_page1.concat(n.Items).sort(function() {
                            return .5 - Math.random()
                        }),
                        f = t("filter")(r, {
                            Id: "!" + u.currentPostId
                        }),
                        e = t("filter")(f, {
                            Id: "!" + u.nextPostId
                        }),
                        o = t("filter")(e, {
                            Id: "!" + u.prevPostId
                        });
                    i.more_posts = o
                })
            })
        }
    }
}]);
theApp.directive("recPosts", ["Posts", "$filter", function(n, t) {
    return {
        restrict: "A",
        replace: !0,
        templateUrl: "/content/static/ng-templates/partials/recommended_posts.html?" + build_id,
        link: function(i, r, u) {
            i.SendEvent = function(n) {
                ga("send", "event", {
                    eventCategory: "More Posts",
                    eventAction: "Related",
                    eventLabel: "Related " + (n + 1),
                    eventValue: n
                })
            };
            n.recommendedPosts(function(n) {
                i.recommended_posts = t("filter")(n.Items, {
                    Id: "!" + u.currentPostId
                })
            })
        }
    }
}]);
theApp.directive("closeNav", function() {
    return {
        restrict: "A",
        replace: !1,
        link: function(n, t) {
            t.bind("click", function() {
                $(".slide-right").toggleClass("open");
                $(".slide-left").toggleClass("open")
            })
        }
    }
});
theApp.directive("subCatHover", function() {
    return {
        restrict: "A",
        replace: !1,
        link: function(n, t) {
            t.bind("mouseenter mouseleave", function() {
                $($(this).data("target")).siblings("ul :not(.subcat)").addClass("hide").end().removeClass("hide");
                $(this).siblings("li").removeClass("active");
                $(this).addClass("active")
            })
        }
    }
});
theApp.directive("megaHover", function() {
    return {
        restrict: "A",
        replace: !1,
        link: function(n, t) {
            t.bind("mouseenter", function() {
                $(this).addClass("hover");
                $(this).find(".subcat .sub:first").addClass("active");
                $(this).find(".media-list:first").removeClass("hide")
            }).bind("mouseleave", function() {
                $(this).removeClass("hover");
                $(this).find(".subcat .sub").removeClass("active");
                $(this).find(".media-list").addClass("hide")
            })
        }
    }
});
theApp.directive("megaClick", function() {
    return {
        restrict: "A",
        replace: !1,
        link: function(n, t) {
            t.bind("click", function() {
                $(".hover").removeClass("hover")
            })
        }
    }
});
theApp.directive("repeatDone", function() {
    return function(n, t, i) {
        n.$last && n.$eval(i.repeatDone)
    }
});
theApp.directive("tweetShare", ["Posts", function(n) {
    return {
        restrict: "E",
        replace: !0,
        scope: {
            post: "="
        },
        template: '<a href="//twitter.com/intent/tweet?url={{ Url }}&text={{ post.Title }}&related=diply" target="_blank" class="btn btn-xs btn-link"><i class="fa fa-twitter fa-lg fa-fw"><\/i>Tweet<\/a>',
        link: function(t) {
            t.Url = n.EncodedUrl(t.post)
        }
    }
}]);
theApp.directive("facebookShare", ["Posts", function(n) {
    return {
        restrict: "E",
        replace: !0,
        scope: {
            post: "="
        },
        template: '<a class="btn btn-xs btn-link" target="_blank" onclick="return!window.open(this.href, \'Facebook\', \'width=550, height=420\')" href="//www.facebook.com/sharer/sharer.php?u={{ Url }}"><i class="fa fa-facebook-square fa-lg fa-fw"><\/i>Share<\/a>',
        link: function(t) {
            t.Url = n.EncodedUrl(t.post)
        }
    }
}]);
DeviceDetection = function(n) {
    this.ua;
    this.checks;
    this.construct = function(n) {
        if (typeof n == "undefined") var n = navigator.userAgent;
        this.ua = n;
        this.checks = {
            iphone: Boolean(n.match(/iPhone/)),
            ipod: Boolean(n.match(/iPod/)),
            ipad: Boolean(n.match(/iPad/)),
            blackberry: Boolean(n.match(/BlackBerry/)),
            playbook: Boolean(n.match(/PlayBook/)),
            android: Boolean(n.match(/Android/)),
            macOS: Boolean(n.match(/Mac OS X/)),
            win: Boolean(n.match(/Windows/)),
            mac: Boolean(n.match(/Macintosh/)),
            wphone: Boolean(n.match(/(Windows Phone OS|Windows CE|Windows Mobile)/)),
            mobile: Boolean(n.match(/Mobile/)),
            androidTablet: Boolean(n.match(/(GT-P1000|SGH-T849|SHW-M180S)/)),
            tabletPc: Boolean(n.match(/Tablet PC/)),
            palmDevice: Boolean(n.match(/(PalmOS|PalmSource| Pre\/)/)),
            kindle: Boolean(n.match(/(Kindle)/)),
            otherMobileHints: Boolean(n.match(/(Opera Mini|IEMobile|SonyEricsson|smartphone)/))
        }
    };
    this.isTouchDevice = function() {
        return this.checks.iphone || this.checks.ipod || this.checks.ipad
    };
    this.isApple = function() {
        return this.checks.iphone || this.checks.ipod || this.checks.ipad || this.checks.macOS || this.checks.mac
    };
    this.isBlackberry = function() {
        return this.checks.blackberry
    };
    this.isAndroid = function() {
        return this.checks.android
    };
    this.isTablet = function() {
        return this.checks.ipad || this.checks.tabletPc || this.checks.playbook || this.checks.androidTablet || this.checks.kindle
    };
    this.isDesktop = function() {
        return !this.isTouchDevice() && !this.isSmartPhone() && !this.isTablet()
    };
    this.isSmartPhone = function() {
        return (this.checks.mobile || this.checks.blackberry || this.checks.palmDevice || this.checks.otherMobileHints) && !this.isTablet() && !this.checks.ipod
    };
    this.construct(n)
};
CryptoJS = CryptoJS || function(n, t) {
        var u = {},
            f = u.lib = {},
            o = function() {},
            i = f.Base = {
                extend: function(n) {
                    o.prototype = this;
                    var t = new o;
                    return n && t.mixIn(n), t.hasOwnProperty("init") || (t.init = function() {
                        t.$super.init.apply(this, arguments)
                    }), t.init.prototype = t, t.$super = this, t
                },
                create: function() {
                    var n = this.extend();
                    return n.init.apply(n, arguments), n
                },
                init: function() {},
                mixIn: function(n) {
                    for (var t in n) n.hasOwnProperty(t) && (this[t] = n[t]);
                    n.hasOwnProperty("toString") && (this.toString = n.toString)
                },
                clone: function() {
                    return this.init.prototype.extend(this)
                }
            },
            r = f.WordArray = i.extend({
                init: function(n, i) {
                    n = this.words = n || [];
                    this.sigBytes = i != t ? i : 4 * n.length
                },
                toString: function(n) {
                    return (n || l).stringify(this)
                },
                concat: function(n) {
                    var i = this.words,
                        r = n.words,
                        u = this.sigBytes,
                        t;
                    if (n = n.sigBytes, this.clamp(), u % 4)
                        for (t = 0; t < n; t++) i[u + t >>> 2] |= (r[t >>> 2] >>> 24 - 8 * (t % 4) & 255) << 24 - 8 * ((u + t) % 4);
                    else if (65535 < r.length)
                        for (t = 0; t < n; t += 4) i[u + t >>> 2] = r[t >>> 2];
                    else i.push.apply(i, r);
                    return this.sigBytes += n, this
                },
                clamp: function() {
                    var i = this.words,
                        t = this.sigBytes;
                    i[t >>> 2] &= 4294967295 << 32 - 8 * (t % 4);
                    i.length = n.ceil(t / 4)
                },
                clone: function() {
                    var n = i.clone.call(this);
                    return n.words = this.words.slice(0), n
                },
                random: function(t) {
                    for (var i = [], u = 0; u < t; u += 4) i.push(4294967296 * n.random() | 0);
                    return new r.init(i, t)
                }
            }),
            e = u.enc = {},
            l = e.Hex = {
                stringify: function(n) {
                    var u = n.words,
                        i, t, r;
                    for (n = n.sigBytes, i = [], t = 0; t < n; t++) r = u[t >>> 2] >>> 24 - 8 * (t % 4) & 255, i.push((r >>> 4).toString(16)), i.push((r & 15).toString(16));
                    return i.join("")
                },
                parse: function(n) {
                    for (var i = n.length, u = [], t = 0; t < i; t += 2) u[t >>> 3] |= parseInt(n.substr(t, 2), 16) << 24 - 4 * (t % 8);
                    return new r.init(u, i / 2)
                }
            },
            s = e.Latin1 = {
                stringify: function(n) {
                    var r = n.words,
                        i, t;
                    for (n = n.sigBytes, i = [], t = 0; t < n; t++) i.push(String.fromCharCode(r[t >>> 2] >>> 24 - 8 * (t % 4) & 255));
                    return i.join("")
                },
                parse: function(n) {
                    for (var i = n.length, u = [], t = 0; t < i; t++) u[t >>> 2] |= (n.charCodeAt(t) & 255) << 24 - 8 * (t % 4);
                    return new r.init(u, i)
                }
            },
            a = e.Utf8 = {
                stringify: function(n) {
                    try {
                        return decodeURIComponent(escape(s.stringify(n)))
                    } catch (t) {
                        throw Error("Malformed UTF-8 data");
                    }
                },
                parse: function(n) {
                    return s.parse(unescape(encodeURIComponent(n)))
                }
            },
            h = f.BufferedBlockAlgorithm = i.extend({
                reset: function() {
                    this._data = new r.init;
                    this._nDataBytes = 0
                },
                _append: function(n) {
                    "string" == typeof n && (n = a.parse(n));
                    this._data.concat(n);
                    this._nDataBytes += n.sigBytes
                },
                _process: function(t) {
                    var f = this._data,
                        s = f.words,
                        u = f.sigBytes,
                        e = this.blockSize,
                        o = u / (4 * e),
                        o = t ? n.ceil(o) : n.max((o | 0) - this._minBufferSize, 0),
                        i;
                    if (t = o * e, u = n.min(4 * t, u), t) {
                        for (i = 0; i < t; i += e) this._doProcessBlock(s, i);
                        i = s.splice(0, t);
                        f.sigBytes -= u
                    }
                    return new r.init(i, u)
                },
                clone: function() {
                    var n = i.clone.call(this);
                    return n._data = this._data.clone(), n
                },
                _minBufferSize: 0
            }),
            c;
        return f.Hasher = h.extend({
            cfg: i.extend(),
            init: function(n) {
                this.cfg = this.cfg.extend(n);
                this.reset()
            },
            reset: function() {
                h.reset.call(this);
                this._doReset()
            },
            update: function(n) {
                return this._append(n), this._process(), this
            },
            finalize: function(n) {
                return n && this._append(n), this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(n) {
                return function(t, i) {
                    return new n.init(i).finalize(t)
                }
            },
            _createHmacHelper: function(n) {
                return function(t, i) {
                    return new c.HMAC.init(n, i).finalize(t)
                }
            }
        }), c = u.algo = {}, u
    }(Math),
    function(n) {
        for (var r, a, s, t, f = CryptoJS, i = f.lib, v = i.WordArray, e = i.Hasher, i = f.algo, h = [], c = [], l = function(n) {
                return 4294967296 * (n - (n | 0)) | 0
            }, o = 2, u = 0; 64 > u;) {
            n: {
                for (r = o, a = n.sqrt(r), s = 2; s <= a; s++)
                    if (!(r % s)) {
                        r = !1;
                        break n
                    }
                r = !0
            }
            r && (8 > u && (h[u] = l(n.pow(o, .5))), c[u] = l(n.pow(o, 1 / 3)), u++);o++
        }
        t = [];
        i = i.SHA256 = e.extend({
            _doReset: function() {
                this._hash = new v.init(h.slice(0))
            },
            _doProcessBlock: function(n, i) {
                for (var o, s, r = this._hash.words, f = r[0], h = r[1], l = r[2], y = r[3], e = r[4], a = r[5], v = r[6], p = r[7], u = 0; 64 > u; u++) 16 > u ? t[u] = n[i + u] | 0 : (o = t[u - 15], s = t[u - 2], t[u] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + t[u - 7] + ((s << 15 | s >>> 17) ^ (s << 13 | s >>> 19) ^ s >>> 10) + t[u - 16]), o = p + ((e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25)) + (e & a ^ ~e & v) + c[u] + t[u], s = ((f << 30 | f >>> 2) ^ (f << 19 | f >>> 13) ^ (f << 10 | f >>> 22)) + (f & h ^ f & l ^ h & l), p = v, v = a, a = e, e = y + o | 0, y = l, l = h, h = f, f = o + s | 0;
                r[0] = r[0] + f | 0;
                r[1] = r[1] + h | 0;
                r[2] = r[2] + l | 0;
                r[3] = r[3] + y | 0;
                r[4] = r[4] + e | 0;
                r[5] = r[5] + a | 0;
                r[6] = r[6] + v | 0;
                r[7] = r[7] + p | 0
            },
            _doFinalize: function() {
                var r = this._data,
                    t = r.words,
                    u = 8 * this._nDataBytes,
                    i = 8 * r.sigBytes;
                return t[i >>> 5] |= 128 << 24 - i % 32, t[(i + 64 >>> 9 << 4) + 14] = n.floor(u / 4294967296), t[(i + 64 >>> 9 << 4) + 15] = u, r.sigBytes = 4 * t.length, this._process(), this._hash
            },
            clone: function() {
                var n = e.clone.call(this);
                return n._hash = this._hash.clone(), n
            }
        });
        f.SHA256 = e._createHelper(i);
        f.HmacSHA256 = e._createHmacHelper(i)
    }(Math),
    function() {
        var n = CryptoJS,
            t = n.enc.Utf8;
        n.algo.HMAC = n.lib.Base.extend({
            init: function(n, i) {
                var u, f;
                n = this._hasher = new n.init;
                "string" == typeof i && (i = t.parse(i));
                u = n.blockSize;
                f = 4 * u;
                i.sigBytes > f && (i = n.finalize(i));
                i.clamp();
                for (var e = this._oKey = i.clone(), o = this._iKey = i.clone(), s = e.words, h = o.words, r = 0; r < u; r++) s[r] ^= 1549556828, h[r] ^= 909522486;
                e.sigBytes = o.sigBytes = f;
                this.reset()
            },
            reset: function() {
                var n = this._hasher;
                n.reset();
                n.update(this._iKey)
            },
            update: function(n) {
                return this._hasher.update(n), this
            },
            finalize: function(n) {
                var t = this._hasher;
                return n = t.finalize(n), t.reset(), t.finalize(this._oKey.clone().concat(n))
            }
        })
    }(),
    function() {
        var n = CryptoJS,
            t = n.lib.WordArray;
        n.enc.Base64 = {
            stringify: function(n) {
                var i = n.words,
                    u = n.sigBytes,
                    f = this._map,
                    t, e, r;
                for (n.clamp(), n = [], t = 0; t < u; t += 3)
                    for (e = (i[t >>> 2] >>> 24 - 8 * (t % 4) & 255) << 16 | (i[t + 1 >>> 2] >>> 24 - 8 * ((t + 1) % 4) & 255) << 8 | i[t + 2 >>> 2] >>> 24 - 8 * ((t + 2) % 4) & 255, r = 0; 4 > r && t + .75 * r < u; r++) n.push(f.charAt(e >>> 6 * (3 - r) & 63));
                if (i = f.charAt(64))
                    for (; n.length % 4;) n.push(i);
                return n.join("")
            },
            parse: function(n) {
                var e = n.length,
                    f = this._map,
                    i = f.charAt(64),
                    o, s;
                i && (i = n.indexOf(i), -1 != i && (e = i));
                for (var i = [], u = 0, r = 0; r < e; r++) r % 4 && (o = f.indexOf(n.charAt(r - 1)) << 2 * (r % 4), s = f.indexOf(n.charAt(r)) >>> 6 - 2 * (r % 4), i[u >>> 2] |= (o | s) << 24 - 8 * (u % 4), u++);
                return t.create(i, u)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }();
EventHub = {};
EventHub.init = function(n, t) {
    this.serviceBusUri = n;
    this.serviceBusHubName = t
};
EventHub.send = function(n) {
    $.ajax({
        type: "GET",
        url: "//" + window.location.host + "/api/v1/hub/GetSasToken",
        cache: !1,
        success: function(t) {
            $.ajax({
                type: "POST",
                url: EventHub.serviceBusUri + EventHub.serviceBusHubName + "/messages/?timeout=60",
                data: JSON.stringify(n),
                cache: !1,
                contentType: "application/json",
                beforeSend: function(n) {
                    n.setRequestHeader("Authorization", t.sasKey);
                    n.setRequestHeader("Content-Type", "application/json");
                    n.setRequestHeader("Access-Control-Allow-Credentials", "true");
                    n.setRequestHeader("Access-Control-Allow-Origin", "true")
                }
            })
        }.bind()
    })
};
! function(n, t, i) {
    var r = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = i(r) : "function" == typeof define && define.amd ? define(function() {
        return t[n] = i(r)
    }) : t[n] = i(r)
}("enquire", this, function(n) {
    "use strict";

    function t(n, t) {
        var r, i = 0,
            u = n.length;
        for (i; u > i && (r = t(n[i], i), r !== !1); i++);
    }

    function e(n) {
        return "[object Array]" === Object.prototype.toString.apply(n)
    }

    function i(n) {
        return "function" == typeof n
    }

    function r(n) {
        this.options = n;
        n.deferSetup || this.setup()
    }

    function u(t, i) {
        this.query = t;
        this.isUnconditional = i;
        this.handlers = [];
        this.mql = n(t);
        var r = this;
        this.listener = function(n) {
            r.mql = n;
            r.assess()
        };
        this.mql.addListener(this.listener)
    }

    function f() {
        if (!n) throw new Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {};
        this.browserIsIncapable = !n("only all").matches
    }
    return r.prototype = {
        setup: function() {
            this.options.setup && this.options.setup();
            this.initialised = !0
        },
        on: function() {
            this.initialised || this.setup();
            this.options.match && this.options.match()
        },
        off: function() {
            this.options.unmatch && this.options.unmatch()
        },
        destroy: function() {
            this.options.destroy ? this.options.destroy() : this.off()
        },
        equals: function(n) {
            return this.options === n || this.options.match === n
        }
    }, u.prototype = {
        addHandler: function(n) {
            var t = new r(n);
            this.handlers.push(t);
            this.matches() && t.on()
        },
        removeHandler: function(n) {
            var i = this.handlers;
            t(i, function(t, r) {
                if (t.equals(n)) return (t.destroy(), !i.splice(r, 1))
            })
        },
        matches: function() {
            return this.mql.matches || this.isUnconditional
        },
        clear: function() {
            t(this.handlers, function(n) {
                n.destroy()
            });
            this.mql.removeListener(this.listener);
            this.handlers.length = 0
        },
        assess: function() {
            var n = this.matches() ? "on" : "off";
            t(this.handlers, function(t) {
                t[n]()
            })
        }
    }, f.prototype = {
        register: function(n, r, f) {
            var o = this.queries,
                s = f && this.browserIsIncapable;
            return o[n] || (o[n] = new u(n, s)), i(r) && (r = {
                match: r
            }), e(r) || (r = [r]), t(r, function(t) {
                i(t) && (t = {
                    match: t
                });
                o[n].addHandler(t)
            }), this
        },
        unregister: function(n, t) {
            var i = this.queries[n];
            return i && (t ? i.removeHandler(t) : (i.clear(), delete this.queries[n])), this
        }
    }, new f
});
Utils = {
        Date: {
            calcAge: function(n) {
                var u = new Date(n),
                    f = new Date,
                    t = f.getTime() - u.getTime(),
                    i = t / 6e4,
                    r = t / 36e5,
                    e = t / 864e5;
                return t < 6e4 ? "Less than a minute ago" : Math.floor(i) == 1 ? Math.floor(i) + " minute ago" : i < 60 ? Math.floor(i) + " minutes ago" : Math.floor(r) == 1 ? Math.floor(r) + " hour ago" : r < 24 ? Math.floor(r) + " hours ago" : Math.floor(e) + " days ago"
            }
        },
        Browser: function() {
            var i = navigator.userAgent,
                t, n = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            return /trident/i.test(n[1]) ? (t = /\brv[ :]+(\d+)/g.exec(i) || [], {
                name: "IE ",
                version: t[1] || ""
            }) : n[1] === "Chrome" && (t = i.match(/\bOPR\/(\d+)/), t != null) ? {
                name: "Opera",
                version: t[1]
            } : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], (t = i.match(/version\/(\d+)/i)) != null && n.splice(1, 1, t[1]), {
                name: n[0],
                version: n[1]
            })
        }
    },
    function() {
        "use strict";
        angular.module("diply.article-cards", ["infinite-scroll", "ngResource"])
    }(),
    function() {
        "use strict";
        angular.module("diply.article-cards").controller("categoryCardsController", ["$scope", "$routeParams", "articleCardFactory", function(n, t, i) {
            n.articleCards = [];
            n.next = null;
            n.loading = !0;
            n.categoryDetails = {};
            n.slug = t.cat_slug;
            n.subSlug = t.sub_slug;
            n.endOfResults = !1;
            i.categoryDetails({
                slug: n.slug,
                subSlug: n.subSlug
            }, function(t) {
                n.categoryDetails = t
            }, function(n) {
                console.log(n)
            });
            n.getArticleCards = function() {
                n.loading = !0;
                i.category({
                    slug: n.slug,
                    subSlug: n.subSlug,
                    next: n.next
                }, function(t) {
                    n.next = t.Next;
                    n.next === null && (n.endOfResults = !0);
                    n.articleCards = n.articleCards.concat(t.Items);
                    n.loading = !1
                }, function(n) {
                    console.log(n)
                })
            };
            n.getArticleCards()
        }]).controller("userCardsController", ["$scope", "$routeParams", "articleCardFactory", "profileDetails", function(n, t, i, r) {
            n.username = t.username;
            n.articleCards = [];
            n.next = null;
            n.loading = !0;
            n.profileDetails = r;
            n.endOfResults = !1;
            n.getUserCards = function() {
                n.loading = !0;
                i.user({
                    username: n.username,
                    next: n.next
                }, function(t) {
                    n.next = t.Next;
                    n.next === null && (n.endOfResults = !0);
                    n.articleCards = n.articleCards.concat(t.Items);
                    n.loading = !1
                }, function(n) {
                    console.log(n)
                })
            };
            n.getUserCards()
        }]).controller("publicationCardsController", ["$scope", "$routeParams", "articleCardFactory", "profileDetails", function(n, t, i, r) {
            n.slug = t.brand_slug;
            n.profileDetails = r;
            n.articleCards = [];
            n.next = null;
            n.loading = !0;
            n.endOfResults = !1;
            n.getPublicationCards = function() {
                n.loading = !0;
                i.publication({
                    slug: n.profileDetails.Slug,
                    next: n.next
                }, function(t) {
                    n.next = t.Next;
                    n.next === null && (n.endOfResults = !0);
                    n.articleCards = n.articleCards.concat(t.Items);
                    n.loading = !1
                }, function(n) {
                    console.log(n)
                })
            };
            n.getPublicationCards()
        }])
    }(),
    function() {
        "use strict";
        angular.module("diply.article-cards").directive("articleCards", function() {
            return {
                restrict: "E",
                scope: {
                    populateFunction: "&",
                    articleCards: "="
                },
                templateUrl: "/Scripts/ng-app/article-cards/templates/articleCards.html"
            }
        }).directive("profileHeader", function() {
            return {
                templateUrl: "/Scripts/ng-app/article-cards/templates/profileHeader.html",
                scope: {
                    profileDetails: "="
                },
                restrict: "E",
                link: function() {}
            }
        })
    }(),
    function() {
        "use strict";
        angular.module("diply.article-cards").factory("articleCardFactory", ["$resource", function(n) {
            return {
                category: n("/api/v1/articlecard/category").get,
                categoryDetails: n("/api/v1/articlecard/category/details").get,
                publication: n("/api/v1/articlecard/publication/:slug", {
                    slug: "@slug"
                }).get,
                publicationDetails: n("/api/v1/articlecard/publication/:slug/details", {
                    slug: "@slug"
                }).get,
                user: n("/api/v1/articlecard/user/:username", {
                    username: "@username"
                }).get,
                userDetails: n("/api/v1/articlecard/user/:username/details", {
                    username: "@username"
                }).get
            }
        }])
    }();
theApp.directive("relatedInCategory", ["$resource", function(n) {
    return {
        restrict: "E",
        templateUrl: "/Scripts/ng-app/article/relatedArticlesInCategory.html",
        scope: {
            category: "=",
            subcategory: "=",
            articleId: "=",
            nextArticleId: "="
        },
        link: function(t) {
            t.related = [];
            var i = {
                category: t.category,
                subcategory: t.subcategory,
                articleid: t.articleId,
                nextarticleid: t.nextArticleId
            };
            n("/api/v1/content/related", {}, {
                save: {
                    method: "POST",
                    isArray: !0
                }
            }).save(i, function(n) {
                t.related = n
            }, function() {})
        }
    }
}]);
angular.module("app").directive("displayVideo", function() {
    return {
        scope: {
            image: "@",
            title: "@",
            video: "@"
        },
        restrict: "EA",
        templateUrl: "/Content/static/diply-new-angular/src/app/VideoPlayer/display-video-header.html",
        controller: ["$scope", function(n) {
            var t = n.image;
            n.heroToggle = !1;
            n.hideHero = function() {
                n.heroToggle = n.heroToggle === !1 ? !0 : !1
            }
        }]
    }
});
angular.module("app").directive("videoPlayer", ["$sce", function() {
        return {
            scope: {
                linkUrl: "@"
            },
            restrict: "E",
            templateUrl: "/Content/static/diply-new-angular/src/app/VideoPlayer/video-player.html",
            controller: ["$sce", "$scope", function(n, t) {
                var r = function(n, t) {
                        this.regex = n;
                        this.callback = t
                    },
                    i = "",
                    u = new r(/^.*(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})(?:.+)?$.*/, function(n) {
                        i = "//www.youtube.com/embed/";
                        i = i.concat(n[1])
                    }),
                    f = new r(/^.*(?:https?:\/\/)?(?:www\.)?(?:vimeo.com\/(?:))([\w-]{9})*/, function(n) {
                        i = "//www.vimeo.com";
                        i = i.concat(n[1])
                    }),
                    e = new r(/^.*(?:https?:\/\/)?(?:www\.)?(?:dai\.ly\/|dailymotion\.com(?:|\/video\/))([\w-]{7})(?:.+)?$.*/, function(n) {
                        i = "//www.dailymotion.com/embed/video/";
                        i = i.concat(n[1])
                    }),
                    o = [u, f, e];
                _.forEach(o, function(n) {
                    var i = t.linkUrl.match(n.regex);
                    if (i) return n.callback(i), !1
                });
                i == undefined && console.log("Failed to parse VideoUrl '" + t.linkUrl + "'");
                t.EmbedUrl = n.trustAsResourceUrl(i)
            }]
        }
    }]),
    function() {
        "use strict";
        angular.module("app").controller("staticResourcesController", ["$scope", "staticResourcesFactory", "$sce", function(n, t, i) {
            n.about = function() {
                t.about(function(n) {
                    document.aboutForm.action = i.trustAsResourceUrl(n.formUrl);
                    document.aboutForm.submit()
                })
            };
            n.advertise = function() {
                t.dacontact(function(n) {
                    document.advertiseForm.action = i.trustAsResourceUrl(n.formUrl);
                    document.advertiseForm.submit()
                })
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("app").factory("staticResourcesFactory", ["$resource", function(n) {
            return {
                about: n("/api/v1/about/formurl").get,
                dacontact: n("/api/v1/contact/formurl").get
            }
        }])
    }()