# react-performant-scrollable-list

This plugin is implementing a "windowing" technique on list items (rows) based on very thin layer that can be added easily to any project.

# Story
In the past 2 years I worked a lot with infinite-scroll lists, some of them rendered as `<li>` tags below `<ul>`, and the others were rendered as table with `<tr>`s and `<td>`s.

I was mostly dealing with the rendered tables. Those tables were having something in common, they were fetching the data in 5-10 seconds, they have some special styles or classNames, in addition they've IDs for each Cell `<td>` with row index for the automation team to have access and interact with the elements using Selenium. All these requirements for every Table Cell in the system forced me to think about a way of implementing some abstract React Component that force me and the future newcomers to implement the must-have things, such as: IDs and other data associated with the rendered DOM element, without forgetting this again and again.

So I implemented each Table Cell as a React Component (with abstract class! - Functional Programmers, please don't start ;)).. After a while I felt that the scroller is heavier and the page lag too much, so I inspected the Performance using Chrome Devtools and saw many shouldComponentUpdate executions! [I was strict to implement it for each Table Cell].

Seems like having that much of components into the React reconciliation is making the process slow. So instead of running ShouldComponentUpdate 7 times for 7 Table Cells per row (some table may reach more than 400 row), I thought of wrapping the whole row with one ShouldComponentUpdate that will return true or false based on row visibility which already known as "Windowing". There's so many popular libraries but I thought of simplicity by implementing this with just two components using Render Props.

- That gave me to throw all the special implementation of ShouldComponentUpdate per table cell and to save the time of ammending the functions when adding more props to a specific Cell!

- Reduced the processing time fair enough and raised the performance

# Install
```js
npm i -S react-performant-scrollable-list 
```

# Usage
```js
// You can use default import, I prefered the named one
import { PerformantScrollableList } from "react-performant-scrollable-list";

....

  public render() {
    return (
      (
        <div
          id="scrollable-area"
          ref={node => this.scrollableArea = node}
          style={{
            overflowY: "scroll",
            height: "50%",
          }}
        >
          <h1 style={{ marginTop: "120px"}}>Test</h1>
          <PerformantScrollableList.Provider
            wrappedSelectorId="myTable"
            itemSelector="tr"
            render={({isVisibleRow}) => (
              <table
                id="myTable"
                style={{
                  width: "100%",
                }}
              >
                <tbody>
                  {
                    this.state.tableList.map((x, index) => (
                      <PerformantScrollableList.Consumer
                        key={x.id}
                        isVisible={isVisibleRow(index)}
                      >
                      <tr className={`tr_${index}`}>
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
                      </PerformantScrollableList.Consumer>
                    ))
                  }
                </tbody>
              </table>
            )}
          />
        </div>
      )
    );
  }
  
```
See Examples folder.

# API Interfaces

```ts
interface IPerformantScrollableListConsumerProps {
  // This prop is passed to each Table Cell based on Provider.isVisibleRow render-prop output
  isVisible: boolean;
}

interface IPerformantScrollableListProviderProps {
  // The wrapped selector ID below the Provider
  wrappedSelectorId: string;
  // The item row selector (e.g. tr, li, .my-row-class, etc.)
  itemSelector: string;
  // Rebase on scroll row counts - When freezing the values user may watch older values that not make since (e.g. sorting)
  // while scrolling up for the already rendered values, so once he pass a speicfic count of rows the Proiver will
  // forceUpdate the values to fetch the last correct value kept in the inner state
  rebaseOnScrollRowCounts?: number;
  // a render-prop to inject the Consumers below that provider, which isVisibleRow(index) will be given to 
  // each consumer to decide whether it's visible or not in the scrollable area
  render(object: {isVisibleRow(index: number): boolean}): JSX.Element;
  // getScrollableParent is implemented by default, but for those who is using some special scroller they may have
  // some issue depending on the built-in implementation. e.g. I use slim-scroll in various projects and it's 
  // scrollable area is not overflowed as "scroll"! but it's implemented in another way that the scrollable area
  // will be overflowed as "hidden", so this prop can give the user to implement that in some cases where needed
  getScrollableParent?(wrappedSelectorId: string): HTMLElement;
}
```

# Limitations 
Only works on rows with the same height (static not dynamic) so if your rows height is not equal consider using another "windowing" library.
