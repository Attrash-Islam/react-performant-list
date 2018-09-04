import * as React from "react";

interface IPerformantScrollableListConsumerProps {
  isVisible: boolean;
}

interface IPerformantScrollableListProviderProps {
  wrappedSelectorId: string;
  itemSelector: string;
  rebaseOnScrollRowCounts?: number;
  render(object: {isVisibleRow(index: number): boolean}): JSX.Element;
  getScrollableParent?(wrappedSelectorId: string): HTMLElement;
}

export class PerformantScrollableList extends React.Component {
  public static Provider = class extends React.Component<IPerformantScrollableListProviderProps, {}> {
    private static DEFAULT_DEVIATION = 10;
    private root: HTMLElement;
    private _rowHeight: number = 0;
    private lastScrollTop = 0;
    private safeScroll: number = 0;
    private SHOW_ALL_ROWS: {
      from: number,
      to: number,
    } = {
      from: 0,
      to: Number.MAX_VALUE,
    };

    private visibleRows: {
      from: number,
      to: number,
    } = {...this.SHOW_ALL_ROWS};

    public componentDidMount() {
      setTimeout(() => {
        const {
          wrappedSelectorId,
          itemSelector,
          getScrollableParent,
        } = this.props;

        const node = document.querySelector(`#${wrappedSelectorId}`);
        let root;
        if (getScrollableParent) {
          try {
            root = getScrollableParent(wrappedSelectorId);
          } catch (e) {
            console.error(
              `PerformantScrollableList.Provider: getScrollableParent prop throw exception.
              Rollback to PerformantScrollableList.Provider built-in scrollable parent finder`,
              e,
            );
            root = PerformantScrollableList.getScrollableParent(node);
          }
        } else {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `PerformantScrollableList.Provider: Consider using getScrollableParent prop if you are using custom
              scroller that is not making the use of "overflow: scroll". e.g. slimScroll is implementing the scrollable
              area in special mode where the scrollable is "overflow: hidden" which the built-in scrollable parent
              finder will not find`,
            );
          }
          root = PerformantScrollableList.getScrollableParent(node);
        }

        if (root) {
          this.root = root;
          this.root.addEventListener("scroll", this.onScroll);
        } else {
          console.error("PerformantScrollableList.Provider: Can't find the scrollable parent");
        }

        this.visibleRows = this.getVisibleRowsIndexes();
      }, 0);
    }

    public render() {
      const {
        wrappedSelectorId,
      } = this.props;

      return this.props.render({
        isVisibleRow: (index: number) => {
          if (index >= this.visibleRows.from && index <= this.visibleRows.to) {
            return true;
          } else {
            return false;
          }
        },
      });
    }

    public componentWillUnmount() {
      if (this.root) {
        this.root.removeEventListener("scroll", this.onScroll);
      }
    }

    public componentDidUpdate() {
      const oldVisibleRows = {...this.visibleRows};
      this.visibleRows = this.getVisibleRowsIndexes();
    }

    private get visibleRowsWithoutDeviation() {
      return {
        from: this.visibleRows.from + PerformantScrollableList.Provider.DEFAULT_DEVIATION,
        to: this.visibleRows.to - PerformantScrollableList.Provider.DEFAULT_DEVIATION,
      };
    }

    private get rowHeight() {
      if (!this._rowHeight) {
        const {
          wrappedSelectorId,
          itemSelector,
        } = this.props;
        const firstRow = document.querySelector(`#${wrappedSelectorId} ${itemSelector}`);
        if (firstRow) {
          this._rowHeight = firstRow.clientHeight;
        }
      }

      return this._rowHeight;
    }

    private onScroll = () => {
      const {
        scrollTop,
      } = this.root;

      const {
        rebaseOnScrollRowCounts,
      } = this.props;

      const {
        from,
        to,
      } = this.visibleRowsWithoutDeviation;

      const visibleRowCount = to - from;

      if (process.env.NODE_ENV !== "production") {
        if (visibleRowCount < 0) {
          console.error(
            `PerformantScrollableList.Provider: visibleRowsWithoutDeviation exception.
            Got: ${visibleRowCount}, where it should be >= 0`,
          );
        }
      }

      const rebaseDeviation = this.rowHeight * (rebaseOnScrollRowCounts || visibleRowCount);

      if (
        Math.abs(scrollTop - this.lastScrollTop) > rebaseDeviation
      ) {
        this.lastScrollTop = scrollTop;
        this.forceUpdate();
      }
    }

    private getVisibleRowsIndexes = (): {
      from: number;
      to: number;
    } => {

      if (!this.rowHeight || !this.root) {
        return {
          ...this.SHOW_ALL_ROWS,
        };
      } else {
        const {
          wrappedSelectorId,
          itemSelector,
        } = this.props;
        const rows = document.querySelectorAll(`#${wrappedSelectorId} ${itemSelector}`);
        let from = null;
        let to = null;
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          let position = row.getBoundingClientRect().top + this.rowHeight;
          if (position >= 0 && position <= this.root.clientHeight) {
            if (from === null) {
              from = i;
            }
          } else if (from !== null) {
            to = i - 1;
          }

          if ([from, to].filter(x => x !== null).length === 2) {
            break;
          }
        }

        const {
          DEFAULT_DEVIATION,
        } = PerformantScrollableList.Provider;

        // All rows are visible
        if (to === null) {
          to = rows.length;
        }

        return {
          from: from - DEFAULT_DEVIATION,
          to: to + DEFAULT_DEVIATION,
        };
      }
    }
  };

  public static Consumer = class extends React.Component<IPerformantScrollableListConsumerProps, {}> {

    public shouldComponentUpdate(nextProps: IPerformantScrollableListConsumerProps) {
      return nextProps.isVisible;
    }

    public render() {
      return this.props.children;
    }

  };

  public static getScrollableParent(node): HTMLElement | null {
    const isElement = node instanceof HTMLElement;
    const overflowY = isElement && window.getComputedStyle(node).overflowY;
    const isScrollable = overflowY !== "visible" && overflowY !== "hidden";

    if (!node) {
      return null;
    } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
      return node;
    }

    return PerformantScrollableList.getScrollableParent(node.parentNode) || document.body;
  }

}

export default PerformantScrollableList;
