export default function tenantCount (origin) {
  return {
    label: '当前实时访问人数',
    count: origin.TotalCount || 0
  }
}