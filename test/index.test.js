var postcss = require('postcss');
var plugin = require('../index');

function run(input, output, opts) {

    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('should replace version string in a comment', () => {
    return run(
        '/* CustomCSS Library v{{ version }} */',
        '/* CustomCSS Library v1.3.7 */',
        { data: { version: '1.3.7' }}
    );
});
