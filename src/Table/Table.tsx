import { ClassNames } from "@emotion/core";
import React from "react";
import * as typography from "../typography";
import { colors } from "../colors";

interface Props<RowShape> {
  /**
   * Component data
   *
   * The shape of the data will be inferred from here
   */
  data: ReadonlyArray<RowShape>;

  /**
   * How dense the table should be
   *
   * @default "standard"
   */
  density?: "standard" | "condensed" | "relaxed";

  /**
   * Definition of how each column will be rendered
   */
  columns: readonly {
    /**
     * Column's title
     */
    headerTitle?: React.ReactNode | string;

    /**
     * Unique identifier for the column
     *
     * Initially, we'll just be using this for the `key` attribute on cells and
     * `col`s
     */
    id: string | number;
    /**
     * Properties to be applied to `col` elements nested below the `table`'s
     * single `<colgroup>`.
     *
     * This allows you to apply styles to columns by setting a class on a single
     * element instead of _all_ elements in a table's row.
     *
     * Note that, per the [column
     * spec](https://www.w3.org/TR/CSS2/tables.html#columns), there is a very
     * limited set of style properties that can be applied to a column (via
     * `style` or `className`):
     * * `background`
     * * `border`
     * * `visiblity`
     * * `width`
     */
    colProps?: React.DetailedHTMLProps<
      React.ColHTMLAttributes<HTMLTableColElement>,
      HTMLTableColElement
    >;

    /**
     * Render function that renders the content for the column to be placed
     * inside the `<td>`
     *
     * Since this is a render function, `React.createElement` will _not_ be
     * called, nor will propTypes be checked. This is to prevent mounting and
     * unmounting on each render
     *
     * Note: the signature of the method is the same as a `map` function
     */
    render: (
      input: Readonly<RowShape>,
      index: number,
      list: readonly RowShape[]
    ) => React.ReactNode;
  }[];

  /**
   * String or method to calculate the `key` for each row
   *
   * When re-ordering rows (by sorting or any other means), this will ensure
   * that DOM elements are reused correctly.
   *
   * Can be a string representing a field in `RowData` (inferred from `data` or
   * included as a generic to `<Table<RowData>>`) or a function that takes the
   * row data and returns a key
   */
  keyOn: keyof RowShape | ((row: RowShape) => any);
}

/**
 * Tables provide a structure to data and a visual grid making it easier to see
 * relationships and are one of the most useful tools and formats for organizing
 * and communiting structured data.
 *
 * @see https://zpl.io/bAlrjJe
 */
export function Table<RowShape>({
  data,
  density = "standard",
  columns,
  keyOn,
}: Props<RowShape>): ReturnType<React.FC> {
  const padding = density === "standard" ? 8 : density === "condensed" ? 3 : 11;
  const getRowKey =
    typeof keyOn === "function" ? keyOn : (row: RowShape) => row[keyOn];

  return (
    <ClassNames>
      {({ css }) => (
        <table
          className={css({
            borderCollapse: "collapse",
            width: "100%",
          })}
        >
          <colgroup>
            {columns.map(({ colProps, id }) => (
              <col key={id} {...colProps} />
            ))}
          </colgroup>

          <thead>
            <tr
              className={css({
                borderBottom: `1px solid ${colors.silver.dark}`,
              })}
            >
              {columns.map(({ headerTitle, id }, colIndex) => (
                <th
                  key={id}
                  className={css({
                    ...typography.base.xsmall,
                    textTransform: "uppercase",
                    color: colors.grey.darker,
                    fontWeight: 600,
                    textAlign: "left",
                    padding,
                    paddingLeft: colIndex === 0 ? 0 : padding,
                    paddingRight: colIndex === columns.length - 1 ? 0 : padding,
                  })}
                >
                  {headerTitle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={getRowKey(item)}>
                {columns.map(({ render, id }, colIndex) => (
                  <td
                    key={id}
                    className={css({
                      // no border on the bottom row
                      borderBottom:
                        index === data.length - 1
                          ? `none`
                          : `1px solid ${colors.silver.dark}`,
                      padding,
                      paddingLeft: colIndex === 0 ? 0 : padding,
                      paddingRight:
                        colIndex === columns.length - 1 ? 0 : padding,
                    })}
                  >
                    {render(item, index, data)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ClassNames>
  );
}
