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
        const regex = typeof options.pattern === 'string' ?
            new RegExp(options.pattern, 'gi') : options.pattern;

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
