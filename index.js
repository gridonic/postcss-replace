// Dependencies
const postcss = require('postcss');
const deep = require('deep-get-set');
const kindOf = require('kind-of');

// Default options, see README.md
const defaults = {
    pattern: /{{\s?([^\s]+?)\s?}}/gi,
    commentsOnly: false,
    data: {}
};

module.exports = postcss.plugin('postcss-replace', (opts = defaults) => {
    const options = Object.assign({}, defaults, opts);

    return (css) => {

        // Check validity of provided pattern. If not valid throw TypeError
        let regex = null;

        if (options.pattern instanceof RegExp) {
            regex = options.pattern;
        } else if (typeof options.pattern === 'string') {
            regex = new RegExp(options.pattern, 'gi');
        } else {
            throw new TypeError(`Invalid pattern provided. It is expected to be a string or an instance of RegExp. Got: ${kindOf(options.pattern)}`);
        }

        const replacementArgs = [regex, (match, key) => {
            const replace = deep(options.data, key);

            if (typeof replace !== 'string') {
                return match;
            }

            return replace;
        }];

        css[options.commentsOnly ? 'walkComments' : 'walk']((node) => {

            // Before we had the switch statement, we just used node.replaceValues(). This could potentially lead to
            // incorrect behaviour as described in https://github.com/gridonic/postcss-replace/issues/5.
            //
            // So for example if the CSS contains at-rules like @media, calling replaceValues() would replace
            // everything inside the @media { … } statement and since we are walking through *all* nodes, we would
            // encounter the nodes from the @media statement again in the next iteration/call of our walk function.
            //
            // This is why we have refactored the logic of the walk function to use a switch statement in order to do
            // the replacement only on the relevant nodes and use the appropriate replacement logic.
            //
            // Furthermore it also makes adding/handling new cases quite comfortable.
            //
            // @see http://api.postcss.org/
            switch (node.constructor.name) {
                case 'Comment':
                    node.text = node.text.replace(...replacementArgs);
                    break;

                case 'Declaration':
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
    };
});
