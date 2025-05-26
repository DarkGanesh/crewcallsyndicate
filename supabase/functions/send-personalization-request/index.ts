
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PersonalizationRequest {
  name: string
  email: string
  phone: string
  company?: string
  product: string
  customProduct?: string
  quantity: number
  description: string
  message?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const requestData: PersonalizationRequest = await req.json()
    
    console.log('Received personalization request:', requestData)
    
    // Construire le contenu de l'email
    const productDisplay = requestData.product === 'other' 
      ? requestData.customProduct 
      : getProductLabel(requestData.product)

    const emailContent = `
Nouvelle demande de personnalisation

=== INFORMATIONS CLIENT ===
Nom: ${requestData.name}
Email: ${requestData.email}
Téléphone: ${requestData.phone}
${requestData.company ? `Société: ${requestData.company}` : ''}

=== DÉTAILS DU PRODUIT ===
Produit: ${productDisplay}
Quantité: ${requestData.quantity}
Description: ${requestData.description}

${requestData.message ? `=== MESSAGE COMPLÉMENTAIRE ===\n${requestData.message}` : ''}

---
Cette demande a été envoyée depuis le site CrewCallSyndicate.
    `

    // Envoyer l'email principal à contact@crewcallsyndicate.com
    const notificationPayload = {
      type: 'welcome',
      to: {
        email: 'contact@crewcallsyndicate.com'
      },
      email: {
        subject: `Nouvelle demande de personnalisation - ${requestData.name}`,
        html: emailContent.replace(/\n/g, '<br>')
      }
    }

    console.log('Sending notification to contact@crewcallsyndicate.com:', notificationPayload)

    const notificationResponse = await fetch('https://api.eu.notificationapi.com/sender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('mnjskhma8m0r5ld7mu6rbs240l:geul07hbse7zxxeqzbxdk72remuc6gz0jlqv39c6nchgxh2egis1onqe1b')
      },
      body: JSON.stringify(notificationPayload)
    })

    if (!notificationResponse.ok) {
      const errorData = await notificationResponse.text()
      console.error('NotificationAPI error:', errorData)
      throw new Error('Erreur lors de l\'envoi de l\'email via NotificationAPI')
    }

    const notificationResult = await notificationResponse.json()
    console.log('Email sent successfully via NotificationAPI:', notificationResult)

    // Envoyer une confirmation au client
    const confirmationPayload = {
      type: 'welcome',
      to: {
        email: requestData.email
      },
      email: {
        subject: 'Confirmation de votre demande de personnalisation',
        html: `
          <h2>Bonjour ${requestData.name},</h2>
          <p>Nous avons bien reçu votre demande de personnalisation pour <strong>${productDisplay}</strong>.</p>
          <p>Notre équipe va étudier votre demande et vous contacter rapidement pour vous proposer un devis personnalisé.</p>
          <p>Détails de votre demande :</p>
          <ul>
            <li><strong>Produit :</strong> ${productDisplay}</li>
            <li><strong>Quantité :</strong> ${requestData.quantity}</li>
            <li><strong>Description :</strong> ${requestData.description}</li>
          </ul>
          <p>Merci de votre confiance,<br>L'équipe CrewCallSyndicate</p>
        `
      }
    }

    console.log('Sending confirmation to client:', confirmationPayload)

    const confirmationResponse = await fetch('https://api.eu.notificationapi.com/sender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('mnjskhma8m0r5ld7mu6rbs240l:geul07hbse7zxxeqzbxdk72remuc6gz0jlqv39c6nchgxh2egis1onqe1b')
      },
      body: JSON.stringify(confirmationPayload)
    })

    if (!confirmationResponse.ok) {
      const confirmationErrorData = await confirmationResponse.text()
      console.error('NotificationAPI confirmation error:', confirmationErrorData)
      // Ne pas faire échouer la fonction si la confirmation ne peut pas être envoyée
    } else {
      const confirmationResult = await confirmationResponse.json()
      console.log('Confirmation email sent successfully:', confirmationResult)
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Demande envoyée avec succès' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(JSON.stringify({ 
      error: 'Erreur lors de l\'envoi de la demande',
      details: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    })
  }
})

function getProductLabel(value: string): string {
  const products: Record<string, string> = {
    "notepad": "Bloc-Note Logo Avant",
    "tshirt": "Tee-Shirt avec Logo",
    "bottle": "Gourde Logo Bas",
    "cup": "Gobelet EcoCup Logo Avant",
    "vest": "Gilet Jaune Avec Logo",
    "stickers": "Stickers Logo"
  }
  return products[value] || value
}
