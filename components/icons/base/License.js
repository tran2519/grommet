// (C) Copyright 2014-2015 Hewlett-Packard Development Company

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      a11yTitleId: 'license-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-license';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "license");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="license"><rect id="_x2E_svg_99_" x="0" y="0" fill="none" width="48" height="48"/><circle fill="#231F20" cx="18" cy="17.9899" r="2"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M21.47,24.4599l0.53,0.53v3h3v3h3v2l2,2h5v-4&#xA;&#x9;&#x9;l-10.26-10.26c0.17-0.55,0.26-1.14,0.26-1.74c0-3.31-2.69-6-6-6s-6,2.69-6,6s2.69,6,6,6C19.88,24.9899,20.72,24.7999,21.47,24.4599&#xA;&#x9;&#x9;z"/></g></svg>
    );
  }

});

module.exports = Icon;
