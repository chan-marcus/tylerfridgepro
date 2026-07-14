// ============================================================
// CLONE CONFIG - to deploy this template in a new market,
// edit this file + src/data/services.ts + src/data/cities.ts
// ============================================================

export const SITE = {
  brand: 'Tyler Fridge Pro',
  domain: 'https://tylerfridgepro.com',
  tagline: 'Commercial refrigeration service for Tyler and East Texas',

  businessType: 'commercial refrigeration',
  serviceType: 'Commercial refrigeration repair',  // used in Service/SEO schema
  region: 'Tyler, TX',
  state: 'TX',

  // tel: links + schema + meta use pure digits; humans see the vanity.
  phone: '+19035012653',
  phoneTel: '+19035012653',       // click-to-call href
  phoneVanity: '903-501-COLD',    // vanity number for humans
  phoneDisplay: '(903) 501-2653',
  phoneDigits: '(903) 501-2653',

  email: 'help@tylerfridgepro.com',

  serviceRegion: 'Tyler, TX',
  anchorCity: 'Tyler',
  anchorState: 'TX',

  hoursNote: 'Refrigeration never sleeps. Techs answer 24 hours a day, 7 days a week, including holidays.',

  legalLine:
    'Tyler Fridge Pro is a local dispatch and referral service. Commercial refrigeration repair, maintenance, and installation is performed by licensed, insured independent refrigeration technicians serving Tyler and the surrounding East Texas communities.',

  // Geo center used in LocalBusiness schema (downtown Tyler)
  geo: { lat: 32.3513, lng: -95.3011 },

  social: {
    instagram: 'https://instagram.com/tylerfridgepro',
    facebook: 'https://facebook.com/tylerfridgepro'
  }
};
