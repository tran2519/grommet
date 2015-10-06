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
      a11yTitleId: 'platform-edge-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-platform-edge';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "platform-edge");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="platform-edge"><rect id="_x2E_svg_297_" x="0" y="0" fill="none" width="48" height="48"/><path id="Microsoft-Edge-logo" d="M17.41,18.8032c-2.8552,1.7773-4.487,4.3029-4.487,4.3029&#xA;&#x9;&#x9;s0.4229-5.2958,4.487-8.3946c1.6164-1.2324,3.8262-2.265,6.7984-2.265c1.1166,0,3.4581,0.1943,5.5671,1.4946&#xA;&#x9;&#x9;s2.9612,2.3895,3.9114,3.9842c0.41,0.6881,0.7439,1.5721,0.9523,2.4248c0.3903,1.5977,0.4378,3.5084,0.4378,3.5084v2.517H20.0038&#xA;&#x9;&#x9;c0,0-0.3681,5.0642,6.5639,5.0642c2.4109,0,3.2551-0.3787,4.048-0.6136c1.2413-0.3676,2.44-1.187,2.44-1.187l0.0023,5.0597&#xA;&#x9;&#x9;c0,0-2.837,1.7475-7.123,1.7475c-1.207,0-2.4789-0.1012-3.7056-0.4992c-1.0719-0.3478-3.3168-1.2858-4.8193-3.4844&#xA;&#x9;&#x9;c-0.5315-0.7777-1.1074-1.8126-1.3927-2.8236c-0.3084-1.0931-0.3046-2.155-0.3046-2.74c0-2.1881,0.7475-4.2771,2.0447-5.7874&#xA;&#x9;&#x9;c1.6803-1.9562,3.804-2.8174,3.804-2.8174s-0.6918,0.8065-1.1173,1.8106c-0.4255,1.0041-0.5419,2.0143-0.5419,2.0143h8.5112&#xA;&#x9;&#x9;c0,0,0.4978-5.0859-4.816-5.0859C21.5953,17.0337,19.1362,17.7286,17.41,18.8032z"/></g></svg>
    );
  }

});

module.exports = Icon;
