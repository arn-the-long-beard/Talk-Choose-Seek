export default ({ css, html, helmet, finalState }) => {
  // TODO Migrate the ccs here to the react part
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<style type="text/css">
${css}

body
{
    margin: 0%!important;
}
  .json-inspector__key,
            .json-inspector__value {
                position: relative;
            }

            .json-inspector__selection {
                display: block;
                position: absolute;
                top: -1px;
                left: -3px;
                right: 0;
                z-index: 1;
                padding: 0 3px;

                font: 1em/1 Consolas, monospace;
                outline: none;
                border: none;
                opacity: 0;
                box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.3);
                color: #222;
            }

            .json-inspector__selection:focus {
                opacity: 1;
            }
            
 .json-inspector,
.json-inspector__selection {
    font: 14px/1.4 Consolas, monospace;
}

.json-inspector__leaf {
    padding-left: 10px;
}

.json-inspector__line {
    display: block;
    position: relative;

    cursor: default;
}

.json-inspector__line:after {
    content: '';

    position: absolute;
    top: 0;
    left: -200px;
    right: -50px;
    bottom: 0;
    z-index: -1;

    pointer-events: none;
}

.json-inspector__line:hover:after {
    background: rgba(0, 0, 0, 0.06);
}

.json-inspector__leaf_composite > .json-inspector__line {
    cursor: pointer;
}

.json-inspector__radio,
.json-inspector__flatpath {
    display: none;
}

.json-inspector__value {
    margin-left: 5px;
}

.json-inspector__search {
    min-width: 300px;
    margin: 0 10px 10px 0;
    padding: 2px;
}

.json-inspector__key {
    color: #505050;
}

.json-inspector__value_helper,
.json-inspector__value_null,
.json-inspector__not-found {
    color: #b0b0b0;
}

.json-inspector__value_string {
    color: #798953;
}

.json-inspector__value_boolean {
    color: #75b5aa;
}

.json-inspector__value_number {
    color: #d28445;
}

.json-inspector__hl {
    background: #ff0;
    box-shadow: 0 -1px 0 2px #ff0;
    border-radius: 2px;
}

.json-inspector__show-original {
    display: inline-block;
    padding: 0 6px;

    color: #666;
    cursor: pointer;
}

.json-inspector__show-original:hover {
    color: #111;
}

.json-inspector__show-original:before {
    content: '⥂';
}

.json-inspector__show-original:hover:after {
    content: ' expand'
}
           
            
/*
body {
  margin: 0;
  font-size: 16px;
}
*/



</style>
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
</head>
<body ${helmet.bodyAttributes.toString()}>
<div id="root">${html}</div>

<script>      // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${finalState}</script>
  
<script src="/static/client.js" async></script>
</body>
</html>`
}
