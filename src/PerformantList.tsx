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

interface IPerformantTableRowPropsConsumer {
  $index: number;
  isVisible($index): boolean;
}

interface IPerformantTableRowPropsProvider {
  wrappedSelectorId: string;
  itemSelector: string;
  ChunkRowsCount: number;
  render(object: {isVisibleRow(index: number): boolean}): JSX.Element;
}

export class PerformantTableRow extends React.Component {
  public static Provider = class extends React.Component<IPerformantTableRowPropsProvider, {}> {

    private root: HTMLElement;
    private rowHeight: number = 0;
    private lastScrollTop = 0;
    private visibleRows: {
      from: number,
      to: number,
    } = {
      from: 0,
      to: Number.MAX_VALUE,
    };

    public componentDidMount() {
      setTimeout(() => {
        const {
          wrappedSelectorId,
          itemSelector,
        } = this.props;

        const node = document.querySelector(`#${wrappedSelectorId}`);
        const root = PerformantTableRow.getScrollableParent(node);
        if (root) {
          this.root = root;
          this.root.addEventListener("scroll", this.onScroll);
        }

        if (!this.rowHeight) {
          const firstRow = document.querySelector(`#${wrappedSelectorId} ${itemSelector}`);
          if (firstRow) {
            this.rowHeight = firstRow.clientHeight;
            consoleInfo(`Calculated rowHeight is: ${this.rowHeight}`);
          } else {
            console.error(`Can't find #${wrappedSelectorId} ${itemSelector}`);
          }
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
      consoleInfo(`Rendered: ${statistics.rendered}`);
      consoleInfo(`Skipped Rendering: ${statistics.saved}`);

      statistics.rendered = 0;
      statistics.saved = 0;
    }

    private onScroll = () => {
      const {
        scrollTop,
      } = this.root;

      const {
        wrappedSelectorId,
      } = this.props;

      if (
        Math.abs(scrollTop - this.lastScrollTop) > this.rowHeight * this.props.ChunkRowsCount
      ) {
        this.lastScrollTop = scrollTop;
        this.visibleRows = this.getVisibleRowsIndexes();
        consoleInfo(`NEW Calculated visibleRows is: ${JSON.stringify(this.visibleRows)}`);
        consoleInfo(`FORCE RENDERING`);
        this.forceUpdate();
      }
    }

    private getVisibleRowsIndexes = (): {
      from: number;
      to: number;
    } => {

      const {
        scrollTop,
      } = this.root;

      const {
        ChunkRowsCount,
      } = this.props;

      const firstElementPosition = parseInt(
        `${scrollTop / this.rowHeight}`,
        10,
      );

      return {
        from: firstElementPosition - ChunkRowsCount,
        to: firstElementPosition + ChunkRowsCount * 2,
      };
    }
  };

  public static Consumer = class extends React.Component<IPerformantTableRowPropsConsumer, {}> {

    public shouldComponentUpdate(nextProps: IPerformantTableRowPropsConsumer) {
      return nextProps.isVisible(nextProps.$index);
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

    return PerformantTableRow.getScrollableParent(node.parentNode) || document.body;
  }

}
