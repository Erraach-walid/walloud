'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _tslib = require('../_tslib-bcbe0269.js');
require('../colors/colors.js');
require('../fonts/fonts.js');
require('../base-1dde5d6e.js');
require('../mono-f4fb9dce.js');
require('@emotion/core');
var React = require('react');
var React__default = _interopDefault(React);
require('classnames');
require('../SpaceKitProvider/index.js');
require('../tippy-5e220ef0.js');
var index$1 = require('../index-50d72d48.js');
require('@tippyjs/react');
require('../index-925922df.js');
var index$3 = require('../Menu/index.js');
var index$1$1 = require('../index-ba63719f.js');
var TippyPopupMenuStyles = require('./popupMenu/TippyPopupMenuStyles.js');
require('@popperjs/core/lib/utils/computeAutoPlacement');
require('@popperjs/core/lib/utils/detectOverflow');
require('@popperjs/core/lib/utils/getOppositePlacement');
require('@popperjs/core/lib/utils/getOppositeVariationPlacement');
var sizeModifier = require('./popupMenu/sizeModifier.js');

/**
 * Component that wraps `Menu` and adds popup functionality
 *
 * All props of `Menu` are included as a convenience and not required. You can
 * choose to wrap `content` with `Menu` if you'd like because `Menu` does not
 * add anything to the DOM and `Menu` does not have any defaults, so nested
 * `Menu`s do not override values unless they are explicitly set.
 */
var PopupMenu = function (_a) {
    var children = _a.children, _b = _a.closeOnMenuItemClick, closeOnMenuItemClick = _b === void 0 ? true : _b, color = _a.color, fallbackPlacements = _a.fallbackPlacements, iconSize = _a.iconSize, content = _a.content, popperOptions = _a.popperOptions, theme = _a.theme, props = _tslib.__rest(_a, ["children", "closeOnMenuItemClick", "color", "fallbackPlacements", "iconSize", "content", "popperOptions", "theme"]);
    var instanceRef = React__default.useRef();
    var inheritedMenuItemClickListener = index$1$1.useMenuItemClickListener();
    /**
     * Callback to handle descendeant `MenuItem` clicks.
     *
     * When we have nested menus and toggle menus we might need to change how this
     * behaves.
     */
    var onMenuItemClick = React__default.useCallback(function (event) {
        var _a;
        if (inheritedMenuItemClickListener) {
            inheritedMenuItemClickListener(event);
        }
        if (closeOnMenuItemClick) {
            (_a = instanceRef.current) === null || _a === void 0 ? void 0 : _a.hide();
        }
    }, [closeOnMenuItemClick, inheritedMenuItemClickListener, instanceRef]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(TippyPopupMenuStyles.TippyPopupMenuStyles, null),
        React__default.createElement(index$1.AbstractTooltip, _tslib.__assign({ appendTo: "parent", offset: [0, 2], onCreate: function (instance) {
                instanceRef.current = instance;
            }, content: React__default.createElement(index$1$1.MenuItemClickListenerProvider, { onClick: onMenuItemClick },
                React__default.createElement(index$3.Menu, { color: color, iconSize: iconSize, theme: theme }, content)), hideOnClick: true, theme: "space-kit-menu", trigger: "mousedown", popperOptions: _tslib.__assign(_tslib.__assign({ strategy: "fixed" }, popperOptions), { modifiers: _tslib.__spreadArrays([
                    // Disable `flip` because we're using our new version
                    { name: "flip", enabled: false },
                    {
                        name: "findTippyBox",
                        phase: "read",
                        enabled: true,
                        fn: function (_a) {
                            var name = _a.name, state = _a.state;
                            var element = state.elements.popper.querySelector(".tippy-box");
                            state.modifiersData[name].boxElement = element;
                        },
                    },
                    sizeModifier.sizeModifier,
                    {
                        name: "maxSize",
                        requires: ["findTippyBox"],
                        options: { padding: 7, fallbackPlacements: fallbackPlacements },
                    },
                    {
                        name: "applyMaxSize",
                        enabled: true,
                        phase: "beforeWrite",
                        requires: ["maxSize", "findTippyBox"],
                        fn: function (_a) {
                            var state = _a.state;
                            var maxHeight = state.modifiersData.maxSize.height;
                            /**
                             * We read this element in the `findTippyBox` phase. We need to
                             * use some custom logic here to apply the style to the tippy
                             * box because usually that's not made available. We _could_
                             * apply these styles directly to the `popper` element and, but
                             * then the border will be swallowed by the overflow. If we put
                             * the border on `popper`, then the border will not be animated
                             * because animations are applied to `.tippy-box`.
                             */
                            var element = state.modifiersData.findTippyBox.boxElement;
                            if (element) {
                                element.style.maxHeight = maxHeight + "px";
                                element.style.overflow = "auto";
                            }
                        },
                    }
                ], ((popperOptions === null || popperOptions === void 0 ? void 0 : popperOptions.modifiers) || [])) }) }, props, { interactive: true }), children)));
};

exports.PopupMenu = PopupMenu;
//# sourceMappingURL=index.js.map
