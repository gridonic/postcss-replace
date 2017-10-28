const postcss = require('postcss');
const plugin = require('../index');

/**
 * Runs the plugins process function. Tests wether the given input is equal
 * to the given expected output with the given options
 *
 * @param {string} input valid CSS string.
 * @param {string} output valid CSS string.
 * @param {object} opts options to be used by the plugin.
 * @return {Function | any}
 */
function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('Should replace version string in a comment', () => {
    return run(
        '/* CustomCSS Library v{{version}} */',
        '/* CustomCSS Library v1.3.7 */',
        { data: { version: '1.3.7' }}
    );
});

it('Should replaces keywords without spaces', () => {
    return run(
        '/* CustomCSS Library v{{version}} */',
        '/* CustomCSS Library v1.3.7 */',
        { data: { version: '1.3.7' }}
    );
});

it('Should replaces keywords without space at the end', () => {
    return run(
        '/* CustomCSS Library v{{version }} */',
        '/* CustomCSS Library v1.3.7 */',
        { data: { version: '1.3.7' }}
    );
});

it('Should replaces keywords without space at the beginning', () => {
    return run(
        '/* CustomCSS Library v{{ version}} */',
        '/* CustomCSS Library v1.3.7 */',
        { data: { version: '1.3.7' }}
    );
});

it('Should not replace anything in a non-comment when commentOnly option is given', () => {
    return run(
        'a { content: "{{ value }}"; }',
        'a { content: "{{ value }}"; }',
        { data: { value: 'test' }, commentsOnly: true }
    );
});
