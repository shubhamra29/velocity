import { g as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, n as normalizeClass, b as createVNode, t as toDisplayString, w as withCtx, e as createStaticVNode, f as createTextVNode } from "./index-24a1dea7.js";
const _sfc_main = {};
const _hoisted_1 = { class: "h-screen flex flex-col bg-gray-50" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-10" };
const _hoisted_3 = { class: "flex items-center space-x-4" };
const _hoisted_4 = { class: "text-xl font-bold text-gray-900 tracking-tight" };
const _hoisted_5 = { class: "text-xs text-gray-500 font-mono" };
const _hoisted_6 = { class: "bg-gray-100 px-1 rounded" };
const _hoisted_7 = { class: "flex items-center space-x-3" };
const _hoisted_8 = { class: "text-right mr-4" };
const _hoisted_9 = { class: "text-xl font-mono font-bold text-gray-900" };
const _hoisted_10 = { class: "flex-grow p-4 overflow-hidden relative" };
const _hoisted_11 = { class: "absolute inset-4 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white" };
function _sfc_render(_ctx, _cache) {
  const _component_FeatherIcon = resolveComponent("FeatherIcon");
  const _component_Button = resolveComponent("Button");
  const _component_VoucherGrid = resolveComponent("VoucherGrid");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", {
          class: normalizeClass(["p-2 rounded-lg", _ctx.voucherConfig.colorBg])
        }, [
          createVNode(_component_FeatherIcon, {
            name: _ctx.voucherConfig.icon,
            class: normalizeClass(["w-6 h-6", _ctx.voucherConfig.colorText])
          }, null, 8, ["name", "class"])
        ], 2),
        createBaseVNode("div", null, [
          createBaseVNode("h1", _hoisted_4, toDisplayString(_ctx.voucherConfig.label), 1),
          createBaseVNode("p", _hoisted_5, [
            createBaseVNode("span", _hoisted_6, "No: " + toDisplayString(_ctx.voucherStore.clientState.header.name || "NEW"), 1),
            _cache[0] || (_cache[0] = createBaseVNode("span", { class: "mx-2" }, "•", -1)),
            createBaseVNode("span", null, toDisplayString(_ctx.currentDate), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "text-xs text-gray-500 uppercase font-semibold" }, "Total", -1)),
          createBaseVNode("div", _hoisted_9, "₹ " + toDisplayString(_ctx.currentTotal), 1),
          createBaseVNode("div", {
            class: normalizeClass(["text-xs text-right", _ctx.validationStatus.color])
          }, toDisplayString(_ctx.validationStatus.text), 3)
        ]),
        createVNode(_component_Button, {
          icon: "printer",
          onClick: _ctx.handlePrint
        }, {
          default: withCtx(() => [..._cache[2] || (_cache[2] = [
            createTextVNode("Print", -1)
          ])]),
          _: 1
        }, 8, ["onClick"]),
        createVNode(_component_Button, {
          variant: "solid",
          theme: "green",
          size: "lg",
          "icon-left": "check",
          loading: _ctx.isSaving,
          onClick: _ctx.handleSave
        }, {
          default: withCtx(() => [..._cache[3] || (_cache[3] = [
            createTextVNode(" Save (Ctrl+S) ", -1)
          ])]),
          _: 1
        }, 8, ["loading", "onClick"])
      ])
    ]),
    createBaseVNode("main", _hoisted_10, [
      createBaseVNode("div", _hoisted_11, [
        createVNode(_component_VoucherGrid, { voucherType: _ctx.currentType }, null, 8, ["voucherType"])
      ])
    ]),
    _cache[4] || (_cache[4] = createStaticVNode('<footer class="bg-white border-t border-gray-200 px-4 py-1 text-xs text-gray-500 flex justify-between font-mono"><div class="space-x-4"><span class="px-2 py-0.5 bg-gray-100 rounded">F4: Contra</span><span class="px-2 py-0.5 bg-gray-100 rounded">F5: Payment</span><span class="px-2 py-0.5 bg-gray-100 rounded">F6: Receipt</span><span class="px-2 py-0.5 bg-gray-100 rounded">F7: Journal</span></div><div> Status: <span class="text-emerald-600 font-bold">Online</span></div></footer>', 1))
  ]);
}
const Voucher = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  Voucher as default
};
