import * as React from "react";
import {render} from "react-dom";
import _throttle from "lodash-es/throttle";

const updateEveryInSecond = 5;

const generateTableData = (rowCount: number) => {
  let itemsContainer = [];
  for (let i = 0; i < rowCount; i++) {
    itemsContainer.push({
      id: i,
      column1: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column2: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column3: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column4: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column5: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column6: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column7: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column8: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column9: `value ${Math.floor(Math.random() * 1000) + 0}`,
      column10: `value ${Math.floor(Math.random() * 1000) + 0}`,
    });
  }

  return itemsContainer;
};

class TableCell extends React.Component<{
  value: string;
}, {}> {
  public render() {
    return (
      <td
        style={{
          height: "40px",
        }}
        className="more than one class bro"
        title={this.props.value}
      >
        {this.props.value}
      </td>
    );
  }
}

class Hello extends React.Component<{}, {
  tableList: any[];
  count: number;
}> {
  private static initalCount = 20;

  public state = {
    count: Hello.initalCount,
    tableList: generateTableData(Hello.initalCount),
  };

  private scrollableArea: HTMLDivElement = null;

  public componentDidMount() {
    this.scrollableArea.addEventListener("scroll", this.throttledOnScroll);

    window.setInterval(() => {
      this.setState({
        tableList: generateTableData(this.state.count),
      });
    }, updateEveryInSecond * 1000);
  }

  private onScroll = () => {
    if (this.scrollableArea.scrollTop + window.innerHeight >= this.scrollableArea.scrollHeight) {
      this.setState(prevState => ({
        count: prevState.count + 20,
      }));
    }
  }

  private throttledOnScroll = _throttle(this.onScroll, 100);

  public componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      this.setState({
        tableList: generateTableData(this.state.count),
      });
    }
  }

  public render() {
    return (
      (
        <div
          id="scrollable-area"
          ref={node => this.scrollableArea = node}
          style={{
            overflowY: "scroll",
            height: "50%",
            transform : "translateZ(0)",
          }}
        >
          <h1>Test</h1>
          <table
            style={{
              width: "100%",
            }}
          >
            <tbody>
              {
                this.state.tableList.map((x, index) => (
                  <tr key={x.id} className={`tr_${index}`}>
                    <TableCell value={x.column1} />
                    <TableCell value={x.column2} />
                    <TableCell value={x.column3} />
                    <TableCell value={x.column4} />
                    <TableCell value={x.column5} />
                    <TableCell value={x.column6} />
                    <TableCell value={x.column7} />
                    <TableCell value={x.column8} />
                    <TableCell value={x.column9} />
                    <TableCell value={x.column10} />
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
    );
  }
}

render(<Hello />, document.getElementById("root"));
