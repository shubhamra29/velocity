import { u as useRouter, r as reactive, o as onMounted, a as openBlock, c as createElementBlock, b as createBaseVNode, d as createVNode, e as unref, t as toDisplayString, F as Fragment, f as renderList, g as createCommentVNode, w as withCtx, _ as _sfc_main$1, n as normalizeClass, h as createTextVNode, B as Button } from "./index.js";
import { c as call } from "./call.js";
const _hoisted_1 = { class: "max-w-4xl py-12 mx-auto px-4" };
const _hoisted_2 = { class: "flex flex-col items-center space-y-6" };
const _hoisted_3 = { class: "p-4 bg-emerald-500 text-white rounded-full" };
const _hoisted_4 = { class: "grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12" };
const _hoisted_5 = { class: "p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm" };
const _hoisted_6 = { class: "mt-4 text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded" };
const _hoisted_7 = { class: "p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm" };
const _hoisted_8 = { class: "mt-4 text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded" };
const _hoisted_9 = { class: "w-full mt-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm" };
const _hoisted_10 = { class: "divide-y divide-gray-100 dark:divide-gray-700" };
const _hoisted_11 = { class: "flex items-center space-x-4" };
const _hoisted_12 = { class: "text-sm font-bold text-gray-900 dark:text-white" };
const _hoisted_13 = { class: "text-xs text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded" };
const _hoisted_14 = { class: "flex items-center space-x-6" };
const _hoisted_15 = { class: "font-mono text-sm text-gray-800 dark:text-gray-200" };
const _hoisted_16 = {
  key: 0,
  class: "px-6 py-8 text-center text-gray-500 italic"
};
const _hoisted_17 = { class: "mt-8" };
const _sfc_main = {
  __name: "Home",
  setup(__props) {
    const router = useRouter();
    const summary = reactive({
      vouchers_today: 0,
      pending_sync: 0,
      recent_activity: []
    });
    const goToVoucher = () => {
      router.push("/voucher/journal");
    };
    onMounted(async () => {
      try {
        const data = await call("velocity.api.get_home_summary");
        if (data) {
          Object.assign(summary, data);
        }
      } catch (e) {
        console.error("Failed to fetch home summary", e);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(unref(_sfc_main$1), {
              name: "zap",
              class: "w-12 h-12"
            })
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("h1", { class: "text-4xl font-bold tracking-tight text-gray-900 dark:text-white" }, "Project Velocity", -1)),
          _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-lg text-gray-600 dark:text-gray-400" }, "The Anekantavada Accounting Ecosystem", -1)),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              _cache[0] || (_cache[0] = createBaseVNode("h3", { class: "font-semibold text-emerald-600 dark:text-emerald-400" }, "Operator View", -1)),
              _cache[1] || (_cache[1] = createBaseVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Keyboard-first, zero-latency voucher entry.", -1)),
              createBaseVNode("div", _hoisted_6, " Today's Vouchers: " + toDisplayString(summary.vouchers_today || 0), 1)
            ]),
            createBaseVNode("div", _hoisted_7, [
              _cache[2] || (_cache[2] = createBaseVNode("h3", { class: "font-semibold text-blue-600 dark:text-blue-400" }, "Auditor View", -1)),
              _cache[3] || (_cache[3] = createBaseVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Real-time validation and immutable integrity.", -1)),
              createBaseVNode("div", _hoisted_8, " Pending Sync: " + toDisplayString(summary.pending_sync || 0), 1)
            ]),
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm" }, [
              createBaseVNode("h3", { class: "font-semibold text-purple-600 dark:text-purple-400" }, "System Truth"),
              createBaseVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Decoupled Frappe backend with robust APIs."),
              createBaseVNode("div", { class: "mt-4 text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded" }, "Status: RPC Connected")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_9, [
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center" }, [
              createBaseVNode("h3", { class: "font-bold text-gray-900 dark:text-white" }, "Recent Activity"),
              createBaseVNode("span", { class: "text-xs text-gray-500 uppercase tracking-widest font-mono" }, "Live Sync")
            ], -1)),
            createBaseVNode("div", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(summary.recent_activity, (item) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: "px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700"
                }, [
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, toDisplayString(item.id), 1),
                    createBaseVNode("div", _hoisted_13, toDisplayString(item.type), 1)
                  ]),
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("div", _hoisted_15, "₹ " + toDisplayString(item.amount), 1),
                    createBaseVNode("div", {
                      class: normalizeClass(["text-[10px] font-bold uppercase", item.status === "Synced" ? "text-emerald-500" : "text-orange-500"])
                    }, toDisplayString(item.status), 3)
                  ])
                ]);
              }), 128)),
              !summary.recent_activity?.length ? (openBlock(), createElementBlock("div", _hoisted_16, " No recent activity found. ")) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_17, [
            createVNode(unref(Button), {
              variant: "solid",
              size: "lg",
              onClick: goToVoucher
            }, {
              default: withCtx(() => [..._cache[6] || (_cache[6] = [
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
