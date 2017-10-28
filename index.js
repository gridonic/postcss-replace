const postcss = require('postcss');
const deep = require('deep-get-set');

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

        css[options.commentsOnly ? 'walkComments' : 'walk'](
            (node) => {
                // Node
                if (node.text) {
                    node.text = node.text.replace(
                        regex,
                        (match, key) => (deep(options.data, key) || match)
                    )
                }

                // Container
                else if (node.replaceValues) {
                    node.replaceValues(
                        regex,
                        (match, key) => (deep(options.data, key) || match)
                    )
                }
            }
        );
    };
});
