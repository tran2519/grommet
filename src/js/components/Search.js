// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import Responsive from '../utils/Responsive';
import Button from './Button';
import SearchIcon from './icons/base/Search';

const CLASS_ROOT = "search";

export default class Search extends Component {

  constructor(props) {
    super(props);

    this._onAddDrop = this._onAddDrop.bind(this);
    this._onRemoveDrop = this._onRemoveDrop.bind(this);
    this._onFocusControl = this._onFocusControl.bind(this);
    this._onBlurControl = this._onBlurControl.bind(this);
    this._onFocusInput = this._onFocusInput.bind(this);
    this._onBlurInput = this._onBlurInput.bind(this);
    this._onChangeInput = this._onChangeInput.bind(this);
    this._onNextSuggestion = this._onNextSuggestion.bind(this);
    this._onPreviousSuggestion = this._onPreviousSuggestion.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onClickSuggestion = this._onClickSuggestion.bind(this);
    this._onSink = this._onSink.bind(this);
    this._onResponsive = this._onResponsive.bind(this);

    this.state = {
      align: 'left',
      controlFocused: false,
      inline: props.inline,
      dropActive: false,
      activeSuggestionIndex: -1
    };
  }

  componentDidMount () {
    if (this.props.inline && this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.suggestions && nextProps.suggestions.length > 0 &&
      ! this.state.dropActive && this.refs.input === document.activeElement) {
      this.setState({dropActive: true});
    } else if ((! nextProps.suggestions || nextProps.suggestions.length === 0) &&
      this.state.inline) {
      this.setState({dropActive: false});
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.

    let activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };
    let focusedKeyboardHandlers = {
      space: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.controlFocused && prevState.controlFocused) {
      KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (! this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      // Slow down adding the click handler,
      // otherwise the drop will close when the mouse is released.
      // Not observable in Safari, 1ms is sufficient for Chrome, Firefox needs 100ms though. :(
      // TODO: re-evaluate how to solve this without a timeout.
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);

      let baseElement;
      if (this.refs.control) {
        baseElement = this.refs.control.firstChild;
      } else {
        baseElement = this.refs.input;
      }
      let dropAlign = this.props.dropAlign || {
        top: (this.state.inline ? 'bottom' : 'top'),
        left: 'left'
      };
      this._drop = Drop.add(baseElement, this._renderDrop(),
        { align: dropAlign });

      if (! this.state.inline) {
        document.getElementById('search-drop-input').focus();
      }
    } else if (this._drop) {
      this._drop.render(this._renderDrop());
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    KeyboardAccelerators.stopListeningToKeyboard(this);
    if (this._responsive) {
      this._responsive.stop();
    }
    if (this._drop) {
      this._drop.remove();
    }
  }

  _onAddDrop (event) {
    event.preventDefault();
    this.setState({dropActive: true, activeSuggestionIndex: -1});
  }

  _onRemoveDrop () {
    this.setState({dropActive: false});
  }

  _onFocusControl () {
    this.setState({
      controlFocused: true,
      dropActive: true,
      activeSuggestionIndex: -1
    });
  }

  _onBlurControl () {
    this.setState({controlFocused: false});
  }

  _onFocusInput () {
    this.refs.input.select();
    this.setState({
      dropActive: (! this.state.inline ||
        (this.props.suggestions && this.props.suggestions.length > 0)),
      activeSuggestionIndex: -1
    });
  }

  _onBlurInput () {
    //this.setState({drop: false});
  }


  _fireDOMChange () {
    let event;
    try {
      event = new Event('change', {
        'bubbles': true,
        'cancelable': true
      });
    } catch (e) {
      // IE11 workaround.
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    }
    let controlInput = document.getElementById('search-drop-input');
    let target = this.refs.input || controlInput;
    target.dispatchEvent(event);
    this.props.onDOMChange(event);
  }

  _onChangeInput (event) {
    this.setState({activeSuggestionIndex: -1});
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
    if (this.props.onDOMChange) {
      this._fireDOMChange();
    }
  }

  _onNextSuggestion () {
    let index = this.state.activeSuggestionIndex;
    index = Math.min(index + 1, this.props.suggestions.length - 1);
    this.setState({activeSuggestionIndex: index});
  }

  _onPreviousSuggestion () {
    let index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeSuggestionIndex: index});
  }

  _onEnter (event) {
    event.preventDefault(); // prevent submitting forms
    this._onRemoveDrop();
    let suggestion;
    if (this.state.activeSuggestionIndex >= 0) {
      suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      this.setState({value: suggestion});
      if (this.props.onChange) {
        this.props.onChange(suggestion);
      }
      if (this.props.onSelect) {
        this.props.onSelect({
          target: this.refs.input || this.refs.control,
          suggestion: suggestion
        }, true);
      }
    } else {
      if (this.props.onSelect) {
        this.props.onSelect({
          target: this.refs.input || this.refs.control,
          suggestion: suggestion
        }, false);
      }
    }
  }

  _onClickSuggestion (suggestion) {
    this._onRemoveDrop();

    if (this.props.onChange) {
      this.props.onChange(suggestion);
    }
    if (this.props.onSelect) {
      this.props.onSelect({
        target: this.refs.input || this.refs.control,
        suggestion: suggestion
      }, true);
    }
  }

  _onSink (event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  _onResponsive (small) {
    if (small) {
      this.setState({inline: false});
    } else {
      this.setState({inline: this.props.inline});
    }
  }

  focus () {
    let ref = this.refs.input || this.refs.control;
    if (ref) {
      ref.focus();
    }
  }

  _renderLabel (suggestion) {
    if (typeof suggestion === 'object') {
      return suggestion.label || suggestion.value;
    } else {
      return suggestion;
    }
  }

  _renderDrop () {
    let classes = classnames (
      {
        [`background-color-index-${this.props.dropColorIndex}`]: this.props.dropColorIndex,
        [`${CLASS_ROOT}__drop`]: true,
        [`${CLASS_ROOT}__drop--controlled`]: !(this.state.inline),
        [`${CLASS_ROOT}__drop--large`]: this.props.large
      }
    );

    let input;
    if (! this.state.inline) {
      input = (
        <input key="input" id="search-drop-input" type="search"
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          className={`${CLASS_ROOT}__input`}
          onChange={this._onChangeInput} />
      );
    }

    let suggestions;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        let classes = classnames(
          {
            [`${CLASS_ROOT}__suggestion`]: true,
            [`${CLASS_ROOT}__suggestion--active`]: index === this.state.activeSuggestionIndex
          }
        );

        return (
          <div key={index}
            className={classes}
            onClick={this._onClickSuggestion.bind(this, suggestion)}>
            {this._renderLabel(suggestion)}
          </div>
        );
      }, this);
      suggestions = (
        <div key="suggestions" className={`${CLASS_ROOT}__suggestions`}>
          {suggestions}
        </div>
      );
    }

    let contents = [input, suggestions];

    if (! this.state.inline) {
      contents = [
        <Button key="icon" icon={<SearchIcon />}
          className={`${CLASS_ROOT}__drop-control`}
          onClick={this._onRemoveDrop} />,
        <div key="contents" className={`${CLASS_ROOT}__drop-contents`}
          onClick={this._onSink}>
          {contents}
        </div>
      ];
      if (this.props.dropAlign && ! this.props.dropAlign.left) {
        contents.reverse();
      }
    }

    return (
      <div id="search-drop" className={classes}>
        {contents}
      </div>
    );
  }

  render () {
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--controlled`]: !(this.state.inline),
        [`${CLASS_ROOT}--fill`]: this.props.fill,
        [`${CLASS_ROOT}--icon-align-${this.props.iconAlign}`]: this.props.iconAlign,
        [`${CLASS_ROOT}--inline`]: this.state.inline,
        [`${CLASS_ROOT}--large`]: this.props.large && ! this.props.size,
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size
      },
      this.props.className
    );

    if (this.state.inline) {
      return (
        <div className={classes}>
          <input ref="input" type="search"
            id={this.props.id}
            placeholder={this.props.placeHolder}
            defaultValue={this._renderLabel(this.props.defaultValue)}
            value={this._renderLabel(this.props.value)}
            className={`${CLASS_ROOT}__input`}
            onFocus={this._onFocusInput}
            onBlur={this._onBlurInput}
            onChange={this._onChangeInput} />
          <SearchIcon />
        </div>
      );

    } else {
      return (
        <div ref="control">
          <Button id={this.props.id}
            className={classes}
            icon={<SearchIcon />}
            tabIndex="0"
            onClick={this._onAddDrop}
            onFocus={this._onFocusControl}
            onBlur={this._onBlurControl} />
        </div>
      );
    }
  }
}

Search.propTypes = {
  defaultValue: PropTypes.string,
  dropAlign: Drop.alignPropType,
  dropColorIndex: PropTypes.string,
  fill: PropTypes.bool,
  iconAlign: React.PropTypes.oneOf(['start', 'end']),
  id: React.PropTypes.string,
  inline: PropTypes.bool,
  large: PropTypes.bool,
  onChange: PropTypes.func,
  onDOMChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeHolder: PropTypes.string,
  responsive: PropTypes.bool,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  suggestions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.any
      }),
      PropTypes.string
    ])
  ),
  value: PropTypes.string
};

Search.defaultProps = {
  align: 'left',
  iconAlign: 'end',
  inline: false,
  responsive: true
};
