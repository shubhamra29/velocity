import { j as ref, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createVNode, w as withCtx, d as unref, I as Fragment, J as renderList, f as createTextVNode, B as Button, t as toDisplayString } from "./index-24a1dea7.js";
const _hoisted_1 = { class: "h-screen flex flex-col bg-gray-50" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10" };
const _hoisted_3 = { class: "flex-grow p-4" };
const _hoisted_4 = { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" };
const _hoisted_5 = { class: "w-full text-sm text-left" };
const _hoisted_6 = { class: "divide-y divide-gray-100" };
const _hoisted_7 = { class: "px-6 py-4 font-medium text-gray-900" };
const _hoisted_8 = { class: "flex items-center" };
const _hoisted_9 = { class: "w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3" };
const _hoisted_10 = { class: "px-6 py-4 text-gray-500" };
const _hoisted_11 = { class: "px-6 py-4 text-right font-mono" };
const _sfc_main = {
  __name: "Employees",
  setup(__props) {
    const employees = ref([
      { id: 1, name: "Aditya Kumar", department: "Accounts", salary: 45e3 },
      { id: 2, name: "Sneha Gupta", department: "Sales", salary: 38e3 },
      { id: 3, name: "Rahul Sharma", department: "Operations", salary: 32e3 }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _cache[1] || (_cache[1] = createBaseVNode("div", null, [
            createBaseVNode("h1", { class: "text-xl font-bold text-gray-900 tracking-tight" }, "Employees"),
            createBaseVNode("p", { class: "text-xs text-gray-500 font-mono mt-1" }, "Payroll Lite")
          ], -1)),
          createVNode(unref(Button), {
            variant: "solid",
            "icon-left": "plus"
          }, {
            default: withCtx(() => [..._cache[0] || (_cache[0] = [
              createTextVNode("Add Employee", -1)
            ])]),
            _: 1
          })
        ]),
        createBaseVNode("main", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("table", _hoisted_5, [
              _cache[3] || (_cache[3] = createBaseVNode("thead", { class: "bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs font-semibold" }, [
                createBaseVNode("tr", null, [
                  createBaseVNode("th", { class: "px-6 py-3" }, "Employee Name"),
                  createBaseVNode("th", { class: "px-6 py-3" }, "Department"),
                  createBaseVNode("th", { class: "px-6 py-3 text-right" }, "Basic Salary"),
                  createBaseVNode("th", { class: "px-6 py-3 text-center" }, "Status")
                ])
              ], -1)),
              createBaseVNode("tbody", _hoisted_6, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(employees.value, (emp) => {
                  return openBlock(), createElementBlock("tr", {
                    key: emp.id,
                    class: "hover:bg-gray-50 cursor-pointer"
                  }, [
                    createBaseVNode("td", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("div", _hoisted_9, toDisplayString(emp.name.charAt(0)), 1),
                        createTextVNode(" " + toDisplayString(emp.name), 1)
                      ])
                    ]),
                    createBaseVNode("td", _hoisted_10, toDisplayString(emp.department), 1),
                    createBaseVNode("td", _hoisted_11, "₹ " + toDisplayString(emp.salary.toLocaleString()), 1),
                    _cache[2] || (_cache[2] = createBaseVNode("td", { class: "px-6 py-4 text-center" }, [
                      createBaseVNode("span", { class: "px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700" }, "Active")
                    ], -1))
                  ]);
                }), 128))
              ])
            ])
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
