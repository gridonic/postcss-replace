// Dependencies
const objectPath = require('object-path');
const kindOf = require('kind-of');

// Default options, see README.md
const defaults = {
    pattern: /{{\s?([^\s]+?)\s?}}/gi,
    commentsOnly: false,
    data: {}
};

function postCSSReplace(opts = defaults) {
    const options = Object.assign({}, defaults, opts);

    // Check validity of provided pattern. If not valid throw TypeError
    let regex = null;

    if (options.pattern instanceof RegExp) {
        regex = options.pattern;
    } else if (typeof options.pattern === 'string') {
        regex = new RegExp(options.pattern, 'gi');
    } else {
        throw new TypeError(`Invalid pattern provided. It is expected to be a string or an instance of RegExp. Got: ${kindOf(options.pattern)}`);
    }

    const replacementArgs = options.data && options.data.replaceAll != null ? [regex, options.data.replaceAll] : [regex, (match, key) => {
        const replace = objectPath.get(options.data, key);

        if (typeof replace !== 'string') {
            return match;
        }

        return replace;
    }];

    return {
        postcssPlugin: 'postcss-replace',
        OnceExit(root) {
            root[options.commentsOnly ? 'walkComments' : 'walk']((node) => {

                // Before the switch statement was used, we used node.replaceValues(). This lead to
                // incorrect behaviour as described in https://github.com/gridonic/postcss-replace/issues/5.
                //
                // For example: if the CSS contains at-rules like @media, calling replaceValues() would replace
                // everything inside the @media { … } statement and since we are walking through *all* nodes, we would
                // encounter the nodes from the @media statement again in the next iteration/call of our walk function.
                //
                // This is why we have refactored the logic of the walk function to use a switch statement in order to do
                // the replacement only on the relevant nodes and use the appropriate replacement logic.
                //
                // This makes adding/handling new cases quite comfortable.
                //
                // @see http://api.postcss.org/
                switch (node.constructor.name) {
                    case 'Comment':
                        node.text = node.text.replace(...replacementArgs);
                        break;

                    case 'Declaration':
                        node.prop = node.prop.replace(...replacementArgs);
                        node.value = node.value.replace(...replacementArgs);
                        break;

                    case 'AtRule':
                        node.params = node.params.replace(...replacementArgs);
                        break;

                    case 'Rule':
                        node.selector = node.selector.replace(...replacementArgs);
                        break;
                }
            });
        }
    }
}

postCSSReplace.postcss = true;

module.exports = postCSSReplace;
