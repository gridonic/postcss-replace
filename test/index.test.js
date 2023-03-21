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

    return postcss([plugin(opts)]).process(raw, { from: undefined })
        .then(result => {
            expect(result.css).toEqual(expected);
            expect(result.warnings().length).toBe(0);
        });
}


it('Should replace strings in comments and styles.', () => {
    return run('basic', { data: pkg });
});

it('Should throw a TypeError if invalid pattern is supplied.', () => {
    expect(() => {
        return run('basic', { data: pkg, pattern: null })
    }).toThrow(TypeError);
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

it('Should not replace multiple times', () => {
    return run('noDuplicate', {
        pattern: /(a)/g,
        data: { a: 'abc'}
    });
});

it('Should replace strings in selectors', () => {
    return run('selectors', {
        pattern: /(foo)/g,
        data: { 'foo': 'bar' },
    });
});

it('Should replace regex to empty in selectors', () => {
    return run('regexEmpty', {
        pattern: /\[.*\]:delete\s+/gi,
        data: { replaceAll: '' }
    });
});

it('Should replace regex to single value in selectors', () => {
    return run('regexValue', {
        pattern: /\[.*\]:delete/gi,
        data: { replaceAll: '.newValue' }
    });
});

it('Should work with custom Regex string', () => {
    return run('customRegexValue', {
        pattern: new RegExp(/%replace_me%/, 'gi'),
        data: { replaceAll: 'new awesome string :)' }
    });
});

it('Should replace properties and values', () => {
    return run('replaceProperties', {
        pattern: /##\((.*?)\)/g,
        data: {
            'prop': 'color',
            'name': 'basic',
            'key': 'dark',
            'value': '#9c9c9c'
        },
    });
});
