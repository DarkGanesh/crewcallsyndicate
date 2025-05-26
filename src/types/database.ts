
// Types locaux pour la table clients
export interface Client {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
}

// Types pour les opérations de base de données
export interface ClientInsert {
  id?: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  address?: string | null;
}

export interface ClientUpdate {
  name?: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  address?: string | null;
}
