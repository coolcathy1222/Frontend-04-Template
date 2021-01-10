let stack;
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

const EOF = Symbol('EOF');

function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }

  if (selector.charAt(0) === '#') {
    let attr = element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && (attr.value === selector.replace('#', '') || selector.includes('#' + attr.value))) {
      return true;
    }
  } else if (selector.charAt(0) === '.') {
    let attr = element.attributes.filter(attr => attr.name === 'class')[0]
    if (attr && (attr.value === selector.replace('.', '') || selector.includes('.' + attr.value))) {
      return true;
    }
  } else {
    if (element.tagName === selector || selector.includes(element.tagName)) {
      return true;
    }
  }
  return false;
}

const regexp = RegExp('[#.]', 'g');
function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
    let matches = part.matchAll(regexp);
    let startIndex = 0;
    let tmpArr = [];
    for (const match of matches) {
      if (match.index > 0) {
        tmpArr.push(part.slice(startIndex, match.index));
        startIndex = match.index;
      }
    }
    if (tmpArr.length > 0) {
      tmpArr.push(part.slice(startIndex));
      for (let subpart of tmpArr) {
        if (subpart.charAt(0) === "#") {
          p[1] += 1;
        } else if (subpart.charAt(0) === ".") {
          p[2] += 1;
        } else {
          p[3] += 1;
        }
      }
    } else {
      if (part.charAt(0) === "#") {
        p[1] += 1;
      } else if (part.charAt(0) === ".") {
        p[2] += 1;
      } else {
        p[3] += 1;
      }
    }
  }
  return p;
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

function emit(token) {
  let top = stack[stack.length - 1];
  if ('startTag' === token.type) {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
      tagName: token.tagName
    };

    for (let p in token) {
      if ('type' !== p && 'tagName' !== p) {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    top.children.push(element);
    element.parent = top;

    if (!token.isSelfClosing) {
      stack.push(element);
    }

    currentTextNode = null;

  } else if ('endTag' === token.type) {

    if (top.tagName !== token.tagName) {
      throw new Error('Tag start end doesn\'t match!');
    } else {
      if ("style" === top.tagName) {
      }
      stack.pop();
    }
    currentTextNode = null;

  } else if (token.type === 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: ''
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }

}

function data(c) {
  if ('<' === c) {
    return tagOpen;
  } else if (EOF === c) {
    emit({
      type: 'EOF'
    });
    return;
  } else {
    emit({
      type: 'text',
      content: c
    });
    return data;
  }
}

function tagOpen(c) {
  if ('/' === c) {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    };
    return tagName(c);
  } else {
  	emit({
  		type: "text",
  		content: c
  	});
    return data;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c);
  } else if ('>' === c) {

  } else if (EOF === c) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if ('/' === c) {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName;
  } else if ('>' === c) {
    emit(currentToken);
    return data;
  } else {
    // currentToken.tagName += c;
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if ('/' === c || '>' === c || EOF === c) {
    return afterAttributeName(c);
  } else if ('=' === c) {

  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || '/' === c || '>' === c || EOF === c) {
    return afterAttributeName(c);
  } else if ('=' === c) {
    return beforeAttributeValue;
  } else if ('\u0000' === c === c) {

  } else if ('\"' === c || '\'' === c || '<' === c) {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if ('/' === c) {
    return selfClosingStartTag;
  } else if ('=' === c) {
    return beforeAttributeValue;
  } else if ('>' === c) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (EOF === c) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    };
    return attributeName(c);
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || '/' === c || '>' === c || EOF === c) {
    return beforeAttributeValue;
  } else if ('\"' === c) {
    return doubleQuoteAttributeValue;
  } else if ('\'' === c) {
    return singleQuoteAttributeValue;
  } else if ('>' === c) {

  } else {
    return unquoteAttributeValue;
  }
}

function doubleQuoteAttributeValue(c) {
  if ('\"' === c) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if ('\u0000' === c) {

  } else if (EOF === c) {

  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}

function singleQuoteAttributeValue(c) {
  if ('\'' === c) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if ('\u0000' === c) {

  } else if (EOF === c) {

  } else {
    currentAttribute.value += c;
    return singleQuoteAttributeValue;
  }
}

function unquoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if ('/' === c) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if ('>' === c) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {

  } else if ('\"' === c || '\'' === c || '<' === c || '=' === c || '`' === c) {

  } else if (EOF === c) {

  } else {
    currentAttribute.value += c;
    return unquoteAttributeValue;
  }
}

function afterQuoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if ('/' === c) {
    return selfClosingStartTag;
  } else if ('>' === c) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (EOF === c) {

  } else {
  	throw new Error("unexpected character \"" + c + "\"")
  }
}

function selfClosingStartTag(c) {
  if ('>' === c) {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (EOF === c) {
	throw new Error("unexpected character \"" + c + "\"")
  } else {

  }
}

export function parseHTML(html) {

  stack = [{ type: 'document', children: [] }];
  currentToken = null;
  currentAttribute = null;
  currentTextNode = null;

  let state = data;
  for (let c of html) {
    state = state(c);
  }

  state = state(EOF);
  return stack[0];
}