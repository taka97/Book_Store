!(function () {
  'use strict'
  function e (e) {
    try {
      if (typeof console === 'undefined') return
      'error' in console ? console.error(e) : console.log(e)
    } catch (e) { }
  }

  function t (e) {
    return i.innerHTML = '<a href="' + e.replace(/"/g, '&quot;') + '"></a>', i.childNodes[0].getAttribute('href') || ''
  }

  function r (e, t) {
    var r = e.substr(t, 2)
    return parseInt(r, 16)
  }

  function n (n, c) {
    for (var o = '', a = r(n, c), i = c + 2; i < n.length; i += 2) {
      var u = r(n, i) ^ a
      o += String.fromCharCode(u)
    }
    try {
      o = decodeURIComponent(escape(o))
    } catch (l) {
      e(l)
    }
    return t(o)
  }
  var c = '/cdn-cgi/l/email-protection#',
    o = '.__cf_email__',
    a = 'data-cfemail',
    i = document.createElement('div')
  !(function () {
    for (var t = document.getElementsByTagName('a'), r = 0; r < t.length; r++) {
      try {
        var o = t[r],
          a = o.href.indexOf(c)
        a > -1 && (o.href = 'mailto:' + n(o.href, a + c.length))
      } catch (i) {
        e(i)
      }
    }
  }()),
  (function () {
    for (var t = document.querySelectorAll(o), r = 0; r < t.length; r++) {
      try {
        var c = t[r],
          i = c.parentNode,
          u = c.getAttribute(a)
        if (u) {
          var l = n(u, 0),
            f = document.createTextNode(l)
          i.replaceChild(f, c)
        }
      } catch (d) {
        e(d)
      }
    }
  }()),
  (function () {
    var e = document.currentScript || document.scripts[document.scripts.length - 1]
    e.parentNode.removeChild(e)
  }())
}())
