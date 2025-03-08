
// Types for the product data
export interface PriceOption {
  quantity: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceOptions: PriceOption[];
  customizable: boolean;
}

// Types for the form data
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Types for the user uploaded files
export interface UploadedLogo {
  file: File;
  preview: string;
}
