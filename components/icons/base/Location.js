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
      a11yTitleId: 'location-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-location';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "location");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="location"><rect id="_x2E_svg_73_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M32.3754,21c0,7.0833-8,14-8,14s-8-6.9167-8-14&#xA;&#x9;&#x9;c0-4.4183,3.5817-8,8-8S32.3754,16.5817,32.3754,21z M24.3754,24c1.6569,0,3-1.3431,3-3s-1.3431-3-3-3c-1.6569,0-3,1.3431-3,3&#xA;&#x9;&#x9;S22.7185,24,24.3754,24z"/></g></svg>
    );
  }

});

module.exports = Icon;
