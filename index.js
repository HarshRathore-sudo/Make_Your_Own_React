function createElement(type, props, ...children) {
  return {
    type,
    props: {
      props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  // const dom =
  //   element.type === "TEXT_ELEMENT"
  //     ? document.createTextNode("")
  //     : document.createElement(element.type);

  // const isProperty = (key) => key !== "children";
  // Object.keys(element.props)
  //   .filter(isProperty)
  //   .forEach((name) => {
  //     dom[name] = element.props[name];
  //   });

  // container.appendChild(dom);
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

let nextUnitOfWork = null;

function performNextUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;

  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }
  const nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const Didact = {
  createElement,
  render,
};

// const element = Didact.createElement(
//     "div",
//     { id: "foo" },
//     Didact.createElement("h1", null, "Hello from Didact"),
//     Didact.createElement("b")
//   )

/* 
If we have a comment like this one, when babel transpiles the JSX it will use the function we define.

*/

/*
 * @jsx Didact.createElement
 */

const element = (
  <div id="foo">
    <h1>Hello from Didact</h1>
  </div>
);
const container = document.getElementById("root");

Didact.render(element, container);
