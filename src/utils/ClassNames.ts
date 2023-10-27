type Modes = Record<string, boolean | string>

export function classNames(cls: string, mode: Modes = {}, additional: string[] = []): string  {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mode)
      .filter(([classN, val]) => val)
      .map(([className, value]) => className),
  ].join(' ')
}