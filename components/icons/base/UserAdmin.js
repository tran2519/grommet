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
      a11yTitleId: 'user-admin-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-user-admin';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "user-admin");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="user-admin"><rect id="_x2E_svg_132_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M25.9991,18c0,2.7614-2.2386,5-5,5s-5-2.2386-5-5&#xA;&#x9;&#x9;s2.2386-5,5-5S25.9991,15.2386,25.9991,18z M23.9991,32.5c0,1.3807,1.1193,2.5,2.5,2.5s2.5-1.1193,2.5-2.5&#xA;&#x9;&#x9;c0-1.3807-1.1193-2.5-2.5-2.5S23.9991,31.1193,23.9991,32.5z M36.9991,28l-3-3l-5.5312,5.5312 M31.4991,27.5l3,3 M20.9991,23&#xA;&#x9;&#x9;L20.9991,23c-4.4183,0-8,3.5817-8,8v4h8 M27.0009,25.7104C25.535,24.0484,23.3895,23,20.9991,23h0"/></g></svg>
    );
  }

});

module.exports = Icon;
