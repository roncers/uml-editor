const icons = import.meta.glob('@/assets/svg/relationships/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

export const RelationshipIcons = Object.entries(icons).reduce((acc, [path, url]) => {
  const name = path.split('/').pop()?.replace('.svg', '') || path;
  acc[name] = url as string;
  return acc;
}, {} as Record<string, string>);