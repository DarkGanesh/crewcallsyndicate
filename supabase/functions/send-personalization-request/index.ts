
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

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
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const requestData: PersonalizationRequest = await req.json()
    
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

    if (!RESEND_API_KEY) {
      console.log('Email simulation - Contenu:', emailContent)
      return new Response(JSON.stringify({ success: true, message: 'Email simulé envoyé' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      })
    }

    // Envoyer l'email avec Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'CrewCallSyndicate <noreply@votre-domaine.com>',
        to: ['contact@crewcallsyndicate.com'],
        subject: `Nouvelle demande de personnalisation - ${requestData.name}`,
        text: emailContent,
      }),
    })

    if (!emailResponse.ok) {
      throw new Error('Erreur lors de l\'envoi de l\'email')
    }

    return new Response(JSON.stringify({ success: true, message: 'Demande envoyée avec succès' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi de la demande' }), {
      headers: { 'Content-Type': 'application/json' },
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
