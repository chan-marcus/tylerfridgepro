// 8 areas -> 8 pages at /areas/[slug]/

export interface City {
  slug: string;
  name: string;
  lat: number;           // service-area map coordinates
  lng: number;
  county: string;
  short: string;         // card blurb
  h1: string;
  intro: string[];       // paragraphs with real local geography
  localRisks: { title: string; body: string }[];
  neighborhoods: string[]; // named places used in copy
}

export const CITIES: City[] = [
  {
    slug: 'tyler',
    name: 'Tyler',
    lat: 32.3513,
    lng: -95.3011,
    county: 'Smith County',
    short: 'The Rose City hub: restaurants, C-stores, and markets that all live or die by their refrigeration.',
    h1: 'Commercial Refrigeration Repair in Tyler, TX',
    intro: [
      'Tyler is the commercial heart of East Texas, and its restaurants, convenience stores, grocers, and bars all run on refrigeration that has to survive brutal Piney Woods summers. From the busy South Broadway corridor to the Old Bullard Road restaurant cluster and downtown around the square, a warm walk-in on a July afternoon is an emergency measured in inventory dollars per hour.',
      'Techs dispatched in Tyler know the local mix: high-volume kitchens near the mall and Loop 323, C-store cases along the highways, and the hard water that scales up ice machines all over town. Response is local, 24/7, and fast.'
    ],
    localRisks: [
      { title: 'Brutal summer heat load', body: 'East Texas July and August push condensers hard; a dirty or undersized unit that coasts in spring fails in the heat.' },
      { title: 'Hard-water scale on ice machines', body: 'Tyler-area water is hard, and scale is the top cause of low ice production and thin, cloudy cubes across the city.' },
      { title: 'High-volume kitchen wear', body: 'Busy South Broadway and Old Bullard Road kitchens run reach-ins and prep tables hard, wearing gaskets and fouling coils fast.' }
    ],
    neighborhoods: ['Downtown Square', 'South Broadway corridor', 'Old Bullard Road', 'Azalea District', 'The Grove', 'Hollytree', 'Cumberland', 'UT Tyler area']
  },
  {
    slug: 'whitehouse',
    name: 'Whitehouse',
    lat: 32.2213,
    lng: -95.2266,
    county: 'Smith County',
    short: 'Growing bedroom community south of Tyler with a steady base of local restaurants and stores.',
    h1: 'Commercial Refrigeration Repair in Whitehouse, TX',
    intro: [
      'Whitehouse sits just south of Tyler along Highway 110, and its steady residential growth has pulled in the restaurants, convenience stores, and markets that come with it. Those businesses run on the same commercial refrigeration as their big-city neighbors, and they need the same fast response when a cooler or ice machine goes down.',
      'Techs cover Whitehouse as part of the greater Tyler service area, so a call from a kitchen off Main Street or a C-store on 110 gets the same 24/7 dispatch and local arrival times.'
    ],
    localRisks: [
      { title: 'Summer heat on rooftop units', body: 'Exposed condensers on Whitehouse storefronts take the full East Texas sun and need clean coils to survive it.' },
      { title: 'Hard-water ice machine scale', body: 'Local water hardness fouls ice machines here just like in Tyler, cutting production and cube quality.' },
      { title: 'Single-unit dependence', body: 'Smaller Whitehouse operators often run one critical cooler or freezer, so a single failure puts all their product at risk.' }
    ],
    neighborhoods: ['Downtown Whitehouse', 'Highway 110 corridor', 'Main Street', 'Mozelle', 'Wildcat area', 'Brookdale', 'Estates of Whitehouse', 'Southside']
  },
  {
    slug: 'bullard',
    name: 'Bullard',
    lat: 32.1421,
    lng: -95.3125,
    county: 'Smith County',
    short: 'Fast-growing town on the Smith and Cherokee county line with new commercial development.',
    h1: 'Commercial Refrigeration Repair in Bullard, TX',
    intro: [
      'Bullard straddles the Smith and Cherokee county line south of Tyler, and its rapid residential growth along Highway 69 has brought a wave of new restaurants, convenience stores, and markets. New buildings mean new equipment, but new equipment still needs correct installation, startup, and maintenance to run right through an East Texas summer.',
      'Techs serving Bullard handle everything from commissioning a new walk-in in a fresh buildout to keeping an established kitchen off Highway 69 running through the heat. Dispatch is 24/7 and local to the area.'
    ],
    localRisks: [
      { title: 'New-buildout startup issues', body: 'Fresh commercial construction along Highway 69 means new refrigeration that needs proper commissioning to run at spec.' },
      { title: 'Peak summer condenser strain', body: 'Piney Woods heat loads condensers hard; even new units need clean coils and correct charge to hold temperature.' },
      { title: 'Hard-water scale', body: 'Ice machines in Bullard face the same East Texas hard-water scale that throttles production elsewhere.' }
    ],
    neighborhoods: ['Downtown Bullard', 'Highway 69 corridor', 'Emerald Bay area', 'Mill Creek', 'Cherokee County side', 'The Villages', 'Bullard schools area', 'Lake Palestine side']
  },
  {
    slug: 'lindale',
    name: 'Lindale',
    lat: 32.5124,
    lng: -95.4088,
    county: 'Smith County',
    short: 'I-20 crossroads town with highway travel-stop coolers, restaurants, and a busy commercial strip.',
    h1: 'Commercial Refrigeration Repair in Lindale, TX',
    intro: [
      'Lindale sits where Highway 69 meets Interstate 20 north of Tyler, and that crossroads brings travel-stop convenience stores, chain and local restaurants, and a growing commercial strip, all of it packed with coolers, freezers, and ice machines. Highway locations run their refrigeration around the clock, which means failures happen at every hour.',
      'Techs cover Lindale as part of the Tyler service area, with 24/7 dispatch for the C-stores along I-20 and the restaurants and markets in and around downtown.'
    ],
    localRisks: [
      { title: 'Round-the-clock C-store demand', body: 'I-20 travel stops run cases and ice machines 24/7, so wear accumulates fast and failures strike at any hour.' },
      { title: 'Summer heat on high-traffic units', body: 'Constant door openings plus East Texas heat push reach-ins and merchandisers hard through the summer.' },
      { title: 'Hard-water ice machine scale', body: 'High-volume ice machines at travel stops scale up quickly in the local hard water.' }
    ],
    neighborhoods: ['Downtown Lindale', 'I-20 travel plaza area', 'Highway 69 corridor', 'Cannery District', 'Miranda', 'Garden Valley area', 'Mount Sylvan side', 'Hideaway area']
  },
  {
    slug: 'chandler',
    name: 'Chandler',
    lat: 32.3060,
    lng: -95.4779,
    county: 'Henderson County',
    short: 'Lake Palestine gateway in Henderson County with seasonal restaurants and marina-area stores.',
    h1: 'Commercial Refrigeration Repair in Chandler, TX',
    intro: [
      'Chandler sits in Henderson County on the western approach to Lake Palestine, and its restaurants, bait-and-tackle stores, and lakeside markets see a seasonal rush that leans hard on refrigeration. Summer weekends bring the crowds and the heat at the same time, exactly when a cooler or ice machine is most likely to give out.',
      'Techs serving Chandler cover the Highway 31 corridor and the lake-area businesses, with 24/7 dispatch for the peak-season failures that come with a full house and a hot afternoon.'
    ],
    localRisks: [
      { title: 'Seasonal peak load', body: 'Lake Palestine summer traffic spikes demand on refrigeration right when the heat is at its worst.' },
      { title: 'Ice machine demand at the lake', body: 'Lakeside stores and restaurants move enormous volumes of ice in summer, and hard-water scale throttles output fast.' },
      { title: 'Exposed condensers', body: 'Rural and lakeside units often sit fully exposed to sun and debris, fouling coils and driving heat-related failures.' }
    ],
    neighborhoods: ['Downtown Chandler', 'Highway 31 corridor', 'Lake Palestine side', 'Callender Lake area', 'Cedar Creek side', 'Brownsboro side', 'FM 315 corridor', 'Marina area']
  },
  {
    slug: 'flint',
    name: 'Flint',
    lat: 32.2385,
    lng: -95.3960,
    county: 'Smith County',
    short: 'Lake Palestine community just south of Tyler with convenience stores and local eateries.',
    h1: 'Commercial Refrigeration Repair in Flint, TX',
    intro: [
      'Flint spreads along the eastern side of Lake Palestine just south of Tyler, an unincorporated Smith County community whose convenience stores, local restaurants, and lake-area markets all depend on reliable refrigeration. The mix of highway C-stores on Highway 155 and seasonal lake traffic keeps coolers and ice machines working hard.',
      'Techs reach Flint quickly as part of the greater Tyler service area, handling everything from a warm walk-in at a local kitchen to a scaled-up ice machine at a lakeside store, 24/7.'
    ],
    localRisks: [
      { title: 'Lake-season heat and demand', body: 'Summer lake traffic and Piney Woods heat combine to push refrigeration to its limits at the worst possible time.' },
      { title: 'Highway 155 C-store cases', body: 'Convenience-store coolers and ice machines along 155 run constantly and wear accordingly.' },
      { title: 'Hard-water scale', body: 'Local water hardness fouls ice machines throughout the Flint and Lake Palestine area.' }
    ],
    neighborhoods: ['Highway 155 corridor', 'Lake Palestine shore', 'Gresham side', 'Emerald Bay area', 'Bullard side', 'Noonday side', 'Coker Springs area', 'FM 2493 corridor']
  },
  {
    slug: 'arp',
    name: 'Arp',
    lat: 32.2313,
    lng: -95.0619,
    county: 'Smith County',
    short: 'Small Smith County town east of Tyler where local stores and diners need dependable cold.',
    h1: 'Commercial Refrigeration Repair in Arp, TX',
    intro: [
      'Arp is a small Smith County town east of Tyler along Highway 135, the kind of community where a single grocery, a diner, and a couple of convenience stores anchor Main Street, and every one of them runs on refrigeration that has to hold up through the summer. For a small operator, one failed cooler can put the whole day at risk.',
      'Techs serve Arp as part of the Tyler service area, so even out here a warm walk-in or a down ice machine gets local, 24/7 response instead of a long wait for someone to drive in.'
    ],
    localRisks: [
      { title: 'Single-unit small businesses', body: 'Arp operators often depend on one critical cooler or freezer, so a single breakdown threatens all their product.' },
      { title: 'Summer heat on aging equipment', body: 'Small-town kitchens often run older units that struggle when East Texas heat loads the condensers.' },
      { title: 'Hard-water ice scale', body: 'Ice machines here face the same regional hard-water scaling that cuts production and cube quality.' }
    ],
    neighborhoods: ['Downtown Arp', 'Highway 135 corridor', 'Main Street', 'Pruett area', 'Overton side', 'New London side', 'Turner area', 'FM 2276 corridor']
  },
  {
    slug: 'winona',
    name: 'Winona',
    lat: 32.4926,
    lng: -95.1741,
    county: 'Smith County',
    short: 'I-20 town northeast of Tyler with truck-stop coolers and highway convenience stores.',
    h1: 'Commercial Refrigeration Repair in Winona, TX',
    intro: [
      'Winona sits along Interstate 20 northeast of Tyler, and its position on the highway brings truck stops, convenience stores, and roadside restaurants, all running coolers, freezers, and high-volume ice machines nonstop. Highway businesses never really close, so their refrigeration never gets a break, and neither can the response when it fails.',
      'Techs cover Winona as part of the Tyler service area, with 24/7 dispatch for the I-20 travel stops and the local stores and kitchens around town.'
    ],
    localRisks: [
      { title: 'Nonstop highway operation', body: 'I-20 truck stops and C-stores run refrigeration 24/7, so wear builds fast and failures come at all hours.' },
      { title: 'High-volume ice demand', body: 'Travel-stop ice machines move huge volumes and scale up quickly in the local hard water.' },
      { title: 'Summer condenser strain', body: 'Constant traffic and door openings plus East Texas heat load reach-ins and coolers hard through summer.' }
    ],
    neighborhoods: ['Downtown Winona', 'I-20 travel plaza area', 'Highway 80 corridor', 'FM 757 corridor', 'Owentown side', 'Red Springs side', 'Starrville side', 'Longview side']
  }
];
