import { useMemo } from "react";
// import { useTable, useFilters } from "react-table";
import TableLayout from "./TableLayout";

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const DateBetweenFcn = (rows, id, filterValues) => {
  const startdate = filterValues[0] ? new Date(filterValues[0]) : undefined;
  const enddate = filterValues[1] ? new Date(filterValues[1]) : undefined;
  if (enddate || startdate) {
    return rows.filter((r) => {
      // format data
      const cellDate = new Date(r.values[id]);

      if (enddate && startdate) {
        return cellDate >= startdate && cellDate <= enddate;
      } else if (startdate) {
        return cellDate >= startdate;
      } else {
        return cellDate <= enddate;
      }
    });
  } else {
    return rows;
  }
};

const DateRangeFilter = ({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) => {
  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <input
        min={min.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        type="date"
        value={filterValue[0] || ""}
      />
      {" to "}
      <input
        max={max.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? val.concat("T23:59:59.999Z") : undefined,
          ]);
        }}
        type="date"
        value={filterValue[1]?.slice(0, 10) || ""}
      />
    </div>
  );
};

const TableInstance = ({ donorData }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "donor.firstname",
          },
          {
            Header: "Last Name",
            accessor: "donor.lastname",
          },
          {
            Header: "Unique Identifier",
            accessor: "contribution.uniqueIdentifier",
          },
        ],
      },
      {
        Header: "Filters",
        columns: [
          {
            Header: "Ref Code",
            accessor: "contribution.refcodes.refcode",
            Filter: SelectColumnFilter,
          },
          {
            Header: "Dates",
            accessor: "lineitems[0].paidAt",
            Filter: DateRangeFilter,
            filter: DateBetweenFcn,
          },
        ],
      },
      {
        Header: "Amounts",
        columns: [
          {
            Header: "Total Amount",
            accessor: "lineitems[0].amount",
            aggregate: "sum",
            Aggregated: ({ value }) => `${value}`,
          },
        ],
      },
    ];

    return [columns, donorData];
  }, [donorData]);

  return <TableLayout columns={columns} data={data} />;
};

export default TableInstance;
