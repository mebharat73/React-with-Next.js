export function formatSearchParams(searchParams = {}) {
  const { limit, sort, min, max, brands, category, name } = searchParams;

  const params = new URLSearchParams();

  if (limit !== undefined && limit !== null) params.append('limit', limit);
  if (sort) params.append('sort', sort);
  // Use loose null/undefined check to allow 0
  if (min !== undefined && min !== null) params.append('min', min);
  if (max !== undefined && max !== null) params.append('max', max);
  if (brands) params.append('brands', brands);
  if (category) params.append('category', category);
  if (name) params.append('name', name);

  return params.toString();
}
