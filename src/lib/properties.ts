import { apiFetch } from "@/lib/api";

export type PropertyImage = {
  id: number;
  image_url: string;
  is_cover: boolean;
  sort_order: number;
  alt_text?: string;
  caption?: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  description?: string;

  city: string;
  locality?: string;

  property_type: string;
  room_type: string;

  bedrooms: number;
  bathrooms: number;
  area_sqft?: number | null;

  currency: string;
  rent_monthly: string | number;

  status: string;
  available_from?: string | null;

  is_featured: boolean;
  priority_rank: number;

  images: PropertyImage[];
};

export async function fetchPublicProperties(params?: {
  q?: string;
  type?: string;
  min_rent?: string | number;
  max_rent?: string | number;
}) {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", String(params.q));
  if (params?.type) qs.set("type", String(params.type).toUpperCase());
  if (params?.min_rent !== undefined) qs.set("min_rent", String(params.min_rent));
  if (params?.max_rent !== undefined) qs.set("max_rent", String(params.max_rent));

  const url = `/api/core/properties/public/${qs.toString() ? `?${qs.toString()}` : ""}`;
  const data = await apiFetch(url);

  return Array.isArray(data) ? (data as Property[]) : [];
}
