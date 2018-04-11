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

        const replacementArgs = [regex, (match, key) => {
            const replace = deep(options.data, key);

            if (typeof replace !== 'string') {
                return match;
            }

            return replace;
        }];

        css[options.commentsOnly ? 'walkComments' : 'walk']((node) => {
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
            }
        });
    };
});
