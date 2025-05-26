
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PersonalizationRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  product: string;
  customProduct?: string;
  quantity: number;
  description: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: PersonalizationRequest = await req.json();
    console.log('Received form data:', formData);

    // Send SMS notification via NotificationAPI
    const notificationPayload = {
      notificationId: 'welcome',
      user: {
        number: '+33638662109'
      },
      mergeTags: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Non spécifié',
        product: formData.product === 'other' ? formData.customProduct : formData.product,
        quantity: formData.quantity.toString(),
        description: formData.description,
        message: formData.message || 'Aucun message supplémentaire'
      }
    };

    const notificationResponse = await fetch('https://api.eu.notificationapi.com/sender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('mnjskhma8m0r5ld7mu6rbs240l:geul07hbse7zxxeqzbxdk72remuc6gz0jlqv39c6nchgxh2egis1onqe1b')
      },
      body: JSON.stringify(notificationPayload)
    });

    const notificationResult = await notificationResponse.json();
    console.log('NotificationAPI response:', notificationResult);

    if (!notificationResponse.ok) {
      console.error('NotificationAPI error:', notificationResult);
      throw new Error(`Erreur NotificationAPI: ${notificationResult.message || 'Erreur inconnue'}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Votre demande de personnalisation a été envoyée avec succès. Nous vous contacterons rapidement.",
        notificationId: notificationResult.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-personalization-request function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Une erreur est survenue lors de l'envoi de votre demande." 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
