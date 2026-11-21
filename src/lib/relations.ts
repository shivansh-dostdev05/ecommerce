type Doc = { id: number }

export const populated = <T extends Doc>(
  value: number | T | null | undefined,
): T | null =>
  typeof value === 'object' && value !== null ? value : null
