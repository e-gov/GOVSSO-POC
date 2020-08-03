!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(C, e) {
    "use strict";
    var t = []
      , E = C.document
      , r = Object.getPrototypeOf
      , s = t.slice
      , g = t.concat
      , u = t.push
      , i = t.indexOf
      , n = {}
      , o = n.toString
      , v = n.hasOwnProperty
      , a = v.toString
      , l = a.call(Object)
      , y = {}
      , m = function(e) {
        return "function" == typeof e && "number" != typeof e.nodeType
    }
      , x = function(e) {
        return null != e && e === e.window
    }
      , c = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function b(e, t, n) {
        var r, i, o = (n = n || E).createElement("script");
        if (o.text = e,
        t)
            for (r in c)
                (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }
    function w(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
    }
    var f = "3.4.1"
      , S = function(e, t) {
        return new S.fn.init(e,t)
    }
      , p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function d(e) {
        var t = !!e && "length"in e && e.length
          , n = w(e);
        return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    S.fn = S.prototype = {
        jquery: f,
        constructor: S,
        length: 0,
        toArray: function() {
            return s.call(this)
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = S.merge(this.constructor(), e);
            return t.prevObject = this,
            t
        },
        each: function(e) {
            return S.each(this, e)
        },
        map: function(n) {
            return this.pushStack(S.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    },
    S.extend = S.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof a && (l = a,
        a = arguments[s] || {},
        s++),
        "object" == typeof a || m(a) || (a = {}),
        s === u && (a = this,
        s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    r = e[t],
                    "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t],
                    o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {},
                    i = !1,
                    a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }
    ,
    S.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== o.call(e) || (t = r(e)) && ("function" != typeof (n = v.call(t, "constructor") && t.constructor) || a.call(n) !== l))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        globalEval: function(e, t) {
            b(e, {
                nonce: t && t.nonce
            })
        },
        each: function(e, t) {
            var n, r = 0;
            if (d(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                    ;
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(p, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (d(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)),
            n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) != a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0, a = [];
            if (d(e))
                for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e)
                    null != (i = t(e[o], o, n)) && a.push(i);
            return g.apply([], a)
        },
        guid: 1,
        support: y
    }),
    "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]),
    S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var h = function(n) {
        var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date, m = n.document, k = 0, r = 0, p = ue(), x = ue(), N = ue(), A = ue(), D = function(e, t) {
            return e === t && (l = !0),
            0
        }, j = {}.hasOwnProperty, t = [], q = t.pop, L = t.push, H = t.push, O = t.slice, P = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]", $ = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", F = new RegExp(M + "+","g"), B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$","g"), _ = new RegExp("^" + M + "*," + M + "*"), z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp(M + "|>"), X = new RegExp($), V = new RegExp("^" + I + "$"), G = {
            ID: new RegExp("^#(" + I + ")"),
            CLASS: new RegExp("^\\.(" + I + ")"),
            TAG: new RegExp("^(" + I + "|[*])"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + $),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)","i"),
            bool: new RegExp("^(?:" + R + ")$","i"),
            needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)","i")
        }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)","ig"), ne = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        }, oe = function() {
            T()
        }, ae = be(function(e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            H.apply(t = O.call(m.childNodes), m.childNodes),
            t[m.childNodes.length].nodeType
        } catch (e) {
            H = {
                apply: t.length ? function(e, t) {
                    L.apply(e, O.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        function se(e, t, n, r) {
            var i, o, a, s, u, l, c, f = t && t.ownerDocument, p = t ? t.nodeType : 9;
            if (n = n || [],
            "string" != typeof e || !e || 1 !== p && 9 !== p && 11 !== p)
                return n;
            if (!r && ((t ? t.ownerDocument || t : m) !== C && T(t),
            t = t || C,
            E)) {
                if (11 !== p && (u = Z.exec(e)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                n
                        } else if (f && (a = f.getElementById(i)) && y(t, a) && a.id === i)
                            return n.push(a),
                            n
                    } else {
                        if (u[2])
                            return H.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((i = u[3]) && d.getElementsByClassName && t.getElementsByClassName)
                            return H.apply(n, t.getElementsByClassName(i)),
                            n
                    }
                if (d.qsa && !A[e + " "] && (!v || !v.test(e)) && (1 !== p || "object" !== t.nodeName.toLowerCase())) {
                    if (c = e,
                    f = t,
                    1 === p && U.test(e)) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(re, ie) : t.setAttribute("id", s = S),
                        o = (l = h(e)).length; o--; )
                            l[o] = "#" + s + " " + xe(l[o]);
                        c = l.join(","),
                        f = ee.test(e) && ye(t.parentNode) || t
                    }
                    try {
                        return H.apply(n, f.querySelectorAll(c)),
                        n
                    } catch (t) {
                        A(e, !0)
                    } finally {
                        s === S && t.removeAttribute("id")
                    }
                }
            }
            return g(e.replace(B, "$1"), t, n, r)
        }
        function ue() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()],
                e[t + " "] = n
            }
        }
        function le(e) {
            return e[S] = !0,
            e
        }
        function ce(e) {
            var t = C.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function fe(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
                b.attrHandle[n[r]] = t
        }
        function pe(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function de(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }
        function he(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }
        function ge(t) {
            return function(e) {
                return "form"in e ? e.parentNode && !1 === e.disabled ? "label"in e ? "label"in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label"in e && e.disabled === t
            }
        }
        function ve(a) {
            return le(function(o) {
                return o = +o,
                le(function(e, t) {
                    for (var n, r = a([], e.length, o), i = r.length; i--; )
                        e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }
        function ye(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (e in d = se.support = {},
        i = se.isXML = function(e) {
            var t = e.namespaceURI
              , n = (e.ownerDocument || e).documentElement;
            return !Y.test(t || n && n.nodeName || "HTML")
        }
        ,
        T = se.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : m;
            return r !== C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement,
            E = !i(C),
            m !== C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)),
            d.attributes = ce(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            d.getElementsByTagName = ce(function(e) {
                return e.appendChild(C.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            d.getElementsByClassName = K.test(C.getElementsByClassName),
            d.getById = ce(function(e) {
                return a.appendChild(e).id = S,
                !C.getElementsByName || !C.getElementsByName(S).length
            }),
            d.getById ? (b.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ,
            b.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && E) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }
            ) : (b.filter.ID = function(e) {
                var n = e.replace(te, ne);
                return function(e) {
                    var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }
            ,
            b.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && E) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        for (i = t.getElementsByName(e),
                        r = 0; o = i[r++]; )
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }
            ),
            b.find.TAG = d.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" !== e)
                    return o;
                for (; n = o[i++]; )
                    1 === n.nodeType && r.push(n);
                return r
            }
            ,
            b.find.CLASS = d.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && E)
                    return t.getElementsByClassName(e)
            }
            ,
            s = [],
            v = [],
            (d.qsa = K.test(C.querySelectorAll)) && (ce(function(e) {
                a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"),
                e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="),
                e.querySelectorAll(":checked").length || v.push(":checked"),
                e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]")
            }),
            ce(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = C.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="),
                2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"),
                a.appendChild(e).disabled = !0,
                2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                v.push(",.*:")
            })),
            (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function(e) {
                d.disconnectedMatch = c.call(e, "*"),
                c.call(e, "[s!='']:x"),
                s.push("!=", $)
            }),
            v = v.length && new RegExp(v.join("|")),
            s = s.length && new RegExp(s.join("|")),
            t = K.test(a.compareDocumentPosition),
            y = t || K.test(a.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            D = t ? function(e, t) {
                if (e === t)
                    return l = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e === C || e.ownerDocument === m && y(m, e) ? -1 : t === C || t.ownerDocument === m && y(m, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return l = !0,
                    0;
                var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t];
                if (!i || !o)
                    return e === C ? -1 : t === C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
                if (i === o)
                    return pe(e, t);
                for (n = e; n = n.parentNode; )
                    a.unshift(n);
                for (n = t; n = n.parentNode; )
                    s.unshift(n);
                for (; a[r] === s[r]; )
                    r++;
                return r ? pe(a[r], s[r]) : a[r] === m ? -1 : s[r] === m ? 1 : 0
            }
            ),
            C
        }
        ,
        se.matches = function(e, t) {
            return se(e, null, null, t)
        }
        ,
        se.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== C && T(e),
            d.matchesSelector && E && !A[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t)))
                try {
                    var n = c.call(e, t);
                    if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return n
                } catch (e) {
                    A(t, !0)
                }
            return 0 < se(t, C, null, [e]).length
        }
        ,
        se.contains = function(e, t) {
            return (e.ownerDocument || e) !== C && T(e),
            y(e, t)
        }
        ,
        se.attr = function(e, t) {
            (e.ownerDocument || e) !== C && T(e);
            var n = b.attrHandle[t.toLowerCase()]
              , r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
            return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        se.escape = function(e) {
            return (e + "").replace(re, ie)
        }
        ,
        se.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        se.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (l = !d.detectDuplicates,
            u = !d.sortStable && e.slice(0),
            e.sort(D),
            l) {
                for (; t = e[i++]; )
                    t === e[i] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return u = null,
            e
        }
        ,
        o = se.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += o(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += o(t);
            return n
        }
        ,
        (b = se.selectors = {
            cacheLength: 50,
            createPseudo: le,
            match: G,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, ne),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = p[e + " "];
                    return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && p(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, r, i) {
                    return function(e) {
                        var t = se.attr(e, n);
                        return null == t ? "!=" === r : !r || (t += "",
                        "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(F, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(h, e, t, g, v) {
                    var y = "nth" !== h.slice(0, 3)
                      , m = "last" !== h.slice(-4)
                      , x = "of-type" === e;
                    return 1 === g && 0 === v ? function(e) {
                        return !!e.parentNode
                    }
                    : function(e, t, n) {
                        var r, i, o, a, s, u, l = y != m ? "nextSibling" : "previousSibling", c = e.parentNode, f = x && e.nodeName.toLowerCase(), p = !n && !x, d = !1;
                        if (c) {
                            if (y) {
                                for (; l; ) {
                                    for (a = e; a = a[l]; )
                                        if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType)
                                            return !1;
                                    u = l = "only" === h && !u && "nextSibling"
                                }
                                return !0
                            }
                            if (u = [m ? c.firstChild : c.lastChild],
                            m && p) {
                                for (d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2],
                                a = s && c.childNodes[s]; a = ++s && a && a[l] || (d = s = 0) || u.pop(); )
                                    if (1 === a.nodeType && ++d && a === e) {
                                        i[h] = [k, s, d];
                                        break
                                    }
                            } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]),
                            !1 === d)
                                for (; (a = ++s && a && a[l] || (d = s = 0) || u.pop()) && ((x ? a.nodeName.toLowerCase() !== f : 1 !== a.nodeType) || !++d || (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]),
                                a !== e)); )
                                    ;
                            return (d -= v) === g || d % g == 0 && 0 <= d / g
                        }
                    }
                },
                PSEUDO: function(e, o) {
                    var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                    return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o],
                    b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function(e, t) {
                        for (var n, r = a(e, o), i = r.length; i--; )
                            e[n = P(e, r[i])] = !(t[n] = r[i])
                    }) : function(e) {
                        return a(e, 0, t)
                    }
                    ) : a
                }
            },
            pseudos: {
                not: le(function(e) {
                    var r = []
                      , i = []
                      , s = f(e.replace(B, "$1"));
                    return s[S] ? le(function(e, t, n, r) {
                        for (var i, o = s(e, null, r, []), a = e.length; a--; )
                            (i = o[a]) && (e[a] = !(t[a] = i))
                    }) : function(e, t, n) {
                        return r[0] = e,
                        s(r, null, n, i),
                        r[0] = null,
                        !i.pop()
                    }
                }),
                has: le(function(t) {
                    return function(e) {
                        return 0 < se(t, e).length
                    }
                }),
                contains: le(function(t) {
                    return t = t.replace(te, ne),
                    function(e) {
                        return -1 < (e.textContent || o(e)).indexOf(t)
                    }
                }),
                lang: le(function(n) {
                    return V.test(n || "") || se.error("unsupported lang: " + n),
                    n = n.replace(te, ne).toLowerCase(),
                    function(e) {
                        var t;
                        do {
                            if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);return !1
                    }
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function(e) {
                    return e === a
                },
                focus: function(e) {
                    return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: ge(!1),
                disabled: ge(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                header: function(e) {
                    return J.test(e.nodeName)
                },
                input: function(e) {
                    return Q.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: ve(function() {
                    return [0]
                }),
                last: ve(function(e, t) {
                    return [t - 1]
                }),
                eq: ve(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: ve(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: ve(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: ve(function(e, t, n) {
                    for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                        e.push(r);
                    return e
                }),
                gt: ve(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = b.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            b.pseudos[e] = de(e);
        for (e in {
            submit: !0,
            reset: !0
        })
            b.pseudos[e] = he(e);
        function me() {}
        function xe(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function be(s, e, t) {
            var u = e.dir
              , l = e.next
              , c = l || u
              , f = t && "parentNode" === c
              , p = r++;
            return e.first ? function(e, t, n) {
                for (; e = e[u]; )
                    if (1 === e.nodeType || f)
                        return s(e, t, n);
                return !1
            }
            : function(e, t, n) {
                var r, i, o, a = [k, p];
                if (n) {
                    for (; e = e[u]; )
                        if ((1 === e.nodeType || f) && s(e, t, n))
                            return !0
                } else
                    for (; e = e[u]; )
                        if (1 === e.nodeType || f)
                            if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}),
                            l && l === e.nodeName.toLowerCase())
                                e = e[u] || e;
                            else {
                                if ((r = i[c]) && r[0] === k && r[1] === p)
                                    return a[2] = r[2];
                                if ((i[c] = a)[2] = s(e, t, n))
                                    return !0
                            }
                return !1
            }
        }
        function we(i) {
            return 1 < i.length ? function(e, t, n) {
                for (var r = i.length; r--; )
                    if (!i[r](e, t, n))
                        return !1;
                return !0
            }
            : i[0]
        }
        function Te(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                l && t.push(s)));
            return a
        }
        function Ce(d, h, g, v, y, e) {
            return v && !v[S] && (v = Ce(v)),
            y && !y[S] && (y = Ce(y, e)),
            le(function(e, t, n, r) {
                var i, o, a, s = [], u = [], l = t.length, c = e || function(e, t, n) {
                    for (var r = 0, i = t.length; r < i; r++)
                        se(e, t[r], n);
                    return n
                }(h || "*", n.nodeType ? [n] : n, []), f = !d || !e && h ? c : Te(c, s, d, n, r), p = g ? y || (e ? d : l || v) ? [] : t : f;
                if (g && g(f, p, n, r),
                v)
                    for (i = Te(p, u),
                    v(i, [], n, r),
                    o = i.length; o--; )
                        (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
                if (e) {
                    if (y || d) {
                        if (y) {
                            for (i = [],
                            o = p.length; o--; )
                                (a = p[o]) && i.push(f[o] = a);
                            y(null, p = [], i, r)
                        }
                        for (o = p.length; o--; )
                            (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else
                    p = Te(p === t ? p.splice(l, p.length) : p),
                    y ? y(null, t, p, r) : H.apply(t, p)
            })
        }
        function Ee(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function(e) {
                return e === i
            }, a, !0), l = be(function(e) {
                return -1 < P(i, e)
            }, a, !0), c = [function(e, t, n) {
                var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                return i = null,
                r
            }
            ]; s < r; s++)
                if (t = b.relative[e[s].type])
                    c = [be(we(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                        for (n = ++s; n < r && !b.relative[e[n].type]; n++)
                            ;
                        return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(B, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e))
                    }
                    c.push(t)
                }
            return we(c)
        }
        return me.prototype = b.filters = b.pseudos,
        b.setFilters = new me,
        h = se.tokenize = function(e, t) {
            var n, r, i, o, a, s, u, l = x[e + " "];
            if (l)
                return t ? 0 : l.slice(0);
            for (a = e,
            s = [],
            u = b.preFilter; a; ) {
                for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a),
                s.push(i = [])),
                n = !1,
                (r = z.exec(a)) && (n = r.shift(),
                i.push({
                    value: n,
                    type: r[0].replace(B, " ")
                }),
                a = a.slice(n.length)),
                b.filter)
                    !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(),
                    i.push({
                        value: n,
                        type: o,
                        matches: r
                    }),
                    a = a.slice(n.length));
                if (!n)
                    break
            }
            return t ? a.length : a ? se.error(e) : x(e, s).slice(0)
        }
        ,
        f = se.compile = function(e, t) {
            var n, v, y, m, x, r, i = [], o = [], a = N[e + " "];
            if (!a) {
                for (t || (t = h(e)),
                n = t.length; n--; )
                    (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
                (a = N(e, (v = o,
                m = 0 < (y = i).length,
                x = 0 < v.length,
                r = function(e, t, n, r, i) {
                    var o, a, s, u = 0, l = "0", c = e && [], f = [], p = w, d = e || x && b.find.TAG("*", i), h = k += null == p ? 1 : Math.random() || .1, g = d.length;
                    for (i && (w = t === C || t || i); l !== g && null != (o = d[l]); l++) {
                        if (x && o) {
                            for (a = 0,
                            t || o.ownerDocument === C || (T(o),
                            n = !E); s = v[a++]; )
                                if (s(o, t || C, n)) {
                                    r.push(o);
                                    break
                                }
                            i && (k = h)
                        }
                        m && ((o = !s && o) && u--,
                        e && c.push(o))
                    }
                    if (u += l,
                    m && l !== u) {
                        for (a = 0; s = y[a++]; )
                            s(c, f, t, n);
                        if (e) {
                            if (0 < u)
                                for (; l--; )
                                    c[l] || f[l] || (f[l] = q.call(r));
                            f = Te(f)
                        }
                        H.apply(r, f),
                        i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r)
                    }
                    return i && (k = h,
                    w = p),
                    c
                }
                ,
                m ? le(r) : r))).selector = e
            }
            return a
        }
        ,
        g = se.select = function(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e);
            if (n = n || [],
            1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(o.shift().value.length)
                }
                for (i = G.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                !b.relative[s = a.type]); )
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
                        if (o.splice(i, 1),
                        !(e = r.length && xe(o)))
                            return H.apply(n, r),
                            n;
                        break
                    }
            }
            return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t),
            n
        }
        ,
        d.sortStable = S.split("").sort(D).join("") === S,
        d.detectDuplicates = !!l,
        T(),
        d.sortDetached = ce(function(e) {
            return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
        }),
        ce(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        d.attributes && ce(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || fe("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }),
        ce(function(e) {
            return null == e.getAttribute("disabled")
        }) || fe(R, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        se
    }(C);
    S.find = h,
    S.expr = h.selectors,
    S.expr[":"] = S.expr.pseudos,
    S.uniqueSort = S.unique = h.uniqueSort,
    S.text = h.getText,
    S.isXMLDoc = h.isXML,
    S.contains = h.contains,
    S.escapeSelector = h.escape;
    var T = function(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (i && S(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
      , k = function(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n
    }
      , N = S.expr.match.needsContext;
    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function j(e, n, r) {
        return m(n) ? S.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? S.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? S.grep(e, function(e) {
            return -1 < i.call(n, e) !== r
        }) : S.filter(n, e, r)
    }
    S.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    S.fn.extend({
        find: function(e) {
            var t, n, r = this.length, i = this;
            if ("string" != typeof e)
                return this.pushStack(S(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (S.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]),
            t = 0; t < r; t++)
                S.find(e, i[t], n);
            return 1 < r ? S.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(j(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(j(this, e || [], !0))
        },
        is: function(e) {
            return !!j(this, "string" == typeof e && N.test(e) ? S(e) : e || [], !1).length
        }
    });
    var q, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (S.fn.init = function(e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || q,
        "string" != typeof e)
            return e.nodeType ? (this[0] = e,
            this.length = 1,
            this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this);
        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : L.exec(e)) || !r[1] && t)
            return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
        if (r[1]) {
            if (t = t instanceof S ? t[0] : t,
            S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)),
            D.test(r[1]) && S.isPlainObject(t))
                for (r in t)
                    m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this
        }
        return (i = E.getElementById(r[2])) && (this[0] = i,
        this.length = 1),
        this
    }
    ).prototype = S.fn,
    q = S(E);
    var H = /^(?:parents|prev(?:Until|All))/
      , O = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function P(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; )
            ;
        return e
    }
    S.fn.extend({
        has: function(e) {
            var t = S(e, this)
              , n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (S.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0, i = this.length, o = [], a = "string" != typeof e && S(e);
            if (!N.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(1 < o.length ? S.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    S.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return T(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return T(e, "parentNode", n)
        },
        next: function(e) {
            return P(e, "nextSibling")
        },
        prev: function(e) {
            return P(e, "previousSibling")
        },
        nextAll: function(e) {
            return T(e, "nextSibling")
        },
        prevAll: function(e) {
            return T(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return T(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return T(e, "previousSibling", n)
        },
        siblings: function(e) {
            return k((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return k(e.firstChild)
        },
        contents: function(e) {
            return void 0 !== e.contentDocument ? e.contentDocument : (A(e, "template") && (e = e.content || e),
            S.merge([], e.childNodes))
        }
    }, function(r, i) {
        S.fn[r] = function(e, t) {
            var n = S.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e),
            t && "string" == typeof t && (n = S.filter(t, n)),
            1 < this.length && (O[r] || S.uniqueSort(n),
            H.test(r) && n.reverse()),
            this.pushStack(n)
        }
    });
    var R = /[^\x20\t\r\n\f]+/g;
    function M(e) {
        return e
    }
    function I(e) {
        throw e
    }
    function W(e, t, n, r) {
        var i;
        try {
            e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    S.Callbacks = function(r) {
        var e, n;
        r = "string" == typeof r ? (e = r,
        n = {},
        S.each(e.match(R) || [], function(e, t) {
            n[t] = !0
        }),
        n) : S.extend({}, r);
        var i, t, o, a, s = [], u = [], l = -1, c = function() {
            for (a = a || r.once,
            o = i = !0; u.length; l = -1)
                for (t = u.shift(); ++l < s.length; )
                    !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length,
                    t = !1);
            r.memory || (t = !1),
            i = !1,
            a && (s = t ? [] : "")
        }, f = {
            add: function() {
                return s && (t && !i && (l = s.length - 1,
                u.push(t)),
                function n(e) {
                    S.each(e, function(e, t) {
                        m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t)
                    })
                }(arguments),
                t && !i && c()),
                this
            },
            remove: function() {
                return S.each(arguments, function(e, t) {
                    for (var n; -1 < (n = S.inArray(t, s, n)); )
                        s.splice(n, 1),
                        n <= l && l--
                }),
                this
            },
            has: function(e) {
                return e ? -1 < S.inArray(e, s) : 0 < s.length
            },
            empty: function() {
                return s && (s = []),
                this
            },
            disable: function() {
                return a = u = [],
                s = t = "",
                this
            },
            disabled: function() {
                return !s
            },
            lock: function() {
                return a = u = [],
                t || i || (s = t = ""),
                this
            },
            locked: function() {
                return !!a
            },
            fireWith: function(e, t) {
                return a || (t = [e, (t = t || []).slice ? t.slice() : t],
                u.push(t),
                i || c()),
                this
            },
            fire: function() {
                return f.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!o
            }
        };
        return f
    }
    ,
    S.extend({
        Deferred: function(e) {
            var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]]
              , i = "pending"
              , a = {
                state: function() {
                    return i
                },
                always: function() {
                    return s.done(arguments).fail(arguments),
                    this
                },
                catch: function(e) {
                    return a.then(null, e)
                },
                pipe: function() {
                    var i = arguments;
                    return S.Deferred(function(r) {
                        S.each(o, function(e, t) {
                            var n = m(i[t[4]]) && i[t[4]];
                            s[t[1]](function() {
                                var e = n && n.apply(this, arguments);
                                e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                            })
                        }),
                        i = null
                    }).promise()
                },
                then: function(t, n, r) {
                    var u = 0;
                    function l(i, o, a, s) {
                        return function() {
                            var n = this
                              , r = arguments
                              , e = function() {
                                var e, t;
                                if (!(i < u)) {
                                    if ((e = a.apply(n, r)) === o.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    t = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                    m(t) ? s ? t.call(e, l(u, o, M, s), l(u, o, I, s)) : (u++,
                                    t.call(e, l(u, o, M, s), l(u, o, I, s), l(u, o, M, o.notifyWith))) : (a !== M && (n = void 0,
                                    r = [e]),
                                    (s || o.resolveWith)(n, r))
                                }
                            }
                              , t = s ? e : function() {
                                try {
                                    e()
                                } catch (e) {
                                    S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace),
                                    u <= i + 1 && (a !== I && (n = void 0,
                                    r = [e]),
                                    o.rejectWith(n, r))
                                }
                            }
                            ;
                            i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()),
                            C.setTimeout(t))
                        }
                    }
                    return S.Deferred(function(e) {
                        o[0][3].add(l(0, e, m(r) ? r : M, e.notifyWith)),
                        o[1][3].add(l(0, e, m(t) ? t : M)),
                        o[2][3].add(l(0, e, m(n) ? n : I))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? S.extend(e, a) : a
                }
            }
              , s = {};
            return S.each(o, function(e, t) {
                var n = t[2]
                  , r = t[5];
                a[t[1]] = n.add,
                r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock),
                n.add(t[3].fire),
                s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments),
                    this
                }
                ,
                s[t[0] + "With"] = n.fireWith
            }),
            a.promise(s),
            e && e.call(s, s),
            s
        },
        when: function(e) {
            var n = arguments.length
              , t = n
              , r = Array(t)
              , i = s.call(arguments)
              , o = S.Deferred()
              , a = function(t) {
                return function(e) {
                    r[t] = this,
                    i[t] = 1 < arguments.length ? s.call(arguments) : e,
                    --n || o.resolveWith(r, i)
                }
            };
            if (n <= 1 && (W(e, o.done(a(t)).resolve, o.reject, !n),
            "pending" === o.state() || m(i[t] && i[t].then)))
                return o.then();
            for (; t--; )
                W(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var $ = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    S.Deferred.exceptionHook = function(e, t) {
        C.console && C.console.warn && e && $.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }
    ,
    S.readyException = function(e) {
        C.setTimeout(function() {
            throw e
        })
    }
    ;
    var F = S.Deferred();
    function B() {
        E.removeEventListener("DOMContentLoaded", B),
        C.removeEventListener("load", B),
        S.ready()
    }
    S.fn.ready = function(e) {
        return F.then(e).catch(function(e) {
            S.readyException(e)
        }),
        this
    }
    ,
    S.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S])
        }
    }),
    S.ready.then = F.then,
    "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B),
    C.addEventListener("load", B));
    var _ = function(e, t, n, r, i, o, a) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === w(n))
            for (s in i = !0,
            n)
                _(e, t, s, n[s], !0, o, a);
        else if (void 0 !== r && (i = !0,
        m(r) || (a = !0),
        l && (t = a ? (t.call(e, r),
        null) : (l = t,
        function(e, t, n) {
            return l.call(S(e), n)
        }
        )),
        t))
            for (; s < u; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    }
      , z = /^-ms-/
      , U = /-([a-z])/g;
    function X(e, t) {
        return t.toUpperCase()
    }
    function V(e) {
        return e.replace(z, "ms-").replace(U, X)
    }
    var G = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    function Y() {
        this.expando = S.expando + Y.uid++
    }
    Y.uid = 1,
    Y.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {},
            G(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))),
            t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t)
                i[V(t)] = n;
            else
                for (r in t)
                    i[V(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
            void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(V) : (t = V(t))in r ? [t] : t.match(R) || []).length;
                    for (; n--; )
                        delete r[t[n]]
                }
                (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !S.isEmptyObject(t)
        }
    };
    var Q = new Y
      , J = new Y
      , K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , Z = /[A-Z]/g;
    function ee(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Z, "-$&").toLowerCase(),
            "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : K.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                J.set(e, t, n)
            } else
                n = void 0;
        return n
    }
    S.extend({
        hasData: function(e) {
            return J.hasData(e) || Q.hasData(e)
        },
        data: function(e, t, n) {
            return J.access(e, t, n)
        },
        removeData: function(e, t) {
            J.remove(e, t)
        },
        _data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        _removeData: function(e, t) {
            Q.remove(e, t)
        }
    }),
    S.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0], a = o && o.attributes;
            if (void 0 !== n)
                return "object" == typeof n ? this.each(function() {
                    J.set(this, n)
                }) : _(this, function(e) {
                    var t;
                    if (o && void 0 === e)
                        return void 0 !== (t = J.get(o, n)) ? t : void 0 !== (t = ee(o, n)) ? t : void 0;
                    this.each(function() {
                        J.set(this, n, e)
                    })
                }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (i = J.get(o),
            1 === o.nodeType && !Q.get(o, "hasDataAttrs"))) {
                for (t = a.length; t--; )
                    a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = V(r.slice(5)),
                    ee(o, r, i[r]));
                Q.set(o, "hasDataAttrs", !0)
            }
            return i
        },
        removeData: function(e) {
            return this.each(function() {
                J.remove(this, e)
            })
        }
    }),
    S.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue",
                r = Q.get(e, t),
                n && (!r || Array.isArray(n) ? r = Q.access(e, t, S.makeArray(n)) : r.push(n)),
                r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = S.queue(e, t)
              , r = n.length
              , i = n.shift()
              , o = S._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            i.call(e, function() {
                S.dequeue(e, t)
            }, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Q.get(e, n) || Q.access(e, n, {
                empty: S.Callbacks("once memory").add(function() {
                    Q.remove(e, [t + "queue", n])
                })
            })
        }
    }),
    S.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t,
            t = "fx",
            e--),
            arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = S.queue(this, t, n);
                S._queueHooks(this, t),
                "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                S.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = S.Deferred(), o = this, a = this.length, s = function() {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; a--; )
                (n = Q.get(o[a], e + "queueHooks")) && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , ne = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$","i")
      , re = ["Top", "Right", "Bottom", "Left"]
      , ie = E.documentElement
      , oe = function(e) {
        return S.contains(e.ownerDocument, e)
    }
      , ae = {
        composed: !0
    };
    ie.getRootNode && (oe = function(e) {
        return S.contains(e.ownerDocument, e) || e.getRootNode(ae) === e.ownerDocument
    }
    );
    var se = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === S.css(e, "display")
    }
      , ue = function(e, t, n, r) {
        var i, o, a = {};
        for (o in t)
            a[o] = e.style[o],
            e.style[o] = t[o];
        for (o in i = n.apply(e, r || []),
        t)
            e.style[o] = a[o];
        return i
    };
    function le(e, t, n, r) {
        var i, o, a = 20, s = r ? function() {
            return r.cur()
        }
        : function() {
            return S.css(e, t, "")
        }
        , u = s(), l = n && n[3] || (S.cssNumber[t] ? "" : "px"), c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && ne.exec(S.css(e, t));
        if (c && c[3] !== l) {
            for (u /= 2,
            l = l || c[3],
            c = +u || 1; a--; )
                S.style(e, t, c + l),
                (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                c /= o;
            c *= 2,
            S.style(e, t, c + l),
            n = n || []
        }
        return n && (c = +c || +u || 0,
        i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
        r && (r.unit = l,
        r.start = c,
        r.end = i)),
        i
    }
    var ce = {};
    function fe(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
            (r = e[c]).style && (n = r.style.display,
            t ? ("none" === n && (l[c] = Q.get(r, "display") || null,
            l[c] || (r.style.display = "")),
            "" === r.style.display && se(r) && (l[c] = (u = a = o = void 0,
            a = (i = r).ownerDocument,
            s = i.nodeName,
            (u = ce[s]) || (o = a.body.appendChild(a.createElement(s)),
            u = S.css(o, "display"),
            o.parentNode.removeChild(o),
            "none" === u && (u = "block"),
            ce[s] = u)))) : "none" !== n && (l[c] = "none",
            Q.set(r, "display", n)));
        for (c = 0; c < f; c++)
            null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    S.fn.extend({
        show: function() {
            return fe(this, !0)
        },
        hide: function() {
            return fe(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                se(this) ? S(this).show() : S(this).hide()
            })
        }
    });
    var pe = /^(?:checkbox|radio)$/i
      , de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
      , he = /^$|^module$|\/(?:java|ecma)script/i
      , ge = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function ve(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
        void 0 === t || t && A(e, t) ? S.merge([e], n) : n
    }
    function ye(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
    }
    ge.optgroup = ge.option,
    ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead,
    ge.th = ge.td;
    var me, xe, be = /<|&#?\w+;/;
    function we(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === w(o))
                    S.merge(p, o.nodeType ? [o] : o);
                else if (be.test(o)) {
                    for (a = a || f.appendChild(t.createElement("div")),
                    s = (de.exec(o) || ["", ""])[1].toLowerCase(),
                    u = ge[s] || ge._default,
                    a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2],
                    c = u[0]; c--; )
                        a = a.lastChild;
                    S.merge(p, a.childNodes),
                    (a = f.firstChild).textContent = ""
                } else
                    p.push(t.createTextNode(o));
        for (f.textContent = "",
        d = 0; o = p[d++]; )
            if (r && -1 < S.inArray(o, r))
                i && i.push(o);
            else if (l = oe(o),
            a = ve(f.appendChild(o), "script"),
            l && ye(a),
            n)
                for (c = 0; o = a[c++]; )
                    he.test(o.type || "") && n.push(o);
        return f
    }
    me = E.createDocumentFragment().appendChild(E.createElement("div")),
    (xe = E.createElement("input")).setAttribute("type", "radio"),
    xe.setAttribute("checked", "checked"),
    xe.setAttribute("name", "t"),
    me.appendChild(xe),
    y.checkClone = me.cloneNode(!0).cloneNode(!0).lastChild.checked,
    me.innerHTML = "<textarea>x</textarea>",
    y.noCloneChecked = !!me.cloneNode(!0).lastChild.defaultValue;
    var Te = /^key/
      , Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , Ee = /^([^.]*)(?:\.(.+)|)/;
    function Se() {
        return !0
    }
    function ke() {
        return !1
    }
    function Ne(e, t) {
        return e === function() {
            try {
                return E.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }
    function Ae(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n,
            n = void 0),
            t)
                Ae(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
        r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
        r = void 0) : (i = r,
        r = n,
        n = void 0)),
        !1 === i)
            i = ke;
        else if (!i)
            return e;
        return 1 === o && (a = i,
        (i = function(e) {
            return S().off(e),
            a.apply(this, arguments)
        }
        ).guid = a.guid || (a.guid = S.guid++)),
        e.each(function() {
            S.event.add(this, t, i, r, n)
        })
    }
    function De(e, i, o) {
        o ? (Q.set(e, i, !1),
        S.event.add(e, i, {
            namespace: !1,
            handler: function(e) {
                var t, n, r = Q.get(this, i);
                if (1 & e.isTrigger && this[i]) {
                    if (r.length)
                        (S.event.special[i] || {}).delegateType && e.stopPropagation();
                    else if (r = s.call(arguments),
                    Q.set(this, i, r),
                    t = o(this, i),
                    this[i](),
                    r !== (n = Q.get(this, i)) || t ? Q.set(this, i, !1) : n = {},
                    r !== n)
                        return e.stopImmediatePropagation(),
                        e.preventDefault(),
                        n.value
                } else
                    r.length && (Q.set(this, i, {
                        value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
                    }),
                    e.stopImmediatePropagation())
            }
        })) : void 0 === Q.get(e, i) && S.event.add(e, i, Se)
    }
    S.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Q.get(t);
            if (v)
                for (n.handler && (n = (o = n).handler,
                i = o.selector),
                i && S.find.matchesSelector(ie, i),
                n.guid || (n.guid = S.guid++),
                (u = v.events) || (u = v.events = {}),
                (a = v.handle) || (a = v.handle = function(e) {
                    return void 0 !== S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0
                }
                ),
                l = (e = (e || "").match(R) || [""]).length; l--; )
                    d = g = (s = Ee.exec(e[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d && (f = S.event.special[d] || {},
                    d = (i ? f.delegateType : f.bindType) || d,
                    f = S.event.special[d] || {},
                    c = S.extend({
                        type: d,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && S.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o),
                    (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                    f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)),
                    f.add && (f.add.call(t, c),
                    c.handler.guid || (c.handler.guid = n.guid)),
                    i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    S.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Q.hasData(e) && Q.get(e);
            if (v && (u = v.events)) {
                for (l = (t = (t || "").match(R) || [""]).length; l--; )
                    if (d = g = (s = Ee.exec(t[l]) || [])[1],
                    h = (s[2] || "").split(".").sort(),
                    d) {
                        for (f = S.event.special[d] || {},
                        p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                        s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        a = o = p.length; o--; )
                            c = p[o],
                            !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1),
                            c.selector && p.delegateCount--,
                            f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle),
                        delete u[d])
                    } else
                        for (d in u)
                            S.event.remove(e, d + t[l], n, r, !0);
                S.isEmptyObject(u) && Q.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = S.event.fix(e), u = new Array(arguments.length), l = (Q.get(this, "events") || {})[s.type] || [], c = S.event.special[s.type] || {};
            for (u[0] = s,
            t = 1; t < arguments.length; t++)
                u[t] = arguments[t];
            if (s.delegateTarget = this,
            !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = S.event.handlers.call(this, s, l),
                t = 0; (i = a[t++]) && !s.isPropagationStopped(); )
                    for (s.currentTarget = i.elem,
                    n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped(); )
                        s.rnamespace && !1 !== o.namespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o,
                        s.data = o.data,
                        void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (s.result = r) && (s.preventDefault(),
                        s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s),
                s.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [],
                        a = {},
                        n = 0; n < u; n++)
                            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length),
                            a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this,
            u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }),
            s
        },
        addProp: function(t, e) {
            Object.defineProperty(S.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e) ? function() {
                    if (this.originalEvent)
                        return e(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[t]
                }
                ,
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[S.expando] ? e : new S.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && De(t, "click", Se),
                    !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && De(t, "click"),
                    !0
                },
                _default: function(e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && A(t, "input") && Q.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    },
    S.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }
    ,
    S.Event = function(e, t) {
        if (!(this instanceof S.Event))
            return new S.Event(e,t);
        e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Se : ke,
        this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
        this.currentTarget = e.currentTarget,
        this.relatedTarget = e.relatedTarget) : this.type = e,
        t && S.extend(this, t),
        this.timeStamp = e && e.timeStamp || Date.now(),
        this[S.expando] = !0
    }
    ,
    S.Event.prototype = {
        constructor: S.Event,
        isDefaultPrevented: ke,
        isPropagationStopped: ke,
        isImmediatePropagationStopped: ke,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Se,
            e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Se,
            e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Se,
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    S.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && Te.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ce.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, S.event.addProp),
    S.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        S.event.special[e] = {
            setup: function() {
                return De(this, e, Ne),
                !1
            },
            trigger: function() {
                return De(this, e),
                !0
            },
            delegateType: t
        }
    }),
    S.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        S.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget, r = e.handleObj;
                return n && (n === this || S.contains(this, n)) || (e.type = r.origType,
                t = r.handler.apply(this, arguments),
                e.type = i),
                t
            }
        }
    }),
    S.fn.extend({
        on: function(e, t, n, r) {
            return Ae(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Ae(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" != typeof e)
                return !1 !== t && "function" != typeof t || (n = t,
                t = void 0),
                !1 === n && (n = ke),
                this.each(function() {
                    S.event.remove(this, e, n, t)
                });
            for (i in e)
                this.off(i, t, e[i]);
            return this
        }
    });
    var je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
      , qe = /<script|<style|<link/i
      , Le = /checked\s*(?:[^=]|=\s*.checked.)/i
      , He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function Oe(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e
    }
    function Pe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
        e
    }
    function Re(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
        e
    }
    function Me(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (Q.hasData(e) && (o = Q.access(e),
            a = Q.set(t, o),
            l = o.events))
                for (i in delete a.handle,
                a.events = {},
                l)
                    for (n = 0,
                    r = l[i].length; n < r; n++)
                        S.event.add(t, i, l[i][n]);
            J.hasData(e) && (s = J.access(e),
            u = S.extend({}, s),
            J.set(t, u))
        }
    }
    function Ie(n, r, i, o) {
        r = g.apply([], r);
        var e, t, a, s, u, l, c = 0, f = n.length, p = f - 1, d = r[0], h = m(d);
        if (h || 1 < f && "string" == typeof d && !y.checkClone && Le.test(d))
            return n.each(function(e) {
                var t = n.eq(e);
                h && (r[0] = d.call(this, e, t.html())),
                Ie(t, r, i, o)
            });
        if (f && (t = (e = we(r, n[0].ownerDocument, !1, n, o)).firstChild,
        1 === e.childNodes.length && (e = t),
        t || o)) {
            for (s = (a = S.map(ve(e, "script"), Pe)).length; c < f; c++)
                u = e,
                c !== p && (u = S.clone(u, !0, !0),
                s && S.merge(a, ve(u, "script"))),
                i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument,
                S.map(a, Re),
                c = 0; c < s; c++)
                    u = a[c],
                    he.test(u.type || "") && !Q.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
                        nonce: u.nonce || u.getAttribute("nonce")
                    }) : b(u.textContent.replace(He, ""), u, l))
        }
        return n
    }
    function We(e, t, n) {
        for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || S.cleanData(ve(r)),
            r.parentNode && (n && oe(r) && ye(ve(r, "script")),
            r.parentNode.removeChild(r));
        return e
    }
    S.extend({
        htmlPrefilter: function(e) {
            return e.replace(je, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = oe(e);
            if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e)))
                for (a = ve(c),
                r = 0,
                i = (o = ve(e)).length; r < i; r++)
                    s = o[r],
                    "input" === (l = (u = a[r]).nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || ve(e),
                    a = a || ve(c),
                    r = 0,
                    i = o.length; r < i; r++)
                        Me(o[r], a[r]);
                else
                    Me(e, c);
            return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")),
            c
        },
        cleanData: function(e) {
            for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (G(n)) {
                    if (t = n[Q.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
                        n[Q.expando] = void 0
                    }
                    n[J.expando] && (n[J.expando] = void 0)
                }
        }
    }),
    S.fn.extend({
        detach: function(e) {
            return We(this, e, !0)
        },
        remove: function(e) {
            return We(this, e)
        },
        text: function(e) {
            return _(this, function(e) {
                return void 0 === e ? S.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Ie(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Oe(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Ie(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Oe(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Ie(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Ie(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (S.cleanData(ve(e, !1)),
                e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e,
            t = null == t ? e : t,
            this.map(function() {
                return S.clone(this, e, t)
            })
        },
        html: function(e) {
            return _(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !qe.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = S.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return Ie(this, arguments, function(e) {
                var t = this.parentNode;
                S.inArray(this, n) < 0 && (S.cleanData(ve(this)),
                t && t.replaceChild(e, this))
            }, n)
        }
    }),
    S.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        S.fn[e] = function(e) {
            for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++)
                t = o === i ? this : this.clone(!0),
                S(r[o])[a](t),
                u.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var $e = new RegExp("^(" + te + ")(?!px)[a-z%]+$","i")
      , Fe = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = C),
        t.getComputedStyle(e)
    }
      , Be = new RegExp(re.join("|"),"i");
    function _e(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || Fe(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || oe(e) || (a = S.style(e, t)),
        !y.pixelBoxStyles() && $e.test(a) && Be.test(t) && (r = s.width,
        i = s.minWidth,
        o = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = a,
        a = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = o)),
        void 0 !== a ? a + "" : a
    }
    function ze(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function e() {
            if (u) {
                s.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                ie.appendChild(s).appendChild(u);
                var e = C.getComputedStyle(u);
                n = "1%" !== e.top,
                a = 12 === t(e.marginLeft),
                u.style.right = "60%",
                o = 36 === t(e.right),
                r = 36 === t(e.width),
                u.style.position = "absolute",
                i = 12 === t(u.offsetWidth / 3),
                ie.removeChild(s),
                u = null
            }
        }
        function t(e) {
            return Math.round(parseFloat(e))
        }
        var n, r, i, o, a, s = E.createElement("div"), u = E.createElement("div");
        u.style && (u.style.backgroundClip = "content-box",
        u.cloneNode(!0).style.backgroundClip = "",
        y.clearCloneStyle = "content-box" === u.style.backgroundClip,
        S.extend(y, {
            boxSizingReliable: function() {
                return e(),
                r
            },
            pixelBoxStyles: function() {
                return e(),
                o
            },
            pixelPosition: function() {
                return e(),
                n
            },
            reliableMarginLeft: function() {
                return e(),
                a
            },
            scrollboxSize: function() {
                return e(),
                i
            }
        }))
    }();
    var Ue = ["Webkit", "Moz", "ms"]
      , Xe = E.createElement("div").style
      , Ve = {};
    function Ge(e) {
        return S.cssProps[e] || Ve[e] || (e in Xe ? e : Ve[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = Ue.length; n--; )
                if ((e = Ue[n] + t)in Xe)
                    return e
        }(e) || e)
    }
    var Ye = /^(none|table(?!-c[ea]).+)/
      , Qe = /^--/
      , Je = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Ke = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function Ze(e, t, n) {
        var r = ne.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function et(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0
          , s = 0
          , u = 0;
        if (n === (r ? "border" : "content"))
            return 0;
        for (; a < 4; a += 2)
            "margin" === n && (u += S.css(e, n + re[a], !0, i)),
            r ? ("content" === n && (u -= S.css(e, "padding" + re[a], !0, i)),
            "margin" !== n && (u -= S.css(e, "border" + re[a] + "Width", !0, i))) : (u += S.css(e, "padding" + re[a], !0, i),
            "padding" !== n ? u += S.css(e, "border" + re[a] + "Width", !0, i) : s += S.css(e, "border" + re[a] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0),
        u
    }
    function tt(e, t, n) {
        var r = Fe(e)
          , i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r)
          , o = i
          , a = _e(e, t, r)
          , s = "offset" + t[0].toUpperCase() + t.slice(1);
        if ($e.test(a)) {
            if (!n)
                return a;
            a = "auto"
        }
        return (!y.boxSizingReliable() && i || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r),
        (o = s in e) && (a = e[s])),
        (a = parseFloat(a) || 0) + et(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }
    function nt(e, t, n, r, i) {
        return new nt.prototype.init(e,t,n,r,i)
    }
    S.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = _e(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = V(t), u = Qe.test(t), l = e.style;
                if (u || (t = Ge(s)),
                a = S.cssHooks[t] || S.cssHooks[s],
                void 0 === n)
                    return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" == (o = typeof n) && (i = ne.exec(n)) && i[1] && (n = le(e, t, i),
                o = "number"),
                null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")),
                y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = V(t);
            return Qe.test(t) || (t = Ge(s)),
            (a = S.cssHooks[t] || S.cssHooks[s]) && "get"in a && (i = a.get(e, !0, n)),
            void 0 === i && (i = _e(e, t, r)),
            "normal" === i && t in Ke && (i = Ke[t]),
            "" === n || n ? (o = parseFloat(i),
            !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }),
    S.each(["height", "width"], function(e, u) {
        S.cssHooks[u] = {
            get: function(e, t, n) {
                if (t)
                    return !Ye.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, u, n) : ue(e, Je, function() {
                        return tt(e, u, n)
                    })
            },
            set: function(e, t, n) {
                var r, i = Fe(e), o = !y.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i), s = n ? et(e, u, n, a, i) : 0;
                return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - et(e, u, "border", !1, i) - .5)),
                s && (r = ne.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t,
                t = S.css(e, u)),
                Ze(0, t, s)
            }
        }
    }),
    S.cssHooks.marginLeft = ze(y.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(_e(e, "marginLeft")) || e.getBoundingClientRect().left - ue(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }),
    S.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        S.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                    n[i + re[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        },
        "margin" !== i && (S.cssHooks[i + o].set = Ze)
    }),
    S.fn.extend({
        css: function(e, t) {
            return _(this, function(e, t, n) {
                var r, i, o = {}, a = 0;
                if (Array.isArray(t)) {
                    for (r = Fe(e),
                    i = t.length; a < i; a++)
                        o[t[a]] = S.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? S.style(e, t, n) : S.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }),
    ((S.Tween = nt).prototype = {
        constructor: nt,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || S.easing._default,
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (S.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = nt.propHooks[this.prop];
            return e && e.get ? e.get(this) : nt.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = nt.propHooks[this.prop];
            return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : nt.propHooks._default.set(this),
            this
        }
    }).init.prototype = nt.prototype,
    (nt.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Ge(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = nt.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    S.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    },
    S.fx = nt.prototype.init,
    S.fx.step = {};
    var rt, it, ot, at, st = /^(?:toggle|show|hide)$/, ut = /queueHooks$/;
    function lt() {
        it && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(lt) : C.setTimeout(lt, S.fx.interval),
        S.fx.tick())
    }
    function ct() {
        return C.setTimeout(function() {
            rt = void 0
        }),
        rt = Date.now()
    }
    function ft(e, t) {
        var n, r = 0, i = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = re[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function pt(e, t, n) {
        for (var r, i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function dt(o, e, t) {
        var n, a, r = 0, i = dt.prefilters.length, s = S.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (a)
                return !1;
            for (var e = rt || ct(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++)
                l.tweens[r].run(n);
            return s.notifyWith(o, [l, n, t]),
            n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]),
            s.resolveWith(o, [l]),
            !1)
        }, l = s.promise({
            elem: o,
            props: S.extend({}, e),
            opts: S.extend(!0, {
                specialEasing: {},
                easing: S.easing._default
            }, t),
            originalProperties: e,
            originalOptions: t,
            startTime: rt || ct(),
            duration: t.duration,
            tweens: [],
            createTween: function(e, t) {
                var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                return l.tweens.push(n),
                n
            },
            stop: function(e) {
                var t = 0
                  , n = e ? l.tweens.length : 0;
                if (a)
                    return this;
                for (a = !0; t < n; t++)
                    l.tweens[t].run(1);
                return e ? (s.notifyWith(o, [l, 1, 0]),
                s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]),
                this
            }
        }), c = l.props;
        for (function(e, t) {
            var n, r, i, o, a;
            for (n in e)
                if (i = t[r = V(n)],
                o = e[n],
                Array.isArray(o) && (i = o[1],
                o = e[n] = o[0]),
                n !== r && (e[r] = o,
                delete e[n]),
                (a = S.cssHooks[r]) && "expand"in a)
                    for (n in o = a.expand(o),
                    delete e[r],
                    o)
                        n in e || (e[n] = o[n],
                        t[n] = i);
                else
                    t[r] = i
        }(c, l.opts.specialEasing); r < i; r++)
            if (n = dt.prefilters[r].call(l, o, c, l.opts))
                return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
                n;
        return S.map(c, pt, l),
        m(l.opts.start) && l.opts.start.call(o, l),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
        S.fx.timer(S.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })),
        l
    }
    S.Animation = S.extend(dt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return le(n.elem, e, ne.exec(t), n),
                n
            }
            ]
        },
        tweener: function(e, t) {
            for (var n, r = 0, i = (e = m(e) ? (t = e,
            ["*"]) : e.match(R)).length; r < i; r++)
                n = e[r],
                dt.tweeners[n] = dt.tweeners[n] || [],
                dt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, g = e.nodeType && se(e), v = Q.get(e, "fxshow");
            for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
            s = a.empty.fire,
            a.empty.fire = function() {
                a.unqueued || s()
            }
            ),
            a.unqueued++,
            p.always(function() {
                p.always(function() {
                    a.unqueued--,
                    S.queue(e, "fx").length || a.empty.fire()
                })
            })),
            t)
                if (i = t[r],
                st.test(i)) {
                    if (delete t[r],
                    o = o || "toggle" === i,
                    i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r])
                            continue;
                        g = !0
                    }
                    d[r] = v && v[r] || S.style(e, r)
                }
            if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
                null == (l = v && v.display) && (l = Q.get(e, "display")),
                "none" === (c = S.css(e, "display")) && (l ? c = l : (fe([e], !0),
                l = e.style.display || l,
                c = S.css(e, "display"),
                fe([e]))),
                ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function() {
                    h.display = l
                }),
                null == l && (c = h.display,
                l = "none" === c ? "" : c)),
                h.display = "inline-block")),
                n.overflow && (h.overflow = "hidden",
                p.always(function() {
                    h.overflow = n.overflow[0],
                    h.overflowX = n.overflow[1],
                    h.overflowY = n.overflow[2]
                })),
                u = !1,
                d)
                    u || (v ? "hidden"in v && (g = v.hidden) : v = Q.access(e, "fxshow", {
                        display: l
                    }),
                    o && (v.hidden = !g),
                    g && fe([e], !0),
                    p.done(function() {
                        for (r in g || fe([e]),
                        Q.remove(e, "fxshow"),
                        d)
                            S.style(e, r, d[r])
                    })),
                    u = pt(g ? v[r] : 0, r, p),
                    r in v || (v[r] = u.start,
                    g && (u.end = u.start,
                    u.start = 0))
        }
        ],
        prefilter: function(e, t) {
            t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
        }
    }),
    S.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? S.extend({}, e) : {
            complete: n || !n && t || m(e) && e,
            duration: e,
            easing: n && t || t && !m(t) && t
        };
        return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default),
        null != r.queue && !0 !== r.queue || (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            m(r.old) && r.old.call(this),
            r.queue && S.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    S.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(se).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = S.isEmptyObject(t)
              , o = S.speed(e, n, r)
              , a = function() {
                var e = dt(this, S.extend({}, t), o);
                (i || Q.get(this, "finish")) && e.stop(!0)
            };
            return a.finish = a,
            i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(i, e, o) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop,
                t(o)
            };
            return "string" != typeof i && (o = e,
            e = i,
            i = void 0),
            e && !1 !== i && this.queue(i || "fx", []),
            this.each(function() {
                var e = !0
                  , t = null != i && i + "queueHooks"
                  , n = S.timers
                  , r = Q.get(this);
                if (t)
                    r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r)
                        r[t] && r[t].stop && ut.test(t) && a(r[t]);
                for (t = n.length; t--; )
                    n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o),
                    e = !1,
                    n.splice(t, 1));
                !e && o || S.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"),
            this.each(function() {
                var e, t = Q.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = S.timers, o = n ? n.length : 0;
                for (t.finish = !0,
                S.queue(this, a, []),
                r && r.stop && r.stop.call(this, !0),
                e = i.length; e--; )
                    i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0),
                    i.splice(e, 1));
                for (e = 0; e < o; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }),
    S.each(["toggle", "show", "hide"], function(e, r) {
        var i = S.fn[r];
        S.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(ft(r, !0), e, t, n)
        }
    }),
    S.each({
        slideDown: ft("show"),
        slideUp: ft("hide"),
        slideToggle: ft("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        S.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }),
    S.timers = [],
    S.fx.tick = function() {
        var e, t = 0, n = S.timers;
        for (rt = Date.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || S.fx.stop(),
        rt = void 0
    }
    ,
    S.fx.timer = function(e) {
        S.timers.push(e),
        S.fx.start()
    }
    ,
    S.fx.interval = 13,
    S.fx.start = function() {
        it || (it = !0,
        lt())
    }
    ,
    S.fx.stop = function() {
        it = null
    }
    ,
    S.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    S.fn.delay = function(r, e) {
        return r = S.fx && S.fx.speeds[r] || r,
        e = e || "fx",
        this.queue(e, function(e, t) {
            var n = C.setTimeout(e, r);
            t.stop = function() {
                C.clearTimeout(n)
            }
        })
    }
    ,
    ot = E.createElement("input"),
    at = E.createElement("select").appendChild(E.createElement("option")),
    ot.type = "checkbox",
    y.checkOn = "" !== ot.value,
    y.optSelected = at.selected,
    (ot = E.createElement("input")).value = "t",
    ot.type = "radio",
    y.radioValue = "t" === ot.value;
    var ht, gt = S.expr.attrHandle;
    S.fn.extend({
        attr: function(e, t) {
            return _(this, S.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                S.removeAttr(this, e)
            })
        }
    }),
    S.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return void 0 === e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? ht : void 0)),
                void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!y.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0, i = t && t.match(R);
            if (i && 1 === e.nodeType)
                for (; n = i[r++]; )
                    e.removeAttribute(n)
        }
    }),
    ht = {
        set: function(e, t, n) {
            return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n),
            n
        }
    },
    S.each(S.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = gt[t] || S.find.attr;
        gt[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = gt[o],
            gt[o] = r,
            r = null != a(e, t, n) ? o : null,
            gt[o] = i),
            r
        }
    });
    var vt = /^(?:input|select|textarea|button)$/i
      , yt = /^(?:a|area)$/i;
    function mt(e) {
        return (e.match(R) || []).join(" ")
    }
    function xt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    function bt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(R) || []
    }
    S.fn.extend({
        prop: function(e, t) {
            return _(this, S.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[S.propFix[e] || e]
            })
        }
    }),
    S.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t,
                i = S.propHooks[t]),
                void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = S.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : vt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    y.optSelected || (S.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex,
            null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex)
        }
    }),
    S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        S.propFix[this.toLowerCase()] = this
    }),
    S.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t))
                return this.each(function(e) {
                    S(this).addClass(t.call(this, e, xt(this)))
                });
            if ((e = bt(t)).length)
                for (; n = this[u++]; )
                    if (i = xt(n),
                    r = 1 === n.nodeType && " " + mt(i) + " ") {
                        for (a = 0; o = e[a++]; )
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = mt(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t))
                return this.each(function(e) {
                    S(this).removeClass(t.call(this, e, xt(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ((e = bt(t)).length)
                for (; n = this[u++]; )
                    if (i = xt(n),
                    r = 1 === n.nodeType && " " + mt(i) + " ") {
                        for (a = 0; o = e[a++]; )
                            for (; -1 < r.indexOf(" " + o + " "); )
                                r = r.replace(" " + o + " ", " ");
                        i !== (s = mt(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(i, t) {
            var o = typeof i
              , a = "string" == o || Array.isArray(i);
            return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function(e) {
                S(this).toggleClass(i.call(this, e, xt(this), t), t)
            }) : this.each(function() {
                var e, t, n, r;
                if (a)
                    for (t = 0,
                    n = S(this),
                    r = bt(i); e = r[t++]; )
                        n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else
                    void 0 !== i && "boolean" != o || ((e = xt(this)) && Q.set(this, "__className__", e),
                    this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Q.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++]; )
                if (1 === n.nodeType && -1 < (" " + mt(xt(n)) + " ").indexOf(t))
                    return !0;
            return !1
        }
    });
    var wt = /\r/g;
    S.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = m(n),
            this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function(e) {
                    return null == e ? "" : e + ""
                })),
                (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set"in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get"in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(wt, "") : null == e ? "" : e : void 0
        }
    }),
    S.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = S.find.attr(e, "value");
                    return null != t ? t : mt(S.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = S(n).val(),
                            a)
                                return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = S.makeArray(t), a = i.length; a--; )
                        ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    S.each(["radio", "checkbox"], function() {
        S.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = -1 < S.inArray(S(e).val(), t)
            }
        },
        y.checkOn || (S.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    }),
    y.focusin = "onfocusin"in C;
    var Tt = /^(?:focusinfocus|focusoutblur)$/
      , Ct = function(e) {
        e.stopPropagation()
    };
    S.extend(S.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p = [n || E], d = v.call(e, "type") ? e.type : e, h = v.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = a = n = n || E,
            3 !== n.nodeType && 8 !== n.nodeType && !Tt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(),
            h.sort()),
            u = d.indexOf(":") < 0 && "on" + d,
            (e = e[S.expando] ? e : new S.Event(d,"object" == typeof e && e)).isTrigger = r ? 2 : 3,
            e.namespace = h.join("."),
            e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            e.result = void 0,
            e.target || (e.target = n),
            t = null == t ? [e] : S.makeArray(t, [e]),
            c = S.event.special[d] || {},
            r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !x(n)) {
                    for (s = c.delegateType || d,
                    Tt.test(s + d) || (o = o.parentNode); o; o = o.parentNode)
                        p.push(o),
                        a = o;
                    a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C)
                }
                for (i = 0; (o = p[i++]) && !e.isPropagationStopped(); )
                    f = o,
                    e.type = 1 < i ? s : c.bindType || d,
                    (l = (Q.get(o, "events") || {})[e.type] && Q.get(o, "handle")) && l.apply(o, t),
                    (l = u && o[u]) && l.apply && G(o) && (e.result = l.apply(o, t),
                    !1 === e.result && e.preventDefault());
                return e.type = d,
                r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !G(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null),
                S.event.triggered = d,
                e.isPropagationStopped() && f.addEventListener(d, Ct),
                n[d](),
                e.isPropagationStopped() && f.removeEventListener(d, Ct),
                S.event.triggered = void 0,
                a && (n[u] = a)),
                e.result
            }
        },
        simulate: function(e, t, n) {
            var r = S.extend(new S.Event, n, {
                type: e,
                isSimulated: !0
            });
            S.event.trigger(r, null, t)
        }
    }),
    S.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                S.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return S.event.trigger(e, t, n, !0)
        }
    }),
    y.focusin || S.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        var i = function(e) {
            S.event.simulate(r, e.target, S.event.fix(e))
        };
        S.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this
                  , t = Q.access(e, r);
                t || e.addEventListener(n, i, !0),
                Q.access(e, r, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this
                  , t = Q.access(e, r) - 1;
                t ? Q.access(e, r, t) : (e.removeEventListener(n, i, !0),
                Q.remove(e, r))
            }
        }
    });
    var Et = C.location
      , St = Date.now()
      , kt = /\?/;
    S.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e)
            return null;
        try {
            t = (new C.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e),
        t
    }
    ;
    var Nt = /\[\]$/
      , At = /\r?\n/g
      , Dt = /^(?:submit|button|image|reset|file)$/i
      , jt = /^(?:input|select|textarea|keygen)/i;
    function qt(n, e, r, i) {
        var t;
        if (Array.isArray(e))
            S.each(e, function(e, t) {
                r || Nt.test(n) ? i(n, t) : qt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
            });
        else if (r || "object" !== w(e))
            i(n, e);
        else
            for (t in e)
                qt(n + "[" + t + "]", e[t], r, i)
    }
    S.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            var n = m(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
        if (null == e)
            return "";
        if (Array.isArray(e) || e.jquery && !S.isPlainObject(e))
            S.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                qt(n, e[n], t, i);
        return r.join("&")
    }
    ,
    S.fn.extend({
        serialize: function() {
            return S.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = S.prop(this, "elements");
                return e ? S.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !S(this).is(":disabled") && jt.test(this.nodeName) && !Dt.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var n = S(this).val();
                return null == n ? null : Array.isArray(n) ? S.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(At, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(At, "\r\n")
                }
            }).get()
        }
    });
    var Lt = /%20/g
      , Ht = /#.*$/
      , Ot = /([?&])_=[^&]*/
      , Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , Rt = /^(?:GET|HEAD)$/
      , Mt = /^\/\//
      , It = {}
      , Wt = {}
      , $t = "*/".concat("*")
      , Ft = E.createElement("a");
    function Bt(o) {
        return function(e, t) {
            "string" != typeof e && (t = e,
            e = "*");
            var n, r = 0, i = e.toLowerCase().match(R) || [];
            if (m(t))
                for (; n = i[r++]; )
                    "+" === n[0] ? (n = n.slice(1) || "*",
                    (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }
    function _t(t, i, o, a) {
        var s = {}
          , u = t === Wt;
        function l(e) {
            var r;
            return s[e] = !0,
            S.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n),
                l(n),
                !1)
            }),
            r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }
    function zt(e, t) {
        var n, r, i = S.ajaxSettings.flatOptions || {};
        for (n in t)
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && S.extend(!0, e, r),
        e
    }
    Ft.href = Et.href,
    S.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Et.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $t,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": S.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? zt(zt(e, S.ajaxSettings), t) : zt(S.ajaxSettings, e)
        },
        ajaxPrefilter: Bt(It),
        ajaxTransport: Bt(Wt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e,
            e = void 0),
            t = t || {};
            var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t), y = v.context || v, m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event, x = S.Deferred(), b = S.Callbacks("once memory"), w = v.statusCode || {}, a = {}, s = {}, u = "canceled", T = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (h) {
                        if (!n)
                            for (n = {}; t = Pt.exec(p); )
                                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        t = n[e.toLowerCase() + " "]
                    }
                    return null == t ? null : t.join(", ")
                },
                getAllResponseHeaders: function() {
                    return h ? p : null
                },
                setRequestHeader: function(e, t) {
                    return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e,
                    a[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return null == h && (v.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (h)
                            T.always(e[T.status]);
                        else
                            for (t in e)
                                w[t] = [w[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || u;
                    return c && c.abort(t),
                    l(0, t),
                    this
                }
            };
            if (x.promise(T),
            v.url = ((e || v.url || Et.href) + "").replace(Mt, Et.protocol + "//"),
            v.type = t.method || t.type || v.method || v.type,
            v.dataTypes = (v.dataType || "*").toLowerCase().match(R) || [""],
            null == v.crossDomain) {
                r = E.createElement("a");
                try {
                    r.href = v.url,
                    r.href = r.href,
                    v.crossDomain = Ft.protocol + "//" + Ft.host != r.protocol + "//" + r.host
                } catch (e) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)),
            _t(It, v, t, T),
            h)
                return T;
            for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"),
            v.type = v.type.toUpperCase(),
            v.hasContent = !Rt.test(v.type),
            f = v.url.replace(Ht, ""),
            v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Lt, "+")) : (o = v.url.slice(f.length),
            v.data && (v.processData || "string" == typeof v.data) && (f += (kt.test(f) ? "&" : "?") + v.data,
            delete v.data),
            !1 === v.cache && (f = f.replace(Ot, "$1"),
            o = (kt.test(f) ? "&" : "?") + "_=" + St++ + o),
            v.url = f + o),
            v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]),
            S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])),
            (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType),
            T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : v.accepts["*"]),
            v.headers)
                T.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
                return T.abort();
            if (u = "abort",
            b.add(v.complete),
            T.done(v.success),
            T.fail(v.error),
            c = _t(Wt, v, t, T)) {
                if (T.readyState = 1,
                g && m.trigger("ajaxSend", [T, v]),
                h)
                    return T;
                v.async && 0 < v.timeout && (d = C.setTimeout(function() {
                    T.abort("timeout")
                }, v.timeout));
                try {
                    h = !1,
                    c.send(a, l)
                } catch (e) {
                    if (h)
                        throw e;
                    l(-1, e)
                }
            } else
                l(-1, "No Transport");
            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0,
                d && C.clearTimeout(d),
                c = void 0,
                p = r || "",
                T.readyState = 0 < e ? 4 : 0,
                i = 200 <= e && e < 300 || 304 === e,
                n && (s = function(e, t, n) {
                    for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0]; )
                        u.shift(),
                        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            }
                    if (u[0]in n)
                        o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o)
                        return o !== u[0] && u.unshift(o),
                        n[o]
                }(v, T, n)),
                s = function(e, t, n, r) {
                    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters)
                            l[a.toLowerCase()] = e.converters[a];
                    for (o = c.shift(); o; )
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                        !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                        u = o,
                        o = c.shift())
                            if ("*" === o)
                                o = u;
                            else if ("*" !== u && u !== o) {
                                if (!(a = l[u + " " + o] || l["* " + o]))
                                    for (i in l)
                                        if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                            c.unshift(s[1]));
                                            break
                                        }
                                if (!0 !== a)
                                    if (a && e.throws)
                                        t = a(t);
                                    else
                                        try {
                                            t = a(t)
                                        } catch (e) {
                                            return {
                                                state: "parsererror",
                                                error: a ? e : "No conversion from " + u + " to " + o
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, T, i),
                i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u),
                (u = T.getResponseHeader("etag")) && (S.etag[f] = u)),
                204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state,
                o = s.data,
                i = !(a = s.error))) : (a = l,
                !e && l || (l = "error",
                e < 0 && (e = 0))),
                T.status = e,
                T.statusText = (t || l) + "",
                i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
                T.statusCode(w),
                w = void 0,
                g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
                b.fireWith(y, [T, l]),
                g && (m.trigger("ajaxComplete", [T, v]),
                --S.active || S.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return S.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return S.get(e, void 0, t, "script")
        }
    }),
    S.each(["get", "post"], function(e, i) {
        S[i] = function(e, t, n, r) {
            return m(t) && (r = r || n,
            n = t,
            t = void 0),
            S.ajax(S.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, S.isPlainObject(e) && e))
        }
    }),
    S._evalUrl = function(e, t) {
        return S.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                S.globalEval(e, t)
            }
        })
    }
    ,
    S.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (m(e) && (e = e.call(this[0])),
            t = S(e, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && t.insertBefore(this[0]),
            t.map(function() {
                for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                return e
            }).append(this)),
            this
        },
        wrapInner: function(n) {
            return m(n) ? this.each(function(e) {
                S(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = S(this)
                  , t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = m(t);
            return this.each(function(e) {
                S(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                S(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    S.expr.pseudos.hidden = function(e) {
        return !S.expr.pseudos.visible(e)
    }
    ,
    S.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }
    ,
    S.ajaxSettings.xhr = function() {
        try {
            return new C.XMLHttpRequest
        } catch (e) {}
    }
    ;
    var Ut = {
        0: 200,
        1223: 204
    }
      , Xt = S.ajaxSettings.xhr();
    y.cors = !!Xt && "withCredentials"in Xt,
    y.ajax = Xt = !!Xt,
    S.ajaxTransport(function(i) {
        var o, a;
        if (y.cors || Xt && !i.crossDomain)
            return {
                send: function(e, t) {
                    var n, r = i.xhr();
                    if (r.open(i.type, i.url, i.async, i.username, i.password),
                    i.xhrFields)
                        for (n in i.xhrFields)
                            r[n] = i.xhrFields[n];
                    for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType),
                    i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"),
                    e)
                        r.setRequestHeader(n, e[n]);
                    o = function(e) {
                        return function() {
                            o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null,
                            "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Ut[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }
                    ,
                    r.onload = o(),
                    a = r.onerror = r.ontimeout = o("error"),
                    void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                        4 === r.readyState && C.setTimeout(function() {
                            o && a()
                        })
                    }
                    ,
                    o = o("abort");
                    try {
                        r.send(i.hasContent && i.data || null)
                    } catch (e) {
                        if (o)
                            throw e
                    }
                },
                abort: function() {
                    o && o()
                }
            }
    }),
    S.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }),
    S.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return S.globalEval(e),
                e
            }
        }
    }),
    S.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET")
    }),
    S.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs)
            return {
                send: function(e, t) {
                    r = S("<script>").attr(n.scriptAttrs || {}).prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", i = function(e) {
                        r.remove(),
                        i = null,
                        e && t("error" === e.type ? 404 : 200, e.type)
                    }
                    ),
                    E.head.appendChild(r[0])
                },
                abort: function() {
                    i && i()
                }
            }
    });
    var Vt, Gt = [], Yt = /(=)\?(?=&|$)|\?\?/;
    S.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Gt.pop() || S.expando + "_" + St++;
            return this[e] = !0,
            e
        }
    }),
    S.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Yt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0])
            return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
            a ? e[a] = e[a].replace(Yt, "$1" + r) : !1 !== e.jsonp && (e.url += (kt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
            e.converters["script json"] = function() {
                return o || S.error(r + " was not called"),
                o[0]
            }
            ,
            e.dataTypes[0] = "json",
            i = C[r],
            C[r] = function() {
                o = arguments
            }
            ,
            n.always(function() {
                void 0 === i ? S(C).removeProp(r) : C[r] = i,
                e[r] && (e.jsonpCallback = t.jsonpCallback,
                Gt.push(r)),
                o && m(i) && i(o[0]),
                o = i = void 0
            }),
            "script"
    }),
    y.createHTMLDocument = ((Vt = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === Vt.childNodes.length),
    S.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
        t = !1),
        t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href,
        t.head.appendChild(r)) : t = E),
        o = !n && [],
        (i = D.exec(e)) ? [t.createElement(i[1])] : (i = we([e], t, o),
        o && o.length && S(o).remove(),
        S.merge([], i.childNodes)));
        var r, i, o
    }
    ,
    S.fn.load = function(e, t, n) {
        var r, i, o, a = this, s = e.indexOf(" ");
        return -1 < s && (r = mt(e.slice(s)),
        e = e.slice(0, s)),
        m(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (i = "POST"),
        0 < a.length && S.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }
        ),
        this
    }
    ,
    S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        S.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    S.expr.pseudos.animated = function(t) {
        return S.grep(S.timers, function(e) {
            return t === e.elem
        }).length
    }
    ,
    S.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = S.css(e, "position"), c = S(e), f = {};
            "static" === l && (e.style.position = "relative"),
            s = c.offset(),
            o = S.css(e, "top"),
            u = S.css(e, "left"),
            i = ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top,
            r.left) : (a = parseFloat(o) || 0,
            parseFloat(u) || 0),
            m(t) && (t = t.call(e, n, S.extend({}, s))),
            null != t.top && (f.top = t.top - s.top + a),
            null != t.left && (f.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, f) : c.css(f)
        }
    },
    S.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    S.offset.setOffset(this, t, e)
                });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(),
            n = r.ownerDocument.defaultView,
            {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0], i = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === S.css(r, "position"))
                    t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(),
                    n = r.ownerDocument,
                    e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position"); )
                        e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0),
                    i.left += S.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - S.css(r, "marginTop", !0),
                    left: t.left - i.left - S.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === S.css(e, "position"); )
                    e = e.offsetParent;
                return e || ie
            })
        }
    }),
    S.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        S.fn[t] = function(e) {
            return _(this, function(e, t, n) {
                var r;
                if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView),
                void 0 === n)
                    return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }),
    S.each(["top", "left"], function(e, n) {
        S.cssHooks[n] = ze(y.pixelPosition, function(e, t) {
            if (t)
                return t = _e(e, n),
                $e.test(t) ? S(e).position()[n] + "px" : t
        })
    }),
    S.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        S.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            S.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e)
                  , i = r || (!0 === e || !0 === t ? "margin" : "border");
                return _(this, function(e, t, n) {
                    var r;
                    return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement,
                    Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }),
    S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        S.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }),
    S.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    S.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }),
    S.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t],
        t = e,
        e = n),
        m(e))
            return r = s.call(arguments, 2),
            (i = function() {
                return e.apply(t || this, r.concat(s.call(arguments)))
            }
            ).guid = e.guid = e.guid || S.guid++,
            i
    }
    ,
    S.holdReady = function(e) {
        e ? S.readyWait++ : S.ready(!0)
    }
    ,
    S.isArray = Array.isArray,
    S.parseJSON = JSON.parse,
    S.nodeName = A,
    S.isFunction = m,
    S.isWindow = x,
    S.camelCase = V,
    S.type = w,
    S.now = Date.now,
    S.isNumeric = function(e) {
        var t = S.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return S
    });
    var Qt = C.jQuery
      , Jt = C.$;
    return S.noConflict = function(e) {
        return C.$ === S && (C.$ = Jt),
        e && C.jQuery === S && (C.jQuery = Qt),
        S
    }
    ,
    e || (C.jQuery = C.$ = S),
    S
});
jQuery(function(n) {
    "use strict";
    n(".c-tab-login__nav-link").length < 2 && n(".c-tab-login__header").addClass("hide-in-desktop");
    try {
        if ("undefined" == typeof Storage)
            throw 1;
        var t = sessionStorage.getItem("active-tab", t);
        if (!t || !/^[a-z]{2,10}-[a-z]{2,10}$/.test(t))
            throw 2;
        if (1 !== n('.c-tab-login__nav-link[data-tab="' + t + '"]').length)
            throw 3;
        l(n('.c-tab-login__nav-link[data-tab="' + t + '"]'), n('.c-tab-login__content[data-tab="' + t + '"]'))
    } catch (t) {
        l(n(".c-tab-login__nav-link").first(), n(".c-tab-login__content").first())
    }
    function i(t) {
        return t && /^[0-9]{11}$/.test(t)
    }
    function a(t) {
        return t && /^[0-9]{3,15}$/.test(t)
    }
    function o(t, e) {
        if (e(t.val()))
            return t.removeClass("is-invalid"),
            t.parent("div.input-group").removeClass("is-invalid"),
            d(t.parents("td").children("div.invalid-feedback")),
            !0;
        t.addClass("is-invalid"),
        t.parent("div.input-group").addClass("is-invalid");
        var i = t.val() ? 1 : 0;
        return t.parents("td").children("div.invalid-feedback").each(function(t) {
            t === i ? (s(n(this)),
            n(this).text(n(this).text())) : d(n(this))
        }),
        !1
    }
    function e(t, e) {
        if (e(t.val()))
            return t.parent("td").find(".selectize-input").removeClass("is-invalid"),
            d(t.parent("td").children("div.invalid-feedback")),
            !0;
        t.parent("td").find(".selectize-input").addClass("is-invalid");
        var i = t.parent("td").children("div.invalid-feedback");
        return s(i),
        i.text(i.text()),
        !1
    }
    function r(t) {
        t.removeAttr("role"),
        t.attr("aria-hidden", "true"),
        t.removeClass("show")
    }
    function s(t) {
        t.attr("role", "alert"),
        t.removeClass("is-hidden")
    }
    function d(t) {
        t.removeAttr("role"),
        t.addClass("is-hidden")
    }
    function l(t, e) {
        t.parent().attr("aria-selected", !0),
        t.addClass("is-active"),
        e.attr("aria-hidden", !1),
        e.addClass("is-active")
    }
    n(document).on("click", ".c-tab-login__nav-link", function(t) {
        t.preventDefault();
        var e = n(document).width()
          , i = n(this).data("tab");
        r(n('.c-tab-login__content[data-tab="' + i + '"] [role="alert"]')),
        d(n('.c-tab-login__content[data-tab="' + i + '"] .invalid-feedback')),
        n('.c-tab-login__content[data-tab="' + i + '"] .input-group').removeClass("is-invalid"),
        n('.c-tab-login__content[data-tab="' + i + '"] .selectize-input').removeClass("is-invalid"),
        n(".c-tab-login__nav-item").removeClass("is-active"),
        function(t, e) {
            t.parent().attr("aria-selected", !1),
            t.removeClass("is-active"),
            e.attr("aria-hidden", !0),
            e.removeClass("is-active")
        }(n(".c-tab-login__nav-link"), n(".c-tab-login__content")),
        l(n(this), n('.c-tab-login__content[data-tab="' + i + '"]')),
        "undefined" != typeof Storage && sessionStorage.setItem("active-tab", i),
        n("body").removeClass("is-mobile-subview"),
        e <= 800 && (n("body").addClass("is-mobile-subview"),
        n(this).parent().addClass("is-active")),
        n('.c-tab-login__content[data-tab="' + i + '"]').find(".c-tab-login__content-wrap").first().attr("tabindex", -1).focus()
    }),
    n(document).on("click", ".c-tab-login__nav-back-link", function(t) {
        t.preventDefault(),
        n("body").removeClass("is-mobile-subview"),
        n(".c-tab-login__nav-item").removeClass("is-active")
    }),
    n(document).on("click", ".alert-popup .close", function(t) {
        t.preventDefault(),
        r(n(this).closest(".alert"))
    }),
    n(".js-select-country").selectize(),
    n("#idCardForm button.c-btn--primary").on("click", function(t) {
        if (t.preventDefault(),
        r(n("#idCardForm .alert-popup")),
        !n(this).prop("disabled")) {
            n(this).prop("disabled", !0);
            var i = n(this)
              , e = new XMLHttpRequest;
            e.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (200 !== this.status || '{"ok":true}' !== this.responseText) {
                        !function(t) {
                            t.attr("role", "alert"),
                            t.removeAttr("aria-hidden"),
                            t.addClass("show")
                        }(n("#idCardForm .alert-popup"));
                        var t = n("#idCardForm .alert-popup #error-message-title")
                          , e = n("#idCardForm .alert-popup #error-message");
                        t.text(t.text()),
                        e.text(e.text()),
                        i.prop("disabled", !1)
                    } else
                        n("#idCardForm").submit()
            }
            ,
            e.open("GET", "/idcard", !0),
            e.setRequestHeader("Content-type", "application/json;charset=UTF-8"),
            e.send()
        }
    }),
    // tara SSO specific changes start

    n("#consentForm button.c-btn--primary").on("click", function(t) {
        n("#consentForm input#re_authenticate").val('false');
        n("#consentForm").submit();
    }),
    n("#consentForm button.c-btn--cancel").on("click", function(t) {
        n("#consentForm input#re_authenticate").val('true');
        n("#consentForm").submit();
    }),

    n("#logoutForm button.c-btn--primary").on("click", function(t) {
        n("#logoutForm input#logout_all_sessions").val('true');
        n("#logoutForm").submit();
    }),
    n("#logoutForm button.c-btn--cancel").on("click", function(t) {
        n("#logoutForm input#logout_all_sessions").val('false');
        n("#logoutForm").submit();
    }),

    //    n("#mobileIdForm input.form-control").on("keypress", function(t) {
    //        13 === t.keyCode && (n("#mobileIdForm button.c-btn--primary").trigger("click"),
    //        t.preventDefault())
    //    }),
    //    n("#mobileIdForm input.form-control").on("focus", function() {
    //        o(n(this), function() {
    //            return !0
    //        })
    //    }),

    //  tara SSO specific changes end

    n("#bankForm a.c-logo-list__link").on("click", function(t) {
        t.preventDefault(),
        n('#bankForm input[name="bank"]').val(n(this).attr("id")),
        n("#bankForm").submit()
    }),
    n("#smartIdForm button.c-btn--primary").on("click", function(t) {
        t.preventDefault(),
        n(this).prop("disabled") || (n(this).prop("disabled", !0),
        o(n("#sid-personal-code"), i) ? n("#smartIdForm").submit() : n(this).prop("disabled", !1))
    }),
    n("#smartIdForm input.form-control").on("keypress", function(t) {
        13 === t.keyCode && (n("#smartIdForm button.c-btn--primary").trigger("click"),
        t.preventDefault())
    }),
    n("#smartIdForm input.form-control").on("focus", function() {
        o(n(this), function() {
            return !0
        })
    }),
    n("#authenticationCheckForm a.c-btn--from-link").on("click", function(t) {
        t.preventDefault(),
        n(this).prop("disabled") || (n(this).prop("disabled", !0),
        n("#_eventId").val("cancel"),
        n("#authenticationCheckForm").submit())
    }),
    n("#eidasForm button.c-btn--primary").on("click", function(t) {
        t.preventDefault(),
        n(this).prop("disabled") || (n(this).prop("disabled", !0),
        e(n("#eidasForm select"), function(t) {
            return t
        }) ? n("#eidasForm").submit() : n(this).prop("disabled", !1))
    }),
    n("#eidasForm select").on("change", function() {
        e(n(this), function() {
            return !0
        })
    })
});
!function(t, e) {
    "function" == typeof define && define.amd ? define("sifter", e) : "object" == typeof exports ? module.exports = e() : t.Sifter = e()
}(this, function() {
    var t = function(t, e) {
        this.items = t,
        this.settings = e || {
            diacritics: !0
        }
    };
    t.prototype.tokenize = function(t) {
        if (!(t = a(String(t || "").toLowerCase())) || !t.length)
            return [];
        var e, n, i, o, s = [], r = t.split(/ +/);
        for (e = 0,
        n = r.length; e < n; e++) {
            if (i = l(r[e]),
            this.settings.diacritics)
                for (o in p)
                    p.hasOwnProperty(o) && (i = i.replace(new RegExp(o,"g"), p[o]));
            s.push({
                string: r[e],
                regex: new RegExp(i,"i")
            })
        }
        return s
    }
    ,
    t.prototype.iterator = function(t, e) {
        (r(t) ? Array.prototype.forEach || function(t) {
            for (var e = 0, n = this.length; e < n; e++)
                t(this[e], e, this)
        }
        : function(t) {
            for (var e in this)
                this.hasOwnProperty(e) && t(this[e], e, this)
        }
        ).apply(t, [e])
    }
    ,
    t.prototype.getScoreFunction = function(t, e) {
        var o, s, r, a;
        t = this.prepareSearch(t, e),
        s = t.tokens,
        o = t.options.fields,
        r = s.length,
        a = t.options.nesting;
        var l, p = function(t, e) {
            var n, i;
            return t ? -1 === (i = (t = String(t || "")).search(e.regex)) ? 0 : (n = e.string.length / t.length,
            0 === i && (n += .5),
            n) : 0
        }, u = (l = o.length) ? 1 === l ? function(t, e) {
            return p(g(e, o[0], a), t)
        }
        : function(t, e) {
            for (var n = 0, i = 0; n < l; n++)
                i += p(g(e, o[n], a), t);
            return i / l
        }
        : function() {
            return 0
        }
        ;
        return r ? 1 === r ? function(t) {
            return u(s[0], t)
        }
        : "and" === t.options.conjunction ? function(t) {
            for (var e, n = 0, i = 0; n < r; n++) {
                if ((e = u(s[n], t)) <= 0)
                    return 0;
                i += e
            }
            return i / r
        }
        : function(t) {
            for (var e = 0, n = 0; e < r; e++)
                n += u(s[e], t);
            return n / r
        }
        : function() {
            return 0
        }
    }
    ,
    t.prototype.getSortFunction = function(t, n) {
        var e, i, o, s, r, a, l, p, u, c, d;
        if (d = !(t = (o = this).prepareSearch(t, n)).query && n.sort_empty || n.sort,
        u = function(t, e) {
            return "$score" === t ? e.score : g(o.items[e.id], t, n.nesting)
        }
        ,
        r = [],
        d)
            for (e = 0,
            i = d.length; e < i; e++)
                (t.query || "$score" !== d[e].field) && r.push(d[e]);
        if (t.query) {
            for (c = !0,
            e = 0,
            i = r.length; e < i; e++)
                if ("$score" === r[e].field) {
                    c = !1;
                    break
                }
            c && r.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
            for (e = 0,
            i = r.length; e < i; e++)
                if ("$score" === r[e].field) {
                    r.splice(e, 1);
                    break
                }
        for (p = [],
        e = 0,
        i = r.length; e < i; e++)
            p.push("desc" === r[e].direction ? -1 : 1);
        return (a = r.length) ? 1 === a ? (s = r[0].field,
        l = p[0],
        function(t, e) {
            return l * h(u(s, t), u(s, e))
        }
        ) : function(t, e) {
            var n, i, o;
            for (n = 0; n < a; n++)
                if (o = r[n].field,
                i = p[n] * h(u(o, t), u(o, e)))
                    return i;
            return 0
        }
        : null
    }
    ,
    t.prototype.prepareSearch = function(t, e) {
        if ("object" == typeof t)
            return t;
        var n = (e = s({}, e)).fields
          , i = e.sort
          , o = e.sort_empty;
        return n && !r(n) && (e.fields = [n]),
        i && !r(i) && (e.sort = [i]),
        o && !r(o) && (e.sort_empty = [o]),
        {
            options: e,
            query: String(t || "").toLowerCase(),
            tokens: this.tokenize(t),
            total: 0,
            items: []
        }
    }
    ,
    t.prototype.search = function(t, n) {
        var i, o, e, s, r = this;
        return o = this.prepareSearch(t, n),
        n = o.options,
        t = o.query,
        s = n.score || r.getScoreFunction(o),
        t.length ? r.iterator(r.items, function(t, e) {
            i = s(t),
            (!1 === n.filter || 0 < i) && o.items.push({
                score: i,
                id: e
            })
        }) : r.iterator(r.items, function(t, e) {
            o.items.push({
                score: 1,
                id: e
            })
        }),
        (e = r.getSortFunction(o, n)) && o.items.sort(e),
        o.total = o.items.length,
        "number" == typeof n.limit && (o.items = o.items.slice(0, n.limit)),
        o
    }
    ;
    var h = function(t, e) {
        return "number" == typeof t && "number" == typeof e || (t = n(String(t || "")),
        e = n(String(e || ""))),
        e < t ? 1 : t < e ? -1 : 0
    }
      , s = function(t, e) {
        var n, i, o, s;
        for (n = 1,
        i = arguments.length; n < i; n++)
            if (s = arguments[n])
                for (o in s)
                    s.hasOwnProperty(o) && (t[o] = s[o]);
        return t
    }
      , g = function(t, e, n) {
        if (t && e) {
            if (!n)
                return t[e];
            for (var i = e.split("."); i.length && (t = t[i.shift()]); )
                ;
            return t
        }
    }
      , a = function(t) {
        return (t + "").replace(/^\s+|\s+$|/g, "")
    }
      , l = function(t) {
        return (t + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    }
      , r = Array.isArray || "undefined" != typeof $ && $.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
      , p = {
        a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
        b: "[b␢βΒB฿𐌁ᛒ]",
        c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
        d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
        e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
        f: "[fƑƒḞḟ]",
        g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
        h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
        i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
        j: "[jȷĴĵɈɉʝɟʲ]",
        k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
        l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
        n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
        o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
        p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
        q: "[qꝖꝗʠɊɋꝘꝙq̃]",
        r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
        s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
        t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
        u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
        v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
        w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
        x: "[xẌẍẊẋχ]",
        y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
        z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
    }
      , n = function() {
        var t, e, n, i, o = "", s = {};
        for (n in p)
            if (p.hasOwnProperty(n))
                for (o += i = p[n].substring(2, p[n].length - 1),
                t = 0,
                e = i.length; t < e; t++)
                    s[i.charAt(t)] = n;
        var r = new RegExp("[" + o + "]","g");
        return function(t) {
            return t.replace(r, function(t) {
                return s[t]
            }).toLowerCase()
        }
    }();
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("microplugin", e) : "object" == typeof exports ? module.exports = e() : t.MicroPlugin = e()
}(this, function() {
    var t = {
        mixin: function(i) {
            i.plugins = {},
            i.prototype.initializePlugins = function(t) {
                var e, n, i, o = [];
                if (this.plugins = {
                    names: [],
                    settings: {},
                    requested: {},
                    loaded: {}
                },
                s.isArray(t))
                    for (e = 0,
                    n = t.length; e < n; e++)
                        "string" == typeof t[e] ? o.push(t[e]) : (this.plugins.settings[t[e].name] = t[e].options,
                        o.push(t[e].name));
                else if (t)
                    for (i in t)
                        t.hasOwnProperty(i) && (this.plugins.settings[i] = t[i],
                        o.push(i));
                for (; o.length; )
                    this.require(o.shift())
            }
            ,
            i.prototype.loadPlugin = function(t) {
                var e = this.plugins
                  , n = i.plugins[t];
                if (!i.plugins.hasOwnProperty(t))
                    throw new Error('Unable to find "' + t + '" plugin');
                e.requested[t] = !0,
                e.loaded[t] = n.fn.apply(this, [this.plugins.settings[t] || {}]),
                e.names.push(t)
            }
            ,
            i.prototype.require = function(t) {
                var e = this.plugins;
                if (!this.plugins.loaded.hasOwnProperty(t)) {
                    if (e.requested[t])
                        throw new Error('Plugin has circular dependency ("' + t + '")');
                    this.loadPlugin(t)
                }
                return e.loaded[t]
            }
            ,
            i.define = function(t, e) {
                i.plugins[t] = {
                    name: t,
                    fn: e
                }
            }
        }
    }
      , s = {
        isArray: Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }
    };
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], e) : "object" == typeof exports ? module.exports = e(require("jquery"), require("sifter"), require("microplugin")) : t.Selectize = e(t.jQuery, t.Sifter, t.MicroPlugin)
}(this, function(x, l, t) {
    "use strict";
    var S = function(t, e) {
        if ("string" != typeof e || e.length) {
            var l = "string" == typeof e ? new RegExp(e,"i") : e
              , p = function(t) {
                var e = 0;
                if (3 === t.nodeType) {
                    var n = t.data.search(l);
                    if (0 <= n && 0 < t.data.length) {
                        var i = t.data.match(l)
                          , o = document.createElement("span");
                        o.className = "highlight";
                        var s = t.splitText(n)
                          , r = (s.splitText(i[0].length),
                        s.cloneNode(!0));
                        o.appendChild(r),
                        s.parentNode.replaceChild(o, s),
                        e = 1
                    }
                } else if (1 === t.nodeType && t.childNodes && !/(script|style)/i.test(t.tagName) && ("highlight" !== t.className || "SPAN" !== t.tagName))
                    for (var a = 0; a < t.childNodes.length; ++a)
                        a += p(t.childNodes[a]);
                return e
            };
            return t.each(function() {
                p(this)
            })
        }
    };
    x.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var t = this.parentNode;
            t.replaceChild(this.firstChild, this),
            t.normalize()
        }).end()
    }
    ;
    var i = function() {};
    i.prototype = {
        on: function(t, e) {
            this._events = this._events || {},
            this._events[t] = this._events[t] || [],
            this._events[t].push(e)
        },
        off: function(t, e) {
            var n = arguments.length;
            return 0 === n ? delete this._events : 1 === n ? delete this._events[t] : (this._events = this._events || {},
            void (t in this._events != 0 && this._events[t].splice(this._events[t].indexOf(e), 1)))
        },
        trigger: function(t) {
            if (this._events = this._events || {},
            t in this._events != 0)
                for (var e = 0; e < this._events[t].length; e++)
                    this._events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    },
    i.mixin = function(t) {
        for (var e = ["on", "off", "trigger"], n = 0; n < e.length; n++)
            t.prototype[e[n]] = i.prototype[e[n]]
    }
    ;
    var e, m = /Mac/.test(navigator.userAgent), y = m ? 91 : 17, w = m ? 18 : 17, O = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity, p = function(t) {
        return void 0 !== t
    }, I = function(t) {
        return null == t ? null : "boolean" == typeof t ? t ? "1" : "0" : t + ""
    }, a = function(t) {
        return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }, n = {
        before: function(t, e, n) {
            var i = t[e];
            t[e] = function() {
                return n.apply(t, arguments),
                i.apply(t, arguments)
            }
        },
        after: function(e, t, n) {
            var i = e[t];
            e[t] = function() {
                var t = i.apply(e, arguments);
                return n.apply(e, arguments),
                t
            }
        }
    }, o = function(e, n, t) {
        var i, o = e.trigger, s = {};
        for (i in e.trigger = function() {
            var t = arguments[0];
            if (-1 === n.indexOf(t))
                return o.apply(e, arguments);
            s[t] = arguments
        }
        ,
        t.apply(e, []),
        e.trigger = o,
        s)
            s.hasOwnProperty(i) && o.apply(e, s[i])
    }, d = function(t) {
        var e = {};
        if ("selectionStart"in t)
            e.start = t.selectionStart,
            e.length = t.selectionEnd - e.start;
        else if (document.selection) {
            t.focus();
            var n = document.selection.createRange()
              , i = document.selection.createRange().text.length;
            n.moveStart("character", -t.value.length),
            e.start = n.text.length - i,
            e.length = i
        }
        return e
    }, $ = function(u) {
        var c = null
          , t = function(t, e) {
            var n, i, o, s, r, a, l, p;
            e = e || {},
            (t = t || window.event || {}).metaKey || t.altKey || (e.force || !1 !== u.data("grow")) && (n = u.val(),
            t.type && "keydown" === t.type.toLowerCase() && (o = 48 <= (i = t.keyCode) && i <= 57 || 65 <= i && i <= 90 || 96 <= i && i <= 111 || 186 <= i && i <= 222 || 32 === i,
            46 === i || 8 === i ? (p = d(u[0])).length ? n = n.substring(0, p.start) + n.substring(p.start + p.length) : 8 === i && p.start ? n = n.substring(0, p.start - 1) + n.substring(p.start + 1) : 46 === i && void 0 !== p.start && (n = n.substring(0, p.start) + n.substring(p.start + 1)) : o && (a = t.shiftKey,
            l = String.fromCharCode(t.keyCode),
            n += l = a ? l.toUpperCase() : l.toLowerCase())),
            s = u.attr("placeholder"),
            !n && s && (n = s),
            (r = function(t, e) {
                return t ? (C.$testInput || (C.$testInput = x("<span />").css({
                    position: "absolute",
                    top: -99999,
                    left: -99999,
                    width: "auto",
                    padding: 0,
                    whiteSpace: "pre"
                }).appendTo("body")),
                C.$testInput.text(t),
                function(t, e, n) {
                    var i, o, s = {};
                    if (n)
                        for (i = 0,
                        o = n.length; i < o; i++)
                            s[n[i]] = t.css(n[i]);
                    else
                        s = t.css();
                    e.css(s)
                }(e, C.$testInput, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]),
                C.$testInput.width()) : 0
            }(n, u) + 4) !== c && (c = r,
            u.width(r),
            u.triggerHandler("resize")))
        };
        u.on("keydown keyup update blur", t),
        t()
    }, C = function(t, e) {
        var n, i, o, s, r = this;
        (s = t[0]).selectize = r;
        var a = window.getComputedStyle && window.getComputedStyle(s, null);
        if (o = (o = a ? a.getPropertyValue("direction") : s.currentStyle && s.currentStyle.direction) || t.parents("[dir]:first").attr("dir") || "",
        x.extend(r, {
            order: 0,
            settings: e,
            $input: t,
            tabIndex: t.attr("tabindex") || "",
            tagType: "select" === s.tagName.toLowerCase() ? 1 : 2,
            rtl: /rtl/i.test(o),
            eventNS: ".selectize" + ++C.count,
            highlightedValue: null,
            isBlurring: !1,
            isOpen: !1,
            isDisabled: !1,
            isRequired: t.is("[required]"),
            isInvalid: !1,
            isLocked: !1,
            isFocused: !1,
            isInputHidden: !1,
            isSetup: !1,
            isShiftDown: !1,
            isCmdDown: !1,
            isCtrlDown: !1,
            ignoreFocus: !1,
            ignoreBlur: !1,
            ignoreHover: !1,
            hasOptions: !1,
            currentResults: null,
            lastValue: "",
            caretPos: 0,
            loading: 0,
            loadedSearches: {},
            $activeOption: null,
            $activeItems: [],
            optgroups: {},
            options: {},
            userOptions: {},
            items: [],
            renderCache: {},
            onSearchChange: null === e.loadThrottle ? r.onSearchChange : function(n, i) {
                var o;
                return function() {
                    var t = this
                      , e = arguments;
                    window.clearTimeout(o),
                    o = window.setTimeout(function() {
                        n.apply(t, e)
                    }, i)
                }
            }(r.onSearchChange, e.loadThrottle)
        }),
        r.sifter = new l(this.options,{
            diacritics: e.diacritics
        }),
        r.settings.options) {
            for (n = 0,
            i = r.settings.options.length; n < i; n++)
                r.registerOption(r.settings.options[n]);
            delete r.settings.options
        }
        if (r.settings.optgroups) {
            for (n = 0,
            i = r.settings.optgroups.length; n < i; n++)
                r.registerOptionGroup(r.settings.optgroups[n]);
            delete r.settings.optgroups
        }
        r.settings.mode = r.settings.mode || (1 === r.settings.maxItems ? "single" : "multi"),
        "boolean" != typeof r.settings.hideSelected && (r.settings.hideSelected = "multi" === r.settings.mode),
        r.initializePlugins(r.settings.plugins),
        r.setupCallbacks(),
        r.setupTemplates(),
        r.setup()
    };
    return i.mixin(C),
    void 0 !== t ? t.mixin(C) : ((e = {
        explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'
    }) || (e = {}),
    console.error("Selectize: Dependency MicroPlugin is missing"),
    e.explanation && (console.group && console.group(),
    console.error(e.explanation),
    console.group && console.groupEnd())),
    x.extend(C.prototype, {
        setup: function() {
            var t, e, n, i, o, s, r, a, l, p, u = this, c = u.settings, d = u.eventNS, h = x(window), g = x(document), f = u.$input;
            if (r = u.settings.mode,
            a = f.attr("class") || "",
            t = x("<div>").addClass(c.wrapperClass).addClass(a).addClass(r),
            e = x("<div>").addClass(c.inputClass).addClass("items").appendTo(t),
            n = x('<input type="text" autocomplete="off" />').appendTo(e).attr("tabindex", f.is(":disabled") ? "-1" : u.tabIndex),
            s = x(c.dropdownParent || t),
            i = x("<div>").addClass(c.dropdownClass).addClass(r).hide().appendTo(s),
            o = x("<div>").addClass(c.dropdownContentClass).appendTo(i),
            (p = f.attr("id")) && (n.attr("id", p + "-selectized"),
            x("label[for='" + p + "']").attr("for", p + "-selectized")),
            u.settings.copyClassesToDropdown && i.addClass(a),
            t.css({
                width: f[0].style.width
            }),
            u.plugins.names.length && (l = "plugin-" + u.plugins.names.join(" plugin-"),
            t.addClass(l),
            i.addClass(l)),
            (null === c.maxItems || 1 < c.maxItems) && 1 === u.tagType && f.attr("multiple", "multiple"),
            u.settings.placeholder && n.attr("placeholder", c.placeholder),
            !u.settings.splitOn && u.settings.delimiter) {
                var v = u.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                u.settings.splitOn = new RegExp("\\s*" + v + "+\\s*")
            }
            f.attr("autocorrect") && n.attr("autocorrect", f.attr("autocorrect")),
            f.attr("autocapitalize") && n.attr("autocapitalize", f.attr("autocapitalize")),
            n[0].type = f[0].type,
            u.$wrapper = t,
            u.$control = e,
            u.$control_input = n,
            u.$dropdown = i,
            u.$dropdown_content = o,
            i.on("mouseenter mousedown click", "[data-disabled]>[data-selectable]", function(t) {
                t.stopImmediatePropagation()
            }),
            i.on("mouseenter", "[data-selectable]", function() {
                return u.onOptionHover.apply(u, arguments)
            }),
            i.on("mousedown click", "[data-selectable]", function() {
                return u.onOptionSelect.apply(u, arguments)
            }),
            function(n, t, e, i) {
                n.on(t, e, function(t) {
                    for (var e = t.target; e && e.parentNode !== n[0]; )
                        e = e.parentNode;
                    return t.currentTarget = e,
                    i.apply(this, [t])
                })
            }(e, "mousedown", "*:not(input)", function() {
                return u.onItemSelect.apply(u, arguments)
            }),
            $(n),
            e.on({
                mousedown: function() {
                    return u.onMouseDown.apply(u, arguments)
                },
                click: function() {
                    return u.onClick.apply(u, arguments)
                }
            }),
            n.on({
                mousedown: function(t) {
                    t.stopPropagation()
                },
                keydown: function() {
                    return u.onKeyDown.apply(u, arguments)
                },
                keyup: function() {
                    return u.onKeyUp.apply(u, arguments)
                },
                keypress: function() {
                    return u.onKeyPress.apply(u, arguments)
                },
                resize: function() {
                    u.positionDropdown.apply(u, [])
                },
                blur: function() {
                    return u.onBlur.apply(u, arguments)
                },
                focus: function() {
                    return u.ignoreBlur = !1,
                    u.onFocus.apply(u, arguments)
                },
                paste: function() {
                    return u.onPaste.apply(u, arguments)
                }
            }),
            g.on("keydown" + d, function(t) {
                u.isCmdDown = t[m ? "metaKey" : "ctrlKey"],
                u.isCtrlDown = t[m ? "altKey" : "ctrlKey"],
                u.isShiftDown = t.shiftKey
            }),
            g.on("keyup" + d, function(t) {
                t.keyCode === w && (u.isCtrlDown = !1),
                16 === t.keyCode && (u.isShiftDown = !1),
                t.keyCode === y && (u.isCmdDown = !1)
            }),
            g.on("mousedown" + d, function(t) {
                if (u.isFocused) {
                    if (t.target === u.$dropdown[0] || t.target.parentNode === u.$dropdown[0])
                        return !1;
                    u.$control.has(t.target).length || t.target === u.$control[0] || u.blur(t.target)
                }
            }),
            h.on(["scroll" + d, "resize" + d].join(" "), function() {
                u.isOpen && u.positionDropdown.apply(u, arguments)
            }),
            h.on("mousemove" + d, function() {
                u.ignoreHover = !1
            }),
            this.revertSettings = {
                $children: f.children().detach(),
                tabindex: f.attr("tabindex")
            },
            f.attr("tabindex", -1).hide().after(u.$wrapper),
            x.isArray(c.items) && (u.setValue(c.items),
            delete c.items),
            O && f.on("invalid" + d, function(t) {
                t.preventDefault(),
                u.isInvalid = !0,
                u.refreshState()
            }),
            u.updateOriginalInput(),
            u.refreshItems(),
            u.refreshState(),
            u.updatePlaceholder(),
            u.isSetup = !0,
            f.is(":disabled") && u.disable(),
            u.on("change", this.onChange),
            f.data("selectize", u),
            f.addClass("selectized"),
            u.trigger("initialize"),
            !0 === c.preload && u.onSearchChange("")
        },
        setupTemplates: function() {
            var n = this.settings.labelField
              , i = this.settings.optgroupLabelField
              , t = {
                optgroup: function(t) {
                    return '<div class="optgroup">' + t.html + "</div>"
                },
                optgroup_header: function(t, e) {
                    return '<div class="optgroup-header">' + e(t[i]) + "</div>"
                },
                option: function(t, e) {
                    return '<div class="option">' + e(t[n]) + "</div>"
                },
                item: function(t, e) {
                    return '<div class="item">' + e(t[n]) + "</div>"
                },
                option_create: function(t, e) {
                    return '<div class="create">Add <strong>' + e(t.input) + "</strong>&hellip;</div>"
                }
            };
            this.settings.render = x.extend({}, t, this.settings.render)
        },
        setupCallbacks: function() {
            var t, e, n = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (t in n)
                n.hasOwnProperty(t) && (e = this.settings[n[t]]) && this.on(t, e)
        },
        onClick: function(t) {
            this.isFocused && this.isOpen || (this.focus(),
            t.preventDefault())
        },
        onMouseDown: function(t) {
            var e = this
              , n = t.isDefaultPrevented();
            if (x(t.target),
            e.isFocused) {
                if (t.target !== e.$control_input[0])
                    return "single" === e.settings.mode ? e.isOpen ? e.close() : e.open() : n || e.setActiveItem(null),
                    !1
            } else
                n || window.setTimeout(function() {
                    e.focus()
                }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(t) {
            var o = this;
            o.isFull() || o.isInputHidden || o.isLocked ? t.preventDefault() : o.settings.splitOn && setTimeout(function() {
                var t = o.$control_input.val();
                if (t.match(o.settings.splitOn))
                    for (var e = x.trim(t).split(o.settings.splitOn), n = 0, i = e.length; n < i; n++)
                        o.createItem(e[n])
            }, 0)
        },
        onKeyPress: function(t) {
            if (this.isLocked)
                return t && t.preventDefault();
            var e = String.fromCharCode(t.keyCode || t.which);
            return this.settings.create && "multi" === this.settings.mode && e === this.settings.delimiter ? (this.createItem(),
            t.preventDefault(),
            !1) : void 0
        },
        onKeyDown: function(t) {
            var e = (t.target,
            this.$control_input[0],
            this);
            if (!e.isLocked) {
                switch (t.keyCode) {
                case 65:
                    if (e.isCmdDown)
                        return void e.selectAll();
                    break;
                case 27:
                    return void (e.isOpen && (t.preventDefault(),
                    t.stopPropagation(),
                    e.close()));
                case 78:
                    if (!t.ctrlKey || t.altKey)
                        break;
                case 40:
                    if (!e.isOpen && e.hasOptions)
                        e.open();
                    else if (e.$activeOption) {
                        e.ignoreHover = !0;
                        var n = e.getAdjacentOption(e.$activeOption, 1);
                        n.length && e.setActiveOption(n, !0, !0)
                    }
                    return void t.preventDefault();
                case 80:
                    if (!t.ctrlKey || t.altKey)
                        break;
                case 38:
                    if (e.$activeOption) {
                        e.ignoreHover = !0;
                        var i = e.getAdjacentOption(e.$activeOption, -1);
                        i.length && e.setActiveOption(i, !0, !0)
                    }
                    return void t.preventDefault();
                case 13:
                    return void (e.isOpen && e.$activeOption && (e.onOptionSelect({
                        currentTarget: e.$activeOption
                    }),
                    t.preventDefault()));
                case 37:
                    return void e.advanceSelection(-1, t);
                case 39:
                    return void e.advanceSelection(1, t);
                case 9:
                    return e.settings.selectOnTab && e.isOpen && e.$activeOption && (e.onOptionSelect({
                        currentTarget: e.$activeOption
                    }),
                    e.isFull() || t.preventDefault()),
                    void (e.settings.create && e.createItem() && t.preventDefault());
                case 8:
                case 46:
                    return void e.deleteSelection(t)
                }
                return !e.isFull() && !e.isInputHidden || (m ? t.metaKey : t.ctrlKey) ? void 0 : void t.preventDefault()
            }
            9 !== t.keyCode && t.preventDefault()
        },
        onKeyUp: function(t) {
            var e = this;
            if (e.isLocked)
                return t && t.preventDefault();
            var n = e.$control_input.val() || "";
            e.lastValue !== n && (e.lastValue = n,
            e.onSearchChange(n),
            e.refreshOptions(),
            e.trigger("type", n))
        },
        onSearchChange: function(e) {
            var n = this
              , i = n.settings.load;
            i && (n.loadedSearches.hasOwnProperty(e) || (n.loadedSearches[e] = !0,
            n.load(function(t) {
                i.apply(n, [e, t])
            })))
        },
        onFocus: function(t) {
            var e = this
              , n = e.isFocused;
            if (e.isDisabled)
                return e.blur(),
                t && t.preventDefault(),
                !1;
            e.ignoreFocus || (e.isFocused = !0,
            "focus" === e.settings.preload && e.onSearchChange(""),
            n || e.trigger("focus"),
            e.$activeItems.length || (e.showInput(),
            e.setActiveItem(null),
            e.refreshOptions(!!e.settings.openOnFocus)),
            e.refreshState())
        },
        onBlur: function(t, e) {
            var n = this;
            if (n.isFocused && (n.isFocused = !1,
            !n.ignoreFocus)) {
                if (!n.ignoreBlur && document.activeElement === n.$dropdown_content[0])
                    return n.ignoreBlur = !0,
                    void n.onFocus(t);
                var i = function() {
                    n.close(),
                    n.setTextboxValue(""),
                    n.setActiveItem(null),
                    n.setActiveOption(null),
                    n.setCaret(n.items.length),
                    n.refreshState(),
                    e && e.focus && e.focus(),
                    n.isBlurring = !1,
                    n.ignoreFocus = !1,
                    n.trigger("blur")
                };
                n.isBlurring = !0,
                n.ignoreFocus = !0,
                n.settings.create && n.settings.createOnBlur ? n.createItem(null, !1, i) : i()
            }
        },
        onOptionHover: function(t) {
            this.ignoreHover || this.setActiveOption(t.currentTarget, !1)
        },
        onOptionSelect: function(t) {
            var e, n, i = this;
            t.preventDefault && (t.preventDefault(),
            t.stopPropagation()),
            (n = x(t.currentTarget)).hasClass("create") ? i.createItem(null, function() {
                i.settings.closeAfterSelect && i.close()
            }) : void 0 !== (e = n.attr("data-value")) && (i.lastQuery = null,
            i.setTextboxValue(""),
            i.addItem(e),
            i.settings.closeAfterSelect ? i.close() : !i.settings.hideSelected && t.type && /mouse/.test(t.type) && i.setActiveOption(i.getOption(e)))
        },
        onItemSelect: function(t) {
            this.isLocked || "multi" === this.settings.mode && (t.preventDefault(),
            this.setActiveItem(t.currentTarget, t))
        },
        load: function(t) {
            var e = this
              , n = e.$wrapper.addClass(e.settings.loadingClass);
            e.loading++,
            t.apply(e, [function(t) {
                e.loading = Math.max(e.loading - 1, 0),
                t && t.length && (e.addOption(t),
                e.refreshOptions(e.isFocused && !e.isInputHidden)),
                e.loading || n.removeClass(e.settings.loadingClass),
                e.trigger("load", t)
            }
            ])
        },
        setTextboxValue: function(t) {
            var e = this.$control_input;
            e.val() !== t && (e.val(t).triggerHandler("update"),
            this.lastValue = t)
        },
        getValue: function() {
            return 1 === this.tagType && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(t, e) {
            o(this, e ? [] : ["change"], function() {
                this.clear(e),
                this.addItems(t, e)
            })
        },
        setActiveItem: function(t, e) {
            var n, i, o, s, r, a, l, p, u = this;
            if ("single" !== u.settings.mode) {
                if (!(t = x(t)).length)
                    return x(u.$activeItems).removeClass("active"),
                    u.$activeItems = [],
                    void (u.isFocused && u.showInput());
                if ("mousedown" === (n = e && e.type.toLowerCase()) && u.isShiftDown && u.$activeItems.length) {
                    for (p = u.$control.children(".active:last"),
                    s = Array.prototype.indexOf.apply(u.$control[0].childNodes, [p[0]]),
                    (r = Array.prototype.indexOf.apply(u.$control[0].childNodes, [t[0]])) < s && (l = s,
                    s = r,
                    r = l),
                    i = s; i <= r; i++)
                        a = u.$control[0].childNodes[i],
                        -1 === u.$activeItems.indexOf(a) && (x(a).addClass("active"),
                        u.$activeItems.push(a));
                    e.preventDefault()
                } else
                    "mousedown" === n && u.isCtrlDown || "keydown" === n && this.isShiftDown ? t.hasClass("active") ? (o = u.$activeItems.indexOf(t[0]),
                    u.$activeItems.splice(o, 1),
                    t.removeClass("active")) : u.$activeItems.push(t.addClass("active")[0]) : (x(u.$activeItems).removeClass("active"),
                    u.$activeItems = [t.addClass("active")[0]]);
                u.hideInput(),
                this.isFocused || u.focus()
            }
        },
        setActiveOption: function(t, e, n) {
            var i, o, s, r, a, l = this;
            l.$activeOption && l.$activeOption.removeClass("active"),
            l.$activeOption = null,
            (t = x(t)).length && (l.$activeOption = t.addClass("active"),
            !e && p(e) || (i = l.$dropdown_content.height(),
            o = l.$activeOption.outerHeight(!0),
            e = l.$dropdown_content.scrollTop() || 0,
            a = (r = s = l.$activeOption.offset().top - l.$dropdown_content.offset().top + e) - i + o,
            i + e < s + o ? l.$dropdown_content.stop().animate({
                scrollTop: a
            }, n ? l.settings.scrollDuration : 0) : s < e && l.$dropdown_content.stop().animate({
                scrollTop: r
            }, n ? l.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var t = this;
            "single" !== t.settings.mode && (t.$activeItems = Array.prototype.slice.apply(t.$control.children(":not(input)").addClass("active")),
            t.$activeItems.length && (t.hideInput(),
            t.close()),
            t.focus())
        },
        hideInput: function() {
            this.setTextboxValue(""),
            this.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: this.rtl ? 1e4 : -1e4
            }),
            this.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            }),
            this.isInputHidden = !1
        },
        focus: function() {
            var t = this;
            t.isDisabled || (t.ignoreFocus = !0,
            t.$control_input[0].focus(),
            window.setTimeout(function() {
                t.ignoreFocus = !1,
                t.onFocus()
            }, 0))
        },
        blur: function(t) {
            this.$control_input[0].blur(),
            this.onBlur(null, t)
        },
        getScoreFunction: function(t) {
            return this.sifter.getScoreFunction(t, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var t = this.settings
              , e = t.sortField;
            return "string" == typeof e && (e = [{
                field: e
            }]),
            {
                fields: t.searchField,
                conjunction: t.searchConjunction,
                sort: e,
                nesting: t.nesting
            }
        },
        search: function(t) {
            var e, n, i, o = this, s = o.settings, r = this.getSearchOptions();
            if (s.score && "function" != typeof (i = o.settings.score.apply(this, [t])))
                throw new Error('Selectize "score" setting must be a function that returns a function');
            if (t !== o.lastQuery ? (o.lastQuery = t,
            n = o.sifter.search(t, x.extend(r, {
                score: i
            })),
            o.currentResults = n) : n = x.extend(!0, {}, o.currentResults),
            s.hideSelected)
                for (e = n.items.length - 1; 0 <= e; e--)
                    -1 !== o.items.indexOf(I(n.items[e].id)) && n.items.splice(e, 1);
            return n
        },
        refreshOptions: function(t) {
            var e, n, i, o, s, r, a, l, p, u, c, d, h, g, f, v;
            void 0 === t && (t = !0);
            var m, y, w = this, O = x.trim(w.$control_input.val()), $ = w.search(O), C = w.$dropdown_content, b = w.$activeOption && I(w.$activeOption.attr("data-value"));
            for (o = $.items.length,
            "number" == typeof w.settings.maxOptions && (o = Math.min(o, w.settings.maxOptions)),
            s = {},
            r = [],
            e = 0; e < o; e++)
                for (a = w.options[$.items[e].id],
                l = w.render("option", a),
                p = a[w.settings.optgroupField] || "",
                n = 0,
                i = (u = x.isArray(p) ? p : [p]) && u.length; n < i; n++)
                    p = u[n],
                    w.optgroups.hasOwnProperty(p) || (p = ""),
                    s.hasOwnProperty(p) || (s[p] = document.createDocumentFragment(),
                    r.push(p)),
                    s[p].appendChild(l);
            for (this.settings.lockOptgroupOrder && r.sort(function(t, e) {
                return (w.optgroups[t].$order || 0) - (w.optgroups[e].$order || 0)
            }),
            c = document.createDocumentFragment(),
            e = 0,
            o = r.length; e < o; e++)
                p = r[e],
                w.optgroups.hasOwnProperty(p) && s[p].childNodes.length ? ((d = document.createDocumentFragment()).appendChild(w.render("optgroup_header", w.optgroups[p])),
                d.appendChild(s[p]),
                c.appendChild(w.render("optgroup", x.extend({}, w.optgroups[p], {
                    html: (m = d,
                    y = void 0,
                    y = document.createElement("div"),
                    y.appendChild(m.cloneNode(!0)),
                    y.innerHTML),
                    dom: d
                })))) : c.appendChild(s[p]);
            if (C.html(c),
            w.settings.highlight && (C.removeHighlight(),
            $.query.length && $.tokens.length))
                for (e = 0,
                o = $.tokens.length; e < o; e++)
                    S(C, $.tokens[e].regex);
            if (!w.settings.hideSelected)
                for (e = 0,
                o = w.items.length; e < o; e++)
                    w.getOption(w.items[e]).addClass("selected");
            (h = w.canCreate(O)) && (C.prepend(w.render("option_create", {
                input: O
            })),
            v = x(C[0].childNodes[0])),
            w.hasOptions = 0 < $.items.length || h,
            w.hasOptions ? (0 < $.items.length ? ((f = b && w.getOption(b)) && f.length ? g = f : "single" === w.settings.mode && w.items.length && (g = w.getOption(w.items[0])),
            g && g.length || (g = v && !w.settings.addPrecedence ? w.getAdjacentOption(v, 1) : C.find("[data-selectable]:first"))) : g = v,
            w.setActiveOption(g),
            t && !w.isOpen && w.open()) : (w.setActiveOption(null),
            t && w.isOpen && w.close())
        },
        addOption: function(t) {
            var e, n, i, o = this;
            if (x.isArray(t))
                for (e = 0,
                n = t.length; e < n; e++)
                    o.addOption(t[e]);
            else
                (i = o.registerOption(t)) && (o.userOptions[i] = !0,
                o.lastQuery = null,
                o.trigger("option_add", i, t))
        },
        registerOption: function(t) {
            var e = I(t[this.settings.valueField]);
            return null != e && !this.options.hasOwnProperty(e) && (t.$order = t.$order || ++this.order,
            this.options[e] = t,
            e)
        },
        registerOptionGroup: function(t) {
            var e = I(t[this.settings.optgroupValueField]);
            return !!e && (t.$order = t.$order || ++this.order,
            this.optgroups[e] = t,
            e)
        },
        addOptionGroup: function(t, e) {
            e[this.settings.optgroupValueField] = t,
            (t = this.registerOptionGroup(e)) && this.trigger("optgroup_add", t, e)
        },
        removeOptionGroup: function(t) {
            this.optgroups.hasOwnProperty(t) && (delete this.optgroups[t],
            this.renderCache = {},
            this.trigger("optgroup_remove", t))
        },
        clearOptionGroups: function() {
            this.optgroups = {},
            this.renderCache = {},
            this.trigger("optgroup_clear")
        },
        updateOption: function(t, e) {
            var n, i, o, s, r, a, l, p = this;
            if (t = I(t),
            o = I(e[p.settings.valueField]),
            null !== t && p.options.hasOwnProperty(t)) {
                if ("string" != typeof o)
                    throw new Error("Value must be set in option data");
                l = p.options[t].$order,
                o !== t && (delete p.options[t],
                -1 !== (s = p.items.indexOf(t)) && p.items.splice(s, 1, o)),
                e.$order = e.$order || l,
                p.options[o] = e,
                r = p.renderCache.item,
                a = p.renderCache.option,
                r && (delete r[t],
                delete r[o]),
                a && (delete a[t],
                delete a[o]),
                -1 !== p.items.indexOf(o) && (n = p.getItem(t),
                i = x(p.render("item", e)),
                n.hasClass("active") && i.addClass("active"),
                n.replaceWith(i)),
                p.lastQuery = null,
                p.isOpen && p.refreshOptions(!1)
            }
        },
        removeOption: function(t, e) {
            var n = this;
            t = I(t);
            var i = n.renderCache.item
              , o = n.renderCache.option;
            i && delete i[t],
            o && delete o[t],
            delete n.userOptions[t],
            delete n.options[t],
            n.lastQuery = null,
            n.trigger("option_remove", t),
            n.removeItem(t, e)
        },
        clearOptions: function() {
            var n = this;
            n.loadedSearches = {},
            n.userOptions = {},
            n.renderCache = {};
            var i = n.options;
            x.each(n.options, function(t, e) {
                -1 == n.items.indexOf(t) && delete i[t]
            }),
            n.options = n.sifter.items = i,
            n.lastQuery = null,
            n.trigger("option_clear")
        },
        getOption: function(t) {
            return this.getElementWithValue(t, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(t, e) {
            var n = this.$dropdown.find("[data-selectable]")
              , i = n.index(t) + e;
            return 0 <= i && i < n.length ? n.eq(i) : x()
        },
        getElementWithValue: function(t, e) {
            if (void 0 !== (t = I(t)) && null !== t)
                for (var n = 0, i = e.length; n < i; n++)
                    if (e[n].getAttribute("data-value") === t)
                        return x(e[n]);
            return x()
        },
        getItem: function(t) {
            return this.getElementWithValue(t, this.$control.children())
        },
        addItems: function(t, e) {
            this.buffer = document.createDocumentFragment();
            for (var n = this.$control[0].childNodes, i = 0; i < n.length; i++)
                this.buffer.appendChild(n[i]);
            for (var o = x.isArray(t) ? t : [t], s = (i = 0,
            o.length); i < s; i++)
                this.isPending = i < s - 1,
                this.addItem(o[i], e);
            var r = this.$control[0];
            r.insertBefore(this.buffer, r.firstChild),
            this.buffer = null
        },
        addItem: function(a, l) {
            o(this, l ? [] : ["change"], function() {
                var t, e, n, i, o, s = this, r = s.settings.mode;
                a = I(a),
                -1 === s.items.indexOf(a) ? s.options.hasOwnProperty(a) && ("single" === r && s.clear(l),
                "multi" === r && s.isFull() || (t = x(s.render("item", s.options[a])),
                o = s.isFull(),
                s.items.splice(s.caretPos, 0, a),
                s.insertAtCaret(t),
                (!s.isPending || !o && s.isFull()) && s.refreshState(),
                s.isSetup && (n = s.$dropdown_content.find("[data-selectable]"),
                s.isPending || (e = s.getOption(a),
                i = s.getAdjacentOption(e, 1).attr("data-value"),
                s.refreshOptions(s.isFocused && "single" !== r),
                i && s.setActiveOption(s.getOption(i))),
                !n.length || s.isFull() ? s.close() : s.isPending || s.positionDropdown(),
                s.updatePlaceholder(),
                s.trigger("item_add", a, t),
                s.isPending || s.updateOriginalInput({
                    silent: l
                })))) : "single" === r && s.close()
            })
        },
        removeItem: function(t, e) {
            var n, i, o, s = this;
            n = t instanceof x ? t : s.getItem(t),
            t = I(n.attr("data-value")),
            -1 !== (i = s.items.indexOf(t)) && (n.remove(),
            n.hasClass("active") && (o = s.$activeItems.indexOf(n[0]),
            s.$activeItems.splice(o, 1)),
            s.items.splice(i, 1),
            s.lastQuery = null,
            !s.settings.persist && s.userOptions.hasOwnProperty(t) && s.removeOption(t, e),
            i < s.caretPos && s.setCaret(s.caretPos - 1),
            s.refreshState(),
            s.updatePlaceholder(),
            s.updateOriginalInput({
                silent: e
            }),
            s.positionDropdown(),
            s.trigger("item_remove", t, n))
        },
        createItem: function(t, n) {
            var i = this
              , o = i.caretPos;
            t = t || x.trim(i.$control_input.val() || "");
            var s = arguments[arguments.length - 1];
            if ("function" != typeof s && (s = function() {}
            ),
            "boolean" != typeof n && (n = !0),
            !i.canCreate(t))
                return s(),
                !1;
            i.lock();
            var e = "function" == typeof i.settings.create ? this.settings.create : function(t) {
                var e = {};
                return e[i.settings.labelField] = t,
                e[i.settings.valueField] = t,
                e
            }
              , r = function(t) {
                var e = !1;
                return function() {
                    e || (e = !0,
                    t.apply(this, arguments))
                }
            }(function(t) {
                if (i.unlock(),
                !t || "object" != typeof t)
                    return s();
                var e = I(t[i.settings.valueField]);
                if ("string" != typeof e)
                    return s();
                i.setTextboxValue(""),
                i.addOption(t),
                i.setCaret(o),
                i.addItem(e),
                i.refreshOptions(n && "single" !== i.settings.mode),
                s(t)
            })
              , a = e.apply(this, [t, r]);
            return void 0 !== a && r(a),
            !0
        },
        refreshItems: function() {
            this.lastQuery = null,
            this.isSetup && this.addItem(this.items),
            this.refreshState(),
            this.updateOriginalInput()
        },
        refreshState: function() {
            this.refreshValidityState(),
            this.refreshClasses()
        },
        refreshValidityState: function() {
            if (!this.isRequired)
                return !1;
            var t = !this.items.length;
            this.isInvalid = t,
            this.$control_input.prop("required", t),
            this.$input.prop("required", !t)
        },
        refreshClasses: function() {
            var t = this
              , e = t.isFull()
              , n = t.isLocked;
            t.$wrapper.toggleClass("rtl", t.rtl),
            t.$control.toggleClass("focus", t.isFocused).toggleClass("disabled", t.isDisabled).toggleClass("required", t.isRequired).toggleClass("invalid", t.isInvalid).toggleClass("locked", n).toggleClass("full", e).toggleClass("not-full", !e).toggleClass("input-active", t.isFocused && !t.isInputHidden).toggleClass("dropdown-active", t.isOpen).toggleClass("has-options", !x.isEmptyObject(t.options)).toggleClass("has-items", 0 < t.items.length),
            t.$control_input.data("grow", !e && !n)
        },
        isFull: function() {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function(t) {
            var e, n, i, o, s = this;
            if (t = t || {},
            1 === s.tagType) {
                for (i = [],
                e = 0,
                n = s.items.length; e < n; e++)
                    o = s.options[s.items[e]][s.settings.labelField] || "",
                    i.push('<option value="' + a(s.items[e]) + '" selected="selected">' + a(o) + "</option>");
                i.length || this.$input.attr("multiple") || i.push('<option value="" selected="selected"></option>'),
                s.$input.html(i.join(""))
            } else
                s.$input.val(s.getValue()),
                s.$input.attr("value", s.$input.val());
            s.isSetup && (t.silent || s.trigger("change", s.$input.val()))
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var t = this.$control_input;
                this.items.length ? t.removeAttr("placeholder") : t.attr("placeholder", this.settings.placeholder),
                t.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var t = this;
            t.isLocked || t.isOpen || "multi" === t.settings.mode && t.isFull() || (t.focus(),
            t.isOpen = !0,
            t.refreshState(),
            t.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }),
            t.positionDropdown(),
            t.$dropdown.css({
                visibility: "visible"
            }),
            t.trigger("dropdown_open", t.$dropdown))
        },
        close: function() {
            var t = this
              , e = t.isOpen;
            "single" === t.settings.mode && t.items.length && (t.hideInput(),
            t.isBlurring || t.$control_input.blur()),
            t.isOpen = !1,
            t.$dropdown.hide(),
            t.setActiveOption(null),
            t.refreshState(),
            e && t.trigger("dropdown_close", t.$dropdown)
        },
        positionDropdown: function() {
            var t = this.$control
              , e = "body" === this.settings.dropdownParent ? t.offset() : t.position();
            e.top += t.outerHeight(!0),
            this.$dropdown.css({
                width: t[0].getBoundingClientRect().width,
                top: e.top,
                left: e.left
            })
        },
        clear: function(t) {
            var e = this;
            e.items.length && (e.$control.children(":not(input)").remove(),
            e.items = [],
            e.lastQuery = null,
            e.setCaret(0),
            e.setActiveItem(null),
            e.updatePlaceholder(),
            e.updateOriginalInput({
                silent: t
            }),
            e.refreshState(),
            e.showInput(),
            e.trigger("clear"))
        },
        insertAtCaret: function(t) {
            var e = Math.min(this.caretPos, this.items.length)
              , n = t[0]
              , i = this.buffer || this.$control[0];
            0 === e ? i.insertBefore(n, i.firstChild) : i.insertBefore(n, i.childNodes[e]),
            this.setCaret(e + 1)
        },
        deleteSelection: function(t) {
            var e, n, i, o, s, r, a, l, p, u = this;
            if (i = t && 8 === t.keyCode ? -1 : 1,
            o = d(u.$control_input[0]),
            u.$activeOption && !u.settings.hideSelected && (a = u.getAdjacentOption(u.$activeOption, -1).attr("data-value")),
            s = [],
            u.$activeItems.length) {
                for (p = u.$control.children(".active:" + (0 < i ? "last" : "first")),
                r = u.$control.children(":not(input)").index(p),
                0 < i && r++,
                e = 0,
                n = u.$activeItems.length; e < n; e++)
                    s.push(x(u.$activeItems[e]).attr("data-value"));
                t && (t.preventDefault(),
                t.stopPropagation())
            } else
                (u.isFocused || "single" === u.settings.mode) && u.items.length && (i < 0 && 0 === o.start && 0 === o.length ? s.push(u.items[u.caretPos - 1]) : 0 < i && o.start === u.$control_input.val().length && s.push(u.items[u.caretPos]));
            if (!s.length || "function" == typeof u.settings.onDelete && !1 === u.settings.onDelete.apply(u, [s]))
                return !1;
            for (void 0 !== r && u.setCaret(r); s.length; )
                u.removeItem(s.pop());
            return u.showInput(),
            u.positionDropdown(),
            u.refreshOptions(!0),
            a && ((l = u.getOption(a)).length && u.setActiveOption(l)),
            !0
        },
        advanceSelection: function(t, e) {
            var n, i, o, s, r, a = this;
            0 !== t && (a.rtl && (t *= -1),
            n = 0 < t ? "last" : "first",
            i = d(a.$control_input[0]),
            a.isFocused && !a.isInputHidden ? (s = a.$control_input.val().length,
            (t < 0 ? 0 === i.start && 0 === i.length : i.start === s) && !s && a.advanceCaret(t, e)) : (r = a.$control.children(".active:" + n)).length && (o = a.$control.children(":not(input)").index(r),
            a.setActiveItem(null),
            a.setCaret(0 < t ? o + 1 : o)))
        },
        advanceCaret: function(t, e) {
            var n, i, o = this;
            0 !== t && (n = 0 < t ? "next" : "prev",
            o.isShiftDown ? (i = o.$control_input[n]()).length && (o.hideInput(),
            o.setActiveItem(i),
            e && e.preventDefault()) : o.setCaret(o.caretPos + t))
        },
        setCaret: function(t) {
            var e, n, i, o, s = this;
            if (t = "single" === s.settings.mode ? s.items.length : Math.max(0, Math.min(s.items.length, t)),
            !s.isPending)
                for (e = 0,
                n = (i = s.$control.children(":not(input)")).length; e < n; e++)
                    o = x(i[e]).detach(),
                    e < t ? s.$control_input.before(o) : s.$control.append(o);
            s.caretPos = t
        },
        lock: function() {
            this.close(),
            this.isLocked = !0,
            this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1,
            this.refreshState()
        },
        disable: function() {
            this.$input.prop("disabled", !0),
            this.$control_input.prop("disabled", !0).prop("tabindex", -1),
            this.isDisabled = !0,
            this.lock()
        },
        enable: function() {
            var t = this;
            t.$input.prop("disabled", !1),
            t.$control_input.prop("disabled", !1).prop("tabindex", t.tabIndex),
            t.isDisabled = !1,
            t.unlock()
        },
        destroy: function() {
            var t = this
              , e = t.eventNS
              , n = t.revertSettings;
            t.trigger("destroy"),
            t.off(),
            t.$wrapper.remove(),
            t.$dropdown.remove(),
            t.$input.html("").append(n.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: n.tabindex
            }).show(),
            t.$control_input.removeData("grow"),
            t.$input.removeData("selectize"),
            0 == --C.count && C.$testInput && (C.$testInput.remove(),
            C.$testInput = void 0),
            x(window).off(e),
            x(document).off(e),
            x(document.body).off(e),
            delete t.$input[0].selectize
        },
        render: function(t, e) {
            var n, i, o = "", s = !1, r = this;
            return "option" !== t && "item" !== t || (s = !!(n = I(e[r.settings.valueField]))),
            s && (p(r.renderCache[t]) || (r.renderCache[t] = {}),
            r.renderCache[t].hasOwnProperty(n)) ? r.renderCache[t][n] : (o = x(r.settings.render[t].apply(this, [e, a])),
            "option" === t || "option_create" === t ? e[r.settings.disabledField] || o.attr("data-selectable", "") : "optgroup" === t && (i = e[r.settings.optgroupValueField] || "",
            o.attr("data-group", i),
            e[r.settings.disabledField] && o.attr("data-disabled", "")),
            "option" !== t && "item" !== t || o.attr("data-value", n || ""),
            s && (r.renderCache[t][n] = o[0]),
            o[0])
        },
        clearCache: function(t) {
            void 0 === t ? this.renderCache = {} : delete this.renderCache[t]
        },
        canCreate: function(t) {
            if (!this.settings.create)
                return !1;
            var e = this.settings.createFilter;
            return t.length && ("function" != typeof e || e.apply(this, [t])) && ("string" != typeof e || new RegExp(e).test(t)) && (!(e instanceof RegExp) || e.test(t))
        }
    }),
    C.count = 0,
    C.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        disabledField: "disabled",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    },
    x.fn.selectize = function(o) {
        var s = x.fn.selectize.defaults
          , u = x.extend({}, s, o)
          , c = u.dataAttr
          , d = u.labelField
          , h = u.valueField
          , g = u.disabledField
          , f = u.optgroupField
          , v = u.optgroupLabelField
          , m = u.optgroupValueField;
        return this.each(function() {
            if (!this.selectize) {
                var t = x(this)
                  , e = this.tagName.toLowerCase()
                  , n = t.attr("placeholder") || t.attr("data-placeholder");
                n || u.allowEmptyOption || (n = t.children('option[value=""]').text());
                var i = {
                    placeholder: n,
                    options: [],
                    optgroups: [],
                    items: []
                };
                "select" === e ? function(t, r) {
                    var e, n, i, o, s = r.options, a = {}, l = function(t) {
                        var e = c && t.attr(c);
                        return "string" == typeof e && e.length ? JSON.parse(e) : null
                    }, p = function(t, e) {
                        t = x(t);
                        var n = I(t.val());
                        if (n || u.allowEmptyOption)
                            if (a.hasOwnProperty(n)) {
                                if (e) {
                                    var i = a[n][f];
                                    i ? x.isArray(i) ? i.push(e) : a[n][f] = [i, e] : a[n][f] = e
                                }
                            } else {
                                var o = l(t) || {};
                                o[d] = o[d] || t.text(),
                                o[h] = o[h] || n,
                                o[g] = o[g] || t.prop("disabled"),
                                o[f] = o[f] || e,
                                a[n] = o,
                                s.push(o),
                                t.is(":selected") && r.items.push(n)
                            }
                    };
                    for (r.maxItems = t.attr("multiple") ? null : 1,
                    e = 0,
                    n = (o = t.children()).length; e < n; e++)
                        "optgroup" === (i = o[e].tagName.toLowerCase()) ? function(t) {
                            var e, n, i, o, s;
                            for ((i = (t = x(t)).attr("label")) && ((o = l(t) || {})[v] = i,
                            o[m] = i,
                            o[g] = t.prop("disabled"),
                            r.optgroups.push(o)),
                            e = 0,
                            n = (s = x("option", t)).length; e < n; e++)
                                p(s[e], i)
                        }(o[e]) : "option" === i && p(o[e])
                }(t, i) : function(t, e) {
                    var n, i, o, s, r = t.attr(c);
                    if (r)
                        for (e.options = JSON.parse(r),
                        n = 0,
                        i = e.options.length; n < i; n++)
                            e.items.push(e.options[n][h]);
                    else {
                        var a = x.trim(t.val() || "");
                        if (!u.allowEmptyOption && !a.length)
                            return;
                        for (n = 0,
                        i = (o = a.split(u.delimiter)).length; n < i; n++)
                            (s = {})[d] = o[n],
                            s[h] = o[n],
                            e.options.push(s);
                        e.items = o
                    }
                }(t, i),
                new C(t,x.extend(!0, {}, s, i, o))
            }
        })
    }
    ,
    x.fn.selectize.defaults = C.defaults,
    x.fn.selectize.support = {
        validity: O
    },
    C.define("drag_drop", function(t) {
        if (!x.fn.sortable)
            throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var i = this;
            i.lock = (o = i.lock,
            function() {
                var t = i.$control.data("sortable");
                return t && t.disable(),
                o.apply(i, arguments)
            }
            ),
            i.unlock = (n = i.unlock,
            function() {
                var t = i.$control.data("sortable");
                return t && t.enable(),
                n.apply(i, arguments)
            }
            ),
            i.setup = (e = i.setup,
            function() {
                e.apply(this, arguments);
                var n = i.$control.sortable({
                    items: "[data-value]",
                    forcePlaceholderSize: !0,
                    disabled: i.isLocked,
                    start: function(t, e) {
                        e.placeholder.css("width", e.helper.css("width")),
                        n.css({
                            overflow: "visible"
                        })
                    },
                    stop: function() {
                        n.css({
                            overflow: "hidden"
                        });
                        var t = i.$activeItems ? i.$activeItems.slice() : null
                          , e = [];
                        n.children("[data-value]").each(function() {
                            e.push(x(this).attr("data-value"))
                        }),
                        i.setValue(e),
                        i.setActiveItem(t)
                    }
                })
            }
            )
        }
        var e, n, o
    }),
    C.define("dropdown_header", function(t) {
        var e, n = this;
        t = x.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(t) {
                return '<div class="' + t.headerClass + '"><div class="' + t.titleRowClass + '"><span class="' + t.labelClass + '">' + t.title + '</span><a href="javascript:void(0)" class="' + t.closeClass + '">&times;</a></div></div>'
            }
        }, t),
        n.setup = (e = n.setup,
        function() {
            e.apply(n, arguments),
            n.$dropdown_header = x(t.html(t)),
            n.$dropdown.prepend(n.$dropdown_header)
        }
        )
    }),
    C.define("optgroup_columns", function(a) {
        var s, l = this;
        a = x.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, a),
        this.getAdjacentOption = function(t, e) {
            var n = t.closest("[data-group]").find("[data-selectable]")
              , i = n.index(t) + e;
            return 0 <= i && i < n.length ? n.eq(i) : x()
        }
        ,
        this.onKeyDown = (s = l.onKeyDown,
        function(t) {
            var e, n, i, o;
            return !this.isOpen || 37 !== t.keyCode && 39 !== t.keyCode ? s.apply(this, arguments) : (l.ignoreHover = !0,
            e = (o = this.$activeOption.closest("[data-group]")).find("[data-selectable]").index(this.$activeOption),
            void ((n = (i = (o = 37 === t.keyCode ? o.prev("[data-group]") : o.next("[data-group]")).find("[data-selectable]")).eq(Math.min(i.length - 1, e))).length && this.setActiveOption(n)))
        }
        );
        var p = function() {
            var t, e = p.width, n = document;
            return void 0 === e && ((t = n.createElement("div")).innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>',
            t = t.firstChild,
            n.body.appendChild(t),
            e = p.width = t.offsetWidth - t.clientWidth,
            n.body.removeChild(t)),
            e
        }
          , t = function() {
            var t, e, n, i, o, s, r;
            if ((e = (r = x("[data-group]", l.$dropdown_content)).length) && l.$dropdown_content.width()) {
                if (a.equalizeHeight) {
                    for (t = n = 0; t < e; t++)
                        n = Math.max(n, r.eq(t).height());
                    r.css({
                        height: n
                    })
                }
                a.equalizeWidth && (s = l.$dropdown_content.innerWidth() - p(),
                i = Math.round(s / e),
                r.css({
                    width: i
                }),
                1 < e && (o = s - i * (e - 1),
                r.eq(e - 1).css({
                    width: o
                })))
            }
        };
        (a.equalizeHeight || a.equalizeWidth) && (n.after(this, "positionDropdown", t),
        n.after(this, "refreshOptions", t))
    }),
    C.define("remove_button", function(t) {
        var n, i, o, s, r;
        (t = x.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0
        }, t),
        "single" !== this.settings.mode) ? (s = n = this,
        r = '<a href="javascript:void(0)" class="' + (i = t).className + '" tabindex="-1" title="' + a(i.title) + '">' + i.label + "</a>",
        n.setup = (o = s.setup,
        function() {
            if (i.append) {
                var e = s.settings.render.item;
                s.settings.render.item = function(t) {
                    return function(t, e) {
                        var n = t.search(/(<\/[^>]+>\s*)$/);
                        return t.substring(0, n) + e + t.substring(n)
                    }(e.apply(n, arguments), r)
                }
            }
            o.apply(n, arguments),
            n.$control.on("click", "." + i.className, function(t) {
                if (t.preventDefault(),
                !s.isLocked) {
                    var e = x(t.currentTarget).parent();
                    s.setActiveItem(e),
                    s.deleteSelection() && s.setCaret(s.items.length)
                }
            })
        }
        )) : function(n, i) {
            i.className = "remove-single";
            var o, s = n, r = '<a href="javascript:void(0)" class="' + i.className + '" tabindex="-1" title="' + a(i.title) + '">' + i.label + "</a>";
            n.setup = (o = s.setup,
            function() {
                if (i.append) {
                    var t = x(s.$input.context).attr("id")
                      , e = (x("#" + t),
                    s.settings.render.item);
                    s.settings.render.item = function(t) {
                        return function(t, e) {
                            return x("<span>").append(t).append(e)
                        }(e.apply(n, arguments), r)
                    }
                }
                o.apply(n, arguments),
                n.$control.on("click", "." + i.className, function(t) {
                    t.preventDefault(),
                    s.isLocked || s.clear()
                })
            }
            )
        }(this, t)
    }),
    C.define("restore_on_backspace", function(i) {
        var o, t = this;
        i.text = i.text || function(t) {
            return t[this.settings.labelField]
        }
        ,
        this.onKeyDown = (o = t.onKeyDown,
        function(t) {
            var e, n;
            return 8 === t.keyCode && "" === this.$control_input.val() && !this.$activeItems.length && 0 <= (e = this.caretPos - 1) && e < this.items.length ? (n = this.options[this.items[e]],
            this.deleteSelection(t) && (this.setTextboxValue(i.text.apply(this, [n])),
            this.refreshOptions(!0)),
            void t.preventDefault()) : o.apply(this, arguments)
        }
        )
    }),
    C
});
