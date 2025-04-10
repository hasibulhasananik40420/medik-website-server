import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


// Item Schema (3rd-level category)
const itemSchema = new Schema({
  id: { type: String, required: true, default : uuidv4 },
  item_name: { type: String, required: true },
  slug: { type: String },
});

const subcategorySchema = new Schema({
  id: { type: String, required: true, default : uuidv4 },
  subcategory_name: { type: String, required: true },
  slug: { type: String },
  items: [itemSchema],
});

// Category Schema (Main category)
const categorySchema = new Schema({
  category_name: { type: String, required: true },
  slug: { type: String },
  subcategories: [subcategorySchema],
});

export const Category = model<CategoryDocument>("Category", categorySchema);

// TypeScript Interface for Category Document
interface CategoryDocument extends Document {
  category_name: string;
  slug: string;
  subcategories: {
    subcategory_name: string;
    slug: string;
    items: {
      item_name: string;
      slug: string;
    }[];
  }[];
}
