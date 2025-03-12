import classNames from "classnames";
import { Table, TableProps } from "@client/comps/table/Table";
import "./DataTable.scss";

type DataSchema = {};

export function DataTable<T extends DataSchema>({
  className,
  ...forwardProps
}: TableProps<T>) {
  return (
    <Table
      className={classNames("DataTable", className)}
      onRowProps={(x) => ({
        className: "className" in x ? (x.className as string) : undefined,
        type: "action",
        hover: "none",
        onClick: () => {},
      })}
      {...forwardProps}
    />
  );
}
