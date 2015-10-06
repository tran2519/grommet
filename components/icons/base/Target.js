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
      a11yTitleId: 'target-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-target';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "target");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="target"><rect id="_x2E_svg_137_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,24c0,6.0751-4.9249,11-11,11s-11-4.9249-11-11&#xA;&#x9;&#x9;s4.9249-11,11-11S35,17.9249,35,24z M30,24c0-3.3086-2.6914-6-6-6s-6,2.6914-6,6s2.6914,6,6,6S30,27.3086,30,24z M25,24&#xA;&#x9;&#x9;c0-0.5518-0.4482-1-1-1s-1,0.4482-1,1s0.4482,1,1,1S25,24.5518,25,24z"/></g></svg>
    );
  }

});

module.exports = Icon;
