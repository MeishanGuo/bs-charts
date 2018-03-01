export default function tenantAlais (origin) {
  return {
    title: (origin.TenantAlais && origin.TenantAlais.replace(/"/g, '') || '') +  '鹰眼感知监控'
  }
}