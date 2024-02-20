var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _parseMarkdown, parseMarkdown_fn, _onError, onError_fn;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = window, e$6 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), n$5 = /* @__PURE__ */ new WeakMap();
let o$6 = class o {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$6 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = n$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && n$5.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new o$6("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$4 = (t2, ...e2) => {
  const n2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, n3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[n3 + 1], t2[0]);
  return new o$6(n2, t2, s$3);
}, S$1 = (s2, n2) => {
  e$6 ? s2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o3 = t$4.litNonce;
    void 0 !== o3 && n3.setAttribute("nonce", o3), n3.textContent = e2.cssText, s2.appendChild(n3);
  });
}, c$1 = e$6 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$5 = window, r$1 = e$5.trustedTypes, h$1 = r$1 ? r$1.emptyScript : "", o$5 = e$5.reactiveElementPolyfillSupport, n$4 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? h$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, a$1 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: n$4, reflect: false, hasChanged: a$1 }, d$1 = "finalized";
let u$1 = class u extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this._$Eu();
  }
  static addInitializer(t2) {
    var i2;
    this.finalize(), (null !== (i2 = this.h) && void 0 !== i2 ? i2 : this.h = []).push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      void 0 !== e2 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = "symbol" == typeof t2 ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      void 0 !== e2 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty(d$1))
      return false;
    this[d$1] = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), void 0 !== t2.h && (this.h = [...t2.h]), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(c$1(i3));
    } else
      void 0 !== i2 && s2.push(c$1(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  _$Eu() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t2 = this.constructor.h) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    (null !== (i2 = this._$ES) && void 0 !== i2 ? i2 : this._$ES = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s2 = t2.hostConnected) || void 0 === s2 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostConnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostDisconnected) || void 0 === i2 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$2) {
    var e2;
    const r2 = this.constructor._$Ep(t2, s2);
    if (void 0 !== r2 && true === s2.reflect) {
      const h2 = (void 0 !== (null === (e2 = s2.converter) || void 0 === e2 ? void 0 : e2.toAttribute) ? s2.converter : n$4).toAttribute(i2, s2.type);
      this._$El = t2, null == h2 ? this.removeAttribute(r2) : this.setAttribute(r2, h2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2;
    const e2 = this.constructor, r2 = e2._$Ev.get(t2);
    if (void 0 !== r2 && this._$El !== r2) {
      const t3 = e2.getPropertyOptions(r2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== (null === (s2 = t3.converter) || void 0 === s2 ? void 0 : s2.fromAttribute) ? t3.converter : n$4;
      this._$El = r2, this[r2] = h2.fromAttribute(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    void 0 !== t2 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || a$1)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), true === s2.reflect && this._$El !== t2 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
        var i3;
        return null === (i3 = t3.hostUpdate) || void 0 === i3 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    null === (i2 = this._$ES) || void 0 === i2 || i2.forEach((t3) => {
      var i3;
      return null === (i3 = t3.hostUpdated) || void 0 === i3 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this._$EC && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
u$1[d$1] = true, u$1.elementProperties = /* @__PURE__ */ new Map(), u$1.elementStyles = [], u$1.shadowRootOptions = { mode: "open" }, null == o$5 || o$5({ ReactiveElement: u$1 }), (null !== (s$2 = e$5.reactiveElementVersions) && void 0 !== s$2 ? s$2 : e$5.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$3;
const i$3 = window, s$1 = i$3.trustedTypes, e$4 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, o$4 = "$lit$", n$3 = `lit$${(Math.random() + "").slice(9)}$`, l$1 = "?" + n$3, h = `<${l$1}>`, r = document, u2 = () => r.createComment(""), d = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, c = Array.isArray, v = (t2) => c(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), a = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y = /^(?:script|style|textarea|title)$/i, w = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = w(1), T = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), E = /* @__PURE__ */ new WeakMap(), C = r.createTreeWalker(r, 129, null, false);
function P(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== e$4 ? e$4.createHTML(i2) : i2;
}
const V = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let l2, r2 = 2 === i2 ? "<svg>" : "", u3 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let d2, c2, v2 = -1, a2 = 0;
    for (; a2 < s3.length && (u3.lastIndex = a2, c2 = u3.exec(s3), null !== c2); )
      a2 = u3.lastIndex, u3 === f ? "!--" === c2[1] ? u3 = _ : void 0 !== c2[1] ? u3 = m : void 0 !== c2[2] ? (y.test(c2[2]) && (l2 = RegExp("</" + c2[2], "g")), u3 = p) : void 0 !== c2[3] && (u3 = p) : u3 === p ? ">" === c2[0] ? (u3 = null != l2 ? l2 : f, v2 = -1) : void 0 === c2[1] ? v2 = -2 : (v2 = u3.lastIndex - c2[2].length, d2 = c2[1], u3 = void 0 === c2[3] ? p : '"' === c2[3] ? $ : g) : u3 === $ || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l2 = void 0);
    const w2 = u3 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += u3 === f ? s3 + h : v2 >= 0 ? (e2.push(d2), s3.slice(0, v2) + o$4 + s3.slice(v2) + n$3 + w2) : s3 + n$3 + (-2 === v2 ? (e2.push(void 0), i3) : w2);
  }
  return [P(t2, r2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), e2];
};
class N {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let h2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const c2 = t2.length - 1, v2 = this.parts, [a2, f2] = V(t2, i2);
    if (this.el = N.createElement(a2, e2), C.currentNode = this.el.content, 2 === i2) {
      const t3 = this.el.content, i3 = t3.firstChild;
      i3.remove(), t3.append(...i3.childNodes);
    }
    for (; null !== (h2 = C.nextNode()) && v2.length < c2; ) {
      if (1 === h2.nodeType) {
        if (h2.hasAttributes()) {
          const t3 = [];
          for (const i3 of h2.getAttributeNames())
            if (i3.endsWith(o$4) || i3.startsWith(n$3)) {
              const s2 = f2[d2++];
              if (t3.push(i3), void 0 !== s2) {
                const t4 = h2.getAttribute(s2.toLowerCase() + o$4).split(n$3), i4 = /([.?@])?(.*)/.exec(s2);
                v2.push({ type: 1, index: r2, name: i4[2], strings: t4, ctor: "." === i4[1] ? H : "?" === i4[1] ? L : "@" === i4[1] ? z : k });
              } else
                v2.push({ type: 6, index: r2 });
            }
          for (const i3 of t3)
            h2.removeAttribute(i3);
        }
        if (y.test(h2.tagName)) {
          const t3 = h2.textContent.split(n$3), i3 = t3.length - 1;
          if (i3 > 0) {
            h2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++)
              h2.append(t3[s2], u2()), C.nextNode(), v2.push({ type: 2, index: ++r2 });
            h2.append(t3[i3], u2());
          }
        }
      } else if (8 === h2.nodeType)
        if (h2.data === l$1)
          v2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = h2.data.indexOf(n$3, t3 + 1)); )
            v2.push({ type: 7, index: r2 }), t3 += n$3.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S(t2, i2, s2 = t2, e2) {
  var o3, n2, l2, h2;
  if (i2 === T)
    return i2;
  let r2 = void 0 !== e2 ? null === (o3 = s2._$Co) || void 0 === o3 ? void 0 : o3[e2] : s2._$Cl;
  const u3 = d(i2) ? void 0 : i2._$litDirective$;
  return (null == r2 ? void 0 : r2.constructor) !== u3 && (null === (n2 = null == r2 ? void 0 : r2._$AO) || void 0 === n2 || n2.call(r2, false), void 0 === u3 ? r2 = void 0 : (r2 = new u3(t2), r2._$AT(t2, s2, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s2)._$Co) && void 0 !== l2 ? l2 : h2._$Co = [])[e2] = r2 : s2._$Cl = r2), void 0 !== r2 && (i2 = S(t2, r2._$AS(t2, i2.values), r2, e2)), i2;
}
class M {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o3 = (null !== (i2 = null == t2 ? void 0 : t2.creationScope) && void 0 !== i2 ? i2 : r).importNode(s2, true);
    C.currentNode = o3;
    let n2 = C.nextNode(), l2 = 0, h2 = 0, u3 = e2[0];
    for (; void 0 !== u3; ) {
      if (l2 === u3.index) {
        let i3;
        2 === u3.type ? i3 = new R(n2, n2.nextSibling, this, t2) : 1 === u3.type ? i3 = new u3.ctor(n2, u3.name, u3.strings, this, t2) : 6 === u3.type && (i3 = new Z(n2, this, t2)), this._$AV.push(i3), u3 = e2[++h2];
      }
      l2 !== (null == u3 ? void 0 : u3.index) && (n2 = C.nextNode(), l2++);
    }
    return C.currentNode = r, o3;
  }
  v(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class R {
  constructor(t2, i2, s2, e2) {
    var o3;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cp = null === (o3 = null == e2 ? void 0 : e2.isConnected) || void 0 === o3 || o3;
  }
  get _$AU() {
    var t2, i2;
    return null !== (i2 = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i2 ? i2 : this._$Cp;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (null == t2 ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = S(this, t2, i2), d(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.g(t2) : void 0 !== t2.nodeType ? this.$(t2) : v(t2) ? this.T(t2) : this._(t2);
  }
  k(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  $(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.k(t2));
  }
  _(t2) {
    this._$AH !== A && d(this._$AH) ? this._$AA.nextSibling.data = t2 : this.$(r.createTextNode(t2)), this._$AH = t2;
  }
  g(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o3 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = N.createElement(P(e2.h, e2.h[0]), this.options)), e2);
    if ((null === (i2 = this._$AH) || void 0 === i2 ? void 0 : i2._$AD) === o3)
      this._$AH.v(s2);
    else {
      const t3 = new M(o3, this), i3 = t3.u(this.options);
      t3.v(s2), this.$(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = E.get(t2.strings);
    return void 0 === i2 && E.set(t2.strings, i2 = new N(t2)), i2;
  }
  T(t2) {
    c(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o3 of t2)
      e2 === i2.length ? i2.push(s2 = new R(this.k(u2()), this.k(u2()), this, this.options)) : s2 = i2[e2], s2._$AI(o3), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    void 0 === this._$AM && (this._$Cp = t2, null === (i2 = this._$AP) || void 0 === i2 || i2.call(this, t2));
  }
}
class k {
  constructor(t2, i2, s2, e2, o3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o3, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o3 = this.strings;
    let n2 = false;
    if (void 0 === o3)
      t2 = S(this, t2, i2, 0), n2 = !d(t2) || t2 !== this._$AH && t2 !== T, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o3[0], l2 = 0; l2 < o3.length - 1; l2++)
        h2 = S(this, e3[s2 + l2], i2, l2), h2 === T && (h2 = this._$AH[l2]), n2 || (n2 = !d(h2) || h2 !== this._$AH[l2]), h2 === A ? t2 = A : t2 !== A && (t2 += (null != h2 ? h2 : "") + o3[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
const I = s$1 ? s$1.emptyScript : "";
class L extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    t2 && t2 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
  }
}
class z extends k {
  constructor(t2, i2, s2, e2, o3) {
    super(t2, i2, s2, e2, o3), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = null !== (s2 = S(this, t2, i2, 0)) && void 0 !== s2 ? s2 : A) === T)
      return;
    const e2 = this._$AH, o3 = t2 === A && e2 !== A || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== A && (e2 === A || o3);
    o3 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (i2 = this.options) || void 0 === i2 ? void 0 : i2.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S(this, t2);
  }
}
const B = i$3.litHtmlPolyfillSupport;
null == B || B(N, R), (null !== (t$3 = i$3.litHtmlVersions) && void 0 !== t$3 ? t$3 : i$3.litHtmlVersions = []).push("2.8.0");
const D = (t2, i2, s2) => {
  var e2, o3;
  const n2 = null !== (e2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e2 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o3 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o3 ? o3 : null;
    n2._$litPart$ = l2 = new R(i2.insertBefore(u2(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return l2._$AI(t2), l2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$3;
class s extends u$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return T;
  }
}
s.finalized = true, s._$litElement$ = true, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, { LitElement: s });
const n$2 = globalThis.litElementPolyfillSupport;
null == n$2 || n$2({ LitElement: s });
(null !== (o$3 = globalThis.litElementVersions) && void 0 !== o$3 ? o$3 : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3 = (e2) => (n2) => "function" == typeof n2 ? ((e3, n3) => (customElements.define(e3, n3), n3))(e2, n2) : ((e3, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e3, n4);
  } };
})(e2, n2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2 = (i2, e2) => "method" === e2.kind && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i2);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  "function" == typeof e2.initializer && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} }, e$2 = (i2, e2, n2) => {
  e2.constructor.createProperty(n2, i2);
};
function n$1(n2) {
  return (t2, o3) => void 0 !== o3 ? e$2(n2, t2, o3) : i$2(n2, t2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$2(t2) {
  return n$1({ ...t2, state: true });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$2 = ({ finisher: e2, descriptor: t2 }) => (o3, n2) => {
  var r2;
  if (void 0 === n2) {
    const n3 = null !== (r2 = o3.originalKey) && void 0 !== r2 ? r2 : o3.key, i2 = null != t2 ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o3.key) } : { ...o3, key: n3 };
    return null != e2 && (i2.finisher = function(t3) {
      e2(t3, n3);
    }), i2;
  }
  {
    const r3 = o3.constructor;
    void 0 !== t2 && Object.defineProperty(o3, n2, t2(n2)), null == e2 || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i$1(i2, n2) {
  return o$2({ descriptor: (o3) => {
    const t2 = { get() {
      var o4, n3;
      return null !== (n3 = null === (o4 = this.renderRoot) || void 0 === o4 ? void 0 : o4.querySelector(i2)) && void 0 !== n3 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = "symbol" == typeof o3 ? Symbol() : "__" + o3;
      t2.get = function() {
        var o4, t3;
        return void 0 === this[n3] && (this[n3] = null !== (t3 = null === (o4 = this.renderRoot) || void 0 === o4 ? void 0 : o4.querySelector(i2)) && void 0 !== t3 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o3, n2) => o3.assignedElements(n2) : (o3, n2) => o3.assignedNodes(n2).filter((o4) => o4.nodeType === Node.ELEMENT_NODE);
const styles$8 = i$4`
  .headline {
    color: var(--text-color);
    font-size: var(--font-r-large);
    padding: 0;
    margin: var(--d-small) 0 var(--d-large);

    @media (min-width: 1024px) {
      font-size: var(--font-r-base);
      text-align: center;
    }
  }
  [role='button'] {
    text-decoration: none;
    color: var(--text-color);
    display: block;
    font-size: var(--font-rel-base);
  }
  .teaser-list {
    list-style-type: none;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .teaser-list.always-row {
    text-align: left;
  }
  .teaser-list:not(.always-row) {
    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
  .teaser-list-item {
    padding: var(--d-small);
    border-radius: var(--radius-base);
    background: var(--c-white);
    margin: var(--d-xsmall);
    color: var(--text-color);
    justify-content: space-evenly;
    box-shadow: var(--shadow);
    border: var(--border-base) solid transparent;

    @media (min-width: 768px) {
      min-height: 100px;
    }
  }
  .teaser-list-item:hover,
  .teaser-list-item:focus {
    color: var(--c-accent-dark);
    background: var(--c-secondary);
    transition: all 0.3s ease-in-out;
    border-color: var(--c-accent-high);
  }
  .teaser-list-item .teaser-click-label {
    color: var(--c-accent-high);
    font-weight: bold;
    display: block;
    margin-top: 20px;
    text-decoration: underline;
  }
`;
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
let TeaserListComponent = class extends s {
  constructor() {
    super(...arguments);
    this.teasers = [];
    this.heading = void 0;
    this.actionLabel = void 0;
    this.alwaysRow = false;
    this.clickable = false;
  }
  // Handle the click on a default prompt
  handleTeaserClick(teaser, event) {
    event == null ? void 0 : event.preventDefault();
    const teaserClickEvent = new CustomEvent("teaser-click", {
      detail: {
        question: teaser.description
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(teaserClickEvent);
  }
  renderClickableTeaser(teaser) {
    return x`
      <a
        role="button"
        href="#"
        data-testid="default-question"
        @click="${(event) => this.handleTeaserClick(teaser, event)}"
      >
        ${teaser.description}
        <span class="teaser-click-label">${this.actionLabel}</span>
      </a>
    `;
  }
  render() {
    return x`
      <div class="teaser-list-container">
        ${this.heading ? x`<h1 class="headline">${this.heading}</h1>` : ""}
        <ul class="teaser-list ${this.alwaysRow ? "always-row" : ""}">
          ${this.teasers.map(
      (teaser) => x`
              <li class="teaser-list-item">
                ${this.clickable ? this.renderClickableTeaser(teaser) : teaser.description}
              </li>
            `
    )}
        </ul>
      </div>
    `;
  }
};
TeaserListComponent.styles = [styles$8];
__decorateClass$a([
  n$1({ type: Array })
], TeaserListComponent.prototype, "teasers", 2);
__decorateClass$a([
  n$1({ type: String })
], TeaserListComponent.prototype, "heading", 2);
__decorateClass$a([
  n$1({ type: String })
], TeaserListComponent.prototype, "actionLabel", 2);
__decorateClass$a([
  n$1({ type: Boolean })
], TeaserListComponent.prototype, "alwaysRow", 2);
__decorateClass$a([
  n$1({ type: Boolean })
], TeaserListComponent.prototype, "clickable", 2);
TeaserListComponent = __decorateClass$a([
  e$3("teaser-list-component")
], TeaserListComponent);
const styles$7 = i$4`
  .tab-component__list {
    list-style-type: none;
    display: flex;
    box-shadow: var(--shadow);
    border-radius: var(--radius-base);
    padding: var(--d-xsmall);
    width: 450px;
    margin: 0 auto;
    justify-content: space-evenly;
  }
  .tab-component__listItem {
    width: 33%;
    text-align: center;
  }
  .tab-component__link.active {
    background: linear-gradient(to left, var(--c-accent-light), var(--c-accent-high));
    color: var(--c-white);
  }
  .tab-component__link:not(.active):hover {
    background: var(--c-light-gray);
    cursor: pointer;
  }
  .tab-component__link {
    border-bottom: 4px solid transparent;
    border-radius: var(--radius-small);
    text-decoration: none;
    color: var(--text-color);
    font-weight: bold;
    font-size: var(--font-small);
    cursor: pointer;
    display: block;
    padding: var(--d-small);
  }
  .tab-component__content {
    position: relative;
  }
  .tab-component__tab {
    position: absolute;
    top: 0;
    left: 30px;
    display: none;
    width: 100%;
    @media (max-width: 1024px) {
      position: relative;
      left: 0;
    }
  }
  .tab-component__tab.active {
    display: block;
  }
`;
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
let TabComponent = class extends s {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.selectedTabId = void 0;
  }
  activateTab(event) {
    event.preventDefault();
    const tabId = event.target.id;
    this.selectedTabId = tabId;
  }
  renderTabListItem(tabContent, isSelected) {
    return x`
      <li class="tab-component__listItem">
        <a
          id="${tabContent.id}"
          class="tab-component__link ${isSelected ? "active" : ""}"
          role="tab"
          href="#"
          aria-selected="${isSelected}"
          aria-hidden="${!isSelected}"
          aria-controls="tabpanel-${tabContent.id}"
          @click="${(event) => this.activateTab(event)}"
          title="${tabContent.label}"
        >
          ${tabContent.label}
        </a>
      </li>
    `;
  }
  renderTabContent(tabContent, isSelected) {
    return x`
      <div
        id="tabpanel-${tabContent.id}"
        class="tab-component__tab ${isSelected ? "active" : ""}"
        role="tabpanel"
        tabindex="${isSelected ? "0" : "-1"}"
        aria-labelledby="${tabContent.id}"
      >
        <slot name="${tabContent.id}"></slot>
      </div>
    `;
  }
  render() {
    return x`
      <div class="tab-component">
        <nav>
          <ul class="tab-component__list" role="tablist">
            ${this.tabs.map((tabContent) => this.renderTabListItem(tabContent, tabContent.id === this.selectedTabId))}
          </ul>
        </nav>
        <div class="tab-component__content">
          ${this.tabs.map((tabContent) => this.renderTabContent(tabContent, tabContent.id === this.selectedTabId))}
        </div>
      </div>
    `;
  }
};
TabComponent.styles = [styles$7];
__decorateClass$9([
  n$1({ type: Array })
], TabComponent.prototype, "tabs", 2);
__decorateClass$9([
  n$1({ type: String })
], TabComponent.prototype, "selectedTabId", 2);
TabComponent = __decorateClass$9([
  e$3("tab-component")
], TabComponent);
/*! @license DOMPurify 3.0.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.6/LICENSE */
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object;
let {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x2) {
    return x2;
  };
}
if (!seal) {
  seal = function seal2(x2) {
    return x2;
  };
}
if (!apply) {
  apply = function apply2(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!construct) {
  construct = function construct2(Func, args) {
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(func) {
  return function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  let l2 = array.length;
  while (l2--) {
    let element = array[l2];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l2] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    if (getOwnPropertyDescriptor(object, property) !== void 0) {
      newObject[property] = value;
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue(element) {
    console.warn("fallback value for", element);
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR,
  ERB_EXPR,
  TMPLIT_EXPR,
  DATA_ATTR,
  ARIA_ATTR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  ATTR_WHITESPACE,
  DOCTYPE_NAME
});
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.0.6";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== 9) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node: Node2,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = {};
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = "ALLOWED_NAMESPACES" in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(
      clone(DEFAULT_URI_SAFE_ATTRIBUTES),
      // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      transformCaseFunc
      // eslint-disable-line indent
    ) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(
      clone(DEFAULT_DATA_URI_TAGS),
      // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      transformCaseFunc
      // eslint-disable-line indent
    ) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
    FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
    USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, [...text]);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  const HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  const ALL_SVG_TAGS = addToSet({}, svg$1);
  addToSet(ALL_SVG_TAGS, svgFilters);
  addToSet(ALL_SVG_TAGS, svgDisallowed);
  const ALL_MATHML_TAGS = addToSet({}, mathMl$1);
  addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      node.parentNode.removeChild(node);
    } catch (_2) {
      node.remove();
    }
  };
  const _removeAttribute = function _removeAttribute2(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }
    node.removeAttribute(name);
    if (name === "is" && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_2) {
        }
      } else {
        try {
          node.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT,
      null
    );
  };
  const _isClobbered = function _isClobbered2(elm) {
    return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(object) {
    return typeof Node2 === "function" && object instanceof Node2;
  };
  const _executeHook = function _executeHook2(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }
    arrayForEach(hooks[entryPoint], (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHook("beforeSanitizeElements", currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHook("uponSanitizeElement", currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i2 = childCount - 1; i2 >= 0; --i2) {
            parentNode.insertBefore(cloneNode(childNodes[i2], true), getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHook("afterSanitizeElements", currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName))
      ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName))
      ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      )
        ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName])
      ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, "")))
      ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
      ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, "")))
      ;
    else if (value) {
      return false;
    } else
      ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName.indexOf("-") > 0;
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHook("beforeSanitizeAttributes", currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    let l2 = attributes.length;
    while (l2--) {
      const attr = attributes[l2];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      let value = name === "value" ? attrValue : stringTrim(attrValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      _removeAttribute(name, currentNode);
      if (!hookEvent.keepAttr) {
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI)
          ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          currentNode.setAttribute(name, value);
        }
        arrayPop(DOMPurify.removed);
      } catch (_2) {
      }
    }
    _executeHook("afterSanitizeAttributes", currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHook("beforeSanitizeShadowDOM", fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHook("uponSanitizeShadowNode", shadowNode, null);
      if (_sanitizeElements(shadowNode)) {
        continue;
      }
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
      _sanitizeAttributes(shadowNode);
    }
    _executeHook("afterSanitizeShadowDOM", fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node2) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      if (_sanitizeElements(currentNode)) {
        continue;
      }
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
      _sanitizeAttributes(currentNode);
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint) {
    if (hooks[entryPoint]) {
      return arrayPop(hooks[entryPoint]);
    }
  };
  DOMPurify.removeHooks = function(entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };
  DOMPurify.removeAllHooks = function() {
    hooks = {};
  };
  return DOMPurify;
}
var purify = createDOMPurify();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i {
  constructor(i2) {
    if (super(i2), this.et = A, i2.type !== t$1.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === A || null == r2)
      return this.ft = void 0, this.et = r2;
    if (r2 === T)
      return r2;
    if ("string" != typeof r2)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.et)
      return this.ft;
    this.et = r2;
    const s2 = [r2];
    return s2.raw = s2, this.ft = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const o$1 = e$1(e);
const globalConfig = {
  BOT_TYPING_EFFECT_INTERVAL: 50,
  // in ms
  // Is default prompts enabled?
  IS_DEFAULT_PROMPTS_ENABLED: true,
  // Default prompts to display in the chat
  DISPLAY_DEFAULT_PROMPTS_BUTTON: "Not sure what to ask? Try our suggestions!",
  // This are the chat bubbles that will be displayed in the chat
  CHAT_MESSAGES: [],
  // This are the labels for the chat button and input
  CHAT_BUTTON_LABEL_TEXT: "Ask Support",
  CHAT_CANCEL_BUTTON_LABEL_TEXT: "Cancel Generation",
  CHAT_VOICE_BUTTON_LABEL_TEXT: "Voice input",
  CHAT_VOICE_REC_BUTTON_LABEL_TEXT: "Listening to voice input",
  CHAT_INPUT_PLACEHOLDER: 'Type your question, eg. "How to search and book rentals?"',
  USER_IS_BOT: "Support Assistant",
  RESET_BUTTON_LABEL_TEXT: "X",
  RESET_BUTTON_TITLE_TEXT: "Reset current question",
  RESET_CHAT_BUTTON_TITLE: "Reset chat",
  // Copy response to clipboard
  COPY_RESPONSE_BUTTON_LABEL_TEXT: "Copy Response",
  COPIED_SUCCESSFULLY_MESSAGE: "Response copied!",
  // Follow up questions text
  FOLLOW_UP_QUESTIONS_LABEL_TEXT: "You can also ask...",
  SHOW_THOUGH_PROCESS_BUTTON_LABEL_TEXT: "Show thought process",
  HIDE_THOUGH_PROCESS_BUTTON_LABEL_TEXT: "Hide thought process",
  LOADING_INDICATOR_TEXT: "Please wait. We are searching and generating an answer...",
  LOADING_TEXT: "Loading...",
  // API ERROR HANDLING IN UI
  API_ERROR_MESSAGE: "Sorry, we are having some problems. Please try again later.",
  INVALID_REQUEST_ERROR: "Unable to generate answer for this query. Please modify your question and try again.",
  // Config pertaining the response format
  THOUGHT_PROCESS_LABEL: "Thought Process",
  SUPPORT_CONTEXT_LABEL: "Support Context",
  CITATIONS_LABEL: "Learn More:",
  CITATIONS_TAB_LABEL: "Citations",
  // Custom Branding
  IS_CUSTOM_BRANDING: true,
  // Custom Branding details
  // All these should come from persistence config
  BRANDING_URL: "#",
  BRANDING_LOGO_ALT: "Brand Logo",
  BRANDING_HEADLINE: "Welcome to the Support Assistant of our Brand",
  SHOW_CHAT_HISTORY_LABEL: "Show Chat History",
  HIDE_CHAT_HISTORY_LABEL: "Hide Chat History",
  CHAT_MAX_COUNT_TAG: "{MAX_CHAT_HISTORY}",
  CHAT_HISTORY_FOOTER_TEXT: "Showing past {MAX_CHAT_HISTORY} conversations"
};
const teaserListTexts = {
  TEASER_CTA_LABEL: "Ask now",
  HEADING_CHAT: "Chat with our support team",
  HEADING_ASK: "Ask a question",
  DEFAULT_PROMPTS: [
    {
      description: "How to search and book rentals?"
    },
    {
      description: "What is the refund policy?"
    },
    {
      description: "How to contact a representative?"
    }
  ]
};
const requestOptions = {
  approach: "rrr",
  overrides: {
    retrieval_mode: "hybrid",
    semantic_ranker: true,
    semantic_captions: false,
    suggest_followup_questions: true
  }
};
const chatHttpOptions = {
  // API URL for development purposes
  url: "http://localhost:3000",
  method: "POST",
  stream: true
};
const MAX_CHAT_HISTORY = 5;
const chatStyle = i$4`
  :host {
    --c-primary: #123f58;
    --c-secondary: #f5f5f5;
    --c-text: var(--c-primary);
    --c-white: #fff;
    --c-black: #111111;
    --c-red: #ff0000;
    --c-light-gray: #e3e3e3;
    --c-base-gray: var(--c-secondary);
    --c-dark-gray: #4e5288;
    --c-accent-high: #692b61;
    --c-accent-dark: #5e3c7d;
    --c-accent-light: #f6d5f2;
    --c-error: #8a0000;
    --c-error-background: rgb(253, 231, 233);
    --c-success: #26b32b;
    --font-r-small: 1vw;
    --font-r-base: 3vw;
    --font-r-large: 5vw;
    --font-base: 14px;
    --font-rel-base: 1.2rem;
    --font-small: small;
    --font-large: large;
    --font-larger: x-large;
    --border-base: 3px;
    --border-thin: 1px;
    --border-thicker: 8px;
    --radius-small: 5px;
    --radius-base: 10px;
    --radius-large: 25px;
    --radius-none: 0;
    --width-wide: 90%;
    --width-base: 80%;
    --width-narrow: 80%;
    --d-base: 20px;
    --d-small: 10px;
    --d-xsmall: 5px;
    --d-large: 30px;
    --d-xlarge: 50px;
    --shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100vw;
    display: block;
    padding: var(--d-base);
    color: var(--c-text);
  }
  :host([data-theme='dark']) {
    --c-primary: #fdfeff;
    --c-secondary: #32343e;
    --c-text: var(--c-primary);
    --c-white: var(--c-secondary);
    --c-black: var(--c-primary);
    --c-red: #ff0000;
    --c-light-gray: #636d9c;
    --c-dark-gray: #e3e3e3;
    --c-base-gray: var(--c-secondary);
    --c-accent-high: #dcdef8;
    --c-accent-dark: var(--c-primary);
    --c-accent-light: #032219;
    --c-error: #8a0000;
    --c-error-background: rgb(253, 231, 233);
    --c-success: #26b32b;
  }
  html {
    scroll-behavior: smooth;
  }
  ul {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  .button {
    color: var(--c-primary);
    border: 0;
    background: none;
    cursor: pointer;
    text-decoration: underline;
  }
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    width: 100%;
    height: 0;
    background: var(--c-black);
    z-index: 2;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
  }
  .overlay.active {
    @media (max-width: 1024px) {
      height: 100%;
    }
  }
  .display-none {
    display: none;
    visibility: hidden;
  }
  .display-flex-grow {
    flex-grow: 1;
  }
  .container-col {
    display: flex;
    flex-direction: column;
    gap: var(--d-small);
  }
  .container-row {
    flex-direction: row;
  }
  .chat__header--thread {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .chat__container {
    min-width: 100%;
    transition: width 0.3s ease-in-out;
    max-height: 100vh;
  }
  .chat__containerWrapper.aside-open {
    .chat__listItem {
      max-width: var(--width-wide);
    }
  }
  .chat__containerWrapper {
    display: grid;
    grid-template-columns: 1fr;
    gutter: var(--d-base);
  }
  .chat__containerWrapper.aside-open {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: var(--d-base);
    grid-row-gap: var(--d-base);

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .chat__containerWrapper.aside-open .aside {
    width: 100%;
    border-left: var(--border-thin) solid var(--c-light-gray);

    @media (max-width: 1024px) {
      width: var(--width-base);
    }
  }
  @media (max-width: 1024px) {
    .aside {
      top: var(-d-large);
      left: auto;
      z-index: 3;
      background: var(--c-white);
      display: block;
      padding: var(--d-base);
      position: absolute;
      width: var(--width-base);
      border-radius: var(--radius-base);
    }
  }
  .form__container {
    margin-top: var(--d-large);
    padding: var(--d-small);
  }
  .form__container-sticky {
    position: sticky;
    bottom: 0;
    z-index: 1;
    border-radius: var(--radius-base);
    background: linear-gradient(0deg, var(--c-base-gray) 0%, var(--c-base-gray) 75%, var(--c-base-gray) 100%);
    box-shadow: var(--shadow);
    padding: var(--d-small) var(--d-small) var(--d-large);
  }
  .form__label {
    display: block;
    padding: var(-d-xsmall) 0;
    font-size: var(--font-small);
  }
  .chatbox__button:disabled,
  .chatbox__input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .chatbox__button svg {
    fill: var(--c-accent-high);
    width: calc(var(--d-base) + var(--d-xsmall));
  }
  .chatbox__container {
    position: relative;
    height: 50px;
  }
  .chatbox__button {
    background: var(--c-white);
    border: none;
    color: var(--text-color);
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 8px;
    width: calc(var(--d-large) + var(--d-xlarge));
    box-shadow: var(--shadow);
    transition: background 0.3s ease-in-out;
  }
  .chatbox__button:hover,
  .chatbox__button:focus {
    background: var(--c-secondary);
  }
  .chatbox__button:hover svg,
  .chatbox__button:focus svg {
    opacity: 0.8;
  }
  .chatbox__button--reset {
    position: absolute;
    right: 115px;
    top: 15px;
    background: transparent;
    border: none;
    color: gray;
    background: var(--c-accent-dark);
    border-radius: 50%;
    color: var(--c-white);
    font-weight: bold;
    height: 20px;
    width: var(--d-base);
    cursor: pointer;
  }
  .chatbox__input-container {
    display: flex;
    border: var(--border-thin) solid var(--c-black);
    background: var(--c-white);
    border-radius: 4px;
  }
  .chatbox__input-container:focus-within {
    outline: -webkit-focus-ring-color auto 1px;
  }
  .chatbox__input {
    background: transparent;
    color: var(--text-color);
    border: none;
    padding: var(--d-small);
    flex: 1 1 auto;
    font-size: 1rem;
  }
  .chatbox__input:focus-visible {
    outline: none;
  }
  .aside__header {
    display: flex;
    justify-content: end;
  }
  .tab-component__content {
    padding: var(--d-base) var(--d-base) var(--d-base) 0;
  }
  .tab-component__paragraph {
    font-family: monospace;
    font-size: var(--font-large);
    border: var(--border-thin) solid var(--c-light-gray);
    border-radius: var(--radius-large);
    padding: var(--d-base);
  }
  .chat-history__footer {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    align-self: center;
    padding: 20px;
  }
  .chat-history__container {
    display: flex;
    flex-direction: column;
    border-bottom: 3px solid var(--light-gray);
    margin-bottom: 30px;
  }
  .chat-scroll {
    overflow: auto;
    max-height: 55vh;
    display: block;
    margin: 10px 0;
    padding: 0 20px;
  }
  .chat-scroll::-webkit-scrollbar {
    width: 12px;
  }
  .chat-scroll::-webkit-scrollbar-track {
    background: var(--c-secondary);
  }
  .chat-scroll::-webkit-scrollbar-thumb {
    background-color: var(--text-color);
    border-radius: 50px;
  }
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class t extends e {
}
t.directiveName = "unsafeSVG", t.resultType = 2;
const o2 = e$1(t);
function processText(inputText, arrays) {
  const nextQuestionMatch = `Next questions:|<<([^>]+)>>`;
  const findCitations = /\[(.*?)]/g;
  const findFollowingSteps = /:(.*?)(?:Follow-up questions:|Next questions:|<<|$)/s;
  const findNextQuestions = /Next Questions:(.*?)$/s;
  const findQuestionsbyDoubleArrow = /<<([^<>]+)>>/g;
  const findNumberedItems = /^\d+\.\s/;
  const citation = {};
  let citations = [];
  let referenceCounter = 1;
  let replacedText = inputText.replace(findCitations, (_match, capture) => {
    const citationText = capture.trim();
    if (!citation[citationText]) {
      citation[citationText] = referenceCounter++;
    }
    return `<sup class="citation">${citation[citationText]}</sup>`;
  });
  citations = Object.keys(citation).map((text2, index) => ({
    ref: index + 1,
    text: text2
  }));
  arrays[0] = citations;
  const hasNextQuestions = replacedText.includes(nextQuestionMatch);
  const followingStepsMatch = replacedText.match(findFollowingSteps);
  const followingStepsText = followingStepsMatch ? followingStepsMatch[1].trim() : "";
  const followingSteps = followingStepsText.split("\n").filter(Boolean);
  const cleanFollowingSteps = followingSteps.map((item) => {
    return item.replace(findNumberedItems, "");
  });
  arrays[1] = cleanFollowingSteps;
  const nextRegex = hasNextQuestions ? findNextQuestions : findQuestionsbyDoubleArrow;
  const nextQuestionsMatch = replacedText.match(nextRegex) ?? [];
  let nextQuestions = [];
  nextQuestions = cleanUpFollowUp([...nextQuestionsMatch]);
  const stepsIndex = replacedText.indexOf("s:");
  replacedText = stepsIndex !== -1 ? inputText.substring(0, stepsIndex + 6) : inputText;
  arrays[2] = nextQuestions;
  return { replacedText, arrays };
}
function cleanUpFollowUp(followUpList) {
  if (followUpList && followUpList.length > 0 && followUpList[0].startsWith("<<")) {
    followUpList = followUpList.map((followUp) => followUp.replace("<<", "").replace(">>", ""));
  }
  return followUpList;
}
function getTimestamp() {
  return (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
function chatEntryToString(entry) {
  const message = entry.text.map((textEntry) => {
    var _a;
    return textEntry.value + "\n\n" + ((_a = textEntry.followingSteps) == null ? void 0 : _a.map((s2, i2) => `${i2 + 1}.` + s2).join("\n"));
  }).join("\n\n").replaceAll(/<sup[^>]*>(.*?)<\/sup>/g, "");
  return message;
}
class ChatResponseError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
function newListWithEntryAtIndex(list, index, entry) {
  return [...list.slice(0, index), entry, ...list.slice(index + 1)];
}
const iconLightBulb = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\r\n  <path d="M960 0q97 0 187 25t168 71 143 110 110 142 71 169 25 187q0 145-55 269t-157 225q-83 82-127 183t-45 219v256q0 40-15 75t-41 61-61 41-75 15H832q-40 0-75-15t-61-41-41-61-15-75v-256q0-118-44-219t-128-183q-102-101-157-225t-55-269q0-97 25-187t71-168 110-143T604 96t169-71T960 0zm128 1920q26 0 45-19t19-45v-192H768v192q0 26 19 45t45 19h256zm67-384q12-128 65-233t144-197q83-83 127-183t45-219q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T553 297 430 480t-46 224q0 118 44 218t128 184q90 91 143 196t66 234h131v-512q0-26 19-45t45-19q26 0 45 19t19 45v512h131zM640 576q26 0 45 19l128 128q19 19 19 45t-19 45-45 19q-26 0-45-19L595 685q-19-19-19-45t19-45 45-19zm448 192q0-26 19-45l128-128q19-19 45-19t45 19 19 45q0 26-19 45l-128 128q-19 19-45 19t-45-19-19-45zM960 384q26 0 45 19t19 45v192q0 26-19 45t-45 19q-26 0-45-19t-19-45V448q0-26 19-45t45-19z" />\r\n</svg>';
const iconDelete = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\r\n  <path d="M1792 384h-128v1472q0 40-15 75t-41 61-61 41-75 15H448q-40 0-75-15t-61-41-41-61-15-75V384H128V256h512V128q0-27 10-50t27-40 41-28 50-10h384q27 0 50 10t40 27 28 41 10 50v128h512v128zM768 256h384V128H768v128zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45V384zM768 1664H640V640h128v1024zm256 0H896V640h128v1024zm256 0h-128V640h128v1024z" />\r\n</svg>';
const iconCancel = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\n  <path d="M512 768h1024v128H512V768zm1024-256H512V384h1024v128zm-384 1408l127 128H256V0h1536v1348l-64 63-64-64V128H384v1792h768zm576 125l3 3h-6l3-3zm-192-893l-129 128H512v-128h1024zm-317 384l128 128H512v-128h707zm600 192l226 227-90 90-227-226-227 227-90-91 227-227-227-227 90-90 227 227 227-227 90 91-226 226z" />\n</svg>';
const iconSend = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\r\n  <path d="M221 1027h931l128-64-128-64H223L18 77l1979 883L18 1843l203-816z" />\r\n</svg>';
const iconClose = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\r\n  <path d="M2048 290l-734 734 734 734-290 290-734-734-734 734L0 1758l734-734L0 290 290 0l734 734L1758 0l290 290z" />\r\n</svg>';
const iconLogo = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg\n   xmlns:dc="http://purl.org/dc/elements/1.1/"\n   xmlns:cc="http://creativecommons.org/ns#"\n   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n   xmlns:svg="http://www.w3.org/2000/svg"\n   xmlns="http://www.w3.org/2000/svg"\n   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n   width="533.37976"\n   height="479.4425"\n   viewBox="0 0 141.12339 126.8525"\n   version="1.1"\n   id="svg8"\n   inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n   sodipodi:docname="brand-logo.svg">\n  <defs\n     id="defs2" />\n  <sodipodi:namedview\n     id="base"\n     pagecolor="#ffffff"\n     bordercolor="#666666"\n     borderopacity="1.0"\n     inkscape:pageopacity="0.0"\n     inkscape:pageshadow="2"\n     inkscape:zoom="0.4654497"\n     inkscape:cx="303.64057"\n     inkscape:cy="106.60712"\n     inkscape:document-units="mm"\n     inkscape:current-layer="layer1"\n     inkscape:document-rotation="0"\n     showgrid="false"\n     inkscape:window-width="1187"\n     inkscape:window-height="541"\n     inkscape:window-x="119"\n     inkscape:window-y="131"\n     inkscape:window-maximized="0"\n     units="px"\n     fit-margin-top="0"\n     fit-margin-left="0"\n     fit-margin-right="0"\n     fit-margin-bottom="0" />\n  <metadata\n     id="metadata5">\n    <rdf:RDF>\n      <cc:Work\n         rdf:about="">\n        <dc:format>image/svg+xml</dc:format>\n        <dc:type\n           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />\n        <dc:title></dc:title>\n      </cc:Work>\n    </rdf:RDF>\n  </metadata>\n  <g\n     inkscape:label="Layer 1"\n     inkscape:groupmode="layer"\n     id="layer1"\n     transform="translate(-18.235046,-25.370501)">\n    <text\n       xml:space="preserve"\n       style="font-style:normal;font-weight:normal;font-size:18.7575px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.468938"\n       x="76.622147"\n       y="77.940918"\n       id="text837"\n       transform="scale(0.95147583,1.0509988)"><tspan\n         sodipodi:role="line"\n         id="tspan835"\n         x="76.622147"\n         y="77.940918"\n         style="stroke-width:0.468938">YOUR</tspan><tspan\n         sodipodi:role="line"\n         x="76.622147"\n         y="101.38779"\n         style="stroke-width:0.468938"\n         id="tspan885">BRAND</tspan></text>\n    <path\n       sodipodi:type="star"\n       style="opacity:0.99;fill:#eec4e6;fill-opacity:0.835294;fill-rule:evenodd;stroke-width:4.99999;stroke-linejoin:round"\n       id="path887"\n       sodipodi:sides="5"\n       sodipodi:cx="55.752526"\n       sodipodi:cy="87.899637"\n       sodipodi:r1="26.130005"\n       sodipodi:r2="13.065002"\n       sodipodi:arg1="0.77001476"\n       sodipodi:arg2="1.3983333"\n       inkscape:flatsided="false"\n       inkscape:rounded="0"\n       inkscape:randomized="0"\n       d="M 74.511266,106.08993 57.994602,100.77082 44.249297,111.36137 44.204142,94.009392 29.884399,84.209489 46.373155,78.804488 51.268372,62.157267 61.504139,76.168769 78.849293,75.680123 68.686589,89.744708 Z"\n       inkscape:transform-center-x="1.3856798"\n       inkscape:transform-center-y="-1.1403183" />\n  </g>\n</svg>\n';
const iconUp = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n  <polygon points="14.65 12.05 8.05 5.35 1.35 12.05 0.65 11.35 8.05 3.95 15.35 11.35 14.65 12.05" />\n</svg>';
const styles$6 = i$4`
  a svg {
    width: calc(var(--width-base) - var(--d-small));
    height: calc(var(--width-base) - var(--d-small));
    position: relative;
    z-index: 1;
  }
  a {
    flex-shrink: 0;
    border-radius: calc(var(--radius-large) * 3);
    border: var(--border-thicker) solid transparent;
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-size: cover;
    background-image: linear-gradient(to right, var(--c-accent-light), var(--c-accent-high));
    width: calc(var(--d-xlarge) * 2);
    height: calc(var(--d-xlarge) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--d-large);
    overflow: hidden;
    padding: var(--d-small);
    position: relative;
  }
  a::after {
    content: '';
    border-radius: calc(var(--radius-large) * 3);
    width: calc(var(--width-base) - var(--d-small));
    height: calc(var(--width-base) - var(--d-small));
    position: absolute;
    background-color: var(--c-secondary);
  }
`;
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
let LinkIconComponent = class extends s {
  constructor() {
    super(...arguments);
    this.label = "";
    this.svgIcon = "";
    this.url = "";
  }
  render() {
    return x`
      <a title="${this.label}" href="${this.url}" target="_blank" rel="noopener noreferrer">
        ${o2(this.svgIcon)}
      </a>
    `;
  }
};
LinkIconComponent.styles = [styles$6];
__decorateClass$8([
  n$1({ type: String })
], LinkIconComponent.prototype, "label", 2);
__decorateClass$8([
  n$1({ type: String })
], LinkIconComponent.prototype, "svgIcon", 2);
__decorateClass$8([
  n$1({ type: String })
], LinkIconComponent.prototype, "url", 2);
LinkIconComponent = __decorateClass$8([
  e$3("link-icon")
], LinkIconComponent);
const styles$5 = i$4`
  .chat-stage__header {
    display: flex;
    width: var(--width-base);
    margin: 0 auto var(--d-large);
    justify-content: center;
    align-items: center;

    @media (min-width: 1024px) {
      width: var(--width-narrow);
    }
  }
  .chat-stage__link svg {
    width: calc(var(--width-base) - var(--d-small));
    height: calc(var(--width-base) - var(--d-small));
    position: relative;
    z-index: 1;
  }
  .chat-stage__link {
    flex-shrink: 0;
    border-radius: calc(var(--radius-large) * 3);
    border: var(--border-thicker) solid transparent;
    background-origin: border-box;
    background-clip: content-box, border-box;
    background-size: cover;
    background-image: linear-gradient(to right, var(--c-accent-light), var(--c-accent-high));
    width: calc(var(--d-xlarge) * 2);
    height: calc(var(--d-xlarge) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--d-large);
    overflow: hidden;
    padding: var(--d-small);
    position: relative;
  }
  .chat-stage__link::after {
    content: '';
    border-radius: calc(var(--radius-large) * 3);
    width: calc(var(--width-base) - var(--d-small));
    height: calc(var(--width-base) - var(--d-small));
    position: absolute;
    background-color: var(--c-secondary);
  }
`;
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
let ChatStageComponent = class extends s {
  constructor() {
    super(...arguments);
    this.pagetitle = "";
    this.url = "";
    this.svgIcon = "";
  }
  render() {
    return x`
      <header class="chat-stage__header" data-testid="chat-branding">
        <link-icon url="${this.url}" svgIcon="${this.svgIcon}"></link-icon>
        <h1 class="chat-stage__hl">${this.pagetitle}</h1>
      </header>
    `;
  }
};
ChatStageComponent.styles = [styles$5];
__decorateClass$7([
  n$1({ type: String })
], ChatStageComponent.prototype, "pagetitle", 2);
__decorateClass$7([
  n$1({ type: String })
], ChatStageComponent.prototype, "url", 2);
__decorateClass$7([
  n$1({ type: String })
], ChatStageComponent.prototype, "svgIcon", 2);
ChatStageComponent = __decorateClass$7([
  e$3("chat-stage")
], ChatStageComponent);
const styles$4 = i$4`
  @keyframes spinneranimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  p {
    display: flex;
    align-items: center;
  }
  svg {
    width: var(--d-large);
    height: 30px;
    fill: var(--c-accent-light);
    animation: spinneranimation 1s linear infinite;
    margin-right: 10px;
  }
`;
const iconSpinner = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\r\n  <path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.4142 3.16421 10.75 2.75 10.75C2.33579 10.75 2 10.4142 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.58579 18 9.25 17.6642 9.25 17.25C9.25 16.8358 9.58579 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5Z" />\r\n</svg>';
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
let LoadingIndicatorComponent = class extends s {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  render() {
    return x`
      <p data-testid="loading-indicator" aria-label="${this.label}">
        <span>${o2(iconSpinner)}</span>
        <span>${this.label}</span>
      </p>
    `;
  }
};
LoadingIndicatorComponent.styles = [styles$4];
__decorateClass$6([
  n$1({ type: String })
], LoadingIndicatorComponent.prototype, "label", 2);
LoadingIndicatorComponent = __decorateClass$6([
  e$3("loading-indicator")
], LoadingIndicatorComponent);
const styles$3 = i$4`
  button {
    color: var(--text-color);
    font-weight: bold;
    margin-left: 8px;
    background: transparent;
    transition: background 0.3s ease-in-out;
    box-shadow: none;
    border: none;
    cursor: pointer;
    width: var(--d-xlarge);
    height: 100%;
  }
  button:hover,
  button:focus {
    background: var(--c-secondary);
  }
  button:hover svg,
  button:focus svg {
    opacity: 0.8;
  }
  .not-recording svg {
    fill: var(--c-black);
  }
  .recording svg {
    fill: var(--red);
  }
`;
const iconMicOff = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M18.25 11C18.6297 11 18.9435 11.2822 18.9932 11.6482L19 11.75V12.25C19 15.8094 16.245 18.7254 12.751 18.9817L12.75 21.25C12.75 21.6642 12.4142 22 12 22C11.6203 22 11.3065 21.7178 11.2568 21.3518L11.25 21.25L11.25 18.9818C7.83323 18.7316 5.12283 15.938 5.00406 12.4863L5 12.25V11.75C5 11.3358 5.33579 11 5.75 11C6.1297 11 6.44349 11.2822 6.49315 11.6482L6.5 11.75V12.25C6.5 15.077 8.73445 17.3821 11.5336 17.4956L11.75 17.5H12.25C15.077 17.5 17.3821 15.2656 17.4956 12.4664L17.5 12.25V11.75C17.5 11.3358 17.8358 11 18.25 11ZM12 2C14.2091 2 16 3.79086 16 6V12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12V6C8 3.79086 9.79086 2 12 2Z"  />\n</svg>';
const iconMicOn = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M11 17.5C11 18.596 11.2713 19.6287 11.7503 20.5345L11.75 21.25C11.75 21.6642 11.4142 22 11 22C10.6203 22 10.3065 21.7178 10.2568 21.3518L10.25 21.25L10.25 18.9818C6.83323 18.7316 4.12283 15.938 4.00406 12.4863L4 12.25V11.75C4 11.3358 4.33579 11 4.75 11C5.1297 11 5.44349 11.2822 5.49315 11.6482L5.5 11.75V12.25C5.5 15.077 7.73445 17.3821 10.5336 17.4956L10.75 17.5H11ZM11.1748 15.9962C11.6577 13.9575 13.1007 12.2902 15 11.4982V6C15 3.79086 13.2091 2 11 2C8.79086 2 7 3.79086 7 6V12C7 14.2091 8.79086 16 11 16C11.0586 16 11.1169 15.9987 11.1748 15.9962ZM20 17.5C20 18.8807 18.8807 20 17.5 20C16.1193 20 15 18.8807 15 17.5C15 16.1193 16.1193 15 17.5 15C18.8807 15 20 16.1193 20 17.5ZM23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 14.4624 14.4624 12 17.5 12C20.5376 12 23 14.4624 23 17.5ZM13.5 17.5C13.5 19.7091 15.2909 21.5 17.5 21.5C19.7091 21.5 21.5 19.7091 21.5 17.5C21.5 15.2909 19.7091 13.5 17.5 13.5C15.2909 13.5 13.5 15.2909 13.5 17.5Z" />\n</svg>';
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
let VoiceInputButton = class extends s {
  constructor() {
    super(...arguments);
    this.recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.showVoiceInput = this.recognitionSvc !== void 0;
    this.enableVoiceListening = false;
    this.speechRecognition = void 0;
  }
  initializeSpeechRecognition() {
    if (this.showVoiceInput && this.recognitionSvc) {
      this.speechRecognition = new this.recognitionSvc();
      if (!this.speechRecognition) {
        return;
      }
      this.speechRecognition.continuous = true;
      this.speechRecognition.lang = "en-US";
      this.speechRecognition.onresult = (event) => {
        let input = "";
        for (const result of event.results) {
          input += `${result[0].transcript}`;
        }
        const voiceInputEvent = new CustomEvent("on-voice-input", {
          detail: {
            input
          },
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(voiceInputEvent);
      };
      this.speechRecognition.addEventListener("error", (event) => {
        if (this.speechRecognition) {
          this.speechRecognition.stop();
          console.log(`Speech recognition error detected: ${event.error} - ${event.message}`);
        }
      });
    }
  }
  handleVoiceInput(event) {
    event.preventDefault();
    if (!this.speechRecognition) {
      this.initializeSpeechRecognition();
    }
    if (this.speechRecognition) {
      this.enableVoiceListening = !this.enableVoiceListening;
      if (this.enableVoiceListening) {
        this.speechRecognition.start();
      } else {
        this.speechRecognition.stop();
      }
    }
  }
  renderVoiceButton() {
    return x`
      <button
        title="${this.enableVoiceListening ? globalConfig.CHAT_VOICE_REC_BUTTON_LABEL_TEXT : globalConfig.CHAT_VOICE_BUTTON_LABEL_TEXT}"
        class="${this.enableVoiceListening ? "recording" : "not-recording"}"
        @click="${this.handleVoiceInput}"
      >
        ${this.enableVoiceListening ? o2(iconMicOn) : o2(iconMicOff)}
      </button>
    `;
  }
  render() {
    return this.showVoiceInput ? this.renderVoiceButton() : x``;
  }
};
VoiceInputButton.styles = [styles$3];
__decorateClass$5([
  t$2()
], VoiceInputButton.prototype, "showVoiceInput", 2);
__decorateClass$5([
  t$2()
], VoiceInputButton.prototype, "enableVoiceListening", 2);
VoiceInputButton = __decorateClass$5([
  e$3("voice-input-button")
], VoiceInputButton);
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
let _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html2, encode) {
  if (encode) {
    if (escapeTest.test(html2)) {
      return html2.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html2)) {
      return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html2) {
  return html2.replace(unescapeTest, (_2, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = typeof val === "object" && "source" in val ? val.source : val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
const noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i2 = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i2 < cells.length; i2++) {
    cells[i2] = cells[i2].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c2, invert) {
  const l2 = str.length;
  if (l2 === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l2) {
    const currChar = str.charAt(l2 - suffLen - 1);
    if (currChar === c2 && !invert) {
      suffLen++;
    } else if (currChar !== c2 && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l2 - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i2 = 0; i2 < str.length; i2++) {
    if (str[i2] === "\\") {
      i2++;
    } else if (str[i2] === b[0]) {
      level++;
    } else if (str[i2] === b[1]) {
      level--;
      if (level < 0) {
        return i2;
      }
    }
  }
  return -1;
}
function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text2 = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text: text2,
      tokens: lexer.inlineTokens(text2)
    };
    lexer.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text2)
  };
}
function indentCodeCompensation(raw, text2) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text2;
  }
  const indentToCode = matchIndentToCode[1];
  return text2.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
class _Tokenizer {
  constructor(options) {
    __publicField(this, "options");
    // TODO: Fix this rules type
    __publicField(this, "rules");
    __publicField(this, "lexer");
    this.options = options || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text2 = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text2, "\n") : text2
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text2 = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
        text: text2
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text2 = cap[2].trim();
      if (/#$/.test(text2)) {
        const trimmed = rtrim(text2, "#");
        if (this.options.pedantic) {
          text2 = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text2 = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text: text2,
        tokens: this.lexer.inline(text2)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text2 = rtrim(cap[0].replace(/^ *>[ \t]?/gm, ""), "\n");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text2);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text: text2
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let raw = "";
      let itemContents = "";
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
        let nextLine = src.split("\n", 1)[0];
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        let blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimEnd();
      list.items[list.items.length - 1].text = itemContents.trimEnd();
      list.raw = list.raw.trimEnd();
      for (let i2 = 0; i2 < list.items.length; i2++) {
        this.lexer.state.top = false;
        list.items[i2].tokens = this.lexer.blockTokens(list.items[i2].text, []);
        if (!list.loose) {
          const spacers = list.items[i2].tokens.filter((t2) => t2.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
          list.loose = hasMultipleLineBreaks;
        }
      }
      if (list.loose) {
        for (let i2 = 0; i2 < list.items.length; i2++) {
          list.items[i2].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
      return {
        type: "def",
        tag,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      if (!/[:|]/.test(cap[2])) {
        return;
      }
      const item = {
        type: "table",
        raw: cap[0],
        header: splitCells(cap[1]).map((c2) => {
          return { text: c2, tokens: [] };
        }),
        align: cap[2].replace(/^\||\| *$/g, "").split("|"),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        let l2 = item.align.length;
        let i2, j, k2, row;
        for (i2 = 0; i2 < l2; i2++) {
          const align = item.align[i2];
          if (align) {
            if (/^ *-+: *$/.test(align)) {
              item.align[i2] = "right";
            } else if (/^ *:-+: *$/.test(align)) {
              item.align[i2] = "center";
            } else if (/^ *:-+ *$/.test(align)) {
              item.align[i2] = "left";
            } else {
              item.align[i2] = null;
            }
          }
        }
        l2 = item.rows.length;
        for (i2 = 0; i2 < l2; i2++) {
          item.rows[i2] = splitCells(item.rows[i2], item.header.length).map((c2) => {
            return { text: c2, tokens: [] };
          });
        }
        l2 = item.header.length;
        for (j = 0; j < l2; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l2 = item.rows.length;
        for (j = 0; j < l2; j++) {
          row = item.rows[j];
          for (k2 = 0; k2 < row.length; k2++) {
            row[k2].tokens = this.lexer.inline(row[k2].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text2 = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text: text2,
        tokens: this.lexer.inline(text2)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link) {
        const text2 = cap[0].charAt(0);
        return {
          type: "text",
          raw: text2,
          text: text2
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text3 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text3,
            tokens: this.lexer.inlineTokens(text3)
          };
        }
        const text2 = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text: text2,
          tokens: this.lexer.inlineTokens(text2)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text2 = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text2);
      const hasSpaceCharsOnBothEnds = /^ /.test(text2) && / $/.test(text2);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text2 = text2.substring(1, text2.length - 1);
      }
      text2 = escape(text2, true);
      return {
        type: "codespan",
        raw: cap[0],
        text: text2
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text2, href;
      if (cap[2] === "@") {
        text2 = escape(cap[1]);
        href = "mailto:" + text2;
      } else {
        text2 = escape(cap[1]);
        href = text2;
      }
      return {
        type: "link",
        raw: cap[0],
        text: text2,
        href,
        tokens: [
          {
            type: "text",
            raw: text2,
            text: text2
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text2, href;
      if (cap[2] === "@") {
        text2 = escape(cap[0]);
        href = "mailto:" + text2;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text2 = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text: text2,
        href,
        tokens: [
          {
            type: "text",
            raw: text2,
            text: text2
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text2;
      if (this.lexer.state.inRawBlock) {
        text2 = cap[0];
      } else {
        text2 = escape(cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text: text2
      };
    }
  }
}
const block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.lheading = edit(block.lheading).replace(/bull/g, block.bullet).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = { ...block };
block.gfm = {
  ...block.normal,
  table: "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  // Cells
};
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = {
  ...block.normal,
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
const inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    //         (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
    //         | Skip orphan inside strong      | Consume to delim | (1) #***              | (2) a***#, a***                    | (3) #***a, ***a                  | (4) ***#                 | (5) #***#                         | (6) a***a
    rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
    rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
    // ^- Not allowed for _
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^((?![*_])[\spunctuation])/
};
inline._punctuation = "\\p{P}$+<=>`^|~";
inline.punctuation = edit(inline.punctuation, "u").replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
inline.anyPunctuation = /\\[punct]/g;
inline._escapes = /\\([punct])/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim, "u").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline.anyPunctuation = edit(inline.anyPunctuation, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = edit(inline._escapes, "gu").replace(/punct/g, inline._punctuation).getRegex();
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = { ...inline };
inline.pedantic = {
  ...inline.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
};
inline.gfm = {
  ...inline.normal,
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = {
  ...inline.gfm,
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
class _Lexer {
  constructor(options) {
    __publicField(this, "tokens");
    __publicField(this, "options");
    __publicField(this, "state");
    __publicField(this, "tokenizer");
    __publicField(this, "inlineQueue");
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options) {
    const lexer = new _Lexer(options);
    return lexer.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options) {
    const lexer = new _Lexer(options);
    return lexer.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_2, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token;
    let lastToken;
    let cutSrc;
    let lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
}
class _Renderer {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || _defaults;
  }
  code(code, infostring, escaped) {
    var _a;
    const lang = (_a = (infostring || "").match(/^\S*/)) == null ? void 0 : _a[0];
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html2, block2) {
    return html2;
  }
  heading(text2, level, raw) {
    return `<h${level}>${text2}</h${level}>
`;
  }
  hr() {
    return "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text2, task, checked) {
    return `<li>${text2}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(text2) {
    return `<p>${text2}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong(text2) {
    return `<strong>${text2}</strong>`;
  }
  em(text2) {
    return `<em>${text2}</em>`;
  }
  codespan(text2) {
    return `<code>${text2}</code>`;
  }
  br() {
    return "<br>";
  }
  del(text2) {
    return `<del>${text2}</del>`;
  }
  link(href, title, text2) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text2;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text2 + "</a>";
    return out;
  }
  image(href, title, text2) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text2;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text2}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  }
  text(text2) {
    return text2;
  }
}
class _TextRenderer {
  // no need for block level renderers
  strong(text2) {
    return text2;
  }
  em(text2) {
    return text2;
  }
  codespan(text2) {
    return text2;
  }
  del(text2) {
    return text2;
  }
  html(text2) {
    return text2;
  }
  text(text2) {
    return text2;
  }
  link(href, title, text2) {
    return "" + text2;
  }
  image(href, title, text2) {
    return "" + text2;
  }
  br() {
    return "";
  }
}
class _Parser {
  constructor(options) {
    __publicField(this, "options");
    __publicField(this, "renderer");
    __publicField(this, "textRenderer");
    this.options = options || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options) {
    const parser = new _Parser(options);
    return parser.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options) {
    const parser = new _Parser(options);
    return parser.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const genericToken = token;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          const headingToken = token;
          out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const codeToken = token;
          out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
          continue;
        }
        case "table": {
          const tableToken = token;
          let header = "";
          let cell = "";
          for (let j = 0; j < tableToken.header.length; j++) {
            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), { header: true, align: tableToken.align[j] });
          }
          header += this.renderer.tablerow(cell);
          let body = "";
          for (let j = 0; j < tableToken.rows.length; j++) {
            const row = tableToken.rows[j];
            cell = "";
            for (let k2 = 0; k2 < row.length; k2++) {
              cell += this.renderer.tablecell(this.parseInline(row[k2].tokens), { header: false, align: tableToken.align[k2] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          const blockquoteToken = token;
          const body = this.parse(blockquoteToken.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          const listToken = token;
          const ordered = listToken.ordered;
          const start = listToken.start;
          const loose = listToken.loose;
          let body = "";
          for (let j = 0; j < listToken.items.length; j++) {
            const item = listToken.items[j];
            const checked = item.checked;
            const task = item.task;
            let itemBody = "";
            if (item.task) {
              const checkbox = this.renderer.checkbox(!!checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox + " "
                  });
                }
              } else {
                itemBody += checkbox + " ";
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, !!checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          const htmlToken = token;
          out += this.renderer.html(htmlToken.text, htmlToken.block);
          continue;
        }
        case "paragraph": {
          const paragraphToken = token;
          out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
          continue;
        }
        case "text": {
          let textToken = token;
          let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
          while (i2 + 1 < tokens.length && tokens[i2 + 1].type === "text") {
            textToken = tokens[++i2];
            body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i2 = 0; i2 < tokens.length; i2++) {
      const token = tokens[i2];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          const escapeToken = token;
          out += renderer.text(escapeToken.text);
          break;
        }
        case "html": {
          const tagToken = token;
          out += renderer.html(tagToken.text);
          break;
        }
        case "link": {
          const linkToken = token;
          out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
          break;
        }
        case "image": {
          const imageToken = token;
          out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
          break;
        }
        case "strong": {
          const strongToken = token;
          out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
          break;
        }
        case "em": {
          const emToken = token;
          out += renderer.em(this.parseInline(emToken.tokens, renderer));
          break;
        }
        case "codespan": {
          const codespanToken = token;
          out += renderer.codespan(codespanToken.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          const delToken = token;
          out += renderer.del(this.parseInline(delToken.tokens, renderer));
          break;
        }
        case "text": {
          const textToken = token;
          out += renderer.text(textToken.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
}
class _Hooks {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || _defaults;
  }
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
}
__publicField(_Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess"
]));
class Marked {
  constructor(...args) {
    __privateAdd(this, _parseMarkdown);
    __privateAdd(this, _onError);
    __publicField(this, "defaults", _getDefaults());
    __publicField(this, "options", this.setOptions);
    __publicField(this, "parse", __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(this, _Lexer.lex, _Parser.parse));
    __publicField(this, "parseInline", __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(this, _Lexer.lexInline, _Parser.parseInline));
    __publicField(this, "Parser", _Parser);
    __publicField(this, "parser", _Parser.parse);
    __publicField(this, "Renderer", _Renderer);
    __publicField(this, "TextRenderer", _TextRenderer);
    __publicField(this, "Lexer", _Lexer);
    __publicField(this, "lexer", _Lexer.lex);
    __publicField(this, "Tokenizer", _Tokenizer);
    __publicField(this, "Hooks", _Hooks);
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    var _a, _b;
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if ((_b = (_a = this.defaults.extensions) == null ? void 0 : _a.childTokens) == null ? void 0 : _b[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              values = values.concat(this.walkTokens(genericToken[childTokens], callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          const rendererFunc = pack.renderer[prop];
          const rendererKey = prop;
          const prevRenderer = renderer[rendererKey];
          renderer[rendererKey] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          const tokenizerFunc = pack.tokenizer[prop];
          const tokenizerKey = prop;
          const prevTokenizer = tokenizer[tokenizerKey];
          tokenizer[tokenizerKey] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          const hooksFunc = pack.hooks[prop];
          const hooksKey = prop;
          const prevHook = hooks[hooksKey];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksKey] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksKey] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens) {
            values = values.concat(walkTokens.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
}
_parseMarkdown = new WeakSet();
parseMarkdown_fn = function(lexer, parser) {
  return (src, options) => {
    const origOpt = { ...options };
    const opt = { ...this.defaults, ...origOpt };
    if (this.defaults.async === true && origOpt.async === false) {
      if (!opt.silent) {
        console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
      }
      opt.async = true;
    }
    const throwError = __privateMethod(this, _onError, onError_fn).call(this, !!opt.silent, !!opt.async);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer(src, opt);
      if (opt.walkTokens) {
        this.walkTokens(tokens, opt.walkTokens);
      }
      let html2 = parser(tokens, opt);
      if (opt.hooks) {
        html2 = opt.hooks.postprocess(html2);
      }
      return html2;
    } catch (e2) {
      return throwError(e2);
    }
  };
};
_onError = new WeakSet();
onError_fn = function(silent, async) {
  return (e2) => {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape(e2.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e2);
    }
    throw e2;
  };
};
const markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options) {
  markedInstance.setOptions(options);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
marked.options;
marked.setOptions;
marked.use;
marked.walkTokens;
marked.parseInline;
_Parser.parse;
_Lexer.lex;
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let DocumentPreviewerComponent = class extends s {
  constructor() {
    super(...arguments);
    this.url = void 0;
    this.previewContent = void 0;
    this.loading = false;
  }
  retrieveMarkdown() {
    if (this.url) {
      fetch(this.url).then((response) => response.text()).then((text2) => {
        this.previewContent = marked.parse(text2);
      }).finally(() => {
        this.loading = false;
      });
    }
  }
  willUpdate(_changedProperties) {
    if (this.url && _changedProperties.has("url") && _changedProperties.get("url") !== this.url && this.url.endsWith(".md")) {
      this.loading = true;
      this.retrieveMarkdown();
    }
  }
  renderContent() {
    if (this.url) {
      return x`
        ${this.previewContent ? x` ${o$1(this.previewContent)}` : x` <iframe title="Preview" src="${this.url}" width="100%" height="850px" sandbox />`}
      `;
    }
    return x``;
  }
  render() {
    return x`
      ${this.loading ? x`<loading-indicator label="${globalConfig.LOADING_TEXT}"></loading-indicator>` : this.renderContent()}
    `;
  }
};
__decorateClass$4([
  n$1({ type: String })
], DocumentPreviewerComponent.prototype, "url", 2);
__decorateClass$4([
  t$2()
], DocumentPreviewerComponent.prototype, "previewContent", 2);
__decorateClass$4([
  t$2()
], DocumentPreviewerComponent.prototype, "loading", 2);
DocumentPreviewerComponent = __decorateClass$4([
  e$3("document-previewer")
], DocumentPreviewerComponent);
const styles$2 = i$4`
  .subheadline--small {
    font-size: 12px;
    display: inline-block;
  }
  .items__list {
    border-top: none;
    padding: 0 var(--d-base);
    margin: var(--d-small) 0;
    display: block;
  }
  .items__listItem {
    display: inline-block;
    background-color: var(--c-accent-light);
    border-radius: var(--radius-small);
    text-decoration: none;
    padding: var(--d-xsmall);
    margin-top: 5px;
    font-size: var(--font-small);
  }
  .items__listItem.active {
    background-color: var(--c-accent-high);
  }
  .items__listItem:not(first-child) {
    margin-left: 5px;
  }
  .items__link {
    text-decoration: none;
    color: var(--text-color);
  }
  .items__listItem.active .items__link {
    color: var(--c-white);
  }
`;
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
let CitationListComponent = class extends s {
  constructor() {
    super(...arguments);
    this.label = void 0;
    this.citations = void 0;
    this.selectedCitation = void 0;
  }
  handleCitationClick(citation, event) {
    event.preventDefault();
    this.selectedCitation = citation;
    const citationClickEvent = new CustomEvent("on-citation-click", {
      detail: {
        citation
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(citationClickEvent);
  }
  compareCitation(citationA, citationB) {
    if (citationA && citationB && citationA.text === citationB.text) {
      return true;
    }
    return false;
  }
  renderCitation(citations) {
    if (citations && citations.length > 0) {
      return x`
        <ol class="items__list">
          ${this.label ? x`<h3 class="subheadline--small">${this.label}</h3>` : ""}
          ${citations.map(
        (citation) => x`
              <li class="items__listItem ${this.compareCitation(citation, this.selectedCitation) ? "active" : ""}">
                <a
                  class="items__link"
                  href="#"
                  data-testid="citation"
                  @click="${(event) => this.handleCitationClick(citation, event)}"
                  >${citation.ref}. ${citation.text}</a
                >
              </li>
            `
      )}
        </ol>
      `;
    }
    return "";
  }
  render() {
    return this.renderCitation(this.citations);
  }
};
CitationListComponent.styles = [styles$2];
__decorateClass$3([
  n$1({ type: String })
], CitationListComponent.prototype, "label", 2);
__decorateClass$3([
  n$1({ type: Array })
], CitationListComponent.prototype, "citations", 2);
__decorateClass$3([
  n$1({ type: Object })
], CitationListComponent.prototype, "selectedCitation", 2);
CitationListComponent = __decorateClass$3([
  e$3("citation-list")
], CitationListComponent);
const styles$1 = i$4`
  ul {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  @keyframes chatmessageanimation {
    0% {
      opacity: 0.5;
      top: 80px;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }
  .chat__header--button {
    display: flex;
    align-items: center;
  }
  .chat__header {
    display: flex;
    align-items: top;
    justify-content: flex-end;
    padding: var(--d-base);
  }
  .chat__header--button {
    margin-right: var(--d-base);
  }
  .chat__list {
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    list-style-position: inside;
    padding-inline-start: 0;
  }
  .chat__footer {
    width: 100%;
    height: calc(var(--d-large) + var(--d-base));
  }
  .chat__listItem {
    max-width: var(--width-wide);
    min-width: var(--width-base);
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: flex-start;

    @media (min-width: 768px) {
      max-width: 55%;
      min-width: var(--width-narrow);
    }
  }
  .chat__txt {
    animation: chatmessageanimation 0.1s ease-in-out;
    background-color: var(--c-secondary);
    color: var(--text-color);
    border-radius: var(--radius-base);
    margin-top: 8px;
    word-wrap: break-word;
    margin-block-end: 0;
    position: relative;
    box-shadow: var(--shadow);
    border: var(--border-thin) solid var(--c-light-gray);
  }
  .chat__txt.error {
    border: var(--border-base) solid var(--error-color);
    color: var(--error-color);
    padding: var(--d-base);
    background: var(--c-error-background);
  }
  .chat__txt.user-message {
    background: linear-gradient(to left, var(--c-accent-dark), var(--c-accent-high));
    color: var(--c-white);
    border: var(--border-thin) solid var(--c-accent-light);
  }
  .chat__listItem.user-message {
    align-self: flex-end;
    align-items: flex-end;
  }
  .chat__txt--entry {
    padding: 0 var(--d-base);
  }
  .chat__txt--info {
    font-size: smaller;
    font-style: italic;
    margin: 0;
    margin-top: var(--border-thin);
  }
  .user-message .chat__txt--info {
    text-align: right;
  }
  .items__listWrapper {
    border-top: var(--border-thin) solid var(--c-light-gray);
    display: grid;
    padding: 0 var(--d-base);
    grid-template-columns: 1fr 18fr;
  }
  .items__listWrapper svg {
    fill: var(--c-accent-high);
    width: var(--d-large);
    margin: var(--d-large) auto;
  }
  svg {
    height: auto;
    fill: var(--text-color);
  }
  .items__list.followup {
    display: flex;
    flex-direction: row;
    padding: var(--d-base);
    list-style-type: none;
    flex-wrap: wrap;
  }
  .items__list.steps {
    padding: 0 var(--d-base) 0 var(--d-xlarge);
    list-style-type: disc;
  }
  .chat__citations {
    border-top: var(--border-thin) solid var(--c-light-gray);
  }
  .items__list {
    margin: var(--d-small) 0;
    display: block;
    padding: 0 var(--d-base);
  }
  .items__listItem--followup {
    cursor: pointer;
    padding: 0 var(--d-xsmall);
    border-radius: var(--radius-base);
    border: var(--border-thin) solid var(--c-accent-high);
    margin: var(--d-xsmall);
    transition: background-color 0.3s ease-in-out;
  }
  .items__listItem--followup:hover,
  .items__listItem--followup:focus {
    background-color: var(--c-accent-light);
    cursor: pointer;
  }
  .items__link {
    text-decoration: none;
    color: var(--text-color);
  }
  .steps .items__listItem--step {
    padding: var(--d-xsmall) 0;
    font-size: var(--font-base);
    line-height: 1;
  }
  .followup .items__link {
    color: var(--c-accent-high);
    display: block;
    padding: var(--d-xsmall) 0;
    border-bottom: var(--border-thin) solid var(--c-light-gray);
    font-size: var(--font-small);
  }
  .citation {
    background-color: var(--c-accent-light);
    border-radius: 3px;
    padding: calc(var(--d-small) / 5);
    margin-left: 3px;
  }
`;
const iconSuccess = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\r\n  <path d="M1491 595l90 90-749 749-365-365 90-90 275 275 659-659zM1024 0q141 0 272 36t245 103 207 160 160 208 103 245 37 272q0 141-36 272t-103 245-160 207-208 160-245 103-272 37q-141 0-272-36t-245-103-207-160-160-208-103-244-37-273q0-141 36-272t103-245 160-207 208-160T751 37t273-37zm0 1920q123 0 237-32t214-90 182-141 140-181 91-214 32-238q0-123-32-237t-90-214-141-182-181-140-214-91-238-32q-123 0-237 32t-214 90-182 141-140 181-91 214-32 238q0 123 32 237t90 214 141 182 181 140 214 91 238 32z" />\r\n</svg>';
const iconCopyToClipboard = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">\r\n  <path d="M1920 805v1243H640v-384H128V0h859l384 384h128l421 421zm-384-37h165l-165-165v165zM640 384h549L933 128H256v1408h384V384zm1152 512h-384V512H768v1408h1024V896z" />\r\n</svg>';
const iconQuestion = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">\r\n  <path d="M12.5001 3C6.70106 3 2.00005 7.70101 2.00005 13.5C2.00005 14.7989 2.23632 16.044 2.66849 17.1938C2.79635 17.534 2.94135 17.8658 3.10245 18.1881L2.0527 22.1058C1.75384 23.2212 2.77447 24.2418 3.88982 23.943L7.80465 22.894C9.2185 23.6019 10.8141 24 12.5001 24C18.299 24 23.0001 19.299 23.0001 13.5C23.0001 7.70101 18.299 3 12.5001 3ZM5.04572 17.5882C4.37944 16.3761 4.00005 14.9839 4.00005 13.5C4.00005 8.80558 7.80563 5 12.5001 5C17.1945 5 21.0001 8.80558 21.0001 13.5C21.0001 18.1944 17.1945 22 12.5001 22C11.0137 22 9.61924 21.6193 8.4058 20.951C8.1796 20.8264 7.91397 20.7941 7.66452 20.861L4.2087 21.787L5.13533 18.3287C5.2021 18.0796 5.16999 17.8142 5.04572 17.5882ZM14.4549 25.3417C13.8187 25.446 13.1657 25.5002 12.5 25.5002C12.2132 25.5002 11.9287 25.4901 11.647 25.4703C13.5704 27.6358 16.3758 29.0002 19.5 29.0002C21.186 29.0002 22.7815 28.6021 24.1954 27.8941L28.1102 28.9431C29.2255 29.242 30.2462 28.2214 29.9473 27.106L28.8976 23.1883C29.0587 22.8659 29.2037 22.5341 29.3315 22.194C29.7637 21.0442 30 19.799 30 18.5002C30 14.1361 27.3376 10.3939 23.5485 8.80908C23.9114 9.6628 24.1783 10.5672 24.3355 11.5087C26.5498 13.0431 28 15.6023 28 18.5002C28 19.984 27.6206 21.3763 26.9543 22.5883C26.83 22.8144 26.7979 23.0797 26.8647 23.3289L27.7913 26.7871L24.3355 25.8611C24.086 25.7943 23.8204 25.8266 23.5942 25.9511C22.3808 26.6195 20.9863 27.0002 19.5 27.0002C17.611 27.0002 15.866 26.384 14.4549 25.3417ZM11.5 15C11.5 15.55 11.95 16 12.5 16C13.05 16 13.5 15.55 13.5 15C13.5 14.0992 14.0096 13.5217 14.6019 12.8505L14.62 12.83C15.27 12.09 16 11.21 16 10C16 8.79 15.07 7 12.5 7C9.93 7 9 8.79 9 10C9 10.55 9.45 11 10 11C10.55 11 11 10.55 11 10C11 9.83 11.07 9 12.5 9C13.82 9 13.99 9.71 14 10C14 10.48 13.68 10.86 13.12 11.5L13.1009 11.5217C12.3842 12.3378 11.5 13.3447 11.5 15ZM13.75 18.75C13.75 19.4404 13.1904 20 12.5 20C11.8096 20 11.25 19.4404 11.25 18.75C11.25 18.0596 11.8096 17.5 12.5 17.5C13.1904 17.5 13.75 18.0596 13.75 18.75Z" />\r\n</svg>';
const styles = i$4`
  button {
    color: var(--text-color);
    text-decoration: underline;
    border: var(--border-thin) solid var(--c-accent-dark);
    text-decoration: none;
    border-radius: var(--radius-small);
    background: var(--c-white);
    display: flex;
    align-items: center;
    margin-left: 5px;
    opacity: 1;
    padding: var(--d-xsmall);
    transition: all 0.3s ease-in-out;
    position: relative;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  span {
    font-size: smaller;
    transition: all 0.3s ease-out 0s;
    position: absolute;
    text-align: right;
    top: -80%;
    background: var(--c-accent-dark);
    color: var(--c-white);
    opacity: 0;
    right: 0;
    padding: var(--d-xsmall) var(--d-small);
    border-radius: var(--radius-small);
    font-weight: bold;
    word-wrap: nowrap;
  }
  span::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: var(--border-thick) solid var(--c-accent-dark);
    bottom: -8px;
    right: 5px;
  }
  svg {
    fill: currentColor;
    padding: var(--d-xsmall);
    width: var(--d-base);
    height: var(--d-base);
  }
  button:hover > span,
  button:focus > span {
    display: inline-block;
    opacity: 1;
  }
  button:hover,
  button:focus,
  button:hover > svg,
  button:focus > svg {
    background-color: var(--c-light-gray);
    border-radius: var(--radius-small);
    transition: background 0.3s ease-in-out;
  }
`;
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let ChatActionButtonComponent = class extends s {
  constructor() {
    super(...arguments);
    this.label = "";
    this.svgIcon = "";
    this.isDisabled = false;
    this.actionId = "";
    this.tooltip = void 0;
  }
  render() {
    return x`
      <button title="${this.label}" data-testid="${this.actionId}" ?disabled="${this.isDisabled}">
        <span>${this.tooltip ?? this.label}</span>
        ${o2(this.svgIcon)}
      </button>
    `;
  }
};
ChatActionButtonComponent.styles = [styles];
__decorateClass$2([
  n$1({ type: String })
], ChatActionButtonComponent.prototype, "label", 2);
__decorateClass$2([
  n$1({ type: String })
], ChatActionButtonComponent.prototype, "svgIcon", 2);
__decorateClass$2([
  n$1({ type: Boolean })
], ChatActionButtonComponent.prototype, "isDisabled", 2);
__decorateClass$2([
  n$1({ type: String })
], ChatActionButtonComponent.prototype, "actionId", 2);
__decorateClass$2([
  n$1({ type: String })
], ChatActionButtonComponent.prototype, "tooltip", 2);
ChatActionButtonComponent = __decorateClass$2([
  e$3("chat-action-button")
], ChatActionButtonComponent);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let ChatThreadComponent = class extends s {
  constructor() {
    super(...arguments);
    this.chatThread = [];
    this.actionButtons = [];
    this.isDisabled = false;
    this.isProcessingResponse = false;
    this.isResponseCopied = false;
    this.selectedCitation = void 0;
  }
  // Copy response to clipboard
  copyResponseToClipboard(entry) {
    const response = chatEntryToString(entry);
    navigator.clipboard.writeText(response);
    this.isResponseCopied = true;
  }
  actionButtonClicked(actionButton, entry, event) {
    event.preventDefault();
    const actionButtonClickedEvent = new CustomEvent("on-action-button-click", {
      detail: {
        id: actionButton.id,
        chatThreadEntry: entry
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(actionButtonClickedEvent);
  }
  // debounce dispatching must-scroll event
  debounceScrollIntoView() {
    let timeout = 0;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (this.chatFooter) {
        this.chatFooter.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    }, 500);
  }
  handleFollowupQuestionClick(question, entry, event) {
    event.preventDefault();
    const followUpClickEvent = new CustomEvent("on-followup-click", {
      detail: {
        question,
        chatThreadEntry: entry
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(followUpClickEvent);
  }
  handleCitationClick(citation, entry, event) {
    event.preventDefault();
    this.selectedCitation = citation;
    const citationClickEvent = new CustomEvent("on-citation-click", {
      detail: {
        citation,
        chatThreadEntry: entry
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(citationClickEvent);
  }
  renderResponseActions(entry) {
    return x`
      <header class="chat__header">
        <div class="chat__header--button">
          ${this.actionButtons.map(
      (actionButton) => x`
              <chat-action-button
                .label="${actionButton.label}"
                .svgIcon="${actionButton.svgIcon}"
                .isDisabled="${actionButton.isDisabled}"
                .actionId="${actionButton.id}"
                @click="${(event) => this.actionButtonClicked(actionButton, entry, event)}"
              ></chat-action-button>
            `
    )}
          <chat-action-button
            .label="${globalConfig.COPY_RESPONSE_BUTTON_LABEL_TEXT}"
            .svgIcon="${this.isResponseCopied ? iconSuccess : iconCopyToClipboard}"
            .isDisabled="${this.isDisabled}"
            actionId="copy-to-clipboard"
            .tooltip="${this.isResponseCopied ? globalConfig.COPIED_SUCCESSFULLY_MESSAGE : globalConfig.COPY_RESPONSE_BUTTON_LABEL_TEXT}"
            @click="${this.copyResponseToClipboard}"
          ></chat-action-button>
        </div>
      </header>
    `;
  }
  renderTextEntry(textEntry) {
    const entries2 = [x`<p class="chat__txt--entry">${o$1(textEntry.value)}</p>`];
    if (textEntry.followingSteps && textEntry.followingSteps.length > 0) {
      entries2.push(x`
        <ol class="items__list steps">
          ${textEntry.followingSteps.map(
        (followingStep) => x` <li class="items__listItem--step">${o$1(followingStep)}</li> `
      )}
        </ol>
      `);
    }
    if (this.isProcessingResponse) {
      this.debounceScrollIntoView();
    }
    return x`<div class="chat_txt--entry-container">${entries2}</div>`;
  }
  renderCitation(entry) {
    const citations = entry.citations;
    if (citations && citations.length > 0) {
      return x`
        <div class="chat__citations">
          <citation-list
            .citations="${citations}"
            .label="${globalConfig.CITATIONS_LABEL}"
            .selectedCitation=${this.selectedCitation}
            @on-citation-click="${(event) => this.handleCitationClick(event.detail.citation, entry, event)}"
          ></citation-list>
        </div>
      `;
    }
    return "";
  }
  renderFollowupQuestions(entry) {
    const followupQuestions = entry.followupQuestions;
    if (followupQuestions && followupQuestions.length > 0) {
      return x`
        <div class="items__listWrapper">
          ${o2(iconQuestion)}
          <ul class="items__list followup">
            ${followupQuestions.map(
        (followupQuestion) => x`
                <li class="items__listItem--followup">
                  <a
                    class="items__link"
                    href="#"
                    data-testid="followUpQuestion"
                    @click="${(event) => this.handleFollowupQuestionClick(followupQuestion, entry, event)}"
                    >${followupQuestion}</a
                  >
                </li>
              `
      )}
          </ul>
        </div>
      `;
    }
    return "";
  }
  renderError(error) {
    return x`<p class="chat__txt error">${error.message}</p>`;
  }
  render() {
    return x`
      <ul class="chat__list" aria-live="assertive">
        ${this.chatThread.map(
      (message) => x`
            <li class="chat__listItem ${message.isUserMessage ? "user-message" : ""}">
              <div class="chat__txt ${message.isUserMessage ? "user-message" : ""}">
                ${message.isUserMessage ? "" : this.renderResponseActions(message)}
                ${message.text.map((textEntry) => this.renderTextEntry(textEntry))} ${this.renderCitation(message)}
                ${this.renderFollowupQuestions(message)} ${message.error ? this.renderError(message.error) : ""}
              </div>
              <p class="chat__txt--info">
                <span class="timestamp">${message.timestamp}</span>,
                <span class="user">${message.isUserMessage ? "You" : globalConfig.USER_IS_BOT}</span>
              </p>
            </li>
          `
    )}
      </ul>
      <div class="chat__footer" id="chat-list-footer">
        <!-- Do not delete this element. It is used for auto-scrolling -->
      </div>
    `;
  }
};
ChatThreadComponent.styles = [styles$1];
__decorateClass$1([
  n$1({ type: Array })
], ChatThreadComponent.prototype, "chatThread", 2);
__decorateClass$1([
  n$1({ type: Array })
], ChatThreadComponent.prototype, "actionButtons", 2);
__decorateClass$1([
  n$1({ type: Boolean })
], ChatThreadComponent.prototype, "isDisabled", 2);
__decorateClass$1([
  n$1({ type: Boolean })
], ChatThreadComponent.prototype, "isProcessingResponse", 2);
__decorateClass$1([
  t$2()
], ChatThreadComponent.prototype, "isResponseCopied", 2);
__decorateClass$1([
  i$1("#chat-list-footer")
], ChatThreadComponent.prototype, "chatFooter", 2);
__decorateClass$1([
  n$1({ type: Object })
], ChatThreadComponent.prototype, "selectedCitation", 2);
ChatThreadComponent = __decorateClass$1([
  e$3("chat-thread-component")
], ChatThreadComponent);
async function callHttpApi({ question, type, approach, overrides, messages }, { method, url, stream, signal }) {
  return await fetch(`${url}/${type}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    signal,
    body: JSON.stringify({
      messages: [
        ...messages ?? [],
        {
          content: question,
          role: "user"
        }
      ],
      context: {
        ...overrides,
        approach
      },
      stream: type === "chat" ? stream : false
    })
  });
}
async function getAPIResponse(requestOptions2, httpOptions) {
  const response = await callHttpApi(requestOptions2, httpOptions);
  const streamResponse = requestOptions2.type === "ask" ? false : httpOptions.stream;
  if (streamResponse) {
    return response;
  }
  const parsedResponse = await response.json();
  if (response.status > 299 || !response.ok) {
    throw new ChatResponseError(response.statusText, response.status) || "API Response Error";
  }
  return parsedResponse;
}
class NdJsonParserStream extends TransformStream {
  constructor() {
    let controller;
    super({
      start: (_controller) => {
        controller = _controller;
      },
      transform: (chunk) => {
        const jsonChunks = chunk.split("\n").filter(Boolean);
        for (const jsonChunk of jsonChunks) {
          try {
            this.buffer += jsonChunk;
            controller.enqueue(JSON.parse(this.buffer));
            this.buffer = "";
          } catch {
          }
        }
      }
    });
    this.buffer = "";
  }
}
function createReader(responseBody) {
  return responseBody == null ? void 0 : responseBody.pipeThrough(new TextDecoderStream()).pipeThrough(new NdJsonParserStream()).getReader();
}
async function* readStream(reader) {
  if (!reader) {
    throw new Error("No response body or body is not readable");
  }
  let value;
  let done;
  while ({ value, done } = await reader.read(), !done) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, globalConfig.BOT_TYPING_EFFECT_INTERVAL);
    });
  }
}
function cancelStream(stream) {
  if (stream) {
    stream.cancel();
  }
}
async function parseStreamedMessages({
  chatEntry,
  apiResponseBody,
  signal,
  onChunkRead: onVisit,
  onCancel
}) {
  var _a;
  const reader = createReader(apiResponseBody);
  const chunks = readStream(reader);
  const streamedMessageRaw = [];
  const stepsBuffer = [];
  const followupQuestionsBuffer = [];
  let isProcessingStep = false;
  let isLastStep = false;
  let isFollowupQuestion = false;
  let followUpQuestionIndex = 0;
  let stepIndex = 0;
  let textBlockIndex = 0;
  let updatedEntry = {
    ...chatEntry
  };
  for await (const chunk of chunks) {
    if (signal.aborted) {
      onCancel();
      return;
    }
    if (chunk.error) {
      throw new ChatResponseError(chunk.message, chunk.statusCode);
    }
    if (chunk.choices[0].finish_reason === "content_filter") {
      throw new ChatResponseError("Content filtered", 400);
    }
    const { content, context } = chunk.choices[0].delta;
    if (context == null ? void 0 : context.data_points) {
      updatedEntry.dataPoints = context.data_points ?? [];
      updatedEntry.thoughts = context.thoughts ?? "";
      continue;
    }
    let chunkValue = content ?? "";
    if (chunkValue === "") {
      continue;
    }
    streamedMessageRaw.push(chunkValue);
    const LIST_ITEM_NUMBER = /(\d+)/;
    let matchedStepIndex = (_a = chunkValue.match(LIST_ITEM_NUMBER)) == null ? void 0 : _a[0];
    if (matchedStepIndex) {
      stepsBuffer.push(matchedStepIndex);
      continue;
    }
    const matchedFollowupQuestionMarker = !isFollowupQuestion && chunkValue.includes("Next") || chunkValue.includes("<<");
    if (matchedFollowupQuestionMarker) {
      isFollowupQuestion = true;
      followupQuestionsBuffer.push(chunkValue);
      continue;
    } else if (followupQuestionsBuffer.length > 0 && chunkValue.includes("Question")) {
      isFollowupQuestion = true;
      followupQuestionsBuffer.push(chunkValue);
      continue;
    } else if (chunkValue.includes("<<") && isFollowupQuestion) {
      isFollowupQuestion = true;
      continue;
    } else if (chunkValue.includes(">\n")) {
      followUpQuestionIndex = followUpQuestionIndex + 1;
      isFollowupQuestion = true;
      continue;
    } else if (isFollowupQuestion) {
      isFollowupQuestion = true;
      chunkValue = chunkValue.replace(/:?\n/, "").replaceAll(">", "");
    }
    if (stepsBuffer.length > 0 && chunkValue.includes(".")) {
      isProcessingStep = true;
      matchedStepIndex = stepsBuffer[0];
      stepsBuffer.length = 0;
    } else if (chunkValue.includes("\n\n")) {
      if (isProcessingStep) {
        isLastStep = true;
      }
    }
    if (matchedStepIndex || isProcessingStep || isFollowupQuestion) {
      if (matchedStepIndex) {
        chunkValue = "";
      }
      stepIndex = matchedStepIndex ? Number(matchedStepIndex) - 1 : stepIndex;
      updatedEntry = updateFollowingStepOrFollowupQuestionEntry({
        chunkValue,
        textBlockIndex,
        stepIndex,
        isFollowupQuestion,
        followUpQuestionIndex,
        chatEntry: updatedEntry
      });
      if (isLastStep) {
        isProcessingStep = false;
        isLastStep = false;
        isFollowupQuestion = false;
        stepIndex = 0;
        textBlockIndex++;
      }
    } else {
      updatedEntry = updateTextEntry({ chunkValue, textBlockIndex, chatEntry: updatedEntry });
    }
    const citations = parseCitations(streamedMessageRaw.join(""));
    updatedEntry = updateCitationsEntry({ citations, chatEntry: updatedEntry });
    onVisit(updatedEntry);
  }
}
function updateCitationsEntry({
  citations,
  chatEntry
}) {
  const lastMessageEntry = chatEntry;
  const updateCitationReference = (match, capture) => {
    const citation = citations.find((citation2) => citation2.text === capture);
    if (citation) {
      return `<sup class="citation">${citation.ref}</sup>`;
    }
    return match;
  };
  const textEntrys = lastMessageEntry.text.map((textEntry) => {
    var _a;
    const value = textEntry.value.replaceAll(/\[(.*?)]/g, updateCitationReference);
    const followingSteps = (_a = textEntry.followingSteps) == null ? void 0 : _a.map(
      (step) => step.replaceAll(/\[(.*?)]/g, updateCitationReference)
    );
    return {
      value,
      followingSteps
    };
  });
  return {
    ...lastMessageEntry,
    text: textEntrys,
    citations
  };
}
function parseCitations(inputText) {
  const findCitations = /\[(.*?)]/g;
  const citation = {};
  let referenceCounter = 1;
  inputText.replaceAll(findCitations, (_2, capture) => {
    const citationText = capture.trim();
    if (!citation[citationText]) {
      citation[citationText] = referenceCounter++;
    }
    return "";
  });
  return Object.keys(citation).map((text2, index) => ({
    ref: index + 1,
    text: text2
  }));
}
function updateTextEntry({
  chunkValue,
  textBlockIndex,
  chatEntry
}) {
  const { text: lastChatMessageTextEntry } = chatEntry;
  const block2 = lastChatMessageTextEntry[textBlockIndex] ?? {
    value: "",
    followingSteps: []
  };
  const value = (block2.value || "") + chunkValue;
  return {
    ...chatEntry,
    text: newListWithEntryAtIndex(lastChatMessageTextEntry, textBlockIndex, {
      ...block2,
      value
    })
  };
}
function updateFollowingStepOrFollowupQuestionEntry({
  chunkValue,
  textBlockIndex,
  stepIndex,
  isFollowupQuestion,
  followUpQuestionIndex,
  chatEntry
}) {
  const { followupQuestions, text: lastChatMessageTextEntry } = chatEntry;
  if (isFollowupQuestion && followupQuestions) {
    const question = (followupQuestions[followUpQuestionIndex] || "") + chunkValue;
    return {
      ...chatEntry,
      followupQuestions: newListWithEntryAtIndex(followupQuestions, followUpQuestionIndex, question)
    };
  }
  if (lastChatMessageTextEntry && lastChatMessageTextEntry[textBlockIndex]) {
    const { followingSteps } = lastChatMessageTextEntry[textBlockIndex];
    if (followingSteps) {
      const step = (followingSteps[stepIndex] || "") + chunkValue;
      return {
        ...chatEntry,
        text: newListWithEntryAtIndex(lastChatMessageTextEntry, textBlockIndex, {
          ...lastChatMessageTextEntry[textBlockIndex],
          followingSteps: newListWithEntryAtIndex(followingSteps, stepIndex, step)
        })
      };
    }
  }
  return chatEntry;
}
class ChatController {
  constructor(host) {
    this._generatingAnswer = false;
    this._isAwaitingResponse = false;
    this._isProcessingResponse = false;
    this._processingMessage = void 0;
    this._abortController = new AbortController();
    (this.host = host).addController(this);
  }
  get isAwaitingResponse() {
    return this._isAwaitingResponse;
  }
  get isProcessingResponse() {
    return this._isProcessingResponse;
  }
  get processingMessage() {
    return this._processingMessage;
  }
  get generatingAnswer() {
    return this._generatingAnswer;
  }
  set generatingAnswer(value) {
    this._generatingAnswer = value;
    this.host.requestUpdate();
  }
  set processingMessage(value) {
    this._processingMessage = value ? {
      ...value
    } : void 0;
    this.host.requestUpdate();
  }
  set isAwaitingResponse(value) {
    this._isAwaitingResponse = value;
    this.host.requestUpdate();
  }
  set isProcessingResponse(value) {
    this._isProcessingResponse = value;
    this.host.requestUpdate();
  }
  hostConnected() {
  }
  hostDisconnected() {
  }
  clear() {
    this._isAwaitingResponse = false;
    this._isProcessingResponse = false;
    this._generatingAnswer = false;
    this.host.requestUpdate();
  }
  reset() {
    this._processingMessage = void 0;
    this.clear();
  }
  async processResponse(response, isUserMessage = false, useStream = false) {
    var _a, _b;
    const citations = [];
    const followingSteps = [];
    const followupQuestions = [];
    const timestamp = getTimestamp();
    let thoughts;
    let dataPoints;
    const updateChatWithMessageOrChunk = async (message, chunked) => {
      this.processingMessage = {
        id: crypto.randomUUID(),
        text: [
          {
            value: chunked ? "" : message,
            followingSteps
          }
        ],
        followupQuestions,
        citations: [...new Set(citations)],
        timestamp,
        isUserMessage,
        thoughts,
        dataPoints
      };
      if (chunked && this.processingMessage) {
        this.isProcessingResponse = true;
        this._abortController = new AbortController();
        await parseStreamedMessages({
          chatEntry: this.processingMessage,
          signal: this._abortController.signal,
          apiResponseBody: message.body,
          onChunkRead: (updated) => {
            this.processingMessage = updated;
          },
          onCancel: () => {
            this.clear();
          }
        });
        this.clear();
      }
    };
    if (isUserMessage || typeof response === "string") {
      await updateChatWithMessageOrChunk(response, false);
    } else if (useStream) {
      await updateChatWithMessageOrChunk(response, true);
    } else {
      const generatedResponse = response.choices[0].message;
      const processedText = processText(generatedResponse.content, [citations, followingSteps, followupQuestions]);
      const messageToUpdate = processedText.replacedText;
      citations.push(...processedText.arrays[0]);
      followingSteps.push(...processedText.arrays[1]);
      followupQuestions.push(...processedText.arrays[2]);
      thoughts = ((_a = generatedResponse.context) == null ? void 0 : _a.thoughts) ?? "";
      dataPoints = ((_b = generatedResponse.context) == null ? void 0 : _b.data_points) ?? [];
      await updateChatWithMessageOrChunk(messageToUpdate, false);
    }
  }
  async generateAnswer(requestOptions2, httpOptions) {
    const { question } = requestOptions2;
    if (question) {
      try {
        this.generatingAnswer = true;
        if (requestOptions2.type === "chat") {
          await this.processResponse(question, true, false);
        }
        this.isAwaitingResponse = true;
        this.processingMessage = void 0;
        const response = await getAPIResponse(requestOptions2, httpOptions);
        this.isAwaitingResponse = false;
        await this.processResponse(response, false, httpOptions.stream);
      } catch (error_) {
        const error = error_;
        const chatError = {
          message: (error == null ? void 0 : error.code) === 400 ? globalConfig.INVALID_REQUEST_ERROR : globalConfig.API_ERROR_MESSAGE
        };
        if (!this.processingMessage) {
          await this.processResponse("", false, false);
        }
        if (this.processingMessage) {
          this.processingMessage = {
            ...this.processingMessage,
            error: chatError
          };
        }
      } finally {
        this.clear();
      }
    }
  }
  cancelRequest() {
    this._abortController.abort();
  }
}
const iconHistory = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n  <path d="M15.4,4.9a8.3,8.3,0,0,1,0,6.2,9.009,9.009,0,0,1-1.7,2.6,9.009,9.009,0,0,1-2.6,1.7A8.112,8.112,0,0,1,8,16a7.509,7.509,0,0,1-2.6-.4,7.609,7.609,0,0,1-2.3-1.3,7.31,7.31,0,0,1-1.7-1.8L.7,11.4c-.1-.4-.3-.8-.4-1.3l1-.2a7.207,7.207,0,0,0,.9,2,8.716,8.716,0,0,0,1.6,1.7,6.9,6.9,0,0,0,1.9,1A6.184,6.184,0,0,0,8,15l1.9-.2,1.6-.8a4.9,4.9,0,0,0,1.4-1.1A4.9,4.9,0,0,0,14,11.5a7.976,7.976,0,0,0,.8-1.6A12.233,12.233,0,0,0,15,8a12.233,12.233,0,0,0-.2-1.9A7.976,7.976,0,0,0,14,4.5a4.9,4.9,0,0,0-1.1-1.4A4.9,4.9,0,0,0,11.5,2a4.61,4.61,0,0,0-1.6-.7A6.283,6.283,0,0,0,8,1a6.879,6.879,0,0,0-2,.3,5.292,5.292,0,0,0-1.7.8A4.708,4.708,0,0,0,2.8,3.4,4.6,4.6,0,0,0,1.7,5H4V6H0V2H1V4.1l.3-.4.3-.5A9.122,9.122,0,0,1,3.3,1.5,7.6,7.6,0,0,1,5.5.4,7.308,7.308,0,0,1,8,0a8.112,8.112,0,0,1,3.1.6,9.009,9.009,0,0,1,2.6,1.7A9.009,9.009,0,0,1,15.4,4.9Z" />\n  <polygon points="8 3 8 7.3 10.9 10.1 10.1 10.9 7 7.7 7 3 8 3" />\n</svg>';
const iconHistoryDismiss = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="M4.75 12C4.75 15.743 7.58642 18.8235 11.2271 19.2093C11.4284 19.9498 11.7573 20.6378 12.1888 21.2481C12.126 21.2494 12.0631 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 11.6174 2.77322 11.2403 2.81834 10.8699C2.88069 10.3581 3.33398 10 3.8496 10C4.44068 10 4.86674 10.5685 4.79864 11.1556C4.76652 11.4326 4.75 11.7144 4.75 12ZM12.8096 13C13.5854 12.1915 14.5683 11.5832 15.6729 11.2603C15.4953 11.0986 15.2592 11 15 11H13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V12C11 12.5523 11.4477 13 12 13H12.8096ZM21.2481 12.1888C20.6378 11.7573 19.9498 11.4284 19.2093 11.2271C18.8235 7.58642 15.743 4.75 12 4.75C10.3379 4.75 8.80642 5.30932 7.58352 6.25H8.25C8.80228 6.25 9.25 6.69772 9.25 7.25C9.25 7.80228 8.80228 8.25 8.25 8.25H5.25C4.69772 8.25 4.25 7.80228 4.25 7.25V7H4.21647L4.25 6.94829V4.25C4.25 3.69772 4.69772 3.25 5.25 3.25C5.80228 3.25 6.25 3.69772 6.25 4.25V4.75385C7.82875 3.49939 9.82686 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 12.0631 21.2494 12.126 21.2481 12.1888ZM23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 14.4624 14.4624 12 17.5 12C20.5376 12 23 14.4624 23 17.5ZM15.8536 15.1464C15.6583 14.9512 15.3417 14.9512 15.1464 15.1464C14.9512 15.3417 14.9512 15.6583 15.1464 15.8536L16.7929 17.5L15.1464 19.1464C14.9512 19.3417 14.9512 19.6583 15.1464 19.8536C15.3417 20.0488 15.6583 20.0488 15.8536 19.8536L17.5 18.2071L19.1464 19.8536C19.3417 20.0488 19.6583 20.0488 19.8536 19.8536C20.0488 19.6583 20.0488 19.3417 19.8536 19.1464L18.2071 17.5L19.8536 15.8536C20.0488 15.6583 20.0488 15.3417 19.8536 15.1464C19.6583 14.9512 19.3417 14.9512 19.1464 15.1464L17.5 16.7929L15.8536 15.1464Z" />\n</svg>';
const _ChatHistoryController = class _ChatHistoryController2 {
  constructor(host) {
    this.chatHistory = [];
    this._showChatHistory = false;
    (this.host = host).addController(this);
  }
  get showChatHistory() {
    return this._showChatHistory;
  }
  set showChatHistory(value) {
    this._showChatHistory = value;
    this.host.requestUpdate();
  }
  hostConnected() {
    const chatHistory = localStorage.getItem(_ChatHistoryController2.CHATHISTORY_ID);
    if (chatHistory) {
      const history = JSON.parse(chatHistory);
      const lastUserMessagesIndexes = history.map((entry, index) => {
        if (entry.isUserMessage) {
          return index;
        }
      }).filter((index) => index !== void 0).slice(-MAX_CHAT_HISTORY);
      const trimmedHistory = lastUserMessagesIndexes.length === 0 ? history : history.slice(lastUserMessagesIndexes[0]);
      this.chatHistory = trimmedHistory;
    }
  }
  hostDisconnected() {
  }
  saveChatHistory(currentChat) {
    const newChatHistory = [...this.chatHistory, ...currentChat];
    localStorage.setItem(_ChatHistoryController2.CHATHISTORY_ID, JSON.stringify(newChatHistory));
  }
  handleChatHistoryButtonClick(event) {
    event.preventDefault();
    this.showChatHistory = !this.showChatHistory;
  }
  renderHistoryButton(options) {
    return x`
      <chat-action-button
        .label="${this.showChatHistory ? globalConfig.HIDE_CHAT_HISTORY_LABEL : globalConfig.SHOW_CHAT_HISTORY_LABEL}"
        actionId="chat-history-button"
        @click="${(event) => this.handleChatHistoryButtonClick(event)}"
        .isDisabled="${options == null ? void 0 : options.disabled}"
        .svgIcon="${this.showChatHistory ? iconHistoryDismiss : iconHistory}"
      >
      </chat-action-button>
    `;
  }
};
_ChatHistoryController.CHATHISTORY_ID = "ms-azoaicc:history";
let ChatHistoryController = _ChatHistoryController;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
let ChatComponent = class extends s {
  constructor() {
    super(...arguments);
    this.inputPosition = "sticky";
    this.interactionModel = "chat";
    this.apiUrl = chatHttpOptions.url;
    this.isCustomBranding = globalConfig.IS_CUSTOM_BRANDING;
    this.useStream = chatHttpOptions.stream;
    this.overrides = {};
    this.customStyles = {};
    this.isLocalStorageEnabled = true;
    this.isChatScrollEnabled = false;
    this.currentQuestion = "";
    this.threadComponent = new ChatThreadComponent();
    this.isDisabled = false;
    this.isChatStarted = false;
    this.isResetInput = false;
    this.chatController = new ChatController(this);
    this.chatHistoryController = new ChatHistoryController(this);
    this.isShowingThoughtProcess = false;
    this.isDefaultPromptsEnabled = !this.isChatStarted;
    this.selectedCitation = void 0;
    this.selectedChatEntry = void 0;
    this.selectedAsideTab = "tab-thought-process";
    this.chatThread = [];
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("customStyles")) {
      this.style.setProperty("--c-accent-high", this.customStyles.AccentHigh);
      this.style.setProperty("--c-accent-lighter", this.customStyles.AccentLight);
      this.style.setProperty("--c-accent-dark", this.customStyles.AccentDark);
      this.style.setProperty("--c-text-color", this.customStyles.TextColor);
      this.style.setProperty("--c-light-gray", this.customStyles.BackgroundColor);
      this.style.setProperty("--c-dark-gray", this.customStyles.ForegroundColor);
      this.style.setProperty("--c-base-gray", this.customStyles.FormBackgroundColor);
      this.style.setProperty("--radius-base", this.customStyles.BorderRadius);
      this.style.setProperty("--border-base", this.customStyles.BorderWidth);
      this.style.setProperty("--font-base", this.customStyles.FontBaseSize);
    }
  }
  // Send the question to the Open AI API and render the answer in the chat
  setQuestionInputValue(value) {
    this.questionInput.value = purify.sanitize(value || "");
    this.currentQuestion = this.questionInput.value;
  }
  handleVoiceInput(event) {
    var _a;
    event == null ? void 0 : event.preventDefault();
    this.setQuestionInputValue((_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.input);
  }
  handleQuestionInputClick(event) {
    var _a;
    event == null ? void 0 : event.preventDefault();
    this.setQuestionInputValue((_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.question);
  }
  handleCitationClick(event) {
    var _a, _b, _c;
    event == null ? void 0 : event.preventDefault();
    this.selectedCitation = (_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.citation;
    if (!this.isShowingThoughtProcess) {
      if ((_b = event == null ? void 0 : event.detail) == null ? void 0 : _b.chatThreadEntry) {
        this.selectedChatEntry = (_c = event == null ? void 0 : event.detail) == null ? void 0 : _c.chatThreadEntry;
      }
      this.handleExpandAside();
      this.selectedAsideTab = "tab-citations";
    }
  }
  getMessageContext() {
    if (this.interactionModel === "ask") {
      return [];
    }
    const history = [
      ...this.chatThread,
      // include the history from the previous session if the user has enabled the chat history
      ...this.isLocalStorageEnabled && this.chatHistoryController.showChatHistory ? this.chatHistoryController.chatHistory : []
    ];
    const messages = history.map((entry) => {
      return {
        content: chatEntryToString(entry),
        role: entry.isUserMessage ? "user" : "assistant"
      };
    });
    return messages;
  }
  // Handle the click on the chat button and send the question to the API
  async handleUserChatSubmit(event) {
    event.preventDefault();
    this.collapseAside(event);
    this.threadComponent.debounceScrollIntoView();
    const question = purify.sanitize(this.questionInput.value);
    this.isChatStarted = true;
    this.isDefaultPromptsEnabled = false;
    await this.chatController.generateAnswer(
      {
        ...requestOptions,
        overrides: {
          ...requestOptions.overrides,
          ...this.overrides
        },
        question,
        type: this.interactionModel,
        messages: this.getMessageContext()
      },
      {
        // use defaults
        ...chatHttpOptions,
        // override if the user has provided different values
        url: this.apiUrl,
        stream: this.useStream
      }
    );
    if (this.interactionModel === "chat" && this.isLocalStorageEnabled) {
      this.chatHistoryController.saveChatHistory(this.chatThread);
    }
    this.questionInput.value = "";
    this.isResetInput = false;
    this.dispatchEvent(
      new CustomEvent("chat-submit", {
        detail: {
          thread: this.chatThread
        },
        bubbles: true,
        composed: true
      })
    );
  }
  // Reset the input field and the current question
  resetInputField(event) {
    event.preventDefault();
    this.questionInput.value = "";
    this.currentQuestion = "";
    this.isResetInput = false;
  }
  // Reset the chat and show the default prompts
  resetCurrentChat(event) {
    this.isChatStarted = false;
    this.chatThread = [];
    this.isDisabled = false;
    this.isDefaultPromptsEnabled = true;
    this.selectedCitation = void 0;
    this.collapseAside(event);
    this.handleUserChatCancel(event);
    this.chatController.reset();
    if (this.isLocalStorageEnabled) {
      this.chatHistoryController.saveChatHistory([]);
    }
    this.dispatchEvent(
      new CustomEvent("chat-reset", {
        bubbles: true,
        composed: true
      })
    );
  }
  // Show the default prompts when enabled
  showDefaultPrompts(event) {
    if (!this.isDefaultPromptsEnabled) {
      this.resetCurrentChat(event);
    }
  }
  // Handle the change event on the input field
  handleOnInputChange() {
    this.isResetInput = !!this.questionInput.value;
  }
  // Stop generation
  handleUserChatCancel(event) {
    event == null ? void 0 : event.preventDefault();
    this.chatController.cancelRequest();
  }
  // show thought process aside
  handleExpandAside(event = void 0) {
    var _a, _b, _c, _d;
    event == null ? void 0 : event.preventDefault();
    this.isShowingThoughtProcess = true;
    this.selectedAsideTab = "tab-thought-process";
    (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("#overlay")) == null ? void 0 : _b.classList.add("active");
    (_d = (_c = this.shadowRoot) == null ? void 0 : _c.querySelector("#chat__containerWrapper")) == null ? void 0 : _d.classList.add("aside-open");
  }
  // hide thought process aside
  collapseAside(event) {
    var _a, _b, _c, _d;
    event.preventDefault();
    this.isShowingThoughtProcess = false;
    this.selectedCitation = void 0;
    (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("#chat__containerWrapper")) == null ? void 0 : _b.classList.remove("aside-open");
    (_d = (_c = this.shadowRoot) == null ? void 0 : _c.querySelector("#overlay")) == null ? void 0 : _d.classList.remove("active");
  }
  renderChatOrCancelButton() {
    const submitChatButton = x`<button
      class="chatbox__button"
      data-testid="submit-question-button"
      @click="${this.handleUserChatSubmit}"
      title="${globalConfig.CHAT_BUTTON_LABEL_TEXT}"
      ?disabled="${this.isDisabled}"
    >
      ${o2(iconSend)}
    </button>`;
    const cancelChatButton = x`<button
      class="chatbox__button"
      data-testid="cancel-question-button"
      @click="${this.handleUserChatCancel}"
      title="${globalConfig.CHAT_CANCEL_BUTTON_LABEL_TEXT}"
    >
      ${o2(iconCancel)}
    </button>`;
    return this.chatController.isProcessingResponse ? cancelChatButton : submitChatButton;
  }
  renderChatEntryTabContent(entry) {
    return x` <tab-component
      .tabs="${[
      {
        id: "tab-thought-process",
        label: globalConfig.THOUGHT_PROCESS_LABEL
      },
      {
        id: "tab-support-context",
        label: globalConfig.SUPPORT_CONTEXT_LABEL
      },
      {
        id: "tab-citations",
        label: globalConfig.CITATIONS_TAB_LABEL
      }
    ]}"
      .selectedTabId="${this.selectedAsideTab}"
    >
      <div slot="tab-thought-process" class="tab-component__content">
        ${entry && entry.thoughts ? x` <p class="tab-component__paragraph">${o$1(entry.thoughts)}</p> ` : ""}
      </div>
      <div slot="tab-support-context" class="tab-component__content">
        ${entry && entry.dataPoints ? x` <teaser-list-component
              .alwaysRow="${true}"
              .teasers="${entry.dataPoints.map((d2) => {
      return { description: d2 };
    })}"
            ></teaser-list-component>` : ""}
      </div>
      ${entry && entry.citations ? x`
            <div slot="tab-citations" class="tab-component__content">
              <citation-list
                .citations="${entry.citations}"
                .label="${globalConfig.CITATIONS_LABEL}"
                .selectedCitation="${this.selectedCitation}"
                @on-citation-click="${this.handleCitationClick}"
              ></citation-list>
              ${this.selectedCitation ? x`<document-previewer
                    url="${this.apiUrl}/content/${this.selectedCitation.text}"
                  ></document-previewer>` : ""}
            </div>
          ` : ""}
    </tab-component>`;
  }
  handleChatEntryActionButtonClick(event) {
    var _a, _b;
    if (((_a = event.detail) == null ? void 0 : _a.id) === "chat-show-thought-process") {
      this.selectedChatEntry = (_b = event.detail) == null ? void 0 : _b.chatThreadEntry;
      this.handleExpandAside(event);
    }
  }
  willUpdate() {
    this.isDisabled = this.chatController.generatingAnswer;
    if (this.chatController.processingMessage) {
      const processingEntry = this.chatController.processingMessage;
      const index = this.chatThread.findIndex((entry) => entry.id === processingEntry.id);
      this.chatThread = index > -1 ? newListWithEntryAtIndex(this.chatThread, index, processingEntry) : [...this.chatThread, processingEntry];
    }
  }
  renderChatThread(chatThread) {
    return x`<chat-thread-component
      id="thread-component"
      class="${this.isChatScrollEnabled ? "chat-scroll" : ""}"
      .chatThread="${chatThread}"
      .actionButtons="${[
      {
        id: "chat-show-thought-process",
        label: globalConfig.SHOW_THOUGH_PROCESS_BUTTON_LABEL_TEXT,
        svgIcon: iconLightBulb,
        isDisabled: this.isShowingThoughtProcess
      }
    ]}"
      .isDisabled="${this.isDisabled}"
      .isProcessingResponse="${this.chatController.isProcessingResponse}"
      .selectedCitation="${this.selectedCitation}"
      .isCustomBranding="${this.isCustomBranding}"
      .svgIcon="${iconLogo}"
      @on-action-button-click="${this.handleChatEntryActionButtonClick}"
      @on-citation-click="${this.handleCitationClick}"
      @on-followup-click="${this.handleQuestionInputClick}"
    >
    </chat-thread-component>`;
  }
  // Render the chat component as a web component
  render() {
    return x`
      <div id="overlay" class="overlay"></div>
      <section id="chat__containerWrapper" class="chat__containerWrapper">
        ${this.isCustomBranding && !this.isChatStarted ? x` <chat-stage
              svgIcon="${iconLogo}"
              pagetitle="${globalConfig.BRANDING_HEADLINE}"
              url="${globalConfig.BRANDING_URL}"
            >
            </chat-stage>` : ""}
        <section class="chat__container" id="chat-container">
          ${this.isChatStarted ? x`
                <div class="chat__header--thread">
                  ${this.interactionModel === "chat" && this.isLocalStorageEnabled ? this.chatHistoryController.renderHistoryButton({ disabled: this.isDisabled }) : ""}
                  <chat-action-button
                    .label="${globalConfig.RESET_CHAT_BUTTON_TITLE}"
                    actionId="chat-reset-button"
                    @click="${this.resetCurrentChat}"
                    .svgIcon="${iconDelete}"
                  >
                  </chat-action-button>
                </div>
                ${this.chatHistoryController.showChatHistory && this.isLocalStorageEnabled ? x`<div class="chat-history__container">
                      ${this.renderChatThread(this.chatHistoryController.chatHistory)}
                      <div class="chat-history__footer">
                        ${o2(iconUp)}
                        ${globalConfig.CHAT_HISTORY_FOOTER_TEXT.replace(
      globalConfig.CHAT_MAX_COUNT_TAG,
      MAX_CHAT_HISTORY
    )}
                        ${o2(iconUp)}
                      </div>
                    </div>` : ""}
                ${this.renderChatThread(this.chatThread)}
              ` : ""}
          ${this.chatController.isAwaitingResponse ? x`<loading-indicator label="${globalConfig.LOADING_INDICATOR_TEXT}"></loading-indicator>` : ""}
          <!-- Teaser List with Default Prompts -->
          <div class="chat__container">
            <!-- Conditionally render default prompts based on isDefaultPromptsEnabled -->
            ${this.isDefaultPromptsEnabled ? x`
                  <teaser-list-component
                    .heading="${this.interactionModel === "chat" ? teaserListTexts.HEADING_CHAT : teaserListTexts.HEADING_ASK}"
                    .clickable="${true}"
                    .actionLabel="${teaserListTexts.TEASER_CTA_LABEL}"
                    @teaser-click="${this.handleQuestionInputClick}"
                    .teasers="${teaserListTexts.DEFAULT_PROMPTS}"
                  ></teaser-list-component>
                ` : ""}
          </div>
          <form
            id="chat-form"
            class="form__container ${this.inputPosition === "sticky" ? "form__container-sticky" : ""}"
          >
            <div class="chatbox__container container-col container-row">
              <div class="chatbox__input-container display-flex-grow container-row">
                <input
                  class="chatbox__input display-flex-grow"
                  data-testid="question-input"
                  id="question-input"
                  placeholder="${globalConfig.CHAT_INPUT_PLACEHOLDER}"
                  aria-labelledby="chatbox-label"
                  id="chatbox"
                  name="chatbox"
                  type="text"
                  :value=""
                  ?disabled="${this.isDisabled}"
                  autocomplete="off"
                  @keyup="${this.handleOnInputChange}"
                />
                ${this.isResetInput ? "" : x`<voice-input-button @on-voice-input="${this.handleVoiceInput}" />`}
              </div>
              ${this.renderChatOrCancelButton()}
              <button
                title="${globalConfig.RESET_BUTTON_TITLE_TEXT}"
                class="chatbox__button--reset"
                .hidden="${!this.isResetInput}"
                type="reset"
                id="resetBtn"
                title="Clear input"
                @click="${this.resetInputField}"
              >
                ${globalConfig.RESET_BUTTON_LABEL_TEXT}
              </button>
            </div>

            ${this.isDefaultPromptsEnabled ? "" : x`<div class="chat__containerFooter">
                  <button type="button" @click="${this.showDefaultPrompts}" class="defaults__span button">
                    ${globalConfig.DISPLAY_DEFAULT_PROMPTS_BUTTON}
                  </button>
                </div>`}
          </form>
        </section>
        ${this.isShowingThoughtProcess ? x`
              <aside class="aside" data-testid="aside-thought-process">
                <div class="aside__header">
                  <chat-action-button
                    .label="${globalConfig.HIDE_THOUGH_PROCESS_BUTTON_LABEL_TEXT}"
                    actionId="chat-hide-thought-process"
                    @click="${this.collapseAside}"
                    .svgIcon="${iconClose}"
                  >
                  </chat-action-button>
                </div>
                ${this.renderChatEntryTabContent(this.selectedChatEntry)}
              </aside>
            ` : ""}
      </section>
    `;
  }
};
ChatComponent.styles = [chatStyle];
__decorateClass([
  n$1({ type: String, attribute: "data-input-position" })
], ChatComponent.prototype, "inputPosition", 2);
__decorateClass([
  n$1({ type: String, attribute: "data-interaction-model" })
], ChatComponent.prototype, "interactionModel", 2);
__decorateClass([
  n$1({ type: String, attribute: "data-api-url" })
], ChatComponent.prototype, "apiUrl", 2);
__decorateClass([
  n$1({ type: String, attribute: "data-custom-branding", converter: (value) => (value == null ? void 0 : value.toLowerCase()) === "true" })
], ChatComponent.prototype, "isCustomBranding", 2);
__decorateClass([
  n$1({ type: String, attribute: "data-use-stream", converter: (value) => (value == null ? void 0 : value.toLowerCase()) === "true" })
], ChatComponent.prototype, "useStream", 2);
__decorateClass([
  n$1({ type: String, attribute: "data-overrides", converter: (value) => JSON.parse(value || "{}") })
], ChatComponent.prototype, "overrides", 2);
__decorateClass([
  n$1({ type: String, attribute: "data-custom-styles", converter: (value) => JSON.parse(value || "{}") })
], ChatComponent.prototype, "customStyles", 2);
__decorateClass([
  n$1({
    type: String,
    attribute: "data-enable-local-storage",
    converter: (value) => (value == null ? void 0 : value.toLowerCase()) === "true"
  })
], ChatComponent.prototype, "isLocalStorageEnabled", 2);
__decorateClass([
  n$1({
    type: String,
    attribute: "data-enable-chat-scroll",
    converter: (value) => (value == null ? void 0 : value.toLowerCase()) === "true"
  })
], ChatComponent.prototype, "isChatScrollEnabled", 2);
__decorateClass([
  n$1({ type: String })
], ChatComponent.prototype, "currentQuestion", 2);
__decorateClass([
  i$1("#question-input")
], ChatComponent.prototype, "questionInput", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "isDisabled", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "isChatStarted", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "isResetInput", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "isShowingThoughtProcess", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "isDefaultPromptsEnabled", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "selectedCitation", 2);
__decorateClass([
  t$2()
], ChatComponent.prototype, "selectedChatEntry", 2);
ChatComponent = __decorateClass([
  e$3("chat-component")
], ChatComponent);
export {
  ChatActionButtonComponent,
  ChatComponent,
  ChatResponseError,
  ChatThreadComponent,
  CitationListComponent,
  DocumentPreviewerComponent,
  LoadingIndicatorComponent,
  TabComponent,
  TeaserListComponent,
  VoiceInputButton,
  callHttpApi,
  cancelStream,
  chatEntryToString,
  cleanUpFollowUp,
  createReader,
  getAPIResponse,
  getTimestamp,
  newListWithEntryAtIndex,
  parseCitations,
  parseStreamedMessages,
  processText,
  readStream,
  updateCitationsEntry,
  updateFollowingStepOrFollowupQuestionEntry,
  updateTextEntry
};
