export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // overwrite-*.css keep the same rule order as Bootstrap so that each color can be compared with Bootstrap itself.
    'no-descending-specificity': null,
    // ":not(a):not(b)" keeps the same specificity as Bootstrap, but ":not(a, b)" does not.
    'selector-not-notation': 'simple',
    // Range syntax such as "(width < 576px)" is ignored by Safari before 16.4.
    'media-feature-range-notation': 'prefix',
  },
};
