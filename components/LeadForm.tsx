"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    budget: '',
    techStack: '',
    honeypot: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setFormData(prev => ({
        ...prev,
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || ''
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast.error('Please enter your name and email');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setIsSuccess(true);
      toast.success('Your audit request has been received!');
      
      // Fire GTM Event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          lead_type: 'free_audit',
          budget: formData.budget,
          company_size: formData.companySize
        });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-slate-900 rounded-3xl border border-slate-800"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-slate-400 mb-6">Our senior engineers are reviewing your details. We'll be in touch within 24 hours.</p>
        <Button onClick={() => window.location.href = '/book-call'} className="w-full bg-blue-600 hover:bg-blue-500">
          Book Intro Call Now <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
      <div className="flex mb-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className={`h-2 flex-1 mx-1 rounded-full ${step >= num ? 'bg-blue-600' : 'bg-slate-800'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Full Name</Label>
                <Input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Alex Morgan" 
                  className="bg-slate-950 border-slate-800 text-white mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-slate-300">Work Email</Label>
                <Input 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="alex@company.com" 
                  className="bg-slate-950 border-slate-800 text-white mt-1 h-12"
                />
              </div>
              {/* Honeypot field (hidden from humans, filled by bots) */}
              <div className="absolute opacity-0 -z-10" aria-hidden="true">
                <Label htmlFor="honeypot">Leave this empty</Label>
                <Input 
                  id="honeypot"
                  name="honeypot" 
                  value={formData.honeypot} 
                  onChange={handleChange} 
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <Button onClick={nextStep} className="w-full h-12 bg-blue-600 hover:bg-blue-500 mt-4">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Company Size</Label>
                <select 
                  name="companySize" 
                  value={formData.companySize} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white mt-1 h-12 rounded-md px-3"
                >
                  <option value="">Select size...</option>
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201+">201+ Employees</option>
                </select>
              </div>
              <div>
                <Label className="text-slate-300">Current Tech Stack</Label>
                <Input 
                  name="techStack" 
                  value={formData.techStack} 
                  onChange={handleChange} 
                  placeholder="e.g. Next.js, Postgres, AWS" 
                  className="bg-slate-950 border-slate-800 text-white mt-1 h-12"
                />
              </div>
              <Button onClick={nextStep} className="w-full h-12 bg-blue-600 hover:bg-blue-500 mt-4">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Estimated Project Budget</Label>
                <select 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white mt-1 h-12 rounded-md px-3"
                >
                  <option value="">Select budget...</option>
                  <option value="<10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 mt-4"
              >
                {loading ? 'Submitting...' : 'Request Free Audit'}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
