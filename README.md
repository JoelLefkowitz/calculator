# calculator

Calculator PWA.

## Status

| Source     | Shields                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Project    | ![release][release_shield] ![license][license_shield] ![lines][lines_shield] ![languages][languages_shield]                                   |
| Health     | ![codacy][codacy_shield] ![readthedocs][readthedocs_shield] ![github_review][github_review_shield] ![codacy_coverage][codacy_coverage_shield] |
| Repository | ![issues][issues_shield] ![issues_closed][issues_closed_shield] ![pulls][pulls_shield] ![pulls_closed][pulls_closed_shield]                   |
| Activity   | ![contributors][contributors_shield] ![monthly_commits][monthly_commits_shield] ![last_commit][last_commit_shield]                            |

![screenshot][screenshot]


Calculator PWA that validates input and feedback on gives errors.

[![check_it_out]](https://calculator.joellefkowitz.co.uk/)

## Tests

To run unit tests and generate a coverage report:

```bash
grunt tests
```

To run e2e tests:

```bash
grunt e2e
```

## Documentation

This repository's documentation is hosted on [readthedocs][readthedocs].

## Tooling

To run linters:

```bash
grunt lint
```

To run formatters:

```bash
grunt format
```

## Continuous integration

This repository uses Github actions to build and test each commit. Formatting tasks and writing/generating documentation must be done before committing new code.

## Versioning

This repository adheres to semantic versioning standards.
For more information on semantic versioning visit [SemVer][semver].

Bump2version is used to version and tag changes.
For example:

```bash
bump2version patch
```

## Changelog

Please read this repository's [CHANGELOG](CHANGELOG.md) for details on changes that have been made.

## Contributing

Please read this repository's guidelines on [CONTRIBUTING](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Contributors

- **Joel Lefkowitz** - _Initial work_ - [Joel Lefkowitz][author]

[![Buy Me A Coffee][coffee_button]][coffee]

## Remarks

Lots of love to the open source community!

![Be kind][be_kind]

<!-- Public links -->

[semver]: http://semver.org/
[readthedocs]: https://joellefkowitz-calculator.readthedocs.io/en/latest/
[coffee]: https://www.buymeacoffee.com/joellefkowitz
[coffee_button]: https://cdn.buymeacoffee.com/buttons/default-blue.png
[be_kind]: https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif
[check_it_out]: https://media.giphy.com/media/nqtCrUwM148ZVKQtlu/giphy.gif
[screenshot]: https://github.com/JoelLefkowitz/calculator/blob/master/docs/screenshot.png

<!-- Acknowledgments -->

[author]: https://github.com/joellefkowitz

<!-- Project shields -->

[release_shield]: https://img.shields.io/github/v/tag/joellefkowitz/calculator
[license_shield]: https://img.shields.io/github/license/joellefkowitz/calculator
[lines_shield]: https://img.shields.io/tokei/lines/github/joellefkowitz/calculator
[languages_shield]: https://img.shields.io/github/languages/count/joellefkowitz/calculator

<!-- Health shields -->

[codacy_shield]: https://img.shields.io/codacy/grade/6321128f8d6d48528ab5655801c06d25
[readthedocs_shield]: https://img.shields.io/readthedocs/joellefkowitz-calculator
[github_review_shield]: https://img.shields.io/github/workflow/status/JoelLefkowitz/calculator/Review
[codacy_coverage_shield]: https://img.shields.io/codacy/coverage/6321128f8d6d48528ab5655801c06d25

<!-- Repository shields -->

[issues_shield]: https://img.shields.io/github/issues/joellefkowitz/calculator
[issues_closed_shield]: https://img.shields.io/github/issues-closed/joellefkowitz/calculator
[pulls_shield]: https://img.shields.io/github/issues-pr/joellefkowitz/calculator
[pulls_closed_shield]: https://img.shields.io/github/issues-pr-closed/joellefkowitz/calculator

<!-- Activity shields -->

[contributors_shield]: https://img.shields.io/github/contributors/joellefkowitz/calculator
[monthly_commits_shield]: https://img.shields.io/github/commit-activity/m/joellefkowitz/calculator
[last_commit_shield]: https://img.shields.io/github/last-commit/joellefkowitz/calculator
