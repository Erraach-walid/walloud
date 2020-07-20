import React from "react";
import { colors } from "../colors";
import { PerformUserInteraction } from "../shared/PerformUserInteraction";
import { getByTestId, waitForElement } from "@testing-library/dom";

/**
 * Component wrapping a Tooltip to debug it's positioning issues. This should be
 * stripped out when we figure out why we keep having off-by-one pixel issues.
 */
export const DebugTooltip: React.FC = ({ children }) => {
  return (
    <PerformUserInteraction
      callback={async () => {
        await waitForElement(() =>
          document.querySelector("*[data-tippy-root]")
        );
        const tippyRoot = document.querySelector<HTMLDivElement>(
          "*[data-tippy-root]"
        );
        if (!tippyRoot) throw new TypeError("could not find tippy root");

        getByTestId(document.body, "debug-styles-box").appendChild(
          document.createTextNode(tippyRoot.style.transform)
        );
      }}
    >
      <div style={{ width: 300, height: 200, position: "relative" }}>
        {children}

        <pre
          style={{
            border: `1px solid ${colors.silver.light}`,
            bottom: 5,
            fontSize: 10,
            left: 5,
            padding: 5,
            position: "absolute",
            right: 5,
          }}
          className="chromatic-ignore"
          data-testid="debug-styles-box"
        />
      </div>
    </PerformUserInteraction>
  );
};
