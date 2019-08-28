import * as CSS from "csstype";

/**
 * Generic from `csstype`. I honestly have no idea what it is; I stole the value
 * used from emotion.
 */
type TLength = string | 0 | number;

/**
 * Things that we define in our typography style system.
 */
export interface TypographyDefinition {
  fontFamily: CSS.FontFamilyProperty;
  fontSize: CSS.FontSizeProperty<TLength>;
  /**
   * This is optional. We shouldn't be setting the style when we don't care what
   * is.
   */
  fontWeight?: CSS.FontWeightProperty;
  lineHeight: CSS.LineHeightProperty<TLength>;
}
