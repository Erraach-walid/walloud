/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { CSSProperties, useMemo } from "react";
import PropTypes from "prop-types";

import { base } from "../typography";
import { colors } from "../colors";
import { assertUnreachable } from "../shared/assertUnreachable";
import { IconInfoSolid } from "../icons/IconInfoSolid";
import { IconWarningSolid } from "../icons/IconWarningSolid";
import { IconErrorSolid } from "../icons/IconErrorSolid";
import { IconSuccessSolid } from "../icons/IconSuccessSolid";

interface AlertBannerProps {
  /**
   * color theme for alert
   * @default "light"
   */
  theme?: "light" | "dark";

  /**
   * The content of the banner, appears to right of icon
   */
  children?: React.ReactNode;

  /**
   * Override container around `{children}`. You can pass either an intrinisic
   * jsx element as a string (like "p") or a React element (`<p />`)
   *
   * If you pass a React element, props that we add are spread onto the input.
   *
   * @default "div"
   */
  childrenContainerAs?: React.ReactElement | keyof JSX.IntrinsicElements;

  className?: string;
  style?: CSSProperties;

  /**
   * Type of alert, this is used to determine the color and icon in the banner
   */
  type: "info" | "warn" | "error" | "success";
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  children,
  childrenContainerAs = "div",
  theme = "light",
  type,
  ...otherProps
}) => {
  const { Icon, color } = useMemo(() => {
    switch (type) {
      case "info":
        return { color: colors.blue, Icon: IconInfoSolid };
      case "warn":
        return { color: colors.orange, Icon: IconWarningSolid };
      case "error":
        return { color: colors.red, Icon: IconErrorSolid };
      case "success":
        return { color: colors.green, Icon: IconSuccessSolid };
      default:
        assertUnreachable(type);
    }
  }, [type]);
  return (
    <section
      {...otherProps}
      css={{
        ...(theme === "light"
          ? {
              backgroundColor: color.lightest,
              color: color.darker,
              borderWidth: 1,
              borderColor: type === "info" ? color.lighter : color.light,
            }
          : theme === "dark"
          ? {
              backgroundColor: color.darkest,
              color: color.lightest,
              borderWidth: 0,
              borderColor: colors.silver.dark,
            }
          : assertUnreachable(theme)),
        borderStyle: "solid",
        borderRadius: 4,
        padding: "12px 15px",
        display: "flex",
        alignItems: "center",
        ...base.small,
      }}
    >
      <Icon
        css={{
          width: 20,
          height: 20,
          color: color.base,
          marginRight: 13,
          "& .inner": theme === "dark" &&
            type !== "warn" && { fill: colors.white },
        }}
      />
      {React.isValidElement(childrenContainerAs)
        ? React.cloneElement(childrenContainerAs, {}, children)
        : React.createElement(childrenContainerAs, {}, children)}
    </section>
  );
};

AlertBanner.propTypes = {
  children: PropTypes.node,
  childrenContainerAs: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.string.isRequired as any, // Using PropTypes.string to match keyof JSX.IntrinsicElements
  ]),
  type: PropTypes.oneOf(["info", "warn", "error", "success"] as const)
    .isRequired,
};
