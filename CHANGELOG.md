# [2.0.1]
###### Unreleased

###### Changed
- Replacing `deep-get-set` with `object-path` to fix security issue with [prototype pollution](https://github.com/advisories/GHSA-mjjj-6p43-vhhv). 

# [2.0.0]
###### 2022-02-14

###### Changed
- Migration to PostCSS 8
- Updated compatible node versions


# [1.1.3]
###### 2021-03-02

###### Changed
- Add new test ro replacing properties
- Some (non functional relevant) clean-up work
- Updating dependencies


# [1.1.2]
###### 2020-04-14

###### Changed
- Fix typos in readme
- Updating dependencies (including security updates)


# [1.1.0]
###### 2019-10-21

###### Changed
- Enable replacements for selectors (thx doplumi!)
- Updating dependencies (including security updates)

# [1.0.8]
###### 2019-09-13

###### Changed
- Updating dependencies (including security updates)

# [1.0.7]
###### 2019-07-12

###### Changed
- Updating dependencies (security updates)

# [1.0.6]
###### 2019-04-12

###### Changed
- Updating dev-dependencies


# [1.0.5]
###### 2019-03-11

###### Changed
- Changes to dev-dependencies only: Updated to newest versions of jest, stryker and coveralls


# [1.0.4]
###### 2019-01-25

###### Changed
- Changes to dependencies only (mainly moving from postCSS 6 to 7) and some related, internal configurations.
After internal discussions and reading about similar cases at https://github.com/semver/semver/issues/148 
we decided that such a changes should be met with a patch-level version bump, not more.

# [1.0.3]
###### 2018-04-11

###### Fixed
- Replacement happening multiple times in specific cases. ([#5])
- Unhelpful wording of error message when pattern option is invalid. ([334f212])

# [1.0.2]
###### 2018-03-21

###### Fixed
- Empty strings not being considered for replacing. ([#4])

# [1.0.1]
###### 2017-12-08

###### Added
- [Stryker] mutation testing. ([29aafc9])

###### Changed
- Removed `yarn.lock` file as we only use [npm] from now on. ([800998d])

###### Fixed
- Better test coverage. ([2b06e2d])


# 1.0.0
###### 2017-10-30

First public release! 🎉


[1.0.3]: https://github.com/gridonic/postcss-replace/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/gridonic/postcss-replace/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/gridonic/postcss-replace/compare/1.0.0...1.0.1

[Stryker]: https://github.com/stryker-mutator/stryker
[npm]: https://www.npmjs.com/

[2b06e2d]: https://github.com/gridonic/postcss-replace/commit/2b06e2d
[29aafc9]: https://github.com/gridonic/postcss-replace/commit/29aafc9
[800998d]: https://github.com/gridonic/postcss-replace/commit/800998d
[334f212]: https://github.com/gridonic/postcss-replace/commit/334f212

[#4]: https://github.com/gridonic/postcss-replace/issues/4
[#5]: https://github.com/gridonic/postcss-replace/issues/5
