//Transform bytes into kbytes ou mega bytes string
export const bytesToSizeString = (bytes: number): string => {
  if (bytes > 1000000000) {
    return `${Number((bytes / 1000000000).toFixed(1)).toLocaleString(
      'pt-BR'
    )} GB`;
  } else if (bytes > 1000000) {
    return `${Number((bytes / 1000000).toFixed(1)).toLocaleString('pt-BR')} MB`;
  } else if (bytes > 1000) {
    return `${Number((bytes / 1000).toFixed(1)).toLocaleString('pt-BR')} kB`;
  } else {
    return `${Number(bytes.toFixed(1)).toLocaleString('pt-BR')} B`;
  }
};
