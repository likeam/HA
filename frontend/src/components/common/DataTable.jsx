import React from "react";

const DataTable = ({ columns, data, renderRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="bg-gray-100 border px-4 py-2 text-left"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => renderRow(item))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="border px-4 py-6 text-center text-gray-500"
              >
                کوئی ڈیٹا دستیاب نہیں ہے
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
