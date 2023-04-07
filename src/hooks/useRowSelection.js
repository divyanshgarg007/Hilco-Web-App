import { createContext, useContext } from 'react';
// import type { SelectRowEvent } from '../types';

const RowSelectionContext = createContext;

export const RowSelectionProvider = RowSelectionContext.Provider;

const RowSelectionChangeContext = createContext;

export const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;

export function useRowSelection() {
  const rowSelectionContext = useContext(RowSelectionContext);
  const rowSelectionChangeContext = useContext(RowSelectionChangeContext);

  if (rowSelectionContext === undefined || rowSelectionChangeContext === undefined) {
    throw new Error('useRowSelection must be used within DataGrid cells');
  }

  return [rowSelectionContext, rowSelectionChangeContext];
}