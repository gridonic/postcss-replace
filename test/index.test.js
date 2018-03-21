const postcss = require('postcss');
const fs = require('fs');
const plugin = require('../index');
const pkg = require('../package.json');

/**
 * Runs the plugins process function. Tests whether the given input is equal
 * to the expected output with the given options.
 *
 * @param {string} input Input fixture file name.
 * @param {object} opts Options to be used by the plugin.
 * @return {function}
 */
function run(input, opts = {}) {
    const raw = fs.readFileSync(`./test/fixtures/${input}.css`, 'utf8');
    const expected = fs.readFileSync(`./test/fixtures/${input}.expected.css`, 'utf8');

    return postcss([plugin(opts)]).process(raw)
        .then(result => {
            expect(result.css).toEqual(expected);
            expect(result.warnings().length).toBe(0);
        });
}

it('Should replace strings in comments and styles.', () => {
    return run('basic', { data: pkg });
});

it('Should throw a TypeError if invalid pattern is supplied.', () => {
    return run('basic', { data: pkg, pattern: NaN }).catch(e =>
        expect(e).toBeInstanceOf(TypeError)
    )
});

it('Should not replace anything in styles when “commentsOnly” option is set to TRUE.', () => {
    return run('commentsOnly', { data: pkg, commentsOnly: true });
});

it('Should not replace anything without data', () => {
    return run('noChanges');
});

it('Should not change unknown variables', () => {
    return run('noChanges', { data: pkg });
});

it('Should work with deep data objects', () => {
    return run('deep', { data: { level1: { level2: 'test' } } });
});

it('Should work with a custom RegEx', () => {
    return run('otherRegex', { data: pkg, pattern: /%\s?([^\s]+?)\s?%/gi });
});

it('Should work with a custom RegEx object', () => {
    return run('basic', { data: pkg, pattern: new RegExp(/{{\s?([^\s]+?)\s?}}/, 'gi') });
});

it('Should work with a custom RegEx string', () => {
    return run('basic', { data: pkg, pattern: '{{\\s?([^\\s]+?)\\s?}}' });
});

it('Should work with another custom RegEx string', () => {
    return run('otherRegex', { data: pkg, pattern: '%\\s?([^\\s]+?)\\s?%' });
});

it('Should work with empty string values', () => {
    return run('empty', { data: { value: '' } });
});

it('Should work with undefined values', () => {
    return run('noChanges', { data: { value: undefined } });
});

it('Should work with null values', () => {
    return run('noChanges', { data: { value: null } });
});

it('Should work with null data', () => {
    return run('noChanges', { data: null });
});
