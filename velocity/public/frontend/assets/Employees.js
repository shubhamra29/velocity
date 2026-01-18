import { $ as _export_sfc, _ as _sfc_main$3, a0 as debounce, a1 as resolveComponent, a as openBlock, c as createElementBlock, t as toDisplayString, g as createCommentVNode, b as createBaseVNode, a2 as createBlock, n as normalizeClass, a3 as mergeProps, F as Fragment, f as renderList, a4 as Ye, a5 as _e, a6 as Ve, a7 as he, a8 as Se, B as Button, p as computed, w as withCtx, d as createVNode, a9 as renderSlot, aa as normalizeProps, ab as guardReactiveProps, h as createTextVNode, m as ref, e as unref } from "./index.js";
import { c as call } from "./call.js";
const _sfc_main$2 = {
  name: "Input",
  inheritAttrs: false,
  expose: ["getInputValue"],
  components: { FeatherIcon: _sfc_main$3 },
  props: {
    label: {
      type: String
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        let isValid = [
          "text",
          "number",
          "checkbox",
          "textarea",
          "select",
          "email",
          "password",
          "date"
        ].includes(value);
        if (!isValid) {
          console.warn(`Invalid value "${value}" for "type" prop for Input`);
        }
        return isValid;
      }
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array]
    },
    inputClass: {
      type: [String, Array, Object]
    },
    debounce: {
      type: Number
    },
    options: {
      type: Array
    },
    disabled: {
      type: Boolean
    },
    rows: {
      type: Number,
      default: 3
    },
    placeholder: {
      type: String
    },
    iconLeft: {
      type: String
    }
  },
  emits: ["input", "change", "update:modelValue"],
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    getInputValue(e) {
      let $input = e ? e.target : this.$refs.input;
      let value = $input.value;
      if (this.type == "checkbox") {
        value = $input.checked;
      }
      return value;
    }
  },
  computed: {
    passedInputValue() {
      if ("value" in this.$attrs) {
        return this.$attrs.value;
      }
      return this.modelValue || null;
    },
    inputAttributes() {
      let attrs = {};
      let onInput = (e) => {
        this.$emit("input", this.getInputValue(e));
      };
      if (this.debounce) {
        onInput = debounce(onInput, this.debounce);
      }
      if (this.type == "checkbox") {
        attrs.checked = this.passedInputValue;
      }
      return Object.assign(attrs, this.$attrs, {
        onInput,
        onChange: (e) => {
          this.$emit("change", this.getInputValue(e));
          this.$emit("update:modelValue", this.getInputValue(e));
        }
      });
    },
    selectOptions() {
      return this.options.map((option) => {
        if (typeof option === "string") {
          return {
            label: option,
            value: option
          };
        }
        return option;
      }).filter(Boolean);
    },
    isNormalInput() {
      return [
        "text",
        "number",
        "checkbox",
        "email",
        "password",
        "date"
      ].includes(this.type);
    }
  }
};
const _hoisted_1$2 = {
  key: 0,
  class: "mb-2 block text-sm leading-4 text-gray-700"
};
const _hoisted_2$2 = ["type", "disabled", "placeholder", "value"];
const _hoisted_3$2 = ["placeholder", "value", "disabled", "rows"];
const _hoisted_4$2 = ["disabled"];
const _hoisted_5$2 = ["value", "disabled", "selected"];
const _hoisted_6$2 = {
  key: 1,
  class: "ml-2 inline-block text-base leading-4"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FeatherIcon = resolveComponent("FeatherIcon");
  return openBlock(), createElementBlock("label", {
    class: normalizeClass([$props.type == "checkbox" ? "flex" : "block", _ctx.$attrs.class])
  }, [
    $props.label && $props.type != "checkbox" ? (openBlock(), createElementBlock("span", _hoisted_1$2, toDisplayString($props.label), 1)) : createCommentVNode("", true),
    createBaseVNode("div", {
      class: normalizeClass(["relative flex", { "items-center": $options.isNormalInput || $props.type == "select" }])
    }, [
      $props.iconLeft && $props.type != "checkbox" ? (openBlock(), createBlock(_component_FeatherIcon, {
        key: 0,
        name: $props.iconLeft,
        class: normalizeClass(["absolute mx-2 h-4 w-4 text-gray-600", { "mt-2": $props.type == "textarea" }])
      }, null, 8, ["name", "class"])) : createCommentVNode("", true),
      $options.isNormalInput ? (openBlock(), createElementBlock("input", mergeProps({ key: 1 }, $options.inputAttributes, {
        class: ["border-gray-400 placeholder-gray-500", [
          {
            "form-input block w-full": $props.type != "checkbox",
            "form-checkbox": $props.type == "checkbox",
            "pl-8": $props.iconLeft && $props.type != "checkbox"
          },
          $props.inputClass
        ]],
        ref: "input",
        type: $props.type || "text",
        disabled: $props.disabled,
        placeholder: $props.placeholder,
        value: $options.passedInputValue
      }), null, 16, _hoisted_2$2)) : createCommentVNode("", true),
      $props.type === "textarea" ? (openBlock(), createElementBlock("textarea", mergeProps({ key: 2 }, $options.inputAttributes, {
        placeholder: $props.placeholder,
        class: ["placeholder-gray-500", [
          "form-textarea block w-full resize-none",
          $props.inputClass,
          {
            "pl-8": $props.iconLeft
          }
        ]],
        ref: "input",
        value: $options.passedInputValue,
        disabled: $props.disabled,
        rows: $props.rows
      }), null, 16, _hoisted_3$2)) : createCommentVNode("", true),
      $props.type === "select" ? (openBlock(), createElementBlock("select", mergeProps({ key: 3 }, $options.inputAttributes, {
        class: ["form-select block w-full", { "pl-8": $props.iconLeft }],
        ref: "input",
        disabled: $props.disabled
      }), [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.selectOptions, (option) => {
          return openBlock(), createElementBlock("option", {
            key: option.value,
            value: option.value,
            disabled: option.disabled || false,
            selected: $options.passedInputValue === option.value
          }, toDisplayString(option.label), 9, _hoisted_5$2);
        }), 128))
      ], 16, _hoisted_4$2)) : createCommentVNode("", true)
    ], 2),
    $props.label && $props.type == "checkbox" ? (openBlock(), createElementBlock("span", _hoisted_6$2, toDisplayString($props.label), 1)) : createCommentVNode("", true)
  ], 2);
}
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const _sfc_main$1 = {
  name: "Dialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ["update:modelValue", "close", "after-leave"],
  components: {
    HDialog: Ye,
    DialogOverlay: _e,
    DialogTitle: Ve,
    TransitionChild: he,
    TransitionRoot: Se,
    Button,
    FeatherIcon: _sfc_main$3
  },
  setup(props, { emit }) {
    let open = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit("update:modelValue", val);
        if (!val) {
          emit("close");
        }
      }
    });
    return {
      open
    };
  },
  methods: {
    handleAction(action) {
      let close = () => this.open = false;
      if (action.handler && typeof action.handler === "function") {
        action.loading = true;
        let result = action.handler({ close });
        if (result && result.then) {
          result.then(() => action.loading = false);
        } else {
          action.loading = false;
        }
      } else {
        close();
      }
    }
  },
  computed: {
    icon() {
      if (!this.options?.icon)
        return null;
      let icon = this.options.icon;
      if (typeof icon === "string") {
        icon = { name: icon };
      }
      return icon;
    },
    dialogPositionClasses() {
      let position = this.options?.position || "center";
      return {
        "justify-center": position === "center",
        "pt-[20vh]": position === "top"
      };
    }
  }
};
const _hoisted_1$1 = { class: "bg-white px-4 py-5 sm:p-6" };
const _hoisted_2$1 = { class: "flex flex-col sm:flex-row" };
const _hoisted_3$1 = { class: "flex-1" };
const _hoisted_4$1 = { class: "mb-2 text-lg font-medium leading-6 text-gray-900" };
const _hoisted_5$1 = {
  key: 0,
  class: "text-base text-gray-600"
};
const _hoisted_6$1 = {
  key: 0,
  class: "space-y-2 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:space-x-3 sm:space-y-0 sm:space-x-reverse sm:px-6"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DialogOverlay = resolveComponent("DialogOverlay");
  const _component_TransitionChild = resolveComponent("TransitionChild");
  const _component_FeatherIcon = resolveComponent("FeatherIcon");
  const _component_DialogTitle = resolveComponent("DialogTitle");
  const _component_Button = resolveComponent("Button");
  const _component_HDialog = resolveComponent("HDialog");
  const _component_TransitionRoot = resolveComponent("TransitionRoot");
  return openBlock(), createBlock(_component_TransitionRoot, {
    as: "template",
    show: $setup.open,
    onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("after-leave"))
  }, {
    default: withCtx(() => [
      createVNode(_component_HDialog, {
        as: "div",
        class: "fixed inset-0 z-10 overflow-y-auto",
        onClose: _cache[0] || (_cache[0] = ($event) => $setup.open = false)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["flex min-h-screen flex-col items-center px-4 py-4 text-center", $options.dialogPositionClasses])
          }, [
            createVNode(_component_TransitionChild, {
              as: "template",
              enter: "ease-out duration-300",
              "enter-from": "opacity-0",
              "enter-to": "opacity-100",
              leave: "ease-in duration-200",
              "leave-from": "opacity-100",
              "leave-to": "opacity-0"
            }, {
              default: withCtx(() => [
                createVNode(_component_DialogOverlay, { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
              ]),
              _: 1
            }),
            createVNode(_component_TransitionChild, {
              as: "template",
              enter: "ease-out duration-300",
              "enter-from": "opacity-0 translate-y-4 sm:-translate-y-12 sm:scale-95",
              "enter-to": "opacity-100 translate-y-0 sm:scale-100",
              leave: "ease-in duration-200",
              "leave-from": "opacity-100 translate-y-0 sm:scale-100",
              "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(["my-8 inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all", {
                    "max-w-7xl": $props.options.size === "7xl",
                    "max-w-6xl": $props.options.size === "6xl",
                    "max-w-5xl": $props.options.size === "5xl",
                    "max-w-4xl": $props.options.size === "4xl",
                    "max-w-3xl": $props.options.size === "3xl",
                    "max-w-2xl": $props.options.size === "2xl",
                    "max-w-xl": $props.options.size === "xl",
                    "max-w-lg": $props.options.size === "lg" || !$props.options.size,
                    "max-w-md": $props.options.size === "md",
                    "max-w-sm": $props.options.size === "sm",
                    "max-w-xs": $props.options.size === "xs"
                  }])
                }, [
                  renderSlot(_ctx.$slots, "body", {}, () => [
                    renderSlot(_ctx.$slots, "body-main", {}, () => [
                      createBaseVNode("div", _hoisted_1$1, [
                        createBaseVNode("div", _hoisted_2$1, [
                          $options.icon ? (openBlock(), createElementBlock("div", {
                            key: 0,
                            class: normalizeClass(["mx-auto mb-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:mb-0 sm:mr-4 sm:h-9 sm:w-9", {
                              "bg-gray-100": !$options.icon.appearance,
                              "bg-yellow-100": $options.icon.appearance === "warning",
                              "bg-blue-100": $options.icon.appearance === "info",
                              "bg-red-100": $options.icon.appearance === "danger",
                              "bg-green-100": $options.icon.appearance === "success"
                            }])
                          }, [
                            createVNode(_component_FeatherIcon, {
                              name: $options.icon.name,
                              class: normalizeClass(["h-6 w-6 sm:h-5 sm:w-5", {
                                "text-gray-600": !$options.icon.appearance,
                                "text-yellow-600": $options.icon.appearance === "warning",
                                "text-blue-600": $options.icon.appearance === "info",
                                "text-red-600": $options.icon.appearance === "danger",
                                "text-green-600": $options.icon.appearance === "success"
                              }]),
                              "aria-hidden": "true"
                            }, null, 8, ["name", "class"])
                          ], 2)) : createCommentVNode("", true),
                          createBaseVNode("div", _hoisted_3$1, [
                            createVNode(_component_DialogTitle, { as: "header" }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "body-title", {}, () => [
                                  createBaseVNode("h3", _hoisted_4$1, toDisplayString($props.options.title || "Untitled"), 1)
                                ])
                              ]),
                              _: 3
                            }),
                            renderSlot(_ctx.$slots, "body-content", {}, () => [
                              $props.options.message ? (openBlock(), createElementBlock("p", _hoisted_5$1, toDisplayString($props.options.message), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    $props.options?.actions || _ctx.$slots.actions ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
                      renderSlot(_ctx.$slots, "actions", normalizeProps(guardReactiveProps({ close: () => $setup.open = false })), () => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList($props.options.actions, (action) => {
                          return openBlock(), createBlock(_component_Button, mergeProps({
                            class: "w-full sm:w-max",
                            key: action.label,
                            loading: action.loading
                          }, { ref_for: true }, action, {
                            onClick: ($event) => $options.handleAction(action)
                          }), {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(action.label), 1)
                            ]),
                            _: 2
                          }, 1040, ["loading", "onClick"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ], 2)
              ]),
              _: 3
            })
          ], 2)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 8, ["show"]);
}
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
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
const _hoisted_12 = { class: "space-y-4" };
const _sfc_main = {
  __name: "Employees",
  setup(__props) {
    const employees = ref([
      { id: 1, name: "Aditya Kumar", department: "Accounts", salary: 45e3 },
      { id: 2, name: "Sneha Gupta", department: "Sales", salary: 38e3 },
      { id: 3, name: "Rahul Sharma", department: "Operations", salary: 32e3 }
    ]);
    const isDialogOpen = ref(false);
    const isSaving = ref(false);
    const newEmployee = ref({ name: "", department: "", salary: 0 });
    async function addEmployee() {
      if (!newEmployee.value.name)
        return;
      isSaving.value = true;
      try {
        const response = await call("velocity.api.save_employee", { doc: newEmployee.value });
        if (response && response.status === "success") {
          employees.value.push({
            id: Date.now(),
            ...newEmployee.value
          });
          isDialogOpen.value = false;
          newEmployee.value = { name: "", department: "", salary: 0 };
        }
      } catch (e) {
        console.error(e);
        alert("Failed to save employee");
      } finally {
        isSaving.value = false;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _cache[7] || (_cache[7] = createBaseVNode("div", null, [
            createBaseVNode("h1", { class: "text-xl font-bold text-gray-900 tracking-tight" }, "Employees"),
            createBaseVNode("p", { class: "text-xs text-gray-500 font-mono mt-1" }, "Payroll Lite")
          ], -1)),
          createVNode(unref(Button), {
            variant: "solid",
            "icon-left": "plus",
            onClick: _cache[0] || (_cache[0] = ($event) => isDialogOpen.value = true)
          }, {
            default: withCtx(() => [..._cache[6] || (_cache[6] = [
              createTextVNode("Add Employee", -1)
            ])]),
            _: 1
          })
        ]),
        createBaseVNode("main", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("table", _hoisted_5, [
              _cache[9] || (_cache[9] = createBaseVNode("thead", { class: "bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs font-semibold" }, [
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
                    _cache[8] || (_cache[8] = createBaseVNode("td", { class: "px-6 py-4 text-center" }, [
                      createBaseVNode("span", { class: "px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700" }, "Active")
                    ], -1))
                  ]);
                }), 128))
              ])
            ])
          ]),
          createVNode(unref(Dialog), {
            modelValue: isDialogOpen.value,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isDialogOpen.value = $event)
          }, {
            "body-title": withCtx(() => [..._cache[10] || (_cache[10] = [
              createBaseVNode("h3", { class: "text-lg font-bold" }, "Add New Employee", -1)
            ])]),
            "body-content": withCtx(() => [
              createBaseVNode("div", _hoisted_12, [
                createVNode(unref(Input), {
                  label: "Full Name",
                  modelValue: newEmployee.value.name,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newEmployee.value.name = $event)
                }, null, 8, ["modelValue"]),
                createVNode(unref(Input), {
                  label: "Department",
                  modelValue: newEmployee.value.department,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newEmployee.value.department = $event)
                }, null, 8, ["modelValue"]),
                createVNode(unref(Input), {
                  label: "Basic Salary",
                  type: "number",
                  modelValue: newEmployee.value.salary,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => newEmployee.value.salary = $event)
                }, null, 8, ["modelValue"])
              ])
            ]),
            actions: withCtx(() => [
              createVNode(unref(Button), {
                variant: "solid",
                loading: isSaving.value,
                onClick: addEmployee
              }, {
                default: withCtx(() => [..._cache[11] || (_cache[11] = [
                  createTextVNode("Save Employee", -1)
                ])]),
                _: 1
              }, 8, ["loading"]),
              createVNode(unref(Button), {
                variant: "subtle",
                onClick: _cache[4] || (_cache[4] = ($event) => isDialogOpen.value = false)
              }, {
                default: withCtx(() => [..._cache[12] || (_cache[12] = [
                  createTextVNode("Cancel", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
