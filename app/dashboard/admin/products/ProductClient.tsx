"use client";

import { useState } from "react";
import { saveProduct } from "./actions";
import { toast } from "sonner";
import { Plus, Edit2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  price: string | number;
  currency: string;
  features: string; // Stored as JSON string in state for easy editing
  is_active: boolean;
};

export default function ProductClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<Product[]>(
    initialProducts.map(p => ({ ...p, features: JSON.stringify(p.features) }))
  );
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (p: Product) => setEditingProduct(p);
  const handleCreate = () => setEditingProduct({ name: '', slug: '', description: '', price: 0, currency: 'USD', features: '["Feature 1"]', is_active: true });
  
  const handleSave = async () => {
    if(!editingProduct) return;
    setLoading(true);
    
    // Parse features back to array before saving
    let parsedFeatures = [];
    try {
      parsedFeatures = JSON.parse(editingProduct.features);
    } catch(e) {
      toast.error("Features must be a valid JSON array of strings.");
      setLoading(false);
      return;
    }

    const payload = { ...editingProduct, features: JSON.stringify(parsedFeatures) };
    const res = await saveProduct(payload);
    
    if (res.success) {
      toast.success("Product saved successfully!");
      // Naive local state update to avoid full reload
      if (editingProduct.id) {
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      } else {
        // Just reload page to get new ID
        window.location.reload();
      }
      setEditingProduct(null);
    } else {
      toast.error(res.error || "Failed to save product");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Productized Services</h1>
          <p className="text-slate-400">Manage the services that appear on your public /pricing page.</p>
        </div>
        <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-500">
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative">
            <div className="absolute top-4 right-4">
              {p.is_active ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-slate-600" />}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
            <p className="text-blue-400 font-medium mb-4">${p.price} {p.currency}</p>
            <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
            
            <Button onClick={() => handleEdit(p)} variant="outline" className="w-full border-slate-700 text-slate-300">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Service
            </Button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{editingProduct.id ? 'Edit Service' : 'New Service'}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Name</Label>
                  <Input 
                    value={editingProduct.name} 
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="bg-slate-950 border-slate-800 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Slug (URL friendly)</Label>
                  <Input 
                    value={editingProduct.slug} 
                    onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})}
                    className="bg-slate-950 border-slate-800 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Description</Label>
                <textarea 
                  value={editingProduct.description} 
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 text-white mt-1 rounded-md p-3 h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Price</Label>
                  <Input 
                    type="number"
                    value={editingProduct.price} 
                    onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                    className="bg-slate-950 border-slate-800 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Currency</Label>
                  <Input 
                    value={editingProduct.currency} 
                    onChange={e => setEditingProduct({...editingProduct, currency: e.target.value})}
                    className="bg-slate-950 border-slate-800 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Features (JSON Array format)</Label>
                <textarea 
                  value={editingProduct.features} 
                  onChange={e => setEditingProduct({...editingProduct, features: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 text-white mt-1 rounded-md p-3 font-mono text-sm h-24"
                />
              </div>

              <div className="flex items-center mt-4">
                <input 
                  type="checkbox" 
                  checked={editingProduct.is_active}
                  onChange={e => setEditingProduct({...editingProduct, is_active: e.target.checked})}
                  className="mr-2"
                />
                <Label className="text-slate-300">Visible on public pricing page</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button onClick={() => setEditingProduct(null)} variant="ghost" className="text-slate-400">Cancel</Button>
              <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-500">
                {loading ? 'Saving...' : 'Save Service'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
