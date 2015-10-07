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
      a11yTitleId: 'ticket-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-ticket';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "ticket");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="ticket"><rect id="_x2E_svg_69_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,21c-1.66,0-3,1.34-3,3s1.34,3,3,3v5H13v-5&#xA;&#x9;&#x9;c1.66,0,3-1.34,3-3s-1.34-3-3-3v-5h22V21z M29,20H19v8h10V20z"/></g></svg>
    );
  }

});

module.exports = Icon;