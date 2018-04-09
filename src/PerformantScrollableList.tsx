import * as React from "react";

interface IPerformantScrollableListConsumerProps {
  isVisible: boolean;
}

interface IPerformantScrollableListProviderProps {
  wrappedSelectorId: string;
  itemSelector: string;
  ChunkRowsCount: number;
  rebaseOnScrollRowCounts?: number;
  render(object: {isVisibleRow(index: number): boolean}): JSX.Element;
  getScrollableParent?(wrappedSelectorId: string): HTMLElement;
}

export class PerformantScrollableList extends React.Component {
  public static Provider = class extends React.Component<IPerformantScrollableListProviderProps, {}> {

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
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `%c PerformantScrollableList.Provider: calculated visibleRows is: ${JSON.stringify(this.visibleRows)}`,
            "color: #00aa4f",
          );
        }
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
      if (process.env.NODE_ENV !== "production") {
        const stringifyOldVisible = JSON.stringify(oldVisibleRows);
        const stringifyNewVisible = JSON.stringify(this.visibleRows);
        if (stringifyOldVisible !== stringifyNewVisible) {
          console.log(
            `%c PerformantScrollableList.Provider: NEW Calculated visibleRows is: ${JSON.stringify(this.visibleRows)}`,
            "color: #00aa4f",
          );
        }
      }
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

        if (process.env.NODE_ENV !== "production") {
          if (!this._rowHeight) {
            console.warn("PerformantScrollableList.Provider: didn't calculated yet the row height");
          } else {
            console.log(
              `%c PerformantScrollableList.Provider: successfully calculated the row height. ${this._rowHeight}`,
              "color: #00aa4f",
            );
          }
        }
      }

      return this._rowHeight;
    }

    private onScroll = () => {
      const {
        scrollTop,
      } = this.root;
      const {
        ChunkRowsCount,
        rebaseOnScrollRowCounts,
      } = this.props;

      const rebaseDeviation = this.rowHeight * (rebaseOnScrollRowCounts || ChunkRowsCount);

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

      if (!this.rowHeight) {
        return {
          ...this.SHOW_ALL_ROWS,
        };
      } else {
        const {
          wrappedSelectorId,
          itemSelector,
          ChunkRowsCount,
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

        return {
          from: from - ChunkRowsCount,
          to: to + ChunkRowsCount,
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
