
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CYBERSECURITY_KEYWORDS = [
  'cybersecurity', 'security', 'encryption', 'cryptography', 'cipher', 'hash', 'blockchain',
  'authentication', 'authorization', 'firewall', 'malware', 'virus', 'phishing', 'ransomware',
  'penetration', 'vulnerability', 'exploit', 'network security', 'digital forensics',
  'ssl', 'tls', 'vpn', 'intrusion', 'ddos', 'mitm', 'crypto', 'rsa', 'aes', 'sha',
  'digital signature', 'certificate', 'pki', 'two-factor', '2fa', 'biometric',
  'steganography', 'key exchange', 'symmetric', 'asymmetric', 'public key', 'private key'
];

function isSecurityRelated(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return CYBERSECURITY_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ 
          response: 'Chat service is not configured. Please contact an administrator.' 
        }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if the message is related to cybersecurity/cryptography
    if (!isSecurityRelated(message)) {
      return new Response(
        JSON.stringify({ 
          response: 'I cannot answer this question as it deviates from the theme of the missions. Please ask questions related to cybersecurity, cryptography, or digital security.' 
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a cybersecurity and cryptography expert assistant. You should only answer questions related to cybersecurity, encryption, cryptography, digital forensics, network security, and related technical topics. 

User question: ${message}

Please provide a helpful, accurate, and educational response focused on cybersecurity and cryptography concepts.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate response');
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I apologize, but I couldn\'t generate a proper response. Please try rephrasing your question.';

    return new Response(
      JSON.stringify({ response: generatedText }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        response: 'I encountered an error while processing your request. Please try again later.' 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
