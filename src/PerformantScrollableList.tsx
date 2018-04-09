import * as React from "react";

const consoleInfo = (msg: string) => {
  console.log(
    `%c ${msg}`,
    "color: #0079f4",
  );
};

const statistics = {
  rendered: 0,
  saved: 0,
};

interface IPerformantScrollableListConsumerProps {
  $index: number;
  isVisible: boolean;
}

interface IPerformantScrollableListProviderProps {
  wrappedSelectorId: string;
  itemSelector: string;
  ChunkRowsCount: number;
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
        const root = getScrollableParent ?
          getScrollableParent(wrappedSelectorId) : PerformantScrollableList.getScrollableParent(node);
        if (root) {
          this.root = root;
          this.root.addEventListener("scroll", this.onScroll);
        } else {
          console.error("Can't find the scrollable parent");
        }

        this.visibleRows = this.getVisibleRowsIndexes();
        consoleInfo(`Calculated visibleRows is: ${JSON.stringify(this.visibleRows)}`);
      }, 0);
    }

    public render() {
      const {
        wrappedSelectorId,
      } = this.props;

      return this.props.render({
        isVisibleRow: (index: number) => {
          if (index >= this.visibleRows.from && index <= this.visibleRows.to) {
            statistics.rendered++;

            return true;
          } else {
            statistics.saved++;

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
      this.visibleRows = this.getVisibleRowsIndexes();
      consoleInfo(`NEW Calculated visibleRows is: ${JSON.stringify(this.visibleRows)}`);

      consoleInfo(`Rendered: ${statistics.rendered}`);
      consoleInfo(`Skipped Rendering: ${statistics.saved}`);

      statistics.rendered = 0;
      statistics.saved = 0;
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
          consoleInfo(`Calculated rowHeight is: ${this.rowHeight}`);
        }
      }

      return this._rowHeight;
    }

    private onScroll = () => {
      const {
        scrollTop,
      } = this.root;

      if (
        Math.abs(scrollTop - this.lastScrollTop) > this.rowHeight * (this.props.ChunkRowsCount / 2)
      ) {
        this.lastScrollTop = scrollTop;
        consoleInfo(`FORCE RENDERING`);
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
    const isScrollable = overflowY !== "visible";

    if (!node) {
      return null;
    } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
      return node;
    }

    return PerformantScrollableList.getScrollableParent(node.parentNode) || document.body;
  }

}
