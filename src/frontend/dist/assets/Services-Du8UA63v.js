import { a as createLucideIcon, R as React, j as jsxRuntimeExports, r as reactExports, m as motion, L as Link, A as AnimatePresence } from "./index-DSwezMv8.js";
import { c as createContextScope, a as createSlot, u as useControllableState, P as Primitive, b as useId, d as composeEventHandlers, e as Presence, f as useLayoutEffect2, g as useDirection } from "./index-BIbS_zwc.js";
import { u as useComposedRefs, c as cn, B as Badge } from "./badge-gOmmBcH3.js";
import { C as ChevronDown, M as MapPin, N as Navbar, F as Footer } from "./Navbar-DImE-v1_.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-C5jeBHDt.js";
import { F as FileText, G as Globe, C as ChartNoAxesColumn, S as Star } from "./star-l2ubZwAl.js";
import { S as Search } from "./search-IBemnRt4.js";
import { A as ArrowRight } from "./arrow-right-D7G1_VaJ.js";
import { C as CircleCheckBig } from "./circle-check-big-3s5aPJMe.js";
import { C as ChevronRight } from "./chevron-right-SWRrXlB_.js";
import "./three.module-CDwbhIs2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React.useRef(null);
    const itemMap = React.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$1(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      var _a;
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => {
        var _a2;
        return !((_a2 = item.ref.current) == null ? void 0 : _a2.disabled);
      });
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      (_a = triggerCollection[clampedIndex].ref.current) == null ? void 0 : _a.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger2,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
function FloatingShape({
  position,
  shape,
  color,
  speed,
  phase,
  scale = 1
}) {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += speed * 0.8;
    meshRef.current.rotation.y += speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.15;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + phase) * 0.08;
  });
  const geo = () => {
    if (shape === "sphere")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.22 * scale, 12, 12] });
    if (shape === "box")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.35 * scale, 0.35 * scale, 0.35 * scale] });
    if (shape === "octahedron")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.28 * scale] });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("tetrahedronGeometry", { args: [0.3 * scale] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position, children: [
    geo(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhongMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.65,
        shininess: 80
      }
    )
  ] });
}
function FloatingShapeWire({
  position,
  shape,
  color,
  speed,
  phase,
  scale = 1
}) {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += speed * 0.8;
    meshRef.current.rotation.y += speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.15;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + phase) * 0.08;
  });
  const geo = () => {
    if (shape === "sphere")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.24 * scale, 12, 12] });
    if (shape === "box")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.37 * scale, 0.37 * scale, 0.37 * scale] });
    if (shape === "octahedron")
      return /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.3 * scale] });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("tetrahedronGeometry", { args: [0.32 * scale] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, position, children: [
    geo(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color, wireframe: true, transparent: true, opacity: 0.25 })
  ] });
}
const shapes = [
  {
    position: [-5, 0.4, -1],
    shape: "octahedron",
    color: "#38C98A",
    speed: 8e-3,
    phase: 0,
    scale: 1.2
  },
  {
    position: [-3.2, -0.5, -0.5],
    shape: "sphere",
    color: "#4fa8d8",
    speed: 6e-3,
    phase: 1.2
  },
  {
    position: [-1.4, 0.7, -1.5],
    shape: "box",
    color: "#38C98A",
    speed: 0.01,
    phase: 2.4
  },
  {
    position: [0.8, -0.3, -0.8],
    shape: "tetrahedron",
    color: "#5be0a8",
    speed: 7e-3,
    phase: 0.8
  },
  {
    position: [2.6, 0.6, -1],
    shape: "octahedron",
    color: "#4fa8d8",
    speed: 9e-3,
    phase: 1.8,
    scale: 0.9
  },
  {
    position: [4.4, -0.4, -0.5],
    shape: "sphere",
    color: "#38C98A",
    speed: 5e-3,
    phase: 3
  },
  {
    position: [5.8, 0.3, -1.5],
    shape: "box",
    color: "#5be0a8",
    speed: 0.011,
    phase: 0.4,
    scale: 0.8
  },
  {
    position: [-4.5, 0.8, -2],
    shape: "tetrahedron",
    color: "#38C98A",
    speed: 6e-3,
    phase: 2,
    scale: 0.7
  }
];
function Services3DHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute inset-0 w-full h-full",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          camera: { position: [0, 0, 6], fov: 65 },
          dpr: [1, 1.5],
          gl: { antialias: true, alpha: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "directionalLight",
              {
                position: [5, 5, 5],
                intensity: 0.7,
                color: "#38C98A"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "directionalLight",
              {
                position: [-5, -3, -5],
                intensity: 0.3,
                color: "#4fa8d8"
              }
            ),
            shapes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShape, { ...s }, `${s.shape}-${s.position[0]}`)),
            shapes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingShapeWire, { ...s }, `wire-${s.shape}-${s.position[0]}`))
          ]
        }
      )
    }
  );
}
const services = [
  {
    id: "on-page",
    icon: FileText,
    title: "On-Page SEO",
    tabLabel: "On-Page SEO",
    description: [
      "When someone searches for what you offer, the first thing Google looks at is your page itself. On-page SEO is the practice of optimizing everything on your website — from the words you use to the way your pages are structured — so that search engines can understand your content and rank it appropriately.",
      "I've audited hundreds of websites and the story is almost always the same: strong products or services buried under poorly written title tags, keyword-stuffed paragraphs, or content that simply doesn't answer what the visitor came looking for. On-page SEO fixes all of that.",
      "This isn't about gaming the algorithm. It's about making your website genuinely better for the people visiting it — and when you do that consistently, rankings follow."
    ],
    whoFor: "Businesses that have traffic but low conversion rates. Sites with pages that rank on page 2 or 3 and need a push. Anyone launching a new website who wants to start on the right foot.",
    process: [
      "Full content and structure audit — I review every page for keyword alignment, readability, and search intent match",
      "Optimization roadmap — You get a prioritized list of changes with expected impact",
      "Implementation — I rewrite titles, metas, headers, and body content where needed",
      "Monitoring & reporting — Monthly rank tracking to measure what moved"
    ],
    pricing: [
      {
        name: "Starter",
        price: "$399",
        period: "/mo",
        features: [
          "Up to 5 pages optimized",
          "Keyword research",
          "Title & meta rewrites",
          "Monthly report"
        ]
      },
      {
        name: "Growth",
        price: "$799",
        period: "/mo",
        popular: true,
        features: [
          "Up to 15 pages",
          "Content gap analysis",
          "Internal linking strategy",
          "Bi-weekly check-ins"
        ]
      },
      {
        name: "Authority",
        price: "$1,499",
        period: "/mo",
        features: [
          "Unlimited pages",
          "Full content rewrite",
          "Schema markup",
          "Weekly reporting + calls"
        ]
      }
    ]
  },
  {
    id: "off-page",
    icon: Globe,
    title: "Off-Page SEO",
    tabLabel: "Off-Page SEO",
    description: [
      "Google doesn't just look at your website. It looks at what the rest of the internet says about you. Off-page SEO is about building the kind of reputation online that makes search engines trust you enough to rank you above your competitors.",
      "Links from other websites are the currency of the internet. But not all links are created equal. A single mention in Forbes or an industry publication can do more for your rankings than 200 links from random blogs. My approach focuses on earning links that actually matter — through genuine outreach, digital PR, and content that people want to reference.",
      "I've helped clients go from having zero referring domains to building a portfolio of 100+ high-quality backlinks within a year. The results compound over time, and once you've built real authority, it's very hard for competitors to take that away."
    ],
    whoFor: "Websites stuck on page 2 despite good on-page SEO. Brands in competitive niches where everyone's content looks similar. New businesses that need to establish credibility fast.",
    process: [
      "Backlink profile audit — I analyze your current links, identify toxic ones, and benchmark against top competitors",
      "Link building strategy — Custom roadmap based on your niche, budget, and goals",
      "Outreach and placement — My team reaches out to relevant sites for genuine editorial links",
      "Monthly link report — Full transparency on every link built, with metrics"
    ],
    pricing: [
      {
        name: "Starter",
        price: "$599",
        period: "/mo",
        features: [
          "5–8 quality backlinks/mo",
          "Niche-relevant sites",
          "Monthly report"
        ]
      },
      {
        name: "Growth",
        price: "$1,199",
        period: "/mo",
        popular: true,
        features: [
          "12–18 backlinks/mo",
          "DA 30+ sites",
          "Digital PR inclusion",
          "Bi-weekly updates"
        ]
      },
      {
        name: "Authority",
        price: "$2,299",
        period: "/mo",
        features: [
          "25+ backlinks/mo",
          "DA 50+ targets",
          "Forbes/Inc outreach",
          "Weekly calls + custom reporting"
        ]
      }
    ]
  },
  {
    id: "technical",
    icon: Search,
    title: "Technical SEO",
    tabLabel: "Technical SEO",
    description: [
      "You can have the best content in the world, but if Google can't crawl your website properly, you simply won't rank. Technical SEO is the infrastructure layer of search — and it's often where the biggest, fastest wins hide.",
      "Most websites I audit have issues they don't even know about: pages being accidentally blocked from indexing, duplicate content confusing the algorithm, slow load times killing both rankings and conversions. These aren't glamorous fixes, but they're often the difference between page 1 and page 3.",
      "I approach technical SEO methodically — starting with a full crawl of your site, identifying the issues with the highest impact, and fixing them in order of priority. This is the kind of work that creates a stable, scalable foundation for everything else."
    ],
    whoFor: "Ecommerce sites with thousands of product pages. Businesses that recently migrated or redesigned their website. Any site that has plateaued in rankings despite good content.",
    process: [
      "Technical crawl and audit — Using industry-leading tools to find every issue",
      "Prioritized fix list — Ranked by impact so we tackle what matters most first",
      "Implementation + QA — I fix issues and test across devices and browsers",
      "Ongoing monitoring — Monthly crawls to catch new issues before they impact rankings"
    ],
    pricing: [
      {
        name: "Starter",
        price: "$499",
        period: "/mo",
        features: [
          "Full site audit",
          "Core Web Vitals fixes",
          "Sitemap + robots.txt",
          "Monthly crawl report"
        ]
      },
      {
        name: "Growth",
        price: "$999",
        period: "/mo",
        popular: true,
        features: [
          "JavaScript rendering",
          "Structured data setup",
          "Redirect audits",
          "Priority support"
        ]
      },
      {
        name: "Authority",
        price: "$1,899",
        period: "/mo",
        features: [
          "Enterprise crawl setup",
          "Log file analysis",
          "CDN and server optimization",
          "Weekly technical calls"
        ]
      }
    ]
  },
  {
    id: "keyword-research",
    icon: ChartNoAxesColumn,
    title: "Keyword Research",
    tabLabel: "Keyword Research",
    description: [
      "Most keyword research is done backwards. People pick keywords they think sound right, then try to rank for them. Real keyword research starts with understanding your customers — what they type when they're ready to buy, when they're comparing options, and when they're just starting to explore.",
      "I've spent years building keyword research frameworks that align with the full buyer journey, not just the high-volume terms everyone targets. The result is a strategy that attracts visitors who actually convert, not just traffic that looks good in a dashboard.",
      "Every keyword research engagement I deliver comes with a full map of your content opportunities, organized by intent and priority. It's the foundation every other SEO service is built on — and I treat it that way."
    ],
    whoFor: "Businesses starting a new SEO campaign. Content teams who need direction on what to write. Anyone who has been targeting the wrong keywords and wonders why traffic isn't converting.",
    process: [
      "Business and audience deep-dive — I learn your customers, competitors, and commercial goals",
      "Seed keyword generation — Building out your core topic clusters",
      "Full keyword expansion and filtering — Thousands of terms analyzed, the best ones surfaced",
      "Deliverable — A structured spreadsheet with intent labels, difficulty scores, and content recommendations"
    ],
    pricing: [
      {
        name: "Starter",
        price: "$299",
        period: " one-time",
        features: [
          "Up to 100 keywords",
          "Intent classification",
          "Priority score",
          "Content suggestions"
        ]
      },
      {
        name: "Growth",
        price: "$599",
        period: " one-time",
        popular: true,
        features: [
          "Up to 500 keywords",
          "Full topic cluster map",
          "Competitor gap analysis",
          "CMS-ready format"
        ]
      },
      {
        name: "Authority",
        price: "$999",
        period: " one-time",
        features: [
          "Unlimited keywords",
          "Full funnel mapping",
          "Quarterly refresh",
          "Strategy call included"
        ]
      }
    ]
  },
  {
    id: "local-seo",
    icon: MapPin,
    title: "Local SEO",
    tabLabel: "Local SEO",
    description: [
      "If you run a business that serves customers in a specific city or region, local SEO isn't optional — it's the highest-ROI marketing you can do. When someone searches 'plumber near me' or 'best dentist in Austin,' showing up in those results means phone calls, walk-ins, and booked appointments.",
      "I've helped dozens of local businesses go from invisible to page one in their city. The work involves optimizing your Google Business Profile, building local citations across directories, generating reviews strategically, and making sure your website speaks the language of local search.",
      "Local SEO is also one of the fastest areas to see results. Most of my local clients see measurable movement within 60–90 days — which makes it one of the best investments for businesses that need results now, not in a year."
    ],
    whoFor: "Restaurants, clinics, law firms, contractors, salons, and any business serving a local market. Multi-location businesses that want to dominate each city they operate in.",
    process: [
      "Local presence audit — Google Business Profile, citations, reviews, and on-page local signals",
      "GBP optimization — Complete overhaul of your Google Business Profile for maximum visibility",
      "Citation building — Get listed accurately across 50+ directories",
      "Review strategy + local content — Build social proof and target location-based keywords"
    ],
    pricing: [
      {
        name: "Starter",
        price: "$349",
        period: "/mo",
        features: [
          "GBP optimization",
          "20 citations",
          "Review monitoring",
          "Monthly report"
        ]
      },
      {
        name: "Growth",
        price: "$699",
        period: "/mo",
        popular: true,
        features: [
          "GBP management",
          "50 citations",
          "Review generation campaign",
          "Local keyword targeting"
        ]
      },
      {
        name: "Authority",
        price: "$1,299",
        period: "/mo",
        features: [
          "Multi-location support",
          "Full local content strategy",
          "Competitor conquest",
          "Weekly reporting"
        ]
      }
    ]
  }
];
const faqs = [
  {
    q: "How long does SEO take to show results?",
    a: "Honestly, it depends on where you're starting from. For most businesses, you'll start seeing meaningful movement in 3–6 months. Technical fixes and local SEO can move faster — sometimes within 60 days. Competitive national keywords take longer. I set realistic expectations from day one and show you the data every step of the way."
  },
  {
    q: "Do I need all these services or just one?",
    a: "Most clients start with one service and expand as they see results. If you're not sure where to begin, I offer a free SEO audit that tells you exactly which area has the biggest opportunity for your specific website."
  },
  {
    q: "Are your prices fixed or do you offer custom packages?",
    a: "The packages above are starting points. Most of my clients end up with a custom scope that fits their goals and budget. Use the contact form to tell me about your business and I'll put together a proposal that makes sense for you."
  },
  {
    q: "Do you work with small businesses or only large companies?",
    a: "Both. Some of my favourite projects have been helping small local businesses double their organic traffic within a year. I work with businesses of all sizes — what matters is that you're serious about investing in long-term growth."
  },
  {
    q: "Will I be locked into a long-term contract?",
    a: "No. I work on a month-to-month basis after an initial 3-month commitment (which is the minimum time needed to see real results). If you're not happy, you can cancel. Simple as that."
  },
  {
    q: "What makes you different from other SEO agencies?",
    a: "I don't have a team of 50 junior account managers passing your work around. When you hire me, I personally manage your SEO. You get direct communication, transparent reporting, and someone who actually cares about your results — not just billing hours."
  }
];
const step1Options = [
  { label: "Get more local customers", value: "local" },
  { label: "Rank for competitive keywords", value: "keywords" },
  { label: "Fix my website's technical issues", value: "technical" },
  { label: "Build my website's authority", value: "authority" },
  { label: "Understand my audience's search habits", value: "research" }
];
const step2Options = [
  { label: "Brand new (under 6 months)", value: "new" },
  { label: "Growing (6 months – 2 years)", value: "growing" },
  { label: "Established (2+ years)", value: "established" }
];
const step3Options = [
  { label: "Under $500/mo", value: "low" },
  { label: "$500–$1,500/mo", value: "mid" },
  { label: "$1,500–$3,000/mo", value: "high" },
  { label: "$3,000+/mo", value: "premium" }
];
function getRecommendation(goal) {
  switch (goal) {
    case "local":
      return { serviceId: "local-seo", name: "Local SEO" };
    case "keywords":
      return { serviceId: "keyword-research", name: "Keyword Research" };
    case "technical":
      return { serviceId: "technical", name: "Technical SEO" };
    case "authority":
      return { serviceId: "off-page", name: "Off-Page SEO" };
    default:
      return { serviceId: "on-page", name: "On-Page SEO" };
  }
}
function RadioOption({
  label,
  value,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onSelect(value),
      className: `w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${selected ? "border-[#38C98A] bg-[#38C98A]/10 text-[#0B2A43]" : "border-gray-200 bg-white text-gray-700 hover:border-[#38C98A]/50 hover:bg-[#38C98A]/5"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-4 h-4 rounded-full border-2 flex-none flex items-center justify-center ${selected ? "border-[#38C98A]" : "border-gray-300"}`,
            children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[#38C98A] block" })
          }
        ),
        label
      ] })
    }
  );
}
function ServiceChooser({ onScrollTo }) {
  const [step, setStep] = reactExports.useState(1);
  const [goal, setGoal] = reactExports.useState("");
  const [stage, setStage] = reactExports.useState("");
  const [budget, setBudget] = reactExports.useState("");
  const [done, setDone] = reactExports.useState(false);
  const reset = () => {
    setStep(1);
    setGoal("");
    setStage("");
    setBudget("");
    setDone(false);
  };
  const next = () => {
    if (step < 3) setStep((s) => s + 1);
    else setDone(true);
  };
  const canNext = step === 1 && goal || step === 2 && stage || step === 3 && budget;
  const recommendation = goal ? getRecommendation(goal) : null;
  const stepTitles = [
    "What's your main goal?",
    "What's your website stage?",
    "What's your monthly budget?"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-[#38C98A] transition-all duration-500",
        style: { width: done ? "100%" : `${(step - 1) / 3 * 100}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 sm:p-8", children: !done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
        [1, 2, 3].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${s < step ? "bg-[#38C98A] text-white" : s === step ? "bg-[#0B2A43] text-white" : "bg-gray-100 text-gray-400"}`,
            children: s < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }) : s
          },
          s
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 ml-1", children: [
          "Step ",
          step,
          " of 3"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-[#0B2A43] mb-4", children: stepTitles[step - 1] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.2 },
          className: "space-y-2",
          children: [
            step === 1 && step1Options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadioOption,
              {
                label: o.label,
                value: o.value,
                selected: goal === o.value,
                onSelect: setGoal
              },
              o.value
            )),
            step === 2 && step2Options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadioOption,
              {
                label: o.label,
                value: o.value,
                selected: stage === o.value,
                onSelect: setStage
              },
              o.value
            )),
            step === 3 && step3Options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RadioOption,
              {
                label: o.label,
                value: o.value,
                selected: budget === o.value,
                onSelect: setBudget
              },
              o.value
            ))
          ]
        },
        step
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: next,
          disabled: !canNext,
          className: "mt-6 w-full bg-[#0B2A43] hover:bg-[#0d3354] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2",
          "data-ocid": "services.chooser.button",
          children: [
            step === 3 ? "See My Recommendation" : "Next Step",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#38C98A]/15 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-[#38C98A]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-1", children: "Recommended Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-[#0B2A43]", children: recommendation == null ? void 0 : recommendation.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mt-3 text-sm leading-relaxed", children: "Based on your answers, this is where you'll see the strongest ROI. Click below to see full details, pricing, and what the process looks like." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                if (recommendation) onScrollTo(recommendation.serviceId);
              },
              className: "w-full bg-[#38C98A] hover:bg-[#2db87a] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3",
              "data-ocid": "services.recommendation.button",
              children: [
                "Learn More ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: reset,
              className: "w-full border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2",
              "data-ocid": "services.restart.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                " Start Over"
              ]
            }
          )
        ]
      },
      "result"
    ) }) })
  ] });
}
function PricingCard({ tier }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative rounded-2xl p-6 flex flex-col ${tier.popular ? "bg-[#0B2A43] text-white shadow-2xl scale-[1.03] border-2 border-[#38C98A]" : "bg-white border-2 border-gray-100 text-[#0B2A43]"}`,
      children: [
        tier.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38C98A] text-white text-xs font-bold px-4 py-1 rounded-full", children: "Most Popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h4",
          {
            className: `text-lg font-bold mb-1 ${tier.popular ? "text-white" : "text-[#0B2A43]"}`,
            children: tier.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-3xl font-extrabold ${tier.popular ? "text-[#38C98A]" : "text-[#0B2A43]"}`,
              children: tier.price
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-sm pb-1 ${tier.popular ? "text-white/70" : "text-gray-500"}`,
              children: tier.period
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 flex-1 mb-6", children: tier.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mt-0.5 flex-none text-[#38C98A]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-sm ${tier.popular ? "text-white/85" : "text-gray-600"}`,
              children: f
            }
          )
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            className: `block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${tier.popular ? "bg-[#38C98A] hover:bg-[#2db87a] text-white" : "border-2 border-[#0B2A43] hover:bg-[#0B2A43] hover:text-white text-[#0B2A43]"}`,
            "data-ocid": "services.pricing.button",
            children: "Get Started"
          }
        )
      ]
    }
  );
}
function ServiceSection({ service }) {
  const Icon = service.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: service.id,
      className: "py-20 scroll-mt-28",
      "data-ocid": `services.${service.id}.section`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-8 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#38C98A]/15 flex items-center justify-center flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-[#38C98A]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-[#0B2A43]", children: service.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/services/$id",
              params: { id: service.id },
              className: "inline-flex items-center gap-1.5 text-[#38C98A] hover:text-[#2db87a] text-sm font-semibold transition-colors border border-[#38C98A]/30 px-4 py-1.5 rounded-full hover:bg-[#38C98A]/5",
              "data-ocid": `services.${service.id}.link`,
              children: [
                "View Full Page ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: service.description.map((para) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-gray-600 leading-relaxed",
              children: para
            },
            para.slice(0, 40)
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F7F9FC] rounded-2xl p-5 border-l-4 border-[#38C98A]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-2", children: "Who This Is For" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: service.whoFor })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F7F9FC] rounded-2xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-4", children: "Our Process" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: service.process.map((processStep, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-[#0B2A43] text-white text-xs font-bold flex items-center justify-center flex-none mt-0.5", children: idx + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 text-sm leading-relaxed", children: processStep })
                  ]
                },
                processStep.slice(0, 30)
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-[#0B2A43] mb-6 text-center", children: "Pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch", children: service.pricing.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsx(PricingCard, { tier }, tier.name)) })
        ] })
      ] })
    }
  );
}
function Services() {
  const [activeTab, setActiveTab] = reactExports.useState("on-page");
  const tabBarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    for (const s of services) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  const scrollToService = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveTab(id);
    }
  };
  const scrollToChooser = () => {
    const el = document.getElementById("chooser");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#F7F9FC]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] pt-28 pb-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 rounded-full bg-[#38C98A]/5 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#38C98A]/8 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Services3DHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[#38C98A]/20 text-[#38C98A] border-[#38C98A]/30 mb-5 px-4 py-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 mr-1.5" }),
              " Trusted by 100+ Businesses"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight", children: [
              "SEO Services Designed to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A]", children: "Grow Your Business" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-lg max-w-2xl mx-auto mb-8 leading-relaxed", children: "Whether you're a local shop or a scaling ecommerce brand, I offer tailored SEO strategies that put you in front of the right people at the right time." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: scrollToChooser,
                  className: "bg-[#38C98A] hover:bg-[#2db87a] text-white font-semibold px-7 py-3.5 rounded-full transition-colors",
                  "data-ocid": "services.hero.primary_button",
                  children: "View All Services"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  className: "border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-full transition-colors",
                  "data-ocid": "services.hero.secondary_button",
                  children: "Get Free Audit"
                }
              )
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "chooser", className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-[#0B2A43] mb-3", children: "Which Service Do I Need?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 max-w-xl mx-auto", children: "Answer 3 quick questions and I'll point you to the service that will have the biggest impact on your business." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceChooser, { onScrollTo: scrollToService })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: tabBarRef,
        className: "sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm",
        "data-ocid": "services.tabs.panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto gap-1 py-1", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => scrollToService(s.id),
            className: `flex-none px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === s.id ? "bg-[#38C98A]/15 text-[#38C98A] font-semibold" : "text-gray-600 hover:text-[#0B2A43] hover:bg-gray-50"}`,
            "data-ocid": `services.${s.id}.tab`,
            children: s.tabLabel
          },
          s.id
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#F7F9FC]", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: i % 2 === 0 ? "bg-[#F7F9FC]" : "bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceSection, { service: s }) }, s.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 bg-[#0B2A43] relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 rounded-full bg-[#38C98A]/5 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#38C98A]/15 text-[#38C98A] px-4 py-1 rounded-full text-sm font-semibold mb-4", children: "Why Choose RankPro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-white mb-3", children: "RankPro vs. The Alternatives" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] max-w-xl mx-auto", children: "See how a dedicated SEO expert compares to typical agencies and generalist freelancers." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-[#C7D2E0] font-semibold px-6 py-4 w-1/3", children: "Feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#38C98A] text-white text-xs font-bold px-3 py-1 rounded-full", children: "RankPro SEO" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center text-[#C7D2E0] font-semibold px-6 py-4", children: "Typical Agency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center text-[#C7D2E0] font-semibold px-6 py-4", children: "Freelancer" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
            {
              feature: "Dedicated Account Manager",
              rankpro: true,
              agency: false,
              freelancer: false
            },
            {
              feature: "Monthly Reporting & Analytics",
              rankpro: true,
              agency: true,
              freelancer: false
            },
            {
              feature: "Deep Keyword Research",
              rankpro: true,
              agency: true,
              freelancer: true
            },
            {
              feature: "Competitor Gap Analysis",
              rankpro: true,
              agency: false,
              freelancer: false
            },
            {
              feature: "24/7 Support & Communication",
              rankpro: true,
              agency: false,
              freelancer: false
            },
            {
              feature: "ROI Guarantee Policy",
              rankpro: true,
              agency: false,
              freelancer: false
            },
            {
              feature: "Technical + Content + Links",
              rankpro: true,
              agency: true,
              freelancer: false
            },
            {
              feature: "Transparent Pricing",
              rankpro: true,
              agency: false,
              freelancer: true
            }
          ].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-white/5 ${i % 2 === 0 ? "bg-white/3" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-[#C7D2E0] px-6 py-4 font-medium", children: row.feature }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-6 py-4", children: row.rankpro ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38C98A]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-[#38C98A]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M5 13l4 4L19 7"
                      }
                    )
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-red-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-6 py-4", children: row.agency ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38C98A]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-[#38C98A]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M5 13l4 4L19 7"
                      }
                    )
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-red-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-center px-6 py-4", children: row.freelancer ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38C98A]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-[#38C98A]",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M5 13l4 4L19 7"
                      }
                    )
                  }
                ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4 text-red-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                ) }) })
              ]
            },
            row.feature
          )) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold text-[#0B2A43] mb-3", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Everything you need to know before getting started." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AccordionItem,
        {
          value: `faq-${i}`,
          className: "bg-[#F7F9FC] rounded-xl border border-gray-100 px-5 data-[state=open]:border-[#38C98A]/40",
          "data-ocid": `services.faq.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left font-semibold text-[#0B2A43] hover:text-[#38C98A] hover:no-underline py-4", children: faq.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-gray-600 leading-relaxed pb-4", children: faq.a })
          ]
        },
        faq.q
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#38C98A] py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-white mb-4", children: "Ready to Rank Higher and Get More Customers?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg mb-8 max-w-xl mx-auto", children: "Let's look at your website together. The audit is free, and there's no obligation." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/contact",
              className: "inline-flex items-center gap-2 bg-white text-[#0B2A43] hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition-colors text-lg shadow-lg",
              "data-ocid": "services.cta.primary_button",
              children: [
                "Book Your Free SEO Audit ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Services as default
};
