
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Simulate form submission
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les meilleurs délais.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="cinema-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Contactez <span className="text-cinema-red">Nous</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20">
                <h2 className="text-xl font-bold text-white mb-6">Informations de Contact</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-cinema-red mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Adresse</h3>
                      <p className="text-gray-400 text-sm">
                        Studio City<br />
                        34 Rue du Cinéma<br />
                        75020 Paris, France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-cinema-red mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Téléphone</h3>
                      <p className="text-gray-400 text-sm">
                        +33 (0)1 23 45 67 89
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-cinema-red mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">Email</h3>
                      <p className="text-gray-400 text-sm">
                        contact@cinemamerch.fr
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-white font-medium mb-3">Horaires d'ouverture</h3>
                  <p className="text-gray-400 text-sm">
                    Lundi - Vendredi: 9h00 - 18h00<br />
                    Week-end: Fermé
                  </p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20">
                <h2 className="text-xl font-bold text-white mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-cinema-black border border-gray-700 rounded-md px-4 py-2 text-white focus:border-cinema-red focus:outline-none focus:ring-1 focus:ring-cinema-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-cinema-black border border-gray-700 rounded-md px-4 py-2 text-white focus:border-cinema-red focus:outline-none focus:ring-1 focus:ring-cinema-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-white text-sm font-medium mb-1">
                      Société / Production
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-cinema-black border border-gray-700 rounded-md px-4 py-2 text-white focus:border-cinema-red focus:outline-none focus:ring-1 focus:ring-cinema-red"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-cinema-black border border-gray-700 rounded-md px-4 py-2 text-white focus:border-cinema-red focus:outline-none focus:ring-1 focus:ring-cinema-red"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="button-cinema w-full flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
