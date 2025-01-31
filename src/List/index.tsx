/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import { ListConfigProvider, useListConfig } from "../ListConfig";
import { verticalListMarginFromPadding } from "../shared/verticalListMarginFromPadding";

interface Props
  extends Omit<React.ComponentProps<typeof ListConfigProvider>, "children">,
    Pick<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "style" | "className"
    > {}

export const List = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<Props>
>(
  (
    {
      children,
      className,
      style,
      endIconAs,
      hoverColor,
      iconSize,
      padding,
      selectedColor,
      startIconAs,
      ...props
    },
    ref
  ) => {
    /**
     * Combination of inherited configuration and new configuration passed via
     * props
     */
    const listConfig: ReturnType<typeof useListConfig> = {
      ...useListConfig(),
      ...(endIconAs && { endIconAs }),
      ...(hoverColor && { hoverColor }),
      ...(iconSize && { iconSize }),
      ...(padding && { padding }),
      ...(selectedColor && { selectedColor }),
      ...(startIconAs && { startIconAs }),
    };

    const verticalMargin =
      -verticalListMarginFromPadding(listConfig.padding) / 2;

    return (
      <ListConfigProvider {...listConfig}>
        <div
          {...props}
          ref={ref}
          className={className}
          style={style}
          css={css({
            marginTop: verticalMargin,
            marginBottom: verticalMargin,
            outline: "none",
          })}
        >
          {children}
        </div>
      </ListConfigProvider>
    );
  }
);
