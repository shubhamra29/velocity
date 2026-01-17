import { u as useRouter, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, d as unref, e as createStaticVNode, w as withCtx, _ as _sfc_main$1, f as createTextVNode, B as Button } from "./index-a4decdcb.js";
const _hoisted_1 = { class: "max-w-4xl py-12 mx-auto" };
const _hoisted_2 = { class: "flex flex-col items-center space-y-6" };
const _hoisted_3 = { class: "p-4 bg-emerald-500 text-white rounded-full" };
const _hoisted_4 = { class: "mt-8" };
const _sfc_main = {
  __name: "Home",
  setup(__props) {
    useRouter();
    const goToVoucher = () => {
      console.log("Navigating to Voucher Interface...");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(unref(_sfc_main$1), {
              name: "zap",
              class: "w-12 h-12"
            })
          ]),
          _cache[1] || (_cache[1] = createStaticVNode('<h1 class="text-4xl font-bold tracking-tight text-gray-900">Project Velocity</h1><p class="text-lg text-gray-600">The Anekantavada Accounting Ecosystem</p><div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12"><div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"><h3 class="font-semibold text-emerald-600">Operator View</h3><p class="mt-2 text-sm text-gray-500">Keyboard-first, zero-latency voucher entry.</p><div class="mt-4 text-xs font-mono bg-gray-50 p-2 rounded">Status: Ready (Optimistic UI)</div></div><div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"><h3 class="font-semibold text-blue-600">Auditor View</h3><p class="mt-2 text-sm text-gray-500">Real-time validation and immutable integrity.</p><div class="mt-4 text-xs font-mono bg-gray-50 p-2 rounded">Status: Monitoring (Audit Layer)</div></div><div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"><h3 class="font-semibold text-purple-600">System Truth</h3><p class="mt-2 text-sm text-gray-500">Decoupled Frappe backend with robust APIs.</p><div class="mt-4 text-xs font-mono bg-gray-50 p-2 rounded">Status: Active (RPC Connected)</div></div></div>', 3)),
          createBaseVNode("div", _hoisted_4, [
            createVNode(unref(Button), {
              variant: "solid",
              size: "lg",
              onClick: goToVoucher
            }, {
              default: withCtx(() => [..._cache[0] || (_cache[0] = [
                createTextVNode(" Open Voucher Interface (F-Keys Ready) ", -1)
              ])]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
