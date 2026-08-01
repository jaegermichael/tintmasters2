export const phone = '+263 78 422 7110';
export const tel = '+263784227110';
export const email = 'sales@tintmasters.co.zw';
export const address = '15223 10th Close, Sunningdale 2, Harare, Zimbabwe';
export const facebook = 'https://www.facebook.com/CarWindowTintHarare';

// Images are self-hosted from /public/images so the site no longer depends on
// the live WordPress site staying online (previously these were hotlinked).
export const images = {
  tint: '/images/tint.jpg',
  frost: '/images/frost.jpg',
  building: '/images/building.jpg',
  gate: '/images/gate.jpg',
  signage: '/images/signage.jpg',
  wrap: '/images/wrap.jpg',
  founder: '/images/founder.jpg',
  team: '/images/team.jpg',
  heroPoster: '/images/hero-poster.jpg'
};

export const serviceCards = [
  ['Automotive tinting', 'Ceramic tint options for comfort, privacy and a refined finish.', images.tint, true],
  ['Window frosting', 'Privacy that still lets the light work.', images.frost, false],
  ['Building tinting', 'Residential and commercial window solutions.', images.building, false],
  ['Gates and CCTV', 'Stronger access control for the spaces that matter.', images.gate, false],
  ['Signage', 'Clear, practical signs that do their job.', images.signage, false],
  ['Vehicle branding', 'Put your business in motion.', images.wrap, false]
];

export const serviceData = [
  ['Automotive window tinting', 'Ceramic tint films for a cleaner look, improved comfort and added privacy inside your vehicle.', images.tint],
  ['Window frosting', 'Create privacy for offices, bathrooms, partitions and shopfronts without closing off natural light.', images.frost],
  ['Residential and commercial tinting', 'A practical way to manage glare, privacy and heat across homes, offices and commercial buildings.', images.building],
  ['CCTV and electric gates', 'Add a more controlled approach to access and monitoring around your property.', images.gate],
  ['Signage', 'From shopfront identity to directional signage, we help businesses become easier to find and recognise.', images.signage],
  ['Vehicle branding and wrapping', 'Turn cars, vans and fleets into visible, professional brand assets while they are out on the road.', images.wrap]
];

export const galleryItems = [
  ['tint', 'Automotive tinting', images.tint],
  ['frost', 'Window frosting', images.frost],
  ['building', 'Building tinting', images.building],
  ['security', 'Security installation', images.gate],
  ['signage', 'Signage', images.signage],
  ['branding', 'Vehicle branding', images.wrap],
  ['team', 'Project work', images.team],
  ['tint', 'Tinting detail', images.founder]
];

export const navItems = [
  { label: 'Home', to: '/', id: 'home' },
  { label: 'About', to: '/about', id: 'about' },
  { label: 'Services', to: '/services', id: 'services' },
  { label: 'Gallery', to: '/gallery', id: 'gallery' },
  { label: 'Contact', to: '/contact', id: 'contact' }
];

export const values = [
  { num: '01', label: 'Advice', title: 'Start with the need', desc: 'We listen first, then suggest materials and a scope that suit your vehicle, building or business.' },
  { num: '02', label: 'Craft', title: 'Respect the detail', desc: 'From surface preparation to the final edge, good work is built through the small decisions.' },
  { num: '03', label: 'Service', title: 'Keep it simple', desc: 'We communicate clearly, turn up prepared and focus on completing the job properly.' }
];

export const trustPoints = [
  'Mobile-ready quotes',
  'Ceramic film options',
  'Harare-based team',
  'Vehicles · homes · business'
];

export const marqueeItems = [
  'Automotive tint',
  'Building film',
  'Window frosting',
  'Vehicle branding',
  'Signage',
  'CCTV',
  'Electric gates',
  'Harare · Zimbabwe'
];
