import { d as dayjs, B as Be } from "./dayjs.min.js";
import { m as ref, a as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, e as unref, d as createVNode, w as withCtx, h as createTextVNode, B as Button } from "./index.js";
const _hoisted_1 = { class: "h-screen flex flex-col bg-gray-50" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10" };
const _hoisted_3 = { class: "text-xs text-gray-500 font-mono mt-1" };
const _hoisted_4 = { class: "flex-grow p-4 overflow-hidden relative" };
const _hoisted_5 = { class: "absolute inset-4 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white ag-theme-quartz" };
const _sfc_main = {
  __name: "Daybook",
  setup(__props) {
    const gridApi = ref(null);
    const rowData = ref([]);
    const columnDefs = [
      { field: "date", headerName: "Date", width: 120 },
      { field: "voucher_type", headerName: "Type", width: 150, cellRenderer: typeRenderer },
      { field: "voucher_no", headerName: "Voucher No", width: 150, cellClass: "font-mono font-bold" },
      { field: "party", headerName: "Party / Ledger", flex: 2 },
      { field: "amount", headerName: "Amount", width: 120, cellClass: "text-right font-bold", valueFormatter: currencyFormatter },
      { field: "status", headerName: "Status", width: 100, cellRenderer: statusRenderer }
    ];
    const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true
    };
    const gridOptions = {
      rowHeight: 40,
      headerHeight: 40
    };
    function generateMockData() {
      const types = ["Payment", "Receipt", "Sales Invoice", "Journal"];
      const statuses = ["Draft", "Submitted", "Cancelled"];
      const data = [];
      for (let i = 0; i < 50; i++) {
        data.push({
          date: dayjs().subtract(i % 5, "day").format("YYYY-MM-DD"),
          voucher_type: types[i % 4],
          voucher_no: `VCH-${2025e3 + i}`,
          party: i % 2 === 0 ? "HDFC Bank" : "Cash Account",
          amount: (Math.random() * 1e4).toFixed(2),
          status: statuses[i % 3]
        });
      }
      return data;
    }
    function refreshData() {
      rowData.value = generateMockData();
    }
    function typeRenderer(params) {
      const colors = {
        "Payment": "text-red-600 bg-red-50",
        "Receipt": "text-emerald-600 bg-emerald-50",
        "Journal": "text-orange-600 bg-orange-50",
        "Sales Invoice": "text-indigo-600 bg-indigo-50"
      };
      const cls = colors[params.value] || "text-gray-600 bg-gray-50";
      return `<span class="px-2 py-1 rounded text-xs font-semibold ${cls}">${params.value}</span>`;
    }
    function statusRenderer(params) {
      const dot = params.value === "Submitted" ? "bg-emerald-500" : "bg-gray-400";
      return `<span class="flex items-center h-full"><span class="w-1.5 h-1.5 rounded-full mr-2 ${dot}"></span>${params.value}</span>`;
    }
    function currencyFormatter(params) {
      return "₹ " + Number(params.value).toLocaleString("en-IN");
    }
    const onGridReady = (params) => {
      gridApi.value = params.api;
      refreshData();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          createBaseVNode("div", null, [
            _cache[0] || (_cache[0] = createBaseVNode("h1", { class: "text-xl font-bold text-gray-900 tracking-tight" }, "Daybook", -1)),
            createBaseVNode("p", _hoisted_3, [
              createBaseVNode("span", null, toDisplayString(unref(dayjs)().format("dddd, DD MMMM YYYY")), 1)
            ])
          ]),
          createBaseVNode("div", null, [
            createVNode(unref(Button), {
              "icon-left": "refresh-cw",
              onClick: refreshData
            }, {
              default: withCtx(() => [..._cache[1] || (_cache[1] = [
                createTextVNode("Refresh", -1)
              ])]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("main", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(unref(Be), {
              class: "w-full h-full",
              columnDefs,
              rowData: rowData.value,
              defaultColDef,
              gridOptions,
              onGridReady
            }, null, 8, ["rowData"])
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
