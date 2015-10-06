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
      a11yTitleId: 'radial-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-radial';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "radial");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="radial"><rect id="_x2E_svg_36_" x="0" y="0" fill="none" width="48" height="48"/><circle fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" cx="24" cy="24" r="11"/></g></svg>
    );
  }

});

module.exports = Icon;
