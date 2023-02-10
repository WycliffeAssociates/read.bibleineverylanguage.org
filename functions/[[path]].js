globalThis.process = {
  argv: [],
  env: {}
}
var Uo = Object.defineProperty
var ce = (e, t) => () => (e && (t = e((e = 0))), t)
var dt = (e, t) => {
  for (var n in t) Uo(e, n, { get: t[n], enumerable: !0 })
}
function Et() {
  ;(this._types = Object.create(null)), (this._extensions = Object.create(null))
  for (let e = 0; e < arguments.length; e++) this.define(arguments[e])
  ;(this.define = this.define.bind(this)),
    (this.getType = this.getType.bind(this)),
    (this.getExtension = this.getExtension.bind(this))
}
function Yo(e, t) {
  if (typeof e != "string") throw new TypeError("argument str must be a string")
  for (var n = {}, r = t || {}, a = r.decode || Qo, o = 0; o < e.length; ) {
    var i = e.indexOf("=", o)
    if (i === -1) break
    var s = e.indexOf(";", o)
    if (s === -1) s = e.length
    else if (s < i) {
      o = e.lastIndexOf(";", i - 1) + 1
      continue
    }
    var l = e.slice(o, i).trim()
    if (n[l] === void 0) {
      var p = e.slice(i + 1, s).trim()
      p.charCodeAt(0) === 34 && (p = p.slice(1, -1)), (n[l] = ns(p, a))
    }
    o = s + 1
  }
  return n
}
function Zo(e, t, n) {
  var r = n || {},
    a = r.encode || es
  if (typeof a != "function") throw new TypeError("option encode is invalid")
  if (!ut.test(e)) throw new TypeError("argument name is invalid")
  var o = a(t)
  if (o && !ut.test(o)) throw new TypeError("argument val is invalid")
  var i = e + "=" + o
  if (r.maxAge != null) {
    var s = r.maxAge - 0
    if (isNaN(s) || !isFinite(s))
      throw new TypeError("option maxAge is invalid")
    i += "; Max-Age=" + Math.floor(s)
  }
  if (r.domain) {
    if (!ut.test(r.domain)) throw new TypeError("option domain is invalid")
    i += "; Domain=" + r.domain
  }
  if (r.path) {
    if (!ut.test(r.path)) throw new TypeError("option path is invalid")
    i += "; Path=" + r.path
  }
  if (r.expires) {
    var l = r.expires
    if (!ts(l) || isNaN(l.valueOf()))
      throw new TypeError("option expires is invalid")
    i += "; Expires=" + l.toUTCString()
  }
  if (
    (r.httpOnly && (i += "; HttpOnly"),
    r.secure && (i += "; Secure"),
    r.priority)
  ) {
    var p =
      typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority
    switch (p) {
      case "low":
        i += "; Priority=Low"
        break
      case "medium":
        i += "; Priority=Medium"
        break
      case "high":
        i += "; Priority=High"
        break
      default:
        throw new TypeError("option priority is invalid")
    }
  }
  if (r.sameSite) {
    var c =
      typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite
    switch (c) {
      case !0:
        i += "; SameSite=Strict"
        break
      case "lax":
        i += "; SameSite=Lax"
        break
      case "strict":
        i += "; SameSite=Strict"
        break
      case "none":
        i += "; SameSite=None"
        break
      default:
        throw new TypeError("option sameSite is invalid")
    }
  }
  return i
}
function Qo(e) {
  return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e
}
function es(e) {
  return encodeURIComponent(e)
}
function ts(e) {
  return Xo.call(e) === "[object Date]" || e instanceof Date
}
function ns(e, t) {
  try {
    return t(e)
  } catch {
    return e
  }
}
function kn(e, t) {
  Reflect.set(e, Rr, t)
}
function is(e) {
  let t = Reflect.get(e, Rr)
  if (t != null) return t
}
function* as(e) {
  let t = is(e)
  if (!!t) for (let n of t.headers()) yield n
}
function ss(e) {
  return e.replace(
    /\r\n|\r(?!\n)|\n/g,
    `
`
  )
}
function ls(e) {
  let t = Object.entries(A).find((n) => n[1].code === e)
  if (t) return { name: t[0], data: t[1] }
}
function cs(e, t) {
  if (!t || t.line === void 0 || t.column === void 0) return ""
  let n = ss(e)
      .split(
        `
`
      )
      .map((i) => i.replace(/\t/g, "  ")),
    r = []
  for (let i = -2; i <= 2; i++) n[t.line + i] && r.push(t.line + i)
  let a = 0
  for (let i of r) {
    let s = `> ${i}`
    s.length > a && (a = s.length)
  }
  let o = ""
  for (let i of r) {
    let s = i === t.line - 1
    ;(o += s ? "> " : "  "),
      (o += `${i + 1} | ${n[i]}
`),
      s &&
        (o += `${Array.from({ length: a }).join(" ")}  | ${Array.from({
          length: t.column
        }).join(" ")}^
`)
  }
  return o
}
function ps(e) {
  return !(e.length !== 3 || !e[0] || typeof e[0] != "object")
}
function Lr(e, t) {
  var n
  let r =
      ((n = t?.split("/").pop()) == null ? void 0 : n.replace(".astro", "")) ??
      "",
    a = (...o) => {
      if (!ps(o))
        throw new L({
          ...A.InvalidComponentArgs,
          message: A.InvalidComponentArgs.message(r)
        })
      return e(...o)
    }
  return (
    Object.defineProperty(a, "name", { value: r, writable: !1 }),
    (a.isAstroComponentFactory = !0),
    (a.moduleId = t),
    a
  )
}
function ds(e) {
  let t = Lr(e.factory, e.moduleId)
  return (t.propagation = e.propagation), t
}
function _e(e, t) {
  return typeof e == "function" ? Lr(e, t) : ds(e)
}
function us() {
  return (t, n) => {
    let r = [...Object.values(t)]
    if (r.length === 0)
      throw new Error(`Astro.glob(${JSON.stringify(n())}) - no matches found.`)
    return Promise.all(r.map((a) => a()))
  }
}
function Oe(e) {
  return {
    site: e ? new URL(e) : void 0,
    generator: `Astro v${Mr}`,
    glob: us()
  }
}
function fs(e, t) {
  if (e[t]) return e[t]
  if (t === "delete" && e.del) return e.del
  if (e.all) return e.all
}
async function ms(e, t, n) {
  var r
  let { request: a, params: o } = t,
    i = (r = a.method) == null ? void 0 : r.toLowerCase(),
    s = fs(e, i)
  if (
    (!n &&
      n === !1 &&
      i &&
      i !== "get" &&
      console.warn(`
${i} requests are not available when building a static site. Update your config to output: 'server' to handle ${i} requests.`),
    !s || typeof s != "function")
  )
    return new Response(null, {
      status: 404,
      headers: { "X-Astro-Response": "Not-Found" }
    })
  s.length > 1 &&
    console.warn(`
API routes with 2 arguments have been deprecated. Instead they take a single argument in the form of:

export function get({ params, request }) {
	//...
}

Update your code to remove this warning.`)
  let l = new Proxy(t, {
    get(p, c) {
      return c in p
        ? Reflect.get(p, c)
        : c in o
        ? (console.warn(`
API routes no longer pass params as the first argument. Instead an object containing a params property is provided in the form of:

export function get({ params }) {
	// ...
}

Update your code to remove this warning.`),
          Reflect.get(o, c))
        : void 0
    }
  })
  return s.call(e, l, a)
}
function Ir(e) {
  let t = {}
  return n(e), Object.keys(t).join(" ")
  function n(r) {
    r && typeof r.forEach == "function"
      ? r.forEach(n)
      : r === Object(r)
      ? Object.keys(r).forEach((a) => {
          r[a] && n(a)
        })
      : ((r = r === !1 || r == null ? "" : String(r).trim()),
        r &&
          r.split(/\s+/).forEach((a) => {
            t[a] = !0
          }))
  }
}
function Sn(e) {
  return !!e && typeof e == "object" && typeof e.then == "function"
}
async function* fr(e) {
  let t = e.getReader()
  try {
    for (;;) {
      let { done: n, value: r } = await t.read()
      if (n) return
      yield r
    }
  } finally {
    t.releaseLock()
  }
}
function An(e) {
  return Object.prototype.toString.call(e) === "[object HTMLString]"
}
function Ke(e) {
  return e && typeof e == "object" && e[Pt]
}
function bs(e) {
  if (typeof e.type == "string") return e
  let t = {}
  if (Ke(e.props.children)) {
    let n = e.props.children
    if (!Ke(n) || !("slot" in n.props)) return
    let r = hr(n.props.slot)
    ;(t[r] = [n]),
      (t[r].$$slot = !0),
      delete n.props.slot,
      delete e.props.children
  }
  Array.isArray(e.props.children) &&
    (e.props.children = e.props.children
      .map((n) => {
        if (!Ke(n) || !("slot" in n.props)) return n
        let r = hr(n.props.slot)
        return (
          Array.isArray(t[r])
            ? t[r].push(n)
            : ((t[r] = [n]), (t[r].$$slot = !0)),
          delete n.props.slot,
          mr
        )
      })
      .filter((n) => n !== mr)),
    Object.assign(e.props, t)
}
function Dr(e) {
  return typeof e == "string"
    ? E(e)
    : Array.isArray(e)
    ? e.map((t) => Dr(t))
    : e
}
function ys(e) {
  if ("set:html" in e.props || "set:text" in e.props) {
    if ("set:html" in e.props) {
      let t = Dr(e.props["set:html"])
      delete e.props["set:html"], Object.assign(e.props, { children: t })
      return
    }
    if ("set:text" in e.props) {
      let t = e.props["set:text"]
      delete e.props["set:text"], Object.assign(e.props, { children: t })
      return
    }
  }
}
function ks(e, t) {
  let n = { [St]: "astro:jsx", [Pt]: !0, type: e, props: t ?? {} }
  return ys(n), bs(n), n
}
function Ps(e) {
  return e._metadata.hasHydrationScript
    ? !1
    : (e._metadata.hasHydrationScript = !0)
}
function _s(e, t) {
  return e._metadata.hasDirectives.has(t)
    ? !1
    : (e._metadata.hasDirectives.add(t), !0)
}
function xr(e) {
  if (!(e in gr)) throw new Error(`Unknown directive: ${e}`)
  return gr[e]
}
function Os(e, t) {
  switch (e) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${
        xr(t) + Es
      }<\/script>`
    case "directive":
      return `<script>${xr(t)}<\/script>`
  }
  return ""
}
function Ds(e) {
  let t = ""
  for (let [n, r] of Object.entries(e))
    t += `const ${Ls(n)} = ${JSON.stringify(r)};
`
  return E(t)
}
function vr(e) {
  return e.length === 1
    ? e[0]
    : `${e.slice(0, -1).join(", ")} or ${e[e.length - 1]}`
}
function de(e, t, n = !0) {
  if (e == null) return ""
  if (e === !1) return Ts.test(t) || Ns.test(t) ? E(` ${t}="false"`) : ""
  if (Rs.has(t))
    return (
      console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`),
      ""
    )
  if (t === "class:list") {
    let r = We(Ir(e), n)
    return r === "" ? "" : E(` ${t.slice(0, -5)}="${r}"`)
  }
  return t === "style" && !(e instanceof be) && typeof e == "object"
    ? E(` ${t}="${We(Is(e), n)}"`)
    : t === "className"
    ? E(` class="${We(e, n)}"`)
    : e === !0 && (t.startsWith("data-") || Fs.test(t))
    ? E(` ${t}`)
    : E(` ${t}="${We(e, n)}"`)
}
function ln(e, t = !0) {
  let n = ""
  for (let [r, a] of Object.entries(e)) n += de(a, r, t)
  return E(n)
}
function ht(e, { props: t, children: n = "" }, r = !0) {
  let { lang: a, "data-astro-id": o, "define:vars": i, ...s } = t
  return (
    i &&
      (e === "style" && (delete s["is:global"], delete s["is:scoped"]),
      e === "script" &&
        (delete s.hoist,
        (n =
          Ds(i) +
          `
` +
          n))),
    (n == null || n == "") && $n.test(e)
      ? `<${e}${ln(s, r)} />`
      : `<${e}${ln(s, r)}>${n}</${e}>`
  )
}
function wr(e) {
  e._metadata.hasRenderedHead = !0
  let t = Array.from(e.styles)
    .filter(Gt)
    .map((o) => ht("style", o))
  e.styles.clear()
  let n = Array.from(e.scripts)
      .filter(Gt)
      .map((o, i) => ht("script", o, !1)),
    a =
      Array.from(e.links)
        .filter(Gt)
        .map((o) => ht("link", o, !1)).join(`
`) +
      t.join(`
`) +
      n.join(`
`)
  if (e.extraHead.length > 0) for (let o of e.extraHead) a += o
  return E(a)
}
function* Br(e) {
  yield { type: "head", result: e }
}
function* Fe(e) {
  e._metadata.hasRenderedHead ||
    (yield { type: "maybe-head", result: e, scope: e.scope })
}
function Bs(e, t) {
  e.scope |= t
}
function Te(e, t) {
  let n = Object.create(e, { scope: { writable: !0, value: e.scope } })
  return t != null && Bs(n, t), n
}
function _t(e) {
  return typeof e == "object" && !!e[Hs]
}
function zr(e) {
  return typeof e == "object" && !!e[Hr]
}
async function* Ot(e) {
  for await (let t of e)
    if (t || t === 0)
      for await (let n of Pe(t))
        switch (n.type) {
          case "directive": {
            yield n
            break
          }
          default: {
            yield E(n)
            break
          }
        }
}
function ee(e, ...t) {
  return new cn(e, t)
}
function Ur(e) {
  return e == null ? !1 : e.isAstroComponentFactory === !0
}
async function zs(e, t, n, r) {
  let a = Te(e, R.Astro),
    o = await t(a, n, r)
  if (o instanceof Response) throw o
  let i = new Xe(),
    s = _t(o) ? o.content : o
  for await (let l of Ot(s)) i.append(l, e)
  return i.toString()
}
function Us(e, t) {
  let n = t.propagation || "none"
  return (
    t.moduleId &&
      e.propagation.has(t.moduleId) &&
      n === "none" &&
      (n = e.propagation.get(t.moduleId)),
    n === "in-tree" || n === "self"
  )
}
function Xt(e, t = {}, n = new WeakSet()) {
  if (n.has(e))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`)
  n.add(e)
  let r = e.map((a) => qr(a, t, n))
  return n.delete(e), r
}
function Wr(e, t = {}, n = new WeakSet()) {
  if (n.has(e))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`)
  n.add(e)
  let r = Object.fromEntries(
    Object.entries(e).map(([a, o]) => [a, qr(o, t, n)])
  )
  return n.delete(e), r
}
function qr(e, t = {}, n = new WeakSet()) {
  switch (Object.prototype.toString.call(e)) {
    case "[object Date]":
      return [re.Date, e.toISOString()]
    case "[object RegExp]":
      return [re.RegExp, e.source]
    case "[object Map]":
      return [re.Map, JSON.stringify(Xt(Array.from(e), t, n))]
    case "[object Set]":
      return [re.Set, JSON.stringify(Xt(Array.from(e), t, n))]
    case "[object BigInt]":
      return [re.BigInt, e.toString()]
    case "[object URL]":
      return [re.URL, e.toString()]
    case "[object Array]":
      return [re.JSON, JSON.stringify(Xt(e, t, n))]
    case "[object Uint8Array]":
      return [re.Uint8Array, JSON.stringify(Array.from(e))]
    case "[object Uint16Array]":
      return [re.Uint16Array, JSON.stringify(Array.from(e))]
    case "[object Uint32Array]":
      return [re.Uint32Array, JSON.stringify(Array.from(e))]
    default:
      return e !== null && typeof e == "object"
        ? [re.Value, Wr(e, t, n)]
        : [re.Value, e]
  }
}
function Vr(e, t) {
  return JSON.stringify(Wr(e, t))
}
function qs(e, t) {
  let n = { isPage: !1, hydration: null, props: {} }
  for (let [r, a] of Object.entries(t))
    if (
      (r.startsWith("server:") && r === "server:root" && (n.isPage = !0),
      r.startsWith("client:"))
    )
      switch (
        (n.hydration ||
          (n.hydration = {
            directive: "",
            value: "",
            componentUrl: "",
            componentExport: { value: "" }
          }),
        r)
      ) {
        case "client:component-path": {
          n.hydration.componentUrl = a
          break
        }
        case "client:component-export": {
          n.hydration.componentExport.value = a
          break
        }
        case "client:component-hydration":
          break
        case "client:display-name":
          break
        default: {
          if (
            ((n.hydration.directive = r.split(":")[1]),
            (n.hydration.value = a),
            !Ws.has(n.hydration.directive))
          )
            throw new Error(
              `Error: invalid hydration directive "${r}". Supported hydration methods: ${Array.from(
                Kr
              ).join(", ")}`
            )
          if (
            n.hydration.directive === "media" &&
            typeof n.hydration.value != "string"
          )
            throw new L(A.MissingMediaQueryDirective)
          break
        }
      }
    else
      r === "class:list"
        ? a && (n.props[r.slice(0, -5)] = Ir(a))
        : (n.props[r] = a)
  for (let r of Object.getOwnPropertySymbols(t)) n.props[r] = t[r]
  return n
}
async function Vs(e, t) {
  let { renderer: n, result: r, astroId: a, props: o, attrs: i } = e,
    { hydrate: s, componentUrl: l, componentExport: p } = t
  if (!p.value)
    throw new Error(
      `Unable to resolve a valid export for "${t.displayName}"! Please open an issue at https://astro.build/issues!`
    )
  let c = { children: "", props: { uid: a } }
  if (i) for (let [f, b] of Object.entries(i)) c.props[f] = Je(b)
  ;(c.props["component-url"] = await r.resolve(decodeURI(l))),
    n.clientEntrypoint &&
      ((c.props["component-export"] = p.value),
      (c.props["renderer-url"] = await r.resolve(
        decodeURI(n.clientEntrypoint)
      )),
      (c.props.props = Je(Vr(o, t)))),
    (c.props.ssr = ""),
    (c.props.client = s)
  let u = await r.resolve("astro:scripts/before-hydration.js")
  return (
    u.length && (c.props["before-hydration-url"] = u),
    (c.props.opts = Je(
      JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })
    )),
    c
  )
}
function Js(e, t) {
  if (e != null)
    for (let n of Object.keys(e))
      Kr.has(n) &&
        console.warn(
          `You are attempting to render <${t} ${n} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        )
}
function Ks(e, t, n, r, a = {}) {
  Js(r, t)
  let o = new pn(e, r, a, n)
  return Us(e, n) && !e.propagators.has(n) && e.propagators.set(n, o), o
}
function jn(e) {
  return typeof e == "object" && !!e[Xr]
}
async function* Pe(e) {
  if (((e = await e), e instanceof kt))
    e.instructions && (yield* e.instructions), yield e
  else if (An(e)) yield e
  else if (Array.isArray(e)) for (let t of e) yield E(await Pe(t))
  else
    typeof e == "function"
      ? yield* Pe(e())
      : typeof e == "string"
      ? yield E(Je(e))
      : (!e && e !== 0) ||
        (zr(e)
          ? yield* Ot(e)
          : jn(e)
          ? yield* e.render()
          : ArrayBuffer.isView(e)
          ? yield e
          : typeof e == "object" &&
            (Symbol.asyncIterator in e || Symbol.iterator in e)
          ? yield* e
          : yield e)
}
function Gs(e) {
  return !!e[Yr]
}
async function pe(e, t, n) {
  if (t) {
    let r = Te(e, R.Slot),
      a = Pe(typeof t == "function" ? t(r) : t),
      o = "",
      i = null
    for await (let s of a)
      typeof s.type == "string" ? (i === null && (i = []), i.push(s)) : (o += s)
    return E(new kt(o, i))
  }
  return n ? pe(e, n) : ""
}
async function Zr(e, t = {}) {
  let n = null,
    r = {}
  return (
    t &&
      (await Promise.all(
        Object.entries(t).map(([a, o]) =>
          pe(e, o).then((i) => {
            i.instructions &&
              (n === null && (n = []), n.push(...i.instructions)),
              (r[a] = i)
          })
        )
      )),
    { slotInstructions: n, children: r }
  )
}
function Qe(e, t) {
  if (typeof t.type == "string") {
    let n = t
    switch (n.type) {
      case "directive": {
        let { hydration: r } = n,
          a = r && Ps(e),
          o = r && _s(e, r.directive),
          i = a ? "both" : o ? "directive" : null
        if (i) {
          let s = Os(i, r.directive)
          return E(s)
        } else return ""
      }
      case "head":
        return e._metadata.hasRenderedHead ? "" : wr(e)
      case "maybe-head": {
        if (e._metadata.hasRenderedHead) return ""
        switch (n.scope) {
          case R.JSX | R.Slot | R.Astro:
          case R.JSX | R.Astro | R.HeadBuffer:
          case R.JSX | R.Slot | R.Astro | R.HeadBuffer:
            return ""
          case R.RenderSlot | R.Astro:
          case R.RenderSlot | R.Astro | R.JSX:
          case R.RenderSlot | R.Astro | R.JSX | R.HeadBuffer:
            return ""
        }
        return wr(e)
      }
    }
  } else {
    if (Gs(t)) {
      let n = "",
        r = t
      if (r.instructions) for (let a of r.instructions) n += Qe(e, a)
      return (n += t.toString()), n
    }
    return t.toString()
  }
}
function Zs(e, t) {
  if (t instanceof Uint8Array) return t
  let n = Qe(e, t)
  return Cn.encode(n.toString())
}
async function ge(e, t) {
  switch (!0) {
    case t instanceof be:
      return t.toString().trim() === "" ? "" : t
    case typeof t == "string":
      return E(Je(t))
    case typeof t == "function":
      return t
    case !t && t !== 0:
      return ""
    case Array.isArray(t):
      return E((await Promise.all(t.map((r) => ge(e, r)))).join(""))
  }
  let n
  return (
    t.props
      ? t.props[he.symbol]
        ? (n = t.props[he.symbol])
        : (n = new he(t))
      : (n = new he(t)),
    un(e, t, n)
  )
}
async function un(e, t, n) {
  if (Ke(t)) {
    switch (!0) {
      case !t.type:
        throw new Error(`Unable to render ${e._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`)
      case t.type === Symbol.for("astro:fragment"):
        return ge(e, t.props.children)
      case t.type.isAstroComponentFactory: {
        let r = {},
          a = {}
        for (let [s, l] of Object.entries(t.props ?? {}))
          s === "children" || (l && typeof l == "object" && l.$$slot)
            ? (a[s === "children" ? "default" : s] = () => ge(e, l))
            : (r[s] = l)
        let o = Te(e, R.JSX)
        return E(await zs(o, t.type, r, a))
      }
      case !t.type && t.type !== 0:
        return ""
      case typeof t.type == "string" && t.type !== yr:
        return E(await Qs(e, t.type, t.props ?? {}))
    }
    if (t.type) {
      let r = function (c) {
        if (Array.isArray(c)) return c.map((u) => r(u))
        if (!Ke(c)) {
          i.default.push(c)
          return
        }
        if ("slot" in c.props) {
          ;(i[c.props.slot] = [...(i[c.props.slot] ?? []), c]),
            delete c.props.slot
          return
        }
        i.default.push(c)
      }
      if (
        (typeof t.type == "function" &&
          t.type["astro:renderer"] &&
          n.increment(),
        typeof t.type == "function" && t.props["server:root"])
      ) {
        let c = await t.type(t.props ?? {})
        return await ge(e, c)
      }
      if (typeof t.type == "function")
        if (n.haveNoTried() || n.isCompleted()) {
          el()
          try {
            let c = await t.type(t.props ?? {}),
              u
            if (c && c[Pt]) return (u = await un(e, c, n)), u
            if (!c) return (u = await un(e, c, n)), u
          } catch (c) {
            if (n.isCompleted()) throw c
            n.increment()
          } finally {
            tl()
          }
        } else n.increment()
      let { children: a = null, ...o } = t.props ?? {},
        i = { default: [] }
      r(a)
      for (let [c, u] of Object.entries(o))
        u.$$slot && ((i[c] = u), delete o[c])
      let s = [],
        l = {}
      for (let [c, u] of Object.entries(i))
        s.push(
          ge(e, u).then((f) => {
            f.toString().trim().length !== 0 && (l[c] = () => f)
          })
        )
      await Promise.all(s), (o[he.symbol] = n)
      let p
      if (
        (t.type === yr && t.props["client:only"]
          ? (p = await Sr(e, t.props["client:display-name"] ?? "", null, o, l))
          : (p = await Sr(
              e,
              typeof t.type == "function" ? t.type.name : t.type,
              t.type,
              o,
              l
            )),
        typeof p != "string" && Symbol.asyncIterator in p)
      ) {
        let c = new Xe()
        for await (let u of p) c.append(u, e)
        return E(c.toString())
      } else return E(p)
    }
  }
  return E(`${t}`)
}
async function Qs(e, t, { children: n, ...r }) {
  return E(
    `<${t}${bl(r)}${E(
      (n == null || n == "") && $n.test(t)
        ? "/>"
        : `>${n == null ? "" : await ge(e, n)}</${t}>`
    )}`
  )
}
function el() {
  if ((En++, !dn)) {
    dn = console.error
    try {
      console.error = nl
    } catch {}
  }
}
function tl() {
  En--
}
function nl(e, ...t) {
  ;(En > 0 &&
    typeof e == "string" &&
    e.includes("Warning: Invalid hook call.") &&
    e.includes("https://reactjs.org/link/invalid-hook-call")) ||
    dn(e, ...t)
}
function rl(e) {
  let t = 0
  if (e.length === 0) return t
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n)
    ;(t = (t << 5) - t + r), (t = t & t)
  }
  return t
}
function il(e) {
  let t,
    n = "",
    r = rl(e),
    a = r < 0 ? "Z" : ""
  for (r = Math.abs(r); r >= Yt; )
    (t = r % Yt), (r = Math.floor(r / Yt)), (n = fn[t] + n)
  return r > 0 && (n = fn[r] + n), a + n
}
function al(e) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e)
}
async function ol(e, t, n, r) {
  let a = sl(t),
    o = ""
  for (let i in n) o += ` ${i}="${We(await n[i])}"`
  return E(`<${a}${o}>${await pe(e, r?.default)}</${a}>`)
}
function sl(e) {
  let t = customElements.getName(e)
  return (
    t ||
    e.name
      .replace(/^HTML|Element$/g, "")
      .replace(/[A-Z]/g, "-$&")
      .toLowerCase()
      .replace(/^-/, "html-")
  )
}
function ll(e) {
  switch (e?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"]
    case "vue":
      return ["@astrojs/vue"]
    case "jsx":
    case "tsx":
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue (jsx)"
      ]
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte",
        "@astrojs/lit"
      ]
  }
}
function cl(e) {
  return e === Xs
}
function pl(e) {
  return e && typeof e == "object" && e["astro:html"]
}
async function dl(e, t, n, r, a = {}) {
  var o, i
  if (!n && !r["client:only"])
    throw new Error(`Unable to render ${t} because it is ${n}!
Did you forget to import the component or is it possible there is a typo?`)
  let { renderers: s } = e._metadata,
    l = { displayName: t },
    { hydration: p, isPage: c, props: u } = qs(t, r),
    f = "",
    b
  p &&
    ((l.hydrate = p.directive),
    (l.hydrateArgs = p.value),
    (l.componentExport = p.componentExport),
    (l.componentUrl = p.componentUrl))
  let h = ll(l.componentUrl),
    v = s.filter((S) => S.name !== "astro:jsx"),
    { children: y, slotInstructions: C } = await Zr(e, a),
    k
  if (l.hydrate !== "only") {
    let S = !1
    try {
      S = n && n[St]
    } catch {}
    if (S) {
      let N = n[St]
      k = s.find(({ name: z }) => z === N)
    }
    if (!k) {
      let N
      for (let z of s)
        try {
          if (await z.ssr.check.call({ result: e }, n, u, y)) {
            k = z
            break
          }
        } catch ($) {
          N ?? (N = $)
        }
      if (!k && N) throw N
    }
    if (!k && typeof HTMLElement == "function" && al(n)) return ol(e, n, r, a)
  } else {
    if (l.hydrateArgs) {
      let S = l.hydrateArgs,
        N = kr.has(S) ? kr.get(S) : S
      k = s.find(({ name: z }) => z === `@astrojs/${N}` || z === N)
    }
    if ((!k && v.length === 1 && (k = v[0]), !k)) {
      let S = (o = l.componentUrl) == null ? void 0 : o.split(".").pop()
      k = s.filter(({ name: N }) => N === `@astrojs/${S}` || N === S)[0]
    }
  }
  if (k)
    l.hydrate === "only"
      ? (f = await pe(e, a?.fallback))
      : ({ html: f, attrs: b } = await k.ssr.renderToStaticMarkup.call(
          { result: e },
          n,
          u,
          y,
          l
        ))
  else {
    if (l.hydrate === "only")
      throw new L({
        ...A.NoClientOnlyHint,
        message: A.NoClientOnlyHint.message(l.displayName),
        hint: A.NoClientOnlyHint.hint(
          h.map((S) => S.replace("@astrojs/", "")).join("|")
        )
      })
    if (typeof n != "string") {
      let S = v.filter((z) => h.includes(z.name)),
        N = v.length > 1
      if (S.length === 0)
        throw new L({
          ...A.NoMatchingRenderer,
          message: A.NoMatchingRenderer.message(
            l.displayName,
            (i = l?.componentUrl) == null ? void 0 : i.split(".").pop(),
            N,
            v.length
          ),
          hint: A.NoMatchingRenderer.hint(vr(h.map((z) => "`" + z + "`")))
        })
      if (S.length === 1)
        (k = S[0]),
          ({ html: f, attrs: b } = await k.ssr.renderToStaticMarkup.call(
            { result: e },
            n,
            u,
            y,
            l
          ))
      else
        throw new Error(`Unable to render ${l.displayName}!

This component likely uses ${vr(h)},
but Astro encountered an error during server-side rendering.

Please ensure that ${l.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`)
    }
  }
  if (k && !k.clientEntrypoint && k.name !== "@astrojs/lit" && l.hydrate)
    throw new L({
      ...A.NoClientEntrypoint,
      message: A.NoClientEntrypoint.message(t, l.hydrate, k.name)
    })
  if (!f && typeof n == "string") {
    let S = ul(n),
      N = Object.values(y).join(""),
      z = Ot(
        await ee`<${S}${ln(u)}${E(
          N === "" && $n.test(S) ? "/>" : `>${N}</${S}>`
        )}`
      )
    f = ""
    for await (let $ of z) f += $
  }
  if (!p)
    return (async function* () {
      C && (yield* C),
        c || k?.name === "astro:jsx"
          ? yield f
          : f && f.length > 0
          ? yield E(f.replace(/\<\/?astro-slot\>/g, ""))
          : yield ""
    })()
  let T = il(`<!--${l.componentExport.value}:${l.componentUrl}-->
${f}
${Vr(u, l)}`),
    j = await Vs({ renderer: k, result: e, astroId: T, props: u, attrs: b }, l),
    O = []
  if (f) {
    if (Object.keys(y).length > 0)
      for (let S of Object.keys(y))
        f.includes(
          S === "default" ? "<astro-slot>" : `<astro-slot name="${S}">`
        ) || O.push(S)
  } else O = Object.keys(y)
  let B =
    O.length > 0
      ? O.map(
          (S) =>
            `<template data-astro-template${S !== "default" ? `="${S}"` : ""}>${
              y[S]
            }</template>`
        ).join("")
      : ""
  ;(j.children = `${f ?? ""}${B}`),
    j.children && (j.props["await-children"] = "")
  async function* Q() {
    C && (yield* C),
      yield { type: "directive", hydration: p, result: e },
      yield E(ht("astro-island", j, !1))
  }
  return Q()
}
function ul(e) {
  let t = /[&<>'"\s]+/g
  return t.test(e) ? e.trim().split(t)[0].trim() : e
}
async function fl(e, t = {}) {
  let n = await pe(e, t?.default)
  return n == null ? n : E(n)
}
async function ml(e, t, n, r = {}) {
  let { slotInstructions: a, children: o } = await Zr(e, r),
    i = t.render({ slots: o }),
    s = a ? a.map((l) => Qe(e, l)).join("") : ""
  return E(s + i)
}
function ie(e, t, n, r, a = {}) {
  return Sn(n)
    ? Promise.resolve(n).then((o) => ie(e, t, o, r, a))
    : cl(n)
    ? fl(e, a)
    : pl(n)
    ? ml(e, n, r, a)
    : Ur(n)
    ? Ks(e, t, n, r, a)
    : dl(e, t, n, r, a)
}
function Sr(e, t, n, r, a = {}) {
  let o = ie(e, t, n, r, a)
  return jn(o) ? o.render() : o
}
function hl() {
  var e, t, n
  return (
    (At =
      ((n = class extends Response {
        constructor(r, a) {
          let o = r instanceof ReadableStream
          super(o ? null : r, a),
            Ar(this, e, void 0),
            Ar(this, t, void 0),
            $r(this, e, o),
            $r(this, t, r)
        }
        get body() {
          return ze(this, t)
        }
        async text() {
          if (ze(this, e) && mn) {
            let r = new TextDecoder(),
              a = ze(this, t),
              o = ""
            for await (let i of fr(a)) o += r.decode(i)
            return o
          }
          return super.text()
        }
        async arrayBuffer() {
          if (ze(this, e) && mn) {
            let r = ze(this, t),
              a = [],
              o = 0
            for await (let l of fr(r)) a.push(l), (o += l.length)
            let i = new Uint8Array(o),
              s = 0
            for (let l of a) i.set(l, s), (s += l.length)
            return i
          }
          return super.arrayBuffer()
        }
      }),
      (e = new WeakMap()),
      (t = new WeakMap()),
      n)),
    At
  )
}
function xl(e) {
  return jr in e && !!e[jr]
}
async function Cr(e, t, n) {
  let r = new Xe(),
    a = 0
  for await (let o of t)
    An(o) &&
      a === 0 &&
      (a++,
      /<!doctype html/i.test(String(o)) ||
        (r.append(
          `<!DOCTYPE html>
`,
          e
        ),
        n && (await n(r)))),
      r.append(o, e)
  return r.toArrayBuffer()
}
async function vl(e) {
  let t = e.propagators.values(),
    n = Te(e, R.HeadBuffer)
  for (;;) {
    let { value: r, done: a } = t.next()
    if (a) break
    let o = await r.init(n)
    _t(o) && e.extraHead.push(o.head)
  }
}
async function wl(e, t, n, r, a, o) {
  if (!Ur(t)) {
    let l = { ...(n ?? {}), "server:root": !0 },
      p
    try {
      let u = await ie(e, t.name, t, l, null)
      jn(u) ? (p = u.render()) : (p = u)
    } catch (u) {
      throw (L.is(u) && !u.loc && u.setLocation({ file: o?.component }), u)
    }
    let c = await Cr(e, p, async (u) => {
      if (xl(t)) for await (let f of Fe(e)) u.append(f, e)
    })
    return new Response(c, {
      headers: new Headers([
        ["Content-Type", "text/html; charset=utf-8"],
        ["Content-Length", c.byteLength.toString()]
      ])
    })
  }
  let i = await t(e, n, r),
    s = _t(i)
  if (zr(i) || s) {
    await vl(e)
    let l = s ? i.content : i,
      p = Ot(l),
      c = e.response,
      u = new Headers(c.headers),
      f
    return (
      a
        ? (f = new ReadableStream({
            start(h) {
              async function v() {
                let y = 0
                try {
                  for await (let C of p) {
                    An(C) &&
                      y === 0 &&
                      (/<!doctype html/i.test(String(C)) ||
                        h.enqueue(
                          Cn.encode(`<!DOCTYPE html>
`)
                        ))
                    let k = Zs(e, C)
                    h.enqueue(k), y++
                  }
                  h.close()
                } catch (C) {
                  L.is(C) && !C.loc && C.setLocation({ file: o?.component }),
                    h.error(C)
                }
              }
              v()
            }
          }))
        : ((f = await Cr(e, p)),
          u.set("Content-Length", f.byteLength.toString())),
      gl(f, { ...c, headers: u })
    )
  }
  if (!(i instanceof Response))
    throw new L({
      ...A.OnlyResponseCanBeReturned,
      message: A.OnlyResponseCanBeReturned.message(o?.route, typeof i),
      location: { file: o?.component }
    })
  return i
}
function P(e, t) {
  !e ||
    (typeof e == "function" &&
      Object.defineProperty(e, St, { value: t, enumerable: !1, writable: !1 }))
}
function bl(e, t, { class: n } = {}) {
  let r = ""
  n &&
    (typeof e.class < "u"
      ? (e.class += ` ${n}`)
      : typeof e["class:list"] < "u"
      ? (e["class:list"] = [e["class:list"], n])
      : (e.class = n))
  for (let [a, o] of Object.entries(e)) r += de(o, a, !0)
  return E(r)
}
function Ne(e, t) {
  let n = new RegExp(`\\x1b\\[${t}m`, "g"),
    r = `\x1B[${e}m`,
    a = `\x1B[${t}m`
  return function (o) {
    return !yl.enabled || o == null
      ? o
      : r + (~("" + o).indexOf(a) ? o.replace(n, a + r) : o) + a
  }
}
function ii(e, t, n, r) {
  let a = e.level,
    o = e.dest,
    i = { type: n, level: t, message: r }
  $t[a] > $t[t] || o.write(i)
}
function Ye(e, t, n) {
  return ii(e, "warn", t, n)
}
function El(e, t, n) {
  return ii(e, "error", t, n)
}
function Pl(...e) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e)
}
function Ol([e, t], n) {
  if (!_l.includes(typeof t))
    throw new L({
      ...A.GetStaticPathsInvalidRouteParam,
      message: A.GetStaticPathsInvalidRouteParam.message(e, t, typeof t),
      location: { file: n }
    })
}
function Fl(e, { ssr: t, logging: n, route: r }) {
  if (
    (t &&
      e.getStaticPaths &&
      !e.prerender &&
      Ye(
        n,
        "getStaticPaths",
        'getStaticPaths() is ignored when "output: server" is set.'
      ),
    (!t || e.prerender) && !e.getStaticPaths)
  )
    throw new L({
      ...A.GetStaticPathsRequired,
      location: { file: r.component }
    })
}
function Tl(e, t, n) {
  if (!Array.isArray(e))
    throw new L({
      ...A.InvalidGetStaticPathsReturn,
      message: A.InvalidGetStaticPathsReturn.message(typeof e),
      location: { file: n.component }
    })
  e.forEach((r) => {
    if (
      r.params === void 0 ||
      r.params === null ||
      (r.params && Object.keys(r.params).length === 0)
    )
      throw new L({
        ...A.GetStaticPathsExpectedParams,
        location: { file: n.component }
      })
    if (typeof r.params != "object")
      throw new L({
        ...A.InvalidGetStaticPathParam,
        message: A.InvalidGetStaticPathParam.message(typeof r.params),
        location: { file: n.component }
      })
    for (let [a, o] of Object.entries(r.params))
      typeof o > "u" ||
        typeof o == "string" ||
        typeof o == "number" ||
        Ye(
          t,
          "getStaticPaths",
          `invalid path param: ${a}. A string, number or undefined value was expected, but got \`${JSON.stringify(
            o
          )}\`.`
        ),
        typeof o == "string" &&
          o === "" &&
          Ye(
            t,
            "getStaticPaths",
            `invalid path param: ${a}. \`undefined\` expected for an optional param, but got empty string.`
          )
  })
}
function Nl(e) {
  return (n) => {
    let r = {}
    return (
      e.forEach((a, o) => {
        a.startsWith("...")
          ? (r[a.slice(3)] = n[o + 1] ? decodeURIComponent(n[o + 1]) : void 0)
          : (r[a] = decodeURIComponent(n[o + 1]))
      }),
      r
    )
  }
}
function ai(e, t) {
  let n = Object.entries(e).reduce((r, a) => {
    Ol(a, t)
    let [o, i] = a
    return (r[o] = i?.toString()), r
  }, {})
  return JSON.stringify(n, Object.keys(e).sort())
}
function Rl(e) {
  return function () {
    switch (e) {
      case "Astro.redirect":
        throw new L(A.StaticRedirectNotAvailable)
    }
  }
}
function Ll(e) {
  var t
  if (!!e && ((t = e.expressions) == null ? void 0 : t.length) === 1)
    return e.expressions[0]
}
function Ml(e) {
  let {
      markdown: t,
      params: n,
      pathname: r,
      renderers: a,
      request: o,
      resolve: i
    } = e,
    s = new URL(o.url),
    l = new Headers()
  l.set("Content-Type", "text/html")
  let p = { status: e.status, statusText: "OK", headers: l }
  Object.defineProperty(p, "headers", {
    value: p.headers,
    enumerable: !0,
    writable: !1
  })
  let c,
    u = {
      styles: e.styles ?? new Set(),
      scripts: e.scripts ?? new Set(),
      links: e.links ?? new Set(),
      propagation: e.propagation ?? new Map(),
      propagators: new Map(),
      extraHead: [],
      scope: 0,
      cookies: c,
      createAstro(f, b, h) {
        let v = new gn(u, h, e.logging),
          y = {
            __proto__: f,
            get clientAddress() {
              if (!(_r in o))
                throw e.adapterName
                  ? new L({
                      ...A.ClientAddressNotAvailable,
                      message: A.ClientAddressNotAvailable.message(
                        e.adapterName
                      )
                    })
                  : new L(A.StaticClientAddressNotAvailable)
              return Reflect.get(o, _r)
            },
            get cookies() {
              return c || ((c = new yt(o)), (u.cookies = c), c)
            },
            params: n,
            props: b,
            request: o,
            url: s,
            redirect: e.ssr
              ? (C, k) =>
                  new Response(null, {
                    status: k || 302,
                    headers: { Location: C }
                  })
              : Rl("Astro.redirect"),
            response: p,
            slots: v
          }
        return (
          Object.defineProperty(y, "__renderMarkdown", {
            enumerable: !1,
            writable: !1,
            value: async function (C, k) {
              if (typeof Deno < "u")
                throw new Error("Markdown is not supported in Deno SSR")
              if (!tn) {
                let j = "@astrojs/"
                ;(j += "markdown-remark"),
                  (tn = (await import(j)).renderMarkdown)
              }
              let { code: T } = await tn(C, { ...t, ...(k ?? {}) })
              return T
            }
          }),
          y
        )
      },
      resolve: i,
      _metadata: {
        renderers: a,
        pathname: r,
        hasHydrationScript: !1,
        hasRenderedHead: !1,
        hasDirectives: new Set()
      },
      response: p
    }
  return u
}
function Il(e) {
  return function (n, r = {}) {
    let { pageSize: a, params: o, props: i } = r,
      s = a || 10,
      l = "page",
      p = o || {},
      c = i || {},
      u
    if (e.params.includes(`...${l}`)) u = !1
    else if (e.params.includes(`${l}`)) u = !0
    else
      throw new L({
        ...A.PageNumberParamNotFound,
        message: A.PageNumberParamNotFound.message(l)
      })
    let f = Math.max(1, Math.ceil(n.length / s))
    return [...Array(f).keys()].map((h) => {
      let v = h + 1,
        y = s === 1 / 0 ? 0 : (v - 1) * s,
        C = Math.min(y + s, n.length),
        k = { ...p, [l]: u || v > 1 ? String(v) : void 0 }
      return {
        params: k,
        props: {
          ...c,
          page: {
            data: n.slice(y, C),
            start: y,
            end: C - 1,
            size: s,
            total: n.length,
            currentPage: v,
            lastPage: f,
            url: {
              current: e.generate({ ...k }),
              next:
                v === f ? void 0 : e.generate({ ...k, page: String(v + 1) }),
              prev:
                v === 1
                  ? void 0
                  : e.generate({
                      ...k,
                      page: !u && v - 1 === 1 ? void 0 : String(v - 1)
                    })
            }
          }
        }
      }
    })
  }
}
async function Dl({ isValidate: e, logging: t, mod: n, route: r, ssr: a }) {
  if ((Fl(n, { ssr: a, logging: t, route: r }), a && !n.prerender))
    return { staticPaths: Object.assign([], { keyed: new Map() }) }
  if (!n.getStaticPaths) throw new Error("Unexpected Error.")
  let o = []
  ;(o = await n.getStaticPaths({
    paginate: Il(r),
    rss() {
      throw new L(A.GetStaticPathsRemovedRSSHelper)
    }
  })),
    Array.isArray(o) && (o = o.flat()),
    e && Tl(o, t, r)
  let i = o
  i.keyed = new Map()
  for (let s of i) {
    let l = ai(s.params, r.component)
    i.keyed.set(l, s)
  }
  return { staticPaths: i }
}
function Bl(e, t, n) {
  let r = ai(t, n.component),
    a = e.keyed.get(r)
  if (a) return a
  Pl("findPathItemByKey", `Unexpected cache miss looking for ${r}`)
}
async function li(e) {
  let { logging: t, mod: n, route: r, routeCache: a, pathname: o, ssr: i } = e,
    s = {},
    l
  if (r && !r.pathname) {
    if (r.params.length) {
      let u = r.pattern.exec(o)
      u && (s = Nl(r.params)(u))
    }
    let p = a.get(r)
    p ||
      ((p = await Dl({ mod: n, route: r, isValidate: !0, logging: t, ssr: i })),
      a.set(r, p))
    let c = Bl(p.staticPaths, s, r)
    if (!c && (i ? n.prerender : !0)) return 0
    l = c?.props ? { ...c.props } : {}
  } else l = {}
  return [s, l]
}
async function Hl(e, t, n) {
  var r, a
  let o = await li({
    logging: n.logging,
    mod: e,
    route: t.route,
    routeCache: n.routeCache,
    pathname: t.pathname,
    ssr: n.ssr
  })
  if (o === 0)
    throw new L({
      ...A.NoMatchingStaticPathFound,
      message: A.NoMatchingStaticPathFound.message(t.pathname),
      hint:
        (r = t.route) != null && r.component
          ? A.NoMatchingStaticPathFound.hint([
              (a = t.route) == null ? void 0 : a.component
            ])
          : ""
    })
  let [i, s] = o,
    l = e.default
  if (!l)
    throw new Error(
      `Expected an exported Astro component but received typeof ${typeof l}`
    )
  let p = Ml({
    adapterName: n.adapterName,
    links: t.links,
    styles: t.styles,
    logging: n.logging,
    markdown: n.markdown,
    mode: n.mode,
    origin: t.origin,
    params: i,
    props: s,
    pathname: t.pathname,
    propagation: t.propagation,
    resolve: n.resolve,
    renderers: n.renderers,
    request: t.request,
    site: n.site,
    scripts: t.scripts,
    ssr: n.ssr,
    status: t.status ?? 200
  })
  typeof e.components == "object" &&
    Object.assign(s, { components: e.components })
  let c = await wl(p, l, s, null, n.streaming, t.route)
  return p.cookies && kn(c, p.cookies), c
}
function zl({ request: e, params: t, site: n, props: r, adapterName: a }) {
  return {
    cookies: new yt(e),
    request: e,
    params: t,
    site: n ? new URL(n) : void 0,
    generator: `Astro v${Mr}`,
    props: r,
    redirect(o, i) {
      return new Response(null, { status: i || 302, headers: { Location: o } })
    },
    url: new URL(e.url),
    get clientAddress() {
      if (!(Or in e))
        throw a
          ? new L({
              ...A.ClientAddressNotAvailable,
              message: A.ClientAddressNotAvailable.message(a)
            })
          : new L(A.StaticClientAddressNotAvailable)
      return Reflect.get(e, Or)
    }
  }
}
async function Ul(e, t, n) {
  var r, a
  let o = await li({
    mod: e,
    route: n.route,
    routeCache: t.routeCache,
    pathname: n.pathname,
    logging: t.logging,
    ssr: t.ssr
  })
  if (o === si.NoMatchingStaticPath)
    throw new L({
      ...A.NoMatchingStaticPathFound,
      message: A.NoMatchingStaticPathFound.message(n.pathname),
      hint:
        (r = n.route) != null && r.component
          ? A.NoMatchingStaticPathFound.hint([
              (a = n.route) == null ? void 0 : a.component
            ])
          : ""
    })
  let [i, s] = o,
    l = zl({
      request: n.request,
      params: i,
      props: s,
      site: t.site,
      adapterName: t.adapterName
    }),
    p = await ms(e, l, t.ssr)
  return p instanceof Response
    ? (kn(p, l.cookies), { type: "response", response: p })
    : { type: "simple", body: p.body, encoding: p.encoding, cookies: l.cookies }
}
function ci(e) {
  return e.endsWith("/") ? e : e + "/"
}
function ql(e) {
  return e[0] === "/" ? e : "/" + e
}
function Vl(e) {
  return e.endsWith("/") ? e.slice(0, e.length - 1) : e
}
function Jl(e) {
  return e.startsWith("/") ? e.substring(1) : e
}
function Kl(e) {
  return e.replace(/^\/|\/$/g, "")
}
function Gl(e) {
  return typeof e == "string" || e instanceof String
}
function Xl(...e) {
  return e.filter(Gl).map(Kl).join("/")
}
function pi(e) {
  let t = e.request,
    n = new URL(t.url),
    r = e.origin ?? n.origin,
    a = e.pathname ?? n.pathname
  return { ...e, origin: r, pathname: a, url: n }
}
function Yl(e) {
  let t = /^\\\\\?\\/.test(e),
    n = /[^\u0000-\u0080]+/.test(e)
  return t || n ? e : e.replace(/\\/g, "/")
}
function Zl(e) {
  return ci(new URL(e || "/", "http://localhost/").pathname)
}
function di(e, t) {
  let n = Zl(t),
    r = Yl(e)
  return ci(n) + Jl(r)
}
function Ql(e, t) {
  return { props: { rel: "stylesheet", href: di(e, t) }, children: "" }
}
function ec(e, t) {
  return new Set(e.map((n) => Ql(n, t)))
}
function tc(e, t) {
  return e.type === "external"
    ? nc(e.value, t)
    : { props: { type: "module" }, children: e.value }
}
function nc(e, t) {
  return { props: { type: "module", src: di(e, t) }, children: "" }
}
function rn(e, t) {
  return t.routes.find((n) => n.pattern.test(decodeURI(e)))
}
function rc(e, t) {
  for (let n of t)
    if (
      !!n.endsWith(".html") &&
      (e.pattern.test(n) || e.pattern.test(n.replace(/index\.html$/, "")))
    )
      return n
}
function ic(e) {
  for (var t = [], n = 0; n < e.length; ) {
    var r = e[n]
    if (r === "*" || r === "+" || r === "?") {
      t.push({ type: "MODIFIER", index: n, value: e[n++] })
      continue
    }
    if (r === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] })
      continue
    }
    if (r === "{") {
      t.push({ type: "OPEN", index: n, value: e[n++] })
      continue
    }
    if (r === "}") {
      t.push({ type: "CLOSE", index: n, value: e[n++] })
      continue
    }
    if (r === ":") {
      for (var a = "", o = n + 1; o < e.length; ) {
        var i = e.charCodeAt(o)
        if (
          (i >= 48 && i <= 57) ||
          (i >= 65 && i <= 90) ||
          (i >= 97 && i <= 122) ||
          i === 95
        ) {
          a += e[o++]
          continue
        }
        break
      }
      if (!a) throw new TypeError("Missing parameter name at ".concat(n))
      t.push({ type: "NAME", index: n, value: a }), (n = o)
      continue
    }
    if (r === "(") {
      var s = 1,
        l = "",
        o = n + 1
      if (e[o] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(o))
      for (; o < e.length; ) {
        if (e[o] === "\\") {
          l += e[o++] + e[o++]
          continue
        }
        if (e[o] === ")") {
          if ((s--, s === 0)) {
            o++
            break
          }
        } else if (e[o] === "(" && (s++, e[o + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(o))
        l += e[o++]
      }
      if (s) throw new TypeError("Unbalanced pattern at ".concat(n))
      if (!l) throw new TypeError("Missing pattern at ".concat(n))
      t.push({ type: "PATTERN", index: n, value: l }), (n = o)
      continue
    }
    t.push({ type: "CHAR", index: n, value: e[n++] })
  }
  return t.push({ type: "END", index: n, value: "" }), t
}
function ac(e, t) {
  t === void 0 && (t = {})
  for (
    var n = ic(e),
      r = t.prefixes,
      a = r === void 0 ? "./" : r,
      o = "[^".concat(lc(t.delimiter || "/#?"), "]+?"),
      i = [],
      s = 0,
      l = 0,
      p = "",
      c = function (B) {
        if (l < n.length && n[l].type === B) return n[l++].value
      },
      u = function (B) {
        var Q = c(B)
        if (Q !== void 0) return Q
        var S = n[l],
          N = S.type,
          z = S.index
        throw new TypeError(
          "Unexpected ".concat(N, " at ").concat(z, ", expected ").concat(B)
        )
      },
      f = function () {
        for (var B = "", Q; (Q = c("CHAR") || c("ESCAPED_CHAR")); ) B += Q
        return B
      };
    l < n.length;

  ) {
    var b = c("CHAR"),
      h = c("NAME"),
      v = c("PATTERN")
    if (h || v) {
      var y = b || ""
      a.indexOf(y) === -1 && ((p += y), (y = "")),
        p && (i.push(p), (p = "")),
        i.push({
          name: h || s++,
          prefix: y,
          suffix: "",
          pattern: v || o,
          modifier: c("MODIFIER") || ""
        })
      continue
    }
    var C = b || c("ESCAPED_CHAR")
    if (C) {
      p += C
      continue
    }
    p && (i.push(p), (p = ""))
    var k = c("OPEN")
    if (k) {
      var y = f(),
        T = c("NAME") || "",
        j = c("PATTERN") || "",
        O = f()
      u("CLOSE"),
        i.push({
          name: T || (j ? s++ : ""),
          pattern: T && !j ? o : j,
          prefix: y,
          suffix: O,
          modifier: c("MODIFIER") || ""
        })
      continue
    }
    u("END")
  }
  return i
}
function oc(e, t) {
  return sc(ac(e, t), t)
}
function sc(e, t) {
  t === void 0 && (t = {})
  var n = cc(t),
    r = t.encode,
    a =
      r === void 0
        ? function (l) {
            return l
          }
        : r,
    o = t.validate,
    i = o === void 0 ? !0 : o,
    s = e.map(function (l) {
      if (typeof l == "object")
        return new RegExp("^(?:".concat(l.pattern, ")$"), n)
    })
  return function (l) {
    for (var p = "", c = 0; c < e.length; c++) {
      var u = e[c]
      if (typeof u == "string") {
        p += u
        continue
      }
      var f = l ? l[u.name] : void 0,
        b = u.modifier === "?" || u.modifier === "*",
        h = u.modifier === "*" || u.modifier === "+"
      if (Array.isArray(f)) {
        if (!h)
          throw new TypeError(
            'Expected "'.concat(u.name, '" to not repeat, but got an array')
          )
        if (f.length === 0) {
          if (b) continue
          throw new TypeError('Expected "'.concat(u.name, '" to not be empty'))
        }
        for (var v = 0; v < f.length; v++) {
          var y = a(f[v], u)
          if (i && !s[c].test(y))
            throw new TypeError(
              'Expected all "'
                .concat(u.name, '" to match "')
                .concat(u.pattern, '", but got "')
                .concat(y, '"')
            )
          p += u.prefix + y + u.suffix
        }
        continue
      }
      if (typeof f == "string" || typeof f == "number") {
        var y = a(String(f), u)
        if (i && !s[c].test(y))
          throw new TypeError(
            'Expected "'
              .concat(u.name, '" to match "')
              .concat(u.pattern, '", but got "')
              .concat(y, '"')
          )
        p += u.prefix + y + u.suffix
        continue
      }
      if (!b) {
        var C = h ? "an array" : "a string"
        throw new TypeError('Expected "'.concat(u.name, '" to be ').concat(C))
      }
    }
    return p
  }
}
function lc(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
}
function cc(e) {
  return e && e.sensitive ? "" : "i"
}
function pc(e, t) {
  let n = e
      .map(
        (o) =>
          "/" +
          o
            .map((i) =>
              i.spread
                ? `:${i.content.slice(3)}(.*)?`
                : i.dynamic
                ? `:${i.content}`
                : i.content
                    .normalize()
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23")
                    .replace(/%5B/g, "[")
                    .replace(/%5D/g, "]")
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            )
            .join("")
      )
      .join(""),
    r = ""
  return t === "always" && e.length && (r = "/"), oc(n + r)
}
function Tr(e) {
  return {
    route: e.route,
    type: e.type,
    pattern: new RegExp(e.pattern),
    params: e.params,
    component: e.component,
    generate: pc(e.segments, e._meta.trailingSlash),
    pathname: e.pathname || void 0,
    segments: e.segments
  }
}
function ui(e) {
  let t = []
  for (let a of e.routes) {
    t.push({ ...a, routeData: Tr(a.routeData) })
    let o = a
    o.routeData = Tr(a.routeData)
  }
  let n = new Set(e.assets),
    r = new Map(e.propagation)
  return { ...e, assets: n, propagation: r, routes: t }
}
async function dc(e, t, { default: n = null, ...r } = {}) {
  if (typeof e != "function") return !1
  let a = {}
  for (let [o, i] of Object.entries(r)) {
    let s = mi(o)
    a[s] = i
  }
  try {
    return (await e({ ...t, ...a, children: n }))[Pt]
  } catch {}
  return !1
}
async function uc(e, t = {}, { default: n = null, ...r } = {}) {
  let a = {}
  for (let [s, l] of Object.entries(r)) {
    let p = mi(s)
    a[p] = l
  }
  let { result: o } = this
  return { html: await ge(o, ks(e, { ...t, ...a, children: n })) }
}
var Wo,
  qo,
  Vo,
  Jo,
  Ko,
  Go,
  dr,
  Xo,
  ut,
  bn,
  Z,
  $e,
  Ee,
  Ue,
  bt,
  me,
  Y,
  ft,
  on,
  mt,
  sn,
  yn,
  Nr,
  rs,
  ur,
  Ve,
  yt,
  Rr,
  os,
  A,
  L,
  Mr,
  hs,
  gs,
  xs,
  vs,
  ws,
  Je,
  be,
  E,
  Pt,
  mr,
  hr,
  Ss,
  As,
  $s,
  js,
  Cs,
  Es,
  gr,
  $n,
  Fs,
  Ts,
  Ns,
  Rs,
  Ls,
  We,
  Ms,
  Is,
  Gt,
  R,
  Hs,
  br,
  Hr,
  cn,
  re,
  Jr,
  Ws,
  Kr,
  Gr,
  Xr,
  pn,
  Yr,
  kt,
  Xs,
  St,
  Cn,
  Ys,
  Xe,
  yr,
  he,
  dn,
  En,
  fn,
  Yt,
  kr,
  Qr,
  ze,
  Ar,
  $r,
  mn,
  At,
  gl,
  jr,
  hn,
  ei,
  ti,
  ni,
  ri,
  yl,
  kl,
  Zt,
  Sl,
  Al,
  Er,
  $l,
  Pr,
  jl,
  Cl,
  $t,
  _l,
  oi,
  we,
  Qt,
  en,
  gt,
  fe,
  xt,
  _r,
  gn,
  tn,
  xn,
  si,
  Or,
  Fr,
  nn,
  Wl,
  Pn,
  U,
  se,
  je,
  an,
  Ze,
  le,
  Ce,
  jt,
  _n,
  Ge,
  qe,
  vt,
  wt,
  vn,
  wn,
  fi,
  Ct,
  mi,
  hi,
  et = ce(() => {
    "use strict"
    Et.prototype.define = function (e, t) {
      for (let n in e) {
        let r = e[n].map(function (a) {
          return a.toLowerCase()
        })
        n = n.toLowerCase()
        for (let a = 0; a < r.length; a++) {
          let o = r[a]
          if (o[0] !== "*") {
            if (!t && o in this._types)
              throw new Error(
                'Attempt to change mapping for "' +
                  o +
                  '" extension from "' +
                  this._types[o] +
                  '" to "' +
                  n +
                  '". Pass `force=true` to allow this, otherwise remove "' +
                  o +
                  '" from the list of extensions for "' +
                  n +
                  '".'
              )
            this._types[o] = n
          }
        }
        if (t || !this._extensions[n]) {
          let a = r[0]
          this._extensions[n] = a[0] !== "*" ? a : a.substr(1)
        }
      }
    }
    Et.prototype.getType = function (e) {
      e = String(e)
      let t = e.replace(/^.*[/\\]/, "").toLowerCase(),
        n = t.replace(/^.*\./, "").toLowerCase(),
        r = t.length < e.length
      return ((n.length < t.length - 1 || !r) && this._types[n]) || null
    }
    Et.prototype.getExtension = function (e) {
      return (
        (e = /^\s*([^;\s]*)/.test(e) && RegExp.$1),
        (e && this._extensions[e.toLowerCase()]) || null
      )
    }
    ;(Wo = Et),
      (qo = {
        "application/andrew-inset": ["ez"],
        "application/applixware": ["aw"],
        "application/atom+xml": ["atom"],
        "application/atomcat+xml": ["atomcat"],
        "application/atomdeleted+xml": ["atomdeleted"],
        "application/atomsvc+xml": ["atomsvc"],
        "application/atsc-dwd+xml": ["dwd"],
        "application/atsc-held+xml": ["held"],
        "application/atsc-rsat+xml": ["rsat"],
        "application/bdoc": ["bdoc"],
        "application/calendar+xml": ["xcs"],
        "application/ccxml+xml": ["ccxml"],
        "application/cdfx+xml": ["cdfx"],
        "application/cdmi-capability": ["cdmia"],
        "application/cdmi-container": ["cdmic"],
        "application/cdmi-domain": ["cdmid"],
        "application/cdmi-object": ["cdmio"],
        "application/cdmi-queue": ["cdmiq"],
        "application/cu-seeme": ["cu"],
        "application/dash+xml": ["mpd"],
        "application/davmount+xml": ["davmount"],
        "application/docbook+xml": ["dbk"],
        "application/dssc+der": ["dssc"],
        "application/dssc+xml": ["xdssc"],
        "application/ecmascript": ["es", "ecma"],
        "application/emma+xml": ["emma"],
        "application/emotionml+xml": ["emotionml"],
        "application/epub+zip": ["epub"],
        "application/exi": ["exi"],
        "application/express": ["exp"],
        "application/fdt+xml": ["fdt"],
        "application/font-tdpfr": ["pfr"],
        "application/geo+json": ["geojson"],
        "application/gml+xml": ["gml"],
        "application/gpx+xml": ["gpx"],
        "application/gxf": ["gxf"],
        "application/gzip": ["gz"],
        "application/hjson": ["hjson"],
        "application/hyperstudio": ["stk"],
        "application/inkml+xml": ["ink", "inkml"],
        "application/ipfix": ["ipfix"],
        "application/its+xml": ["its"],
        "application/java-archive": ["jar", "war", "ear"],
        "application/java-serialized-object": ["ser"],
        "application/java-vm": ["class"],
        "application/javascript": ["js", "mjs"],
        "application/json": ["json", "map"],
        "application/json5": ["json5"],
        "application/jsonml+json": ["jsonml"],
        "application/ld+json": ["jsonld"],
        "application/lgr+xml": ["lgr"],
        "application/lost+xml": ["lostxml"],
        "application/mac-binhex40": ["hqx"],
        "application/mac-compactpro": ["cpt"],
        "application/mads+xml": ["mads"],
        "application/manifest+json": ["webmanifest"],
        "application/marc": ["mrc"],
        "application/marcxml+xml": ["mrcx"],
        "application/mathematica": ["ma", "nb", "mb"],
        "application/mathml+xml": ["mathml"],
        "application/mbox": ["mbox"],
        "application/mediaservercontrol+xml": ["mscml"],
        "application/metalink+xml": ["metalink"],
        "application/metalink4+xml": ["meta4"],
        "application/mets+xml": ["mets"],
        "application/mmt-aei+xml": ["maei"],
        "application/mmt-usd+xml": ["musd"],
        "application/mods+xml": ["mods"],
        "application/mp21": ["m21", "mp21"],
        "application/mp4": ["mp4s", "m4p"],
        "application/msword": ["doc", "dot"],
        "application/mxf": ["mxf"],
        "application/n-quads": ["nq"],
        "application/n-triples": ["nt"],
        "application/node": ["cjs"],
        "application/octet-stream": [
          "bin",
          "dms",
          "lrf",
          "mar",
          "so",
          "dist",
          "distz",
          "pkg",
          "bpk",
          "dump",
          "elc",
          "deploy",
          "exe",
          "dll",
          "deb",
          "dmg",
          "iso",
          "img",
          "msi",
          "msp",
          "msm",
          "buffer"
        ],
        "application/oda": ["oda"],
        "application/oebps-package+xml": ["opf"],
        "application/ogg": ["ogx"],
        "application/omdoc+xml": ["omdoc"],
        "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
        "application/oxps": ["oxps"],
        "application/p2p-overlay+xml": ["relo"],
        "application/patch-ops-error+xml": ["xer"],
        "application/pdf": ["pdf"],
        "application/pgp-encrypted": ["pgp"],
        "application/pgp-signature": ["asc", "sig"],
        "application/pics-rules": ["prf"],
        "application/pkcs10": ["p10"],
        "application/pkcs7-mime": ["p7m", "p7c"],
        "application/pkcs7-signature": ["p7s"],
        "application/pkcs8": ["p8"],
        "application/pkix-attr-cert": ["ac"],
        "application/pkix-cert": ["cer"],
        "application/pkix-crl": ["crl"],
        "application/pkix-pkipath": ["pkipath"],
        "application/pkixcmp": ["pki"],
        "application/pls+xml": ["pls"],
        "application/postscript": ["ai", "eps", "ps"],
        "application/provenance+xml": ["provx"],
        "application/pskc+xml": ["pskcxml"],
        "application/raml+yaml": ["raml"],
        "application/rdf+xml": ["rdf", "owl"],
        "application/reginfo+xml": ["rif"],
        "application/relax-ng-compact-syntax": ["rnc"],
        "application/resource-lists+xml": ["rl"],
        "application/resource-lists-diff+xml": ["rld"],
        "application/rls-services+xml": ["rs"],
        "application/route-apd+xml": ["rapd"],
        "application/route-s-tsid+xml": ["sls"],
        "application/route-usd+xml": ["rusd"],
        "application/rpki-ghostbusters": ["gbr"],
        "application/rpki-manifest": ["mft"],
        "application/rpki-roa": ["roa"],
        "application/rsd+xml": ["rsd"],
        "application/rss+xml": ["rss"],
        "application/rtf": ["rtf"],
        "application/sbml+xml": ["sbml"],
        "application/scvp-cv-request": ["scq"],
        "application/scvp-cv-response": ["scs"],
        "application/scvp-vp-request": ["spq"],
        "application/scvp-vp-response": ["spp"],
        "application/sdp": ["sdp"],
        "application/senml+xml": ["senmlx"],
        "application/sensml+xml": ["sensmlx"],
        "application/set-payment-initiation": ["setpay"],
        "application/set-registration-initiation": ["setreg"],
        "application/shf+xml": ["shf"],
        "application/sieve": ["siv", "sieve"],
        "application/smil+xml": ["smi", "smil"],
        "application/sparql-query": ["rq"],
        "application/sparql-results+xml": ["srx"],
        "application/srgs": ["gram"],
        "application/srgs+xml": ["grxml"],
        "application/sru+xml": ["sru"],
        "application/ssdl+xml": ["ssdl"],
        "application/ssml+xml": ["ssml"],
        "application/swid+xml": ["swidtag"],
        "application/tei+xml": ["tei", "teicorpus"],
        "application/thraud+xml": ["tfi"],
        "application/timestamped-data": ["tsd"],
        "application/toml": ["toml"],
        "application/trig": ["trig"],
        "application/ttml+xml": ["ttml"],
        "application/ubjson": ["ubj"],
        "application/urc-ressheet+xml": ["rsheet"],
        "application/urc-targetdesc+xml": ["td"],
        "application/voicexml+xml": ["vxml"],
        "application/wasm": ["wasm"],
        "application/widget": ["wgt"],
        "application/winhlp": ["hlp"],
        "application/wsdl+xml": ["wsdl"],
        "application/wspolicy+xml": ["wspolicy"],
        "application/xaml+xml": ["xaml"],
        "application/xcap-att+xml": ["xav"],
        "application/xcap-caps+xml": ["xca"],
        "application/xcap-diff+xml": ["xdf"],
        "application/xcap-el+xml": ["xel"],
        "application/xcap-ns+xml": ["xns"],
        "application/xenc+xml": ["xenc"],
        "application/xhtml+xml": ["xhtml", "xht"],
        "application/xliff+xml": ["xlf"],
        "application/xml": ["xml", "xsl", "xsd", "rng"],
        "application/xml-dtd": ["dtd"],
        "application/xop+xml": ["xop"],
        "application/xproc+xml": ["xpl"],
        "application/xslt+xml": ["*xsl", "xslt"],
        "application/xspf+xml": ["xspf"],
        "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
        "application/yang": ["yang"],
        "application/yin+xml": ["yin"],
        "application/zip": ["zip"],
        "audio/3gpp": ["*3gpp"],
        "audio/adpcm": ["adp"],
        "audio/amr": ["amr"],
        "audio/basic": ["au", "snd"],
        "audio/midi": ["mid", "midi", "kar", "rmi"],
        "audio/mobile-xmf": ["mxmf"],
        "audio/mp3": ["*mp3"],
        "audio/mp4": ["m4a", "mp4a"],
        "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
        "audio/ogg": ["oga", "ogg", "spx", "opus"],
        "audio/s3m": ["s3m"],
        "audio/silk": ["sil"],
        "audio/wav": ["wav"],
        "audio/wave": ["*wav"],
        "audio/webm": ["weba"],
        "audio/xm": ["xm"],
        "font/collection": ["ttc"],
        "font/otf": ["otf"],
        "font/ttf": ["ttf"],
        "font/woff": ["woff"],
        "font/woff2": ["woff2"],
        "image/aces": ["exr"],
        "image/apng": ["apng"],
        "image/avif": ["avif"],
        "image/bmp": ["bmp"],
        "image/cgm": ["cgm"],
        "image/dicom-rle": ["drle"],
        "image/emf": ["emf"],
        "image/fits": ["fits"],
        "image/g3fax": ["g3"],
        "image/gif": ["gif"],
        "image/heic": ["heic"],
        "image/heic-sequence": ["heics"],
        "image/heif": ["heif"],
        "image/heif-sequence": ["heifs"],
        "image/hej2k": ["hej2"],
        "image/hsj2": ["hsj2"],
        "image/ief": ["ief"],
        "image/jls": ["jls"],
        "image/jp2": ["jp2", "jpg2"],
        "image/jpeg": ["jpeg", "jpg", "jpe"],
        "image/jph": ["jph"],
        "image/jphc": ["jhc"],
        "image/jpm": ["jpm"],
        "image/jpx": ["jpx", "jpf"],
        "image/jxr": ["jxr"],
        "image/jxra": ["jxra"],
        "image/jxrs": ["jxrs"],
        "image/jxs": ["jxs"],
        "image/jxsc": ["jxsc"],
        "image/jxsi": ["jxsi"],
        "image/jxss": ["jxss"],
        "image/ktx": ["ktx"],
        "image/ktx2": ["ktx2"],
        "image/png": ["png"],
        "image/sgi": ["sgi"],
        "image/svg+xml": ["svg", "svgz"],
        "image/t38": ["t38"],
        "image/tiff": ["tif", "tiff"],
        "image/tiff-fx": ["tfx"],
        "image/webp": ["webp"],
        "image/wmf": ["wmf"],
        "message/disposition-notification": ["disposition-notification"],
        "message/global": ["u8msg"],
        "message/global-delivery-status": ["u8dsn"],
        "message/global-disposition-notification": ["u8mdn"],
        "message/global-headers": ["u8hdr"],
        "message/rfc822": ["eml", "mime"],
        "model/3mf": ["3mf"],
        "model/gltf+json": ["gltf"],
        "model/gltf-binary": ["glb"],
        "model/iges": ["igs", "iges"],
        "model/mesh": ["msh", "mesh", "silo"],
        "model/mtl": ["mtl"],
        "model/obj": ["obj"],
        "model/step+xml": ["stpx"],
        "model/step+zip": ["stpz"],
        "model/step-xml+zip": ["stpxz"],
        "model/stl": ["stl"],
        "model/vrml": ["wrl", "vrml"],
        "model/x3d+binary": ["*x3db", "x3dbz"],
        "model/x3d+fastinfoset": ["x3db"],
        "model/x3d+vrml": ["*x3dv", "x3dvz"],
        "model/x3d+xml": ["x3d", "x3dz"],
        "model/x3d-vrml": ["x3dv"],
        "text/cache-manifest": ["appcache", "manifest"],
        "text/calendar": ["ics", "ifb"],
        "text/coffeescript": ["coffee", "litcoffee"],
        "text/css": ["css"],
        "text/csv": ["csv"],
        "text/html": ["html", "htm", "shtml"],
        "text/jade": ["jade"],
        "text/jsx": ["jsx"],
        "text/less": ["less"],
        "text/markdown": ["markdown", "md"],
        "text/mathml": ["mml"],
        "text/mdx": ["mdx"],
        "text/n3": ["n3"],
        "text/plain": [
          "txt",
          "text",
          "conf",
          "def",
          "list",
          "log",
          "in",
          "ini"
        ],
        "text/richtext": ["rtx"],
        "text/rtf": ["*rtf"],
        "text/sgml": ["sgml", "sgm"],
        "text/shex": ["shex"],
        "text/slim": ["slim", "slm"],
        "text/spdx": ["spdx"],
        "text/stylus": ["stylus", "styl"],
        "text/tab-separated-values": ["tsv"],
        "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
        "text/turtle": ["ttl"],
        "text/uri-list": ["uri", "uris", "urls"],
        "text/vcard": ["vcard"],
        "text/vtt": ["vtt"],
        "text/xml": ["*xml"],
        "text/yaml": ["yaml", "yml"],
        "video/3gpp": ["3gp", "3gpp"],
        "video/3gpp2": ["3g2"],
        "video/h261": ["h261"],
        "video/h263": ["h263"],
        "video/h264": ["h264"],
        "video/iso.segment": ["m4s"],
        "video/jpeg": ["jpgv"],
        "video/jpm": ["*jpm", "jpgm"],
        "video/mj2": ["mj2", "mjp2"],
        "video/mp2t": ["ts"],
        "video/mp4": ["mp4", "mp4v", "mpg4"],
        "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
        "video/ogg": ["ogv"],
        "video/quicktime": ["qt", "mov"],
        "video/webm": ["webm"]
      }),
      (Vo = {
        "application/prs.cww": ["cww"],
        "application/vnd.1000minds.decision-model+xml": ["1km"],
        "application/vnd.3gpp.pic-bw-large": ["plb"],
        "application/vnd.3gpp.pic-bw-small": ["psb"],
        "application/vnd.3gpp.pic-bw-var": ["pvb"],
        "application/vnd.3gpp2.tcap": ["tcap"],
        "application/vnd.3m.post-it-notes": ["pwn"],
        "application/vnd.accpac.simply.aso": ["aso"],
        "application/vnd.accpac.simply.imp": ["imp"],
        "application/vnd.acucobol": ["acu"],
        "application/vnd.acucorp": ["atc", "acutc"],
        "application/vnd.adobe.air-application-installer-package+zip": ["air"],
        "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
        "application/vnd.adobe.fxp": ["fxp", "fxpl"],
        "application/vnd.adobe.xdp+xml": ["xdp"],
        "application/vnd.adobe.xfdf": ["xfdf"],
        "application/vnd.ahead.space": ["ahead"],
        "application/vnd.airzip.filesecure.azf": ["azf"],
        "application/vnd.airzip.filesecure.azs": ["azs"],
        "application/vnd.amazon.ebook": ["azw"],
        "application/vnd.americandynamics.acc": ["acc"],
        "application/vnd.amiga.ami": ["ami"],
        "application/vnd.android.package-archive": ["apk"],
        "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
        "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
        "application/vnd.antix.game-component": ["atx"],
        "application/vnd.apple.installer+xml": ["mpkg"],
        "application/vnd.apple.keynote": ["key"],
        "application/vnd.apple.mpegurl": ["m3u8"],
        "application/vnd.apple.numbers": ["numbers"],
        "application/vnd.apple.pages": ["pages"],
        "application/vnd.apple.pkpass": ["pkpass"],
        "application/vnd.aristanetworks.swi": ["swi"],
        "application/vnd.astraea-software.iota": ["iota"],
        "application/vnd.audiograph": ["aep"],
        "application/vnd.balsamiq.bmml+xml": ["bmml"],
        "application/vnd.blueice.multipass": ["mpm"],
        "application/vnd.bmi": ["bmi"],
        "application/vnd.businessobjects": ["rep"],
        "application/vnd.chemdraw+xml": ["cdxml"],
        "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
        "application/vnd.cinderella": ["cdy"],
        "application/vnd.citationstyles.style+xml": ["csl"],
        "application/vnd.claymore": ["cla"],
        "application/vnd.cloanto.rp9": ["rp9"],
        "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
        "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
        "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
        "application/vnd.commonspace": ["csp"],
        "application/vnd.contact.cmsg": ["cdbcmsg"],
        "application/vnd.cosmocaller": ["cmc"],
        "application/vnd.crick.clicker": ["clkx"],
        "application/vnd.crick.clicker.keyboard": ["clkk"],
        "application/vnd.crick.clicker.palette": ["clkp"],
        "application/vnd.crick.clicker.template": ["clkt"],
        "application/vnd.crick.clicker.wordbank": ["clkw"],
        "application/vnd.criticaltools.wbs+xml": ["wbs"],
        "application/vnd.ctc-posml": ["pml"],
        "application/vnd.cups-ppd": ["ppd"],
        "application/vnd.curl.car": ["car"],
        "application/vnd.curl.pcurl": ["pcurl"],
        "application/vnd.dart": ["dart"],
        "application/vnd.data-vision.rdz": ["rdz"],
        "application/vnd.dbf": ["dbf"],
        "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
        "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
        "application/vnd.dece.unspecified": ["uvx", "uvvx"],
        "application/vnd.dece.zip": ["uvz", "uvvz"],
        "application/vnd.denovo.fcselayout-link": ["fe_launch"],
        "application/vnd.dna": ["dna"],
        "application/vnd.dolby.mlp": ["mlp"],
        "application/vnd.dpgraph": ["dpg"],
        "application/vnd.dreamfactory": ["dfac"],
        "application/vnd.ds-keypoint": ["kpxx"],
        "application/vnd.dvb.ait": ["ait"],
        "application/vnd.dvb.service": ["svc"],
        "application/vnd.dynageo": ["geo"],
        "application/vnd.ecowin.chart": ["mag"],
        "application/vnd.enliven": ["nml"],
        "application/vnd.epson.esf": ["esf"],
        "application/vnd.epson.msf": ["msf"],
        "application/vnd.epson.quickanime": ["qam"],
        "application/vnd.epson.salt": ["slt"],
        "application/vnd.epson.ssf": ["ssf"],
        "application/vnd.eszigno3+xml": ["es3", "et3"],
        "application/vnd.ezpix-album": ["ez2"],
        "application/vnd.ezpix-package": ["ez3"],
        "application/vnd.fdf": ["fdf"],
        "application/vnd.fdsn.mseed": ["mseed"],
        "application/vnd.fdsn.seed": ["seed", "dataless"],
        "application/vnd.flographit": ["gph"],
        "application/vnd.fluxtime.clip": ["ftc"],
        "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
        "application/vnd.frogans.fnc": ["fnc"],
        "application/vnd.frogans.ltf": ["ltf"],
        "application/vnd.fsc.weblaunch": ["fsc"],
        "application/vnd.fujitsu.oasys": ["oas"],
        "application/vnd.fujitsu.oasys2": ["oa2"],
        "application/vnd.fujitsu.oasys3": ["oa3"],
        "application/vnd.fujitsu.oasysgp": ["fg5"],
        "application/vnd.fujitsu.oasysprs": ["bh2"],
        "application/vnd.fujixerox.ddd": ["ddd"],
        "application/vnd.fujixerox.docuworks": ["xdw"],
        "application/vnd.fujixerox.docuworks.binder": ["xbd"],
        "application/vnd.fuzzysheet": ["fzs"],
        "application/vnd.genomatix.tuxedo": ["txd"],
        "application/vnd.geogebra.file": ["ggb"],
        "application/vnd.geogebra.tool": ["ggt"],
        "application/vnd.geometry-explorer": ["gex", "gre"],
        "application/vnd.geonext": ["gxt"],
        "application/vnd.geoplan": ["g2w"],
        "application/vnd.geospace": ["g3w"],
        "application/vnd.gmx": ["gmx"],
        "application/vnd.google-apps.document": ["gdoc"],
        "application/vnd.google-apps.presentation": ["gslides"],
        "application/vnd.google-apps.spreadsheet": ["gsheet"],
        "application/vnd.google-earth.kml+xml": ["kml"],
        "application/vnd.google-earth.kmz": ["kmz"],
        "application/vnd.grafeq": ["gqf", "gqs"],
        "application/vnd.groove-account": ["gac"],
        "application/vnd.groove-help": ["ghf"],
        "application/vnd.groove-identity-message": ["gim"],
        "application/vnd.groove-injector": ["grv"],
        "application/vnd.groove-tool-message": ["gtm"],
        "application/vnd.groove-tool-template": ["tpl"],
        "application/vnd.groove-vcard": ["vcg"],
        "application/vnd.hal+xml": ["hal"],
        "application/vnd.handheld-entertainment+xml": ["zmm"],
        "application/vnd.hbci": ["hbci"],
        "application/vnd.hhe.lesson-player": ["les"],
        "application/vnd.hp-hpgl": ["hpgl"],
        "application/vnd.hp-hpid": ["hpid"],
        "application/vnd.hp-hps": ["hps"],
        "application/vnd.hp-jlyt": ["jlt"],
        "application/vnd.hp-pcl": ["pcl"],
        "application/vnd.hp-pclxl": ["pclxl"],
        "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
        "application/vnd.ibm.minipay": ["mpy"],
        "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
        "application/vnd.ibm.rights-management": ["irm"],
        "application/vnd.ibm.secure-container": ["sc"],
        "application/vnd.iccprofile": ["icc", "icm"],
        "application/vnd.igloader": ["igl"],
        "application/vnd.immervision-ivp": ["ivp"],
        "application/vnd.immervision-ivu": ["ivu"],
        "application/vnd.insors.igm": ["igm"],
        "application/vnd.intercon.formnet": ["xpw", "xpx"],
        "application/vnd.intergeo": ["i2g"],
        "application/vnd.intu.qbo": ["qbo"],
        "application/vnd.intu.qfx": ["qfx"],
        "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
        "application/vnd.irepository.package+xml": ["irp"],
        "application/vnd.is-xpr": ["xpr"],
        "application/vnd.isac.fcs": ["fcs"],
        "application/vnd.jam": ["jam"],
        "application/vnd.jcp.javame.midlet-rms": ["rms"],
        "application/vnd.jisp": ["jisp"],
        "application/vnd.joost.joda-archive": ["joda"],
        "application/vnd.kahootz": ["ktz", "ktr"],
        "application/vnd.kde.karbon": ["karbon"],
        "application/vnd.kde.kchart": ["chrt"],
        "application/vnd.kde.kformula": ["kfo"],
        "application/vnd.kde.kivio": ["flw"],
        "application/vnd.kde.kontour": ["kon"],
        "application/vnd.kde.kpresenter": ["kpr", "kpt"],
        "application/vnd.kde.kspread": ["ksp"],
        "application/vnd.kde.kword": ["kwd", "kwt"],
        "application/vnd.kenameaapp": ["htke"],
        "application/vnd.kidspiration": ["kia"],
        "application/vnd.kinar": ["kne", "knp"],
        "application/vnd.koan": ["skp", "skd", "skt", "skm"],
        "application/vnd.kodak-descriptor": ["sse"],
        "application/vnd.las.las+xml": ["lasxml"],
        "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
        "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
        "application/vnd.lotus-1-2-3": ["123"],
        "application/vnd.lotus-approach": ["apr"],
        "application/vnd.lotus-freelance": ["pre"],
        "application/vnd.lotus-notes": ["nsf"],
        "application/vnd.lotus-organizer": ["org"],
        "application/vnd.lotus-screencam": ["scm"],
        "application/vnd.lotus-wordpro": ["lwp"],
        "application/vnd.macports.portpkg": ["portpkg"],
        "application/vnd.mapbox-vector-tile": ["mvt"],
        "application/vnd.mcd": ["mcd"],
        "application/vnd.medcalcdata": ["mc1"],
        "application/vnd.mediastation.cdkey": ["cdkey"],
        "application/vnd.mfer": ["mwf"],
        "application/vnd.mfmp": ["mfm"],
        "application/vnd.micrografx.flo": ["flo"],
        "application/vnd.micrografx.igx": ["igx"],
        "application/vnd.mif": ["mif"],
        "application/vnd.mobius.daf": ["daf"],
        "application/vnd.mobius.dis": ["dis"],
        "application/vnd.mobius.mbk": ["mbk"],
        "application/vnd.mobius.mqy": ["mqy"],
        "application/vnd.mobius.msl": ["msl"],
        "application/vnd.mobius.plc": ["plc"],
        "application/vnd.mobius.txf": ["txf"],
        "application/vnd.mophun.application": ["mpn"],
        "application/vnd.mophun.certificate": ["mpc"],
        "application/vnd.mozilla.xul+xml": ["xul"],
        "application/vnd.ms-artgalry": ["cil"],
        "application/vnd.ms-cab-compressed": ["cab"],
        "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
        "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
        "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
        "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
        "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
        "application/vnd.ms-fontobject": ["eot"],
        "application/vnd.ms-htmlhelp": ["chm"],
        "application/vnd.ms-ims": ["ims"],
        "application/vnd.ms-lrm": ["lrm"],
        "application/vnd.ms-officetheme": ["thmx"],
        "application/vnd.ms-outlook": ["msg"],
        "application/vnd.ms-pki.seccat": ["cat"],
        "application/vnd.ms-pki.stl": ["*stl"],
        "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
        "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
        "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
        "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
        "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
        "application/vnd.ms-project": ["mpp", "mpt"],
        "application/vnd.ms-word.document.macroenabled.12": ["docm"],
        "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
        "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
        "application/vnd.ms-wpl": ["wpl"],
        "application/vnd.ms-xpsdocument": ["xps"],
        "application/vnd.mseq": ["mseq"],
        "application/vnd.musician": ["mus"],
        "application/vnd.muvee.style": ["msty"],
        "application/vnd.mynfc": ["taglet"],
        "application/vnd.neurolanguage.nlu": ["nlu"],
        "application/vnd.nitf": ["ntf", "nitf"],
        "application/vnd.noblenet-directory": ["nnd"],
        "application/vnd.noblenet-sealer": ["nns"],
        "application/vnd.noblenet-web": ["nnw"],
        "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
        "application/vnd.nokia.n-gage.data": ["ngdat"],
        "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
        "application/vnd.nokia.radio-preset": ["rpst"],
        "application/vnd.nokia.radio-presets": ["rpss"],
        "application/vnd.novadigm.edm": ["edm"],
        "application/vnd.novadigm.edx": ["edx"],
        "application/vnd.novadigm.ext": ["ext"],
        "application/vnd.oasis.opendocument.chart": ["odc"],
        "application/vnd.oasis.opendocument.chart-template": ["otc"],
        "application/vnd.oasis.opendocument.database": ["odb"],
        "application/vnd.oasis.opendocument.formula": ["odf"],
        "application/vnd.oasis.opendocument.formula-template": ["odft"],
        "application/vnd.oasis.opendocument.graphics": ["odg"],
        "application/vnd.oasis.opendocument.graphics-template": ["otg"],
        "application/vnd.oasis.opendocument.image": ["odi"],
        "application/vnd.oasis.opendocument.image-template": ["oti"],
        "application/vnd.oasis.opendocument.presentation": ["odp"],
        "application/vnd.oasis.opendocument.presentation-template": ["otp"],
        "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
        "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
        "application/vnd.oasis.opendocument.text": ["odt"],
        "application/vnd.oasis.opendocument.text-master": ["odm"],
        "application/vnd.oasis.opendocument.text-template": ["ott"],
        "application/vnd.oasis.opendocument.text-web": ["oth"],
        "application/vnd.olpc-sugar": ["xo"],
        "application/vnd.oma.dd2+xml": ["dd2"],
        "application/vnd.openblox.game+xml": ["obgx"],
        "application/vnd.openofficeorg.extension": ["oxt"],
        "application/vnd.openstreetmap.data+xml": ["osm"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          ["pptx"],
        "application/vnd.openxmlformats-officedocument.presentationml.slide": [
          "sldx"
        ],
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
          ["ppsx"],
        "application/vnd.openxmlformats-officedocument.presentationml.template":
          ["potx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          "xlsx"
        ],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
          ["xltx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          ["docx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
          ["dotx"],
        "application/vnd.osgeo.mapguide.package": ["mgp"],
        "application/vnd.osgi.dp": ["dp"],
        "application/vnd.osgi.subsystem": ["esa"],
        "application/vnd.palm": ["pdb", "pqa", "oprc"],
        "application/vnd.pawaafile": ["paw"],
        "application/vnd.pg.format": ["str"],
        "application/vnd.pg.osasli": ["ei6"],
        "application/vnd.picsel": ["efif"],
        "application/vnd.pmi.widget": ["wg"],
        "application/vnd.pocketlearn": ["plf"],
        "application/vnd.powerbuilder6": ["pbd"],
        "application/vnd.previewsystems.box": ["box"],
        "application/vnd.proteus.magazine": ["mgz"],
        "application/vnd.publishare-delta-tree": ["qps"],
        "application/vnd.pvi.ptid1": ["ptid"],
        "application/vnd.quark.quarkxpress": [
          "qxd",
          "qxt",
          "qwd",
          "qwt",
          "qxl",
          "qxb"
        ],
        "application/vnd.rar": ["rar"],
        "application/vnd.realvnc.bed": ["bed"],
        "application/vnd.recordare.musicxml": ["mxl"],
        "application/vnd.recordare.musicxml+xml": ["musicxml"],
        "application/vnd.rig.cryptonote": ["cryptonote"],
        "application/vnd.rim.cod": ["cod"],
        "application/vnd.rn-realmedia": ["rm"],
        "application/vnd.rn-realmedia-vbr": ["rmvb"],
        "application/vnd.route66.link66+xml": ["link66"],
        "application/vnd.sailingtracker.track": ["st"],
        "application/vnd.seemail": ["see"],
        "application/vnd.sema": ["sema"],
        "application/vnd.semd": ["semd"],
        "application/vnd.semf": ["semf"],
        "application/vnd.shana.informed.formdata": ["ifm"],
        "application/vnd.shana.informed.formtemplate": ["itp"],
        "application/vnd.shana.informed.interchange": ["iif"],
        "application/vnd.shana.informed.package": ["ipk"],
        "application/vnd.simtech-mindmapper": ["twd", "twds"],
        "application/vnd.smaf": ["mmf"],
        "application/vnd.smart.teacher": ["teacher"],
        "application/vnd.software602.filler.form+xml": ["fo"],
        "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
        "application/vnd.spotfire.dxp": ["dxp"],
        "application/vnd.spotfire.sfs": ["sfs"],
        "application/vnd.stardivision.calc": ["sdc"],
        "application/vnd.stardivision.draw": ["sda"],
        "application/vnd.stardivision.impress": ["sdd"],
        "application/vnd.stardivision.math": ["smf"],
        "application/vnd.stardivision.writer": ["sdw", "vor"],
        "application/vnd.stardivision.writer-global": ["sgl"],
        "application/vnd.stepmania.package": ["smzip"],
        "application/vnd.stepmania.stepchart": ["sm"],
        "application/vnd.sun.wadl+xml": ["wadl"],
        "application/vnd.sun.xml.calc": ["sxc"],
        "application/vnd.sun.xml.calc.template": ["stc"],
        "application/vnd.sun.xml.draw": ["sxd"],
        "application/vnd.sun.xml.draw.template": ["std"],
        "application/vnd.sun.xml.impress": ["sxi"],
        "application/vnd.sun.xml.impress.template": ["sti"],
        "application/vnd.sun.xml.math": ["sxm"],
        "application/vnd.sun.xml.writer": ["sxw"],
        "application/vnd.sun.xml.writer.global": ["sxg"],
        "application/vnd.sun.xml.writer.template": ["stw"],
        "application/vnd.sus-calendar": ["sus", "susp"],
        "application/vnd.svd": ["svd"],
        "application/vnd.symbian.install": ["sis", "sisx"],
        "application/vnd.syncml+xml": ["xsm"],
        "application/vnd.syncml.dm+wbxml": ["bdm"],
        "application/vnd.syncml.dm+xml": ["xdm"],
        "application/vnd.syncml.dmddf+xml": ["ddf"],
        "application/vnd.tao.intent-module-archive": ["tao"],
        "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
        "application/vnd.tmobile-livetv": ["tmo"],
        "application/vnd.trid.tpt": ["tpt"],
        "application/vnd.triscape.mxs": ["mxs"],
        "application/vnd.trueapp": ["tra"],
        "application/vnd.ufdl": ["ufd", "ufdl"],
        "application/vnd.uiq.theme": ["utz"],
        "application/vnd.umajin": ["umj"],
        "application/vnd.unity": ["unityweb"],
        "application/vnd.uoml+xml": ["uoml"],
        "application/vnd.vcx": ["vcx"],
        "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
        "application/vnd.visionary": ["vis"],
        "application/vnd.vsf": ["vsf"],
        "application/vnd.wap.wbxml": ["wbxml"],
        "application/vnd.wap.wmlc": ["wmlc"],
        "application/vnd.wap.wmlscriptc": ["wmlsc"],
        "application/vnd.webturbo": ["wtb"],
        "application/vnd.wolfram.player": ["nbp"],
        "application/vnd.wordperfect": ["wpd"],
        "application/vnd.wqd": ["wqd"],
        "application/vnd.wt.stf": ["stf"],
        "application/vnd.xara": ["xar"],
        "application/vnd.xfdl": ["xfdl"],
        "application/vnd.yamaha.hv-dic": ["hvd"],
        "application/vnd.yamaha.hv-script": ["hvs"],
        "application/vnd.yamaha.hv-voice": ["hvp"],
        "application/vnd.yamaha.openscoreformat": ["osf"],
        "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
        "application/vnd.yamaha.smaf-audio": ["saf"],
        "application/vnd.yamaha.smaf-phrase": ["spf"],
        "application/vnd.yellowriver-custom-menu": ["cmp"],
        "application/vnd.zul": ["zir", "zirz"],
        "application/vnd.zzazz.deck+xml": ["zaz"],
        "application/x-7z-compressed": ["7z"],
        "application/x-abiword": ["abw"],
        "application/x-ace-compressed": ["ace"],
        "application/x-apple-diskimage": ["*dmg"],
        "application/x-arj": ["arj"],
        "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
        "application/x-authorware-map": ["aam"],
        "application/x-authorware-seg": ["aas"],
        "application/x-bcpio": ["bcpio"],
        "application/x-bdoc": ["*bdoc"],
        "application/x-bittorrent": ["torrent"],
        "application/x-blorb": ["blb", "blorb"],
        "application/x-bzip": ["bz"],
        "application/x-bzip2": ["bz2", "boz"],
        "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
        "application/x-cdlink": ["vcd"],
        "application/x-cfs-compressed": ["cfs"],
        "application/x-chat": ["chat"],
        "application/x-chess-pgn": ["pgn"],
        "application/x-chrome-extension": ["crx"],
        "application/x-cocoa": ["cco"],
        "application/x-conference": ["nsc"],
        "application/x-cpio": ["cpio"],
        "application/x-csh": ["csh"],
        "application/x-debian-package": ["*deb", "udeb"],
        "application/x-dgc-compressed": ["dgc"],
        "application/x-director": [
          "dir",
          "dcr",
          "dxr",
          "cst",
          "cct",
          "cxt",
          "w3d",
          "fgd",
          "swa"
        ],
        "application/x-doom": ["wad"],
        "application/x-dtbncx+xml": ["ncx"],
        "application/x-dtbook+xml": ["dtb"],
        "application/x-dtbresource+xml": ["res"],
        "application/x-dvi": ["dvi"],
        "application/x-envoy": ["evy"],
        "application/x-eva": ["eva"],
        "application/x-font-bdf": ["bdf"],
        "application/x-font-ghostscript": ["gsf"],
        "application/x-font-linux-psf": ["psf"],
        "application/x-font-pcf": ["pcf"],
        "application/x-font-snf": ["snf"],
        "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
        "application/x-freearc": ["arc"],
        "application/x-futuresplash": ["spl"],
        "application/x-gca-compressed": ["gca"],
        "application/x-glulx": ["ulx"],
        "application/x-gnumeric": ["gnumeric"],
        "application/x-gramps-xml": ["gramps"],
        "application/x-gtar": ["gtar"],
        "application/x-hdf": ["hdf"],
        "application/x-httpd-php": ["php"],
        "application/x-install-instructions": ["install"],
        "application/x-iso9660-image": ["*iso"],
        "application/x-iwork-keynote-sffkey": ["*key"],
        "application/x-iwork-numbers-sffnumbers": ["*numbers"],
        "application/x-iwork-pages-sffpages": ["*pages"],
        "application/x-java-archive-diff": ["jardiff"],
        "application/x-java-jnlp-file": ["jnlp"],
        "application/x-keepass2": ["kdbx"],
        "application/x-latex": ["latex"],
        "application/x-lua-bytecode": ["luac"],
        "application/x-lzh-compressed": ["lzh", "lha"],
        "application/x-makeself": ["run"],
        "application/x-mie": ["mie"],
        "application/x-mobipocket-ebook": ["prc", "mobi"],
        "application/x-ms-application": ["application"],
        "application/x-ms-shortcut": ["lnk"],
        "application/x-ms-wmd": ["wmd"],
        "application/x-ms-wmz": ["wmz"],
        "application/x-ms-xbap": ["xbap"],
        "application/x-msaccess": ["mdb"],
        "application/x-msbinder": ["obd"],
        "application/x-mscardfile": ["crd"],
        "application/x-msclip": ["clp"],
        "application/x-msdos-program": ["*exe"],
        "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
        "application/x-msmediaview": ["mvb", "m13", "m14"],
        "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
        "application/x-msmoney": ["mny"],
        "application/x-mspublisher": ["pub"],
        "application/x-msschedule": ["scd"],
        "application/x-msterminal": ["trm"],
        "application/x-mswrite": ["wri"],
        "application/x-netcdf": ["nc", "cdf"],
        "application/x-ns-proxy-autoconfig": ["pac"],
        "application/x-nzb": ["nzb"],
        "application/x-perl": ["pl", "pm"],
        "application/x-pilot": ["*prc", "*pdb"],
        "application/x-pkcs12": ["p12", "pfx"],
        "application/x-pkcs7-certificates": ["p7b", "spc"],
        "application/x-pkcs7-certreqresp": ["p7r"],
        "application/x-rar-compressed": ["*rar"],
        "application/x-redhat-package-manager": ["rpm"],
        "application/x-research-info-systems": ["ris"],
        "application/x-sea": ["sea"],
        "application/x-sh": ["sh"],
        "application/x-shar": ["shar"],
        "application/x-shockwave-flash": ["swf"],
        "application/x-silverlight-app": ["xap"],
        "application/x-sql": ["sql"],
        "application/x-stuffit": ["sit"],
        "application/x-stuffitx": ["sitx"],
        "application/x-subrip": ["srt"],
        "application/x-sv4cpio": ["sv4cpio"],
        "application/x-sv4crc": ["sv4crc"],
        "application/x-t3vm-image": ["t3"],
        "application/x-tads": ["gam"],
        "application/x-tar": ["tar"],
        "application/x-tcl": ["tcl", "tk"],
        "application/x-tex": ["tex"],
        "application/x-tex-tfm": ["tfm"],
        "application/x-texinfo": ["texinfo", "texi"],
        "application/x-tgif": ["*obj"],
        "application/x-ustar": ["ustar"],
        "application/x-virtualbox-hdd": ["hdd"],
        "application/x-virtualbox-ova": ["ova"],
        "application/x-virtualbox-ovf": ["ovf"],
        "application/x-virtualbox-vbox": ["vbox"],
        "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
        "application/x-virtualbox-vdi": ["vdi"],
        "application/x-virtualbox-vhd": ["vhd"],
        "application/x-virtualbox-vmdk": ["vmdk"],
        "application/x-wais-source": ["src"],
        "application/x-web-app-manifest+json": ["webapp"],
        "application/x-x509-ca-cert": ["der", "crt", "pem"],
        "application/x-xfig": ["fig"],
        "application/x-xliff+xml": ["*xlf"],
        "application/x-xpinstall": ["xpi"],
        "application/x-xz": ["xz"],
        "application/x-zmachine": [
          "z1",
          "z2",
          "z3",
          "z4",
          "z5",
          "z6",
          "z7",
          "z8"
        ],
        "audio/vnd.dece.audio": ["uva", "uvva"],
        "audio/vnd.digital-winds": ["eol"],
        "audio/vnd.dra": ["dra"],
        "audio/vnd.dts": ["dts"],
        "audio/vnd.dts.hd": ["dtshd"],
        "audio/vnd.lucent.voice": ["lvp"],
        "audio/vnd.ms-playready.media.pya": ["pya"],
        "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
        "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
        "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
        "audio/vnd.rip": ["rip"],
        "audio/x-aac": ["aac"],
        "audio/x-aiff": ["aif", "aiff", "aifc"],
        "audio/x-caf": ["caf"],
        "audio/x-flac": ["flac"],
        "audio/x-m4a": ["*m4a"],
        "audio/x-matroska": ["mka"],
        "audio/x-mpegurl": ["m3u"],
        "audio/x-ms-wax": ["wax"],
        "audio/x-ms-wma": ["wma"],
        "audio/x-pn-realaudio": ["ram", "ra"],
        "audio/x-pn-realaudio-plugin": ["rmp"],
        "audio/x-realaudio": ["*ra"],
        "audio/x-wav": ["*wav"],
        "chemical/x-cdx": ["cdx"],
        "chemical/x-cif": ["cif"],
        "chemical/x-cmdf": ["cmdf"],
        "chemical/x-cml": ["cml"],
        "chemical/x-csml": ["csml"],
        "chemical/x-xyz": ["xyz"],
        "image/prs.btif": ["btif"],
        "image/prs.pti": ["pti"],
        "image/vnd.adobe.photoshop": ["psd"],
        "image/vnd.airzip.accelerator.azv": ["azv"],
        "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
        "image/vnd.djvu": ["djvu", "djv"],
        "image/vnd.dvb.subtitle": ["*sub"],
        "image/vnd.dwg": ["dwg"],
        "image/vnd.dxf": ["dxf"],
        "image/vnd.fastbidsheet": ["fbs"],
        "image/vnd.fpx": ["fpx"],
        "image/vnd.fst": ["fst"],
        "image/vnd.fujixerox.edmics-mmr": ["mmr"],
        "image/vnd.fujixerox.edmics-rlc": ["rlc"],
        "image/vnd.microsoft.icon": ["ico"],
        "image/vnd.ms-dds": ["dds"],
        "image/vnd.ms-modi": ["mdi"],
        "image/vnd.ms-photo": ["wdp"],
        "image/vnd.net-fpx": ["npx"],
        "image/vnd.pco.b16": ["b16"],
        "image/vnd.tencent.tap": ["tap"],
        "image/vnd.valve.source.texture": ["vtf"],
        "image/vnd.wap.wbmp": ["wbmp"],
        "image/vnd.xiff": ["xif"],
        "image/vnd.zbrush.pcx": ["pcx"],
        "image/x-3ds": ["3ds"],
        "image/x-cmu-raster": ["ras"],
        "image/x-cmx": ["cmx"],
        "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
        "image/x-icon": ["*ico"],
        "image/x-jng": ["jng"],
        "image/x-mrsid-image": ["sid"],
        "image/x-ms-bmp": ["*bmp"],
        "image/x-pcx": ["*pcx"],
        "image/x-pict": ["pic", "pct"],
        "image/x-portable-anymap": ["pnm"],
        "image/x-portable-bitmap": ["pbm"],
        "image/x-portable-graymap": ["pgm"],
        "image/x-portable-pixmap": ["ppm"],
        "image/x-rgb": ["rgb"],
        "image/x-tga": ["tga"],
        "image/x-xbitmap": ["xbm"],
        "image/x-xpixmap": ["xpm"],
        "image/x-xwindowdump": ["xwd"],
        "message/vnd.wfa.wsc": ["wsc"],
        "model/vnd.collada+xml": ["dae"],
        "model/vnd.dwf": ["dwf"],
        "model/vnd.gdl": ["gdl"],
        "model/vnd.gtw": ["gtw"],
        "model/vnd.mts": ["mts"],
        "model/vnd.opengex": ["ogex"],
        "model/vnd.parasolid.transmit.binary": ["x_b"],
        "model/vnd.parasolid.transmit.text": ["x_t"],
        "model/vnd.sap.vds": ["vds"],
        "model/vnd.usdz+zip": ["usdz"],
        "model/vnd.valve.source.compiled-map": ["bsp"],
        "model/vnd.vtu": ["vtu"],
        "text/prs.lines.tag": ["dsc"],
        "text/vnd.curl": ["curl"],
        "text/vnd.curl.dcurl": ["dcurl"],
        "text/vnd.curl.mcurl": ["mcurl"],
        "text/vnd.curl.scurl": ["scurl"],
        "text/vnd.dvb.subtitle": ["sub"],
        "text/vnd.fly": ["fly"],
        "text/vnd.fmi.flexstor": ["flx"],
        "text/vnd.graphviz": ["gv"],
        "text/vnd.in3d.3dml": ["3dml"],
        "text/vnd.in3d.spot": ["spot"],
        "text/vnd.sun.j2me.app-descriptor": ["jad"],
        "text/vnd.wap.wml": ["wml"],
        "text/vnd.wap.wmlscript": ["wmls"],
        "text/x-asm": ["s", "asm"],
        "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
        "text/x-component": ["htc"],
        "text/x-fortran": ["f", "for", "f77", "f90"],
        "text/x-handlebars-template": ["hbs"],
        "text/x-java-source": ["java"],
        "text/x-lua": ["lua"],
        "text/x-markdown": ["mkd"],
        "text/x-nfo": ["nfo"],
        "text/x-opml": ["opml"],
        "text/x-org": ["*org"],
        "text/x-pascal": ["p", "pas"],
        "text/x-processing": ["pde"],
        "text/x-sass": ["sass"],
        "text/x-scss": ["scss"],
        "text/x-setext": ["etx"],
        "text/x-sfv": ["sfv"],
        "text/x-suse-ymp": ["ymp"],
        "text/x-uuencode": ["uu"],
        "text/x-vcalendar": ["vcs"],
        "text/x-vcard": ["vcf"],
        "video/vnd.dece.hd": ["uvh", "uvvh"],
        "video/vnd.dece.mobile": ["uvm", "uvvm"],
        "video/vnd.dece.pd": ["uvp", "uvvp"],
        "video/vnd.dece.sd": ["uvs", "uvvs"],
        "video/vnd.dece.video": ["uvv", "uvvv"],
        "video/vnd.dvb.file": ["dvb"],
        "video/vnd.fvt": ["fvt"],
        "video/vnd.mpegurl": ["mxu", "m4u"],
        "video/vnd.ms-playready.media.pyv": ["pyv"],
        "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
        "video/vnd.vivo": ["viv"],
        "video/x-f4v": ["f4v"],
        "video/x-fli": ["fli"],
        "video/x-flv": ["flv"],
        "video/x-m4v": ["m4v"],
        "video/x-matroska": ["mkv", "mk3d", "mks"],
        "video/x-mng": ["mng"],
        "video/x-ms-asf": ["asf", "asx"],
        "video/x-ms-vob": ["vob"],
        "video/x-ms-wm": ["wm"],
        "video/x-ms-wmv": ["wmv"],
        "video/x-ms-wmx": ["wmx"],
        "video/x-ms-wvx": ["wvx"],
        "video/x-msvideo": ["avi"],
        "video/x-sgi-movie": ["movie"],
        "video/x-smv": ["smv"],
        "x-conference/x-cooltalk": ["ice"]
      }),
      (Jo = Wo),
      (Ko = new Jo(qo, Vo))
    ;(Go = Yo),
      (dr = Zo),
      (Xo = Object.prototype.toString),
      (ut = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/)
    ;(bn = (e, t, n) => {
      if (!t.has(e)) throw TypeError("Cannot " + n)
    }),
      (Z = (e, t, n) => (
        bn(e, t, "read from private field"), n ? n.call(e) : t.get(e)
      )),
      ($e = (e, t, n) => {
        if (t.has(e))
          throw TypeError("Cannot add the same private member more than once")
        t instanceof WeakSet ? t.add(e) : t.set(e, n)
      }),
      (Ee = (e, t, n, r) => (
        bn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
      )),
      (Ue = (e, t, n) => (bn(e, t, "access private method"), n)),
      (rs = new Date(0)),
      (ur = "deleted"),
      (Ve = class {
        constructor(t) {
          this.value = t
        }
        json() {
          if (this.value === void 0)
            throw new Error("Cannot convert undefined to an object.")
          return JSON.parse(this.value)
        }
        number() {
          return Number(this.value)
        }
        boolean() {
          return this.value === "false" || this.value === "0"
            ? !1
            : Boolean(this.value)
        }
      }),
      (yt = class {
        constructor(t) {
          $e(this, ft),
            $e(this, mt),
            $e(this, yn),
            $e(this, bt, void 0),
            $e(this, me, void 0),
            $e(this, Y, void 0),
            Ee(this, bt, t),
            Ee(this, me, null),
            Ee(this, Y, null)
        }
        delete(t, n) {
          let r = { expires: rs }
          n?.domain && (r.domain = n.domain),
            n?.path && (r.path = n.path),
            Ue(this, mt, sn)
              .call(this)
              .set(t, [ur, dr(t, ur, r), !1])
        }
        get(t) {
          if (Z(this, Y) !== null && Z(this, Y).has(t)) {
            let [a, , o] = Z(this, Y).get(t)
            return o ? new Ve(a) : new Ve(void 0)
          }
          let r = Ue(this, ft, on).call(this)[t]
          return new Ve(r)
        }
        has(t) {
          if (Z(this, Y) !== null && Z(this, Y).has(t)) {
            let [, , r] = Z(this, Y).get(t)
            return r
          }
          return !!Ue(this, ft, on).call(this)[t]
        }
        set(t, n, r) {
          let a
          if (typeof n == "string") a = n
          else {
            let i = n.toString()
            i === Object.prototype.toString.call(n)
              ? (a = JSON.stringify(n))
              : (a = i)
          }
          let o = {}
          r && Object.assign(o, r),
            Ue(this, mt, sn)
              .call(this)
              .set(t, [a, dr(t, a, o), !0])
        }
        *headers() {
          if (Z(this, Y) != null) for (let [, t] of Z(this, Y)) yield t[1]
        }
      })
    bt = new WeakMap()
    me = new WeakMap()
    Y = new WeakMap()
    ft = new WeakSet()
    on = function () {
      return (
        Z(this, me) || Ue(this, yn, Nr).call(this),
        Z(this, me) || Ee(this, me, {}),
        Z(this, me)
      )
    }
    mt = new WeakSet()
    sn = function () {
      return Z(this, Y) || Ee(this, Y, new Map()), Z(this, Y)
    }
    yn = new WeakSet()
    Nr = function () {
      let e = Z(this, bt).headers.get("cookie")
      !e || Ee(this, me, Go(e))
    }
    Rr = Symbol.for("astro.cookies")
    ;(os = (e) => e),
      (A = os({
        UnknownCompilerError: {
          title: "Unknown compiler error.",
          code: 1e3,
          hint: "This is almost always a problem with the Astro compiler, not your code. Please open an issue at https://astro.build/issues/compiler."
        },
        StaticRedirectNotAvailable: {
          title: "`Astro.redirect` is not available in static mode.",
          code: 3001,
          message:
            "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
          hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
        },
        ClientAddressNotAvailable: {
          title: "`Astro.clientAddress` is not available in current adapter.",
          code: 3002,
          message: (e) =>
            `\`Astro.clientAddress\` is not available in the \`${e}\` adapter. File an issue with the adapter to add support.`
        },
        StaticClientAddressNotAvailable: {
          title: "`Astro.clientAddress` is not available in static mode.",
          code: 3003,
          message:
            "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
          hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
        },
        NoMatchingStaticPathFound: {
          title: "No static path found for requested path.",
          code: 3004,
          message: (e) =>
            `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e}\`.`,
          hint: (e) => `Possible dynamic routes being matched: ${e.join(", ")}.`
        },
        OnlyResponseCanBeReturned: {
          title: "Invalid type returned by Astro page.",
          code: 3005,
          message: (e, t) =>
            `Route \`${
              e || ""
            }\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
          hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
        },
        MissingMediaQueryDirective: {
          title: "Missing value for `client:media` directive.",
          code: 3006,
          message:
            'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
        },
        NoMatchingRenderer: {
          title: "No matching renderer found.",
          code: 3007,
          message: (e, t, n, r) => `Unable to render \`${e}\`.

${
  r > 0
    ? `There ${n ? "are." : "is."} ${r} renderer${
        n ? "s." : ""
      } configured in your \`astro.config.mjs\` file,
but ${n ? "none were." : "it was not."} able to server-side render \`${e}\`.`
    : `No valid renderer was found ${
        t ? `for the \`.${t}\` file extension.` : "for this file extension."
      }`
}`,
          hint: (e) => `Did you mean to enable the ${e} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
        },
        NoClientEntrypoint: {
          title: "No client entrypoint specified in renderer.",
          code: 3008,
          message: (e, t, n) =>
            `\`${e}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${n}\`.`,
          hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
        },
        NoClientOnlyHint: {
          title: "Missing hint on client:only directive.",
          code: 3009,
          message: (e) =>
            `Unable to render \`${e}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
          hint: (e) =>
            `Did you mean to pass \`client:only="${e}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
        },
        InvalidGetStaticPathParam: {
          title: "Invalid value returned by a `getStaticPaths` path.",
          code: 3010,
          message: (e) =>
            `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${e}\``,
          hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
        },
        InvalidGetStaticPathsReturn: {
          title: "Invalid value returned by getStaticPaths.",
          code: 3011,
          message: (e) =>
            `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e}\``,
          hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
        },
        GetStaticPathsRemovedRSSHelper: {
          title: "getStaticPaths RSS helper is not available anymore.",
          code: 3012,
          message:
            "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
          hint: "See https://docs.astro.build/en/guides/rss/ for more information."
        },
        GetStaticPathsExpectedParams: {
          title: "Missing params property on `getStaticPaths` route.",
          code: 3013,
          message:
            "Missing or empty required `params` property on `getStaticPaths` route.",
          hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
        },
        GetStaticPathsInvalidRouteParam: {
          title: "Invalid value for `getStaticPaths` route parameter.",
          code: 3014,
          message: (e, t, n) =>
            `Invalid getStaticPaths route parameter for \`${e}\`. Expected undefined, a string or a number, received \`${n}\` (\`${t}\`)`,
          hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
        },
        GetStaticPathsRequired: {
          title: "`getStaticPaths()` function required for dynamic routes.",
          code: 3015,
          message:
            "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
          hint: 'See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.'
        },
        ReservedSlotName: {
          title: "Invalid slot name.",
          code: 3016,
          message: (e) =>
            `Unable to create a slot named \`${e}\`. \`${e}\` is a reserved slot name. Please update the name of this slot.`
        },
        NoAdapterInstalled: {
          title: "Cannot use Server-side Rendering without an adapter.",
          code: 3017,
          message:
            "Cannot use `output: 'server'` without an adapter. Please install and configure the appropriate server adapter for your final deployment.",
          hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
        },
        NoMatchingImport: {
          title: "No import found for component.",
          code: 3018,
          message: (e) =>
            `Could not render \`${e}\`. No matching import has been found for \`${e}\`.`,
          hint: "Please make sure the component is properly imported."
        },
        InvalidPrerenderExport: {
          title: "Invalid prerender export.",
          code: 3019,
          message: (e, t) => {
            let n =
              "A `prerender` export has been detected, but its value cannot be statically analyzed."
            return (
              e !== "const" &&
                (n += `
Expected \`const\` declaration but got \`${e}\`.`),
              t !== "true" &&
                (n += `
Expected \`true\` value but got \`${t}\`.`),
              n
            )
          },
          hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
        },
        InvalidComponentArgs: {
          title: "Invalid component arguments.",
          code: 3020,
          message: (e) =>
            `Invalid arguments passed to${e ? ` <${e}>` : ""} component.`,
          hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
        },
        PageNumberParamNotFound: {
          title: "Page number param not found.",
          code: 3021,
          message: (e) =>
            `[paginate()] page number param \`${e}\` not found in your filepath.`,
          hint: "Rename your file to `[page].astro` or `[...page].astro`."
        },
        UnknownViteError: { title: "Unknown Vite Error.", code: 4e3 },
        FailedToLoadModuleSSR: {
          title: "Could not import file.",
          code: 4001,
          message: (e) => `Could not import \`${e}\`.`,
          hint: "This is often caused by a typo in the import path. Please make sure the file exists."
        },
        InvalidGlob: {
          title: "Invalid glob pattern.",
          code: 4002,
          message: (e) =>
            `Invalid glob pattern: \`${e}\`. Glob patterns must start with './', '../' or '/'.`,
          hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
        },
        UnknownCSSError: { title: "Unknown CSS Error.", code: 5e3 },
        CSSSyntaxError: { title: "CSS Syntax Error.", code: 5001 },
        UnknownMarkdownError: { title: "Unknown Markdown Error.", code: 6e3 },
        MarkdownFrontmatterParseError: {
          title: "Failed to parse Markdown frontmatter.",
          code: 6001
        },
        InvalidFrontmatterInjectionError: {
          title: "Invalid frontmatter injection.",
          code: 6003,
          message:
            'A remark or rehype plugin attempted to inject invalid frontmatter. Ensure "astro.frontmatter" is set to a valid JSON object that is not `null` or `undefined`.',
          hint: "See the frontmatter injection docs https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically for more information."
        },
        MdxIntegrationMissingError: {
          title: "MDX integration missing.",
          code: 6004,
          message: (e) =>
            `Unable to render ${e}. Ensure that the \`@astrojs/mdx\` integration is installed.`,
          hint: "See the MDX integration docs for installation and usage instructions: https://docs.astro.build/en/guides/integrations-guide/mdx/"
        },
        UnknownConfigError: {
          title: "Unknown configuration error.",
          code: 7e3
        },
        ConfigNotFound: {
          title: "Specified configuration file not found.",
          code: 7001,
          message: (e) =>
            `Unable to resolve \`--config "${e}"\`. Does the file exist?`
        },
        ConfigLegacyKey: {
          title: "Legacy configuration detected.",
          code: 7002,
          message: (e) => `Legacy configuration detected: \`${e}\`.`,
          hint: `Please update your configuration to the new format.
See https://astro.build/config for more information.`
        },
        UnknownCLIError: { title: "Unknown CLI Error.", code: 8e3 },
        GenerateContentTypesError: {
          title: "Failed to generate content types.",
          code: 8001,
          message:
            "`astro sync` command failed to generate content collection types.",
          hint: "Check your `src/content/config.*` file for typos."
        },
        UnknownContentCollectionError: {
          title: "Unknown Content Collection Error.",
          code: 9e3
        },
        InvalidContentEntryFrontmatterError: {
          title: "Content entry frontmatter does not match schema.",
          code: 9001,
          message: (e, t, n) =>
            [
              `${String(e)} \u2192 ${String(
                t
              )} frontmatter does not match collection schema.`,
              ...n.errors.map((r) => r.message)
            ].join(`
`),
          hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
        },
        InvalidContentEntrySlugError: {
          title: "Invalid content entry slug.",
          code: 9002,
          message: (e, t) =>
            `${String(e)} \u2192 ${String(
              t
            )} has an invalid slug. \`slug\` must be a string.`,
          hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field."
        },
        ContentSchemaContainsSlugError: {
          title: "Content Schema should not contain `slug`.",
          code: 9003,
          message: (e) =>
            `A content collection schema should not contain \`slug\` since it is reserved for slug generation. Remove this from your ${e} collection schema.`,
          hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field."
        },
        UnknownError: { title: "Unknown Error.", code: 99999 }
      }))
    L = class extends Error {
      constructor(t, ...n) {
        var r
        super(...n), (this.type = "AstroError")
        let {
          code: a,
          name: o,
          title: i,
          message: s,
          stack: l,
          location: p,
          hint: c,
          frame: u
        } = t
        ;(this.errorCode = a),
          o && o !== "Error"
            ? (this.name = o)
            : (this.name =
                ((r = ls(this.errorCode)) == null ? void 0 : r.name) ??
                "UnknownError"),
          (this.title = i),
          s && (this.message = s),
          (this.stack = l || this.stack),
          (this.loc = p),
          (this.hint = c),
          (this.frame = u)
      }
      setErrorCode(t) {
        this.errorCode = t
      }
      setLocation(t) {
        this.loc = t
      }
      setName(t) {
        this.name = t
      }
      setMessage(t) {
        this.message = t
      }
      setHint(t) {
        this.hint = t
      }
      setFrame(t, n) {
        this.frame = cs(t, n)
      }
      static is(t) {
        return t.type === "AstroError"
      }
    }
    Mr = "2.0.9"
    ;({ replace: hs } = ""),
      (gs = /[&<>'"]/g),
      (xs = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }),
      (vs = (e) => xs[e]),
      (ws = (e) => hs.call(e, gs, vs))
    ;(Je = ws),
      (be = class extends String {
        get [Symbol.toStringTag]() {
          return "HTMLString"
        }
      }),
      (E = (e) => (e instanceof be ? e : typeof e == "string" ? new be(e) : e))
    ;(Pt = "astro:jsx"), (mr = Symbol("empty")), (hr = (e) => e)
    ;(Ss =
      '(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));'),
      (As =
        '(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));'),
      ($s =
        '(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));'),
      (js =
        '(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));'),
      (Cs =
        '(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));'),
      (Es =
        'var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(`astro:${e}`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}')
    gr = { idle: Ss, load: As, only: js, media: $s, visible: Cs }
    ;($n =
      /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i),
      (Fs =
        /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i),
      (Ts = /^(contenteditable|draggable|spellcheck|value)$/i),
      (Ns =
        /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i),
      (Rs = new Set(["set:html", "set:text"])),
      (Ls = (e) =>
        e
          .trim()
          .replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (t, n) =>
            /[^\w]|\s/.test(t) ? "" : n === 0 ? t : t.toUpperCase()
          )),
      (We = (e, t = !0) =>
        t ? String(e).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e),
      (Ms = (e) =>
        e.toLowerCase() === e
          ? e
          : e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`)),
      (Is = (e) =>
        Object.entries(e)
          .map(([t, n]) => `${Ms(t)}:${n}`)
          .join(";"))
    Gt = (e, t, n) => {
      let r = JSON.stringify(e.props),
        a = e.children
      return (
        t ===
        n.findIndex((o) => JSON.stringify(o.props) === r && o.children == a)
      )
    }
    R = {
      Astro: 1 << 0,
      JSX: 1 << 1,
      Slot: 1 << 2,
      HeadBuffer: 1 << 3,
      RenderSlot: 1 << 4
    }
    Hs = Symbol.for("astro.headAndContent")
    ;(Hr = Symbol.for("astro.renderTemplateResult")),
      (cn = class {
        constructor(t, n) {
          ;(this[br] = !0),
            (this.htmlParts = t),
            (this.error = void 0),
            (this.expressions = n.map((r) =>
              Sn(r)
                ? Promise.resolve(r).catch((a) => {
                    if (!this.error) throw ((this.error = a), a)
                  })
                : r
            ))
        }
        async *[((br = Hr), Symbol.asyncIterator)]() {
          let { htmlParts: t, expressions: n } = this
          for (let r = 0; r < t.length; r++) {
            let a = t[r],
              o = n[r]
            yield E(a), yield* Pe(o)
          }
        }
      })
    re = {
      Value: 0,
      JSON: 1,
      RegExp: 2,
      Date: 3,
      Map: 4,
      Set: 5,
      BigInt: 6,
      URL: 7,
      Uint8Array: 8,
      Uint16Array: 9,
      Uint32Array: 10
    }
    ;(Jr = ["load", "idle", "media", "visible", "only"]),
      (Ws = new Set(Jr)),
      (Kr = new Set(Jr.map((e) => `client:${e}`)))
    ;(Xr = Symbol.for("astro.componentInstance")),
      (pn = class {
        constructor(t, n, r, a) {
          ;(this[Gr] = !0),
            (this.result = t),
            (this.props = n),
            (this.factory = a),
            (this.slotValues = {})
          let o = Te(t, R.Slot)
          for (let i in r) {
            let s = r[i](o)
            this.slotValues[i] = () => s
          }
        }
        async init(t) {
          return (
            (this.returnValue = this.factory(t, this.props, this.slotValues)),
            this.returnValue
          )
        }
        async *render() {
          this.returnValue === void 0 && (await this.init(this.result))
          let t = this.returnValue
          Sn(t) && (t = await t), _t(t) ? yield* t.content : yield* Pe(t)
        }
      })
    Gr = Xr
    ;(Yr = Symbol.for("astro:slot-string")),
      (kt = class extends be {
        constructor(t, n) {
          super(t), (this.instructions = n), (this[Yr] = !0)
        }
      })
    ;(Xs = Symbol.for("astro:fragment")),
      (St = Symbol.for("astro:renderer")),
      (Cn = new TextEncoder()),
      (Ys = new TextDecoder())
    Xe = class {
      constructor() {
        this.parts = ""
      }
      append(t, n) {
        ArrayBuffer.isView(t)
          ? (this.parts += Ys.decode(t))
          : (this.parts += Qe(n, t))
      }
      toString() {
        return this.parts
      }
      toArrayBuffer() {
        return Cn.encode(this.parts)
      }
    }
    ;(yr = "astro-client-only"),
      (he = class {
        constructor(t) {
          ;(this.vnode = t), (this.count = 0)
        }
        increment() {
          this.count++
        }
        haveNoTried() {
          return this.count === 0
        }
        isCompleted() {
          return this.count > 2
        }
      })
    he.symbol = Symbol("astro:jsx:skip")
    En = 0
    ;(fn = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY"),
      (Yt = fn.length)
    kr = new Map([["solid", "solid-js"]])
    ;(Qr = (e, t, n) => {
      if (!t.has(e)) throw TypeError("Cannot " + n)
    }),
      (ze = (e, t, n) => (
        Qr(e, t, "read from private field"), n ? n.call(e) : t.get(e)
      )),
      (Ar = (e, t, n) => {
        if (t.has(e))
          throw TypeError("Cannot add the same private member more than once")
        t instanceof WeakSet ? t.add(e) : t.set(e, n)
      }),
      ($r = (e, t, n, r) => (
        Qr(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
      )),
      (mn =
        typeof process == "object" &&
        Object.prototype.toString.call(process) === "[object process]")
    ;(gl = mn
      ? (e, t) =>
          typeof e == "string" || ArrayBuffer.isView(e)
            ? new Response(e, t)
            : typeof At > "u"
            ? new (hl())(e, t)
            : new At(e, t)
      : (e, t) => new Response(e, t)),
      (jr = Symbol.for("astro.needsHeadRendering"))
    ri = !0
    typeof process < "u" &&
      (({
        FORCE_COLOR: hn,
        NODE_DISABLE_COLORS: ei,
        NO_COLOR: ti,
        TERM: ni
      } = process.env || {}),
      (ri = process.stdout && process.stdout.isTTY))
    yl = {
      enabled:
        !ei && ti == null && ni !== "dumb" && ((hn != null && hn !== "0") || ri)
    }
    ;(kl = Ne(0, 0)),
      (Zt = Ne(1, 22)),
      (Sl = Ne(2, 22)),
      (Al = Ne(31, 39)),
      (Er = Ne(33, 39)),
      ($l = Ne(36, 39)),
      (Pr = {}),
      (jl = {
        get exports() {
          return Pr
        },
        set exports(e) {
          Pr = e
        }
      })
    ;(function (e) {
      var t = {}
      ;(e.exports = t),
        (t.eastAsianWidth = function (r) {
          var a = r.charCodeAt(0),
            o = r.length == 2 ? r.charCodeAt(1) : 0,
            i = a
          return (
            55296 <= a &&
              a <= 56319 &&
              56320 <= o &&
              o <= 57343 &&
              ((a &= 1023), (o &= 1023), (i = (a << 10) | o), (i += 65536)),
            i == 12288 ||
            (65281 <= i && i <= 65376) ||
            (65504 <= i && i <= 65510)
              ? "F"
              : i == 8361 ||
                (65377 <= i && i <= 65470) ||
                (65474 <= i && i <= 65479) ||
                (65482 <= i && i <= 65487) ||
                (65490 <= i && i <= 65495) ||
                (65498 <= i && i <= 65500) ||
                (65512 <= i && i <= 65518)
              ? "H"
              : (4352 <= i && i <= 4447) ||
                (4515 <= i && i <= 4519) ||
                (4602 <= i && i <= 4607) ||
                (9001 <= i && i <= 9002) ||
                (11904 <= i && i <= 11929) ||
                (11931 <= i && i <= 12019) ||
                (12032 <= i && i <= 12245) ||
                (12272 <= i && i <= 12283) ||
                (12289 <= i && i <= 12350) ||
                (12353 <= i && i <= 12438) ||
                (12441 <= i && i <= 12543) ||
                (12549 <= i && i <= 12589) ||
                (12593 <= i && i <= 12686) ||
                (12688 <= i && i <= 12730) ||
                (12736 <= i && i <= 12771) ||
                (12784 <= i && i <= 12830) ||
                (12832 <= i && i <= 12871) ||
                (12880 <= i && i <= 13054) ||
                (13056 <= i && i <= 19903) ||
                (19968 <= i && i <= 42124) ||
                (42128 <= i && i <= 42182) ||
                (43360 <= i && i <= 43388) ||
                (44032 <= i && i <= 55203) ||
                (55216 <= i && i <= 55238) ||
                (55243 <= i && i <= 55291) ||
                (63744 <= i && i <= 64255) ||
                (65040 <= i && i <= 65049) ||
                (65072 <= i && i <= 65106) ||
                (65108 <= i && i <= 65126) ||
                (65128 <= i && i <= 65131) ||
                (110592 <= i && i <= 110593) ||
                (127488 <= i && i <= 127490) ||
                (127504 <= i && i <= 127546) ||
                (127552 <= i && i <= 127560) ||
                (127568 <= i && i <= 127569) ||
                (131072 <= i && i <= 194367) ||
                (177984 <= i && i <= 196605) ||
                (196608 <= i && i <= 262141)
              ? "W"
              : (32 <= i && i <= 126) ||
                (162 <= i && i <= 163) ||
                (165 <= i && i <= 166) ||
                i == 172 ||
                i == 175 ||
                (10214 <= i && i <= 10221) ||
                (10629 <= i && i <= 10630)
              ? "Na"
              : i == 161 ||
                i == 164 ||
                (167 <= i && i <= 168) ||
                i == 170 ||
                (173 <= i && i <= 174) ||
                (176 <= i && i <= 180) ||
                (182 <= i && i <= 186) ||
                (188 <= i && i <= 191) ||
                i == 198 ||
                i == 208 ||
                (215 <= i && i <= 216) ||
                (222 <= i && i <= 225) ||
                i == 230 ||
                (232 <= i && i <= 234) ||
                (236 <= i && i <= 237) ||
                i == 240 ||
                (242 <= i && i <= 243) ||
                (247 <= i && i <= 250) ||
                i == 252 ||
                i == 254 ||
                i == 257 ||
                i == 273 ||
                i == 275 ||
                i == 283 ||
                (294 <= i && i <= 295) ||
                i == 299 ||
                (305 <= i && i <= 307) ||
                i == 312 ||
                (319 <= i && i <= 322) ||
                i == 324 ||
                (328 <= i && i <= 331) ||
                i == 333 ||
                (338 <= i && i <= 339) ||
                (358 <= i && i <= 359) ||
                i == 363 ||
                i == 462 ||
                i == 464 ||
                i == 466 ||
                i == 468 ||
                i == 470 ||
                i == 472 ||
                i == 474 ||
                i == 476 ||
                i == 593 ||
                i == 609 ||
                i == 708 ||
                i == 711 ||
                (713 <= i && i <= 715) ||
                i == 717 ||
                i == 720 ||
                (728 <= i && i <= 731) ||
                i == 733 ||
                i == 735 ||
                (768 <= i && i <= 879) ||
                (913 <= i && i <= 929) ||
                (931 <= i && i <= 937) ||
                (945 <= i && i <= 961) ||
                (963 <= i && i <= 969) ||
                i == 1025 ||
                (1040 <= i && i <= 1103) ||
                i == 1105 ||
                i == 8208 ||
                (8211 <= i && i <= 8214) ||
                (8216 <= i && i <= 8217) ||
                (8220 <= i && i <= 8221) ||
                (8224 <= i && i <= 8226) ||
                (8228 <= i && i <= 8231) ||
                i == 8240 ||
                (8242 <= i && i <= 8243) ||
                i == 8245 ||
                i == 8251 ||
                i == 8254 ||
                i == 8308 ||
                i == 8319 ||
                (8321 <= i && i <= 8324) ||
                i == 8364 ||
                i == 8451 ||
                i == 8453 ||
                i == 8457 ||
                i == 8467 ||
                i == 8470 ||
                (8481 <= i && i <= 8482) ||
                i == 8486 ||
                i == 8491 ||
                (8531 <= i && i <= 8532) ||
                (8539 <= i && i <= 8542) ||
                (8544 <= i && i <= 8555) ||
                (8560 <= i && i <= 8569) ||
                i == 8585 ||
                (8592 <= i && i <= 8601) ||
                (8632 <= i && i <= 8633) ||
                i == 8658 ||
                i == 8660 ||
                i == 8679 ||
                i == 8704 ||
                (8706 <= i && i <= 8707) ||
                (8711 <= i && i <= 8712) ||
                i == 8715 ||
                i == 8719 ||
                i == 8721 ||
                i == 8725 ||
                i == 8730 ||
                (8733 <= i && i <= 8736) ||
                i == 8739 ||
                i == 8741 ||
                (8743 <= i && i <= 8748) ||
                i == 8750 ||
                (8756 <= i && i <= 8759) ||
                (8764 <= i && i <= 8765) ||
                i == 8776 ||
                i == 8780 ||
                i == 8786 ||
                (8800 <= i && i <= 8801) ||
                (8804 <= i && i <= 8807) ||
                (8810 <= i && i <= 8811) ||
                (8814 <= i && i <= 8815) ||
                (8834 <= i && i <= 8835) ||
                (8838 <= i && i <= 8839) ||
                i == 8853 ||
                i == 8857 ||
                i == 8869 ||
                i == 8895 ||
                i == 8978 ||
                (9312 <= i && i <= 9449) ||
                (9451 <= i && i <= 9547) ||
                (9552 <= i && i <= 9587) ||
                (9600 <= i && i <= 9615) ||
                (9618 <= i && i <= 9621) ||
                (9632 <= i && i <= 9633) ||
                (9635 <= i && i <= 9641) ||
                (9650 <= i && i <= 9651) ||
                (9654 <= i && i <= 9655) ||
                (9660 <= i && i <= 9661) ||
                (9664 <= i && i <= 9665) ||
                (9670 <= i && i <= 9672) ||
                i == 9675 ||
                (9678 <= i && i <= 9681) ||
                (9698 <= i && i <= 9701) ||
                i == 9711 ||
                (9733 <= i && i <= 9734) ||
                i == 9737 ||
                (9742 <= i && i <= 9743) ||
                (9748 <= i && i <= 9749) ||
                i == 9756 ||
                i == 9758 ||
                i == 9792 ||
                i == 9794 ||
                (9824 <= i && i <= 9825) ||
                (9827 <= i && i <= 9829) ||
                (9831 <= i && i <= 9834) ||
                (9836 <= i && i <= 9837) ||
                i == 9839 ||
                (9886 <= i && i <= 9887) ||
                (9918 <= i && i <= 9919) ||
                (9924 <= i && i <= 9933) ||
                (9935 <= i && i <= 9953) ||
                i == 9955 ||
                (9960 <= i && i <= 9983) ||
                i == 10045 ||
                i == 10071 ||
                (10102 <= i && i <= 10111) ||
                (11093 <= i && i <= 11097) ||
                (12872 <= i && i <= 12879) ||
                (57344 <= i && i <= 63743) ||
                (65024 <= i && i <= 65039) ||
                i == 65533 ||
                (127232 <= i && i <= 127242) ||
                (127248 <= i && i <= 127277) ||
                (127280 <= i && i <= 127337) ||
                (127344 <= i && i <= 127386) ||
                (917760 <= i && i <= 917999) ||
                (983040 <= i && i <= 1048573) ||
                (1048576 <= i && i <= 1114109)
              ? "A"
              : "N"
          )
        }),
        (t.characterLength = function (r) {
          var a = this.eastAsianWidth(r)
          return a == "F" || a == "W" || a == "A" ? 2 : 1
        })
      function n(r) {
        return r.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []
      }
      ;(t.length = function (r) {
        for (var a = n(r), o = 0, i = 0; i < a.length; i++)
          o = o + this.characterLength(a[i])
        return o
      }),
        (t.slice = function (r, a, o) {
          ;(textLen = t.length(r)),
            (a = a || 0),
            (o = o || 1),
            a < 0 && (a = textLen + a),
            o < 0 && (o = textLen + o)
          for (var i = "", s = 0, l = n(r), p = 0; p < l.length; p++) {
            var c = l[p],
              u = t.length(c)
            if (s >= a - (u == 2 ? 1 : 0))
              if (s + u <= o) i += c
              else break
            s += u
          }
          return i
        })
    })(jl)
    ;(Cl = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })),
      ($t = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 })
    if (typeof process < "u") {
      let e = process
      "argv" in e &&
        Array.isArray(e.argv) &&
        (e.argv.includes("--verbose") || e.argv.includes("--silent"))
    }
    _l = ["string", "number", "undefined"]
    ;(oi = (e, t, n) => {
      if (!t.has(e)) throw TypeError("Cannot " + n)
    }),
      (we = (e, t, n) => (
        oi(e, t, "read from private field"), n ? n.call(e) : t.get(e)
      )),
      (Qt = (e, t, n) => {
        if (t.has(e))
          throw TypeError("Cannot add the same private member more than once")
        t instanceof WeakSet ? t.add(e) : t.set(e, n)
      }),
      (en = (e, t, n, r) => (
        oi(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
      )),
      (_r = Symbol.for("astro.clientAddress"))
    gn = class {
      constructor(t, n, r) {
        if (
          (Qt(this, gt, void 0),
          Qt(this, fe, void 0),
          Qt(this, xt, void 0),
          en(this, gt, t),
          en(this, fe, n),
          en(this, xt, r),
          n)
        )
          for (let a of Object.keys(n)) {
            if (this[a] !== void 0)
              throw new L({
                ...A.ReservedSlotName,
                message: A.ReservedSlotName.message(a)
              })
            Object.defineProperty(this, a, {
              get() {
                return !0
              },
              enumerable: !0
            })
          }
      }
      has(t) {
        return we(this, fe) ? Boolean(we(this, fe)[t]) : !1
      }
      async render(t, n = []) {
        if (!we(this, fe) || !this.has(t)) return
        let r = Te(we(this, gt), R.RenderSlot)
        if (!Array.isArray(n))
          Ye(
            we(this, xt),
            "Astro.slots.render",
            `Expected second parameter to be an array, received a ${typeof n}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
          )
        else if (n.length > 0) {
          let i = we(this, fe)[t],
            s = typeof i == "function" ? await i(r) : await i,
            l = Ll(s)
          if (l)
            return await pe(r, () => l(...n)).then((c) =>
              c != null ? String(c) : c
            )
          if (typeof s == "function")
            return await ge(r, s(...n)).then((p) => (p != null ? String(p) : p))
        }
        let a = await pe(r, we(this, fe)[t])
        return Qe(r, a)
      }
    }
    gt = new WeakMap()
    fe = new WeakMap()
    xt = new WeakMap()
    tn = null
    xn = class {
      constructor(t, n = "production") {
        ;(this.cache = {}), (this.logging = t), (this.mode = n)
      }
      clearAll() {
        this.cache = {}
      }
      set(t, n) {
        this.mode === "production" &&
          this.cache[t.component] &&
          Ye(
            this.logging,
            "routeCache",
            `Internal Warning: route cache overwritten. (${t.component})`
          ),
          (this.cache[t.component] = n)
      }
      get(t) {
        return this.cache[t.component]
      }
    }
    si = ((e) => (
      (e[(e.NoMatchingStaticPath = 0)] = "NoMatchingStaticPath"), e
    ))(si || {})
    Or = Symbol.for("astro.clientAddress")
    ;(nn = 1),
      (Wl = {
        write(e) {
          let t = console.error
          $t[e.level] < $t.error && (t = console.log)
          function n() {
            let o = "",
              i = e.type
            return (
              i &&
                ((o += Sl(Cl.format(new Date()) + " ")),
                e.level === "info"
                  ? (i = Zt($l(`[${i}]`)))
                  : e.level === "warn"
                  ? (i = Zt(Er(`[${i}]`)))
                  : e.level === "error" && (i = Zt(Al(`[${i}]`))),
                (o += `${i} `)),
              kl(o)
            )
          }
          let r = e.message
          r === Fr
            ? (nn++, (r = `${r} ${Er(`(x${nn})`)}`))
            : ((Fr = r), (nn = 1))
          let a = n() + r
          return t(a), !0
        }
      })
    ;(Pn = (e, t, n) => {
      if (!t.has(e)) throw TypeError("Cannot " + n)
    }),
      (U = (e, t, n) => (
        Pn(e, t, "read from private field"), n ? n.call(e) : t.get(e)
      )),
      (se = (e, t, n) => {
        if (t.has(e))
          throw TypeError("Cannot add the same private member more than once")
        t instanceof WeakSet ? t.add(e) : t.set(e, n)
      }),
      (je = (e, t, n, r) => (
        Pn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
      )),
      (an = (e, t, n) => (Pn(e, t, "access private method"), n)),
      (Ct = class {
        constructor(t, n = !0) {
          se(this, wt),
            se(this, wn),
            se(this, Ze, void 0),
            se(this, le, void 0),
            se(this, Ce, void 0),
            se(this, jt, void 0),
            se(this, _n, new TextEncoder()),
            se(this, Ge, { dest: Wl, level: "info" }),
            se(this, qe, void 0),
            se(this, vt, void 0),
            je(this, le, t),
            je(this, Ce, { routes: t.routes.map((r) => r.routeData) }),
            je(this, jt, new Map(t.routes.map((r) => [r.routeData, r]))),
            je(this, Ze, {
              adapterName: t.adapterName,
              logging: U(this, Ge),
              markdown: t.markdown,
              mode: "production",
              renderers: t.renderers,
              async resolve(r) {
                if (!(r in t.entryModules))
                  throw new Error(`Unable to resolve [${r}]`)
                let a = t.entryModules[r]
                switch (!0) {
                  case a.startsWith("data:"):
                  case a.length === 0:
                    return a
                  default:
                    return ql(Xl(t.base, a))
                }
              },
              routeCache: new xn(U(this, Ge)),
              site: U(this, le).site,
              ssr: !0,
              streaming: n
            }),
            je(this, qe, U(this, le).base || "/"),
            je(this, vt, Vl(U(this, qe)))
        }
        removeBase(t) {
          return t.startsWith(U(this, qe)) ? t.slice(U(this, vt).length + 1) : t
        }
        match(t, { matchNotFound: n = !1 } = {}) {
          let r = new URL(t.url)
          if (U(this, le).assets.has(r.pathname)) return
          let a = "/" + this.removeBase(r.pathname),
            o = rn(a, U(this, Ce))
          return o
            ? rc(o, U(this, le).assets)
              ? void 0
              : o
            : n
            ? rn("/404", U(this, Ce))
            : void 0
        }
        async render(t, n) {
          let r = 200
          if (
            !n &&
            ((n = this.match(t)),
            n || ((r = 404), (n = this.match(t, { matchNotFound: !0 }))),
            !n)
          )
            return new Response(null, { status: 404, statusText: "Not found" })
          n.route === "/404" && (r = 404)
          let a = U(this, le).pageMap.get(n.component)
          if (n.type === "page") {
            let o = await an(this, wt, vn).call(this, t, n, a, r)
            if (o.status === 500) {
              let i = rn("/500", U(this, Ce))
              if (i) {
                a = U(this, le).pageMap.get(i.component)
                try {
                  return await an(this, wt, vn).call(this, t, i, a, 500)
                } catch {}
              }
            }
            return o
          } else {
            if (n.type === "endpoint")
              return an(this, wn, fi).call(this, t, n, a, r)
            throw new Error(`Unsupported route type [${n.type}].`)
          }
        }
        setCookieHeaders(t) {
          return as(t)
        }
      })
    Ze = new WeakMap()
    le = new WeakMap()
    Ce = new WeakMap()
    jt = new WeakMap()
    _n = new WeakMap()
    Ge = new WeakMap()
    qe = new WeakMap()
    vt = new WeakMap()
    wt = new WeakSet()
    vn = async function (e, t, n, r = 200) {
      let a = new URL(e.url),
        o = "/" + this.removeBase(a.pathname),
        i = U(this, jt).get(t),
        s = ec(i.links),
        l = new Set()
      for (let p of i.scripts)
        "stage" in p
          ? p.stage === "head-inline" &&
            l.add({ props: {}, children: p.children })
          : l.add(tc(p))
      try {
        let p = pi({
          request: e,
          origin: a.origin,
          pathname: o,
          propagation: U(this, le).propagation,
          scripts: l,
          links: s,
          route: t,
          status: r
        })
        return await Hl(n, p, U(this, Ze))
      } catch (p) {
        return (
          El(U(this, Ge), "ssr", p.stack || p.message || String(p)),
          new Response(null, {
            status: 500,
            statusText: "Internal server error"
          })
        )
      }
    }
    wn = new WeakSet()
    fi = async function (e, t, n, r = 200) {
      let a = new URL(e.url),
        o = "/" + this.removeBase(a.pathname),
        i = n,
        s = pi({
          request: e,
          origin: a.origin,
          pathname: o,
          route: t,
          status: r
        }),
        l = await Ul(i, U(this, Ze), s)
      if (l.type === "response") {
        if (l.response.headers.get("X-Astro-Response") === "Not-Found") {
          let p = new Request(new URL("/404", e.url)),
            c = this.match(p)
          if (c) return this.render(p, c)
        }
        return l.response
      } else {
        let p = l.body,
          c = new Headers(),
          u = Ko.getType(a.pathname)
        u
          ? c.set("Content-Type", `${u};charset=utf-8`)
          : c.set("Content-Type", "text/plain;charset=utf-8")
        let f = U(this, _n).encode(p)
        c.set("Content-Length", f.byteLength.toString())
        let b = new Response(f, { status: 200, headers: c })
        return kn(b, l.cookies), b
      }
    }
    mi = (e) => e.trim().replace(/[-_]([a-z])/g, (t, n) => n.toUpperCase())
    hi = { check: dc, renderToStaticMarkup: uc }
  })
function Re(e, t) {
  t = t ? Object.assign({}, Ft, t) : Ft
  let n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0
    },
    r = (a) => (
      typeof a == "function" &&
        (m && m.running && m.sources.has(n)
          ? (a = a(n.tValue))
          : (a = a(n.value))),
      Ai(n, a)
    )
  return [Si.bind(n), r]
}
function gc(e, t, n) {
  let r = $i(e, t, !1, te)
  tt && m && m.running ? W.push(r) : Nt(r)
}
function vi(e, t, n) {
  n = n ? Object.assign({}, Ft, n) : Ft
  let r = $i(e, t, !0, 0)
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    tt && m && m.running ? ((r.tState = te), W.push(r)) : Nt(r),
    Si.bind(r)
  )
}
function bi(e) {
  return ue(e, !1)
}
function yi(e) {
  let t = H
  H = null
  try {
    return e()
  } finally {
    H = t
  }
}
function xc(e) {
  return (
    M === null ||
      (M.cleanups === null ? (M.cleanups = [e]) : M.cleanups.push(e)),
    e
  )
}
function Rn() {
  return H
}
function vc(e) {
  if (m && m.running) return e(), m.done
  let t = H,
    n = M
  return Promise.resolve().then(() => {
    ;(H = t), (M = n)
    let r
    return (
      (tt || bc) &&
        ((r =
          m ||
          (m = {
            sources: new Set(),
            effects: [],
            promises: new Set(),
            disposed: new Set(),
            queue: new Set(),
            running: !0
          })),
        r.done || (r.done = new Promise((a) => (r.resolve = a))),
        (r.running = !0)),
      ue(e, !1),
      (H = M = null),
      r ? r.done : void 0
    )
  })
}
function Ln(e, t) {
  let n = Symbol("context")
  return { id: n, Provider: Ac(n), defaultValue: e }
}
function ki(e) {
  let t
  return (t = In(M, e.id)) !== void 0 ? t : e.defaultValue
}
function wc(e) {
  let t = vi(e),
    n = vi(() => Fn(t()))
  return (
    (n.toArray = () => {
      let r = n()
      return Array.isArray(r) ? r : r != null ? [r] : []
    }),
    n
  )
}
function Si() {
  let e = m && m.running
  if (this.sources && ((!e && this.state) || (e && this.tState)))
    if ((!e && this.state === te) || (e && this.tState === te)) Nt(this)
    else {
      let t = W
      ;(W = null), ue(() => Tt(this), !1), (W = t)
    }
  if (H) {
    let t = this.observers ? this.observers.length : 0
    H.sources
      ? (H.sources.push(this), H.sourceSlots.push(t))
      : ((H.sources = [this]), (H.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(H),
          this.observerSlots.push(H.sources.length - 1))
        : ((this.observers = [H]),
          (this.observerSlots = [H.sources.length - 1]))
  }
  return e && m.sources.has(this) ? this.tValue : this.value
}
function Ai(e, t, n) {
  let r = m && m.running && m.sources.has(e) ? e.tValue : e.value
  if (!e.comparator || !e.comparator(r, t)) {
    if (m) {
      let a = m.running
      ;(a || (!n && m.sources.has(e))) && (m.sources.add(e), (e.tValue = t)),
        a || (e.value = t)
    } else e.value = t
    e.observers &&
      e.observers.length &&
      ue(() => {
        for (let a = 0; a < e.observers.length; a += 1) {
          let o = e.observers[a],
            i = m && m.running
          ;(i && m.disposed.has(o)) ||
            (((i && !o.tState) || (!i && !o.state)) &&
              (o.pure ? W.push(o) : ae.push(o), o.observers && Ci(o)),
            i ? (o.tState = te) : (o.state = te))
        }
        if (W.length > 1e6) throw ((W = []), new Error())
      }, !1)
  }
  return t
}
function Nt(e) {
  if (!e.fn) return
  ye(e)
  let t = M,
    n = H,
    r = Nn
  ;(H = M = e),
    wi(e, m && m.running && m.sources.has(e) ? e.tValue : e.value, r),
    m &&
      !m.running &&
      m.sources.has(e) &&
      queueMicrotask(() => {
        ue(() => {
          m && (m.running = !0), (H = M = e), wi(e, e.tValue, r), (H = M = null)
        }, !1)
      }),
    (H = n),
    (M = t)
}
function wi(e, t, n) {
  let r
  try {
    r = e.fn(t)
  } catch (a) {
    e.pure &&
      (m && m.running
        ? ((e.tState = te),
          e.tOwned && e.tOwned.forEach(ye),
          (e.tOwned = void 0))
        : ((e.state = te), e.owned && e.owned.forEach(ye), (e.owned = null))),
      Pi(a)
  }
  ;(!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e
      ? Ai(e, r, !0)
      : m && m.running && e.pure
      ? (m.sources.add(e), (e.tValue = r))
      : (e.value = r),
    (e.updatedAt = n))
}
function $i(e, t, n, r = te, a) {
  let o = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: M,
    context: null,
    pure: n
  }
  if (
    (m && m.running && ((o.state = 0), (o.tState = r)),
    M === null ||
      (M !== hc &&
        (m && m.running && M.pure
          ? M.tOwned
            ? M.tOwned.push(o)
            : (M.tOwned = [o])
          : M.owned
          ? M.owned.push(o)
          : (M.owned = [o]))),
    On)
  ) {
    let [i, s] = Re(void 0, { equals: !1 }),
      l = On(o.fn, s)
    xc(() => l.dispose())
    let p = () => vc(s).then(() => c.dispose()),
      c = On(o.fn, p)
    o.fn = (u) => (i(), m && m.running ? c.track(u) : l.track(u))
  }
  return o
}
function Mn(e) {
  let t = m && m.running
  if ((!t && e.state === 0) || (t && e.tState === 0)) return
  if ((!t && e.state === xe) || (t && e.tState === xe)) return Tt(e)
  if (e.suspense && yi(e.suspense.inFallback)) return e.suspense.effects.push(e)
  let n = [e]
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Nn); ) {
    if (t && m.disposed.has(e)) return
    ;((!t && e.state) || (t && e.tState)) && n.push(e)
  }
  for (let r = n.length - 1; r >= 0; r--) {
    if (((e = n[r]), t)) {
      let a = e,
        o = n[r + 1]
      for (; (a = a.owner) && a !== o; ) if (m.disposed.has(a)) return
    }
    if ((!t && e.state === te) || (t && e.tState === te)) Nt(e)
    else if ((!t && e.state === xe) || (t && e.tState === xe)) {
      let a = W
      ;(W = null), ue(() => Tt(e, n[0]), !1), (W = a)
    }
  }
}
function ue(e, t) {
  if (W) return e()
  let n = !1
  t || (W = []), ae ? (n = !0) : (ae = []), Nn++
  try {
    let r = e()
    return yc(n), r
  } catch (r) {
    W || (ae = null), (W = null), Pi(r)
  }
}
function yc(e) {
  if ((W && (tt && m && m.running ? kc(W) : ji(W), (W = null)), e)) return
  let t
  if (m) {
    if (!m.promises.size && !m.queue.size) {
      let r = m.sources,
        a = m.disposed
      ae.push.apply(ae, m.effects), (t = m.resolve)
      for (let o of ae) "tState" in o && (o.state = o.tState), delete o.tState
      ;(m = null),
        ue(() => {
          for (let o of a) ye(o)
          for (let o of r) {
            if (((o.value = o.tValue), o.owned))
              for (let i = 0, s = o.owned.length; i < s; i++) ye(o.owned[i])
            o.tOwned && (o.owned = o.tOwned),
              delete o.tValue,
              delete o.tOwned,
              (o.tState = 0)
          }
          xi(!1)
        }, !1)
    } else if (m.running) {
      ;(m.running = !1),
        m.effects.push.apply(m.effects, ae),
        (ae = null),
        xi(!0)
      return
    }
  }
  let n = ae
  ;(ae = null), n.length && ue(() => mc(n), !1), t && t()
}
function ji(e) {
  for (let t = 0; t < e.length; t++) Mn(e[t])
}
function kc(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t],
      r = m.queue
    r.has(n) ||
      (r.add(n),
      tt(() => {
        r.delete(n),
          ue(() => {
            ;(m.running = !0), Mn(n)
          }, !1),
          m && (m.running = !1)
      }))
  }
}
function Tt(e, t) {
  let n = m && m.running
  n ? (e.tState = 0) : (e.state = 0)
  for (let r = 0; r < e.sources.length; r += 1) {
    let a = e.sources[r]
    a.sources &&
      ((!n && a.state === te) || (n && a.tState === te)
        ? a !== t && Mn(a)
        : ((!n && a.state === xe) || (n && a.tState === xe)) && Tt(a, t))
  }
}
function Ci(e) {
  let t = m && m.running
  for (let n = 0; n < e.observers.length; n += 1) {
    let r = e.observers[n]
    ;((!t && !r.state) || (t && !r.tState)) &&
      (t ? (r.tState = xe) : (r.state = xe),
      r.pure ? W.push(r) : ae.push(r),
      r.observers && Ci(r))
  }
}
function ye(e) {
  let t
  if (e.sources)
    for (; e.sources.length; ) {
      let n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        a = n.observers
      if (a && a.length) {
        let o = a.pop(),
          i = n.observerSlots.pop()
        r < a.length &&
          ((o.sourceSlots[i] = r), (a[r] = o), (n.observerSlots[r] = i))
      }
    }
  if (m && m.running && e.pure) {
    if (e.tOwned) {
      for (t = 0; t < e.tOwned.length; t++) ye(e.tOwned[t])
      delete e.tOwned
    }
    Ei(e, !0)
  } else if (e.owned) {
    for (t = 0; t < e.owned.length; t++) ye(e.owned[t])
    e.owned = null
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++) e.cleanups[t]()
    e.cleanups = null
  }
  m && m.running ? (e.tState = 0) : (e.state = 0), (e.context = null)
}
function Ei(e, t) {
  if ((t || ((e.tState = 0), m.disposed.add(e)), e.owned))
    for (let n = 0; n < e.owned.length; n++) Ei(e.owned[n])
}
function Sc(e) {
  return e instanceof Error || typeof e == "string"
    ? e
    : new Error("Unknown error")
}
function Pi(e) {
  e = Sc(e)
  let t = gi && In(M, gi)
  if (!t) throw e
  for (let n of t) n(e)
}
function In(e, t) {
  return e
    ? e.context && e.context[t] !== void 0
      ? e.context[t]
      : In(e.owner, t)
    : void 0
}
function Fn(e) {
  if (typeof e == "function" && !e.length) return Fn(e())
  if (Array.isArray(e)) {
    let t = []
    for (let n = 0; n < e.length; n++) {
      let r = Fn(e[n])
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
    }
    return t
  }
  return e
}
function Ac(e, t) {
  return function (r) {
    let a
    return (
      gc(
        () =>
          (a = yi(
            () => ((M.context = { [e]: r.value }), wc(() => r.children))
          )),
        void 0
      ),
      a
    )
  }
}
var fc,
  ve,
  Tn,
  Gd,
  Ft,
  gi,
  mc,
  te,
  xe,
  hc,
  M,
  m,
  tt,
  On,
  H,
  W,
  ae,
  Nn,
  Xd,
  xi,
  bc,
  Yd,
  Zd,
  Dn = ce(() => {
    ;(fc = (e, t) => e === t),
      (ve = Symbol("solid-proxy")),
      (Tn = Symbol("solid-track")),
      (Gd = Symbol("solid-dev-component")),
      (Ft = { equals: fc }),
      (gi = null),
      (mc = ji),
      (te = 1),
      (xe = 2),
      (hc = { owned: null, cleanups: null, context: null, owner: null }),
      (M = null),
      (m = null),
      (tt = null),
      (On = null),
      (H = null),
      (W = null),
      (ae = null),
      (Nn = 0),
      ([Xd, xi] = Re(!1))
    ;(Yd = Symbol("fallback")), (Zd = Ln())
  })
function _i(e, t) {
  let n = e[ve]
  if (
    !n &&
    (Object.defineProperty(e, ve, { value: (n = new Proxy(e, Ec)) }),
    !Array.isArray(e))
  ) {
    let r = Object.keys(e),
      a = Object.getOwnPropertyDescriptors(e)
    for (let o = 0, i = r.length; o < i; o++) {
      let s = r[o]
      a[s].get &&
        Object.defineProperty(e, s, {
          enumerable: a[s].enumerable,
          get: a[s].get.bind(n)
        })
    }
  }
  return n
}
function Rt(e) {
  let t
  return (
    e != null &&
    typeof e == "object" &&
    (e[ve] ||
      !(t = Object.getPrototypeOf(e)) ||
      t === Object.prototype ||
      Array.isArray(e))
  )
}
function it(e, t = new Set()) {
  let n, r, a, o
  if ((n = e != null && e[Bn])) return n
  if (!Rt(e) || t.has(e)) return e
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e)
    for (let i = 0, s = e.length; i < s; i++)
      (a = e[i]), (r = it(a, t)) !== a && (e[i] = r)
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e)
    let i = Object.keys(e),
      s = Object.getOwnPropertyDescriptors(e)
    for (let l = 0, p = i.length; l < p; l++)
      (o = i[l]), !s[o].get && ((a = e[o]), (r = it(a, t)) !== a && (e[o] = r))
  }
  return e
}
function zn(e) {
  let t = e[rt]
  return t || Object.defineProperty(e, rt, { value: (t = {}) }), t
}
function Hn(e, t, n) {
  return e[t] || (e[t] = Fi(n))
}
function jc(e, t) {
  let n = Reflect.getOwnPropertyDescriptor(e, t)
  return (
    !n ||
      n.get ||
      !n.configurable ||
      t === ve ||
      t === rt ||
      t === $c ||
      (delete n.value, delete n.writable, (n.get = () => e[ve][t])),
    n
  )
}
function Oi(e) {
  if (Rn()) {
    let t = zn(e)
    ;(t._ || (t._ = Fi()))()
  }
}
function Cc(e) {
  return Oi(e), Reflect.ownKeys(e)
}
function Fi(e) {
  let [t, n] = Re(e, { equals: !1, internal: !0 })
  return (t.$ = n), t
}
function Lt(e, t, n, r = !1) {
  if (!r && e[t] === n) return
  let a = e[t],
    o = e.length
  n === void 0 ? delete e[t] : (e[t] = n)
  let i = zn(e),
    s
  ;(s = Hn(i, t, a)) && s.$(() => n),
    Array.isArray(e) &&
      e.length !== o &&
      (s = Hn(i, "length", o)) &&
      s.$(e.length),
    (s = i._) && s.$()
}
function Ti(e, t) {
  let n = Object.keys(t)
  for (let r = 0; r < n.length; r += 1) {
    let a = n[r]
    Lt(e, a, t[a])
  }
}
function Pc(e, t) {
  if ((typeof t == "function" && (t = t(e)), (t = it(t)), Array.isArray(t))) {
    if (e === t) return
    let n = 0,
      r = t.length
    for (; n < r; n++) {
      let a = t[n]
      e[n] !== a && Lt(e, n, a)
    }
    Lt(e, "length", r)
  } else Ti(e, t)
}
function nt(e, t, n = []) {
  let r,
    a = e
  if (t.length > 1) {
    r = t.shift()
    let i = typeof r,
      s = Array.isArray(e)
    if (Array.isArray(r)) {
      for (let l = 0; l < r.length; l++) nt(e, [r[l]].concat(t), n)
      return
    } else if (s && i === "function") {
      for (let l = 0; l < e.length; l++) r(e[l], l) && nt(e, [l].concat(t), n)
      return
    } else if (s && i === "object") {
      let { from: l = 0, to: p = e.length - 1, by: c = 1 } = r
      for (let u = l; u <= p; u += c) nt(e, [u].concat(t), n)
      return
    } else if (t.length > 1) {
      nt(e[r], t, [r].concat(n))
      return
    }
    ;(a = e[r]), (n = [r].concat(n))
  }
  let o = t[0]
  ;(typeof o == "function" && ((o = o(a, n)), o === a)) ||
    (r === void 0 && o == null) ||
    ((o = it(o)),
    r === void 0 || (Rt(a) && Rt(o) && !Array.isArray(o))
      ? Ti(a, o)
      : Lt(e, r, o))
}
function Ni(...[e, t]) {
  let n = it(e || {}),
    r = Array.isArray(n),
    a = _i(n)
  function o(...i) {
    bi(() => {
      r && i.length === 1 ? Pc(n, i[0]) : nt(n, i)
    })
  }
  return [a, o]
}
var Bn,
  rt,
  $c,
  Ec,
  tu,
  Ri = ce(() => {
    Dn()
    ;(Bn = Symbol("store-raw")),
      (rt = Symbol("store-node")),
      ($c = Symbol("store-name"))
    Ec = {
      get(e, t, n) {
        if (t === Bn) return e
        if (t === ve) return n
        if (t === Tn) return Oi(e), n
        let r = zn(e),
          a = r.hasOwnProperty(t),
          o = a ? r[t]() : e[t]
        if (t === rt || t === "__proto__") return o
        if (!a) {
          let i = Object.getOwnPropertyDescriptor(e, t)
          Rn() &&
            (typeof o != "function" || e.hasOwnProperty(t)) &&
            !(i && i.get) &&
            (o = Hn(r, t, o)())
        }
        return Rt(o) ? _i(o) : o
      },
      has(e, t) {
        return t === Bn || t === ve || t === Tn || t === rt || t === "__proto__"
          ? !0
          : (this.get(e, t, e), t in e)
      },
      set() {
        return !0
      },
      deleteProperty() {
        return !0
      },
      ownKeys: Cc,
      getOwnPropertyDescriptor: jc
    }
    tu = Symbol("store-root")
  })
var Un,
  _c,
  Wn,
  Mt,
  Le,
  qn = ce(() => {
    Dn()
    Ri()
    ;(Un = (e, t, n) => {
      let r = t
        .trim()
        .split(".")
        .reduce((a, o) => (a ? a[o] : void 0), e)
      return r !== void 0 ? r : n
    }),
      (_c = (e, t, n = /{{(.*?)}}/g) => e.replace(n, (r, a) => Un(t, a, ""))),
      (Wn = (
        e = {},
        t = typeof navigator < "u" && navigator.language in e
          ? navigator.language
          : Object.keys(e)[0]
      ) => {
        let [n, r] = Re(t),
          [a, o] = Ni(e)
        return [
          (l, p, c) => {
            let u = Un(a[n()], l, c || "")
            return typeof u == "function"
              ? u(p)
              : typeof u == "string"
              ? _c(u, p || {})
              : u
          },
          {
            add(l, p) {
              o(l, (c) => Object.assign(c || {}, p))
            },
            locale: (l) => (l ? r(l) : n()),
            dict: (l) => Un(a, l)
          }
        ]
      }),
      (Mt = Ln({})),
      (Le = () => ki(Mt))
  })
var It = {}
dt(It, {
  ariaNavigateBackwardsOneChapter: () => sa,
  ariaNavigateForwardsOneChapter: () => oa,
  books: () => Li,
  cacheFirst: () => ea,
  cacheNetworkFirst: () => Qi,
  cacheOnly: () => ta,
  chapters: () => Mi,
  close: () => Ii,
  code: () => Di,
  default: () => Oc,
  download: () => Bi,
  downloadPrintAll: () => na,
  downloadSource: () => ra,
  english: () => Hi,
  homeTitle: () => zi,
  loading: () => ia,
  loadingBehavior: () => aa,
  menu: () => Ui,
  print: () => Wi,
  processes: () => qi,
  resources: () => Vi,
  searchBooks: () => Ji,
  spanish: () => Ki,
  support: () => Gi,
  thisLanguage: () => Xi,
  tools: () => Yi,
  translations: () => Zi
})
var Li,
  Mi,
  Ii,
  Di,
  Bi,
  Hi,
  zi,
  Ui,
  Wi,
  qi,
  Vi,
  Ji,
  Ki,
  Gi,
  Xi,
  Yi,
  Zi,
  Qi,
  ea,
  ta,
  na,
  ra,
  ia,
  aa,
  oa,
  sa,
  Oc,
  Dt = ce(() => {
    "use strict"
    ;(Li = "books"),
      (Mi = "chapters"),
      (Ii = "close"),
      (Di = "en"),
      (Bi = "download"),
      (Hi = "English"),
      (zi = "Free Bible Translation Tools for the Global Chuch"),
      (Ui = "menu"),
      (Wi = "print"),
      (qi = "processes"),
      (Vi = "resources"),
      (Ji = "search books"),
      (Ki = "Spanish"),
      (Gi = "support"),
      (Xi = "English"),
      (Yi = "tools"),
      (Zi = "translations"),
      (Qi = "Internet first"),
      (ea = "Use saved version first and Internet if needed"),
      (ta = "Use saved version only"),
      (na = "download and print all"),
      (ra = "download source"),
      (ia = "loading"),
      (aa = "loading behavior"),
      (oa = "Navigate forwards one chapter"),
      (sa = "Navigate backwards one chapter"),
      (Oc = {
        books: Li,
        chapters: Mi,
        close: Ii,
        code: Di,
        download: Bi,
        english: Hi,
        homeTitle: zi,
        menu: Ui,
        print: Wi,
        processes: qi,
        resources: Vi,
        searchBooks: Ji,
        spanish: Ki,
        support: Gi,
        thisLanguage: Xi,
        tools: Yi,
        translations: Zi,
        cacheNetworkFirst: Qi,
        cacheFirst: ea,
        cacheOnly: ta,
        downloadPrintAll: na,
        downloadSource: ra,
        loading: ia,
        loadingBehavior: aa,
        ariaNavigateForwardsOneChapter: oa,
        ariaNavigateBackwardsOneChapter: sa
      })
  })
var Bt = {}
dt(Bt, {
  ariaNavigateBackwardsOneChapter: () => Fa,
  ariaNavigateForwardsOneChapter: () => Oa,
  books: () => la,
  cacheFirst: () => $a,
  cacheNetworkFirst: () => Aa,
  cacheOnly: () => ja,
  chapters: () => ca,
  close: () => pa,
  code: () => da,
  default: () => Fc,
  download: () => ua,
  downloadPrintAll: () => Ca,
  downloadSource: () => Ea,
  english: () => fa,
  homeTitle: () => ma,
  loading: () => Pa,
  loadingBehavior: () => _a,
  print: () => ha,
  processes: () => ga,
  resources: () => xa,
  searchBooks: () => va,
  spanish: () => wa,
  support: () => ba,
  thisLanguage: () => ya,
  tools: () => ka,
  translations: () => Sa
})
var la,
  ca,
  pa,
  da,
  ua,
  fa,
  ma,
  ha,
  ga,
  xa,
  va,
  wa,
  ba,
  ya,
  ka,
  Sa,
  Aa,
  $a,
  ja,
  Ca,
  Ea,
  Pa,
  _a,
  Oa,
  Fa,
  Fc,
  Ht = ce(() => {
    "use strict"
    ;(la = "libros"),
      (ca = "capitulos"),
      (pa = "cierre"),
      (da = "es"),
      (ua = "descargar"),
      (fa = "English"),
      (ma =
        "Herramientas gratis de la Traducci\xF3n de la Bible para la Iglesia Global"),
      (ha = "imprimar"),
      (ga = "procesos"),
      (xa = "recursos"),
      (va = "busque libros"),
      (wa = "Espa\xF1ol"),
      (ba = "apoyo"),
      (ya = "Espa\xF1ol"),
      (ka = "herramientas"),
      (Sa = "traducciones"),
      (Aa = "La red primera"),
      ($a = "Use una versi\xF3n guardada primera, y la red si sea necesario"),
      (ja = "Use solamente una versi\xF3n guardada"),
      (Ca = "descarga e imprime todo"),
      (Ea = "descarga de la fuente"),
      (Pa = "descargando"),
      (_a = "comportamiento de descargar"),
      (Oa = "Navegue un capitulo adelante"),
      (Fa = "Navegue un capitulo atr\xE1s"),
      (Fc = {
        books: la,
        chapters: ca,
        close: pa,
        code: da,
        download: ua,
        english: fa,
        homeTitle: ma,
        print: ha,
        processes: ga,
        resources: xa,
        searchBooks: va,
        spanish: wa,
        support: ba,
        thisLanguage: ya,
        tools: ka,
        translations: Sa,
        cacheNetworkFirst: Aa,
        cacheFirst: $a,
        cacheOnly: ja,
        downloadPrintAll: Ca,
        downloadSource: Ea,
        loading: Pa,
        loadingBehavior: _a,
        ariaNavigateForwardsOneChapter: Oa,
        ariaNavigateBackwardsOneChapter: Fa
      })
  })
var Na = {}
dt(Na, { default: () => Ta })
function Ta(e) {
  return x(
    Tc,
    w(),
    d(
      g(Vn, {
        each: Jn,
        children: (t, n) =>
          x(
            Nc,
            w(),
            `${n > 0 ? "mt-1" : ""}`,
            F("data-lang", d(t().code, !0), !1),
            `/flags/${d(t().code, !0)}.svg`,
            d(t().name)
          )
      })
    )
  )
}
var Tc,
  Nc,
  Ra = ce(() => {
    "use strict"
    zt()
    et()
    ;(Tc = [
      "<div",
      ' class="absolute left-0 top-full z-20  w-full bg-darkAccent py-2 pr-2 text-right  md:right-[-1rem] md:left-auto md:mt-5 md:w-52 rtl:md:-right-full" data-js="languagePickerPane"><ul class="flex flex-col  text-left rtl:text-right">',
      "</ul></div>"
    ]),
      (Nc = [
        "<li",
        ' class="',
        '"><button class="changeLangBtn capitalize hover:text-secondary focus:text-secondary ltr:pl-6 rtl:pr-6"',
        '><img class="inline-block w-4 ltr:mr-2 rtl:ml-2 " src="',
        '" alt=""><!--#-->',
        "<!--/--></button></li>"
      ])
    P(Ta, "@astrojs/solid-js")
  })
var Ma = {}
dt(Ma, { default: () => La })
function La(e) {
  let [t] = Le(),
    [n, r] = I(!1),
    o = Object.entries({
      networkFirst: "cacheNetworkFirst",
      cacheFirst: "cacheFirst",
      cacheOnly: "cacheOnly"
    }),
    [i, s] = I()
  return [
    x(
      Rc,
      w(),
      d(t("loadingBehavior")),
      d(
        g(ke, {
          each: o,
          children: (l) => {
            let p = l[0],
              c = l[1]
            return x(
              Ic,
              w(),
              d(t(c)),
              `${
                i() == p
                  ? "border-accent bg-accent/70 text-accent"
                  : "border-gray-400"
              } inline-block rounded-full border p-2 ltr:ml-2  rtl:mr-2`
            )
          }
        })
      )
    ),
    x(
      Mc,
      w(),
      F("disabled", n(), !0),
      d(
        g(V, {
          get when() {
            return n()
          },
          get children() {
            return x(Lc, w())
          }
        })
      ),
      n() ? `${d(t("loading"))}...` : `${d(t("downloadPrintAll"))}`,
      `https://content.bibletranslationtools.org/${d(e.user, !0)}/${d(
        e.repo,
        !0
      )}/archive/master.zip`,
      d(t("downloadSource"))
    )
  ]
}
var Rc,
  Lc,
  Mc,
  Ic,
  Ia = ce(() => {
    "use strict"
    zt()
    et()
    qn()
    ;(Rc = [
      "<div",
      '><details><summary class="sentenceCase">',
      '</summary><ul class="text-sm">',
      "</ul></details></div>"
    ]),
      (Lc = [
        "<svg",
        ' class="mr-3 inline-block h-5 w-5 animate-spin text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>'
      ]),
      (Mc = [
        "<ul",
        '><li class="my-2"><button class="sentenceCase hover:text-accent focus:text-accent"',
        "><!--#-->",
        "<!--/--><!--#-->",
        '<!--/--></button></li><li class="my-2"><a class="sentenceCase inline-block hover:text-accent focus:text-accent" href="',
        '">',
        "</a></li></ul>"
      ]),
      (Ic = [
        "<li",
        '><button class="my-2 ml-auto flex items-center text-right hover:text-accent focus:text-accent"><!--#-->',
        '<!--/--><span class="',
        '"></span></button></li>'
      ])
    P(La, "@astrojs/solid-js")
  })
function Dc(e) {
  return e instanceof Error || typeof e == "string"
    ? e
    : new Error("Unknown error")
}
function Ka(e) {
  e = Dc(e)
  let t = er(X, at)
  if (!t) throw e
  for (let n of t) n(e)
}
function I(e, t) {
  return [() => e, (n) => (e = typeof n == "function" ? n(e) : n)]
}
function ne(e, t) {
  X = { owner: X, context: null }
  let n
  try {
    n = e(t)
  } catch (r) {
    Ka(r)
  } finally {
    X = X.owner
  }
  return () => n
}
function Bc(e) {
  return e()
}
function Ga(e, t, n = {}) {
  let r = Array.isArray(e),
    a = n.defer
  return () => {
    if (a) return
    let o
    if (r) {
      o = []
      for (let i = 0; i < e.length; i++) o.push(e[i]())
    } else o = e()
    return t(o)
  }
}
function Hc(e) {
  if (e.cleanups) {
    for (let t = 0; t < e.cleanups.length; t++) e.cleanups[t]()
    e.cleanups = void 0
  }
}
function zc(e) {
  X &&
    (X.context === null
      ? (X.context = { [at]: [e] })
      : X.context[at]
      ? X.context[at].push(e)
      : (X.context[at] = [e]))
}
function Uc(e) {
  let t = Symbol("context")
  return { id: t, Provider: Vc(t), defaultValue: e }
}
function Wc(e) {
  let t
  return (t = er(X, e.id)) !== void 0 ? t : e.defaultValue
}
function qc(e) {
  let t = ne(() => Xn(e()))
  return (
    (t.toArray = () => {
      let n = t()
      return Array.isArray(n) ? n : n != null ? [n] : []
    }),
    t
  )
}
function Ba(e, t) {
  let n = X
  X = e
  try {
    return t()
  } catch (r) {
    Ka(r)
  } finally {
    X = n
  }
}
function er(e, t) {
  return e
    ? e.context && e.context[t] !== void 0
      ? e.context[t]
      : er(e.owner, t)
    : void 0
}
function Xn(e) {
  if (typeof e == "function" && !e.length) return Xn(e())
  if (Array.isArray(e)) {
    let t = []
    for (let n = 0; n < e.length; n++) {
      let r = Xn(e[n])
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r)
    }
    return t
  }
  return e
}
function Vc(e) {
  return function (n) {
    return ne(() => ((X.context = { [e]: n.value }), qc(() => n.children)))
  }
}
function Wt(e) {
  let t = typeof e
  if (t === "string") return e
  if (e == null || t === "boolean") return ""
  if (Array.isArray(e)) {
    let n = ""
    for (let r = 0, a = e.length; r < a; r++) n += Wt(e[r])
    return n
  }
  return t === "object" ? e.t : t === "function" ? Wt(e()) : String(e)
}
function Ie(e) {
  K.context = e
}
function Jc() {
  return K.context
    ? { ...K.context, id: `${K.context.id}${K.context.count++}-`, count: 0 }
    : void 0
}
function g(e, t) {
  if (K.context && !K.context.noHydrate) {
    let n = K.context
    Ie(Jc())
    let r = e(t || {})
    return Ie(n), r
  }
  return e(t || {})
}
function Kc(...e) {
  let t = {}
  for (let n = 0; n < e.length; n++) {
    let r = e[n]
    if ((typeof r == "function" && (r = r()), r)) {
      let a = Object.getOwnPropertyDescriptors(r)
      for (let o in a)
        o in t ||
          Object.defineProperty(t, o, {
            enumerable: !0,
            get() {
              for (let i = e.length - 1; i >= 0; i--) {
                let s = e[i] || {}
                typeof s == "function" && (s = s())
                let l = s[o]
                if (l !== void 0) return l
              }
            }
          })
    }
  }
  return t
}
function Xa(e, t) {
  let n = e.each || [],
    r = n.length,
    a = e.children
  if (r) {
    let o = Array(r)
    for (let i = 0; i < r; i++) o[i] = t(a, n[i], i)
    return o
  }
  return e.fallback
}
function ke(e) {
  return Xa(e, (t, n, r) => t(n, () => r))
}
function Vn(e) {
  return Xa(e, (t, n, r) => t(() => n, r))
}
function V(e) {
  let t
  return e.when
    ? typeof (t = e.children) == "function"
      ? t(e.when)
      : t
    : e.fallback || ""
}
function Za(e) {
  let t,
    n = (o) => (
      t ||
        ((t = e()),
        t.then((i) => (t.resolved = i.default)),
        o && (K.context.lazy[o] = t)),
      t
    ),
    r = new Set(),
    a = (o) => {
      let i = K.context.id.slice(0, -1),
        s = K.context.lazy[i]
      if ((s ? (t = s) : n(i), t.resolved)) return t.resolved(o)
      let l = Wc(Ya),
        p = { loading: !0, error: void 0 }
      return (
        l && (l.resources.set(i, p), r.add(l)),
        K.context.async &&
          K.context.block(
            t.then(() => {
              ;(p.loading = !1), Gc(r)
            })
          ),
        ""
      )
    }
  return (a.preload = n), a
}
function Yn(e) {
  for (let t of e.resources.values()) if (t.loading) return !1
  return !0
}
function Gc(e) {
  for (let t of e) !Yn(t) || (t.completed(), e.delete(t))
}
function Qa(e) {
  let t,
    n,
    r = K.context,
    a = r.id + r.count,
    o = X
  o && (o.context ? (o.context[Da] = n = {}) : (o.context = { [Da]: (n = {}) }))
  let i =
    r.suspense[a] ||
    (r.suspense[a] = {
      resources: new Map(),
      completed: () => {
        let p = s()
        Yn(i) && t(Wt(p))
      }
    })
  function s() {
    return (
      Ie({ ...r, count: 0 }),
      Ba(o, () =>
        g(Ya.Provider, {
          value: i,
          get children() {
            return n && Hc(n), e.children
          }
        })
      )
    )
  }
  let l = s()
  if (Yn(i)) return l
  if (
    (zc((p) => {
      if (!t || !t(void 0, p))
        if (o)
          Ba(o.owner, () => {
            throw p
          })
        else throw p
    }),
    (t = r.async ? r.registerFragment(a) : void 0),
    r.async)
  ) {
    Ie({ ...r, count: 0, id: r.id + "0.f", noHydrate: !0 })
    let p = {
      t: `<template id="pl-${a}"></template>${Wt(e.fallback)}<!pl-${a}>`
    }
    return Ie(r), p
  }
  return (
    Ie({ ...r, count: 0, id: r.id + "0.f" }),
    r.writeResource(a, "$$f"),
    e.fallback
  )
}
function Ut(e) {
  if (qt(e, "")) {
    let t = _[0]
    for (let n = 1, r = _.length; n < r; n++) t += _[n]
    if (ct) {
      if (lt.size) {
        let n = De.get(e)
        typeof n == "number" && ((n = nr(ct++)), (t = n + "=" + t))
        for (let [r, a] of lt) t += ";" + a + r
        ;(t += ";return " + n), (lt = new Map())
      } else t = "return " + t
      t = "(function(" + np() + "){" + t + "}())"
    } else e && e.constructor === Object && (t = "(" + t + ")")
    return (_.length = 0), (De = new WeakMap()), t
  }
  return "void 0"
}
function qt(e, t) {
  switch (typeof e) {
    case "string":
      _.push(to(e, 0))
      break
    case "number":
      _.push(e + "")
      break
    case "boolean":
      _.push(e ? "!0" : "!1")
      break
    case "object":
      if (e === null) _.push("null")
      else {
        let n = Zc(e, t)
        switch (n) {
          case !0:
            return !1
          case !1:
            switch (e.constructor) {
              case Object:
                Ua(e)
                break
              case Array:
                Kn(e)
                break
              case Date:
                _.push('new Date("' + e.toISOString() + '")')
                break
              case RegExp:
                _.push(e + "")
                break
              case Map:
                _.push("new Map("), Kn(Array.from(e)), _.push(")")
                break
              case Set:
                _.push("new Set("), Kn(Array.from(e)), _.push(")")
                break
              case void 0:
                _.push("Object.assign(Object.create(null),"), Ua(e), _.push(")")
                break
              default:
                return !1
            }
            break
          default:
            _.push(n)
            break
        }
      }
      break
    default:
      return !1
  }
  return !0
}
function Ua(e) {
  let t = "{"
  Se.push(e)
  for (let n in e)
    if (Yc.call(e, n)) {
      let r = e[n],
        a = Qc(n)
      _.push(t + a + ":"), qt(r, a) ? (t = ",") : _.pop()
    }
  t === "{" ? _.push("{}") : _.push("}"), Se.pop()
}
function Kn(e) {
  _.push("["), Se.push(e), qt(e[0], 0)
  for (let t = 1, n = e.length; t < n; t++) _.push(","), qt(e[t], t)
  Se.pop(), _.push("]")
}
function Zc(e, t) {
  let n = De.get(e)
  if (n === void 0) return De.set(e, _.length), !1
  if ((typeof n == "number" && (n = Wa(e, n)), Se.includes(e))) {
    let r = Se[Se.length - 1],
      a = De.get(r)
    return (
      typeof a == "number" && (a = Wa(r, a)),
      lt.set(n, (lt.get(n) || "") + ep(a, t) + "="),
      !0
    )
  }
  return n
}
function Qc(e) {
  let t = tp(e)
  return t === -1 ? e : to(e, t)
}
function ep(e, t) {
  return e + (typeof t == "number" || t[0] === '"' ? "[" + t + "]" : "." + t)
}
function tp(e) {
  let t = e[0]
  if (
    !(
      (t >= "a" && t <= "z") ||
      (t >= "A" && t <= "Z") ||
      t === "$" ||
      t === "_"
    )
  )
    return 0
  for (let n = 1, r = e.length; n < r; n++)
    if (
      ((t = e[n]),
      !(
        (t >= "a" && t <= "z") ||
        (t >= "A" && t <= "Z") ||
        (t >= "0" && t <= "9") ||
        t === "$" ||
        t === "_"
      ))
    )
      return n
  return -1
}
function to(e, t) {
  let n = "",
    r = 0
  for (let a = t, o = e.length; a < o; a++) {
    let i
    switch (e[a]) {
      case '"':
        i = '\\"'
        break
      case "\\":
        i = "\\\\"
        break
      case "<":
        i = "\\x3C"
        break
      case `
`:
        i = "\\n"
        break
      case "\r":
        i = "\\r"
        break
      case "\u2028":
        i = "\\u2028"
        break
      case "\u2029":
        i = "\\u2029"
        break
      default:
        continue
    }
    ;(n += e.slice(r, a) + i), (r = a + 1)
  }
  return r === t ? (n = e) : (n += e.slice(r)), '"' + n + '"'
}
function Wa(e, t) {
  let n = nr(ct++)
  return De.set(e, n), t ? (_[t - 1] += n + "=") : (_[t] = n + "=" + _[t]), n
}
function np() {
  let e = tr[0]
  for (let t = 1; t < ct; t++) e += "," + nr(t)
  return (ct = 0), e
}
function nr(e) {
  let t = e % Ha,
    n = tr[t]
  for (e = (e - t) / Ha; e > 0; ) (t = e % za), (n += eo[t]), (e = (e - t) / za)
  return n
}
function no(e, t = {}) {
  let n = ""
  K.context = {
    id: t.renderId || "",
    count: 0,
    suspense: {},
    lazy: {},
    assets: [],
    nonce: t.nonce,
    writeResource(a, o, i) {
      if (!K.context.noHydrate) {
        if (i) return (n += `_$HY.set("${a}", ${sp(o)});`)
        n += `_$HY.set("${a}", ${Ut(o)});`
      }
    }
  }
  let r = pt(d(e()))
  return (
    (K.context.noHydrate = !0),
    (r = ap(K.context.assets, r)),
    n.length && (r = op(r, n, t.nonce)),
    r
  )
}
function x(e, ...t) {
  if (t.length) {
    let n = ""
    for (let r = 0; r < t.length; r++) {
      n += e[r]
      let a = t[r]
      a !== void 0 && (n += pt(a))
    }
    e = n + e[t.length]
  }
  return { t: e }
}
function rp(e) {
  if (!e) return ""
  if (typeof e == "string") return e
  let t = "",
    n = Object.keys(e)
  for (let r = 0; r < n.length; r++) {
    let a = n[r],
      o = e[a]
    o != null && (r && (t += ";"), (t += `${a}:${d(o, !0)}`))
  }
  return t
}
function F(e, t, n) {
  return n ? (t ? " " + e : "") : t != null ? ` ${e}="${t}"` : ""
}
function w() {
  let e = ip()
  return e ? ` data-hk="${e}"` : ""
}
function d(e, t) {
  let n = typeof e
  if (n !== "string") {
    if (!t && n === "function") return d(e(), t)
    if (!t && Array.isArray(e)) {
      let p = ""
      for (let c = 0; c < e.length; c++) p += pt(d(e[c], t))
      return { t: p }
    }
    return t && n === "boolean" ? String(e) : e
  }
  let r = t ? '"' : "<",
    a = t ? "&quot;" : "&lt;",
    o = e.indexOf(r),
    i = e.indexOf("&")
  if (o < 0 && i < 0) return e
  let s = 0,
    l = ""
  for (; o >= 0 && i >= 0; )
    o < i
      ? (s < o && (l += e.substring(s, o)),
        (l += a),
        (s = o + 1),
        (o = e.indexOf(r, s)))
      : (s < i && (l += e.substring(s, i)),
        (l += "&amp;"),
        (s = i + 1),
        (i = e.indexOf("&", s)))
  if (o >= 0)
    do
      s < o && (l += e.substring(s, o)),
        (l += a),
        (s = o + 1),
        (o = e.indexOf(r, s))
    while (o >= 0)
  else
    for (; i >= 0; )
      s < i && (l += e.substring(s, i)),
        (l += "&amp;"),
        (s = i + 1),
        (i = e.indexOf("&", s))
  return s < e.length ? l + e.substring(s) : l
}
function pt(e) {
  let t = typeof e
  if (t === "string") return e
  if (e == null || t === "boolean") return ""
  if (Array.isArray(e)) {
    let n = ""
    for (let r = 0, a = e.length; r < a; r++) n += pt(e[r])
    return n
  }
  return t === "object" ? e.t : t === "function" ? pt(e()) : String(e)
}
function ip() {
  let e = K.context
  return e && !e.noHydrate && `${e.id}${e.count++}`
}
function ap(e, t) {
  if (!e || !e.length) return t
  let n = ""
  for (let r = 0, a = e.length; r < a; r++) n += e[r]()
  return t.replace("</head>", n + "</head>")
}
function op(e, t, n) {
  let r = `<script${n ? ` nonce="${n}"` : ""}>${t}<\/script>`,
    a = e.indexOf("<!--xs-->")
  return a > -1 ? e.slice(0, a) + r + e.slice(a) : e + r
}
function sp(e) {
  if (e.message) {
    let t = {},
      n = Object.getOwnPropertyNames(e)
    for (let r = 0; r < n.length; r++) {
      let a = n[r],
        o = e[a]
      ;(!o || (a !== "message" && typeof o != "function")) && (t[a] = o)
    }
    return `Object.assign(new Error(${Ut(e.message)}), ${Ut(t)})`
  }
  return Ut(e)
}
function dp(e) {
  return x(pp, w(), d(e.message))
}
function ro(e) {
  return x(mp, w(), `${d(e.classNames, !0) || ""}`)
}
function Vt(e) {
  return x(hp, w(), `${d(e.classNames, !0) || "fill-current"}`)
}
async function ao(e) {
  let t = await rr(
      Object.assign({
        "../../../translations/en.json": () =>
          Promise.resolve().then(() => (Dt(), It)),
        "../../../translations/es.json": () =>
          Promise.resolve().then(() => (Ht(), Bt))
      }),
      `../../../translations/${e}.json`
    ),
    n = t.default
  return { newDictCode: t.code, newDict: n }
}
function oo(e) {
  let [t, { add: n, locale: r }] = Le(),
    [a, o] = I(e.preferredLocale),
    [i, s] = I(!1),
    [l, p] = I(!1)
  async function c(f) {
    let b,
      h,
      v = !1
    if (f !== e.preferredLocale) {
      let k = await ao(f)
      ;(b = k.newDict), (h = k.newDictCode), n(h, b), (v = !0)
    }
    r(f), o(f)
    let y = new CustomEvent("changelanguage", {
        detail: { language: f, newDict: b, newDictCode: h, addToOtherDict: v }
      }),
      C = document.querySelector("#menu")
    C && C.dispatchEvent(y), p(!1)
  }
  function u() {
    return i() ? "close" : "menu"
  }
  return x(
    gp,
    w(),
    F("srcset", d(e.logoWebP, !0), !1),
    F("srcset", d(e.logo, !0), !1),
    F("src", d(e.logo, !0), !1),
    d(
      g(V, {
        get when() {
          return !i()
        },
        get children() {
          return g(Vt, { classNames: "inline-block mr-2 w-6 h-6 fill-white" })
        }
      })
    ),
    d(
      g(V, {
        get when() {
          return i()
        },
        get children() {
          return g(ro, { classNames: "inline-block mr-2 w-6 h-6" })
        }
      })
    ),
    d(t(u(), void 0, u())),
    `${
      i() ? "block" : "hidden"
    } absolute top-full  left-0 right-0  z-50 w-full flex-col bg-darkAccent pt-5 md:static md:flex md:w-auto md:flex-row`,
    d(
      g(Vn, {
        get each() {
          return e.menuItems
        },
        children: (f) => {
          let b = f()
          return x(xp, w(), `${d(e.linkBase, !0)}/${d(b, !0)}`, d(t(String(b))))
        }
      })
    ),
    `languagePicker relative inline-flex place-content-center hover:text-secondary rtl:flex-row-reverse ${
      l() ? "open" : ""
    }`,
    F("data-localizable", d(!0, !0), !1),
    `/flags/${d(a(), !0)}.svg`,
    d(t("thisLanguage", void 0, "English")),
    d(
      g(V, {
        get when() {
          return l()
        },
        get children() {
          return g(Qa, {
            get fallback() {
              return x(vp, w(), d(g(ir, {})))
            },
            get children() {
              return g(wp, { onClick: c })
            }
          })
        }
      })
    )
  )
}
function so(e) {
  return g(
    io,
    Kc(e, {
      get children() {
        return g(oo, e)
      }
    })
  )
}
function Cp({ className: e = "" }) {
  return x(yp, w(), F("class", d(e, !0), !1))
}
function co({ className: e = "" }) {
  return x(kp, w(), `${d(e, !0)} h-6 w-6 `)
}
function Zn({ className: e = "" }) {
  return x(Sp, w(), F("class", d(e, !0), !1))
}
function Ep({ className: e = "" }) {
  return x(Ap, w(), F("class", d(e, !0), !1))
}
function po({ className: e = "" }) {
  return x($p, w(), F("class", d(e, !0), !1))
}
function ir({ className: e = "h-5 w-5" }) {
  return x(jp, w(), `animate-spin ${d(e, !0)}`)
}
function uo(e, t) {
  let n = t,
    r = []
  function a(i, s) {
    if (s(i)) return r
    {
      r.push(i)
      let l = i.nextElementSibling
      if (!l) return r
      a(l, () => n(l))
    }
  }
  return a(e, t), r.map((i) => i.outerHTML).join("")
}
function ar({
  target: e,
  previewPaneSelector: t,
  previewPaneSetter: n,
  setPos: r
}) {
  let a = e.getBoundingClientRect()
  n(!0)
  let o = document.querySelector(t)
  if (!o) return n(!1)
  let i = window.innerWidth / 2,
    s = a.x > i ? a.x - 50 + "px" : a.x + 50 + "px",
    l = a.y > window.innerHeight / 2 ? a.y - o.clientHeight : a.y + 30
  r({ x: s, y: l + "px" })
}
function ot(e) {
  let [t] = Le()
  return e.fallback
    ? x(Ip, w())
    : x(
        Dp,
        w(),
        `${e.dir == "BACK" ? d(Bp, !0) : d(zp, !0)}`,
        F(
          "data-testid",
          e.dir !== "BACK" ? "NavForwardBtn" : "NavBackBtn",
          !1
        ) +
          F(
            "aria-label",
            e.dir !== "BACK"
              ? d(t("ariaNavigateForwardsOneChapter"), !0)
              : d(t("ariaNavigateBackwardsOneChapter"), !0),
            !1
          ),
        `/read/${d(e.user, !0)}/${d(e.repo, !0)}/?book=${d(
          e.book,
          !0
        )}&chapter=${d(e.chapter, !0)}`,
        `${e.dir == "BACK" ? d(Hp, !0) : d(Up, !0)}`,
        d(e.icon)
      )
}
function Wp(e) {
  J = `${e}/api`
}
function Me() {
  if (typeof window < "u") return `${window.location.origin}/api`
  if ({}.CI) return console.log("using dev in ci"), "http://127.0.0.1:8788/api"
}
async function qp({ user: e, repo: t, book: n, chapter: r }) {
  if (!t) return
  let a = Be.getRepoHtml({ user: e, repo: t, book: n, chapter: r })
  try {
    return await (await fetch(a)).text()
  } catch (o) {
    console.error(o)
    return
  }
}
async function ho({ navSection: e, user: t, repo: n }) {
  if (!n || !t || !e) return
  let r = Be.getHtmlForTw({ user: t, repo: n, navSection: e })
  try {
    return await (await fetch(r)).text()
  } catch (a) {
    console.error(a)
    return
  }
}
async function Vp({ navSection: e, user: t, repo: n }) {
  if (!n || !t || !e) return
  let r = Be.getHtmlForTm({ user: t, repo: n, navSection: e })
  try {
    return await (await fetch(r)).text()
  } catch (a) {
    console.error(a)
    return
  }
}
async function Jp({ user: e, repo: t }) {
  if (!e || !t) return null
  let n = Be.getRepoIndex({ user: e, repo: t })
  try {
    console.log(`fetching index; ${n}`)
    let a = await (
      await fetch(n, { headers: { "Content-Type": "application/json" } })
    ).json()
    return typeof a == "string" ? null : (console.log(`data:${a}`), a)
  } catch (r) {
    return console.error(r), null
  }
}
async function Kp({ file: e, user: t, repo: n }) {
  if (!e || !t || !n) return
  let r = Be.getHtmlForCommentaryIndividualSection({
    file: e,
    user: t,
    repo: n
  })
  try {
    return await (await fetch(r)).text()
  } catch (a) {
    console.error(a)
    return
  }
}
function vo() {
  return g(V, {
    get when() {
      return Xp()
    },
    get children() {
      return x(
        Gp,
        w(),
        "left:" + d(Va().x, !0) + (";top:" + d(Va().y, !0)),
        Yp()
      )
    }
  })
}
function wo() {
  let e = document.querySelectorAll("a[data-crossref='true']")
  async function t(n) {
    let r = n.target,
      a = r.dataset.hash,
      o = r.dataset.book,
      i = r.dataset.chapter,
      s,
      l
    try {
      ;(s = await fetch(`?book=${o}&chapter=${i}`)), (l = await s.text())
    } catch (b) {
      console.error(b)
      return
    }
    let p = document.createElement("html")
    p.innerHTML = l
    let c = p.querySelector(`[id="${a}"]`)
    if (!c) return
    function u(b) {
      return !!b.id && b.id !== a && b.id.includes("tn-chunk")
    }
    let f = uo(c, u)
    sr(f),
      ar({
        target: r,
        previewPaneSelector: "#previewPane",
        previewPaneSetter: Jt,
        setPos: or
      }),
      go(document.activeElement),
      xo.focus()
  }
  e.forEach((n) => {
    n.addEventListener("mouseover", t)
  })
}
function bo(e, t) {
  if (!document.querySelector("[data-resourcetype*='commentary']")) return
  console.log("checking for commmentary popups")
  let n = document.querySelectorAll("a[href*='popup']")
  n.forEach((a) => a.addEventListener("click", r)),
    n.forEach((a) => a.addEventListener("mouseover", r))
  async function r(a) {
    a?.preventDefault()
    let o = a.target,
      l = o.href.split("popup://")[1],
      p
    try {
      if (((p = await Kp({ file: l, user: e, repo: t })), !p)) return
    } catch {
      return
    }
    sr(p),
      ar({
        target: o,
        previewPaneSelector: "#previewPane",
        previewPaneSetter: Jt,
        setPos: or
      }),
      go(document.activeElement),
      xo.focus()
    let c = document.querySelector("#previewPane")
    if (!c) return
    ;c?.querySelectorAll("a[href*='popup']").forEach((f) => {
      f.addEventListener("click", r)
    })
  }
}
function yo() {
  let e = document.querySelectorAll('a[href*="footnote-target"]')
  function t(n) {
    let r = n.target,
      a = r.getBoundingClientRect(),
      o = r.href.split("-").pop()
    Jt(!0), Jt(!0)
    let i = document.querySelector("#previewPane")
    if (!i) return
    let s = window.innerWidth / 2,
      l = a.x > s ? a.x - 50 + "px" : a.x + 50 + "px",
      p = a.y > window.innerHeight / 2 ? a.y - i.clientHeight : a.y + 30
    or({ x: l, y: p + "px" })
    let c = document.querySelector(`a[href*="footnote-caller-${o}"]`)
    if (!c) return
    let u = c.parentElement?.parentElement,
      f = u ? u.innerText : ""
    sr(f)
  }
  e.forEach((n) => {
    n.addEventListener("mouseenter", t)
  })
}
function ko(e) {
  function t() {
    let o = new CustomEvent("setLastPageVisited", {
        detail: { url: location.href }
      }),
      i = document.querySelector("#commonWrapper")
    i && i.dispatchEvent(o)
  }
  Ga(
    () => e.storeInterface.getStoreVal("currentChapter"),
    () => {
      n(),
        yo(),
        wo(),
        bo(e.user, e.repositoryName),
        r(
          e.storeInterface.getStoreVal("currentBook"),
          e.storeInterface.getStoreVal("currentChapter")
        )
    }
  )
  async function n() {
    let o = e.storeInterface.getStoreVal("currentChapter"),
      i = Number(o) + 1,
      s = Number(o) - 1
    await a({ chapNum: i }), await a({ chapNum: s })
  }
  function r(o, i) {
    if ("URLSearchParams" in window) {
      let s = new URLSearchParams(window.location.search)
      s.set("book", o), s.set("chapter", i)
      let l = window.location.pathname + "?" + s.toString()
      ;(document.title = `${e.repositoryName}-${o}-${i}`),
        history.pushState({ newUrl: l }, "", l)
      let p = document.querySelector("#commonWrapper"),
        c = new CustomEvent("addCurrentPageToSw", {
          detail: { url: location.href, cacheName: "lr-pages" }
        })
      p && p.dispatchEvent(c)
    }
    t()
  }
  async function a({ event: o, navigate: i, dir: s, chapNum: l }) {
    o && o.preventDefault()
    let p = e.storeInterface.getStoreVal("currentBook")
    if (l && l <= 0 && !s) return
    let c
    if (
      (l
        ? (c = l)
        : s === "BACK"
        ? (c = e.storeInterface.navLinks()?.prev)
        : (c = e.storeInterface.navLinks()?.next),
      !c)
    )
      return
    c = String(c)
    let u = e.storeInterface.currentBookObj(),
      f = u ? e.storeInterface.getChapObjFromGivenBook(u.slug, c) : null,
      b = f?.text
    if (!f) return
    if (b && i) return e.storeInterface.mutateStore("currentChapter", c)
    if (b) return
    let h = { book: p, chapter: c },
      v = await e.storeInterface.fetchHtml(h)
    !v ||
      Bc(() => {
        e.storeInterface.mutateStoreText({
          book: p,
          chapter: String(f?.label),
          val: String(v)
        }),
          i && e.storeInterface.mutateStore("currentChapter", String(c))
      })
  }
  return [
    g(V, {
      get when() {
        return !e.printWholeBook()
      },
      get children() {
        return [
          g(vo, {}),
          x(
            Zp,
            w(),
            d(
              g(V, {
                get when() {
                  return e.storeInterface.navLinks()?.prev
                },
                get fallback() {
                  return g(ot, { fallback: !0 })
                },
                get children() {
                  return g(ot, {
                    dir: "BACK",
                    get user() {
                      return e.user
                    },
                    get repo() {
                      return e.repositoryName
                    },
                    get book() {
                      return e.firstBookKey
                    },
                    get chapter() {
                      return e.storeInterface.navLinks()?.prev
                    },
                    onClick: (o) => {
                      a({ event: o, navigate: !0, dir: "BACK" })
                    },
                    get icon() {
                      return g(Zn, {
                        className:
                          "color-inherit mx-auto fill-current stroke-current ltr:rotate-0 rtl:rotate-180"
                      })
                    }
                  })
                }
              })
            ),
            e.storeInterface.HTML(),
            d(
              g(V, {
                get when() {
                  return e.storeInterface.navLinks()?.next
                },
                get fallback() {
                  return g(ot, { fallback: !0 })
                },
                get children() {
                  return g(ot, {
                    dir: "FORWARD",
                    get user() {
                      return e.user
                    },
                    get repo() {
                      return e.repositoryName
                    },
                    get book() {
                      return e.firstBookKey
                    },
                    get chapter() {
                      return e.storeInterface.navLinks()?.next
                    },
                    onClick: (o) => {
                      a({ event: o, navigate: !0, dir: "FORWARD" })
                    },
                    get icon() {
                      return g(Zn, {
                        className:
                          "color-inherit mx-auto fill-current stroke-current ltr:rotate-180 rtl:rotate-0"
                      })
                    }
                  })
                }
              })
            )
          )
        ]
      }
    }),
    g(V, {
      get when() {
        return e.printWholeBook()
      },
      get children() {
        return x(Qp, w(), e.storeInterface.wholeBookHtml())
      }
    })
  ]
}
function Qn(e) {
  return (
    e != null &&
    typeof e == "object" &&
    (Object.getPrototypeOf(e) === Object.prototype || Array.isArray(e))
  )
}
function Kt(e, t, n, r) {
  ;(!r && e[t] === n) || (n === void 0 ? delete e[t] : (e[t] = n))
}
function So(e, t, n) {
  let r = Object.keys(t)
  for (let a = 0; a < r.length; a += 1) {
    let o = r[a]
    Kt(e, o, t[o], n)
  }
}
function ed(e, t) {
  if ((typeof t == "function" && (t = t(e)), Array.isArray(t))) {
    if (e === t) return
    let n = 0,
      r = t.length
    for (; n < r; n++) {
      let a = t[n]
      e[n] !== a && Kt(e, n, a)
    }
    Kt(e, "length", r)
  } else So(e, t)
}
function st(e, t, n = []) {
  let r,
    a = e
  if (t.length > 1) {
    r = t.shift()
    let i = typeof r,
      s = Array.isArray(e)
    if (Array.isArray(r)) {
      for (let l = 0; l < r.length; l++) st(e, [r[l]].concat(t), n)
      return
    } else if (s && i === "function") {
      for (let l = 0; l < e.length; l++) r(e[l], l) && st(e, [l].concat(t), n)
      return
    } else if (s && i === "object") {
      let { from: l = 0, to: p = e.length - 1, by: c = 1 } = r
      for (let u = l; u <= p; u += c) st(e, [u].concat(t), n)
      return
    } else if (t.length > 1) {
      st(e[r], t, [r].concat(n))
      return
    }
    ;(a = e[r]), (n = [r].concat(n))
  }
  let o = t[0]
  ;(typeof o == "function" && ((o = o(a, n)), o === a)) ||
    (r === void 0 && o == null) ||
    (r === void 0 || (Qn(a) && Qn(o) && !Array.isArray(o))
      ? So(a, o)
      : Kt(e, r, o))
}
function td(e) {
  let t = Array.isArray(e)
  function n(...r) {
    t && r.length === 1 ? ed(e, r[0]) : st(e, r)
  }
  return [e, n]
}
function Ja(e) {
  return (t) => (Qn(t) && e(t), t)
}
function Ao(e) {
  if (!e.repoData.bible?.length) return null
  let t = {
      currentBook: e.firstBookKey,
      currentChapter: e.firstChapterToShow,
      menuBook: e.firstBookKey,
      searchedBooks: e.repoData.bible.map(($) => ({
        label: $.label,
        slug: $.slug
      })),
      text: e.repoData.bible,
      languageName: e.repoData.languageName,
      languageCode: e.repoData.languageCode,
      resourceType: e.repoData.resourceType,
      textDirection: e.repoData.textDirection,
      repoUrl: e.repoData.repoUrl
    },
    [n, r] = td(t),
    [a, o] = I(!1)
  function i($, D) {
    r(
      Ja((G) => {
        G[$] = D
      })
    )
  }
  function s({ book: $, chapter: D, val: G }) {
    r(
      Ja((oe) => {
        let q = oe.text.findIndex((Ae) => Ae.slug == $),
          He = oe.text[q].chapters.findIndex((Ae) => Ae.label == D)
        oe.text[q].chapters[He].text = G
      })
    )
  }
  function l($) {
    return n[$]
  }
  let p = ne(() => n.text),
    c = ne(() => n.text.find((D) => D.slug == n.menuBook)),
    u = () => n.text.length == 1,
    f = ne(() => n.text.find((D) => D.slug == n.currentBook)),
    b = ne(() => f()?.chapters.find((G) => n.currentChapter == G.label)),
    h = ne(() => {
      let $ = f()
      if (!$) return
      let D = $?.chapters.findIndex((zo) => n.currentChapter == zo.label),
        G = D && D === 0,
        oe = D && D == $?.chapters.length - 1,
        q = G ? null : $.chapters[D - 1],
        He = oe ? null : $.chapters[D + 1]
      return { prev: q?.label, next: He?.label }
    })
  function v($, D) {
    return n.text.find((q) => q.slug == $)?.chapters.find((q) => q.label == D)
  }
  let y = ne(
      () =>
        f()
          ?.chapters.map((G) => G.text)
          .join("") || void 0
    ),
    C = ne(() => {
      let $ = b()
      return ($ && $.text) || void 0
    }),
    k = ne(() => {
      let $ = n.text.find((G) => G.slug == n.menuBook)
      return $ && $.chapters.length
    }),
    T = ne(() => n.searchedBooks),
    j = ne(() => {
      let $ = n.text.find((G) => G.slug == n.menuBook)
      return $ && $.chapters
    }),
    O,
    B,
    [Q, S] = I(!1)
  async function N({ book: $ = n.currentBook, chapter: D, skipAbort: G = !1 }) {
    if (((O = new AbortController()), (B = O.signal), Q() && !G))
      return O.abort()
    S(!0)
    let oe = Be.getRepoHtml({
      user: e.user,
      repo: e.repositoryName,
      book: $,
      chapter: D
    })
    try {
      return await (await fetch(oe, { signal: B })).text()
    } catch (q) {
      return console.error(q), !1
    } finally {
      S(!1)
    }
  }
  let z = {
    mutateStore: i,
    mutateStoreText: s,
    getStoreVal: l,
    allBibArr: p,
    isOneBook: u,
    currentBookObj: f,
    currentChapObj: b,
    getChapObjFromGivenBook: v,
    HTML: C,
    wholeBookHtml: y,
    maxChapter: k,
    menuBookNames: T,
    possibleChapters: j,
    fetchHtml: N,
    getMenuBook: c,
    navLinks: h
  }
  return g(rd, {
    get locale() {
      return e.preferredLocale
    },
    get initialDict() {
      return e.initialDict
    },
    get children() {
      return x(
        nd,
        w(),
        d(
          g(fo, {
            storeInterface: z,
            setPrintWholeBook: o,
            get user() {
              return e.user
            },
            get repositoryName() {
              return e.repositoryName
            }
          })
        ),
        d(
          g(ko, {
            storeInterface: z,
            get user() {
              return e.user
            },
            get repositoryName() {
              return e.repositoryName
            },
            get firstBookKey() {
              return e.firstBookKey
            },
            get firstChapterToShow() {
              return e.firstChapterToShow
            },
            printWholeBook: a
          })
        )
      )
    }
  })
}
function rd(e) {
  let t = Wn(e.initialDict, e.locale)
  return g(Mt.Provider, {
    value: t,
    get children() {
      return e.children
    }
  })
}
function Co(e) {
  let [t, n] = I(!1)
  return x(
    ad,
    w(),
    ` absolute top-0 right-0 z-10 ml-auto max-h-[50vh] w-full overflow-y-auto bg-white  sm:sticky sm:w-1/4 ${
      t() && "shadow-dark-700 shadow"
    }`,
    d(
      g(V, {
        get when() {
          return t()
        },
        get children() {
          return x(id, w())
        }
      })
    ),
    `relative ${t() ? "mt-14" : "mt-2"}  inline-block w-full`,
    d(
      g(V, {
        get when() {
          return t()
        },
        get children() {
          return x(
            $o,
            w(),
            d(
              e
                .filteredWords()
                .map((r) =>
                  x(
                    jo,
                    w(),
                    `?section=${d(r.section, !0)}#${d(r.slug, !0)}`,
                    F("data-section", d(r.section, !0), !1) +
                      F("data-hash", d(r.slug, !0), !1),
                    d(r.label)
                  )
                )
            )
          )
        }
      })
    )
  )
}
function Eo(e) {
  return [
    x(od, w()),
    x(
      $o,
      w(),
      d(
        e
          .filteredWords()
          .map((t) =>
            x(
              jo,
              w(),
              `?section=${d(t.section, !0)}#${d(t.slug, !0)}`,
              F("data-section", d(t.section, !0), !1) +
                F("data-hash", d(t.slug, !0), !1),
              d(t.label)
            )
          )
      )
    )
  ]
}
function Po(e) {
  let [t, n] = I(""),
    [r, a] = I({ [e.initialPage]: e.initialHtml }),
    [o, i] = I(e.initialPage),
    [s, l] = I({ x: "0px", y: "0px" }),
    [p, c] = I(!1),
    [u, f] = I(""),
    b = []
  e.repoIndex.words?.forEach((T) => {
    T.words.forEach((j) => {
      b.push({ section: T.slug, slug: j.slug, label: j.label })
    })
  }),
    b.sort((T, j) => {
      let O = T.label.toUpperCase(),
        B = j.label.toUpperCase()
      return O > B ? 1 : O < B ? -1 : 0
    })
  let h = ne(() =>
    b.filter(
      (T) =>
        T.slug.toLowerCase().includes(t().toLowerCase().trim()) ||
        T.label.toLowerCase().includes(t().toLowerCase().trim())
    )
  )
  function v(T) {
    let j = T.target
    n(j.value)
  }
  async function y(T, j, O) {
    if (r()[j] && o() == j) return
    T.preventDefault(),
      r()[j] && (i(j), document.getElementById(O)?.scrollIntoView())
    let B = await C(j)
    if (B) {
      let S = { ...r(), [j]: B }
      a(S)
    }
    i(j), document.getElementById(O)?.scrollIntoView()
  }
  async function C(T, j) {
    try {
      let O = await ho({ navSection: T, user: e.user, repo: e.repo })
      if (O) return O
      throw new Error("no html returned")
    } catch (O) {
      console.error(O)
      return
    }
  }
  function k() {
    let T = document.querySelectorAll("a[data-crossref='true']")
    console.log({ crossReferences: T })
    let j = document.createElement("html")
    T.forEach((O) => {
      let B = String(O.dataset?.section),
        Q = String(O.dataset?.hash)
      O.addEventListener("click", (S) => {
        c(!1), y(S, B, Q)
      }),
        O.addEventListener("mouseover", async (S) => {
          let N = r()[B]
          if (N) j.innerHTML = N
          else {
            let q = await C(B)
            if (!q) return
            let Ae = { ...r(), [B]: q }
            a(Ae), (j.innerHTML = q)
          }
          let z = j.querySelector(`#${Q}`),
            $ = z && z.nextElementSibling
          if (!$) return
          function D(q) {
            return (
              !!q.id &&
              !!q.previousElementSibling &&
              q.previousElementSibling.tagName === "HR"
            )
          }
          let G = uo($, D)
          f(G)
          let oe = S.target
          ar({
            target: oe,
            previewPaneSelector: "#previewPane",
            previewPaneSetter: c,
            setPos: l
          }),
            (j.innerHTML = "")
        })
    })
  }
  return (
    Ga([r], () => {
      k()
    }),
    [
      g(V, {
        get when() {
          return p()
        },
        get children() {
          return x(
            sd,
            w(),
            "left:" + d(s().x, !0) + (";top:" + d(s().y, !0)),
            u()
          )
        }
      }),
      x(
        ld,
        w(),
        r()[o()],
        d(g(Co, { filteredWords: h, fetchSectionAndNav: y, searchWords: v })),
        d(g(Eo, { filteredWords: h, fetchSectionAndNav: y, searchWords: v }))
      )
    ]
  )
}
function lr(e) {
  let t = !!e.isNested
  return x(
    cd,
    w(),
    d(
      g(ke, {
        get each() {
          return e.navigation
        },
        children: (n) =>
          g(xd, {
            get setNavIsOpen() {
              return e.setNavIsOpen
            },
            get initialPage() {
              return e.initialPage
            },
            navObj: n,
            isNested: t
          })
      })
    )
  )
}
function xd(e) {
  let t = !e.isNested && e.navObj.File.replace(".html", "") === e.initialPage,
    [n, r] = I(t)
  function a() {
    return n() ? "height: auto; " : "height: 0;"
  }
  let o = e.navObj.Children.length
  return x(
    pd,
    w(),
    d(
      g(vd, {
        get setNavIsOpen() {
          return e.setNavIsOpen
        },
        get isNested() {
          return e.isNested
        },
        get initialPage() {
          return e.initialPage
        },
        get navObj() {
          return e.navObj
        }
      })
    ),
    `${d(e.navObj.Label, !0)}`,
    F("aria-expanded", d(n(), !0), !1),
    o
      ? x(
          dd,
          w(),
          `text-accentDarker ml-2 inline-block h-6 w-6 ${
            n() ? "" : "-rotate-90"
          }`
        )
      : d(null),
    o
      ? x(
          ud,
          w(),
          rp(a()),
          F("aria-hidden", !n(), !1),
          `${d(e.navObj.Label, !0)}`,
          d(
            g(lr, {
              get navigation() {
                return e.navObj.Children
              },
              get initialPage() {
                return e.initialPage
              },
              isNested: !0,
              get setNavIsOpen() {
                return e.setNavIsOpen
              }
            })
          )
        )
      : d(null)
  )
}
function vd(e) {
  let t = e.navObj.Slug
      ? `?section=${e.navObj.File.replace(".html", "")}#${e.navObj.Slug}`
      : `?section=${e.navObj.File.replace(".html", "")}`,
    n = e.initialPage === e.navObj.File.replace(".html", "")
  return n && !e.navObj.Slug
    ? x(fd, w(), d(e.navObj.Label))
    : n && e.navObj.Slug
    ? x(md, w(), F("href", d(t, !0), !1), d(e.navObj.Label))
    : n
    ? x(gd, w())
    : x(hd, w(), F("href", d(t, !0), !1), d(e.navObj.Label))
}
function _o(e) {
  let [t, n] = I(!1)
  return x(
    wd,
    w(),
    `ml-auto flex items-center gap-2 rounded-md border border-solid  border-white bg-darkAccent px-4 py-2 capitalize text-white rtl:flex-row-reverse md:hidden ${
      t() && "hidden"
    }`,
    d(g(Vt, { classNames: "fill-white" })),
    `relative flex h-full justify-between ${
      t() ? "overflow-hidden" : "overflow-y-scroll"
    }`,
    e.initialHtml,
    e.repoIndex.navigation?.length &&
      x(
        yd,
        w(),
        d(
          g(V, {
            get when() {
              return t()
            },
            get children() {
              return x(bd, w(), d(g(Vt, { classNames: "fill-white" })))
            }
          })
        ),
        `fixed inset-0 z-10 h-[var(--screenHeight)] w-full overflow-y-scroll bg-neutral-50 px-4  md:sticky md:top-0 md:block md:h-full md:bg-none md:pt-0 ${
          t() ? "block pt-24" : "hidden"
        }`,
        d(
          g(lr, {
            get navigation() {
              return e.repoIndex.navigation
            },
            get initialPage() {
              return e.initialPage
            },
            setNavIsOpen: n
          })
        )
      )
  )
}
function Oo(e) {
  return x(
    kd,
    w(),
    `resource-${d(e.resourceType, !0)}`,
    ` bg-neutral-50 font-sans resourceType-${d(e.resourceType, !0)}`,
    d(e.children)
  )
}
function Fo(e) {
  let t = "en"
  if (!e) return t
  let n = e.headers.get("Accept-Language")
  if (!n) return t
  let r = n.split(",").map((o) => o.split(";")[0]),
    a = t
  for (let o = 0; o < r.length; o++) {
    let i = r[o]
    if (Jn.find((l) => l.code === i)) {
      a = i
      break
    } else continue
  }
  return a
}
function Ad({ book: e, chapter: t, repoIndex: n }) {
  if (!n.bible?.length) return { book: "", chapter: "" }
  let r = n.bible?.find((s) => s.slug == e || s.label == e),
    a = r && r.chapters.find((s) => s.label == t)
  !e || !r ? ((e = null), (t = null)) : t && !a && (t = null)
  let o = r || n.bible[0],
    i = a || o.chapters[0]
  return { book: o.slug || "", chapter: i.label || "" }
}
function $d({ navParam: e, repoIndex: t }) {
  if (!t.words?.length) return
  let n = t.words[0].slug
  if (!t || !e) return n
  let r = t.words.find((a) => a.slug === e)
  return r ? r.slug : n
}
function jd({ navParam: e, repoIndex: t }) {
  if (!t.navigation?.length) return
  let n = t.navigation[0].File?.replace(".html", ""),
    r = t.navigation.find((a) => a.File.replace(".html", "") == e)
  return r && r.File ? r.File.replace(".html", "") : n
}
function Cd({ repoIndex: e, book: t, chapter: n, initialHtml: r }) {
  !e.bible ||
    e.bible.forEach((a) => {
      a.chapters.forEach((o) => {
        ;(o.text = null), a.slug == t && o.label == n && (o.text = r)
      })
    })
}
var at,
  Da,
  X,
  K,
  Ya,
  Xc,
  Yc,
  tr,
  Ha,
  eo,
  za,
  Se,
  _,
  lt,
  De,
  ct,
  rr,
  Gn,
  lp,
  cp,
  pp,
  up,
  fp,
  mp,
  hp,
  io,
  gp,
  xp,
  vp,
  wp,
  bp,
  lo,
  yp,
  kp,
  Sp,
  Ap,
  $p,
  jp,
  Pp,
  _p,
  Op,
  Fp,
  Tp,
  Np,
  qa,
  Rp,
  Lp,
  Mp,
  fo,
  Ip,
  Dp,
  mo,
  Bp,
  Hp,
  zp,
  Up,
  J,
  Be,
  Gp,
  Va,
  or,
  Xp,
  Jt,
  Yp,
  sr,
  fu,
  go,
  xo,
  Zp,
  Qp,
  nd,
  id,
  $o,
  ad,
  jo,
  od,
  sd,
  ld,
  cd,
  pd,
  dd,
  ud,
  fd,
  md,
  hd,
  gd,
  wd,
  bd,
  yd,
  kd,
  Sd,
  Jn,
  Ed,
  cr,
  Pd,
  To,
  _d,
  Od,
  No,
  Fd,
  Ro,
  Td,
  Nd,
  Lo,
  zt = ce(() => {
    "use strict"
    et()
    qn()
    ;(at = Symbol("error")), (Da = Symbol("branch"))
    X = null
    K = {}
    Ya = Uc()
    Xc = [
      "allowfullscreen",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "disabled",
      "formnovalidate",
      "hidden",
      "indeterminate",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "seamless",
      "selected"
    ]
    ;[...Xc]
    ;({ hasOwnProperty: Yc } = Object.prototype),
      (tr = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_"),
      (Ha = tr.length),
      (eo = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_"),
      (za = eo.length),
      (Se = []),
      (_ = [""]),
      (lt = new Map()),
      (De = new WeakMap()),
      (ct = 0)
    _.pop()
    ;(rr = (e, t) => {
      let n = e[t]
      return n
        ? typeof n == "function"
          ? n()
          : Promise.resolve(n)
        : new Promise((r, a) => {
            ;(typeof queueMicrotask == "function"
              ? queueMicrotask
              : setTimeout)(
              a.bind(null, new Error("Unknown variable dynamic import: " + t))
            )
          })
    }),
      (Gn = void 0),
      (lp = Oe()),
      (cp = _e(async (e, t, n) => {
        let r = e.createAstro(lp, t, n)
        r.self = cp
        let { href: a, title: o, body: i } = r.props
        return ee`${Fe(e)}<li class="link-card astro-DOHJNAO5">
  <a${de(a, "href")} class="astro-DOHJNAO5">
    <h2 class="astro-DOHJNAO5">
      ${o}
      <span class="astro-DOHJNAO5">&rarr;</span>
    </h2>
    <p class="astro-DOHJNAO5">
      ${i}
    </p>
  </a>
</li>`
      }, "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/Card.astro")),
      (pp = ["<div", ">I am a test <!--#-->", "<!--/--></div>"])
    P(dp, "@astrojs/solid-js")
    ;(up = "/_astro/logo.69dbbb18.png"),
      (fp = "/_astro/logo.b8f96b63.webp"),
      (mp = [
        "<svg",
        ' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="',
        '"><path d="M14 0.666656C21.3733 0.666656 27.3333 6.62666 27.3333 14C27.3333 21.3733 21.3733 27.3333 14 27.3333C6.62667 27.3333 0.666672 21.3733 0.666672 14C0.666672 6.62666 6.62667 0.666656 14 0.666656ZM18.7867 7.33332L14 12.12L9.21334 7.33332L7.33334 9.21332L12.12 14L7.33334 18.7867L9.21334 20.6667L14 15.88L18.7867 20.6667L20.6667 18.7867L15.88 14L20.6667 9.21332L18.7867 7.33332Z" fill="white" fill-opacity="0.8"></path></svg>'
      ]),
      (hp = [
        "<svg",
        ' width="25" height="16" viewBox="0 0 25 16" fill="none" class="',
        '" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0H24.5V2.66667H0.5V0ZM0.5 6.66667H24.5V9.33333H0.5V6.66667ZM0.5 13.3333H24.5V16H0.5V13.3333Z" fill="" fill-opacity="0.8"></path></svg>'
      ])
    P(ro, "@astrojs/solid-js")
    P(Vt, "@astrojs/solid-js")
    io = (e) => {
      let t = Wn(e.initialDict, e.preferredLocale)
      return g(Mt.Provider, {
        value: t,
        get children() {
          return e.children
        }
      })
    }
    P(io, "@astrojs/solid-js")
    P(ao, "@astrojs/solid-js")
    ;(gp = [
      "<nav",
      ' class="w-full bg-darkAccent py-5 font-sans print:hidden"><div class="relative mx-auto flex max-w-[1400px] items-center justify-between px-4 text-white"><picture><source',
      ' type="image/webp"><source',
      ' type="image/jpeg"><img',
      ' alt="WA Logo" class="w-32" width="618" height="186"></picture><button class="inline-flex items-center rounded-md border border-solid border-gray-100 px-6 py-2 capitalize rtl:flex-row-reverse md:hidden"><!--#-->',
      "<!--/--><!--#-->",
      "<!--/--><!--#-->",
      '<!--/--></button><div data-js="mobileMenu" class="',
      '"><ul class="flex flex-col ltr:pl-4 rtl:pr-4 md:flex-row">',
      '</ul><div class="relative my-2 pl-4 md:my-0 md:ml-4 md:pl-0"><button data-js="languagePicker" class="',
      '" data-i18nkey="thisLanguage"',
      '><img class="mr-2 w-4" src="',
      '" alt=""><!--#-->',
      "<!--/--></button><!--#-->",
      "<!--/--></div></div></div></nav>"
    ]),
      (xp = [
        "<li",
        ' class="my-2 capitalize hover:text-secondary focus:text-secondary md:mx-4 md:my-0"><a href="',
        '">',
        "</a></li>"
      ]),
      (vp = [
        "<div",
        ' class="absolute left-0 top-full z-20  grid w-full place-content-center bg-darkAccent  py-2 pr-2 text-center md:left-auto md:mt-5 md:w-52 rtl:md:-right-full ">',
        "</div>"
      ]),
      (wp = Za(() => Promise.resolve().then(() => (Ra(), Na))))
    P(oo, "@astrojs/solid-js")
    P(so, "@astrojs/solid-js")
    ;(bp = Oe()),
      (lo = _e(async (e, t, n) => {
        let r = e.createAstro(bp, t, n)
        r.self = lo
        let a = "https://bibleineverylanguage.org",
          o = ["processes", "resources", "translations", "tools", "support"],
          { preferredLocale: i, initialDict: s } = r.props
        return ee`<!-- using astro file for sever work and for client directive;  -->${Fe(
          e
        )}<div>
  ${ie(e, "Header", so, {
    "client:load": !0,
    logo: up,
    logoWebP: fp,
    menuItems: o,
    preferredLocale: i,
    linkBase: a,
    initialDict: s,
    "client:component-hydration": "load",
    "client:component-path":
      "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/global/Nav/Header",
    "client:component-export": "Header"
  })}
</div>`
      }, "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/global/Nav/Nav.astro")),
      (yp = [
        "<svg",
        ' width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg"',
        '><path d="M0 17H14V15H0V17ZM14 6H10V0H4V6H0L7 13L14 6Z" fill="#001533" fill-opacity="0.8"></path></svg>'
      ]),
      (kp = [
        "<svg",
        ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="',
        '"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
      ]),
      (Sp = [
        "<svg",
        ' width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"',
        '><path d="M16 7.5V9.5H3.99997L9.49997 15L8.07997 16.42L0.159973 8.5L8.07997 0.580002L9.49997 2L3.99997 7.5H16Z" fill-opacity="0.8"></path></svg>'
      ]),
      (Ap = [
        "<svg",
        ' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"',
        '><path d="M8.66667 0C10.9652 0 13.1696 0.913092 14.7949 2.53841C16.4202 4.16372 17.3333 6.36812 17.3333 8.66667C17.3333 10.8133 16.5467 12.7867 15.2533 14.3067L15.6133 14.6667H16.6667L23.3333 21.3333L21.3333 23.3333L14.6667 16.6667V15.6133L14.3067 15.2533C12.7341 16.5957 10.7343 17.3332 8.66667 17.3333C6.36812 17.3333 4.16372 16.4202 2.53841 14.7949C0.913092 13.1696 0 10.9652 0 8.66667C0 6.36812 0.913092 4.16372 2.53841 2.53841C4.16372 0.913092 6.36812 0 8.66667 0ZM8.66667 2.66667C5.33333 2.66667 2.66667 5.33333 2.66667 8.66667C2.66667 12 5.33333 14.6667 8.66667 14.6667C12 14.6667 14.6667 12 14.6667 8.66667C14.6667 5.33333 12 2.66667 8.66667 2.66667Z" fill-opacity="0.8"></path></svg>'
      ]),
      ($p = [
        "<svg",
        ' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"',
        '><path d="M14 20C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0H8V7L5.5 5.5L3 7V0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H14Z" fill-opacity="0.8"></path></svg>'
      ]),
      (jp = [
        "<svg",
        ' class="',
        '" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>'
      ])
    P(Cp, "@astrojs/solid-js")
    P(co, "@astrojs/solid-js")
    P(Zn, "@astrojs/solid-js")
    P(Ep, "@astrojs/solid-js")
    P(po, "@astrojs/solid-js")
    P(ir, "@astrojs/solid-js")
    ;(Pp = [
      "<div",
      ' class="sm:shadow-dark-300 z-20 hidden max-h-[71vh]  w-4/5  overflow-y-hidden   bg-white sm:absolute sm:top-full sm:block sm:rounded-xl sm:border sm:shadow-xl"><div class="hidden sm:flex"><div class="border-netural-200 w-2/5 border-r"><div class="w-full"><h2 class="mt-2 text-2xl capitalize ltr:ml-4 rtl:mr-4">',
      '</h2><div class="mt-2 border-t border-neutral-200 pt-2"><div class=""><label for="" class="block p-4"><input type="text" class="w-full rounded-full border border-neutral-300 py-2 px-4 capitalize"',
      '></label><ul class="max-h-[50vh] min-h-[100px] overflow-y-auto pb-32">',
      '</ul></div></div></div></div><div class="w-3/5"><div class="w-full"><h2 class="mt-2 text-2xl capitalize ltr:ml-2 rtl:mr-2 ">',
      '</h2><div class="mt-2 w-full border-t border-neutral-200 pt-2"><div class="p-2"><ul class="grid max-h-[55vh] grid-cols-6 justify-start  gap-2 overflow-y-auto  pb-24">',
      "</ul></div></div></div></div></div></div>"
    ]),
      (_p = [
        "<div",
        ' class="shadow-dark-700 absolute z-20 w-72 bg-neutral-100 p-4 text-right shadow-xl ltr:right-0 rtl:left-0">',
        "</div>"
      ]),
      (Op = [
        "<div",
        '><label for="" class="block p-4"><input type="text" class="w-full rounded-full border border-neutral-300 py-2 px-4 capitalize "',
        '></label><ul class="h-[95vh] overflow-y-auto pb-96">',
        "</ul></div>"
      ]),
      (Fp = [
        "<div",
        ' class="p-2"><p class="py-2 pl-2 text-2xl ">',
        '</p><ul class="grid  h-[80vh] grid-cols-6 place-content-start gap-2 overflow-y-scroll pb-36 ">',
        "</ul></div>"
      ]),
      (Tp = [
        "<div",
        ' id="mobileMenu" class="r-0  bottom-0 left-0 top-0 right-0   z-10 w-full overflow-y-scroll bg-white sm:hidden "><ul class="flex justify-between "><li class="w-full text-center"><button class="',
        '">',
        '</button></li><li class="w-full text-center"><button class="',
        '">',
        "</button></li></ul><!--#-->",
        "<!--/--><!--#-->",
        "<!--/--></div>"
      ]),
      (Np = [
        "<div",
        ' class="mx-auto w-full" id="menu"><div class=" mx-auto flex w-full flex-wrap items-center px-4 py-2 "><div class="relative flex w-full items-center justify-between gap-3  print:hidden sm:w-5/6 ltr:sm:ml-auto rtl:sm:mr-auto"><div class="my-2 flex w-4/5 justify-between overflow-hidden  rounded-lg bg-neutral-200 outline outline-1 outline-gray-300 hover:outline-accent"><button class="flex w-full flex-grow items-center justify-between rounded-md pl-4"><span class="flex items-center"><!--#-->',
        '<!--/--><span class="text-xl capitalize">',
        '</span></span><span class="menuNumberInput w-[5ch] bg-gray-50 py-2 text-center" data-testid="chapterNavigation">',
        "</span></button></div><!--#-->",
        '<!--/--><div class="w-1/5 print:hidden"><div class=" relative w-max rounded-md ltr:ml-auto rtl:mr-auto "><button class="rounded   py-2  px-5 outline outline-1 outline-gray-300 hover:outline-accent" aria-label="Open Settings">',
        "</button><!--#-->",
        '<!--/--></div></div></div></div><div class="relative z-40">',
        "</div></div>"
      ]),
      (qa = ["<li", ' class="w-full"><button class="', '">', "</button></li>"]),
      (Rp = [
        "<li",
        ' class="w-full text-center text-xl" data-testid="menuChapter"><button data-testid="pickChapter" class="',
        '">',
        "</button></li>"
      ]),
      (Lp = [
        "<li",
        ' class="w-full text-center text-xl"><button class="',
        '">',
        "</button></li>"
      ]),
      (Mp = Za(async () => Promise.resolve().then(() => (Ia(), Ma)))),
      (fo = (e) => {
        let [t, { add: n, locale: r }] = Le(),
          [a, o] = I(!1),
          [i, s] = I(e.storeInterface.isOneBook() ? "chapter" : "book"),
          [l, p] = I(!1),
          [c, u] = I("")
        function f(h) {
          return e.storeInterface.currentChapObj()?.label == h
        }
        function b(h) {
          return e.storeInterface.getStoreVal("currentBook") == h
        }
        return x(
          Np,
          w(),
          d(
            g(po, {
              className:
                "fill-dark-900 inline-block  fill-current ltr:mr-2 rtl:ml-2"
            })
          ),
          d(e.storeInterface.currentBookObj()?.label),
          d(e.storeInterface.getStoreVal("currentChapter")),
          d(
            g(V, {
              get when() {
                return a()
              },
              get children() {
                return x(
                  Pp,
                  w(),
                  d(t("books")),
                  F("placeholder", d(t("searchBooks"), !0), !1) +
                    F("value", d(c(), !0), !1),
                  d(
                    g(ke, {
                      get each() {
                        return e.storeInterface.menuBookNames()
                      },
                      children: (h) =>
                        x(
                          qa,
                          w(),
                          ` w-full text-xl py-2 ltr:text-left rtl:text-right border-y border-gray-100 ltr:pl-4 rtl:pr-4 hover:bg-accent/10 focus:bg-accent/10 focus:font-bold ${
                            b(h.slug) ? "font-bold text-accent" : ""
                          }`,
                          d(h.label)
                        )
                    })
                  ),
                  d(t("chapters")),
                  d(
                    g(ke, {
                      get each() {
                        return e.storeInterface.possibleChapters()
                      },
                      children: (h, v) =>
                        x(
                          Rp,
                          w(),
                          `w-full p-3 hover:bg-accent/10 ${
                            f(h.label) ? "text-blue-400" : ""
                          }`,
                          d(h.label)
                        )
                    })
                  )
                )
              }
            })
          ),
          d(g(co, { className: "" })),
          d(
            g(V, {
              get when() {
                return l()
              },
              get children() {
                return x(
                  _p,
                  w(),
                  d(
                    g(Qa, {
                      get fallback() {
                        return g(ir, {})
                      },
                      get children() {
                        return g(Mp, {
                          get fetchHtml() {
                            return e.storeInterface.fetchHtml
                          },
                          get mutateStoreText() {
                            return e.storeInterface.mutateStoreText
                          },
                          get currentBookObj() {
                            return e.storeInterface.currentBookObj
                          },
                          get setPrintWholeBook() {
                            return e.setPrintWholeBook
                          },
                          get user() {
                            return e.user
                          },
                          get repo() {
                            return e.repositoryName
                          }
                        })
                      }
                    })
                  )
                )
              }
            })
          ),
          d(
            g(V, {
              get when() {
                return a()
              },
              get children() {
                return x(
                  Tp,
                  w(),
                  `${
                    i() == "book"
                      ? "w-full border-b-2 border-b-accent font-bold text-accent"
                      : "underline"
                  }  py-3 text-xl capitalize`,
                  d(t("books")),
                  `${
                    i() == "chapter"
                      ? "w-full border-b-2 border-b-accent font-bold text-accent"
                      : "underline"
                  } py-3 text-xl capitalize`,
                  d(t("chapters")),
                  d(
                    g(V, {
                      get when() {
                        return i() == "book"
                      },
                      get children() {
                        return x(
                          Op,
                          w(),
                          F("placeholder", d(t("searchBooks"), !0), !1) +
                            F("value", d(c(), !0), !1),
                          d(
                            g(ke, {
                              get each() {
                                return e.storeInterface.menuBookNames()
                              },
                              children: (h) =>
                                x(
                                  qa,
                                  w(),
                                  ` w-full text-xl py-2 text-left border-y border-gray-100 pl-4 hover:bg-accent/10 focus:bg-accent/10 ${
                                    b(h.slug) ? "font-bold text-accent" : ""
                                  }`,
                                  d(h.label)
                                )
                            })
                          )
                        )
                      }
                    })
                  ),
                  d(
                    g(V, {
                      get when() {
                        return i() == "chapter"
                      },
                      get children() {
                        return x(
                          Fp,
                          w(),
                          d(e.storeInterface.getMenuBook()?.label),
                          d(
                            g(ke, {
                              get each() {
                                return e.storeInterface.possibleChapters()
                              },
                              children: (h, v) =>
                                x(
                                  Lp,
                                  w(),
                                  `w-full p-3 hover:bg-accent/10 ${
                                    f(h.label) ? "text-blue-400" : ""
                                  }`,
                                  d(h.label)
                                )
                            })
                          )
                        )
                      }
                    })
                  )
                )
              }
            })
          )
        )
      })
    P(fo, "@astrojs/solid-js")
    ;(Ip = [
      "<div",
      ' class="hidden h-full  w-16 flex-shrink-0 print:hidden sm:block"> </div>'
    ]),
      (Dp = [
        "<div",
        ' class="',
        '"><a',
        ' href="',
        '" class="',
        '">',
        "</a></div>"
      ]),
      (mo =
        "z-10 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(255,255,255,.8)]"),
      (Bp = `${mo} w-full p-4 md:p-0 bottom-0 ltr:left-0 rtl:right-0  print:hidden md:bg-none md:h-full md:w-16 md:static  fixed`),
      (Hp =
        "rounded-full bg-neutral-50 border-zinc-300 h-14 shadow-xl text-center grid shadow-dark-700 w-14 place-content-center md:border-none md:rounded-none md:h-full md:bg-zinc-200 md:shadow-none md:w-16 hover:text-accent focus:text-accent md:text-slate-800 cursor-pointer md:fixed ltr:md:left-8 rtl:md:right-8"),
      (zp = `${mo} p-4 md:p-0 ltr:right-0 rtl:left-0 bottom-0  print:hidden md:h-full  md:static fixed`),
      (Up =
        "border border-solid rounded-full ml-auto  bg-neutral-50 border-zinc-300 h-14 shadow-xl text-center grid shadow-dark-700 w-14 place-content-center md:border-none md:rounded-none md:h-full md:bg-zinc-200 md:shadow-none md:w-16 hover:text-accent focus:text-accent md:text-slate-800 cursor-pointer md:fixed ltr:md:right-8 rtl:md:left-8")
    P(ot, "@astrojs/solid-js")
    Be = {
      getRepoIndex: ({ user: e, repo: t }) => (
        (J = J || Me()), `${J}/repoIndex?user=${e}&repo=${t}`
      ),
      getRepoHtml: ({ user: e, repo: t, book: n, chapter: r }) => (
        (J = J || Me()),
        `${J}/getHtmlForChap?user=${e}&repo=${t}&book=${n}&chapter=${r}`
      ),
      getHtmlForTw: ({ user: e, repo: t, navSection: n }) => (
        (J = J || Me()), `${J}/getHtmlForTw?user=${e}&repo=${t}&navSection=${n}`
      ),
      getHtmlForTm: ({ user: e, repo: t, navSection: n }) => (
        (J = J || Me()), `${J}/getHtmlForTm?user=${e}&repo=${t}&navSection=${n}`
      ),
      getHtmlForCommentaryIndividualSection: ({
        file: e,
        user: t,
        repo: n
      }) => (
        (J = J || Me()),
        `${J}/getHtmlForCommentaryIndividualSection?user=${t}&repo=${n}&file=${e}`
      ),
      isValidRepo: ({ user: e, repo: t }) => (
        (J = J || Me()), `${J}/isValidRepo?user=${e}&repo=${t}`
      )
    }
    ;(Gp = [
      "<div",
      ' style="',
      '" id="previewPane" class="theText absolute z-[100] mx-auto max-h-[50vh]  w-1/2 overflow-y-auto border border-accent bg-white p-2 shadow  shadow-neutral-500 md:w-1/3"><div class="relative h-full w-full"><button data-testid="closePreviewPane" class="absolute top-0 right-0 text-red-300 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button></div><div class="p-6">',
      "</div></div>"
    ]),
      ([Va, or] = I({ x: "0px", y: "0px" })),
      ([Xp, Jt] = I(!1)),
      ([Yp, sr] = I("")),
      ([fu, go] = I())
    P(vo, "@astrojs/solid-js")
    P(wo, "@astrojs/solid-js")
    P(bo, "@astrojs/solid-js")
    P(yo, "@astrojs/solid-js")
    ;(Zp = [
      "<div",
      ' class="mx-auto  w-full max-w-[1400px] px-4"><div class="relative flex  h-full content-center  justify-center gap-2"><!--#-->',
      '<!--/--><div class="theText mx-auto mb-24 h-full  max-w-[85ch] overflow-y-auto bg-inherit pr-1 pt-2 text-lg leading-relaxed print:h-min print:overflow-y-visible  print:pb-4  sm:px-2 md:mr-auto md:ml-0 md:w-4/5 md:max-w-[75ch] md:text-2xl xl:mx-auto">',
      "</div><!--#-->",
      "<!--/--></div></div>"
    ]),
      (Qp = [
        "<div",
        ' id="wholeBook" class=" theText  mx-auto  max-w-[85ch] !overflow-y-visible bg-inherit text-lg leading-relaxed print:pb-4 sm:px-8 md:max-w-[75ch] md:text-2xl">',
        "</div>"
      ])
    P(ko, "@astrojs/solid-js")
    nd = [
      "<div",
      ' id="readerWrapper" class=" mx-auto grid max-h-full w-full overflow-hidden print:block  print:overflow-visible md:justify-center"><div class=" sticky top-0 z-40 w-full   border-b border-b-neutral-200 bg-white">',
      "</div><!--#-->",
      "<!--/--></div>"
    ]
    P(Ao, "@astrojs/solid-js")
    ;(id = [
      "<button",
      ' class="absolute top-2 right-12 rounded-lg border p-2  hover:text-red-600"><svg data-id="closeXcircle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"></path></svg></button>'
    ]),
      ($o = ["<ul", ' class="mt-2">', "</ul>"]),
      (ad = [
        "<div",
        ' class="',
        '"><div class="sticky top-0 flex content-center items-center bg-neutral-50"><div class="relative  mb-2 w-full"><!--#-->',
        '<!--/--><span class="',
        '"><svg data-id="mangifying-glass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg><input type="text" class="mx-auto ml-1 inline-block w-11/12 rounded-full border  p-1 py-4 pl-10  text-darkAccent " placeholder="Search words.."></span></div></div><!--#-->',
        "<!--/--></div>"
      ]),
      (jo = [
        "<li",
        ' class=" "><a class="ml-2 inline-block px-1 py-2 text-accent underline" href="',
        '"',
        ">",
        "</a></li>"
      ]),
      (od = [
        "<div",
        ' class="sticky top-0 flex content-center items-center bg-neutral-50"><input type="text" class="mt-2 ml-1 inline-block w-11/12 rounded-full  border p-2 py-4  text-darkAccent sm:mt-4" placeholder="Search words.."></div>'
      ])
    P(Co, "@astrojs/solid-js")
    P(Eo, "@astrojs/solid-js")
    ;(sd = [
      "<div",
      ' id="previewPane" class="theText absolute z-30 mx-auto max-h-[50vh]  w-1/2 overflow-y-scroll border border-accent bg-white p-2 shadow  shadow-neutral-500 lg:w-2/5 " style="',
      '"><div class="relative h-full w-full"><button class="absolute top-0 right-0 text-red-300 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button></div><div class="p-6">',
      "</div></div>"
    ]),
      (ld = [
        "<div",
        ' class="theTextWrapper h-full px-2  print:h-min print:overflow-y-visible sm:pl-4 sm:pr-0"><div class="relative h-full overflow-y-scroll   sm:flex "><div class="theText tw-theText h-full w-full scroll-pt-16 overflow-y-scroll pt-16  sm:w-4/5 sm:scroll-pt-0  sm:pt-0">',
        '</div><div class=" sm:hidden">',
        '</div><div class="customScrollBar sticky top-0 right-0 ml-auto  hidden h-full w-1/5 overflow-y-auto print:hidden sm:block">',
        "</div></div></div>"
      ])
    P(Po, "@astrojs/solid-js")
    ;(cd = ["<nav", "><ul>", "</ul></nav>"]),
      (pd = [
        "<li",
        ' class="navSection"><div class="flex"><!--#-->',
        '<!--/--><button aria-controls="',
        '"',
        ' class="flex">',
        "</button></div><!--#-->",
        "<!--/--></li>"
      ]),
      (dd = [
        "<svg",
        ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="',
        '"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path></svg>'
      ]),
      (ud = [
        "<div",
        ' class="accordion-transition" style="',
        '"',
        ' id="',
        '">',
        "</div>"
      ]),
      (fd = ["<span", ' class="text-gray-800">', "</span>"]),
      (md = ["<a", ' class=" text-blue-700"', ">", "</a>"]),
      (hd = ["<a", ' class="text-blue-700"', ">", "</a>"]),
      (gd = ["<p", "> whoops!</p>"])
    P(lr, "@astrojs/solid-js")
    ;(wd = [
      "<div",
      ' class="h-full px-4 md:px-4 md:py-4"><div class="sticky top-0 z-20 pt-4 md:hidden md:pt-0 "><button class="',
      '">See outline <!--#-->',
      '<!--/--></button></div><div class="',
      '"><div class="theText mr-auto h-full w-full max-w-[70ch] md:w-4/5 lg:w-3/5">',
      "</div><!--#-->",
      "<!--/--></div></div>"
    ]),
      (bd = [
        "<button",
        ' class="fixed top-8 right-8 z-20 flex items-center gap-2 rounded-md border border-solid border-white  bg-darkAccent px-4 py-2 capitalize text-white rtl:flex-row-reverse md:hidden ">Close outline <!--#-->',
        "<!--/--></button>"
      ]),
      (yd = [
        "<div",
        ' class="h-full w-0  md:sticky md:top-0 md:w-2/5 md:bg-transparent lg:w-1/5"><!--#-->',
        '<!--/--><nav aria-label="Translation Manual Navigation" class="',
        '"><div class="h-full">',
        "</div></nav></div>"
      ])
    P(_o, "@astrojs/solid-js")
    kd = [
      "<div",
      ' data-resourcetype="',
      '" data-testid="page-container" id="commonWrapper" class="',
      '">',
      "</div>"
    ]
    P(Oo, "@astrojs/solid-js")
    ;(Sd = [
      { code: "en", name: "English" },
      { code: "es", name: "Espa\xF1ol" }
    ]),
      (Jn = Sd)
    ;(Ed = Oe()),
      (cr = _e(async (e, t, n) => {
        let r = e.createAstro(Ed, t, n)
        r.self = cr
        let { title: a, use100vh: o, textDir: i } = r.props,
          s = Fo(r.request),
          l = await rr(
            Object.assign({
              "../translations/en.json": () =>
                Promise.resolve().then(() => (Dt(), It)),
              "../translations/es.json": () =>
                Promise.resolve().then(() => (Ht(), Bt))
            }),
            `../translations/${s}.json`
          ),
          p = { [s]: l.default },
          c = JSON.stringify(Gn)
        return ee`<html${de(s, "lang")}${de(i, "dir")}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image" href="/favicon-32x32.png">
    <link rel="preload" as="font" type="font/woff2" href="/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-regular.woff2" crossorigin>
    <link rel="preload" as="font" type="font/woff2" href="/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-700.woff2" crossorigin>
    <meta name="generator"${de(r.generator, "content")}>
    <title>${a}</title>
    <meta name="description" content="A site to read rendered USFM">
    
    ${console.log({ pwaInfo: Gn })}
    ${Gn}
  ${Br(e)}</head>
  <body>
    <div${de(o ? "print:block print:pb-20" : "", "class")} id="pageWrapper"${de(
          c,
          "data-pwa"
        )}>
      ${ie(e, "Nav", lo, { preferredLocale: s, initialDict: p })}
      ${pe(e, n.default)}
      <!-- <ReloadPrompt /> -->
    </div>
  </body></html>`
      }, "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/layouts/Layout.astro")),
      (Pd = Oe()),
      (To = _e(async (e, t, n) => {
        let r = e.createAstro(Pd, t, n)
        return (
          (r.self = To),
          ee`${ie(
            e,
            "Layout",
            cr,
            { title: "Read on Web", textDir: "ltr" },
            {
              default: (a) => ee`${Fe(a)}<main>
    <!-- <div class="relative">
      <img src={homePageBg} alt="" />
      <span
        class="absolute w-full top-0 bottom-0 bg-black/30 z-10"
        aria-hidden="true"></span>
      <h1
        class="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl z-10 w-full px-8 text-center"
      >
        {i18nDict[preferredLocale].homeTitle}
      </h1>
    </div>
    <div class="w-11/12 mx-auto md:w-4/5 max-w-container py-12">
      <h2 class="text-2xl text-center">
        Welcome to BibleTranslationTools.org!
      </h2>
      <hr
        class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700 w-2/5 mx-auto"
      />
      <p>
        BibleTranslationTools.org is an online repository for open-licensed
        Biblical content in every language. Contributors from all over the world
        use this site to work together to create, translate, and distribute
        unrestricted discipleship resources.
      </p>
      <div class="flex flex-col justify-center items-center sm:flex-row mt-12">
        <div class="w-1/3 text-center grid place-content-center">
          <h2 class="mb-8 text-xl">Translate</h2>
          <a href="https://bibleineverylanguage.org/processes/" target="_blank"
            ><img
              src="https://cdn.bibleineverylanguage.org/wp-content/uploads/2017/09/mast_diagram.png"
              alt="MAST Icon"
              style="height: 192px;"
            />
          </a>
        </div>
        <div class="w-1/3 text-center grid place-content-center">
          <h2 class="mb-8 text-xl">Resources</h2>
          <a href="https://bibleineverylanguage.org/resources/"
            ><img
              src="https://cdn.bibleineverylanguage.org/wp-content/uploads/2017/09/ulb.png "
              style="height: 192px;"
              alt="ULB Icon"
            />
          </a>
        </div>
        <div class="w-1/3 text-center grid place-content-center">
          <h2 class="mb-8 text-xl">Browse</h2>
          <a href="https://bibleineverylanguage.org/"
            ><img
              src="https://bibleineverylanguage.org/wp-content/uploads/2017/07/bible-red-ribbon-prepped.png"
              alt="BIEL"
              style="height: 192px;"
            />
          </a>
        </div>
      </div>
    </div>
  </main>
  <footer class="bg-black py-8" role="contentinfo">
    <div
      class="max-w-container mx-auto w-3/4 sm:w-1/2 grid place-content-center"
    >
      <nav class="mb-12 w-3/4 mx-auto" role="navigation">
        <ul class="flex text-white mx-auto justify-between">
          <li class="">
            <a href="https://bibleineverylanguage.org/">About</a>
          </li>
          <li class="">
            <a href="https://bibleineverylanguage.org/translations/">Browse</a>
          </li>
          <li class="">
            <a href="https://bibleineverylanguage.org/contact/">Contact</a>
          </li>
        </ul>
      </nav>
      <div class="">
        <p class="text-white/60 text-xs text-center">
          <a
            class="block mx-auto w-max"
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            <img
              alt="CC BY-SA License"
              style="border-width:0"
              src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
            />
          </a>
          <br />
          <span
            >The content of this page ("<a
              href="https://bibletranslationtools.org">BibleTranslationTools</a
            >") from
          </span>
          <span property="cc:attributionName">Wycliffe Associates</span> is licensed
          under a
          <br /><a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
            >Creative Commons Attribution-ShareAlike 4.0 International License</a
          >. Original work available at http://door43.org.
        </p>
      </div>
    </div> -->
  </main>`
            }
          )}`
        )
      }, "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/pages/index.astro")),
      (_d =
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/pages/index.astro"),
      (Od = ""),
      (No = Object.freeze(
        Object.defineProperty(
          { __proto__: null, default: To, file: _d, url: Od },
          Symbol.toStringTag,
          { value: "Module" }
        )
      )),
      (Fd = Oe()),
      (Ro = _e(async (e, t, n) => {
        let r = e.createAstro(Fd, t, n)
        r.self = Ro
        let { repo: a, user: o } = r.params
        Wp(r.url.origin)
        let i = new Response(null, { status: 404 })
        if (!a || !o) return i
        ;(a = String(a)), (o = String(o))
        let s = await Jp({ user: o, repo: a })
        if (!s) return i
        let l = ["bible", "tn", "tq", "commentary"].includes(s.resourceType),
          p = s.resourceType === "tw",
          c = { repoIndex: s, templateType: l ? "BIBLE" : p ? "TW" : "TM" }
        if (c.templateType === "TW") {
          let h = $d({
            navParam: r.url.searchParams.get("section"),
            repoIndex: s
          })
          if (!h) return i
          let v = await ho({ navSection: h, user: o, repo: a })
          if (!v) return i
          ;(c.initialHtml = v),
            (c.initialPage = h),
            (c.pageTitle = `${o}-${a}`),
            (c.user = o),
            (c.repo = a)
        } else if (c.templateType === "BIBLE") {
          let { book: h, chapter: v } = Ad({
            book: r.url.searchParams.get("book"),
            chapter: r.url.searchParams.get("chapter"),
            repoIndex: s
          })
          if (!h && !v) return i
          let y = await qp({ user: o, repo: a, book: h, chapter: v })
          if (!y) return i
          Cd({ repoIndex: s, book: h, chapter: v, initialHtml: y }),
            (c.initialHtml = y),
            (c.pageTitle = `${o}-${a}-${h}-${v}`),
            (c.book = h),
            (c.chapter = v)
        } else if (c.templateType === "TM") {
          let h = jd({
            navParam: r.url.searchParams.get("section"),
            repoIndex: s
          })
          if (!h) return i
          let v = await Vp({ navSection: h, user: o, repo: a })
          if (!v) return i
          ;(c.pageTitle = `${o}-${a}-${h}`),
            (c.initialPage = h),
            (c.initialHtml = v)
        }
        let u = Fo(r.request),
          f = await rr(
            Object.assign({
              "../../../translations/en.json": () =>
                Promise.resolve().then(() => (Dt(), It)),
              "../../../translations/es.json": () =>
                Promise.resolve().then(() => (Ht(), Bt))
            }),
            `../../../translations/${u}.json`
          ),
          b = { [u]: f.default }
        return ee`${ie(
          e,
          "Layout",
          cr,
          { title: c.pageTitle, use100vh: !0, textDir: s.textDirection },
          {
            default: (h) =>
              ee`${ie(
                h,
                "CommonWrapper",
                Oo,
                {
                  resourceType: s.resourceType,
                  "client:load": !0,
                  "client:component-hydration": "load",
                  "client:component-path": "@components",
                  "client:component-export": "CommonWrapper"
                },
                {
                  default: (v) =>
                    ee`${
                      c.templateType === "BIBLE" &&
                      ee`${ie(v, "ReaderWrapper", Ao, {
                        "client:load": !0,
                        firstBookKey: c.book,
                        firstChapterToShow: c.chapter,
                        repoData: s,
                        user: o,
                        repositoryName: a,
                        preferredLocale: u,
                        initialDict: b,
                        "client:component-hydration": "load",
                        "client:component-path": "@components",
                        "client:component-export": "ReaderWrapper"
                      })}`
                    }${
                      c.templateType === "TW" &&
                      ee`${ie(v, "TranslationWords", Po, {
                        "client:load": !0,
                        ...c,
                        repoIndex: s,
                        "client:component-hydration": "load",
                        "client:component-path": "@components",
                        "client:component-export": "TranslationWords"
                      })}`
                    }${
                      c.templateType === "TM" &&
                      ee`${Fe(
                        v
                      )}<div class="tm-wrapper px- mx-auto h-full  max-w-[1400px] ">
          ${ie(v, "TranslationManual", _o, {
            "client:load": !0,
            initialHtml: c.initialHtml,
            templateType: c.templateType,
            initialPage: c.initialPage,
            repoIndex: c.repoIndex,
            pageTitle: c.pageTitle,
            "client:component-hydration": "load",
            "client:component-path": "@components",
            "client:component-export": "TranslationManual"
          })}
        </div>`
                    }`
                }
              )}`
          }
        )}`
      }, "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/pages/read/[user]/[repo].astro")),
      (Td =
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/pages/read/[user]/[repo].astro"),
      (Nd = "/read/[user]/[repo]"),
      (Lo = Object.freeze(
        Object.defineProperty(
          { __proto__: null, default: Ro, file: Td, url: Nd },
          Symbol.toStringTag,
          { value: "Module" }
        )
      ))
  })
et()
zt()
var Rd =
  typeof process == "object" &&
  Object.prototype.toString.call(process) === "[object process]"
function Ld() {
  return new Proxy(
    {},
    {
      get: (e, t) => {
        console.warn(
          `Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`
        )
      }
    }
  )
}
Rd || (process.env = Ld())
function Do(e) {
  let t = new Ct(e)
  return {
    onRequest: async ({ request: r, next: a, ...o }) => {
      process.env = o.env
      let { pathname: i } = new URL(r.url)
      if (e.assets.has(i)) return a(r)
      let s = t.match(r, { matchNotFound: !0 })
      if (s) {
        Reflect.set(
          r,
          Symbol.for("astro.clientAddress"),
          r.headers.get("cf-connecting-ip")
        ),
          Reflect.set(r, Symbol.for("runtime"), {
            ...o,
            name: "cloudflare",
            next: a
          })
        let l = await t.render(r, s)
        if (t.setCookieHeaders)
          for (let p of t.setCookieHeaders(l)) l.headers.append("Set-Cookie", p)
        return l
      }
      return new Response(null, { status: 404, statusText: "Not found" })
    }
  }
}
var Mo = Object.freeze(
    Object.defineProperty(
      { __proto__: null, createExports: Do },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  pr = new WeakMap()
function Md(e) {
  if (pr.has(e)) return pr.get(e)
  let t = {
    c: 0,
    get id() {
      return "s" + this.c.toString()
    }
  }
  return pr.set(e, t), t
}
function Id(e) {
  let t = e.id
  return e.c++, t
}
var Dd = (e) => e.trim().replace(/[-_]([a-z])/g, (t, n) => n.toUpperCase())
function Bd(e, t, n) {
  if (typeof e != "function") return !1
  let { html: r } = Bo.call(this, e, t, n)
  return typeof r == "string"
}
function Bo(e, t, { default: n, ...r }, a) {
  let o = a?.hydrate ? Id(Md(this.result)) : "",
    i = no(
      () => {
        let s = {}
        for (let [p, c] of Object.entries(r)) {
          let u = Dd(p)
          s[u] = x(`<astro-slot name="${u}">${c}</astro-slot>`)
        }
        let l = {
          ...t,
          ...s,
          children: n != null ? x(`<astro-slot>${n}</astro-slot>`) : n
        }
        return g(e, l)
      },
      { renderId: o }
    )
  return { attrs: { "data-solid-render-id": o }, html: i }
}
var Hd = { check: Bd, renderToStaticMarkup: Bo },
  zd = new Map([
    ["src/pages/index.astro", No],
    ["src/pages/read/[user]/[repo].astro", Lo]
  ]),
  Ud = [
    Object.assign(
      {
        name: "astro:jsx",
        serverEntrypoint: "astro/jsx/server.js",
        jsxImportSource: "astro"
      },
      { ssr: hi }
    ),
    Object.assign(
      {
        name: "@astrojs/solid-js",
        clientEntrypoint: "@astrojs/solid-js/client.js",
        serverEntrypoint: "@astrojs/solid-js/server.js",
        jsxImportSource: "solid-js"
      },
      { ssr: Hd }
    )
  ],
  Ho = Object.assign(
    ui({
      adapterName: "@astrojs/cloudflare",
      routes: [
        {
          file: "",
          links: ["_astro/index.99141e3b.css"],
          scripts: [{ type: "external", value: "_astro/hoisted.026e8751.js" }],
          routeData: {
            route: "/",
            type: "page",
            pattern: "^\\/$",
            segments: [],
            params: [],
            component: "src/pages/index.astro",
            pathname: "/",
            _meta: { trailingSlash: "ignore" }
          }
        },
        {
          file: "",
          links: ["_astro/index.99141e3b.css"],
          scripts: [{ type: "external", value: "_astro/hoisted.fce8d717.js" }],
          routeData: {
            route: "/read/[user]/[repo]",
            type: "page",
            pattern: "^\\/read\\/([^/]+?)\\/([^/]+?)\\/?$",
            segments: [
              [{ content: "read", dynamic: !1, spread: !1 }],
              [{ content: "user", dynamic: !0, spread: !1 }],
              [{ content: "repo", dynamic: !0, spread: !1 }]
            ],
            params: ["user", "repo"],
            component: "src/pages/read/[user]/[repo].astro",
            _meta: { trailingSlash: "ignore" }
          }
        }
      ],
      base: "/",
      markdown: {
        drafts: !1,
        syntaxHighlight: "shiki",
        shikiConfig: { langs: [], theme: "github-dark", wrap: !1 },
        remarkPlugins: [],
        rehypePlugins: [],
        remarkRehype: {},
        gfm: !0,
        smartypants: !0,
        contentDir:
          "file:///Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/content/"
      },
      pageMap: null,
      propagation: [
        [
          "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/Card.astro",
          "in-tree"
        ],
        [
          "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/global/Nav/Nav.astro",
          "in-tree"
        ],
        [
          "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/layouts/Layout.astro",
          "in-tree"
        ],
        [
          "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/pages/index.astro",
          "in-tree"
        ],
        [
          "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/pages/read/[user]/[repo].astro",
          "in-tree"
        ]
      ],
      renderers: [],
      entryModules: {
        "\0@astrojs-ssr-virtual-entry": "_@astrojs-ssr-virtual-entry.mjs",
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/translations/en.json":
          "_astro/en.6b4b9216.js",
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/translations/es.json":
          "_astro/es.498f1b2e.js",
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/Settings/Settings.tsx":
          "_astro/Settings.12c838ac.js",
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/global/Nav/LanguageChoices.tsx":
          "_astro/LanguageChoices.4fcaf97f.js",
        "@components": "_astro/index.1a728e92.js",
        "/astro/hoisted.js?q=0": "_astro/hoisted.026e8751.js",
        "@astrojs/solid-js/client.js": "_astro/client.f01c1a1a.js",
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/src/components/global/Nav/Header":
          "_astro/Header.3e46a0c2.js",
        "/astro/hoisted.js?q=1": "_astro/hoisted.fce8d717.js",
        "/Users/willkelly/Documents/Work/Code/read.bibletranslationtools.org-v2/node_modules/.pnpm/workbox-window@6.5.4/node_modules/workbox-window/build/workbox-window.prod.es5.mjs":
          "_astro/workbox-window.prod.es5.295a6886.js",
        "astro:scripts/before-hydration.js": ""
      },
      assets: [
        "/_astro/logo.69dbbb18.png",
        "/_astro/logo.b8f96b63.webp",
        "/_astro/index.99141e3b.css",
        "/_headers.txt",
        "/favicon-32x32.png",
        "/favicon.svg",
        "/manifest.webmanifest",
        "/robots.txt",
        "/sw.js",
        "/$server_build/manifest.webmanifest",
        "/$server_build/registerSW.js",
        "/_astro/Header.3e46a0c2.js",
        "/_astro/LanguageChoices.4fcaf97f.js",
        "/_astro/Settings.12c838ac.js",
        "/_astro/TranslationManual.71f387ee.js",
        "/_astro/client.f01c1a1a.js",
        "/_astro/en.6b4b9216.js",
        "/_astro/es.498f1b2e.js",
        "/_astro/hoisted.026e8751.js",
        "/_astro/hoisted.fce8d717.js",
        "/_astro/index.059f20e0.js",
        "/_astro/index.1a728e92.js",
        "/_astro/preload-helper.101896b7.js",
        "/_astro/pwa.94fe9b78.js",
        "/_astro/web.204fb416.js",
        "/_astro/workbox-window.prod.es5.295a6886.js",
        "/flags/br.svg",
        "/flags/en.svg",
        "/flags/es.svg",
        "/flags/fr.svg",
        "/flags/id.svg",
        "/flags/ru.svg",
        "/icons/icon-128x128.png",
        "/icons/icon-144x144.png",
        "/icons/icon-152x152.png",
        "/icons/icon-192x192.png",
        "/icons/icon-384x384.png",
        "/icons/icon-48x48.png",
        "/icons/icon-512x512.png",
        "/icons/icon-72x72.png",
        "/icons/icon-96x96.png",
        "/$server_build/_astro/index.99141e3b.css",
        "/$server_build/_astro/logo.69dbbb18.png",
        "/$server_build/_astro/logo.b8f96b63.webp",
        "/$server_build/chunks/LanguageChoices.c67cdace.mjs",
        "/$server_build/chunks/Settings.faf5f342.mjs",
        "/$server_build/chunks/astro.5a976bc3.mjs",
        "/$server_build/chunks/en.c5f44126.mjs",
        "/$server_build/chunks/es.df234236.mjs",
        "/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-700.woff",
        "/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-700.woff2",
        "/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-italic.woff",
        "/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-italic.woff2",
        "/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-regular.woff",
        "/fonts/atkinson/atkinson-hyperlegible-v10-latin-ext_latin-regular.woff2",
        "/$server_build/chunks/pages/all.43f04232.mjs"
      ]
    }),
    { pageMap: zd, renderers: Ud }
  ),
  Wd = void 0,
  qd = Do(Ho),
  xu = qd.onRequest,
  Io = "start"
Io in Mo && Mo[Io](Ho, Wd)
export { xu as onRequest, zd as pageMap, Ud as renderers }
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
