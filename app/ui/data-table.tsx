import { type ReactNode } from "react";

import EmptyState from "./empty-state";
import ErrorMessage from "./error-message";
import LoadingState from "./loading-state";

type Align = "left" | "center" | "right";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  align?: Align;
  width?: string;
  className?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  error?: string | null;
  loadingLabel?: string;
  loadingAction?: ReactNode;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  emptyAction?: ReactNode;
  selectedRowKey?: string | null;
  onRowClick?: (row: T) => void;
  minWidth?: number;
  caption?: string;
  className?: string;
  errorDetails?: ReactNode;
};

const ALIGN_CLASS: Record<Align, string> = {
  left: "ui-data-table__cell--left",
  center: "ui-data-table__cell--center",
  right: "ui-data-table__cell--right",
};

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  error = null,
  loadingLabel = "Chargement des donnees...",
  loadingAction,
  emptyTitle = "Aucune donnee",
  emptyMessage = "Aucun element n'est disponible pour cette vue.",
  emptyIcon,
  emptyAction,
  selectedRowKey = null,
  onRowClick,
  minWidth = 720,
  caption,
  className,
  errorDetails,
}: DataTableProps<T>) {
  const classes = ["ui-data-table", className].filter(Boolean).join(" ");

  if (loading) {
    return (
      <section className={classes}>
        <LoadingState
          className="ui-data-table__state ui-data-table__state--loading"
          title="Chargement de la table"
          message={loadingLabel}
          action={loadingAction}
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes}>
        <ErrorMessage
          className="ui-data-table__error"
          title="Impossible de charger la table"
          message={error}
          details={errorDetails}
        />
      </section>
    );
  }

  if (rows.length === 0) {
    return (
      <section className={classes}>
        <EmptyState title={emptyTitle} message={emptyMessage} icon={emptyIcon} action={emptyAction} />
      </section>
    );
  }

  return (
    <section className={classes}>
      <div className="ui-data-table__container">
        <table className="ui-data-table__table" style={{ minWidth }}>
          {caption ? <caption className="ui-data-table__caption">{caption}</caption> : null}
          <thead>
            <tr className="ui-data-table__header-row">
              {columns.map((column) => {
                const alignment = ALIGN_CLASS[column.align ?? "left"];
                const cellClasses = ["ui-data-table__head-cell", alignment, column.className].filter(Boolean).join(" ");

                return (
                  <th key={column.key} className={cellClasses} style={column.width ? { width: column.width } : undefined}>
                    {column.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const key = rowKey(row);
              const isSelected = selectedRowKey !== null && selectedRowKey === key;
              const isClickable = typeof onRowClick === "function";
              const rowClasses = [
                "ui-data-table__row",
                isSelected ? "is-selected" : "",
                isClickable ? "is-clickable" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr key={key} className={rowClasses} onClick={isClickable ? () => onRowClick(row) : undefined}>
                  {columns.map((column) => {
                    const alignment = ALIGN_CLASS[column.align ?? "left"];
                    const cellClasses = ["ui-data-table__cell", alignment, column.className].filter(Boolean).join(" ");
                    return (
                      <td key={`${key}-${column.key}`} className={cellClasses}>
                        {column.render(row)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
