// Dependencies
const postcss = require('postcss');
const deep = require('deep-get-set');

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
            throw new TypeError('Did you provide a valid regex pattern?');
        }

        const replacementArgs = [
            regex,
            (match, key) => (deep(options.data, key) || match)
        ];

        const nodeWalker = css[options.commentsOnly ? 'walkComments' : 'walk'].bind(css);

        nodeWalker((node) => {
            // Node
            if (node.text) {
                node.text = node.text.replace(...replacementArgs)
            }

            // Container
            else if (node.replaceValues) {
                node.replaceValues(...replacementArgs)
            }
        });
    };
});
