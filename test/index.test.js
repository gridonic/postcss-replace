const postcss = require('postcss');
const plugin = require('../index');
const pkg = require('../package.json');
const fs = require('fs');

/**
 * Runs the plugins process function. Tests whether the given input is equal
 * to the expected output with the given options.
 *
 * @param {string} input Input fixture file.
 * @param {object} opts Options to be used by the plugin.
 * @return {function}
 */
function run(input, opts) {
    const raw = fs.readFileSync(`./test/fixtures/${input}.css`, 'utf8');
    const expected = fs.readFileSync(`./test/fixtures/${input}.expected.css`, 'utf8');

    return postcss([plugin(opts)]).process(raw)
        .then(result => {
            expect(result.css).toEqual(expected);
            expect(result.warnings().length).toBe(0);
        });
}

it('Should replace “name” string in a comment/value.', () => {
    return run('basic', { data: pkg });
});

it('Should NOT replace anything in a value, when “commentsOnly” option is set to TRUE.', () => {
    return run('commentsOnly', { data: pkg, commentsOnly: true });
});
